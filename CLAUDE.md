# CLAUDE.md — Thematic.design

Instructions for any AI assistant working in this repo. Read this first.

## Before writing or modifying any UI code

1. **Read the component's spec first.** Guidance for every component lives in
   `src/stories/<Component>.mdx` (when/how/why, variants, states, accessibility). A
   generated, structured index of all 48 components is in
   `DESIGN.generated.md`. Don't guess a component's intended use — read it.
2. **Use tokens only — never raw values.** Every color, spacing, radius, font, shadow,
   and motion value must reference a token via `var(--…)`. The token source of truth is
   `src/styles/tokens.css` (CSS) and `tokens.dtcg.json` (reference-based DTCG).
   - Tiers: `base` (primitives) → `semantic` / `alias` / `brand` → `component`.
   - Prefer the closest meaningful tier: component tokens for component styling, alias
     tokens for shared roles, base only when nothing else fits.
   - Never hardcode a hex, rgb, px, or rem that a token already exists for.
3. **Compose from existing components.** Build from `components/ui/`. Do not invent new
   primitives; if something genuinely new is needed, propose it for review rather than
   shipping a one-off.
4. **Match the accessibility contract.** Each component's `.mdx` has an Accessibility
   section describing required ARIA, keyboard behaviour, and developer responsibilities.
   Honour it.

## Before committing

Run the token audit and fix all errors:

```bash
node scripts/token-audit.cjs components/ui   # library must be 0 errors
```

- **Errors** = hardcoded colors, or values that already have a token. These must be fixed.
- **Warnings** = one-off dimensions with no token (e.g. a `[400px]` max-width). Acceptable,
  but prefer a token if a suitable one exists.
- **Zero errors required** for the component library before commit. (Demo/wireframe screens
  under `src/stories/` and `app/` are mockups and are not gated.)

## Quick reference

| Need | Where |
|------|-------|
| What a component is for | `src/stories/<Component>.mdx` |
| All components at a glance | `DESIGN.generated.md` |
| Token values & references | `src/styles/tokens.css`, `tokens.dtcg.json` |
| Check for hardcoded values | `node scripts/token-audit.cjs <path>` |
