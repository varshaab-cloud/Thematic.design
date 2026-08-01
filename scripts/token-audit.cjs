#!/usr/bin/env node
/**
 * Thematic.design token audit (CI linter)
 * Scans CSS/SCSS and TSX/JSX for hardcoded visual values and suggests the matching token.
 *
 * Usage:  node scripts/token-audit.js [rootDir]
 * Exit:   1 if any ERROR-level violations found (CI-ready), else 0.
 */
const fs = require("fs");
const path = require("path");

// SCAN root = what the user asked us to audit (may be a subfolder like components/ui).
// REPO root = where the token definitions live. These are different whenever the audit
// is pointed at a subdirectory, and conflating them means we look for tokens.css inside
// components/ui, find nothing, and flag every var() in the library as undefined.
const ROOT = process.argv[2] || process.cwd();
function findRepoRoot(start) {
  let dir = path.resolve(start);
  for (;;) {
    if (fs.existsSync(path.join(dir, "package.json"))) return dir;
    const up = path.dirname(dir);
    if (up === dir) return path.resolve(start);
    dir = up;
  }
}
const REPO = findRepoRoot(ROOT);

// Normalise a value for comparison. Without this, `10px` and `0.625rem` are treated as
// different values even though they are identical, so a font-size expressed in rem is
// never matched against a px literal in a component.
const REM_PX = 16;
function norm(v) {
  const s = String(v).replace(/\s+/g, "").toLowerCase();
  const m = /^(-?\d*\.?\d+)rem$/.exec(s);
  if (m) return `${parseFloat(m[1]) * REM_PX}px`;
  const p = /^(-?\d*\.?\d+)px$/.exec(s);
  if (p) return `${parseFloat(p[1])}px`;
  return s;
}

// Which token family a value belongs to depends on the property it is set on, not on the
// value itself. 10px is a valid radius AND a valid font size, so matching on value alone
// will happily suggest a radius token for `text-[10px]`. The utility prefix tells us the
// property, so we use it to filter candidates before suggesting.
// Both sides — the utility and the token — are reduced to the same small set of family
// labels, then compared for equality. Matching token names with loose regexes instead
// fails in ways that are hard to spot: /size/ matches `font-size`, so a width utility
// happily accepts a typography token. Order matters here, because the first rule that
// matches wins and several token names contain more than one of these words.
function tokenFamily(name) {
  if (/typography|font-size|line-height|letter-spacing/.test(name)) return "type";
  if (/radius/.test(name))                                          return "radius";
  if (/shadow|elevation/.test(name))                                return "shadow";
  if (/duration|easing|motion|transition/.test(name))               return "motion";
  if (/border|stroke|ring|outline/.test(name))                      return "border";
  if (/spacing|padding|gap|inline|stack|margin/.test(name))         return "space";
  if (/dimension|width|height|-size$/.test(name))                   return "dim";
  return null;
}

const UTIL_FAMILY = [
  [/^(text|leading|tracking)$/,                                              "type"],
  [/^rounded(-(t|r|b|l|tl|tr|br|bl|s|e))?$/,                                 "radius"],
  [/^shadow(-[a-z]+)?$/,                                                     "shadow"],
  [/^(duration|delay|ease)$/,                                                "motion"],
  [/^(border|border-[trblxy]|ring|ring-offset|outline|outline-offset|stroke)$/, "border"],
  [/^(p|px|py|pt|pb|pl|pr|ps|pe|m|mx|my|mt|mb|ml|mr|ms|me|gap|gap-x|gap-y|space-x|space-y)$/, "space"],
  [/^(top|left|right|bottom|inset|inset-x|inset-y|translate-x|translate-y)$/, "space"],
  [/^(w|h|size|min-w|max-w|min-h|max-h|basis)$/,                             "dim"],
];

// Tailwind prefixes arrive with a trailing dash and may carry a leading dash for negative
// utilities (-inset-[14px]) or a variant chain (hover:min-w-[…]). Strip all of that before
// matching so `min-w-` and `-inset-` resolve as reliably as bare `w-`.
function familyFor(prefix) {
  if (!prefix) return null;
  const p = String(prefix)
    .replace(/^.*:/, "")   // drop variant chain: hover:, md:, data-open:
    .replace(/^-/, "")     // drop negative-utility dash
    .replace(/-$/, "");    // drop the trailing dash before the bracket
  if (!p) return null;
  for (const [util, fam] of UTIL_FAMILY) if (util.test(p)) return fam;
  return null;
}


const hasToken = (v) => !!valueToTokens[norm(v)];
const suggest = (v, prefix, owned) => {
  const all = valueToTokens[norm(v)];
  if (!all) return "no matching token — add one or use an existing alias";
  const hit = all.filter((t) => usableIn(t, owned || new Set()));
  if (!hit.length) return "no token this component can use — add a component token for this value";
  const fam = familyFor(prefix);
  // Prefer a token in the same property family, then prefer alias/component tier over
  // base — components should not reach past the semantic layer.
  const ranked = [...hit].sort((a, b) => {
    const famA = fam && tokenFamily(a) === fam ? 0 : 1;
    const famB = fam && tokenFamily(b) === fam ? 0 : 1;
    if (famA !== famB) return famA - famB;
    const tierA = /^--base-/.test(a) ? 1 : 0, tierB = /^--base-/.test(b) ? 1 : 0;
    return tierA - tierB;
  });
  if (fam && tokenFamily(ranked[0]) !== fam) {
    return `no ${fam} token for this value (nearest is var(${ranked[0]}), a ${tokenFamily(ranked[0]) || "different"} token) — add one or leave as a documented one-off`;
  }
  return `use var(${ranked[0]})`;
};
// Severity for a dimension literal depends on whether a token exists that is actually
// usable here, which means same value AND same property family. A radius token that
// happens to equal 14px is no help to `top-[14px]` — telling someone to "use the token"
// when the only match is from another family produces worse code than the literal did.
// Same value, right family  → ERROR   (a correct token exists; use it)
// Same value, wrong family  → WARNING (genuine one-off; add a token or leave it)
// No matching value         → WARNING (one-off)
//
// A component-tier token is only usable inside the component it belongs to. Matching on
// value alone will suggest --component-date-range-picker-… to chat-input.tsx purely
// because both happen to be 40px; taking that suggestion couples two unrelated components
// through a token neither one owns. Rather than mapping filenames to namespaces (the names
// do not line up — sidebar-nav.tsx uses --component-nav-*), infer ownership from the file
// itself: whichever --component-<ns>-* prefixes a file already references are its own.
function ownedNamespaces(fileSrc) {
  const ns = new Set();
  for (const m of fileSrc.matchAll(/--component-([a-z0-9]+(?:-[a-z0-9]+)?)-/g)) ns.add(m[1]);
  return ns;
}
function usableIn(token, owned) {
  if (!/^--component-/.test(token)) return true; // base/alias/semantic are shared
  for (const ns of owned) if (token.startsWith(`--component-${ns}-`)) return true;
  return false;
}
function hasUsableToken(v, prefix, owned) {
  const hit = valueToTokens[norm(v)];
  if (!hit) return false;
  const fam = familyFor(prefix);
  const candidates = hit.filter((t) => usableIn(t, owned || new Set()));
  if (!fam) return candidates.length > 0; // unknown utility — fall back to value matching
  return candidates.some((t) => tokenFamily(t) === fam);
}
const dimArr = (v, prefix, owned) => (hasUsableToken(v, prefix, owned) ? errors : warnings);

// ---- files to scan ----
const SKIP_DIRS = new Set(["node_modules", ".git", ".next", "dist", "build", "storybook-static"]);
const SKIP_FILES = new Set(["tokens.css", "tokens.json"]); // token definitions are exempt
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(path.join(dir, e.name), out); }
    else if (/\.(css|scss|tsx|jsx)$/.test(e.name) && !SKIP_FILES.has(e.name)) out.push(path.join(dir, e.name));
  }
  return out;
}

// ---- build the set of DEFINED custom properties ----
// A var() reference only resolves at runtime if the property is declared somewhere in
// the project's own CSS. Referencing an undefined token fails silently — the browser
// drops the declaration and the element renders unstyled, with no console error and no
// build failure. That makes it strictly harder to catch than a hardcoded value, which
// at least renders something. Hence: ERROR level.
const DEF_RE = /^\s*(--[a-z0-9-]+)\s*:/gim;
function collectCssFiles(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) collectCssFiles(path.join(dir, e.name), out); }
    else if (/\.(css|scss)$/.test(e.name)) out.push(path.join(dir, e.name));
  }
  return out;
}
const definedTokens = new Set();
const definitionFiles = collectCssFiles(REPO);
for (const f of definitionFiles) {
  const src = fs.readFileSync(f, "utf8");
  let d; DEF_RE.lastIndex = 0;
  while ((d = DEF_RE.exec(src))) definedTokens.add(d[1]);
}

// ---- build value -> [token] map for suggestions ----
// Sourced from tokens.css, not tokens.json. tokens.json is a stale export of an earlier
// token model: it carries names that no longer exist (--component-alert-*, since replaced
// by the family-based --component-feedback-alert-*) and is missing most of the current
// system. Suggesting from it means recommending tokens that resolve to nothing — the exact
// failure the undefined-reference check exists to catch. tokens.css is what the browser
// actually reads, so it is the only defensible source of truth here.
//
// Declared after norm() on purpose: this block calls it, and `const` bindings sit in the
// temporal dead zone until their declaration is evaluated. Building the map earlier throws
// a ReferenceError that a catch would swallow, leaving the map empty — which silently
// downgrades every dimension error to a warning and reports a clean run. A linter that can
// fail open is worse than no linter.
const rawDefs = new Map();
for (const f of definitionFiles) {
  const src = fs.readFileSync(f, "utf8");
  let d; const RE = /^\s*(--[a-z0-9-]+)\s*:\s*([^;]+);/gim;
  while ((d = RE.exec(src))) if (!rawDefs.has(d[1])) rawDefs.set(d[1], d[2].trim());
}
// Resolve var() chains down to a literal so an alias defined as var(--base-…) still
// matches a literal in a component. Depth-capped so a circular definition cannot hang CI.
function resolveValue(v, depth = 0) {
  if (depth > 10) return v;
  const m = /^var\(\s*(--[a-z0-9-]+)\s*\)$/.exec(String(v).trim());
  if (!m) return v;
  const next = rawDefs.get(m[1]);
  return next === undefined ? v : resolveValue(next, depth + 1);
}
const valueToTokens = {};
for (const [name, raw] of rawDefs) {
  (valueToTokens[norm(resolveValue(raw))] ||= []).push(name);
}
if (rawDefs.size === 0) console.error("⚠  No token definitions found under", REPO, "- suggestions disabled.");

// Some custom properties are injected at runtime by libraries rather than declared in
// CSS, so they will never appear in a stylesheet and must not be reported. Radix sets
// --radix-* on its floating elements (trigger width, transform origin); Tailwind uses
// --tw-* internally for composed utilities.
const RUNTIME_VAR = /^--(radix|tw)-/;

// "did you mean" — rank defined tokens by how many dash-segments they share with the
// unknown one. Catches the common case of a wrong family segment, e.g.
// --component-alert-color-bg  →  --component-feedback-alert-color-bg
function nearestToken(unknown) {
  const want = new Set(unknown.split("-").filter(Boolean));
  let best = null, bestScore = 0;
  for (const t of definedTokens) {
    let score = 0;
    for (const seg of t.split("-")) if (want.has(seg)) score++;
    if (score > bestScore) { bestScore = score; best = t; }
  }
  return bestScore >= 3 ? `did you mean var(${best})?` : "token is not defined in any stylesheet";
}

const VAR_REF = /var\(\s*(--[a-z0-9-]+)/gi;

// ---- allowlist: values that are fine literal ----
const OK = /^(0|0px|0rem|0ms|0s|transparent|currentcolor|inherit|initial|unset|none|auto|100%|50%|1px)$/i;
const inVar = (line, idx) => {
  // crude: is this match inside a var(...) reference?
  const before = line.slice(Math.max(0, idx - 60), idx);
  return /var\(\s*--[a-z0-9-]*$/i.test(before);
};

// ---- rules ----
const HEX = /#[0-9a-fA-F]{3,8}\b/g;
const RGB = /rgba?\([^)]*\)/g;
const BRACKET_HEX = /\[#[0-9a-fA-F]{3,8}\]/g;          // tailwind arbitrary color
const BRACKET_DIM = /([a-z:-]*)\[(\d*\.?\d+)(px|rem|em)\]/g;  // tailwind arbitrary size (grp1 = utility prefix)
const CSS_DIM = /(?:font-size|padding|margin|gap|border-radius|width|height|top|left|right|bottom)\s*:\s*([^;]+);/gi;
const PXREM = /\b\d*\.?\d+(px|rem|em)\b/g;
const DURATION = /\b\d*\.?\d+m?s\b/g;
const SHADOW = /box-shadow\s*:\s*([^;]+);/gi;
const ZINDEX = /z-index\s*:\s*(\d+)\s*;/gi;

const errors = [];
const warnings = [];
const add = (arr, file, line, col, kind, text, sugg) =>
  arr.push({ file: path.relative(ROOT, file), line, col, kind, text, sugg });

for (const file of walk(ROOT)) {
  const isCss = /\.(css|scss)$/.test(file);
  const srcText = fs.readFileSync(file, "utf8");
  const owned = ownedNamespaces(srcText);
  const lines = srcText.split("\n");
  lines.forEach((ln, i) => {
    const L = i + 1;
    let m;

    // undefined token references (errors)
    VAR_REF.lastIndex = 0;
    while ((m = VAR_REF.exec(ln))) {
      if (RUNTIME_VAR.test(m[1])) continue;
      if (!definedTokens.has(m[1])) add(errors, file, L, m.index + 1, "undefined token reference", `var(${m[1]})`, nearestToken(m[1]));
    }

    // colors (errors)
    HEX.lastIndex = 0;
    while ((m = HEX.exec(ln))) { if (!inVar(ln, m.index)) add(errors, file, L, m.index + 1, "hardcoded color", m[0], suggest(m[0])); }
    RGB.lastIndex = 0;
    while ((m = RGB.exec(ln))) {
      const v = m[0].replace(/\s+/g, "");
      if (/^rgba?\(0,0,0,0\)$/i.test(v)) continue; // transparent
      if (!inVar(ln, m.index)) add(errors, file, L, m.index + 1, "hardcoded color", m[0], suggest(m[0]));
    }
    // tailwind arbitrary literals (errors)
    BRACKET_HEX.lastIndex = 0;
    while ((m = BRACKET_HEX.exec(ln))) add(errors, file, L, m.index + 1, "hardcoded color (arbitrary class)", m[0], suggest(m[0].slice(1, -1)));
    BRACKET_DIM.lastIndex = 0;
    while ((m = BRACKET_DIM.exec(ln))) { const v = m[2] + m[3]; if (!OK.test(v)) add(dimArr(v, m[1], owned), file, L, m.index + 1, hasUsableToken(v, m[1], owned) ? "dimension has a token" : "one-off dimension", m[0], suggest(v, m[1], owned)); }

    if (isCss) {
      // spacing / sizing / radius / font-size (errors)
      CSS_DIM.lastIndex = 0;
      while ((m = CSS_DIM.exec(ln))) {
        const decl = m[0];
        if (/var\(/.test(decl)) continue;
        let d; PXREM.lastIndex = 0;
        while ((d = PXREM.exec(decl))) { if (!OK.test(d[0])) { add(dimArr(d[0], null, owned), file, L, m.index + 1, hasUsableToken(d[0], null, owned) ? "spacing/size has a token" : "one-off spacing/size", decl.trim(), suggest(d[0], null, owned)); break; } }
      }
      // box-shadow (warning)
      SHADOW.lastIndex = 0;
      while ((m = SHADOW.exec(ln))) { if (!/var\(/.test(m[0])) add(warnings, file, L, m.index + 1, "raw box-shadow", m[1].trim(), suggest(m[1].trim())); }
      // z-index (warning)
      ZINDEX.lastIndex = 0;
      while ((m = ZINDEX.exec(ln))) add(warnings, file, L, m.index + 1, "raw z-index", m[1], suggest(m[1]));
      // durations (warning)
      if (/transition|animation/i.test(ln)) {
        DURATION.lastIndex = 0;
        while ((m = DURATION.exec(ln))) { if (!OK.test(m[0]) && !inVar(ln, m.index)) add(warnings, file, L, m.index + 1, "raw duration", m[0], suggest(m[0])); }
      }
    }
  });
}

// ---- validate the token chain itself ----
// tokens.css is exempt from the hardcoded-value rules (it is where literals belong),
// but its var() references still have to resolve. A broken link here silently breaks
// every component downstream of it, so the chain is worth checking on its own.
for (const f of definitionFiles) {
  if (!SKIP_FILES.has(path.basename(f))) continue; // already covered by the main scan
  fs.readFileSync(f, "utf8").split("\n").forEach((ln, i) => {
    let m; VAR_REF.lastIndex = 0;
    while ((m = VAR_REF.exec(ln))) {
      if (RUNTIME_VAR.test(m[1])) continue;
      if (!definedTokens.has(m[1])) add(errors, f, i + 1, m.index + 1, "broken token chain", `var(${m[1]})`, nearestToken(m[1]));
    }
  });
}

// ---- report ----
const fmt = (v) => `  ${v.file}:${v.line}:${v.col}  [${v.kind}]  ${v.text}\n      → ${v.sugg}`;
console.log("\nThematic.design — token audit\n" + "=".repeat(40));
if (errors.length) { console.log(`\n✖ ERRORS (${errors.length})`); errors.forEach((v) => console.log(fmt(v))); }
if (warnings.length) { console.log(`\n⚠ WARNINGS (${warnings.length})`); warnings.forEach((v) => console.log(fmt(v))); }
console.log("\n" + "-".repeat(40));
console.log(`Errors: ${errors.length}   Warnings: ${warnings.length}`);
if (errors.length === 0) console.log("✓ No hardcoded errors — all visual values reference tokens.");
process.exit(errors.length > 0 ? 1 : 0);
