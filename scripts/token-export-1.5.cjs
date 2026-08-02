#!/usr/bin/env node
/**
 * Thematic.design — token exports (1.5)
 *
 * tokens.css is the source of truth. This emits three views of it, each shaped for a
 * different consumer, into `tokens 1.5/`. Nothing in src/styles is touched.
 *
 *   tokens.json         flat map, for tooling and quick lookup
 *   tokens.dtcg.json    W3C DTCG, nested, $value/$type/$description
 *   tokens.studio.json  Tokens Studio, for the Figma sync in `tokens 1.4/push-to-figma.py`
 *
 * The point of exporting *after* the alias rewire is that references survive. Exporting
 * beforehand would have produced 98 flat hex values with no link to the ramp they came
 * from — which is most of the value gone.
 *
 * Usage:  node scripts/token-export-1.5.cjs [--check]
 */
const fs = require("fs");
const path = require("path");

const REPO = path.resolve(__dirname, "..");
const SRC = path.join(REPO, "src/styles/tokens.css");
const OUT = path.join(REPO, "tokens 1.5");
const DESCRIPTIONS = path.join(REPO, "token-descriptions.json");

// ---------------------------------------------------------------- parse
const css = fs.readFileSync(SRC, "utf8");
const defs = [];
const seen = new Set();
for (const m of css.matchAll(/^\s*(--[a-z0-9-]+)\s*:\s*([^;]+);/gim)) {
  const [, name, value] = m;
  if (seen.has(name)) continue; // first declaration wins, matching the cascade at :root
  seen.add(name);
  defs.push([name, value.trim().replace(/\s+/g, " ")]);
}
const flat = Object.fromEntries(defs);

// Optional sidecar. Absent for now — descriptions are the next piece of work — but the
// exporter reads it so adding the file is the only step needed to light them up.
let descriptions = {};
if (fs.existsSync(DESCRIPTIONS)) descriptions = JSON.parse(fs.readFileSync(DESCRIPTIONS, "utf8"));

// ---------------------------------------------------------------- helpers
function resolve(v, depth = 0) {
  if (depth > 12) return v;
  const m = /^var\(\s*(--[a-z0-9-]+)\s*\)$/.exec(String(v).trim());
  return m && flat[m[1]] !== undefined ? resolve(flat[m[1]], depth + 1) : v;
}
// Path shape follows tokens 1.4, because the Figma plugin's tokenSetOrder is keyed on it:
// the first segment is <tier>-<category> (`alias-color`, `base-easing`), not two levels.
//
// Splitting the remainder on every dash also breaks DTCG, which forbids a node being both
// a group and a token. `--alias-color-background-brand` and `-brand-dark` would make
// `brand` simultaneously a value and a parent. 1.4 avoids this by keeping compound leaf
// names intact — `brand-dark` is one key — so the collision never arises. Same rule here:
// any segment that would collide is folded back into its parent with a dash.
// Where a token set ends cannot be guessed from dashes: `--component-date-range-picker-*`
// belongs to the set `component-date-range-picker`, but taking two segments yields
// `component-date`, which splits one component across three sets and breaks parity with
// tokens 1.4. The stylesheet already declares its own grouping in section comments
// (`/* component-date-range-picker */`), so read those rather than infer.
const DECLARED_SETS = [
  ...new Set([...css.matchAll(/\/\*\s*((?:base|brand|alias|component|semantic)-[a-z-]+)/g)].map((m) => m[1])),
].sort((a, b) => b.length - a.length); // longest first, so the most specific prefix wins

const ALL_PATHS = new Set();
function rawPath(name) {
  const bare = name.replace(/^--/, "");
  const set = DECLARED_SETS.find((s) => bare.startsWith(`${s}-`));
  if (set) return [set, ...bare.slice(set.length + 1).split("-")];
  const segs = bare.split("-");
  return [`${segs[0]}-${segs[1]}`, ...segs.slice(2)];
}
function toPath(name) {
  const segs = rawPath(name);
  const out = [];
  for (let i = 0; i < segs.length; i++) {
    const candidate = [...out, segs[i]].join(".");
    // If this partial path is already a complete token, it cannot also be a group —
    // fold the current segment into the previous one instead of nesting under it.
    if (i > 0 && ALL_PATHS.has(candidate) && i < segs.length - 1) {
      out[out.length - 1] += `-${segs[i]}`;
    } else if (i > 0 && out.length && ALL_PATHS.has(out.join("."))) {
      out[out.length - 1] += `-${segs[i]}`;
    } else {
      out.push(segs[i]);
    }
  }
  return out;
}

// Seed the collision set with every token's naive path, so toPath() can tell whether a
// partial path is already a complete token before deciding to nest under it.
for (const [name] of defs) {
  const segs = name.replace(/^--/, "").split("-");
  ALL_PATHS.add([`${segs[0]}-${segs[1]}`, ...segs.slice(2)].join("."));
}

function inferType(raw) {
  const v = String(resolve(raw)).trim();
  if (/^#[0-9a-f]{3,8}$/i.test(v) || /^(rgb|hsl)a?\(/i.test(v) || /^color-mix\(/i.test(v)) return "color";
  if (/^cubic-bezier\(/i.test(v) || /^(linear|ease(-in)?(-out)?)$/i.test(v)) return "cubicBezier";
  if (/^-?\d*\.?\d+m?s$/i.test(v)) return "duration";
  if (/\d+px\s+\d+px/.test(v) && /rgba?\(|#[0-9a-f]{3,8}/i.test(v)) return "boxShadow";
  if (/^-?\d*\.?\d+(px|rem|em|%)$/i.test(v)) return "dimension";
  if (/^\d{3}$/.test(v)) return "fontWeight";
  if (/sans-serif|serif|monospace|['"]/.test(v)) return "fontFamily";
  return "other";
}

// Tokens Studio needs shadow parts addressable, because Figma sets x/y/blur/spread as
// separate fields on an effect. A CSS string cannot be assigned to a Figma effect, so
// this splits it back apart — the one place the CSS-as-source model needs real parsing.
// Splitting on top-level commas only, since rgba() contains commas of its own.
function splitTopLevel(s) {
  const out = [];
  let depth = 0, cur = "";
  for (const ch of s) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === "," && depth === 0) { out.push(cur.trim()); cur = ""; continue; }
    cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}
function parseShadow(v) {
  const layers = splitTopLevel(String(resolve(v)));
  const parsed = layers.map((layer) => {
    const color = (layer.match(/(rgba?\([^)]*\)|#[0-9a-f]{3,8})/i) || [])[1] || "#000000";
    const nums = layer.replace(color, "").trim().split(/\s+/).filter(Boolean);
    const [x = "0", y = "0", blur = "0", spread = "0"] = nums.map((n) => n.replace("px", ""));
    return { x, y, blur, spread, color, type: "dropShadow" };
  });
  return parsed.length ? parsed : null;
}

// ---------------------------------------------------------------- 1. flat
const flatOut = {};
for (const [name, value] of defs) flatOut[name] = value;

// ---------------------------------------------------------------- 2. DTCG
// References become {dot.path}. Composite values (all var(x) var(y), color-mix) have no
// DTCG reference syntax, so they are emitted verbatim rather than half-converted into
// something no tool would read correctly.
function toRef(raw) {
  const m = /^var\(\s*(--[a-z0-9-]+)\s*\)$/.exec(raw.trim());
  return m ? `{${toPath(m[1]).join(".")}}` : raw;
}
function nest(target, name, entry) {
  const segs = toPath(name);
  let node = target;
  for (const seg of segs.slice(0, -1)) {
    // A name can be both group and token (--alias-radius, --alias-radius-full). DTCG has
    // no representation for that, so the token moves to a `_` leaf rather than being
    // silently dropped or clobbering the group.
    if (node[seg] && node[seg].$value !== undefined) node[seg] = { _: node[seg] };
    node = node[seg] ||= {};
  }
  const leaf = segs[segs.length - 1];
  if (node[leaf] && node[leaf].$value === undefined) node[leaf]._ = entry;
  else node[leaf] = entry;
}

const dtcg = {};
for (const [name, value] of defs) {
  const type = inferType(value);
  const entry = { $value: type === "boxShadow" ? parseShadow(value) || toRef(value) : toRef(value), $type: type };
  if (descriptions[name]) entry.$description = String(descriptions[name]);
  nest(dtcg, name, entry);
}

// ---------------------------------------------------------------- 3. Tokens Studio
// Same nesting, but grouped into token sets and carrying $metadata.tokenSetOrder, which
// is what the Figma plugin reads to decide layer order.
const studio = {};
for (const [name, value] of defs) {
  const type = inferType(value);
  const entry = { $value: type === "boxShadow" ? parseShadow(value) || toRef(value) : toRef(value), $type: type };
  if (descriptions[name]) entry.$description = String(descriptions[name]);
  nest(studio, name, entry);
}
// A token set is the top-level group — `alias-color`, `base-easing` — which toPath
// already produces as its first segment. Order follows first appearance in tokens.css,
// so the Figma layer order mirrors how the stylesheet reads.
const setOrder = [];
for (const [name] of defs) {
  const set = toPath(name)[0];
  if (!setOrder.includes(set)) setOrder.push(set);
}
const studioOut = { $metadata: { tokenSetOrder: setOrder }, ...studio };

// ---------------------------------------------------------------- write
const files = {
  "tokens.json": JSON.stringify(flatOut, null, 2) + "\n",
  "tokens.dtcg.json": JSON.stringify(dtcg, null, 2) + "\n",
  "tokens.studio.json": JSON.stringify(studioOut, null, 2) + "\n",
};

if (process.argv.includes("--check")) {
  const stale = Object.entries(files).filter(([f, content]) => {
    const p = path.join(OUT, f);
    return !fs.existsSync(p) || fs.readFileSync(p, "utf8") !== content;
  }).map(([f]) => f);
  if (stale.length) {
    console.error(`✖ Stale 1.5 export(s): ${stale.join(", ")} — run: node scripts/token-export-1.5.cjs`);
    process.exit(1);
  }
  console.log("✓ tokens 1.5 exports are up to date.");
  process.exit(0);
}

fs.mkdirSync(OUT, { recursive: true });
for (const [f, content] of Object.entries(files)) fs.writeFileSync(path.join(OUT, f), content);

const described = defs.filter(([n]) => descriptions[n]).length;
console.log(`✓ Exported ${defs.length} tokens → tokens 1.5/`);
console.log(`    tokens.json         flat`);
console.log(`    tokens.dtcg.json    W3C DTCG`);
console.log(`    tokens.studio.json  Tokens Studio · ${setOrder.length} sets`);
console.log(`  descriptions: ${described}/${defs.length}` + (described ? "" : "  (token-descriptions.json not present yet)"));
