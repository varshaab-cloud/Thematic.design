# Thematic.Design — Component Workflow

**Version:** 1.0  
**Author:** Varsha Bhide  
**Last Updated:** May 2026

Every component built for Thematic.Design passes through four Design Powers stages before it ships. This is not a checklist — it is the building process.

---

## The Four Stages

### Stage 1 — ◆ design-lead: Intent
Before writing a single line of code, answer these questions in a comment block at the top of the component file:

```
// ◆ design-lead
// What does this component do for the user?
// Who uses it and when?
// Taste profile check: which principles apply here?
// Emotional target: what should using this feel like?
// Reference: which visual reference is closest to what this should be?
```

**Taste profile checks for every component:**
- [ ] Hierarchy: does this component make primary, secondary, and tertiary information instantly readable?
- [ ] Density: is every padding and spacing value earning its place?
- [ ] Blue anchors: is blue used ONLY for interactive or active states?
- [ ] States: hover, focus, active, disabled, loading, error, success — all defined before build starts
- [ ] Warmth: is the component precise without being cold?

---

### Stage 2 — ◆ design-builder: Build
Build the component against the taste profile. Required in every component:

**Token usage (non-negotiable):**
- All colors via `--base-color-*` tokens — no raw hex, no raw Tailwind colors
- Shadows via `--base-shadow-*` tokens
- Radius via `--base-radius-*` tokens
- No `green-500`, `red-400`, `blue-600` etc. — always the token variable

**States (all required before component is considered done):**
- `default` — base appearance
- `hover` — gray-100 for neutral, blue-100 for brand elements
- `focus` — `ring-3` with `ring/50` opacity, always visible
- `active` — solid fill, decisive
- `disabled` — `opacity-50`, `pointer-events-none`
- `loading` — spinner (Loader2 from lucide), same size as default
- `error` — destructive border + ring + text below
- `success` — success-900 border + ring + text below (where applicable)

**Typography rules:**
- Component titles: `text-base font-semibold`
- Labels: `text-sm font-medium` (never bold)
- Body / descriptions: `text-sm font-normal`
- Helper / meta text: `text-xs text-muted-foreground`
- Metric values: `text-3xl font-bold` (MetricCard only)

**Surface rules:**
- Page background: `bg-background` (`gray-75` = #F5F5F3)
- Cards / panels: `bg-card` (white) + `border border-[var(--base-color-gray-200)]` + `shadow-[var(--base-shadow-02)]`
- Input fields: `bg-[var(--base-color-white)]` — always white, lifts off surfaces
- Secondary surfaces: `bg-[var(--base-color-gray-100)]`

---

### Stage 3 — ◆ design-critic: Review
After building, run this critique pass before the component is added to Storybook:

**Against taste profile:**
- Would this sit comfortably next to the Healthink dashboard reference?
- Would this sit comfortably next to the Linear-style task manager reference?
- Does removing the content leave a visual rhythm that feels intentional?
- Is the only blue element on the page the interactive/active one?

**Against the emotional target ("trusted senior colleague"):**
- Calm confidence: is everything where it should be, nothing fighting for attention?
- Professional warmth: serious enough to trust, approachable enough to enjoy?
- Quiet competence: does the craft feel noticed but not announced?

**Severity scale:**
- 🔴 Critical — blocks shipping (wrong token, missing state, broken layout)
- 🟡 Major — degrades quality (wrong weight, missing hover, colour not token-based)
- 🟢 Minor — polish opportunity (spacing rhythm, shadow refinement, alignment)

---

### Stage 4 — ◆ accessibility-reviewer: WCAG Check
Every component must pass before it ships to Storybook:

- [ ] Text contrast ≥ 4.5:1 (body), ≥ 3:1 (UI elements)
- [ ] Touch targets ≥ 44×44px on interactive elements
- [ ] Focus ring visible — never hidden, never ugly
- [ ] Colour is never the sole indicator of state (always paired with shape/text/icon)
- [ ] Keyboard navigable — Tab, Enter, Escape, Arrow keys where relevant
- [ ] `aria-label` on icon-only buttons
- [ ] `aria-invalid` on error inputs
- [ ] Loading state announced to screen readers (`aria-busy` or spinner with label)

---

## Storybook Story Requirements

Every component ships with a story that covers:

1. **Default** — clean, no props set
2. **All variants** — one story per variant (primary, secondary, ghost, etc.)
3. **All states** — hover/focus shown via `parameters.pseudo`, error, loading, disabled
4. **Sizes** — if the component has size variants
5. **Dark mode** — a `dark` background story
6. **Real content** — never "Lorem ipsum", never "Button text" — use realistic content

---

## Quick Reference: Which token for what

| Need | Token |
|------|-------|
| Page background | `bg-background` |
| Card background | `bg-card` |
| Input background | `bg-[var(--base-color-white)]` |
| Primary text | `text-foreground` |
| Secondary text | `text-muted-foreground` |
| Disabled text | `opacity-50` |
| Primary button | `bg-primary` (`blue-800`) |
| Primary button hover | `hover:bg-[var(--base-color-blue-700)]` |
| Card border | `border-[var(--base-color-gray-200)]` |
| Card shadow | `shadow-[var(--base-shadow-02)]` |
| Popover shadow | `shadow-[var(--base-shadow-04)]` |
| Success state | `border-[var(--base-color-success-900)]` + `text-[var(--base-color-green-800)]` |
| Error state | `border-destructive` + `text-destructive` |
| Warning badge bg | `bg-[var(--base-color-warning-50)]` |
| Info badge bg | `bg-[var(--base-color-info-600)]` |
