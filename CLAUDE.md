# CLAUDE.md — Thematic.design

Instructions for any AI assistant working in this repo. Read this first.

## Before writing or modifying any UI code

1. **Read the component's spec first.** Guidance for every component lives in
   `src/stories/<Component>.mdx` (when/how/why, variants, states, accessibility). A
   generated, structured index of all 48 components is in
   `DESIGN.generated.md`. Don't guess a component's intended use — read it.
2. **Use tokens only — never raw values.** Every color, spacing, radius, font, shadow,
   and motion value must reference a token via `var(--…)`.
   - **`src/styles/tokens.css` is the single source of truth.** Edit tokens there.
     Everything in `tokens 1.5/` (flat, DTCG, Tokens Studio) is generated — do not edit
     by hand; run `npm run tokens` after changing `tokens.css`. Descriptions live in
     `token-descriptions.json`. `tokens-retired/` and `tokens 1.4/` are frozen history.
   - Tiers: `base` (primitives) → `semantic` / `alias` → `component`. There is no brand tier; brand-role aliases (`--alias-color-background-brand`) point straight at base.
   - Prefer the closest meaningful tier: component tokens for component styling, alias
     tokens for shared roles, base only when nothing else fits.
   - Never hardcode a hex, rgb, px, or rem that a token already exists for.
   - **Never reference a token that doesn't exist.** An undefined `var()` fails silently —
     the browser drops the declaration and the element renders unstyled, with no error.
     Component token names are family-based (`--component-feedback-alert-*`, not
     `--component-alert-*`); check `tokens.css` rather than guessing. The audit catches
     these, but only if you run it.
3. **Compose from existing components.** Build from `components/ui/`. Do not invent new
   primitives; if something genuinely new is needed, propose it for review rather than
   shipping a one-off.
4. **Match the accessibility contract.** Each component's `.mdx` has an Accessibility
   section describing required ARIA, keyboard behaviour, and developer responsibilities.
   Honour it.

## Component tiers — when the library doesn't have what a page needs

Every component in a built page belongs to exactly one tier:

1. **Component** — lives in `components/ui/`, has a spec in `src/stories/<Component>.mdx`.
   Content-agnostic, context-agnostic, cross-product. This is the default: compose
   pages from these.
2. **Recipe** — a reusable *composition* of library components, specific to this
   product: `ProductCard`, `AddressField`, `NameField`. Lives in
   `components/recipes/<Name>.tsx`. Gated by the token audit at zero errors, same as
   the library. See `components/recipes/README.md`.
3. **Snowflake** — a one-off tied to a single use case (an airline's `Seat` picker).
   Lives in the task folder that needs it, `app/<task>/`, and stays there.

When a prompt requires something the library doesn't have, do not silently improvise
it inline. Build it deliberately, classify it (recipe if it would plausibly be reused
in this product, snowflake if not), place it in the tier's location, and run the
improvised-component verification below. Promoting anything to the library tier
(a new primitive + `.mdx` spec) is a human decision — propose it, don't ship it.

**Improvised-component verification** — after the page passes its own audit, every
component built this session that is *not* in `DESIGN.generated.md` gets its own loop:

- audit it for hardcoded values and phantom tokens (recipes are covered by
  `npm run verify`; run the audit on the task folder for snowflakes:
  `node scripts/token-audit.cjs app/<task>`) and fix until clean;
- confirm it composes from `components/ui/` rather than re-inventing primitives;
- record it in the task's `NOTES.md` under **Components built beyond the library**
  with its spec: name, tier, location, purpose, composed-from, tokens used, audit
  result, and whether it's a candidate for promotion.

Recipes and snowflakes each have their own Storybook section, separate from the
library: `src/stories/recipes/` ("Recipes/…" titles) and `src/stories/snowflakes/`
("Snowflakes/…" titles). Both reach Storybook only after human review: the NOTES.md
entry is the acceptance gate, and on approval the component gets its `.mdx` (and a
story for recipes) in its section. Never add one unprompted. These sections are
deliberately outside `DESIGN.generated.md` — the AI build index stays library-only.

## Agents

`.claude/agents/token-auditor.md` defines a project agent that runs the audit loop
autonomously: verify → fix → regenerate → re-verify until zero errors, deferring
design decisions to a human. In Claude Code, delegate with "run the token auditor",
or it triggers on its own after edits to `components/ui/` or `tokens.css`.

## Task notes — required for every page build

When building or materially editing a page under `app/<task>/`, keep a `NOTES.md` in
that folder (template: `app/_task-template/NOTES.md`) and fill it in before finishing
the session:

- **Date / time** — when the session ran.
- **Prompt used** — the user's request, verbatim or lightly trimmed.
- **Components chosen** — which components you picked from `DESIGN.generated.md`.
- **Specs read** — every `.mdx` you opened.
- **Verify result** — errors/warnings from the final `npm run verify`.
- **Hardcoded values found** — every raw value the audit (or you) caught during the
  session and the token it was replaced with. Write "none" if the first pass was clean.
- **Phantom tokens found** — every undefined `var()` reference caught, and the real
  token used instead. Write "none" if clean.
- **Drift** — every place the rendered value changed from what was there before, with
  the exact location: file, token, old value → new value. Fixes are meant to be
  value-identical, so "none" is the expected entry; anything else needs human sign-off.
- **Components built beyond the library** — every component improvised this session
  that is not in `DESIGN.generated.md`, with its spec: name, tier (recipe /
  snowflake), location, purpose, composed-from, tokens used, audit result, and
  whether it's a promotion candidate. Write "none" if the page used only library
  components.
- **Deferred to human** — anything you didn't decide alone.

Record findings even though they're fixed by commit time — the notes are the record of
what went wrong on the way, which is what the human reviews. An empty or missing
NOTES.md means the session isn't finished.

## Before committing

```bash
npm run verify   # token audit + generated files up to date
```

This must pass. It runs two checks:

**Token audit** — `npm run audit`

- **Errors** = undefined token references, hardcoded colors, or values that already have
  a usable token. These must be fixed.
- **Warnings** = one-off dimensions with no suitable token (e.g. a `[400px]` max-width).
  Acceptable, but prefer a token if a suitable one exists.
- **Zero errors required** for the component library. (Demo/wireframe screens under
  `src/stories/` and `app/` are mockups and are not gated.)
- If the output starts with a warning about reading tokens, the audit is running without
  its token map and a clean result means nothing. Fix that first.

**Generated files** — regenerate whenever their sources change:

```bash
npm run tokens         # tokens.css + token-descriptions.json → tokens 1.5/
npm run design-index   # component .mdx + source → DESIGN.generated.md
```

Both have a `:check` variant that fails if the committed file is stale.

## Quick reference

| Need | Where |
|------|-------|
| What a component is for | `src/stories/<Component>.mdx` |
| All components at a glance | `DESIGN.generated.md` *(generated)* |
| Token values & references | `src/styles/tokens.css` *(source of truth)* |
| Token descriptions | `token-descriptions.json` *(hand-written)* |
| Token exports (flat / DTCG / Figma) | `tokens 1.5/` *(generated)* |
| Check everything before commit | `npm run verify` |
