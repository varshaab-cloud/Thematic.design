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

One-off components ("snowflakes" — used once, tied to a single use case, like a
`Seat` picker for one airline flow) do **not** belong here. They live in the task
folder that needs them: `app/<task>/`.
