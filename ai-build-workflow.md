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

## The loop in one line

```
prompt → DESIGN.generated.md (choose) → <Component>.mdx (contract) → compose in app/
      → npm run verify (gate) → commit → push → live
```

`verify` sits between *written* and *committed* — always after generation, never
before. Its job in this workflow is to make the AI's output trustworthy without a human
reading every line: if a hardcoded value or a phantom token got through, the gate
catches it; if the gate passes, the page is made of real tokens and real components.
