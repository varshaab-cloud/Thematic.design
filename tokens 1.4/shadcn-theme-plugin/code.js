// Thematic — Apply Cobalt Brand to shadcn/ui
// Uses the Figma Paint Styles API (getLocalPaintStyles) because the
// @shadcn/ui Figma kit uses Color Styles, not Variables, for component fills.
//
// Two families are remapped:
//   slate/* → MayThematic neutral grays  (slate/900 → cobalt primary)
//   blue/*  → MayThematic cobalt scale

figma.showUI(__html__, { width: 500, height: 700 });

// ─── Brand maps (key = numeric stop as string) ───────────────────────────

// slate: lighter stops → neutral grays, slate/900 → cobalt primary (button bg)
var SLATE = {
  '50':   '#f5f5f3',  // gray.75
  '100':  '#eeeeec',  // gray.100
  '200':  '#e3e3e0',  // gray.200
  '300':  '#d5d5d5',  // gray.300
  '400':  '#b1b1b1',  // gray.400
  '500':  '#909090',  // gray.500
  '600':  '#6d6d6d',  // gray.600
  '700':  '#464646',  // gray.700
  '800':  '#2e2e2e',  // gray.800 (interpolated)
  '900':  '#1518a6',  // ← cobalt PRIMARY (button background)
  '950':  '#222222',  // gray.900 — dark text / foreground
};

// blue: full cobalt scale
var BLUE = {
  '50':   '#eeeeff',
  '100':  '#c4c5f4',
  '200':  '#aaacf0',
  '300':  '#9194eb',
  '400':  '#6e71e6',
  '500':  '#3a3dee',
  '600':  '#1c21dc',
  '700':  '#171cbe',
  '800':  '#1518a6',
  '900':  '#111487',
  '950':  '#0a0d5c',
};

// ─── Helpers ───────────────────────────────────────────────────────────────
function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16) / 255,
    g: parseInt(hex.slice(3, 5), 16) / 255,
    b: parseInt(hex.slice(5, 7), 16) / 255,
  };
}

function rgbToHex(c) {
  var h = function(v) { return Math.round(v * 255).toString(16).padStart(2, '0'); };
  return '#' + h(c.r) + h(c.g) + h(c.b);
}

// "slate / 900" or "slate/900" → { family: "slate", stop: "900" }
function parseName(rawName) {
  var n = rawName.toLowerCase().trim();
  // Normalise separator: "slate / 900" → "slate/900"
  n = n.replace(/\s*\/\s*/g, '/');
  var slash = n.lastIndexOf('/');
  if (slash < 0) return null;
  return {
    family: n.slice(0, slash).trim(),
    stop:   n.slice(slash + 1).trim(),
  };
}

function getNewHex(family, stop) {
  if (family === 'slate' && SLATE[stop]) return SLATE[stop];
  if (family === 'blue'  && BLUE[stop])  return BLUE[stop];
  return null;
}

// ─── Message handler ───────────────────────────────────────────────────────
figma.ui.onmessage = function(msg) {
  if (msg.type === 'scan')   scan();
  if (msg.type === 'apply')  apply();
  if (msg.type === 'close')  figma.closePlugin();
};

// ─── SCAN ──────────────────────────────────────────────────────────────────
function scan() {
  try {
    var styles  = figma.getLocalPaintStyles();
    var matches = [];
    var allNames = [];

    for (var i = 0; i < styles.length; i++) {
      var s = styles[i];
      if (!s.paints || s.paints.length === 0) continue;

      var parsed = parseName(s.name);
      allNames.push(s.name);  // always record for debug

      if (!parsed) continue;
      var newHex = getNewHex(parsed.family, parsed.stop);
      if (!newHex) continue;

      var paint = s.paints[0];
      if (paint.type !== 'SOLID') continue;

      matches.push({
        styleId:   s.id,
        styleName: s.name,
        family:    parsed.family,
        stop:      parsed.stop,
        currentHex: rgbToHex(paint.color),
        newHex:    newHex,
      });
    }

    figma.ui.postMessage({
      type:     'scanResult',
      matches:  matches,
      allNames: allNames,
    });

  } catch(e) {
    figma.ui.postMessage({ type: 'error', text: String(e) });
  }
}

// ─── APPLY ─────────────────────────────────────────────────────────────────
function apply() {
  try {
    var styles  = figma.getLocalPaintStyles();
    var updated = 0;

    for (var i = 0; i < styles.length; i++) {
      var s = styles[i];
      if (!s.paints || s.paints.length === 0) continue;

      var parsed = parseName(s.name);
      if (!parsed) continue;

      var newHex = getNewHex(parsed.family, parsed.stop);
      if (!newHex) continue;

      if (s.paints[0].type !== 'SOLID') continue;

      // Clone paints array, update first solid
      var newPaints = JSON.parse(JSON.stringify(s.paints));
      newPaints[0] = {
        type:    'SOLID',
        color:   hexToRgb(newHex),
        opacity: newPaints[0].opacity  !== undefined ? newPaints[0].opacity  : 1,
        visible: newPaints[0].visible  !== undefined ? newPaints[0].visible  : true,
      };
      s.paints = newPaints;

      figma.ui.postMessage({ type: 'progress', text: '✓ ' + s.name + '  →  ' + newHex });
      updated++;
    }

    figma.ui.postMessage({ type: 'done', updated: updated });

  } catch(e) {
    figma.ui.postMessage({ type: 'error', text: String(e) });
  }
}
