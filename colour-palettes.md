# Thematic Design System — Colour Palettes

## Token Architecture

The system uses a 3-tier token model:

```
Tier 1 · Base        --base-color-{hue}-{shade}          Raw hex values, named by hue
Tier 2 · Brand alias --brand-{name}-{role}-{shade}        Role-mapped references per brand
Tier 3 · Semantic    --alias-color-{purpose}-{variant}    UI meaning, brand-agnostic
```

Components always reference Tier 3 semantic tokens. Switching a brand is done by swapping which base colours the brand alias tokens point to — no component code changes needed.

---

## Shade Scale

| Shade | Usage |
|-------|-------|
| 100   | Lightest tint, hover backgrounds |
| 200   | Subtle backgrounds, tags |
| 300   | Disabled fills |
| 400   | Borders, dividers |
| 500   | Icon fills, mid tones |
| **600 ★** | **Primary action colour — buttons, links, highlights** |
| 700   | Hover state on 600 |
| 800   | Active / pressed state |
| 900   | Darkest — text on light backgrounds |
| 50    | Page background (neutrals only) |

---

## Brand 1 — Cobalt

**Personality:** Enterprise · Sophisticated · Classic  
**Best for:** Analytics platforms, data tools, B2B SaaS, financial dashboards

### Token mapping

| Role | Hue | Token prefix | 600 value |
|------|-----|-------------|-----------|
| Primary | Blue | `--brand-cobalt-primary-{n}` | `#1c21dc` |
| Secondary | Teal | `--brand-cobalt-secondary-{n}` | `#0d9488` |
| Tertiary | Rose | `--brand-cobalt-tertiary-{n}` | `#db2777` |
| Neutral | Slate | `--brand-cobalt-neutral-{n}` | `#475569` |

### Primary · Blue

| Shade | Hex | Usage |
|-------|-----|-------|
| 100 | `#e0e1fc` | Lightest blue tint, hover bg |
| 200 | `#c1c3f9` | Subtle blue backgrounds |
| 300 | `#9496f5` | Disabled fills |
| 400 | `#6769f0` | Borders, dividers |
| 500 | `#3a3dee` | Icon fills |
| **600** | **`#1c21dc`** | **Primary action — buttons, links** |
| 700 | `#1519b0` | Hover on 600 |
| 800 | `#0e1283` | Active / pressed |
| 900 | `#111487` | Darkest blue |

### Secondary · Teal

| Shade | Hex | Usage |
|-------|-----|-------|
| 100 | `#ccfbf1` | Lightest teal tint |
| 200 | `#99f6e4` | Subtle teal backgrounds |
| 300 | `#5eead4` | Disabled fills |
| 400 | `#2dd4bf` | Borders, dividers |
| 500 | `#14b8a6` | Icon fills |
| **600** | **`#0d9488`** | **Secondary action** |
| 700 | `#0f766e` | Hover on 600 |
| 800 | `#115e59` | Active / pressed |
| 900 | `#134e4a` | Darkest teal |

### Tertiary · Rose

| Shade | Hex | Usage |
|-------|-----|-------|
| 100 | `#fdf2f8` | Lightest rose tint |
| 200 | `#fce7f3` | Subtle rose backgrounds |
| 300 | `#fbcfe8` | Disabled fills |
| 400 | `#f9a8d4` | Borders, dividers |
| 500 | `#f472b6` | Icon fills |
| **600** | **`#db2777`** | **Tertiary action, highlights** |
| 700 | `#be185d` | Hover on 600 |
| 800 | `#9d174d` | Active / pressed |
| 900 | `#831843` | Darkest rose |

### Neutral · Cool Slate

| Shade | Hex | Usage |
|-------|-----|-------|
| 50  | `#f8fafc` | Page background |
| 100 | `#f1f5f9` | Surface / card background |
| 200 | `#e2e8f0` | Dividers, borders |
| 300 | `#cbd5e1` | Subtle borders |
| 400 | `#94a3b8` | Placeholder text |
| 500 | `#64748b` | Secondary text |
| 600 | `#475569` | Body text |
| 700 | `#334155` | Strong text |
| 800 | `#1e293b` | Headings |
| 900 | `#0f172a` | Darkest — max contrast |

### Data Visualisation · 8 Categorical Colours

| Position | Name | Hex |
|----------|------|-----|
| cat-1 | Blue | `#1c21dc` |
| cat-2 | Teal | `#0d9488` |
| cat-3 | Rose | `#db2777` |
| cat-4 | Amber | `#f59e0b` |
| cat-5 | Cyan | `#06b6d4` |
| cat-6 | Violet | `#8b5cf6` |
| cat-7 | Lime | `#65a30d` |
| cat-8 | Slate | `#475569` |

---

## Brand 2 — Terra

**Personality:** Sustainable · Wellness · Healthcare  
**Best for:** Health platforms, wellness apps, sustainability products, environmental tools

### Token mapping

| Role | Hue | Token prefix | 600 value |
|------|-----|-------------|-----------|
| Primary | Emerald | `--brand-terra-primary-{n}` | `#166534` |
| Secondary | Sienna | `--brand-terra-secondary-{n}` | `#a3400f` |
| Tertiary | Gold | `--brand-terra-tertiary-{n}` | `#b45309` |
| Neutral | Sand | `--brand-terra-neutral-{n}` | `#7a7265` |

### Primary · Emerald

| Shade | Hex | Usage |
|-------|-----|-------|
| 100 | `#ecfdf5` | Lightest green tint |
| 200 | `#d1fae5` | Subtle green backgrounds |
| 300 | `#a7f3d0` | Disabled fills |
| 400 | `#6ee7b7` | Borders, dividers |
| 500 | `#34d399` | Icon fills |
| **600** | **`#166534`** | **Primary action — buttons, links** |
| 700 | `#14532d` | Hover on 600 |
| 800 | `#0f3d22` | Active / pressed |
| 900 | `#0a2718` | Darkest emerald |

### Secondary · Sienna

| Shade | Hex | Usage |
|-------|-----|-------|
| 100 | `#fff7ed` | Lightest sienna tint |
| 200 | `#ffedd5` | Subtle sienna backgrounds |
| 300 | `#fed7aa` | Disabled fills |
| 400 | `#fdba74` | Borders, dividers |
| 500 | `#c2521a` | Icon fills |
| **600** | **`#a3400f`** | **Secondary action** |
| 700 | `#823010` | Hover on 600 |
| 800 | `#61210b` | Active / pressed |
| 900 | `#401407` | Darkest sienna |

### Tertiary · Gold

| Shade | Hex | Usage |
|-------|-----|-------|
| 100 | `#fffbeb` | Lightest gold tint |
| 200 | `#fef3c7` | Subtle gold backgrounds |
| 300 | `#fde68a` | Disabled fills |
| 400 | `#fcd34d` | Borders, dividers |
| 500 | `#f59e0b` | Icon fills |
| **600** | **`#b45309`** | **Tertiary action, highlights** |
| 700 | `#92400e` | Hover on 600 |
| 800 | `#6e3008` | Active / pressed |
| 900 | `#451d05` | Darkest gold |

### Neutral · Warm Sand

| Shade | Hex | Usage |
|-------|-----|-------|
| 50  | `#fdfcf8` | Page background |
| 100 | `#f5f2ea` | Surface / card background |
| 200 | `#e8e2d5` | Dividers, borders |
| 300 | `#cec6b4` | Subtle borders |
| 400 | `#a89e8c` | Placeholder text |
| 500 | `#7a7265` | Secondary text |
| 600 | `#504a40` | Body text |
| 700 | `#35302a` | Strong text |
| 800 | `#1e1a15` | Headings |
| 900 | `#0d0b09` | Darkest — max contrast |

### Data Visualisation · 8 Categorical Colours

| Position | Name | Hex |
|----------|------|-----|
| cat-1 | Emerald | `#166534` |
| cat-2 | Sienna | `#a3400f` |
| cat-3 | Gold | `#b45309` |
| cat-4 | Rose | `#db2777` |
| cat-5 | Teal | `#0d9488` |
| cat-6 | Blue | `#1c21dc` |
| cat-7 | Violet | `#7c3aed` |
| cat-8 | Sand | `#7a7265` |

---

## Shared Semantic Colours (both brands)

These are the same for both brands — used for system states only.

| Purpose | Hex | Token |
|---------|-----|-------|
| Error / Danger | `#dc2626` | `--base-color-red-600` |
| Success | `#16a34a` | `--base-color-green-600` |
| Warning | `#d97706` | `--base-color-yellow-600` |
| Info | `#0284c7` | `--base-color-info-600` |

---

## Base Layer Token Names

All hue scales live in the base layer. Brand alias tokens reference these.

```
--base-color-blue-{100–900}
--base-color-teal-{100–900}
--base-color-rose-{100–900}
--base-color-slate-{50–900}
--base-color-emerald-{100–900}
--base-color-sienna-{100–900}
--base-color-gold-{100–900}
--base-color-sand-{50–900}
--base-color-red-{100–900}
--base-color-green-{100–900}
--base-color-yellow-{100–900}
--base-color-info-{100–900}
```
