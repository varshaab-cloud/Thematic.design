# Thematic Design System — Wireframe Implementation Task

## What this project is

**Thematic.Design** is an enterprise design system portfolio built in Storybook 10.4.0 with Next.js + Vite. It lives at `/Users/varsha/Documents/MayThematic`.

The design system is fully functional — Foundation documentation and a complete UI component library are already built and working in Storybook.

---

## Tech stack

- **Storybook 10.4.0** with `@storybook/nextjs-vite` framework
- **Next.js** (App Router)
- **Tailwind CSS** with design token CSS variables
- **Lucide React** for icons
- **shadcn/ui** as the component base
- **Style Dictionary v4** for token compilation (`tokens/tokens.json` → `src/styles/tokens.css`)

---

## What's already built

### Foundation docs (Storybook MDX pages)
All live under `src/stories/docs/`:
- `01-Introduction.mdx`
- `02-Colors.mdx`
- `03-Typography.mdx`
- `04-Tokens.mdx` — three-tier token architecture (Base → Alias → Component)
- `05-Spacing.mdx` — 4px base grid
- `06-Elevation.mdx`
- `07-Iconography.mdx` — Lucide React, outlined, 24px viewbox
- `08-FormPatterns.mdx`

### UI Components (all in `components/ui/`)
Every component below is fully built and has a corresponding Storybook story in `src/stories/`:

| Component | File |
|-----------|------|
| Button | `button.tsx` |
| Input / InputGroup | `input.tsx`, `input-group.tsx` |
| Card | `card.tsx` |
| Badge | `badge.tsx` |
| Avatar | `avatar.tsx` |
| Checkbox | `checkbox.tsx` |
| Switch | `switch.tsx` |
| Select | `select.tsx` |
| Combobox | `combobox.tsx` |
| Textarea | `textarea.tsx` |
| RadioGroup | `radio-group.tsx` |
| Slider | `slider.tsx` |
| Progress | `progress.tsx` |
| Tabs | `tabs.tsx` |
| Accordion | `accordion.tsx` |
| Table / DataTable | `table.tsx`, `data-table.tsx` |
| SidebarNav | `sidebar-nav.tsx` |
| Dialog | `dialog.tsx` |
| AlertDialog | `alert-dialog.tsx` |
| Alert | `alert.tsx` |
| Sheet | `sheet.tsx` |
| Popover | `popover.tsx` |
| DropdownMenu | `dropdown-menu.tsx` |
| Tooltip | `tooltip.tsx` |
| Form | `form.tsx` |
| Skeleton | `skeleton.tsx` |
| Separator | `separator.tsx` |
| ScrollArea | `scroll-area.tsx` |

There are also existing Storybook stories for full-page compositions:
- `Dashboard.stories.tsx` — uses placeholder `Block` components as wireframe scaffolding
- `DataTable.stories.tsx`
- `SidebarNav.stories.tsx` — uses the real `SidebarNav` component with Lucide icons + Avatar

---

## Design tokens

CSS variables are compiled to `src/styles/tokens.css`. Key patterns:

```css
/* Colours */
--base-color-blue-800: #1518A6;   /* primary brand / active state */
--base-color-gray-900: #222;      /* primary text */
--base-color-gray-700: #464646;   /* secondary text */
--base-color-gray-500: #909090;   /* muted / placeholder */
--base-color-gray-200: #E3E3E0;   /* borders */
--base-color-gray-75:  #F5F5F3;   /* page background */

/* Spacing (4px base grid) */
--base-spacing-1: 4px;
--base-spacing-2: 8px;
--base-spacing-3: 12px;
--base-spacing-4: 16px;
--base-spacing-5: 24px;
--base-spacing-6: 32px;

/* Radius */
--base-radius-md: 12px;   /* component default */
--base-radius-sm: 8px;
```

Component imports use the `@/` alias pointing to the project root:
```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarNav } from "@/components/ui/sidebar-nav"
```

---

## The task: Wireframe → Storybook stories

The user has HTML wireframe files they want converted into Storybook stories. The goal is to implement each wireframe screen as a `.stories.tsx` file under `src/stories/wireframes/` using the real components and design tokens above.

### Screens to implement
- **Dashboard / Home** — KPI cards, charts placeholder, activity feed
- **Login / Onboarding** — auth flow
- **Data table / List view** — filters, rows, actions
- **Settings / Profile** — form-heavy, workspace config

### How to structure each story file

```tsx
// src/stories/wireframes/Dashboard.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
// ... other imports

const meta: Meta = {
  title: "Wireframes/Dashboard",
  parameters: { layout: "fullscreen" },
}
export default meta

export const Default: StoryObj = {
  render: () => (
    // layout using real components + token CSS variables
  ),
}
```

### Where placeholder blocks are needed

For content that isn't a component (charts, maps, images), use a simple placeholder `Block` — already defined in `Dashboard.stories.tsx`:

```tsx
function Block({ label, height = 40, accent = false }) {
  return (
    <div style={{
      height,
      display: "flex", alignItems: "center", justifyContent: "center",
      borderRadius: 8,
      border: `1.5px dashed ${accent ? "#1518A6" : "#E3E3E0"}`,
      backgroundColor: accent ? "#C4C5F430" : "#F5F5F3",
    }}>
      <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.08em",
        textTransform: "uppercase", color: accent ? "#1518A6" : "#909090",
        fontFamily: "var(--font-sans, 'Outfit', sans-serif)" }}>
        {label}
      </span>
    </div>
  )
}
```

---

## How to run Storybook

```bash
cd /Users/varsha/Documents/MayThematic
npm run storybook
```

Storybook opens at `http://localhost:6006`. Hot-reloads on file save.

---

## Notes

- All MDX docs import `Meta` from `"@storybook/addon-docs/blocks"` (not `"@storybook/blocks"` — that package doesn't have a v10-compatible release)
- Tokens are already loaded globally — no import needed, use `var(--token-name)` anywhere
- Font is **Outfit** loaded via Next.js font system, available via `var(--font-sans)`
- Icon library is **Lucide React** — import from `"lucide-react"` only
