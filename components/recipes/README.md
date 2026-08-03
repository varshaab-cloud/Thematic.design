# Recipes

Product-level compositions of design-system components — reusable within this
product, but not agnostic enough for the component library. `ProductCard`,
`AddressField`, `NameField` live at this tier. Organisms, in atomic-design terms.

Rules:

- **Compose, don't invent.** A recipe is built from `components/ui/` primitives.
  If it needs a primitive that doesn't exist, that's a library proposal — defer to
  a human.
- **Tokens only.** Recipes are gated by the token audit exactly like the library:
  zero errors. `npm run verify` scans this folder.
- **One file per recipe**, named `<RecipeName>.tsx`.
- Every recipe added during a page build gets an entry in that task's `NOTES.md`
  (name, purpose, composed-from, tokens used, audit result).

## Getting into Storybook

A recipe does **not** get a story the moment it's built. The sequence is:

1. AI builds the recipe here, audit-clean, and records its spec in the task's
   `NOTES.md` (purpose, composed-from, tokens used, audit result).
2. The human reviews that entry — this is the acceptance gate.
3. On approval, a story is added at `src/stories/recipes/<Name>.stories.tsx`
   (plus an `.mdx` if the recipe deserves usage guidance), and the next push makes
   it visible in Storybook under a "Recipes" section.

Unreviewed recipes exist in code but not in the catalogue — Storybook only ever
shows what a human has signed off. Snowflakes never get stories.

One-off components ("snowflakes" — used once, tied to a single use case, like a
`Seat` picker for one airline flow) do **not** belong here. They live in the task
folder that needs them: `app/<task>/`.
