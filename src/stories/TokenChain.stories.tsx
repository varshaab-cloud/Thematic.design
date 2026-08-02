import type { Meta, StoryObj } from "@storybook/react";
import React, { useLayoutEffect, useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import flatTokens from "../../tokens 1.5/tokens.json";

/**
 * Token chain explorer — connector view of component → alias → brand → base.
 *
 * Data comes from the generated flat map (tokens 1.5/tokens.json), so this page can
 * never disagree with tokens.css: regenerating the exports is the only way to change it.
 * The graph is derived, not hand-drawn — every edge is a real var() reference.
 */

const FLAT = flatTokens as Record<string, string>;
const REF = /var\((--[a-z0-9-]+)\)/g;

function refsOf(value: string): string[] {
  return [...value.matchAll(REF)].map((m) => m[1]);
}
function resolve(name: string, depth = 0): string {
  const v = FLAT[name];
  if (v === undefined || depth > 12) return name;
  const refs = refsOf(v);
  if (refs.length === 1 && v.trim() === `var(${refs[0]})`) return resolve(refs[0], depth + 1);
  return v;
}
const isColor = (v: string) => /^#|^rgba?\(|^hsla?\(/.test(v.trim());
const tierOf = (n: string) =>
  n.startsWith("--component-") ? "component" : n.startsWith("--alias-") ? "alias" : "base";

/** The path THROUGH the clicked token: what it resolves to (descendants) plus what
 *  resolves to it (ancestors). Not the full connected component — that lights up
 *  sibling tokens that merely share an alias, which reads as noise. */
function connected(start: string, edges: [string, string][]): Set<string> {
  const down = new Set([start]), up = new Set([start]);
  let grew = true;
  while (grew) {
    grew = false;
    for (const [a, b] of edges) {
      if (down.has(a) && !down.has(b)) { down.add(b); grew = true; }
      if (up.has(b) && !up.has(a)) { up.add(a); grew = true; }
    }
  }
  return new Set([...down, ...up]);
}

const MONO: React.CSSProperties = { fontFamily: "Menlo, Consolas, monospace" };

function Swatch({ value }: { value: string }) {
  if (!isColor(value)) return null;
  return (
    <span style={{
      display: "inline-block", width: 12, height: 12, borderRadius: 3, flexShrink: 0,
      background: value, border: "1px solid rgba(0,0,0,0.12)",
    }} />
  );
}

function Chip({ name, active, dimmed, onClick, register }: {
  name: string; active: boolean; dimmed: boolean;
  onClick: () => void; register: (el: HTMLDivElement | null) => void;
}) {
  const value = FLAT[name] ?? "";
  const final = resolve(name);
  const label = name.replace(/^--(component|alias|base)-/, "");
  return (
    <div ref={register} onClick={onClick} title={`${name}\n= ${value}`} style={{
      display: "flex", alignItems: "center", gap: 6, padding: "5px 8px",
      borderRadius: "var(--alias-radius-sm)", cursor: "pointer",
      border: `1px solid ${active ? "var(--alias-color-border-active)" : "var(--alias-color-border-default)"}`,
      background: active ? "var(--alias-color-background-hover)" : "var(--alias-color-background-primary)",
      opacity: dimmed ? 0.25 : 1, transition: "opacity 0.12s, border-color 0.12s",
    }}>
      <Swatch value={final} />
      <span style={{ ...MONO, fontSize: 10.5, color: "var(--alias-color-text-primary)", wordBreak: "break-all" }}>
        {label}
      </span>
      {!isColor(final) && refsOf(value).length === 0 && (
        <span style={{ ...MONO, fontSize: 10, color: "var(--alias-color-text-subtle)", marginLeft: "auto", whiteSpace: "nowrap" }}>
          {final.length > 14 ? final.slice(0, 13) + "…" : final}
        </span>
      )}
    </div>
  );
}

const TIER_META: Record<string, { label: string; blurb: string }> = {
  component: { label: "Component", blurb: "What the component's CSS references. Never holds a value." },
  alias: { label: "Alias", blurb: "Semantic roles — what each value is for." },
  base: { label: "Base", blurb: "Raw values. The only tier allowed to hold literals." },
};

export function TokenChainExplorer({ prefix, filters }: { prefix: string; filters?: string[] }) {
  const [filter, setFilter] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number; a: string; b: string }[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef(new Map<string, HTMLDivElement>());

  // Build the graph for this component: its tokens, then everything they reach.
  const compTokens = Object.keys(FLAT)
    .filter((k) => k.startsWith(prefix))
    .filter((k) => !filter || k.includes(`-${filter}-`));
  const edges: [string, string][] = [];
  const tiers: Record<string, Set<string>> = { component: new Set(compTokens), alias: new Set(), base: new Set() };
  const queue = [...compTokens];
  const seen = new Set(queue);
  while (queue.length) {
    const t = queue.shift()!;
    for (const r of refsOf(FLAT[t] ?? "")) {
      edges.push([t, r]);
      tiers[tierOf(r)]?.add(r);
      if (!seen.has(r)) { seen.add(r); queue.push(r); }
    }
  }
  // Alias tokens sometimes reference other alias tokens (stroke → border). Keep both in
  // the alias column; the connector just draws within the column, which reads fine.

  const lit = selected ? connected(selected, edges) : null;

  useLayoutEffect(() => {
    const id = window.setTimeout(() => {
      const stage = stageRef.current;
      if (!stage) return;
      const sr = stage.getBoundingClientRect();
      const out: typeof lines = [];
      for (const [a, b] of edges) {
        const ea = chipRefs.current.get(a), eb = chipRefs.current.get(b);
        if (!ea || !eb) continue;
        const ra = ea.getBoundingClientRect(), rb = eb.getBoundingClientRect();
        out.push({
          a, b,
          x1: ra.right - sr.left, y1: ra.top + ra.height / 2 - sr.top,
          x2: rb.left - sr.left, y2: rb.top + rb.height / 2 - sr.top,
        });
      }
      setLines(out);
    }, 60);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefix, filter, selected, compTokens.length]);

  const cols: (keyof typeof TIER_META)[] = ["component", "alias", "base"];

  return (
    <div style={{ fontFamily: "'Open Sans', system-ui, sans-serif", padding: "8px 4px" }}>
      {filters && (
        <div style={{ display: "flex", gap: 6, marginBottom: 14, alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "var(--alias-color-text-subtle)", marginRight: 4 }}>Variant</span>
          {[null, ...filters].map((f) => (
            <button key={f ?? "all"} onClick={() => { setFilter(f); setSelected(null); }} style={{
              fontSize: 11, padding: "3px 10px", borderRadius: "var(--alias-radius-full)", cursor: "pointer",
              border: `1px solid ${filter === f ? "var(--alias-color-border-active)" : "var(--alias-color-border-default)"}`,
              background: filter === f ? "var(--alias-color-background-hover)" : "transparent",
              color: "var(--alias-color-text-primary)",
            }}>
              {f ?? "all"}
            </button>
          ))}
          <span style={{ fontSize: 11, color: "var(--alias-color-text-subtle)", marginLeft: "auto" }}>
            click any token to trace its chain · click again to clear
          </span>
        </div>
      )}

      <div ref={stageRef} style={{ position: "relative", display: "grid", gridTemplateColumns: "1.4fr 1.1fr 1fr", gap: 28 }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }}>
          {lines.map((l, i) => {
            const on = lit ? lit.has(l.a) && lit.has(l.b) : false;
            const midX = (l.x1 + l.x2) / 2;
            return (
              <path key={i}
                d={`M ${l.x1} ${l.y1} C ${midX} ${l.y1}, ${midX} ${l.y2}, ${l.x2} ${l.y2}`}
                fill="none"
                stroke={on ? "var(--alias-color-border-active)" : "var(--alias-color-border-default)"}
                strokeWidth={on ? 1.5 : 1}
                opacity={lit && !on ? 0.12 : on ? 0.95 : 0.45}
              />
            );
          })}
        </svg>

        {cols.map((tier) => (
          <div key={tier} style={{ minWidth: 0 }}>
            <div style={{ marginBottom: 4, fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--alias-color-text-tertiary)" }}>
              {TIER_META[tier].label}
              <span style={{ ...MONO, fontWeight: 400, textTransform: "none", letterSpacing: 0, color: "var(--alias-color-text-subtle)", marginLeft: 6 }}>
                {tiers[tier].size}
              </span>
            </div>
            <div style={{ fontSize: 10.5, color: "var(--alias-color-text-subtle)", lineHeight: 1.45, marginBottom: 10, minHeight: 30 }}>
              {TIER_META[tier].blurb}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {[...tiers[tier]].sort().map((name) => (
                <Chip key={name} name={name}
                  active={selected === name}
                  dimmed={!!lit && !lit.has(name)}
                  onClick={() => setSelected(selected === name ? null : name)}
                  register={(el) => { if (el) chipRefs.current.set(name, el); else chipRefs.current.delete(name); }}
                />
              ))}
              {tiers[tier].size === 0 && (
                <div style={{ fontSize: 11, color: "var(--alias-color-text-subtle)", fontStyle: "italic" }}>
                  no {tier} tokens in this chain
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ButtonChainPage() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 32px" }}>
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--alias-color-text-subtle)", margin: "0 0 8px" }}>
        Foundation · Token chains
      </p>
      <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 10px", color: "var(--alias-color-text-primary)" }}>Button</h1>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--alias-color-text-tertiary)", maxWidth: 640, margin: "0 0 20px" }}>
        Every visual decision in this component, traced to its raw value. Chains flow left
        to right: the component references a role, the role references the palette. The
        live component below is rendered from exactly these tokens.
      </p>

      <div style={{
        display: "flex", gap: 12, alignItems: "center", padding: "18px 20px", marginBottom: 28,
        background: "var(--alias-color-background-secondary)", borderRadius: "var(--alias-radius-lg)",
      }}>
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button disabled>Disabled</Button>
      </div>

      <TokenChainExplorer prefix="--component-button-" filters={["primary", "secondary", "ghost", "destructive"]} />
    </div>
  );
}

const meta: Meta = {
  title: "Thematic design system/Foundation/Token chains/Button",
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen", docs: { page: null } },
};
export default meta;
type Story = StoryObj;

export const Default: Story = { name: "Button", render: () => <ButtonChainPage /> };
