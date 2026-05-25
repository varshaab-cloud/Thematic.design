# Surface Layer Audit — Thematic Design System v0.1.0

**Date:** 2026-05-17  
**Framework:** Layers of Product Design — `/layers-surface`  
**Method:** Design system / component library audit  
**Medium:** Screen UI  
**Scope:** All 33 components, 8 Foundation docs, composition stories

---

## What's working well

Don't lose these in revision.

- **Token discipline in components is strong.** Button, Input, and Badge use `var(--base-color-*)` tokens correctly in their variant definitions. The rule — no raw hex in components — holds in almost all cases.
- **Focus ring pattern is consistent.** `focus-visible:border-ring` + `focus-visible:ring-ring/50` is applied correctly and uniformly across Button, Input, and interactive elements. Keyboard accessibility has a solid foundation.
- **Input component is the most complete surface object.** Label, helper text, error/success messages, prefix/suffix icon, char count, controlled/uncontrolled modes — it covers all practical states. This is the standard other form components should match.
- **The token architecture documentation is honest about its own rules.** The Form Patterns doc explicitly calls out: "Label every field — no placeholder-only inputs", "Don't suppress error messages". The rules are written down. That's rare.
- **Button's loading state is well-conceived.** The `isLoading` prop replaces content with a spinner and disables interaction — correct behaviour. The pattern is there; it just needs documented copy conventions.

---

## Audit findings

### Phase 2 — Vocabulary and language

#### Finding 1 — Three words for the same concept (severity) · SURFACE FIX

The concept of "something went wrong / dangerous / failed" uses three different terms across the system:

| Location | Term used |
|----------|-----------|
| Button `variant` | `destructive` |
| Alert `variant` | `destructive` |
| Badge `variant` | `error` |
| Input prop | `errorMessage` / `aria-invalid` |
| Token names | `--base-color-error-*` |

`destructive` and `error` are not synonyms. Destructive describes an **action** (deleting, removing — irreversible). Error describes a **state** (something failed). A delete button is destructive. A failed form submission is an error. These need to be separated in the vocabulary — and then held consistently across every component that uses them.

**Surface fix:** Establish the ubiquitous language:
- `error` — a state where something has failed (form validation, API failure, system problem)
- `destructive` — an action that is irreversible or removes data permanently

Then audit every variant name and copy instance against this distinction.

---

#### Finding 2 — Alert error copy fails the three-part rule · SURFACE FIX

The Alert story ships with these descriptions:

> *"Something went wrong. Please try again."*

> *"This action may have unintended consequences."*

These fail the system's own standard from the Form Patterns doc. A good error message must:
1. **Diagnose** — what happened
2. **Explain** — why it happened
3. **Recover** — what to do next

"Something went wrong. Please try again." does none of the first two and offers a vague recovery. "This action may have unintended consequences" creates anxiety with no resolution.

These are the only real copy examples in the system. They set the standard. Currently they set a low one.

**Surface fix:** Replace story copy with examples that meet the three-part rule:

```
Error: "Changes couldn't be saved"
Description: "The workspace settings failed to update because of a connection issue. 
Check your connection and try again, or contact support if the problem continues."

Warning: "Removing a member can't be undone"  
Description: "They'll lose access to all projects immediately. 
Download their activity log first if you need a record."
```

---

#### Finding 3 — Badge has two naming systems coexisting · SURFACE FIX

Badge exposes both shadcn-default variants (`default`, `secondary`, `outline`) and Thematic semantic variants (`success`, `info`, `warning`, `error`, `brand`). These two systems have no documented relationship. There is no guidance on when to use `default` vs `brand`, or whether `secondary` is ever appropriate in a Thematic UI.

**Surface fix:** Deprecate `default`, `secondary`, and `outline` in the Badge docs. Mark them as system-inherited, not for use in Thematic UIs. Promote the five semantic variants as the only intended API.

---

### Phase 3 — Object consistency

#### Finding 4 — Status severity is a shapeshifter · DEEPER FIX NEEDED

The object "severity level" (info / success / warning / error) has a different representation in every component that uses it:

| Component | How severity is expressed |
|-----------|--------------------------|
| Badge | First-class variants: `success`, `info`, `warning`, `error` |
| Alert | Only `default` + `destructive`. Info/success/warning require manual className overrides |
| Input | Via `errorMessage` prop (error only). No info/success/warning states |
| Button | Only `destructive`. No error/warning |

Alert is the worst case. To produce a success or warning alert, an engineer must write:

```tsx
<Alert className="border-green-500">
  <CheckCircle className="h-4 w-4 text-green-600" />
```

This is a raw Tailwind colour value — a direct violation of the system's core rule. It's not a small gap; it forces anyone using Alert to bypass the token system entirely for two of its four variants.

**Deeper fix needed:** This is a conceptual model problem. "Severity" is not formally modelled as a first-class concept. Badge treats it as one; Alert doesn't. The fix requires:
1. Defining "severity level" as a formal object with four values in the conceptual model
2. Ensuring every component that displays severity expresses all four values through proper token-backed variants — not manual className overrides

---

#### Finding 5 — Border radius disconnect between tokens and components · SURFACE FIX

The token system defines `--base-radius-md: 12px` as the component default, and the foundation documentation states this clearly. But Button uses `rounded-lg` (Tailwind's 8px) and Input uses `rounded-lg` (also 8px). 

The components don't use the radius token. They use a Tailwind utility that maps to a different value.

**Surface fix:** Replace `rounded-lg` with `rounded-[var(--base-radius-md)]` in Button and Input, or register the token value in the Tailwind config so `rounded-md` maps to 12px.

---

#### Finding 6 — Dark mode is implemented at the surface, not at the alias tier · DEEPER FIX NEEDED

The Token Architecture doc states: *"Semantic purpose mapped to base values. Dark mode lives here [alias tier]."* But the components implement dark mode via Tailwind `dark:` utility classes:

```
dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50
```

This is an ad-hoc surface implementation rather than a token-driven one. The alias tier exists precisely to avoid this — a dark-mode switch should only require toggling the alias layer, not touching component code.

**Deeper fix needed:** Either implement dark mode properly through the alias tier (so `--color-surface` resolves differently in dark mode via `@media (prefers-color-scheme: dark)` or a `.dark` class on `:root`), or explicitly document that dark mode is a known gap in v0.1.0 and remove the ad-hoc `dark:` classes until it is properly implemented.

---

### Phase 4 — Completeness check

No breadboard exists, so this compares what the component API offers against what a real enterprise UI would need.

#### Finding 7 — Error states not defined for Select, Combobox, Textarea, RadioGroup · SURFACE FIX

Input has a full error state: `errorMessage` prop, `aria-invalid`, red border, error text. But:
- `Select` — no error state
- `Combobox` — no error state
- `Textarea` — no error state
- `RadioGroup` — no error state

Every one of these appears in forms. Forms have validation errors. The surface is incomplete for any validated form that uses anything other than Input.

**Surface fix:** Add `errorMessage` (or `aria-invalid` + description id wiring) to Select, Combobox, Textarea, and RadioGroup, matching the Input pattern.

---

#### Finding 8 — Empty states not defined anywhere · SURFACE FIX

The iconography doc notes the 48px icon size is "Empty state, hero illustration." But no empty state component, pattern, or guidance exists in the system. 

An enterprise UI will have empty tables, empty search results, empty dashboards, empty inboxes. Without a defined empty state pattern, each will be implemented ad hoc.

**Surface fix:** Define an empty state pattern — at minimum: a 48px icon, a heading, a supporting sentence, and an optional CTA. Add it as a pattern to the Form Patterns doc or as a new Composition pattern page.

---

#### Finding 9 — Toast/Sonner has no story and no usage guidance · SURFACE FIX

`sonner.tsx` is present but has no Storybook story and no documentation. Toast is how the system communicates the result of async actions — save confirmation, error after network failure, success after invite. Without a story and guidelines, every engineer will implement toast calls differently (different duration, different variant choice, different copy patterns).

**Surface fix:** Add a Toast story with examples for each semantic variant (success, error, info, warning) and a copy guide: what goes in the title, what goes in the description, when to use persistent vs auto-dismiss.

---

### Phase 5 — Emotional register

Thematic is an enterprise system. The emotional jobs are **confidence** (I trust this tool), **efficiency** (I can work fast), and **control** (I understand what's happening).

#### Finding 10 — Alert copy undermines the control job · SURFACE FIX

Covered in Finding 2. "Something went wrong" removes control from the user. Enterprise users are professionals — they can handle specificity. Vague errors feel like the system is hiding something, which erodes trust faster than a specific error ever would.

#### Finding 11 — Destructive actions have no confirmation copy pattern · SURFACE FIX

`AlertDialog` exists as a component. But there is no guidance on how to write confirmation copy for destructive actions. The copy pattern for "are you sure?" dialogs is where most systems get the emotional register wrong — either too clinical ("Confirm deletion?") or too alarming ("Warning! This cannot be undone!").

For an enterprise product the right register is: direct, specific, and respectful of the user's intelligence.

```
// Too clinical
"Are you sure you want to delete this item?"

// Too alarming  
"WARNING: This action is permanent and cannot be reversed!"

// Right register
"Remove Priya Sharma from this workspace?"
"She'll lose access to all 12 projects immediately. This can't be undone."
[Cancel]  [Remove member]
```

**Surface fix:** Add a destructive confirmation copy pattern to the Form Patterns doc.

---

## Decision inventory

### Surface decisions to make now

| # | Decision | Options | Constraint |
|---|----------|---------|------------|
| D1 | Establish ubiquitous language for `error` vs `destructive` | Separate cleanly as action vs state, or collapse to one term | Must be consistent across all 33 components |
| D2 | Alert severity variants | Add `success`, `info`, `warning` as proper token-backed variants OR wrap Alert to handle severity as a prop | Cannot leave green-500/yellow-500 as the answer |
| D3 | Radius alignment | Use CSS var in components, or map token to Tailwind config | Token doc says 12px; components ship 8px |
| D4 | Empty state pattern | Standalone component OR documented composition of existing primitives | 48px icon already specified in Iconography |
| D5 | Toast usage guide | Write copy patterns for each semantic variant | Sonner is already installed |
| D6 | Destructive confirmation copy pattern | Add to Form Patterns doc | AlertDialog component exists |

### Cross-layer issues to resolve first

These cannot be fixed at the surface without revisiting a lower layer:

| Issue | Lower layer | What needs to happen |
|-------|-------------|---------------------|
| Severity shapeshifting (Finding 4) | Conceptual model | Define "severity level" as a formal object with four states |
| Dark mode via ad-hoc classes (Finding 6) | Token architecture (alias tier) | Implement dark mode at the token level, not the component level |

### Deferred

- **Motion and transitions** — Button uses `transition-all` but no motion token or timing system is defined. Not urgent for v0.1 but will matter at scale.
- **Density variants** — The spacing doc mentions compact as the default. A formal density prop (compact / comfortable / spacious) across components is a later-stage decision.
- **Print surface** — Not relevant for current scope.

---

## Summary

The Thematic surface is in better shape than most systems at this stage. The token discipline is genuinely good; the Input component is a strong reference implementation; the Foundation documentation is honest and specific.

The three issues that most need attention before the surface can be considered coherent:

1. **Resolve the `error` vs `destructive` vocabulary conflict** — it touches every component and every error state in the product
2. **Give Alert the same severity coverage as Badge** — right now it forces token violations in production use
3. **Define empty states and Toast patterns** — these are the two most common surfaces in an enterprise UI that have no definition

The surface is where everything decided in the layers below either gets honoured or undermined. The token architecture is well-designed. The surface just needs to catch up to it.

---

*Revisit this audit after any significant change to the conceptual model or interaction structure.*  
*Versioned against: Thematic Design System v0.1.0 — see VERSION-v0.1.0.md*
