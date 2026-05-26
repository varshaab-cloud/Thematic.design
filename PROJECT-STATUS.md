# Thematic Design System — Project Status

## Access

| Resource | URL |
|---|---|
| Live Storybook | https://thematic.design |
| Vercel project | https://vercel.com/varshaab-clouds-projects/may-thematic |
| GitHub repo | Connected via Vercel (main branch auto-deploys broken — use deploy hook below) |
| Deploy hook | `curl -X POST "https://api.vercel.com/v1/integrations/deploy/prj_HGEUdvS0s7i9Mu43QKfWZIArMHIk/NGOQeDrbOZ"` |

> **Note:** Vercel's git webhook is broken. Always trigger deploys manually using the curl command above after pushing to main.

---

## Tech stack

- **Framework:** Next.js (App Router)
- **Storybook:** 10.4.0 with `@storybook/nextjs-vite`
- **Components:** shadcn/ui base, customised with Thematic tokens
- **Styling:** Tailwind CSS + CSS custom properties (`tokens.css`)
- **Token system:** 3-tier W3C format — Base → Alias → Component
- **Font:** Open Sans

---

## Repository structure

```
MayThematic/
├── components/ui/          # All component source files (.tsx)
├── src/stories/            # Storybook stories + MDX docs
│   ├── docs/               # Foundation docs (Introduction, Colour, Typography, etc.)
│   └── *.mdx               # Per-component documentation pages
├── src/styles/tokens.css   # Design tokens (auto-generated, source of truth)
├── .storybook/
│   └── preview.tsx         # Global Storybook config + sidebar sort order
└── app/                    # Next.js app (login, dashboard, settings pages)
```

---

## Sidebar structure (current)

```
Thematic Design System
  └── Introduction
  └── Foundation
        Colour / Typography / Spacing / Elevation / Iconography
        Design Tokens
          └── All tokens
          └── Token Architecture

Data display
  Accordion · Badge · Card · DataTable · Table

Messaging
  Alert · Toast

Imagery
  Avatar

Forms and input
  Button · Checkbox · Combobox · Input · RadioGroup · Select · Slider · Switch · Textarea

Overlays
  Dialog · Drawer · DropdownMenu · Popover · Tooltip

Navigation
  Pagination · SidebarNav · Tabs

Loading
  Progress · Skeleton

Pages
  Dashboard · Form templates

Wireframes
  Dashboard · DataTableView · Login · Settings
```

---

## What's done

### Foundation
- Design Tokens page (6 tabs: Architecture, Color, Typography, Spacing, Radius, Shadows, Components)
- Token Architecture page (3-tier diagram, naming conventions, dos/don'ts)
- Colour, Typography, Spacing, Elevation, Iconography pages (pre-existing)

### Component docs (MDX)
Every component has a custom MDX doc page with:
- Hero canvas (default story)
- Description explaining purpose and when to use
- Per-variant sections with Canvas + copy
- Usage guidelines (where relevant, merged from guides)

Components with MDX docs:
Accordion, Alert, Avatar, Badge, Button, Card, Checkbox, DataTable, Dialog, DropdownMenu, Input, Pagination, Popover, Progress, RadioGroup, Select, SidebarNav, Skeleton, Slider, Switch, Table, Tabs, Textarea, Toast, Tooltip

### Stories
- All components have `tags: ["autodocs"]` removed (custom MDX takes over)
- Most components have a `States` story showing all variants/states in one view
- Dialog includes AlertDialog (confirmation dialog) stories — AlertDialog.stories.tsx deleted
- SidebarNav has Expanded, Collapsed, Collapsible, WithActiveStates, MinimalNoSections stories

### Usage guidelines merged into components
Content from deleted guide files was added to relevant component MDX pages:
- **Toast** — timing rules (4s default, errors persist, undo 5–8s), position, copy pattern
- **Dialog** — confirmation copy rules (verb+noun button, "Cancel" always exact)
- **SidebarNav** — section limits, badge conventions (99+ cap, never 0, blue only)
- **Pagination** — page size defaults (10, never "All"), reset on filter
- **DataTable** — column types, four required states, toolbar layout spec

### Pages & Wireframes
- Dashboard page (full app layout)
- Form templates page
- 4 wireframe pages: Dashboard, DataTable view, Login, Settings

---

## What's in progress / next up

- **Accessibility audit** — WCAG 2.1 AA review of all components (parallel workstream)
- **Combobox** — component exists, stories exist, no MDX doc page yet
- **MetricCard** — documented in Card.mdx but worth a dedicated story set
- **Colour case inconsistency** — Foundation MDX files use "Thematic Design System" (capital D S), stories use "Thematic design system" (lowercase). Both appear as one group in the sidebar but is a latent issue worth fixing.

---

## Key conventions

### MDX doc pattern
```
# ComponentName
<Canvas of={Stories.Default} withToolbar={false} />
[description paragraph]
## Variant section
<Canvas of={Stories.Variant} withToolbar={false} />
[copy]
## Usage guidelines   ← only if non-obvious guidance exists
## Playground         ← only if component has argTypes (skip for Dialog, Toast, Accordion, DropdownMenu)
<Controls of={Stories.Default} />
```

### Storybook MDX import
```
import { Meta, Canvas } from "@storybook/addon-docs/blocks"
```
NOT `@storybook/blocks` — that import will break the build.

### Token naming
- `--base-color-blue-800` — raw primitive, never use in product code
- `--alias-color-text-primary` — semantic, use in layout/typography
- `--component-button-primary-background` — component-scoped, use inside that component only

### Deploy flow
```bash
git add .
git commit -m "your message"
git push
curl -X POST "https://api.vercel.com/v1/integrations/deploy/prj_HGEUdvS0s7i9Mu43QKfWZIArMHIk/NGOQeDrbOZ"
```
If git fails with `fatal: Unable to create .git/index.lock` — run `rm .git/index.lock` first.
