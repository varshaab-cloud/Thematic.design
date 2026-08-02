#!/usr/bin/env node
/**
 * Thematic.design — token exports
 *
 * tokens.css is the source of truth: it is what the browser reads, and it is the file
 * the audit and the design index both validate against. This script derives the two JSON
 * exports from it so they can no longer drift.
 *
 *   src/styles/tokens.css  →  src/styles/tokens.json       (flat map, for tooling)
 *                          →  src/styles/tokens.dtcg.json  (nested DTCG, for design tools)
 *
 * Both exports previously described an older 959-token model while tokens.css had moved
 * on to 1,598 — including renames (--component-alert-* became --component-feedback-alert-*)
 * that made the JSON actively misleading rather than merely incomplete.
 *
 * Usage:  node scripts/token-export.cjs [--check]
 *         --check  exit 1 if the committed exports are stale (for CI)
 */
const fs = require("fs");
const path = require("path");

const REPO = path.resolve(__dirname, "..");
const SRC = path.join(REPO, "src/styles/tokens.css");
const OUT_FLAT = path.join(REPO, "src/styles/tokens.json");
const OUT_DTCG = path.join(REPO, "src/styles/tokens.dtcg.json");

// ---------------------------------------------------------------- parse
// Declaration order is preserved so diffs stay readable and mirror the stylesheet.
const css = fs.readFileSync(SRC, "utf8");
const defs = [];
const seen = new Set();
for (const m of css.matchAll(/^\s*(--[a-z0-9-]+)\s*:\s*([^;]+);/gim)) {
  const [, name, value] = m;
  if (seen.has(name)) continue; // first declaration wins, matching CSS cascade at :root
  seen.add(name);
  defs.push([name, value.trim().replace(/\s+/g, " ")]);
}

// ---------------------------------------------------------------- types
// DTCG $type is inferred from the resolved value, because a reference like
// var(--base-radius-md) carries no type information of its own.
const flat = Object.fromEntries(defs);
function resolve(v, depth = 0) {
  if (depth > 10) return v;
  const m = /^var\(\s*(--[a-z0-9-]+)\s*\)$/.exec(String(v).trim());
  return m && flat[m[1]] !== undefined ? resolve(flat[m[1]], depth + 1) : v;
}
function inferType(rawValue) {
  const v = String(resolve(rawValue)).trim();
  if (/^#[0-9a-f]{3,8}$/i.test(v) || /^(rgb|hsl)a?\(/i.test(v)) return "color";
  if (/^cubic-bezier\(/i.test(v) || /^(linear|ease(-in)?(-out)?)$/i.test(v)) return "cubicBezier";
  if (/^-?\d*\.?\d+m?s$/i.test(v)) return "duration";
  if (/^-?\d*\.?\d+(px|rem|em|%)$/i.test(v)) return "dimension";
  if (/^\d{3}$/.test(v)) return "fontWeight";
  if (/(^|\s)\d+px\s+\d+px/.test(v) && /rgba?\(|#[0-9a-f]{3,8}/i.test(v)) return "shadow";
  if (/^["']?[A-Z][\w\s]*(,|["']?$)/.test(v) || /sans-serif|serif|monospace/i.test(v)) return "fontFamily";
  return "other";
}

// ---------------------------------------------------------------- DTCG
// var(--a-b-c) becomes {a.b.c}. Only whole-value references convert; composite values
// such as `all var(--x) var(--y)` are emitted verbatim, since DTCG has no syntax for a
// partial reference and inventing one would break any tool that consumes this.
const toPath = (name) => name.replace(/^--/, "").split("-");
function toDtcgValue(raw) {
  const m = /^var\(\s*(--[a-z0-9-]+)\s*\)$/.exec(raw.trim());
  return m ? `{${toPath(m[1]).join(".")}}` : raw;
}

const dtcg = {};
for (const [name, value] of defs) {
  const segs = toPath(name);
  let node = dtcg;
  for (const seg of segs.slice(0, -1)) {
    // A name can be both a group and a token (--alias-radius and --alias-radius-full).
    // DTCG has no representation for that, so the token is nested under a `_` leaf
    // rather than silently dropped or allowed to clobber the group.
    if (node[seg] && node[seg].$value !== undefined) node[seg] = { _: node[seg] };
    node = node[seg] ||= {};
  }
  const leaf = segs[segs.length - 1];
  const entry = { $value: toDtcgValue(value), $type: inferType(value) };
  if (node[leaf] && node[leaf].$value === undefined) node[leaf]._ = entry;
  else node[leaf] = entry;
}

// ---------------------------------------------------------------- write
const flatOut = JSON.stringify(flat, null, 2) + "\n";
const dtcgOut = JSON.stringify(dtcg, null, 2) + "\n";

if (process.argv.includes("--check")) {
  const stale = [];
  if (fs.readFileSync(OUT_FLAT, "utf8") !== flatOut) stale.push("tokens.json");
  if (fs.readFileSync(OUT_DTCG, "utf8") !== dtcgOut) stale.push("tokens.dtcg.json");
  if (stale.length) {
    console.error(`✖ Stale token export(s): ${stale.join(", ")} — run: node scripts/token-export.cjs`);
    process.exit(1);
  }
  console.log("✓ Token exports are up to date.");
  process.exit(0);
}

fs.writeFileSync(OUT_FLAT, flatOut);
fs.writeFileSync(OUT_DTCG, dtcgOut);

const byType = {};
for (const [, v] of defs) byType[inferType(v)] = (byType[inferType(v)] || 0) + 1;
console.log(`✓ Exported ${defs.length} tokens from tokens.css`);
console.log(`  → src/styles/tokens.json       (flat)`);
console.log(`  → src/styles/tokens.dtcg.json  (DTCG)`);
console.log(`  types: ${Object.entries(byType).sort((a, b) => b[1] - a[1]).map(([t, n]) => `${t} ${n}`).join(" · ")}`);
