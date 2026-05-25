# Thematic Design System — Version Snapshot v0.1.0

**Date:** 2026-05-17  
**Status:** Foundation complete. Component library built. Pre-audit.  
**Next step:** Surface layer audit (Layers framework — `/layers-surface`)

---

## What's in this version

### Token system
- **Total tokens:** 258 across three tiers
  - Base: 82 tokens (raw values — colour, spacing, radius, shadow, font)
  - Alias: 101 tokens (semantic mappings — brand, status, surface roles)
  - Component: 75 tokens (component-specific overrides)
- **Source:** `tokens/tokens.json` (W3C DTCG spec, Style Dictionary v4)
- **Output:** `src/styles/tokens.css`
- **Build command:** `node build-tokens.mjs`

### Foundation documentation (8 MDX pages)
All live in `src/stories/docs/`:

| Page | Title | Status |
|------|-------|--------|
| 01-Introduction.mdx | Introduction | ✓ |
| 02-Colors.mdx | Colour | ✓ |
| 03-Typography.mdx | Typography | ✓ |
| 04-Tokens.mdx | Token Architecture | ✓ |
| 05-Spacing.mdx | Spacing | ✓ |
| 06-Elevation.mdx | Elevation | ✓ |
| 07-Iconography.mdx | Iconography | ✓ |
| 08-FormPatterns.mdx | Form Patterns | ✓ |

### Component library (33 components)
All live in `components/ui/`:

| Component | File | Story |
|-----------|------|-------|
| Accordion | accordion.tsx | ✓ |
| Alert | alert.tsx | ✓ |
| AlertDialog | alert-dialog.tsx | ✓ |
| Avatar | avatar.tsx | ✓ |
| Badge | badge.tsx | ✓ |
| Button | button.tsx | ✓ |
| Card | card.tsx | ✓ |
| Checkbox | checkbox.tsx | ✓ |
| Collapsible | collapsible.tsx | — |
| Combobox | combobox.tsx | ✓ |
| Command | command.tsx | — |
| DataTable | data-table.tsx | ✓ |
| Dialog | dialog.tsx | ✓ |
| DropdownMenu | dropdown-menu.tsx | ✓ |
| Form | form.tsx | ✓ |
| Input | input.tsx | ✓ |
| InputGroup | input-group.tsx | — |
| Popover | popover.tsx | ✓ |
| Progress | progress.tsx | ✓ |
| RadioGroup | radio-group.tsx | ✓ |
| ScrollArea | scroll-area.tsx | — |
| Select | select.tsx | ✓ |
| Separator | separator.tsx | — |
| Sheet | sheet.tsx | ✓ |
| SidebarNav | sidebar-nav.tsx | ✓ |
| Skeleton | skeleton.tsx | ✓ |
| Slider | slider.tsx | ✓ |
| Switch | switch.tsx | ✓ |
| Table | table.tsx | ✓ |
| Tabs | tabs.tsx | ✓ |
| Textarea | textarea.tsx | ✓ |
| Toast / Sonner | sonner.tsx | ✓ |
| Tooltip | tooltip.tsx | ✓ |

### Composition stories
- `Dashboard.stories.tsx` — full-page dashboard layout (placeholder blocks)
- `DataTable.stories.tsx` — data table with filters and actions
- `SidebarNav.stories.tsx` — sidebar with real components + Lucide icons

---

## Design decisions locked in this version

### Colour
- Single trust anchor: **blue** (`#1518A6` at 800)
- 9-step blue scale (100–900)
- Warm neutral gray scale
- Semantic red/green for status only
- Rule: no raw hex in components — tokens only

### Typography
- Typeface: **Outfit** (geometric humanist sans-serif)
- Scale: 8 steps from Caption 2 (0.625rem) to Heading 1 (3rem)
- Weights in use: 400, 500, 600, 700

### Spacing
- Base grid: **4px**
- Scale: `--base-spacing-0` (0) through `--base-spacing-10` (80px)
- Rule: no arbitrary pixel values — Tailwind scale maps directly to tokens

### Iconography
- Library: **Lucide React** only
- Style: outlined, 24px viewbox, 1.5px stroke
- Sizes: 16 / 20 / 24 / 32 / 48px
- Active state: blue-800 only — never decorative blue

### Elevation
- 5 shadow levels (`--base-shadow-01` through `--base-shadow-05`)
- Dual-layer diffuse shadows — no harsh drop shadows

### Radius
- Component default: `--base-radius-md` (12px)
- Scale: xs / sm / md / lg / xl / xxl

---

## Known gaps going into the surface audit

- No formal conceptual model documented (objects, relationships, ubiquitous language)
- No breadboard / interaction flow documented
- No job stories documented
- Error states not systematically defined across components
- Empty states not defined
- No dark mode implementation (alias tier is structured for it, but not applied)
- Collapsible, Command, InputGroup, ScrollArea, Separator have no stories yet
- Wireframe screens not yet built

---

## Tech stack

- Storybook 10.4.0 (`@storybook/nextjs-vite`)
- Next.js (App Router)
- Tailwind CSS
- Lucide React
- shadcn/ui (component base)
- Style Dictionary v4 (token build)
- Vite (bundler)
