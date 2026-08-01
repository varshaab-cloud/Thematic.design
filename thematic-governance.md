# Thematic.design — Governance

---

## Before you write any code

**Read the spec.** Every component has a page at `src/stories/<Component>.mdx`. It tells you what the component is for, what variants exist, and what the accessibility requirements are. Don't guess — read it first. All 48 components are indexed in `DESIGN.generated.md`.

**Use tokens, never raw values.** Every colour, spacing step, radius, font, shadow, and motion value must be a token (`var(--…)`). No hex codes, no `rgb()`, no hardcoded pixels. The full list is in `src/styles/tokens.css`.

When picking a token, start at the most specific tier and work up:

1. `--component-*` — for styling inside a specific component
2. `--alias-*` — for shared semantic roles (most common choice)
3. `--base-*` — primitives only; rarely used directly in components

**Build from what already exists.** Compose from `components/ui/`. Don't invent new primitives. If something genuinely new is needed, propose it before building it.

**Follow the accessibility contract.** Each component's MDX has an Accessibility section covering required ARIA, keyboard behaviour, and focus management. This is part of the component contract — not optional.

---

## Before you commit

Run the audit:

```bash
node scripts/token-audit.cjs components/ui
```

**Zero errors before committing to `components/ui/`.** Errors are hardcoded values or values that already have a token — fix them. Warnings (one-off dimensions, raw shadows) are acceptable.

`src/stories/` and `app/` are demo screens and wireframes — the audit doesn't gate them.

---

## Every new component needs a doc page

Create an MDX file at `src/stories/<Component>.mdx` with these eight sections, in order:

1. H1 — component name matching the import
2. Live canvas — all variants rendered immediately
3. Description — 2–3 sentences on what it renders and what the consumer owns
4. Variants — one paragraph each, role and visual distinction
5. States — each non-default state with a live canvas and short explanation
6. Composition — what renders internally, which props wire external dependencies
7. Accessibility — ARIA, keyboard, focus, contrast, developer responsibilities *(never skip this)*
8. Playground — interactive Controls panel

---

## Token naming

New tokens must follow the existing pattern:

- Component tokens: `--component-<name>-<group>-<role>`
- Alias tokens: `--alias-<group>-<role>`

Don't hardcode a value you know the resolved number for. The token can change; the hardcoded number won't follow.

---

## Proposing additions

Propose before you build — not after. A proposal just needs to cover: the use case, how it fits the existing system, any new tokens required, and accessibility notes. The goal is catching conflicts early, not creating process.
