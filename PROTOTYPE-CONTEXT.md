# Thematic — Prototype Build Context

## What this is
Thematic is a production-ready enterprise design system built on Next.js 14 (App Router) + Tailwind CSS + Radix UI primitives. All 54 components are already built, tokenised, and ready to use. The task is to build new prototype screens as Next.js pages inside the existing app.

## Stack
- **Framework**: Next.js 14, App Router, TypeScript
- **Styling**: Tailwind CSS + CSS custom properties (design tokens)
- **Components**: All live at `@/components/ui/`
- **Icons**: Lucide React only (`import { X } from "lucide-react"`)
- **Fonts**: Open Sans (loaded via globals)
- **Run locally**: `npm run dev` → `http://localhost:3000`

---

## Folder structure for new pages

All prototype screens go inside `app/dashboard/` so they automatically get the sidebar + layout:

```
app/
├── dashboard/
│   ├── layout.tsx          ← Sidebar nav + shell (DO NOT EDIT)
│   ├── page.tsx            ← Overview / home screen
│   ├── team/page.tsx       ← Team management (exists)
│   ├── settings/page.tsx   ← Settings (exists)
│   └── [new-screen]/page.tsx  ← Add new screens here
├── login/page.tsx          ← Full-page login (no sidebar)
```

To add a new screen: create `app/dashboard/[screen-name]/page.tsx` and add its nav item to `app/dashboard/layout.tsx`.

---

## Dashboard layout

The layout (`app/dashboard/layout.tsx`) already wires up:
- `SidebarNav` with logo, nav sections, and user footer
- Active state based on `usePathname()`
- Navigation via `router.push()`
- Full-height flex layout: sidebar left, content right

To add a nav item, edit the `NAV` array in `layout.tsx`:
```tsx
{ label: "Patients", icon: <Users />, href: "/dashboard/patients" }
```

---

## Page template

Every dashboard page follows this shell:

```tsx
"use client"
import React from "react"

export default function PageName() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--alias-color-border-default)] bg-white shrink-0">
        <div>
          <h1 className="text-base font-semibold text-[var(--alias-color-text-primary)]">Page Title</h1>
          <p className="text-xs text-[var(--alias-color-text-subtle)] mt-0.5">Supporting description</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Actions */}
        </div>
      </div>
      {/* Content area */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Page content */}
      </div>
    </div>
  )
}
```

---

## Component imports

All components import from `@/components/ui/[name]`:

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { MetricCard } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Combobox } from "@/components/ui/combobox"
import { DatePicker } from "@/components/ui/date-picker"
import { Pagination } from "@/components/ui/pagination"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { EmptyState } from "@/components/ui/empty-state"
import { SystemBanner } from "@/components/ui/system-banner"
import { List, ListItem } from "@/components/ui/list"
import { Timeline, TimelineItem } from "@/components/ui/timeline"
import { Stepper, StepperStep } from "@/components/ui/stepper"
import { TagInput } from "@/components/ui/tag-input"
import { MultiSelect } from "@/components/ui/multi-select"
import { NumberInput } from "@/components/ui/number-input"
import { FileUpload } from "@/components/ui/file-upload"
import { SegmentedControl } from "@/components/ui/segmented-control"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
```

---

## Token colours (use these, never hardcoded hex)

```
Text
  --alias-color-text-primary       main body, headings
  --alias-color-text-secondary     secondary labels
  --alias-color-text-subtle        muted, placeholders
  --alias-color-text-disabled      disabled copy
  --alias-color-text-inverse       text on dark/brand bg
  --alias-color-text-brand         brand-coloured links

Backgrounds
  --alias-color-background-primary    white page bg
  --alias-color-background-secondary  gray-75 sidebar/subtle surface
  --alias-color-background-tertiary   gray-100 component layers
  --alias-color-background-brand      brand-filled surfaces

Borders
  --alias-color-border-default     standard borders
  --alias-color-border-subtle      very light dividers
  --alias-color-border-active      focus / active state

Feedback
  --alias-color-feedback-success-fg / -bg
  --alias-color-feedback-warning-fg / -bg
  --alias-color-feedback-error-fg   / -bg
  --alias-color-feedback-info-fg    / -bg

Brand accent
  --base-color-blue-800   primary brand blue  (#1518a6)
  --base-color-blue-100   brand tint bg
  --base-color-gray-75    app shell background
```

---

## Tailwind helpers

Use Tailwind for spacing, layout, and flex/grid. For colours, always use `bg-[var(--token)]` syntax:

```tsx
<div className="bg-[var(--alias-color-background-secondary)] border border-[var(--alias-color-border-default)] rounded-lg p-4">
```

---

## Existing pages (for reference / don't duplicate)

| Route | File | What it does |
|---|---|---|
| `/` | `app/page.tsx` | Root redirect |
| `/login` | `app/login/page.tsx` | Login screen, no sidebar |
| `/dashboard` | `app/dashboard/page.tsx` | Overview / home |
| `/dashboard/team` | `app/dashboard/team/page.tsx` | Team management table |
| `/dashboard/settings` | `app/dashboard/settings/page.tsx` | Settings |

---

## Key rules

1. **All pages are `"use client"`** — the app uses client-side hooks throughout
2. **Never hardcode colours** — always use `var(--token-name)` 
3. **Icons from lucide-react only** — no other icon libraries
4. **Don't touch** `app/dashboard/layout.tsx`, `app/globals.css`, `src/styles/tokens.css`, or any file in `components/ui/` unless specifically fixing a component bug
5. **Fonts**: Open Sans is loaded globally, no need to import
6. **cn() utility**: use `import { cn } from "@/lib/utils"` for conditional classnames

---

## To run

```bash
cd /Users/varsha/Documents/Claude/MayThematic
npm run dev
```

Opens at `http://localhost:3000`. Hot reload works — save a file, browser updates instantly.

## To deploy

```bash
curl -X POST "https://api.vercel.com/v1/integrations/deploy/prj_HGEUdvS0s7i9Mu43QKfWZIArMHIk/NGOQeDrbOZ"
```
