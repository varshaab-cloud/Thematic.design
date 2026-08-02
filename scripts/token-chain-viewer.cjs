#!/usr/bin/env node
/**
 * Thematic.design — standalone token chain viewer
 *
 * Emits token-chains.html: a single self-contained file with a Storybook-style layout —
 * every component in a left sidebar, the connector graph for the selected one on the
 * right. Data is embedded at generation time from the 1.5 exports, so the file works
 * offline and can be shared as one attachment; regenerate after token changes.
 *
 * Usage:  node scripts/token-chain-viewer.cjs
 */
const fs = require("fs");
const path = require("path");

const REPO = path.resolve(__dirname, "..");
const flat = JSON.parse(fs.readFileSync(path.join(REPO, "tokens 1.5/tokens.json"), "utf8"));
const studio = JSON.parse(fs.readFileSync(path.join(REPO, "tokens 1.5/tokens.studio.json"), "utf8"));

// Component list comes from the token sets the exporter derived from tokens.css section
// comments — the same grouping Figma sees, so the sidebar cannot disagree with the data.
const sets = studio.$metadata.tokenSetOrder.filter((s) => s.startsWith("component-"));
const components = sets.map((set) => {
  const prefix = `--${set}-`;
  const count = Object.keys(flat).filter((k) => k.startsWith(prefix)).length;
  const label = set.replace("component-", "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return { set, prefix, label, count };
}).filter((c) => c.count > 0);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Token chains · Thematic.design</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Open Sans', system-ui, sans-serif; background: #fff; color: #111; display: flex; height: 100vh; overflow: hidden; }

  /* ── sidebar ─────────────────────────────────────────── */
  .side { width: 250px; flex-shrink: 0; border-right: 1px solid #e3e3e0; background: #f5f5f3; display: flex; flex-direction: column; }
  .side .brand { padding: 16px 16px 12px; border-bottom: 1px solid #e3e3e0; }
  .side .brand .t { font-size: 13px; font-weight: 700; }
  .side .brand .s { font-size: 10.5px; color: #909090; margin-top: 2px; }
  .side .search { padding: 10px 12px; }
  .side .search input { width: 100%; font: inherit; font-size: 12px; padding: 6px 10px; border: 1px solid #d5d5d5; border-radius: 6px; background: #fff; outline: none; }
  .side .search input:focus { border-color: #1c21dc; }
  .side nav { flex: 1; overflow-y: auto; padding: 4px 8px 16px; }
  .side .grouphead { font-size: 10px; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; color: #909090; padding: 12px 8px 4px; }
  .side a.item { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 5px 8px; border-radius: 6px; font-size: 12.5px; color: #333; text-decoration: none; cursor: pointer; }
  .side a.item:hover { background: #eeeeec; }
  .side a.item.on { background: #1518a6; color: #fff; }
  .side a.item.on .n { color: rgba(255,255,255,0.7); }
  .side a.item .n { font-family: Menlo, Consolas, monospace; font-size: 10px; color: #909090; }

  /* ── main ────────────────────────────────────────────── */
  .main { flex: 1; overflow-y: auto; padding: 36px 36px 90px; }
  .kicker { font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #909090; margin-bottom: 8px; }
  h1 { font-size: 26px; font-weight: 700; margin-bottom: 8px; }
  .intro { font-size: 13.5px; line-height: 1.65; color: #464646; max-width: 640px; margin-bottom: 22px; }
  .toolbar { display: flex; gap: 6px; align-items: center; margin-bottom: 16px; flex-wrap: wrap; }
  .toolbar .lbl { font-size: 11px; color: #909090; margin-right: 4px; }
  .toolbar .hint { font-size: 11px; color: #909090; margin-left: auto; }
  .pill { font-size: 11px; padding: 3px 12px; border-radius: 999px; cursor: pointer; border: 1px solid #d5d5d5; background: #fff; font-family: inherit; color: #111; }
  .pill.on { border-color: #1c21dc; background: #eef0ff; }

  /* wires sit behind the columns: svg at z-0, columns at z-1, chips opaque */
  .stage { position: relative; display: grid; grid-template-columns: 1.5fr 1.2fr 0.9fr 1fr; gap: 30px; }
  svg.wires { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; overflow: visible; z-index: 0; }
  .col { min-width: 0; display: flex; flex-direction: column; position: relative; z-index: 1; }
  .colhead { font-size: 11px; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; color: #464646; margin-bottom: 4px; }
  .colhead .n { font-family: Menlo, Consolas, monospace; font-weight: 400; text-transform: none; letter-spacing: 0; color: #909090; margin-left: 6px; }
  .colblurb { font-size: 10.5px; color: #909090; line-height: 1.45; margin-bottom: 10px; min-height: 30px; }
  .chips { display: flex; flex-direction: column; gap: 5px; }
  .chip { display: flex; align-items: center; gap: 6px; padding: 5px 8px; border-radius: 4px; cursor: pointer; border: 1px solid #d5d5d5; background: #fff; transition: opacity .12s, border-color .12s; }
  .chip:hover { border-color: #909090; }
  .chip.on { border-color: #1c21dc; background: #eef0ff; }
  .chip.dim { opacity: 0.22; }
  .chip .sw { width: 12px; height: 12px; border-radius: 3px; flex-shrink: 0; border: 1px solid rgba(0,0,0,0.12); }
  .chip .name { font-family: Menlo, Consolas, monospace; font-size: 10.5px; word-break: break-all; }
  .chip .val { font-family: Menlo, Consolas, monospace; font-size: 10px; color: #909090; margin-left: auto; white-space: nowrap; }
  .empty { font-size: 11px; color: #909090; font-style: italic; }
  .detail { position: fixed; bottom: 0; left: 250px; right: 0; padding: 12px 36px; background: #f8f8ff; border-top: 1px solid #d0d2f5; font-size: 12px; color: #333; line-height: 1.6; z-index: 2; }
  .detail b { color: #1518a6; }
  .detail .chain { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-top: 4px; }
  .detail .cchip { background: #fff; border: 1px solid #d0d2f5; border-radius: 4px; padding: 2px 7px; font-family: Menlo, Consolas, monospace; font-size: 10.5px; }
  .detail .arr { color: #b1b1b1; font-size: 13px; }
</style>
</head>
<body>
<aside class="side">
  <div class="brand">
    <div class="t">Thematic.design</div>
    <div class="s">Token chains · ${components.length} components</div>
  </div>
  <div class="search"><input id="search" type="text" placeholder="Filter components…"></div>
  <nav id="nav"></nav>
</aside>

<main class="main">
  <p class="kicker">Foundation · Token chains</p>
  <h1 id="title"></h1>
  <p class="intro">
    Every visual decision in this component, traced to its raw value. Chains flow left to
    right: the component references a role, the role references the palette. Click any
    token to trace its complete chain.
  </p>
  <div class="toolbar" id="toolbar"></div>
  <div class="stage" id="stage"><svg class="wires" id="wires"></svg></div>
</main>

<div class="detail" id="detail">Click any token to trace its full chain from component slot to raw value.</div>

<script>
const TOKENS = ${JSON.stringify(flat)};
const COMPONENTS = ${JSON.stringify(components)};

const REF = /var\\((--[a-z0-9-]+)\\)/g;
const refsOf = v => [...String(v).matchAll(REF)].map(m => m[1]);
function resolve(name, d = 0) {
  const v = TOKENS[name];
  if (v === undefined || d > 12) return name;
  const rs = refsOf(v);
  if (rs.length === 1 && v.trim() === \`var(\${rs[0]})\`) return resolve(rs[0], d + 1);
  return v;
}
const isColor = v => /^#|^rgba?\\(|^hsla?\\(/.test(String(v).trim());
const tierOf = n => n.startsWith('--component-') ? 'component' : n.startsWith('--alias-') ? 'alias' : n.startsWith('--brand-') ? 'brand' : 'base';

const TIERS = [
  ['component', 'Component', "What the component's CSS references. Never holds a value."],
  ['alias', 'Alias', 'Semantic roles — what each value is for.'],
  ['brand', 'Brand', 'Which base values are ours. Swap this tier to rebrand.'],
  ['base', 'Base', 'Raw values. The only tier allowed to hold literals.'],
];

let current = COMPONENTS[0], filter = null, selected = null;
const chipEls = new Map();
let currentEdges = [];

/* Variant pills are derived, not configured: the segment straight after the component
   prefix, kept only when it splits the tokens into 2+ real groups. */
function variantsOf(c) {
  const segs = {};
  for (const k of Object.keys(TOKENS)) {
    if (!k.startsWith(c.prefix)) continue;
    const s = k.slice(c.prefix.length).split('-')[0];
    segs[s] = (segs[s] || 0) + 1;
  }
  // color/dimension/typography/elevation are property groups, not variants — a token
  // named ...-dimension-radius has no variant segment at all. Offering them as pills
  // reads as nonsense ("variant: dimension"), so they are excluded before deciding
  // whether the remainder genuinely partitions the component.
  const PROP = new Set(['color', 'dimension', 'typography', 'elevation', 'shadow', 'motion']);
  const cands = Object.entries(segs).filter(([s, n]) => n >= 3 && !PROP.has(s)).map(([s]) => s);
  return cands.length >= 2 ? cands : [];
}

function buildGraph() {
  const comp = Object.keys(TOKENS)
    .filter(k => k.startsWith(current.prefix))
    .filter(k => !filter || k.slice(current.prefix.length).split('-')[0] === filter);
  const tiers = { component: new Set(comp), alias: new Set(), brand: new Set(), base: new Set() };
  const edges = [];
  const q = [...comp], seen = new Set(comp);
  while (q.length) {
    const t = q.shift();
    for (const r of refsOf(TOKENS[t] ?? '')) {
      edges.push([t, r]);
      tiers[tierOf(r)].add(r);
      if (!seen.has(r)) { seen.add(r); q.push(r); }
    }
  }
  return { tiers, edges };
}

function connectedSet(start, edges) {
  const out = new Set([start]);
  let grew = true;
  while (grew) {
    grew = false;
    for (const [a, b] of edges) {
      if (out.has(a) && !out.has(b)) { out.add(b); grew = true; }
      if (out.has(b) && !out.has(a)) { out.add(a); grew = true; }
    }
  }
  return out;
}

function renderNav(q = '') {
  const nav = document.getElementById('nav');
  nav.innerHTML = '<div class="grouphead">Components</div>';
  for (const c of COMPONENTS) {
    if (q && !c.label.toLowerCase().includes(q.toLowerCase())) continue;
    const a = document.createElement('a');
    a.className = 'item' + (c.set === current.set ? ' on' : '');
    a.href = '#' + c.set;
    a.innerHTML = \`<span>\${c.label}</span><span class="n">\${c.count}</span>\`;
    a.onclick = (e) => { e.preventDefault(); location.hash = c.set; };
    nav.append(a);
  }
}

function renderToolbar() {
  const tb = document.getElementById('toolbar');
  tb.innerHTML = '';
  const vs = variantsOf(current);
  if (vs.length) {
    const lbl = document.createElement('span'); lbl.className = 'lbl'; lbl.textContent = 'Variant';
    tb.append(lbl);
    for (const v of [null, ...vs]) {
      const b = document.createElement('button');
      b.className = 'pill' + (filter === v ? ' on' : '');
      b.textContent = v ?? 'all';
      b.onclick = () => { filter = v; selected = null; renderToolbar(); renderGraph(); };
      tb.append(b);
    }
  }
  const hint = document.createElement('span'); hint.className = 'hint';
  hint.textContent = 'click any token to trace its chain · click again to clear';
  tb.append(hint);
}

function renderGraph() {
  const { tiers, edges } = buildGraph();
  currentEdges = edges;
  const stage = document.getElementById('stage');
  stage.querySelectorAll('.col').forEach(c => c.remove());
  chipEls.clear();

  for (const [tier, label, blurb] of TIERS) {
    const col = document.createElement('div'); col.className = 'col';
    col.innerHTML = \`<div class="colhead">\${label}<span class="n">\${tiers[tier].size}</span></div><div class="colblurb">\${blurb}</div>\`;
    const chips = document.createElement('div'); chips.className = 'chips';
    const names = [...tiers[tier]].sort();
    if (!names.length) chips.innerHTML = \`<div class="empty">no \${tier} tokens in this chain</div>\`;
    for (const name of names) {
      const el = document.createElement('div'); el.className = 'chip';
      const fin = resolve(name);
      const short = name.replace(/^--(component|alias|brand|base)-/, '');
      el.title = \`\${name}\\n= \${TOKENS[name] ?? ''}\`;
      el.innerHTML =
        (isColor(fin) ? \`<span class="sw" style="background:\${fin}"></span>\` : '') +
        \`<span class="name">\${short}</span>\` +
        (!isColor(fin) && refsOf(TOKENS[name] ?? '').length === 0
          ? \`<span class="val">\${fin.length > 14 ? fin.slice(0, 13) + '…' : fin}</span>\` : '');
      el.onclick = () => { selected = selected === name ? null : name; applyHighlight(); };
      chips.append(el);
      chipEls.set(name, el);
    }
    col.append(chips);
    stage.append(col);
  }
  requestAnimationFrame(() => setTimeout(drawWires, 40));
  applyHighlight(false);
}

function drawWires() {
  const stage = document.getElementById('stage');
  const svg = document.getElementById('wires');
  const sr = stage.getBoundingClientRect();
  svg.setAttribute('width', stage.offsetWidth);
  svg.setAttribute('height', stage.offsetHeight);
  svg.innerHTML = '';
  const lit = selected ? connectedSet(selected, currentEdges) : null;
  for (const [a, b] of currentEdges) {
    const ea = chipEls.get(a), eb = chipEls.get(b);
    if (!ea || !eb) continue;
    const ra = ea.getBoundingClientRect(), rb = eb.getBoundingClientRect();
    const x1 = ra.right - sr.left, y1 = ra.top + ra.height / 2 - sr.top;
    const x2 = rb.left - sr.left, y2 = rb.top + rb.height / 2 - sr.top;
    const mid = (x1 + x2) / 2;
    const on = lit ? lit.has(a) && lit.has(b) : false;
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', \`M \${x1} \${y1} C \${mid} \${y1}, \${mid} \${y2}, \${x2} \${y2}\`);
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke', on ? '#1c21dc' : '#8a8a8a');
    p.setAttribute('stroke-width', on ? 1.8 : 1.1);
    p.setAttribute('opacity', lit && !on ? 0.08 : on ? 1 : 0.55);
    svg.append(p);
  }
}

function applyHighlight(redraw = true) {
  const lit = selected ? connectedSet(selected, currentEdges) : null;
  for (const [name, el] of chipEls) {
    el.classList.toggle('on', name === selected);
    el.classList.toggle('dim', !!lit && !lit.has(name));
  }
  const d = document.getElementById('detail');
  if (!selected) {
    d.innerHTML = 'Click any token to trace its full chain from component slot to raw value.';
  } else {
    const hops = [selected];
    let cur = selected;
    for (let i = 0; i < 12; i++) {
      const rs = refsOf(TOKENS[cur] ?? '');
      if (rs.length !== 1 || (TOKENS[cur] ?? '').trim() !== \`var(\${rs[0]})\`) break;
      cur = rs[0]; hops.push(cur);
    }
    const fin = resolve(selected);
    d.innerHTML = \`<b>\${selected}</b> resolves to <b>\${fin}</b>\` +
      \`<div class="chain">\` +
      hops.map(h => \`<span class="cchip">\${h}</span>\`).join('<span class="arr">→</span>') +
      (refsOf(TOKENS[cur] ?? '').length === 0 && hops.length > 0 ? \`<span class="arr">→</span><span class="cchip">\${TOKENS[cur] ?? fin}</span>\` : '') +
      \`</div>\`;
  }
  if (redraw) drawWires();
}

function show(set) {
  const c = COMPONENTS.find(x => x.set === set) || COMPONENTS[0];
  current = c; filter = null; selected = null;
  document.getElementById('title').textContent = c.label;
  document.title = c.label + ' — token chains · Thematic.design';
  renderNav(document.getElementById('search').value);
  renderToolbar();
  renderGraph();
}

document.getElementById('search').addEventListener('input', e => renderNav(e.target.value));
window.addEventListener('hashchange', () => show(location.hash.slice(1)));
window.addEventListener('resize', () => drawWires());
show(location.hash.slice(1) || COMPONENTS[0].set);
</script>
</body>
</html>
`;

fs.writeFileSync(path.join(REPO, "token-chains.html"), html);
console.log(`✓ token-chains.html — ${components.length} components, ${Object.keys(flat).length} tokens embedded`);
