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

// Hand-written descriptions, for tokens whose purpose is not evident from their name.
let descriptions = {};
if (fs.existsSync(DESCRIPTIONS)) {
  descriptions = JSON.parse(fs.readFileSync(DESCRIPTIONS, "utf8"));
  delete descriptions.$schema;
}

// ---------------------------------------------------------------- described
// Everything not hand-written gets a templated description. The component tier is 1,149
// tokens following a handful of suffix patterns — writing those by hand would produce
// 1,100 lines of near-identical prose that nobody would keep current, and a stale
// description is worse than none. Templating them keeps the sidecar to the ~100 tokens
// where a human actually has something to say.
const TITLE = (s) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
const ROLE = {
  bg: "Background colour", text: "Text colour",
  stroke: "Border colour", border: "Border colour", icon: "Icon colour", fill: "Fill colour",
  radius: "Corner radius", "padding-x": "Horizontal padding", "padding-y": "Vertical padding",
  padding: "Padding", gap: "Gap between elements", "icon-size": "Icon size",
  "min-height": "Minimum height", "max-width": "Maximum width", width: "Width", height: "Height",
  size: "Size", "stroke-width": "Border width", family: "Font family", weight: "Font weight",
  "line-height": "Line height", "font-size": "Font size", elevation: "Shadow",
};
const STATE = {
  default: "in its resting state", hover: "on hover", active: "while pressed",
  focus: "while focused", disabled: "while disabled", checked: "when checked",
  selected: "when selected", error: "in its error state", open: "while open",
};

function templated(name) {
  const segs = rawPath(name);
  const set = segs[0];
  const tail = segs.slice(1);
  const tier = set.split("-")[0];

  if (tier === "base") {
    // Name the ramp, not the category: "Blue 800", not "Color 800". The category is
    // already obvious from the set the token sits in.
    const label = /^\d+$/.test(tail.join(""))
      ? `${TITLE(set.replace("base-", ""))} step ${tail.join(" ")}`
      : TITLE(tail.join(" "));
    return label.trim() +
      ". Raw palette value — reference an alias or brand token rather than using this directly.";
  }
  if (tier === "brand") {
    return `${TITLE(set.replace("brand-", ""))} ${tail.join(" ")}`.trim() +
      ". Part of a brand ramp; swapping brands replaces this tier without touching components.";
  }
  // The alias tier is mostly hand-written, because that is where meaning lives. Two
  // groups are exceptions: typography styles are 92 tokens across a fixed set of text
  // styles x four properties, and a handful of colour roles follow the same shape as
  // ones already described. Templating those keeps the sidecar to what needs judgement.
  if (tier === "alias" && set === "alias-typography") {
    const prop = ["font-size", "font-weight", "font-family", "line-height"].find((p) => name.endsWith(p));
    const style = tail.join("-").replace(new RegExp(`-?${prop}$`), "");
    const label = { "font-size": "Font size", "font-weight": "Font weight", "font-family": "Font family", "line-height": "Line height" }[prop] || TITLE(tail.join(" "));
    return `${label} for the ${TITLE(style)} text style.`;
  }
  if (tier === "alias") {
    return `${TITLE(tail.join(" "))}. Semantic role — reference this rather than the value beneath it.`;
  }
  if (tier === "component") {
    const component = TITLE(set.replace("component-", ""));
    const state = tail.find((t) => STATE[t]);
    // Longest matching role wins, so "icon-size" beats "size" and "padding-x" beats "padding".
    const key = Object.keys(ROLE).sort((a, b) => b.length - a.length)
      .find((r) => tail.join("-").includes(r));
    const role = key ? ROLE[key] : TITLE(tail.join(" "));
    const variant = tail.find((t) => ["primary", "secondary", "ghost", "destructive", "outline", "sm", "lg", "user", "assistant", "system"].includes(t));
    return [role, "for the", component, variant || "", state ? STATE[state] : ""]
      .filter(Boolean).join(" ").replace(/\s+/g, " ") + ".";
  }
  return null;
}

const describe = (name) => descriptions[name] || templated(name);

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
  const desc = describe(name);
  if (desc) entry.$description = String(desc);
  nest(dtcg, name, entry);
}

// ---------------------------------------------------------------- 3. Tokens Studio
// Same nesting, but grouped into token sets and carrying $metadata.tokenSetOrder, which
// is what the Figma plugin reads to decide layer order.
const studio = {};
for (const [name, value] of defs) {
  const type = inferType(value);
  const entry = { $value: type === "boxShadow" ? parseShadow(value) || toRef(value) : toRef(value), $type: type };
  const desc = describe(name);
  if (desc) entry.$description = String(desc);
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

// A description whose token no longer exists is worse than a missing one: it reads as
// current, and the rename that orphaned it is exactly when someone would trust it. Cheap
// to detect, so it fails the check rather than warning.
const orphans = Object.keys(descriptions).filter((k) => !(k in flat));
if (orphans.length) {
  console.error(`✖ ${orphans.length} description(s) in token-descriptions.json reference tokens that no longer exist:`);
  for (const o of orphans) console.error(`    ${o}`);
  process.exit(1);
}

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

const hand = defs.filter(([n]) => descriptions[n]).length;
const auto = defs.filter(([n]) => !descriptions[n] && templated(n)).length;
console.log(`✓ Exported ${defs.length} tokens → tokens 1.5/`);
console.log(`    tokens.json         flat`);
console.log(`    tokens.dtcg.json    W3C DTCG`);
console.log(`    tokens.studio.json  Tokens Studio · ${setOrder.length} sets`);
console.log(`  descriptions: ${hand + auto}/${defs.length}  (${hand} hand-written, ${auto} templated)`);
