# Token Chain — Base → Alias → Component

Interactive diagram showing how a single raw value flows through all three tiers of the Thematic design token architecture, using **Button Primary** as the example.

---

<div style="font-family:'Open Sans',system-ui,sans-serif;background:#fff;padding:24px 20px 32px;color:#111;max-width:1100px;">

<style>
  .tc * { box-sizing: border-box; margin: 0; padding: 0; }
  .tc .page-title { font-size: 13px; font-weight: 700; color: #555; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 20px; }
  .tc .tiers { display: grid; grid-template-columns: 1fr 24px 1fr 24px 1fr; align-items: start; }
  .tc .tier-col { display: flex; flex-direction: column; }
  .tc .tier-header { padding: 8px 14px; border-radius: 8px 8px 0 0; font-size: 11px; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; }
  .tc .tier-base .tier-header    { background: #f0f0f0; color: #555; }
  .tc .tier-alias .tier-header   { background: #e8eaff; color: #2a2fd4; }
  .tc .tier-comp .tier-header    { background: #1c21dc; color: #fff; }
  .tc .tier-desc { font-size: 11px; color: #888; padding: 4px 14px 10px; border-left: 1px solid #eee; border-right: 1px solid #eee; border-bottom: 1px solid #eee; background: #fafafa; margin-bottom: 12px; line-height: 1.5; }
  .tc .arrow-col { display: flex; align-items: center; justify-content: center; padding-top: 12px; }
  .tc .arrow { color: #ccc; font-size: 18px; margin-top: 40px; }
  .tc .token-group { border: 1px solid #eee; border-radius: 0 0 8px 8px; overflow: hidden; }
  .tc .token-row { display: flex; flex-direction: column; padding: 9px 14px; border-bottom: 1px solid #f5f5f5; cursor: pointer; transition: background 0.1s; gap: 2px; }
  .tc .token-row:last-child { border-bottom: none; }
  .tc .token-row:hover { background: #f8f8ff; }
  .tc .token-row.active { background: #f0f2ff; }
  .tc .token-name { font-family: 'Menlo','Consolas',monospace; font-size: 10.5px; color: #333; font-weight: 500; word-break: break-all; }
  .tc .token-value { font-size: 10.5px; color: #888; font-family: monospace; }
  .tc .token-swatch-row { display: flex; align-items: center; gap: 6px; }
  .tc .swatch { width: 12px; height: 12px; border-radius: 3px; flex-shrink: 0; border: 1px solid rgba(0,0,0,0.08); }
  .tc .role-label { font-size: 10px; font-weight: 600; color: #aaa; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 6px; margin-top: 4px; padding: 0 14px; }
  .tc .highlight-base  { border-left: 3px solid #d5d5d5 !important; }
  .tc .highlight-alias { border-left: 3px solid #6e71e6 !important; }
  .tc .highlight-comp  { border-left: 3px solid #1c21dc !important; }
  .tc .preview-section { margin-top: 24px; padding-top: 20px; border-top: 1px solid #f0f0f0; }
  .tc .preview-label { font-size: 11px; font-weight: 700; color: #555; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 12px; }
  .tc .btn-row { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
  .tc .btn { display: inline-flex; align-items: center; justify-content: center; padding: 10px 24px; border-radius: 6px; font-size: 14px; font-weight: 500; font-family: 'Open Sans',system-ui,sans-serif; border: 1px solid transparent; cursor: default; transition: background 0.15s; }
  .tc .btn-primary  { background: #1518a6; color: #fff; }
  .tc .btn-hover    { background: #111487; color: #fff; }
  .tc .btn-secondary { background: transparent; color: #1518a6; border-color: #d5d5d5; }
  .tc .btn-ghost    { background: transparent; color: #1518a6; }
  .tc .btn-disabled { background: #eeeeec; color: #909090; cursor: not-allowed; }
  .tc .btn-label    { font-size: 11px; color: #aaa; margin-top: 4px; text-align: center; font-family: monospace; }
  .tc .btn-col      { display: flex; flex-direction: column; align-items: center; }
  .tc .info-panel   { margin-top: 16px; padding: 12px 16px; background: #f8f8ff; border: 1px solid #e0e1f8; border-radius: 8px; font-size: 12px; color: #3a3dee; line-height: 1.6; min-height: 44px; }
  .tc .info-panel strong { color: #1518a6; }
  .tc .chain { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-top: 6px; }
  .tc .chip { background: #fff; border: 1px solid #d0d2f5; border-radius: 4px; padding: 2px 7px; font-family: monospace; font-size: 10.5px; color: #1518a6; }
  .tc .chip.base  { border-color: #d5d5d5; color: #555; }
  .tc .chip.alias { border-color: #9194eb; color: #2a2fd4; }
  .tc .chip.comp  { border-color: #1c21dc; color: #1518a6; background: #f0f2ff; }
  .tc .chip-arrow { color: #bbb; font-size: 13px; }
</style>

<div class="tc">
<div class="page-title">Primary Button — Token Chain</div>
<div class="tiers">

  <div class="tier-col tier-base">
    <div class="tier-header">Base</div>
    <div class="tier-desc">Raw values. No semantic meaning. Only changed when the palette itself changes.</div>
    <div class="token-group">
      <div class="role-label">Colour</div>
      <div class="token-row base-row" data-key="blue-800" onclick="tcSelect(this,'base-blue-800')">
        <div class="token-swatch-row"><div class="swatch" style="background:#1518a6"></div><span class="token-name">--base-color-blue-800</span></div>
        <span class="token-value">#1518a6</span>
      </div>
      <div class="token-row base-row" data-key="blue-900" onclick="tcSelect(this,'base-blue-900')">
        <div class="token-swatch-row"><div class="swatch" style="background:#111487"></div><span class="token-name">--base-color-blue-900</span></div>
        <span class="token-value">#111487</span>
      </div>
      <div class="token-row base-row" data-key="white" onclick="tcSelect(this,'base-white')">
        <div class="token-swatch-row"><div class="swatch" style="background:#fff;border-color:#e0e0e0"></div><span class="token-name">--base-color-white</span></div>
        <span class="token-value">#ffffff</span>
      </div>
      <div class="token-row base-row" data-key="gray-100" onclick="tcSelect(this,'base-gray-100')">
        <div class="token-swatch-row"><div class="swatch" style="background:#eeeeec"></div><span class="token-name">--base-color-gray-100</span></div>
        <span class="token-value">#eeeeec</span>
      </div>
      <div class="token-row base-row" data-key="gray-500" onclick="tcSelect(this,'base-gray-500')">
        <div class="token-swatch-row"><div class="swatch" style="background:#909090"></div><span class="token-name">--base-color-gray-500</span></div>
        <span class="token-value">#909090</span>
      </div>
      <div class="role-label">Typography</div>
      <div class="token-row base-row" data-key="size-300" onclick="tcSelect(this,'base-size-300')">
        <span class="token-name">--base-font-size-300</span><span class="token-value">0.875rem (14px)</span>
      </div>
      <div class="token-row base-row" data-key="weight-medium" onclick="tcSelect(this,'base-weight-medium')">
        <span class="token-name">--base-font-weight-medium</span><span class="token-value">500</span>
      </div>
      <div class="role-label">Spacing</div>
      <div class="token-row base-row" data-key="spacing-3" onclick="tcSelect(this,'base-spacing-3')">
        <span class="token-name">--base-spacing-3</span><span class="token-value">0.75rem (12px)</span>
      </div>
      <div class="token-row base-row" data-key="spacing-5" onclick="tcSelect(this,'base-spacing-5')">
        <span class="token-name">--base-spacing-5</span><span class="token-value">1.5rem (24px)</span>
      </div>
      <div class="role-label">Radius</div>
      <div class="token-row base-row" data-key="radius-md" onclick="tcSelect(this,'base-radius-md')">
        <span class="token-name">--base-radius-md</span><span class="token-value">6px</span>
      </div>
    </div>
  </div>

  <div class="arrow-col"><div class="arrow">→</div></div>

  <div class="tier-col tier-alias">
    <div class="tier-header">Alias</div>
    <div class="tier-desc">Semantic roles. Brand-aware. Changing a brand only touches this tier.</div>
    <div class="token-group">
      <div class="role-label">Colour</div>
      <div class="token-row alias-row" data-key="bg-brand" onclick="tcSelect(this,'alias-bg-brand')">
        <div class="token-swatch-row"><div class="swatch" style="background:#1518a6"></div><span class="token-name">--alias-color-background-brand</span></div>
        <span class="token-value">var(--base-color-blue-800)</span>
      </div>
      <div class="token-row alias-row" data-key="bg-brand-dark" onclick="tcSelect(this,'alias-bg-brand-dark')">
        <div class="token-swatch-row"><div class="swatch" style="background:#111487"></div><span class="token-name">--alias-color-background-brand-dark</span></div>
        <span class="token-value">var(--base-color-blue-900)</span>
      </div>
      <div class="token-row alias-row" data-key="text-inverse" onclick="tcSelect(this,'alias-text-inverse')">
        <div class="token-swatch-row"><div class="swatch" style="background:#fff;border-color:#e0e0e0"></div><span class="token-name">--alias-color-text-inverse</span></div>
        <span class="token-value">var(--base-color-white)</span>
      </div>
      <div class="token-row alias-row" data-key="bg-tertiary" onclick="tcSelect(this,'alias-bg-tertiary')">
        <div class="token-swatch-row"><div class="swatch" style="background:#eeeeec"></div><span class="token-name">--alias-color-background-tertiary</span></div>
        <span class="token-value">var(--base-color-gray-100)</span>
      </div>
      <div class="token-row alias-row" data-key="text-disabled" onclick="tcSelect(this,'alias-text-disabled')">
        <div class="token-swatch-row"><div class="swatch" style="background:#909090"></div><span class="token-name">--alias-color-text-disabled</span></div>
        <span class="token-value">var(--base-color-gray-500)</span>
      </div>
      <div class="role-label">Typography</div>
      <div class="token-row alias-row" data-key="btn-size" onclick="tcSelect(this,'alias-btn-size')">
        <span class="token-name">--alias-typography-button-size</span><span class="token-value">var(--base-font-size-300)</span>
      </div>
      <div class="token-row alias-row" data-key="btn-weight" onclick="tcSelect(this,'alias-btn-weight')">
        <span class="token-name">--alias-typography-button-weight</span><span class="token-value">var(--base-font-weight-medium)</span>
      </div>
      <div class="role-label">Spacing</div>
      <div class="token-row alias-row" data-key="pad-sm" onclick="tcSelect(this,'alias-pad-sm')">
        <span class="token-name">--alias-spacing-padding-sm</span><span class="token-value">var(--base-spacing-3)</span>
      </div>
      <div class="token-row alias-row" data-key="pad-lg" onclick="tcSelect(this,'alias-pad-lg')">
        <span class="token-name">--alias-spacing-padding-lg</span><span class="token-value">var(--base-spacing-5)</span>
      </div>
      <div class="role-label">Radius</div>
      <div class="token-row alias-row" data-key="radius-md" onclick="tcSelect(this,'alias-radius-md')">
        <span class="token-name">--alias-radius-md</span><span class="token-value">var(--base-radius-md)</span>
      </div>
    </div>
  </div>

  <div class="arrow-col"><div class="arrow">→</div></div>

  <div class="tier-col tier-comp">
    <div class="tier-header">Component</div>
    <div class="tier-desc">Component-specific roles. What a designer or developer actually uses.</div>
    <div class="token-group">
      <div class="role-label">Colour</div>
      <div class="token-row comp-row" data-key="bg-default" onclick="tcSelect(this,'comp-bg-default')">
        <div class="token-swatch-row"><div class="swatch" style="background:#1518a6"></div><span class="token-name">--component-button-primary-color-bg-default</span></div>
        <span class="token-value">var(--alias-color-background-brand)</span>
      </div>
      <div class="token-row comp-row" data-key="bg-hover" onclick="tcSelect(this,'comp-bg-hover')">
        <div class="token-swatch-row"><div class="swatch" style="background:#111487"></div><span class="token-name">--component-button-primary-color-bg-hover</span></div>
        <span class="token-value">var(--alias-color-background-brand-dark)</span>
      </div>
      <div class="token-row comp-row" data-key="text-default" onclick="tcSelect(this,'comp-text-default')">
        <div class="token-swatch-row"><div class="swatch" style="background:#fff;border-color:#e0e0e0"></div><span class="token-name">--component-button-primary-color-text-default</span></div>
        <span class="token-value">var(--alias-color-text-inverse)</span>
      </div>
      <div class="token-row comp-row" data-key="bg-disabled" onclick="tcSelect(this,'comp-bg-disabled')">
        <div class="token-swatch-row"><div class="swatch" style="background:#eeeeec"></div><span class="token-name">--component-button-primary-color-bg-disabled</span></div>
        <span class="token-value">var(--alias-color-background-tertiary)</span>
      </div>
      <div class="token-row comp-row" data-key="text-disabled" onclick="tcSelect(this,'comp-text-disabled')">
        <div class="token-swatch-row"><div class="swatch" style="background:#909090"></div><span class="token-name">--component-button-primary-color-text-disabled</span></div>
        <span class="token-value">var(--alias-color-text-disabled)</span>
      </div>
      <div class="role-label">Typography</div>
      <div class="token-row comp-row" data-key="typo-size" onclick="tcSelect(this,'comp-typo-size')">
        <span class="token-name">--component-button-primary-typography-size</span><span class="token-value">var(--alias-typography-button-size)</span>
      </div>
      <div class="token-row comp-row" data-key="typo-weight" onclick="tcSelect(this,'comp-typo-weight')">
        <span class="token-name">--component-button-primary-typography-weight</span><span class="token-value">var(--alias-typography-button-weight)</span>
      </div>
      <div class="role-label">Spacing</div>
      <div class="token-row comp-row" data-key="pad-y" onclick="tcSelect(this,'comp-pad-y')">
        <span class="token-name">--component-button-primary-dimension-padding-y</span><span class="token-value">var(--alias-spacing-padding-sm)</span>
      </div>
      <div class="token-row comp-row" data-key="pad-x" onclick="tcSelect(this,'comp-pad-x')">
        <span class="token-name">--component-button-primary-dimension-padding-x</span><span class="token-value">var(--alias-spacing-padding-lg)</span>
      </div>
      <div class="role-label">Radius</div>
      <div class="token-row comp-row" data-key="radius" onclick="tcSelect(this,'comp-radius')">
        <span class="token-name">--component-button-primary-dimension-radius</span><span class="token-value">var(--alias-radius-md)</span>
      </div>
    </div>
  </div>

</div>

<div class="info-panel" id="tc-info-panel">Click any token row to trace its full chain from raw value to component usage.</div>

<div class="preview-section">
  <div class="preview-label">Live component</div>
  <div class="btn-row">
    <div class="btn-col"><div class="btn btn-primary">Save changes</div><div class="btn-label">default</div></div>
    <div class="btn-col"><div class="btn btn-hover">Save changes</div><div class="btn-label">hover</div></div>
    <div class="btn-col"><div class="btn btn-disabled">Save changes</div><div class="btn-label">disabled</div></div>
    <div class="btn-col"><div class="btn btn-secondary">Cancel</div><div class="btn-label">secondary</div></div>
    <div class="btn-col"><div class="btn btn-ghost">Learn more</div><div class="btn-label">ghost</div></div>
  </div>
</div>
</div>

<script>
const TC_CHAINS = {
  'base-blue-800':      { label: 'Brand background colour', chain: ['--base-color-blue-800 = #1518a6','--alias-color-background-brand','--component-button-primary-color-bg-default'] },
  'base-blue-900':      { label: 'Brand hover/active colour', chain: ['--base-color-blue-900 = #111487','--alias-color-background-brand-dark','--component-button-primary-color-bg-hover'] },
  'base-white':         { label: 'Label colour on brand surfaces', chain: ['--base-color-white = #ffffff','--alias-color-text-inverse','--component-button-primary-color-text-default'] },
  'base-gray-100':      { label: 'Disabled background', chain: ['--base-color-gray-100 = #eeeeec','--alias-color-background-tertiary','--component-button-primary-color-bg-disabled'] },
  'base-gray-500':      { label: 'Disabled text', chain: ['--base-color-gray-500 = #909090','--alias-color-text-disabled','--component-button-primary-color-text-disabled'] },
  'base-size-300':      { label: 'Button label size', chain: ['--base-font-size-300 = 0.875rem','--alias-typography-button-size','--component-button-primary-typography-size'] },
  'base-weight-medium': { label: 'Button label weight', chain: ['--base-font-weight-medium = 500','--alias-typography-button-weight','--component-button-primary-typography-weight'] },
  'base-spacing-3':     { label: 'Vertical padding', chain: ['--base-spacing-3 = 0.75rem','--alias-spacing-padding-sm','--component-button-primary-dimension-padding-y'] },
  'base-spacing-5':     { label: 'Horizontal padding', chain: ['--base-spacing-5 = 1.5rem','--alias-spacing-padding-lg','--component-button-primary-dimension-padding-x'] },
  'base-radius-md':     { label: 'Corner radius', chain: ['--base-radius-md = 6px','--alias-radius-md','--component-button-primary-dimension-radius'] },
};
const TC_ALIAS_MAP = { 'alias-bg-brand':'base-blue-800','alias-bg-brand-dark':'base-blue-900','alias-text-inverse':'base-white','alias-bg-tertiary':'base-gray-100','alias-text-disabled':'base-gray-500','alias-btn-size':'base-size-300','alias-btn-weight':'base-weight-medium','alias-pad-sm':'base-spacing-3','alias-pad-lg':'base-spacing-5','alias-radius-md':'base-radius-md' };
const TC_COMP_MAP  = { 'comp-bg-default':'base-blue-800','comp-bg-hover':'base-blue-900','comp-text-default':'base-white','comp-bg-disabled':'base-gray-100','comp-text-disabled':'base-gray-500','comp-typo-size':'base-size-300','comp-typo-weight':'base-weight-medium','comp-pad-y':'base-spacing-3','comp-pad-x':'base-spacing-5','comp-radius':'base-radius-md' };
const TC_CHAIN_KEYS = { 'base-blue-800':{base:'blue-800',alias:'bg-brand',comp:'bg-default'},'base-blue-900':{base:'blue-900',alias:'bg-brand-dark',comp:'bg-hover'},'base-white':{base:'white',alias:'text-inverse',comp:'text-default'},'base-gray-100':{base:'gray-100',alias:'bg-tertiary',comp:'bg-disabled'},'base-gray-500':{base:'gray-500',alias:'text-disabled',comp:'text-disabled'},'base-size-300':{base:'size-300',alias:'btn-size',comp:'typo-size'},'base-weight-medium':{base:'weight-medium',alias:'btn-weight',comp:'typo-weight'},'base-spacing-3':{base:'spacing-3',alias:'pad-sm',comp:'pad-y'},'base-spacing-5':{base:'spacing-5',alias:'pad-lg',comp:'pad-x'},'base-radius-md':{base:'radius-md',alias:'radius-md',comp:'radius'} };
let tcCurrent = null;
function tcSelect(el, key) {
  document.querySelectorAll('.tc .token-row').forEach(r => r.classList.remove('active','highlight-base','highlight-alias','highlight-comp'));
  if (tcCurrent === key) { tcCurrent = null; document.getElementById('tc-info-panel').innerHTML = 'Click any token row to trace its full chain from raw value to component usage.'; return; }
  tcCurrent = key;
  let rootKey = TC_ALIAS_MAP[key] || TC_COMP_MAP[key] || key;
  const ck = TC_CHAIN_KEYS[rootKey];
  if (ck) {
    document.querySelectorAll('.tc .base-row').forEach(r => { if(r.dataset.key===ck.base) r.classList.add('active','highlight-base'); });
    document.querySelectorAll('.tc .alias-row').forEach(r => { if(r.dataset.key===ck.alias) r.classList.add('active','highlight-alias'); });
    document.querySelectorAll('.tc .comp-row').forEach(r => { if(r.dataset.key===ck.comp) r.classList.add('active','highlight-comp'); });
  }
  const info = TC_CHAINS[rootKey];
  if (!info) return;
  document.getElementById('tc-info-panel').innerHTML = `<strong>${info.label}</strong><div class="chain"><span class="chip base">${info.chain[0]}</span><span class="chip-arrow">→</span><span class="chip alias">${info.chain[1]}</span><span class="chip-arrow">→</span><span class="chip comp">${info.chain[2]}</span></div>`;
}
</script>

</div>

---

## Why three tiers?

**Base** holds the raw palette — `#1518a6` lives here once. Swap the brand colour and every component updates automatically.

**Alias** assigns meaning — `background-brand` is the role, not the value. This is where a second brand (white-label) would diverge: swap the alias layer, base and components stay untouched.

**Component** names the exact usage — `button-primary-color-bg-default` is what a developer writes. It holds no hardcoded value, only a pointer up to alias.

| Change needed | Tier touched |
|---|---|
| New brand colour | Alias only |
| Adjust button padding | Component only |
| Swap entire palette | Base only |
| White-label for a client | Alias only |
