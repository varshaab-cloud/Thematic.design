# Building a page with AI — the workflow

What actually happens (and what should happen) when you open a new Claude task and say
"build me a page using the design system." Written for this repo; the file names are
real.

---

## 0. Session start — before you type anything

Connect the `MayThematic` folder to the task. The moment the session starts,
**`CLAUDE.md` auto-loads** — the AI never has to be told the rules, because the filename
is the loading mechanism. From that point it knows:

- read the component spec before using a component
- tokens only, `var(--…)` — never raw values, never a token that doesn't exist
- compose from `components/ui/` — don't invent primitives
- honour each component's accessibility contract
- run `npm run verify` before committing

## 1. You prompt the page

State the requirement, the content, and the placeholders. A good prompt names *what the
page does*, not which components to use — choosing components is the system's job:

> Build a claims-review page: a searchable table of claims with status, claimant, and
> amount; clicking a row opens a detail panel; reviewers can approve or reject with a
> confirmation step; empty and loading states included.

You *can* name components ("use DataTable and Sheet") and the AI will honour it, but the
index usually picks better — it knows Dialog vs AlertDialog, Table vs DataTable, and
when not to use each.

## 2. AI selects components — `DESIGN.generated.md`

The AI reads the generated index and shortlists components by `intent` and `avoid`:
table with search/pagination → DataTable, not Table; irreversible approve/reject →
AlertDialog, not Dialog; empty state → EmptyState with a domain-specific action.

This is retrieval, not memory. The index was regenerated from source, so what the AI
selects from cannot be stale.

## 3. AI reads the spec — `src/stories/<Component>.mdx`

For each shortlisted component, the deep contract: variants and when each applies,
states it must handle, what the component renders internally vs what the page must
provide (Composition), and the accessibility responsibilities that fall on the page —
row-action `aria-label`s, live regions, focus handling.

## 4. AI builds the page

- New route at `app/dashboard/<page>/page.tsx`, nav item added to the dashboard layout
  (per `PROTOTYPE-CONTEXT.md`)
- Everything composed from `components/ui/` imports
- Any page-level styling uses alias tokens; component internals are already tokenised
- Placeholders you prompted become real props: `emptyState`, skeleton counts, column
  defs, confirmation copy written to the Dialog spec's copy rules

## 5. The gate — where `npm run verify` runs

**After the code is written, before it is committed.** One command, three checks:

```
npm run verify
├─ token-audit.cjs components/ui     zero errors required
├─ token-export-1.5.cjs --check      token exports fresh
└─ design-index.cjs --check          component index fresh
```

Which checks bite depends on what the task touched:

**Case A — the page only composes existing components** (most pages).
The library, tokens, and index are untouched, so verify passes as a formality — but run
it anyway; it's the proof the task *didn't* accidentally touch them. The new page itself
lives in `app/`, which is deliberately not gated (demo screens may hardcode freely). For
feedback on the new page's own styling, point the audit at it directly:

```
node scripts/token-audit.cjs app/dashboard/<page>
```

Advisory, not blocking — but it catches the classic AI mistake of a hex code sneaking
into a className.

**Case B — the page needed a new component or a new token.**
Now the gate is real. The sequence becomes: add the token to `tokens.css` (correct
tier, family-based name) → build the component in `components/ui/` → write its `.mdx`
spec → regenerate (`npm run tokens`, `npm run design-index`) → **`npm run verify` must
pass at zero errors** before the commit. The audit will catch a hardcoded value, an
undefined token reference, or a stale index — the three ways AI-generated component
code silently goes wrong.

## 6. Review, commit, ship

Eyeball the page in the dev server (`npm run dev`) or Storybook. Commit — the message
should say which components were composed and whether the library changed. Push;
Vercel deploys `main` automatically.

---

## Where tokens are involved, step by step

Tokens are everywhere in this workflow — but the AI mostly does not handle them
directly, and that is the design working as intended.

| Step | Tokens' role |
|---|---|
| 1. Prompt | None — you describe content and behaviour, never tokens |
| 2. Component selection | Metadata — each index entry names the component's token namespace and count |
| 3. Reading the spec | States are described in token terms (error state = error surface tokens) |
| 4. Building the page | **Inherited.** Each component already carries its tokens internally — `<Button variant="destructive">` pulls 65 token references in without the AI writing one. Only page-level layout styling touches tokens directly, and there the rule is alias tier: `var(--alias-spacing-section-md)`, never `24px` |
| 5. Rendering | **Executed.** `globals.css` imports `tokens.css`; the browser resolves every chain — component → alias → brand → base → value — live at render |
| 6. `npm run verify` | **Checked.** No hardcoded values, no references to tokens that don't exist, index fresh |

The AI touches tokens first-hand in exactly two places: page-level layout (alias tier
only), and Case B, where a new component or token means editing `tokens.css` at the
correct tier before the gate will pass.

The division of labour in one line: **you prompt content, components carry tokens,
`tokens.css` carries values — and verify guarantees the three layers never got mixed.**

## The loop in one line

```
prompt → DESIGN.generated.md (choose) → <Component>.mdx (contract) → compose in app/
      → npm run verify (gate) → commit → push → live
```

`verify` sits between *written* and *committed* — always after generation, never
before. Its job in this workflow is to make the AI's output trustworthy without a human
reading every line: if a hardcoded value or a phantom token got through, the gate
catches it; if the gate passes, the page is made of real tokens and real components.
