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

const ROOT = process.argv[2] || process.cwd();
const TOKENS_JSON = path.join(ROOT, "src/styles/tokens.json");

// ---- build value -> [token] map for suggestions ----
let valueToTokens = {};
try {
  const raw = JSON.parse(fs.readFileSync(TOKENS_JSON, "utf8"));
  for (const [name, val] of Object.entries(raw)) {
    const key = String(val).replace(/\s+/g, "").toLowerCase();
    (valueToTokens[key] ||= []).push(name);
  }
} catch (e) {
  console.error("⚠  Could not read tokens.json at", TOKENS_JSON, "- suggestions disabled.");
}
const hasToken = (v) => !!valueToTokens[String(v).replace(/\s+/g, "").toLowerCase()];
const suggest = (v) => {
  const hit = valueToTokens[String(v).replace(/\s+/g, "").toLowerCase()];
  return hit ? `use var(${hit[0]})` : "no matching token — add one or use an existing alias";
};
// dimensions: ERROR if a token exists for the value (should use it); WARNING if it's a one-off
const dimArr = (v) => (hasToken(v) ? errors : warnings);

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
const BRACKET_DIM = /\[(\d*\.?\d+)(px|rem|em)\]/g;      // tailwind arbitrary size
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
  const lines = fs.readFileSync(file, "utf8").split("\n");
  lines.forEach((ln, i) => {
    const L = i + 1;
    let m;

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
    while ((m = BRACKET_DIM.exec(ln))) { const v = m[1] + m[2]; if (!OK.test(v)) add(dimArr(v), file, L, m.index + 1, hasToken(v) ? "dimension has a token" : "one-off dimension", m[0], suggest(v)); }

    if (isCss) {
      // spacing / sizing / radius / font-size (errors)
      CSS_DIM.lastIndex = 0;
      while ((m = CSS_DIM.exec(ln))) {
        const decl = m[0];
        if (/var\(/.test(decl)) continue;
        let d; PXREM.lastIndex = 0;
        while ((d = PXREM.exec(decl))) { if (!OK.test(d[0])) { add(dimArr(d[0]), file, L, m.index + 1, hasToken(d[0]) ? "spacing/size has a token" : "one-off spacing/size", decl.trim(), suggest(d[0])); break; } }
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

// ---- report ----
const fmt = (v) => `  ${v.file}:${v.line}:${v.col}  [${v.kind}]  ${v.text}\n      → ${v.sugg}`;
console.log("\nThematic.design — token audit\n" + "=".repeat(40));
if (errors.length) { console.log(`\n✖ ERRORS (${errors.length})`); errors.forEach((v) => console.log(fmt(v))); }
if (warnings.length) { console.log(`\n⚠ WARNINGS (${warnings.length})`); warnings.forEach((v) => console.log(fmt(v))); }
console.log("\n" + "-".repeat(40));
console.log(`Errors: ${errors.length}   Warnings: ${warnings.length}`);
if (errors.length === 0) console.log("✓ No hardcoded errors — all visual values reference tokens.");
process.exit(errors.length > 0 ? 1 : 0);
