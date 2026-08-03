# Task notes — <name>

- **Date / time:** (when the session ran)
- **Prompt used:**
- **Components chosen (from DESIGN.generated.md):**
- **Specs read (.mdx):**
- **Verify result:** (errors / warnings, final run)
- **Hardcoded values found:** (what the audit caught during the session, and the token each was replaced with — "none" if clean first pass)
- **Phantom tokens found:** (undefined `var()` references caught, and the correct token used instead — "none" if clean)
- **Drift:** (any place the rendered value changed from what was there before — file, token, old value → new value. Fixes must be value-identical, so anything listed here needs human sign-off — "none" expected)
- **Deferred to human:** (anything the auditor wouldn't decide alone)

## Components built beyond the library

("none" if the page used only library components. One block per improvised component:)

- **Name:**
  - **Tier:** recipe / snowflake
  - **Location:** `components/recipes/<Name>.tsx` or `app/<task>/…`
  - **Where on the page:** (route · what section of the layout it sits in · `file:line` where it's rendered — e.g. `/checkout · payment step, below the address form · app/checkout/page.tsx:112`)
  - **Purpose:** (the use case that required it)
  - **Composed from:** (which `components/ui/` components)
  - **Tokens used:** (the `var(--…)` roles it relies on)
  - **Audit result:** (hardcoded values / phantom tokens found and fixed — "clean" if none)
  - **Promotion candidate:** yes / no — (would it make sense in the library? Human decides.)

Only `page.tsx` is routed; this file and anything else in the folder is ignored by Next.js.
