# Thematic.Design — Taste Profile
**Version:** 1.0  
**Author:** Varsha Bhide  
**Last Updated:** May 2026

---

## Emotional Target

> **"A trusted senior colleague. Precise, warm, never loud."**

When a designer, PM, or developer opens Thematic.Design, they should feel:
- **Calm confidence** — everything is where it should be, nothing is fighting for attention
- **Professional warmth** — serious enough to trust, approachable enough to enjoy using
- **Quiet competence** — the system does the hard work invisibly; craft is felt, not announced

What it should NOT feel like:
- Corporate and cold (IBM Carbon without warmth)
- Playful and consumer (too much colour, too much motion)
- Overdesigned (shadows competing, gradients everywhere)
- Sterile (pure utility with no personality)

---

## Visual References

### Reference 1 — Healthink Dashboard
**What it does right:**
- Large, confident metric numbers — hierarchy communicated through scale
- Cards with barely-there borders and ultra-subtle shadows — structure without noise
- Blue that anchors without dominating — one strong accent, everything else neutral
- Active/selected states: solid blue fill — decisive, not ambiguous
- Data-dense but breathing — whitespace is earned, not automatic

**Signals to extract:**
- Metric display: large type, small unit labels, clear label hierarchy
- Card surfaces: light background, 1px border, shadow barely visible
- Blue as the primary trust signal — used sparingly but confidently

### Reference 2 — Task Manager (Linear-style)
**What it does right:**
- Lavender-tinted background (#FAFAFA with a breath of purple) — warmth through the neutral, not through colour
- Compact density — lots of information, nothing crowded
- Priority badges as rounded pills — semantic colour muted, never loud
- Right detail panel — generous title typography, precise body copy
- Almost no shadows — structure comes from spacing and subtle borders

**Signals to extract:**
- Background: slightly warm neutral, never pure white
- Density: medium-compact — respect people's time
- Badges/chips: pill shape, semantic colours at low saturation
- Typography doing hierarchy work — no decorative elements needed

---

## Design Principles

### 1. Hierarchy over decoration
**What it means:** Every visual element either establishes or reinforces hierarchy. If it doesn't carry information, it shouldn't be there. Size, weight, and colour do the communicating — not gradients, borders, or shadows for their own sake.

**What it rules out:** Decorative dividers, unnecessary icons, gradient fills on components, colourful headers for their own sake.

**How to test it:** Cover the content. Does the visual rhythm still feel intentional? Can you tell what's primary, secondary, and tertiary without reading anything?

---

### 2. Density earns trust
**What it means:** Enterprise users are professionals. They can handle information. Components should be compact enough to show meaningful data without scrolling, but never so tight that comprehension suffers. Every padding and spacing value should be questioned — is this space earning its place?

**What it rules out:** Overly generous padding that wastes screen real estate. Hiding information behind clicks when it can be shown in context.

**How to test it:** Can a designer or PM get their answer in one glance without scrolling or clicking into a detail view?

---

### 3. Blue anchors, neutrals carry
**What it means:** The Thematic blue (#1518A6 and its scale) is used for one purpose: the primary action, the active state, the brand moment. Everything else — backgrounds, borders, secondary text, icons, surface colours — is neutral. One anchor colour, carried through consistently, is more powerful than five accent colours used occasionally.

**What it rules out:** Multiple competing accent colours. Colourful section headers. Decorative blue elements that aren't interactive or active.

**How to test it:** Could you find every interactive or active element on a screen by searching for blue? If there's blue that isn't interactive or active, it's decoration.

---

### 4. States are never ambiguous
**What it means:** Every component must communicate its state instantly and unambiguously. Hover, focus, active, disabled, loading, error, success — each state has a distinct, immediately readable visual treatment. No guessing. No "is this clickable?" moments.

**What it rules out:** Subtle hover states on components that users need to find. Disabled states that look almost identical to default. Error states that only use colour without shape or text changes.

**How to test it:** Show a screenshot to someone for 3 seconds. They should immediately know what is interactive, what is active, and what is disabled without any explanation.

---

### 5. Warmth comes from restraint
**What it means:** The warm, approachable quality of this system doesn't come from warm colours or friendly illustrations — it comes from the absence of coldness. Slightly off-white backgrounds (not pure #FFFFFF). Slightly warm neutral palette. Medium border radius (not sharp, not bubbly). Typography that's legible without feeling like a legal document.

**What it rules out:** Pure white backgrounds. Completely square corners. Cold blue-grey neutrals. Clinical mono-weight typography.

**How to test it:** Does the system feel like it was designed for humans, not for computers? Would a non-technical person feel welcomed by it, or intimidated?

---

## Visual Language

### Colour Usage
| Role | Token | Usage rule |
|------|-------|-----------|
| Brand / Primary action | `--base-color-blue-800` | Buttons, active states, links, selected items ONLY |
| Brand hover | `--base-color-blue-700` | Hover state on primary elements |
| Page background | `--base-color-gray-75` | Not pure white — slightly warm |
| Surface / Card | `--base-color-white` | Cards sit slightly above the page background |
| Border | `--base-color-gray-300` | Borders are light and structural, not decorative |
| Primary text | `--base-color-black` | Headlines, primary labels |
| Secondary text | `--base-color-gray-900` | Body copy, descriptions |
| Muted text | `--base-color-gray-600` | Timestamps, helper text, metadata |
| Disabled | `--base-color-gray-400` | Disabled text and borders |

**Semantic colours** (feedback only — not for decoration):
- Success: `--base-color-success-800` bg / `--base-color-green-800` text
- Info: `--base-color-info-600` bg / `--base-color-info-700` text
- Warning: `--base-color-warning-50` bg / `--base-color-gray-900` text
- Error: `--base-color-error-200` bg / `--base-color-error-300` text

---

### Typography Hierarchy
| Role | Size | Weight | Usage |
|------|------|--------|-------|
| Page title | 2rem (600) | Bold (700) | One per page |
| Section heading | 1.25rem | Semibold (600) | Section labels |
| Component title | 1rem | Medium (500) | Card titles, panel headers |
| Body | 0.875rem | Regular (400) | Descriptions, content |
| Label | 0.875rem | Medium (500) | Form labels, column headers |
| Caption / Meta | 0.75rem | Regular (400) | Timestamps, helper text |
| Metric display | 1.875–3rem | Bold (700) | Numbers in metric cards only |

**Typography rules:**
- Never use more than 3 type sizes on a single component
- Labels are always medium weight, never bold — bold is reserved for titles and metrics
- Muted text is `gray-600`, never gray-400 (too low contrast for body copy)

---

### Spacing & Density
**The rule:** Components are medium-compact. Think Linear or Notion — not Ant Design's generous padding, not a cramped data terminal.

| Token | Value | Usage |
|-------|-------|-------|
| `paddingXS` | 0.5rem (8px) | Tight inline elements, chips, small badges |
| `paddingSM` | 0.75rem (12px) | Input padding, button padding |
| `paddingMD` | 1rem (16px) | Card internal padding default |
| `paddingLG` | 1.5rem (24px) | Section padding, modal padding |
| `stackSM` | 0.75rem (12px) | Gap between related elements |
| `stackMD` | 1rem (16px) | Gap between sections within a component |
| `stackLG` | 1.5rem (24px) | Gap between independent components |

---

### Border Radius
**The rule:** Medium radius. Friendly but serious. Not sharp (corporate), not round (consumer).

| Context | Token | Value |
|---------|-------|-------|
| Input, small components | `radius.xs` | 4px |
| Buttons, badges, chips | `radius.sm` | 8px |
| Cards, panels, modals | `radius.md` | 12px |
| Large containers | `radius.lg` | 14px |
| Pills (badges with dot) | `radius.xxl` | 20px |

---

### Shadows & Elevation
**The rule:** Shadows are structural, not decorative. They communicate elevation (this floats above the page) not beauty.

| Level | Token | Usage |
|-------|-------|-------|
| Card | `shadow.02` | Standard card elevation |
| Popover / Dropdown | `shadow.04` | Floating elements |
| Modal | `shadow.05` | Highest elevation |
| No shadow | — | Inline components, table rows |

Cards primarily use a `1px border + very subtle shadow`. Never shadow alone without a border — it looks unintentional.

---

### Interaction & States
Every interactive component must have all of these:

| State | Visual treatment |
|-------|-----------------|
| Default | Base styling |
| Hover | Subtle background shift — `gray-100` for neutral, `blue-100` for brand elements |
| Focus | `ring-3` with `ring/50` opacity — always visible, never harsh |
| Active | Solid fill — `blue-800` bg, white text for primary elements |
| Disabled | `opacity-50`, `pointer-events-none`, border shifts to `gray-400` |
| Loading | Spinner replaces or precedes label, button stays same size |
| Error | `destructive` border + ring, error text below |
| Success | `green-500` border + ring, success text below |

---

## Craft Standards

### Quality bar: Production
This is not a prototype or internal tool. Every component should feel like it was designed by one designer who cared about every detail. Inconsistency in spacing, alignment, or colour usage is a bug, not a variation.

### What elevated craft looks like here:
- Spacing has rhythm — related items are closer, unrelated items have more space
- Borders are always 1px, never 2px unless communicating a special state
- Icons are always from Lucide — never mix icon libraries
- Typography never overflows or wraps unexpectedly at reasonable viewport sizes
- Every component looks intentional at both 100% and 200% zoom
- Dark mode is not an afterthought — every component is tested in both modes

### What mediocre craft looks like (avoid):
- Inconsistent padding across similar components
- Borders that compete with shadows on the same element
- Semantic colours used for decoration
- Focus rings that are invisible or ugly
- Components that only work at desktop size

---

## Component Review Checklist

Before any component is considered done, check:

- [ ] Uses design tokens — no hardcoded hex values
- [ ] All states present: default, hover, focus, active, disabled, loading (where applicable), error, success (where applicable)
- [ ] Typography matches the hierarchy rules above
- [ ] Spacing uses alias tokens, not arbitrary values
- [ ] Contrast meets WCAG AA (4.5:1 for text, 3:1 for UI elements)
- [ ] Works in dark mode
- [ ] Keyboard navigable
- [ ] Storybook story documents all variants and states
- [ ] Passes the hierarchy test: primary, secondary, tertiary information is instantly readable
- [ ] Passes the states test: all states are unambiguous without explanation
