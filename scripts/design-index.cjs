#!/usr/bin/env node
/**
 * Thematic.design — DESIGN.generated.md generator
 *
 * Emits a structured, machine-readable index of every documented component for use by
 * AI assistants and as a fast human lookup. Everything here is derived from source:
 * running it is the only supported way to change the file, so the index cannot drift
 * from the system the way a hand-maintained one does.
 *
 * Usage:  node scripts/design-index.cjs [--check]
 *         --check  exit 1 if the committed file is stale (for CI)
 */
const fs = require("fs");
const path = require("path");

const REPO = path.resolve(__dirname, "..");
const STORIES = path.join(REPO, "src/stories");
const UI = path.join(REPO, "components/ui");
const TOKENS_CSS = path.join(REPO, "src/styles/tokens.css");
const OUT = path.join(REPO, "DESIGN.generated.md");

// ---------------------------------------------------------------- tokens
// Read tokens.css, not tokens.json. tokens.json is a stale export of an earlier token
// model — it still uses the flat --component-alert-* naming that was replaced by the
// family-based --component-feedback-alert-*, and it is missing most of the current
// system. Generating namespaces from it is what put 13 non-existent token prefixes into
// the previous index. tokens.css is what the browser reads, so it is the only source
// that cannot lie about what exists.
const tokenNames = [
  ...fs.readFileSync(TOKENS_CSS, "utf8").matchAll(/^\s*(--[a-z0-9-]+)\s*:/gim),
].map((m) => m[1]);

function countUnder(prefixes) {
  return tokenNames.filter((t) => prefixes.some((p) => t.startsWith(p))).length;
}

// Button references button-primary, button-secondary, button-ghost and button-destructive;
// listing four prefixes where `--component-button-*` says the same thing is just noise.
// Collapsing is only safe when the shorter prefix matches exactly the same tokens — for
// families it does not: alert.tsx uses feedback-alert, and `--component-feedback-*` would
// falsely claim badge and toast tokens too. So collapse only when the counts agree.
function tokenStats(namespaces) {
  const prefixes = [...namespaces].map((ns) => `--component-${ns}-`);
  const exact = countUnder(prefixes);
  const roots = new Set([...namespaces].map((ns) => ns.split("-")[0]));
  if (roots.size === 1) {
    const collapsed = [`--component-${[...roots][0]}-`];
    if (countUnder(collapsed) === exact) return { count: exact, prefixes: collapsed };
  }
  return { count: exact, prefixes };
}

// ---------------------------------------------------------------- helpers
const read = (p) => (fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "");
const titleCase = (kebab) =>
  kebab.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join("");

// Which --component-<ns>-* prefixes a file actually references. Filenames do not map
// onto namespaces reliably (sidebar-nav.tsx uses --component-nav-*), so ownership is
// read off the source rather than guessed from the name.
function namespacesIn(src) {
  const ns = new Set();
  for (const m of src.matchAll(/--component-([a-z0-9]+(?:-[a-z0-9]+)?)-/g)) ns.add(m[1]);
  return ns;
}

// Local component imports, in file order. Both import styles are in use across the repo
// — stories tend to use relative paths ("../../components/ui/alert") while components
// use the "@/" alias — so match on the trailing components/ui/<name> either way.
function uiImports(src) {
  return [
    ...src.matchAll(/from\s+"(?:@\/|(?:\.\.?\/)+)components\/ui\/([a-z0-9-]+)"/g),
  ].map((m) => m[1]);
}

// ---------------------------------------------------------------- MDX parsing
// Split an MDX body into { heading -> text }, stripping JSX blocks so prose survives
// but <Canvas>/<Controls> tags do not leak into the index.
function sections(mdx) {
  const body = mdx.replace(/^import .*$/gm, "").replace(/^<Meta[^>]*\/>$/gm, "");
  const out = {};
  let current = "_intro";
  for (const line of body.split("\n")) {
    const h = /^##\s+(.+?)\s*$/.exec(line);
    if (h) { current = h[1].replace(/\s*\*\(.*\)\*\s*$/, "").trim(); out[current] ||= []; continue; }
    if (/^#\s+/.test(line)) continue;
    (out[current] ||= []).push(line);
  }
  for (const k of Object.keys(out)) {
    out[k] = out[k]
      .filter((l) => !/^\s*<[A-Z]/.test(l))
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }
  return out;
}

const firstParagraph = (text) => (text.split(/\n\s*\n/).find((p) => p.trim()) || "").trim();

// Prose reduced to a single line so each field stays one grep-able row.
const flatten = (text, max = 4) =>
  text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, max)
    .join(" ")
    .replace(/\s+/g, " ");

// Bold-led entries ("**`primary`** — …") become sub-items; otherwise take the prose.
function bulletise(text) {
  const items = [];
  for (const m of text.matchAll(/^\*\*(.+?)\*\*\s*[—–-]\s*(.+)$/gm)) {
    items.push([m[1].replace(/`/g, ""), m[2].trim()]);
  }
  return items;
}

// ---------------------------------------------------------------- build
const mdxFiles = fs.readdirSync(STORIES).filter((f) => f.endsWith(".mdx")).sort();
const entries = [];
const problems = [];

for (const file of mdxFiles) {
  const mdxPath = path.join(STORIES, file);
  const mdx = read(mdxPath);
  const name = (/^#\s+(.+)$/m.exec(mdx) || [, path.basename(file, ".mdx")])[1].trim();

  // Overview pages declare a title instead of binding to a stories file; they document
  // a family rather than a component, so they have no source, tokens or relationships.
  const isOverview = !/<Meta\s+of=\{/.test(mdx);

  const storiesFile = (/import \* as \w+ from "\.\/([^"]+)"/.exec(mdx) || [])[1];
  const storiesPath = storiesFile ? path.join(STORIES, `${storiesFile}.tsx`) : null;
  const storiesSrc = storiesPath ? read(storiesPath) : "";

  // The component a page documents is the ui import whose name best matches the file,
  // falling back to the first local import — stories list their own component first.
  const imports = uiImports(storiesSrc);
  const slug = path.basename(file, ".mdx").replace(/^AI/, "").toLowerCase();
  const own = imports.find((i) => i.replace(/-/g, "") === slug) || imports[0] || null;
  const compPath = own ? path.join(UI, `${own}.tsx`) : null;
  const compSrc = compPath ? read(compPath) : "";

  const ns = namespacesIn(compSrc);
  const { count, prefixes } = tokenStats(ns);
  if (!isOverview && own && count === 0) {
    problems.push(`${file}: no --component-* tokens found for ${own}.tsx`);
  }

  const sec = sections(mdx);
  const children = [...new Set(uiImports(compSrc))].filter((c) => c !== own);
  const siblings = [...new Set(imports)].filter((c) => c !== own && !children.includes(c));

  entries.push({
    name, file, storiesFile, own, isOverview,
    tokenCount: count, prefixes,
    intent: firstParagraph(sec._intro || ""),
    avoid: sec["When not to use"] || sec["Avoid"] || "",
    variants: bulletise(sec.Variants || ""),
    states: bulletise(sec.States || ""),
    composition: sec.Composition || "",
    accessibility: sec.Accessibility || "",
    children, siblings,
  });
}

// ---------------------------------------------------------------- emit
const L = [];
const documented = entries.filter((e) => !e.isOverview);
L.push("# DESIGN.generated.md — Thematic.design");
L.push("");
L.push("> **Generated file — do not edit by hand.** Regenerate with `node scripts/design-index.cjs`.");
L.push("> Token namespaces and relationships are derived from source, so they cannot drift");
L.push("> from the system. Prose fields are lifted verbatim from each component's `.mdx`.");
L.push("");
L.push(`> Coverage: **${documented.length} components** · **${tokenNames.length} tokens** defined in \`tokens.css\`.`);
L.push("");
L.push("---");
L.push("");

for (const e of entries) {
  L.push(`## ${e.name}`);
  L.push("");
  if (e.isOverview) {
    L.push(`- **source:** \`${e.file}\` *(overview page — documents a family, not a single component)*`);
    if (e.intent) L.push(`- **intent:** ${flatten(e.intent)}`);
    L.push("");
    continue;
  }

  const src = [`\`${e.file}\``];
  if (e.storiesFile) src.push(`\`${e.storiesFile}.tsx\``);
  if (e.own) src.push(`\`components/ui/${e.own}.tsx\``);
  L.push(`- **source:** ${src.join(" · ")}`);

  L.push(
    e.tokenCount
      ? `- **component tokens:** ${e.tokenCount} (${e.prefixes.map((p) => `\`${p}*\``).join(" · ")})`
      : `- **component tokens:** none — styled from the alias tier`
  );

  if (e.intent) L.push(`- **intent:** ${flatten(e.intent)}`);
  if (e.avoid) L.push(`- **avoid:** ${flatten(e.avoid)}`);

  if (e.children.length) L.push(`- **composes:** ${e.children.map(titleCase).join(" · ")}`);
  if (e.siblings.length) L.push(`- **used with:** ${e.siblings.map(titleCase).join(" · ")}`);

  for (const [label, list] of [["variants", e.variants], ["states", e.states]]) {
    if (!list.length) continue;
    L.push(`- **${label}:**`);
    for (const [k, v] of list) L.push(`    - \`${k}\` — ${v}`);
  }

  if (e.composition) L.push(`- **composition:** ${flatten(e.composition, 3)}`);
  if (e.accessibility) L.push(`- **accessibility:** ${flatten(e.accessibility, 6)}`);
  L.push("");
}

const output = L.join("\n").replace(/\n{3,}/g, "\n\n");

if (process.argv.includes("--check")) {
  const current = read(OUT);
  if (current.trim() !== output.trim()) {
    console.error("✖ DESIGN.generated.md is stale — run: node scripts/design-index.cjs");
    process.exit(1);
  }
  console.log("✓ DESIGN.generated.md is up to date.");
  process.exit(0);
}

fs.writeFileSync(OUT, output);
console.log(`✓ Wrote DESIGN.generated.md — ${documented.length} components, ${entries.length - documented.length} overview pages.`);
if (problems.length) {
  console.log(`\n⚠  ${problems.length} component(s) with no component-tier tokens:`);
  for (const p of problems) console.log("   " + p);
}
