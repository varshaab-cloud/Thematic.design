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

Only `page.tsx` is routed; this file and anything else in the folder is ignored by Next.js.
