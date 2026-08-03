# Task notes — dashboard/invoices (invoice processing)

- **Date / time:** 2026-08-03, 15:00–16:30 IST
- **Prompt used:** "Can you create a dashboard for a invoice processing. needs to have form inputs for the invoice data. and process to next step and check if there are any missing data in the invoice capture."
  Clarified via follow-up: route under `app/dashboard/invoices/`, multi-step wizard shape, surface problems with **inline field errors + per-field confidence badges**, ship as real Next.js code with NOTES.md (not a throwaway mockup).
- **Components chosen (from DESIGN.generated.md):** Stepper (+ StepperContent, StepperActions), Card / CardHeader / CardTitle / CardContent, MetricCard, FileUpload, Progress, Alert (+ AlertTitle, AlertDescription), Badge, Button, Input (`InputBase`), Select (+ SelectField, SelectTrigger, SelectValue, SelectContent, SelectItem), Textarea, Table (+ TableHeader/Body/Footer/Row/Head/Cell), Separator, EmptyState, SidebarNav (via the existing dashboard layout).
- **Specs read (.mdx):** `Stepper.mdx`, `FileUpload.mdx`, `Input.mdx`, `Badge.mdx`, `Table.mdx`, plus the generated entries in `DESIGN.generated.md` for Alert, Button, Card, MetricCard, Select, Textarea, Progress, EmptyState, Separator, Tooltip, DatePicker, NumberInput.
- **Verify result:** `npm run verify` → **0 errors, 67 warnings** (`components/ui`) and **0 errors, 24 warnings** (`components/recipes`); tokens 1.5 exports and `DESIGN.generated.md` both up to date. Every warning is a pre-existing "literal above base tier" entry in `tokens.css` — none originate in this session's files. Targeted run `node scripts/token-audit.cjs app/dashboard/invoices` → **0 errors**.
- **Hardcoded values found:** none. Every colour, radius and spacing value in the new files is a `var(--…)` reference; only Tailwind scale utilities (`p-6`, `size-4`, `gap-2`) and layout primitives are used bare, matching the existing dashboard pages.
- **Phantom tokens found:** none. Token names were checked against `src/styles/tokens.css` before use rather than guessed — in particular `--component-input-field-color-stroke-error` (not `--component-input-color-stroke-error`) for the line-item error borders.
- **Drift:** none. No existing component or token was modified. `app/dashboard/layout.tsx` gained a new nav section only (see below) — no rendered value changed on any existing screen.

## Change to an existing file

`app/dashboard/layout.tsx` — added a **Finance** nav section with a single `Invoices` item (`FileText` icon, `/dashboard/invoices`), inserted between *Operations* and *Administration*, and added `FileText` to the `lucide-react` import. Additive only.

## Verification performed

The repo's `node_modules` are macOS binaries, so `next build` can't run in the sandbox. A build-and-run copy of the project (this route + its transitive component set) was assembled in a Linux container and exercised end to end with Playwright:

- `next build` → compiled successfully, no type errors in the new files (`tsc --noEmit` on the real repo also shows no errors in them; the two pre-existing errors in `prompt-suggestions.tsx` and `result-variations.tsx` are untouched).
- Zero console/page errors across the whole flow.
- Asserted behaviour: **Next is blocked** while the Due date is missing → fills → advances; **Next is blocked** on the line-items step while a unit price is 0 and the totals don't reconcile → fills → advances; **Submit is blocked** while GL code / cost centre / approver are unset → fills → confirmation screen renders.

## Design decisions worth a second look

- **Validation timing.** Extracted values are machine-supplied, so capture and line-item errors are revealed the moment extraction finishes rather than waiting for the first Next click — showing an error on a field the user hasn't touched is normally bad practice, but here the wrong value was put there by the system, not the person. Approval fields (GL code, cost centre, approver) are user-supplied and stay quiet until submit.
- **Blocking vs. non-blocking Next.** The brief asked for inline errors and confidence badges but *not* a disabled Next button. Next is therefore always enabled, but clicking it validates and refuses to advance while the current step has blockers, with a one-line hint above the actions. This satisfies `Stepper.mdx` ("validate each step before allowing the user to advance … do not surface all errors on the final step") without the disabled-button pattern that was declined.
- **Reconciliation as a first-class check.** The sample data is rigged so the one missing unit price is exactly the gap between the line-item total and the total printed on the document — filling it in clears both exceptions at once. This is the demo's whole argument, so it's worth preserving if the fixtures are ever changed.

## Components built beyond the library

- **Name:** `ConfidenceField`
  - **Tier:** recipe
  - **Location:** `components/recipes/ConfidenceField.tsx`
  - **Where on the page:** `/dashboard/invoices` · step 2 "Invoice data", the two-column field grid · `app/dashboard/invoices/page.tsx:520–740` (nine instances)
  - **Purpose:** A labelled form field that also reports how confident an automated extraction is about the value in it. The library has no field wrapper that carries a machine-confidence signal, and every AI-extraction screen in this product will need one.
  - **Composed from:** `components/ui/badge` (`Badge`), plus a native `<label>` and the error/helper line. The control is passed as `children`, so it works with `InputBase`, `Select`, `Textarea` or `DatePicker` without knowing about any of them.
  - **Tokens used:** `--alias-spacing-stack-xs`, `--alias-spacing-inline-xs`, `--alias-typography-body-text2-font-size`, `--alias-typography-caption1-font-size`, `--alias-typography-weight-medium`, `--alias-color-text-primary`, `--alias-color-text-subtle`, `--alias-color-feedback-error-fg`.
  - **Audit result:** clean — `node scripts/token-audit.cjs components/recipes` reports 0 errors; it is inside the `npm run verify` gate.
  - **Promotion candidate:** **yes, worth discussing.** It is content-agnostic and context-agnostic — nothing about it is invoice-specific. If the system is going to grow more document-AI surfaces, this is a library primitive with an `.mdx` of its own. Human call.

- **Name:** `LineItemsEditor`
  - **Tier:** snowflake
  - **Location:** `app/dashboard/invoices/LineItemsEditor.tsx`
  - **Where on the page:** `/dashboard/invoices` · step 3 "Line items", between the step heading and the reconciliation panel · `app/dashboard/invoices/page.tsx:806`
  - **Purpose:** The editable line-item grid — inline description/qty/unit-price/tax cells, per-row exception highlighting, add/remove rows, and a computed subtotal / tax / total footer. The columns and the tax-inclusive amount maths are invoice-specific.
  - **Composed from:** `components/ui/table` (Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell), `components/ui/input` (`InputBase`), `components/ui/button` (`Button`), `components/ui/badge` (`Badge`).
  - **Tokens used:** `--alias-radius-lg`, `--alias-color-border-default`, `--alias-color-background-secondary`, `--alias-color-feedback-error-bg`, `--alias-color-feedback-error-fg`, `--alias-color-text-primary`, `--alias-color-text-secondary`, `--alias-color-text-subtle`, `--alias-spacing-stack-sm`, `--alias-spacing-inline-xs`, `--alias-spacing-inline-md`, `--alias-typography-caption1-font-size`, `--alias-typography-weight-semibold`, `--component-input-field-color-stroke-error`.
  - **Audit result:** clean — `node scripts/token-audit.cjs app/dashboard/invoices` reports 0 errors.
  - **Promotion candidate:** no. Too tied to invoice semantics. A generic "editable data grid" would be a different component with a different API.

Neither component has a story or `.mdx` yet — per `components/recipes/README.md` that waits on your sign-off of these entries.

## Deferred to human

- **`DatePicker` cannot be labelled from outside.** `DatePickerProps` exposes no `id` / `aria-labelledby` passthrough, so a visible label rendered by a wrapper (like `ConfidenceField`) can't be associated with its trigger button. The two date fields use `InputBase type="date"` instead, which is labelable and keyboard-operable but drops the branded calendar. **Suggested fix:** add an optional `id` (and ideally `aria-labelledby`) prop to `DatePicker` and forward it to the `PopoverTrigger` button — then these two fields can switch over. Not changed here because it touches the library.
- **`StepperActions` has no `disabled` prop** for the primary button — only `isLoading`. That is why blocking is implemented by refusing to advance in `onNext` / `onSubmit` rather than by disabling the button. If the disabled-Next pattern is ever wanted, `StepperActions` needs the prop.
- **`SelectField` doesn't forward ARIA attributes**, so the two selects inside `ConfidenceField` are composed from the raw `Select` / `SelectTrigger` parts to get `id`, `aria-invalid` and `aria-describedby` onto the trigger. Worth considering whether `SelectField` should accept and forward them.
- **The queue metrics are static placeholders** (14 in queue, 3 awaiting review, 27 approved today). Only "Exceptions on this invoice" is live. Wire the first three to real data or drop them before this goes near a user.
- **Promotion of `ConfidenceField` to the library** — flagged above, explicitly a human decision.
