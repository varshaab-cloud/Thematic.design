# Thematic Design System
### Building a production-grade enterprise design system with AI — end to end

**Live:** [thematic.design](https://thematic.design) · **GitHub:** varshaab-cloud/Thematic.design
**Role:** Designer (solo, AI-assisted) · **Stack:** Next.js · Storybook 10 · Tailwind CSS · Radix UI
**Duration:** May – June 2026

---

## The question this answers

Most "design systems" in portfolios are one of two things: a Figma file with no code behind it, or a component library with no design thinking. The gap is almost always the same — no token architecture, no documented principles, no audit trail, no way to hand it to a team and have it actually work.

This project set out to close that gap. Not theoretically. Actually.

The brief: build a design system that a senior engineer would trust to build from, and a senior designer would trust to design from. Then document how AI was involved in every stage — not as a shortcut, but as a collaborator.

---

## How it started — a Figma screenshot

The project didn't start with a blank canvas in code. It started in Figma.

The existing Figma file had colour and spacing decisions laid out visually — as frames and swatches — but nothing was programmatic. No Variables, no token layer, just visual reference. Rather than manually transcribing values, the Figma file was screenshotted and handed to Claude, which read the image and generated the first structured token set directly from what existed visually.

That was the first signal of what this workflow would look like throughout: human judgment about what to build, AI doing the heavy analytical and generative work, human review on the output.

The next discovery: the components in the file were generic shadcn components — not Thematic components. There was no component-level expression of the design language. That became the next problem to solve.

---

## Phase 1 — Design language before tools

Before writing a single line of code, the Taste Profile was written: a single document defining the emotional target, visual references, and five principles that would govern every decision.

**Emotional target:** *"A trusted senior colleague. Precise, warm, never loud."*

**The five principles:**

**Hierarchy over decoration.** Every visual element either establishes hierarchy or is removed. No decorative dividers, no gradients for their own sake. Typography, spacing, and alignment do the structural work.

**Density earns trust.** Enterprise users are professionals. Components should be compact enough to show meaningful data without scrolling — never so tight that comprehension suffers.

**Blue anchors, neutrals carry.** A single primary colour (`#1518A6`) for interactive and active states only. Everything else is neutral. The constraint forces hierarchy to come from scale, weight, and spacing rather than colour.

**States are never ambiguous.** Hover, focus, active, disabled, loading, error, success — each has a distinct and immediately readable treatment.

**Warmth comes from restraint.** Slightly off-white backgrounds. Warm neutral palette. Medium border radius. The approachable quality comes from the absence of coldness, not the addition of personality.

This document became the decision filter for everything that followed.

---

## Phase 2 — Three attempts at the token architecture

The token system was built three times before landing on the right structure.

**v1.2** started close to the shadcn model — flat, component-specific names with no clear tier separation. It worked, but it made theming impossible and gave AI no clear rules for which token to reach for in which context.

**v1.3** introduced the three-tier model properly: Base → Alias → Component. Base tokens hold raw values (hex colours, spacing steps, radius values). Alias tokens assign semantic meaning (`--alias-color-text-primary`, `--alias-color-border-default`). Component tokens provide slot-specific overrides (`--component-button-color-bg-primary`). Nothing in product code references base tokens directly.

**v1.4** refined the naming convention to a consistent structured format: `--component-{name}-{tier}-{property}-{state}`. This was critical for AI-readability — with a predictable format, any model touching the codebase can derive the correct token name without guessing.

The final system: **1,351 tokens** — 140 base, 172 alias, 1,039 component.

---

## Phase 3 — Component library (54 components)

With the token system designed, the component library was built on top of Next.js + Radix UI primitives. shadcn was used as a starting scaffold — not as a finished product. Every component was re-skinned against Thematic tokens and extended with additional variants, sizes, and states that enterprise workflows require.

Built across four batches, covering forms, data display, navigation, overlays, feedback, and complex inputs including DatePicker, DateRangePicker, CommandPalette, TreeView, Timeline, and Stepper.

The pattern throughout: missing components were identified mid-build, built to match the system, and documented before moving on. Nothing shipped undocumented.

---

## Phase 4 — Two brand colour palettes

Enterprise design systems rarely serve a single brand. Thematic was designed from the start to support multi-brand deployment.

Two brand palettes were built:

**Cobalt** — the primary Thematic brand. Deep blue (`#1C21DC` core) with a full 10-step scale from tint to dark.

**Terra** — a secondary brand using deep forest green (`#166534` core) with the same structure. Designed to demonstrate that the alias layer genuinely abstracts the brand — swapping from Cobalt to Terra requires changing one set of brand token values, not touching any component.

The alias layer was structured to support both: brand tokens flow from the palette scales, semantic tokens map from brand tokens, component tokens reference semantic tokens. A complete chain with no hard-coded brand colour anywhere in component code.

---

## Phase 5 — Foundation documentation

Eight Storybook pages were built documenting every foundation property with live token references: Colour, Typography, Spacing, Shape, Elevation, Motion & Focus, Grid & Layout, and Data Visualisation.

The Foundation Overview was built as a navigable index — clickable cards that route directly to each page, with live token counts. The entire Foundation section was rebuilt twice to get the visual language right — the documentation needed to feel as considered as the system it was documenting.

---

## Phase 6 — Token migration and audit

After all 54 components were built, a full audit was run — checking every component file against seven conditions.

The mid-project audit (v1.2) had found 35 of 54 components with token gaps — component tokens bypassed in favour of alias tokens, base colours referenced directly, non-existent token names in use.

After migration to v1.4, the final audit:

| Check | Result |
|---|---|
| Broken token references | ✅ 0 |
| shadcn token leakage | ✅ 0 |
| Hardcoded hex values | ✅ 0 |
| Unresolved Tailwind typography | ✅ 0 |
| Unresolved Tailwind transitions | ✅ 0 |
| Component token validity | ✅ All valid |
| Base-tier bypass | ✅ 0 |

A reusable audit skill was built from this process — re-runnable any time the token system changes.

---

## Phase 7 — Figma round-trip

The token system was pushed back into Figma two ways.

A Python script was written to push all 1,351 tokens to Figma as native Variables via the REST API — creating four collections (Base, Brand with Cobalt/Terra modes, Alias, Component) in a single run.

A Figma plugin was built as an alternative — installable directly from the desktop app, pulling the same token data without needing a terminal.

Components were then rebuilt in Figma against the Variables, creating a library that stays in sync with the code implementation. The loop: design intent → code tokens → Figma Variables → Figma components.

---

## Phase 8 — WCAG 2.1 AA accessibility audit

A structured accessibility audit was run across all components. Key findings and fixes:

**Contrast** — `#6d6d6d` failed at 4.3:1 on secondary backgrounds. Darkened to `#5e5e5e` (5.19:1). One token change, fixed system-wide.

**Touch targets** — Slider thumb, SidebarNav items, Switch sm, and Checkbox were all below 44×44px minimum. Fixed using CSS `after:` pseudo-element expansion — visual dimensions unchanged, hit area extended.

**Semantic structure** — `aria-current="page"` on active nav items. `aria-labelledby` and `aria-describedby` on Slider. `aria-atomic` on Alert. MetricCard trend direction given a combined `aria-label` for screen readers.

---

## Phase 9 — Documentation as a product

Every component has an authored MDX doc page. Not auto-generated — written. Each follows a consistent structure: hero canvas, explanatory prose, per-variant sections with live canvases, usage guidelines, accessibility notes with keyboard interaction tables.

The documentation was written to be readable by both people and AI — component relationships, states, variants, constraints, and the reasoning behind decisions are all explicit. The system's own Introduction page states it directly: *"For AI-assisted workflows, documentation is structured and maintained to provide sufficient context for interface generation and implementation tasks."*

---

## What the numbers look like

| | |
|---|---|
| Design tokens | 1,351 (140 base · 172 alias · 1,039 component) |
| Components | 54, fully tokenised |
| Hardcoded hex values | 0 |
| Broken token references | 0 |
| Brand palettes | 2 (Cobalt, Terra) |
| Foundation doc pages | 8 |
| Component doc pages | 54 |
| WCAG 2.1 AA | Pass |
| Live | thematic.design |

---

## What AI actually did

This is worth being specific about, because "AI-assisted" can mean anything.

Claude read a Figma screenshot and generated the first token set. Proposed the three-tier architecture and naming conventions. Built all 54 components and wrote all 54 doc pages. Ran the token audits, identified failures, and fixed them. Built the Figma push script and plugin.

What the human did: defined the design brief and principles. Made every call on taste — density, colour, what "warm and precise" actually looks like in practice. Reviewed every output and pushed back when something was wrong. Caught the things AI couldn't see — the emotional register of a component, whether documentation copy felt right or not. And directed the sequence — what to build next, when something was good enough, when to go deeper.

The workflow wasn't "AI generates, human approves." It was closer to a fast-moving design collaboration — one person holds taste and judgment, the other holds execution capacity, and both are moving simultaneously.

---

## What I'd do differently

**Dark mode from day one.** The alias tier was built to support it. It was deferred. It's always cheaper alongside the original build than as a retrofit.

**Figma-first for component design.** The round-trip worked but created some drift. A tighter loop where component decisions in Figma and code happened simultaneously would have been faster.

**A domain glossary before components.** The surface audit found vocabulary inconsistencies (`destructive` vs `error`) that were downstream of not having a formal glossary. Two hours on a glossary upfront eliminates that entire class of problem.

---

*Built May–June 2026. Still under active development.*
