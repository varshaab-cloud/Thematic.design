# MayThematic Token Audit — Tokens 1.2
**Generated:** 2026-05-27  
**Token source:** `tokens 1.2/tokens.json`  
**Components audited:** 54 files in `components/ui/`

---

## Executive Summary

| Status | Count | Components |
|--------|-------|-----------|
| ✅ Compliant | 10 | accordion, avatar, breadcrumb, checkbox, context-menu, file-upload, list, multi-select, skeleton, switch |
| ⚠️ Partial | 35 | alert, alert-dialog, app-header, badge, button, card, collapsible, combobox, command, command-palette, copy-to-clipboard, data-table, date-picker, date-range-picker, dialog, dropdown-menu, empty-state, form, input, input-group, number-input, pagination, popover, progress, radio-group, scroll-area, segmented-control, select, separator, sheet, sidebar-nav, slider, sonner, spinner, stepper, system-banner, table, tabs, tag-input, textarea, time-picker, timeline, tooltip, tree-view |
| ❌ Not tokenised | 0 | — |

**Overall:** No component is completely un-tokenised, but 35 of 54 have notable gaps. The most critical categories of drift are:

1. **Component tokens bypassed** — `--component-button-*`, `--component-card-*`, and `--component-badge-*` tokens are almost entirely ignored in favour of alias and base tokens.
2. **`--base-color-*` used directly** where `--alias-*` semantic tokens exist (especially in `app-header`, `date-range-picker`, `command-palette`, `sidebar-nav`, `slider`, `time-picker`).
3. **Non-existent tokens referenced** — multiple components reference `--base-color-success-*`, `--base-color-error-*`, `--base-color-warning-*`, `--base-color-info-*` which do not exist in tokens 1.2; the correct tier is `--semantic-color-*`.
4. **Typography** — all components use Tailwind utility classes (`text-sm`, `font-medium`, `text-xs`) instead of `--alias-typography-*` tokens.
5. **Spacing** — all components use Tailwind spacing utilities or hardcoded `px-*`/`py-*` classes instead of `--alias-spacing-*` or `--component-*-padding-*` tokens.
6. **Motion** — all components use Tailwind `transition-*` classes or hardcoded durations instead of `--alias-motion-transition-*` tokens.

---

## High-Priority Components

---

### `button.tsx` ⚠️ Partial

**Status:** Partial — uses some alias tokens but bypasses all `--component-button-*` tokens and has incorrect non-existent token references.

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | See below |
| Typography | ❌ Missing | Uses Tailwind `text-sm`, `font-medium` |
| Spacing | ❌ Missing | Uses hardcoded `px-2.5`, `h-8`, `h-7` etc. |
| Elevation | N/A | — |
| Shape | ⚠️ Partial | `--base-radius-md` and `--base-radius-lg` used — correct base tier |
| Border | ⚠️ Partial | Focus ring uses `--alias-color-border-active` ✅; border colour bypasses component tokens |
| Motion | ❌ Missing | Uses Tailwind `transition-all` |

**Color issues:**
- `default` variant: Uses `--alias-color-background-brand` ✅ for bg, `--alias-color-text-inverse` ✅ for text, but hover uses raw `--base-color-blue-700` and active uses `--base-color-blue-900` — should use `--component-button-primary-background-hover` and `--component-button-primary-background-active`.
- `outline` variant: Uses `--alias-color-border-default` ✅, `--alias-color-background-primary` ✅, but hover uses `--base-color-gray-100` (not in tokens 1.2 — gray palette only goes to `--base-color-gray-75`, `--base-color-gray-100` = `--base-color-gray-100` which is `--alias-color-background-tertiary`).
- `secondary` variant: Uses `--alias-color-background-tertiary` ✅ but hover uses `--base-color-gray-200` directly.
- `ghost` variant: Hover uses `--base-color-gray-100` — should use `--component-button-ghost-background-hover` (`--eeeeec` = `--alias-color-background-tertiary`).
- `destructive` variant: **Critical error** — references `--base-color-error-200` and `--base-color-error-300` which **do not exist** in tokens 1.2. The correct tokens are `--semantic-color-error-200` / `--semantic-color-error-300`, or use `--component-button-destructive-background` / `--component-button-destructive-text`.

**Component token bypass — all variants ignore:**
- `--component-button-primary-background`, `--component-button-primary-background-hover`, `--component-button-primary-background-active`, `--component-button-primary-background-disabled`
- `--component-button-primary-text`, `--component-button-primary-text-disabled`
- `--component-button-primary-border-radius`, `--component-button-primary-padding-x/y`, `--component-button-primary-font-size/weight`
- `--component-button-secondary-*`, `--component-button-ghost-*`, `--component-button-destructive-*`

**Recommended fixes:**
- Replace `bg-[var(--alias-color-background-brand)]` → `bg-[var(--component-button-primary-background)]`
- Replace hover/active states with `--component-button-primary-background-hover` / `--component-button-primary-background-active`
- Replace `--base-color-error-200/300` with `--component-button-destructive-background` / `--component-button-destructive-text`
- Replace `text-sm font-medium` with `text-[length:var(--component-button-primary-font-size)] font-[number:var(--component-button-primary-font-weight)]`
- Replace `px-2.5` with `px-[var(--component-button-primary-padding-x)]`
- Replace `transition-all` with `transition-[background-color,color,border-color] duration-[var(--base-duration-normal)] ease-[var(--base-easing-ease-out)]`

---

### `input.tsx` ⚠️ Partial

**Status:** Partial — `InputBase` is better tokenised than the main `Input` wrapper which has several raw base-color uses and non-existent token references.

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | See below |
| Typography | ❌ Missing | Uses Tailwind `text-sm`, `text-xs`, `font-medium` |
| Spacing | ❌ Missing | Uses hardcoded `px-2.5`, `py-1`, `h-8` |
| Elevation | N/A | — |
| Shape | ⚠️ Partial | Uses `--base-radius-md` ✅ |
| Border | ⚠️ Partial | See below |
| Motion | ❌ Missing | Uses Tailwind `transition-colors` |

**Color issues (main `Input` component):**
- Line with `border border-[var(--base-color-gray-300)]` — should use `--component-input-border` (`#d5d5d5` = `--alias-color-border-default`).
- `bg-[var(--base-color-white)]` — should use `--component-input-background`.
- `disabled:bg-[var(--base-color-gray-100)]` — should use `--component-input-background-disabled`.
- `hasSuccess` state: `border-[var(--base-color-success-900)]` and `ring-3 ring-[var(--base-color-success-800)]/30` — **`--base-color-success-*` does not exist** in tokens 1.2. Should use `--alias-color-border-success` for the border and `--alias-color-feedback-success-border` for the ring.
- Success message text `text-[var(--base-color-green-800)]` — should use `--alias-color-feedback-success-fg` (`var(--semantic-color-success-800)`).

**`InputBase` (inner element) issues:**
- `bg-transparent` — acceptable since the wrapper provides background.
- `border-[var(--alias-color-border-default)]` ✅ correct.
- `disabled:bg-[var(--alias-color-border-default)]/50` — opaque value; better: `--component-input-background-disabled`.

**Recommended fixes:**
- `border-[var(--base-color-gray-300)]` → `border-[var(--component-input-border)]`
- `bg-[var(--base-color-white)]` → `bg-[var(--component-input-background)]`
- `disabled:bg-[var(--base-color-gray-100)]` → `disabled:bg-[var(--component-input-background-disabled)]`
- `border-[var(--base-color-success-900)]` → `border-[var(--alias-color-border-success)]`
- `ring-[var(--base-color-success-800)]` → `ring-[var(--alias-color-feedback-success-border)]`
- `text-[var(--base-color-green-800)]` → `text-[var(--alias-color-feedback-success-fg)]`
- `px-2.5` → `px-[var(--component-input-padding-x)]`
- `text-sm` → `text-[length:var(--component-input-font-size)]`

---

### `card.tsx` ⚠️ Partial

**Status:** Partial — ignores all `--component-card-*` tokens; references non-existent `--base-color-success-*`, `--base-color-warning-*`, `--base-color-error-*`.

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | See below |
| Typography | ❌ Missing | `text-sm`, `text-base`, `text-xs`, `font-semibold` Tailwind |
| Spacing | ❌ Missing | `py-4`, `px-4`, `gap-4` hardcoded |
| Elevation | ⚠️ Partial | Uses `--base-shadow-02` ✅ but not `--component-card-shadow` |
| Shape | ⚠️ Partial | Uses `--base-radius-md` ✅ but not `--component-card-border-radius` |
| Border | ⚠️ Partial | Uses `--base-color-gray-200` for border — should be `--component-card-border` |
| Motion | N/A | — |

**Color issues:**
- `bg-[var(--alias-color-background-primary)]` ✅ correct, but `--component-card-background` should be preferred.
- `border border-[var(--base-color-gray-200)]` — should use `--component-card-border`.
- `CardTitle` uses no explicit color — should use `--component-card-title-color`.
- `CardDescription` uses `--alias-color-text-subtle` — close, but `--component-card-body-color` should be used.
- `MetricCard` success/warning/error variants use `--base-color-success-800`, `--base-color-warning-50`, `--base-color-error-200` — **all non-existent** in tokens 1.2. Correct equivalents:
  - `--base-color-success-800` → `--semantic-color-success-800`
  - `--base-color-warning-50` → `--semantic-color-warning-100` (closest)
  - `--base-color-error-200` → `--semantic-color-error-200`
- `trendConfig.up` uses `--base-color-green-800` ✅ (this base token does exist).
- `trendConfig.down` uses `--base-color-error-300` — **does not exist**; should be `--semantic-color-error-300` or `--alias-color-feedback-error-fg`.

**Component token bypass:**
- All `--component-card-background`, `--component-card-border`, `--component-card-border-radius`, `--component-card-shadow`, `--component-card-padding`, `--component-card-title-color`, `--component-card-body-color` are ignored.

**Recommended fixes:**
- `bg-[var(--alias-color-background-primary)]` → `bg-[var(--component-card-background)]`
- `border-[var(--base-color-gray-200)]` → `border-[var(--component-card-border)]`
- `rounded-[var(--base-radius-md)]` → `rounded-[var(--component-card-border-radius)]`
- `shadow-[var(--base-shadow-02)]` → `shadow-[var(--component-card-shadow)]`
- `py-4 px-4` → `p-[var(--component-card-padding)]`
- Replace `--base-color-success-*` with `--semantic-color-success-*` throughout
- Replace `--base-color-error-*` with `--semantic-color-error-*` or `--alias-color-feedback-error-*`
- Replace `--base-color-warning-*` with `--semantic-color-warning-*`

---

### `badge.tsx` ⚠️ Partial

**Status:** Partial — default/secondary/destructive/outline variants use alias tokens well; semantic variants bypass `--component-badge-*` tokens and use non-existent base tokens.

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | See below |
| Typography | ❌ Missing | Uses Tailwind `text-xs`, `text-sm`, `font-medium` |
| Spacing | ❌ Missing | Uses hardcoded `px-2`, `py-0.5`, `h-5` |
| Elevation | N/A | — |
| Shape | ❌ Missing | Uses Tailwind `rounded-full` instead of `--component-badge-*-border-radius` or `--base-radius-xxl` |
| Border | ⚠️ Partial | Focus uses `--alias-color-border-active` ✅ |
| Motion | ❌ Missing | Uses Tailwind `transition-all` |

**Color issues:**
- `default` variant: `--alias-color-background-brand` ✅, `--alias-color-text-inverse` ✅ — correct.
- `secondary`, `destructive`, `outline` variants use alias tokens ✅.
- `success` variant: `bg-[var(--base-color-success-800)]` and `text-[var(--base-color-green-800)]` — `--base-color-success-800` **does not exist**. Should use `--component-badge-success-background` (`var(--semantic-color-success-200)`) and `--component-badge-success-text` (`var(--semantic-color-success-800)`).
- `info` variant: `bg-[var(--base-color-info-600)]` and `text-[var(--base-color-info-700)]` — **both `--base-color-info-*` do not exist**. Should use `--component-badge-info-background` and `--component-badge-info-text`.
- `warning` variant: `bg-[var(--base-color-warning-50)]` — **does not exist**. Should use `--component-badge-warning-background` and `--component-badge-warning-text`.
- `error` variant: `bg-[var(--base-color-error-200)]` and `text-[var(--base-color-error-300)]` — **`--base-color-error-200/300` do not exist**. Should use `--component-badge-error-background` and `--component-badge-error-text`.
- `dotColor` map: `--base-color-info-700`, `--base-color-warning-100`, `--base-color-error-300` — all non-existent.

**Component token bypass — all semantic variants ignore:**
- `--component-badge-success-background`, `--component-badge-success-text`, `--component-badge-success-border-radius`
- `--component-badge-info-background`, `--component-badge-info-text`, `--component-badge-info-border-radius`
- `--component-badge-error-background`, `--component-badge-error-text`, `--component-badge-error-border-radius`
- `--component-badge-warning-background`, `--component-badge-warning-text`, `--component-badge-warning-border-radius`

**Recommended fixes:**
- `success`: `bg-[var(--component-badge-success-background)] text-[var(--component-badge-success-text)]`
- `info`: `bg-[var(--component-badge-info-background)] text-[var(--component-badge-info-text)]`
- `warning`: `bg-[var(--component-badge-warning-background)] text-[var(--component-badge-warning-text)]`
- `error`: `bg-[var(--component-badge-error-background)] text-[var(--component-badge-error-text)]`
- Replace `rounded-full` with `rounded-[var(--component-badge-success-border-radius)]` (all variants share `--base-radius-xxl`)

---

## All Components (Alphabetical)

---

### `accordion.tsx` ✅ Compliant

| Category | Status | Notes |
|----------|--------|-------|
| Color | ✅ Applied | `--alias-color-border-active`, `--alias-color-text-primary`, `--alias-color-text-subtle` used correctly |
| Typography | ⚠️ Partial | Size classes use hardcoded `text-xs`, `text-sm`, `text-base` |
| Spacing | ⚠️ Partial | Size classes use hardcoded `py-2 px-3` etc. |
| Elevation | N/A | — |
| Shape | ✅ Applied | `--base-radius-lg` used for trigger |
| Border | ✅ Applied | `--alias-color-border-active` for focus ring |
| Motion | ❌ Missing | No motion tokens; uses Tailwind `transition-all` |

**Issues:**
- Typography size array (`text-xs`, `text-sm`, `text-base`) should map to `--alias-typography-body-text3/2/1-font-size` tokens.
- Spacing in `accordionTriggerSizeClasses` uses hardcoded rem/px Tailwind values.

---

### `alert.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | See below |
| Typography | ❌ Missing | `text-xs`, `text-sm`, `text-base`, `text-[11px]` Tailwind |
| Spacing | ❌ Missing | `p-3`, `p-4`, `p-5` hardcoded |
| Elevation | N/A | — |
| Shape | ✅ Applied | `--base-radius-md` used |
| Border | ✅ Applied | Alias feedback border tokens used |
| Motion | N/A | — |

**Color issues:**
- `warning` variant text uses `--base-color-gray-900` ✅ (exists) but also `--base-color-gray-700` for description — `--base-color-gray-700` exists ✅.
- All feedback variants use `--alias-color-feedback-*-bg/fg` ✅ and `--alias-color-border-*` ✅ correctly.
- `default` variant has no explicit background border colour — uses inherited `border` class without a token; `--alias-color-border-default` should be specified.

---

### `alert-dialog.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | See below |
| Typography | ❌ Missing | `text-sm`, `text-base`, `font-medium` Tailwind |
| Spacing | ❌ Missing | `p-4`, `gap-4` hardcoded |
| Elevation | N/A | — |
| Shape | ✅ Applied | `--base-radius-xl` for content, `--base-radius-md` for media |
| Border | ⚠️ Partial | Uses `ring-foreground/10` (Tailwind/shadcn token, not design token) |
| Motion | ❌ Missing | `duration-100` hardcoded |

**Color issues:**
- `AlertDialogContent`: Uses `ring-1 ring-foreground/10` — `foreground` is a shadcn CSS var, not a tokens-1.2 alias; should be `ring-1 ring-[var(--alias-color-text-primary)]/10`.
- `AlertDialogDescription`: Uses `text-muted-foreground` — shadcn token, not tokens-1.2. Should use `--alias-color-text-subtle`.
- `AlertDialogDescription` link hover uses `text-foreground` — should use `--alias-color-text-primary`.
- `AlertDialogFooter`: Uses `--alias-color-background-tertiary` ✅ for footer bg.
- `AlertDialogMedia`: Uses `--alias-color-background-tertiary` ✅.

---

### `app-header.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | Heavy use of `--base-color-*` where alias tokens exist |
| Typography | ❌ Missing | `text-sm`, `text-xs`, `font-semibold` Tailwind |
| Spacing | ❌ Missing | `px-4`, `gap-3`, `h-8` hardcoded |
| Elevation | ⚠️ Partial | `--base-shadow-04` used in dropdown ✅ |
| Shape | ✅ Applied | `--base-radius-md`, `--base-radius-sm` used |
| Border | ⚠️ Partial | `--base-color-gray-200` used for borders instead of `--alias-color-border-default` |
| Motion | ❌ Missing | `transition-colors` Tailwind |

**Color issues:**
- `AppHeader` bg: `bg-card` — shadcn token, not tokens-1.2. Should be `bg-[var(--alias-color-background-primary)]`.
- `AppHeader` border: `border-[var(--base-color-gray-200)]` — should be `--alias-color-border-default`.
- `AppHeaderLogo` wordmark: `text-[var(--base-color-gray-900)]` — should be `--alias-color-text-primary`.
- `AppHeaderNavItem` active: `text-[var(--base-color-blue-800)]` — should be `--alias-color-text-brand`.
- `AppHeaderNavItem` inactive: `text-[var(--base-color-gray-600)]` — should be `--alias-color-text-subtle`.
- `AppHeaderNavItem` hover: `text-[var(--base-color-gray-900)]` — should be `--alias-color-text-primary`.
- `AppHeaderSearch` border/bg: `--base-color-gray-200`, `--base-color-gray-50` — should be `--alias-color-border-default`, `--alias-color-background-secondary`.
- `AppHeaderSearch` text: `--base-color-gray-400`, `--base-color-gray-900` — should be `--alias-color-text-subtle`, `--alias-color-text-primary`.
- `AppHeaderNotifications` badge: `bg-[var(--base-color-blue-800)]` — should be `--alias-color-background-brand`.
- `AppHeaderUser` dropdown: uses `--alias-color-background-primary` ✅ but `--base-color-gray-200` for border (should be `--alias-color-border-default`).
- Focus rings use `--base-color-blue-400` — should use `--alias-focus-ring-color` or `--alias-color-border-active`.

---

### `avatar.tsx` ✅ Compliant

| Category | Status | Notes |
|----------|--------|-------|
| Color | ✅ Applied | `--alias-color-border-default`, `--alias-color-background-tertiary`, `--alias-color-text-subtle`, `--alias-color-background-brand`, `--alias-color-text-inverse`, `--alias-color-background-secondary` all used correctly |
| Typography | ⚠️ Partial | `text-sm`, `text-xs` Tailwind |
| Spacing | N/A | Size is component-specific |
| Elevation | N/A | — |
| Shape | ✅ Applied | `rounded-full` appropriate for avatar shape |
| Border | ✅ Applied | `--alias-color-border-default` |
| Motion | N/A | — |

---

### `badge.tsx` — See High-Priority section above.

---

### `breadcrumb.tsx` ✅ Compliant

| Category | Status | Notes |
|----------|--------|-------|
| Color | ✅ Applied | `--alias-color-text-subtle`, `--alias-color-text-primary` used correctly |
| Typography | ⚠️ Partial | `text-sm` Tailwind |
| Spacing | ⚠️ Partial | `gap-1.5` hardcoded |
| Elevation | N/A | — |
| Shape | N/A | — |
| Border | N/A | — |
| Motion | ❌ Missing | `transition-colors` Tailwind |

---

### `button.tsx` — See High-Priority section above.

---

### `card.tsx` — See High-Priority section above.

---

### `checkbox.tsx` ✅ Compliant

| Category | Status | Notes |
|----------|--------|-------|
| Color | ✅ Applied | `--alias-color-border-default`, `--alias-color-border-active`, `--alias-color-border-error`, `--alias-color-feedback-error-fg`, `--alias-color-border-brand`, `--alias-color-background-brand`, `--alias-color-text-inverse` all correct |
| Typography | N/A | — |
| Spacing | N/A | — |
| Elevation | N/A | — |
| Shape | ⚠️ Partial | Uses hardcoded `rounded-[4px]` — should be `--base-radius-sm` (`4px`) |
| Border | ✅ Applied | Alias border tokens used |
| Motion | ❌ Missing | `transition-colors` Tailwind |

**Minor issue:** `rounded-[4px]` should be `rounded-[var(--base-radius-sm)]`.

---

### `collapsible.tsx` ✅ Compliant

No styling applied directly — pure structural wrapper for Radix Collapsible. Token compliance is N/A. No hardcoded values.

---

### `combobox.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | See below |
| Typography | ❌ Missing | `text-sm` Tailwind |
| Spacing | ❌ Missing | `h-8`, `px-2.5` hardcoded |
| Elevation | N/A | — |
| Shape | ✅ Applied | `--base-radius-md` used |
| Border | ⚠️ Partial | See below |
| Motion | ❌ Missing | `transition-colors` Tailwind |

**Color issues:**
- Trigger border: `border-[var(--base-color-gray-300)]` — should be `--component-input-border` or `--alias-color-border-default`.
- Trigger bg: `bg-[var(--base-color-white)]` — should be `--component-input-background` or `--alias-color-background-primary`.
- Trigger hover border: `--base-color-gray-400` — no alias token for hover border; closest is `--alias-color-border-active` on focus.
- Trigger disabled: `disabled:bg-[var(--base-color-gray-100)]` — should be `--component-input-background-disabled`.
- Label, required star, error, helper text use alias tokens ✅.

---

### `command.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | See below |
| Typography | ❌ Missing | `text-xs`, `text-sm` Tailwind |
| Spacing | ❌ Missing | `p-1`, `px-2`, `py-1.5` hardcoded |
| Elevation | N/A | — |
| Shape | ✅ Applied | `--base-radius-md` used |
| Border | N/A | — |
| Motion | N/A | — |

**Color issues:**
- `Command` bg: `bg-card` — shadcn token; should be `--alias-color-background-primary`.
- `CommandGroup` heading: `text-muted-foreground` — shadcn token; should be `--alias-color-text-subtle`.
- `CommandItem` selected: `data-selected:bg-[var(--base-color-gray-100)]` — exists but should prefer `--alias-color-background-hover`.
- `CommandShortcut`: `text-muted-foreground` — shadcn token; should be `--alias-color-text-subtle`.
- `CommandSeparator`: `bg-border` — shadcn token; should be `--alias-color-border-default`.
- `CommandItem` foreground: `text-foreground` — shadcn token; should be `--alias-color-text-primary`.

---

### `command-palette.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | Heavy use of `--base-color-*` — see below |
| Typography | ❌ Missing | `text-sm`, `text-xs`, `text-[10px]` Tailwind |
| Spacing | ❌ Missing | `px-3`, `py-2.5` hardcoded |
| Elevation | ❌ Missing | `shadow-xl` Tailwind class instead of `--base-shadow-05` |
| Shape | ✅ Applied | `--base-radius-lg`, `--base-radius-sm` used |
| Border | ⚠️ Partial | `--base-color-gray-200` instead of `--alias-color-border-default` |
| Motion | N/A | — |

**Color issues:**
- All border colors: `--base-color-gray-200` — should be `--alias-color-border-default`.
- Panel bg: `bg-popover` — shadcn token; should be `--alias-color-background-primary`.
- Input text: `--base-color-gray-900` — should be `--alias-color-text-primary`.
- Input placeholder: `--base-color-gray-400` — should be `--alias-color-text-subtle`.
- Active item: `bg-[var(--base-color-blue-50)]` — **`--base-color-blue-50` does not exist** in tokens 1.2; closest is `--base-color-blue-100` or `--alias-color-background-hover`.
- Active text: `--base-color-blue-800` — should be `--alias-color-text-brand`.
- Icon active: `--base-color-blue-600` — should be `--alias-color-icon-brand`.
- Group label: `--base-color-gray-400` — should be `--alias-color-text-subtle`.
- Empty state icon: `--base-color-gray-300` — should be `--alias-color-icon-disabled`.
- Empty state text: `--base-color-gray-500` — should be `--alias-color-text-subtle`.
- Footer text: `--base-color-gray-400` — should be `--alias-color-text-subtle`.
- `shadow-xl` — should be `shadow-[var(--base-shadow-05)]`.

---

### `context-menu.tsx` ✅ Compliant

| Category | Status | Notes |
|----------|--------|-------|
| Color | ✅ Applied | `--alias-color-background-primary`, `--alias-color-text-primary`, `--alias-color-background-hover`, `--alias-color-text-brand`, `--alias-color-feedback-error-fg`, `--alias-color-border-default`, `--alias-color-text-subtle` — all correct |
| Typography | ⚠️ Partial | `text-xs`, `text-sm` Tailwind |
| Spacing | ⚠️ Partial | `px-2`, `py-1.5` hardcoded |
| Elevation | ✅ Applied | `--base-shadow-04` used |
| Shape | ✅ Applied | `--base-radius-md`, `--base-radius-sm` used |
| Border | ⚠️ Partial | `--base-color-gray-200` used for border instead of `--alias-color-border-default` |
| Motion | ❌ Missing | `duration-100` hardcoded |

**Minor issue:** Border color in `ContextMenuContent` uses `--base-color-gray-200` — should be `--alias-color-border-default`.

---

### `copy-to-clipboard.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | See below |
| Typography | ❌ Missing | `text-xs font-medium` Tailwind |
| Spacing | ❌ Missing | `ml-1`, `size-6/7/8` hardcoded |
| Elevation | N/A | — |
| Shape | ✅ Applied | `--base-radius-sm` used |
| Border | ✅ Applied | `--alias-color-border-active` for focus ring |
| Motion | ❌ Missing | `transition-colors` Tailwind |

**Color issues:**
- Idle state: `--base-color-gray-400`, `--base-color-gray-700`, `--base-color-gray-100` — should be `--alias-color-icon-disabled`/`--alias-color-text-subtle`, `--alias-color-icon-primary`, `--alias-color-background-tertiary`.
- Copied state: `--base-color-green-800` ✅ (exists), but bg `--base-color-success-800` **does not exist** — should be `--semantic-color-success-800` or `--alias-color-feedback-success-bg`.
- Error state: `--base-color-error-300` and `--base-color-error-200` — **do not exist** — should be `--alias-color-feedback-error-fg` and `--alias-color-feedback-error-bg`.

---

### `data-table.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | Good alias token usage overall; a few base-color uses |
| Typography | ❌ Missing | `text-sm`, `text-xs` Tailwind |
| Spacing | ❌ Missing | `px-3`, `py-2.5`, `h-8` hardcoded |
| Elevation | ✅ Applied | `--base-shadow-02` used |
| Shape | ✅ Applied | `--base-radius-md`, `--base-radius-lg` used |
| Border | ✅ Applied | `--alias-color-border-default` used |
| Motion | ❌ Missing | `transition-colors` Tailwind |

**Color issues:**
- Table header row: `bg-[var(--base-color-gray-75)]` — `--base-color-gray-75` exists ✅.
- Row hover: `hover:bg-[var(--base-color-gray-75)]` ✅.
- Selection badge: `bg-[var(--base-color-blue-100)]` ✅ and `text-[var(--base-color-blue-800)]` ✅.
- Selected row highlight: `data-[selected]:bg-[var(--base-color-blue-100)]/60` ✅.
- All good: Most tokens are alias-level ✅.

---

### `date-picker.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | Calendar component well-tokenised; trigger uses base colors |
| Typography | ❌ Missing | `text-sm`, `text-[14px]`, `text-[11px]` hardcoded |
| Spacing | ❌ Missing | `px-2.5`, `h-8`, `p-3` hardcoded |
| Elevation | N/A | Delegated to Popover |
| Shape | ✅ Applied | `--base-radius-md`, `--base-radius-sm` used |
| Border | ⚠️ Partial | See below |
| Motion | ❌ Missing | `transition-colors` Tailwind |

**Color issues:**
- Trigger border: `border-[var(--base-color-gray-300)]` — should be `--component-input-border` or `--alias-color-border-default`.
- Trigger bg: `bg-[var(--base-color-white)]` — should be `--component-input-background`.
- Trigger disabled bg: `bg-[var(--base-color-gray-100)]` — should be `--component-input-background-disabled`.
- Calendar selected day: `bg-[var(--alias-color-background-brand)]` ✅, `text-[var(--alias-color-text-inverse)]` ✅.
- Calendar weekday text: `text-[var(--alias-color-text-disabled)]` ✅.
- Calendar navigation: `--alias-color-icon-secondary` ✅, `--alias-color-background-tertiary` ✅.

---

### `date-range-picker.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | Heavy `--base-color-*` use instead of alias tokens |
| Typography | ❌ Missing | `text-sm`, `text-xs`, `text-[10px]` Tailwind |
| Spacing | ❌ Missing | `px-3`, `h-9`, `p-3` hardcoded |
| Elevation | ✅ Applied | `--base-shadow-05` used |
| Shape | ✅ Applied | `--base-radius-md`, `--base-radius-lg`, `--base-radius-sm` used |
| Border | ⚠️ Partial | `--base-color-gray-200` instead of `--alias-color-border-default` |
| Motion | ❌ Missing | `duration-100` hardcoded |

**Color issues:**
- Trigger border: `--base-color-gray-200` — should be `--alias-color-border-default`.
- Trigger bg: `bg-card` — shadcn token; should be `--alias-color-background-primary`.
- Trigger text colors: `--base-color-gray-900`, `--base-color-gray-400` — should be `--alias-color-text-primary`, `--alias-color-text-subtle`.
- Focus ring: `--base-color-blue-400` — should be `--alias-focus-ring-color` or `--alias-color-border-active`.
- Presets sidebar: `--base-color-gray-200` border — `--alias-color-border-default`.
- Active preset: `bg-[var(--base-color-blue-50)]` — **does not exist**; should be `--alias-color-background-hover`.
- Nav buttons: `--base-color-gray-500`, `--base-color-gray-900`, `--base-color-gray-100` — should be `--alias-color-icon-secondary`, `--alias-color-text-primary`, `--alias-color-background-tertiary`.
- Footer hint: `--base-color-gray-400` — should be `--alias-color-text-subtle`.
- Popover bg: `bg-popover` — shadcn token; should be `--alias-color-background-primary`.

---

### `dialog.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | See below |
| Typography | ❌ Missing | `text-sm`, `font-medium` Tailwind |
| Spacing | ❌ Missing | `p-4`, `gap-4` hardcoded |
| Elevation | ✅ Applied | `--base-shadow-05` used |
| Shape | ✅ Applied | `--base-radius-md` used |
| Border | ⚠️ Partial | See below |
| Motion | ❌ Missing | `duration-100` hardcoded |

**Color issues:**
- Content border: `border border-[var(--base-color-gray-200)]` — should be `--alias-color-border-default`.
- Content bg: `--alias-color-background-primary` ✅.
- `DialogTitle` and `DialogDescription` use `font-heading`/`text-muted-foreground` — shadcn tokens, not in tokens 1.2. DialogDescription should use `--alias-color-text-subtle`.

---

### `dropdown-menu.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | See below |
| Typography | ❌ Missing | `text-xs`, `text-sm` Tailwind |
| Spacing | ❌ Missing | `px-1.5`, `py-1`, `p-1` hardcoded |
| Elevation | ✅ Applied | `--base-shadow-04` used |
| Shape | ✅ Applied | `--base-radius-md` used |
| Border | ⚠️ Partial | `--base-color-gray-200` instead of `--alias-color-border-default` |
| Motion | ❌ Missing | `duration-100` hardcoded |

**Color issues:**
- Content border: `border-[var(--base-color-gray-200)]` — should be `--alias-color-border-default`.
- Content bg: `--alias-color-background-primary` ✅.
- Item focus: `--alias-color-background-hover` ✅, `--alias-color-text-brand` ✅.
- Destructive: `--alias-color-feedback-error-fg` ✅.
- Label, separator use alias tokens ✅.

---

### `empty-state.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ✅ Applied | `--alias-color-icon-secondary`, `--alias-color-text-primary`, `--alias-color-text-tertiary` used via inline styles |
| Typography | ❌ Missing | Font sizes (`14px`, `16px`, `20px`) hardcoded in `sizeConfig`; should use `--alias-typography-*-font-size` tokens. Font weights (`600`) hardcoded; should use `--base-font-weight-semibold`. |
| Spacing | ❌ Missing | `gap-2`, `gap-3`, `gap-4` hardcoded |
| Elevation | N/A | — |
| Shape | N/A | — |
| Border | N/A | — |
| Motion | N/A | — |

**Issues:**
- `headingStyle`: `fontSize: "14px"/"16px"/"20px"` — sm=`--alias-typography-body-text2-font-size`, md=`--alias-typography-subheading1-font-size`, lg=`--alias-typography-subheading2-font-size` approximately.
- `fontWeight: 600` — should be `var(--base-font-weight-semibold)`.

---

### `file-upload.tsx` ✅ Compliant

| Category | Status | Notes |
|----------|--------|-------|
| Color | ✅ Applied | `--alias-color-border-default`, `--alias-color-border-active`, `--alias-color-background-secondary`, `--alias-color-background-tertiary`, `--alias-color-icon-secondary`, `--alias-color-text-primary`, `--alias-color-text-tertiary` all used. Browse button uses `--component-button-secondary-*` tokens ✅ |
| Typography | ❌ Missing | `text-sm`, `text-xs`, `font-medium` Tailwind |
| Spacing | ❌ Missing | `px-6 py-10` hardcoded |
| Elevation | N/A | — |
| Shape | ✅ Applied | `--component-button-secondary-border-radius` used ✅ |
| Border | ✅ Applied | `--alias-color-border-default`, `--alias-color-border-active`, `--component-button-secondary-border` ✅ |
| Motion | ❌ Missing | `transition-colors` Tailwind |

**Note:** `file-upload.tsx` is the only component outside `button.tsx` and `multi-select.tsx` / `number-input.tsx` / `tag-input.tsx` that correctly uses `--component-button-secondary-*` tokens for its internal button. This is best practice.

---

### `form.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | Uses `text-foreground`, `text-destructive`, `text-muted-foreground` — shadcn tokens not in tokens 1.2 |
| Typography | ❌ Missing | `text-sm`, `text-xs` Tailwind |
| Spacing | ❌ Missing | `gap-1`, `gap-4`, `pb-3` hardcoded |
| Elevation | N/A | — |
| Shape | N/A | — |
| Border | ⚠️ Partial | `--base-color-gray-200` used for dividers instead of `--alias-color-border-default` |
| Motion | N/A | — |

**Color issues:**
- `FormLabel`: `text-foreground`, `text-destructive` — should be `--alias-color-text-primary`, `--alias-color-feedback-error-fg`.
- `FormDescription`: `text-muted-foreground` — should be `--alias-color-text-subtle`.
- `FormMessage`: `text-destructive` — should be `--alias-color-feedback-error-fg`.
- `FormSection` divider: `border-[var(--base-color-gray-200)]` — should be `--alias-color-border-default`.
- `FormSection` title: `text-foreground` — should be `--alias-color-text-primary`.
- `FormSection` description: `text-muted-foreground` — should be `--alias-color-text-subtle`.

---

### `input-group.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | Uses `border-input`, `ring-ring`, `bg-input`, `text-muted-foreground` — shadcn tokens not in tokens 1.2 |
| Typography | ❌ Missing | `text-sm font-medium` Tailwind |
| Spacing | ❌ Missing | `py-1.5`, `px-2`, `h-8` hardcoded |
| Elevation | N/A | — |
| Shape | ✅ Applied | `--base-radius-lg`, `--base-radius-xs`, `--base-radius-sm` used |
| Border | ⚠️ Partial | `border-input` is shadcn token; should be `--alias-color-border-default` |
| Motion | ❌ Missing | `transition-colors` Tailwind |

**Color issues:**
- `InputGroup`: `border-input`, `ring-ring`, `bg-input/30`, `has-[[data-slot][aria-invalid=true]]:border-destructive` — all shadcn tokens. Should map to:
  - `border-input` → `--alias-color-border-default`
  - `ring-ring` → `--alias-color-border-active`
  - `bg-input/30` → `--alias-color-background-secondary`/`--alias-color-background-tertiary`
  - `border-destructive` → `--alias-color-border-error`
- `InputGroupAddon`: `text-muted-foreground` → `--alias-color-text-subtle`.

---

### `input.tsx` — See High-Priority section above.

---

### `list.tsx` ✅ Compliant

| Category | Status | Notes |
|----------|--------|-------|
| Color | ✅ Applied | `--alias-color-border-default`, `--alias-color-border-active`, `--base-color-gray-50` (exists ✅), `--base-color-blue-800` for selected |
| Typography | ⚠️ Partial | `text-sm` Tailwind |
| Spacing | ⚠️ Partial | `px-3 py-2.5` hardcoded |
| Elevation | N/A | — |
| Shape | N/A | — |
| Border | ✅ Applied | `--alias-color-border-default` for dividers |
| Motion | ❌ Missing | `transition-colors` Tailwind |

---

### `multi-select.tsx` ✅ Compliant

| Category | Status | Notes |
|----------|--------|-------|
| Color | ✅ Applied | Uses `--component-input-border`, `--component-input-background`, `--component-input-border-focus`, `--component-input-background-disabled`, `--component-input-text-placeholder`, `--alias-color-border-active`, `--alias-color-background-tertiary`, `--alias-color-background-secondary`, `--alias-color-text-secondary`, `--alias-color-text-primary`, `--alias-color-border-default`, `--alias-color-background-primary`, `--alias-color-border-active` — excellent component token usage |
| Typography | ❌ Missing | `text-sm`, `text-xs` Tailwind |
| Spacing | ❌ Missing | `h-8`, `px-2.5` hardcoded |
| Elevation | ✅ Applied | `--base-shadow-02` used |
| Shape | ✅ Applied | `--component-input-border-radius`, `--base-radius-sm`, `--base-radius-md` used |
| Border | ✅ Applied | Component input border tokens ✅ |
| Motion | ❌ Missing | `transition-colors` Tailwind |

**Note:** `multi-select.tsx` is a model example of correct component token usage.

---

### `number-input.tsx` ✅ Compliant (Color)

| Category | Status | Notes |
|----------|--------|-------|
| Color | ✅ Applied | Uses `--component-input-border`, `--component-input-background`, `--component-input-border-focus`, `--component-input-background-disabled`, `--alias-color-icon-primary`, `--alias-color-background-secondary`, `--alias-color-icon-disabled` |
| Typography | ❌ Missing | `text-sm` Tailwind |
| Spacing | ❌ Missing | `h-9 w-9` hardcoded |
| Elevation | N/A | — |
| Shape | ✅ Applied | `--component-input-border-radius` used |
| Border | ✅ Applied | `--component-input-border` used |
| Motion | ❌ Missing | `transition-colors` Tailwind |

---

### `pagination.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ✅ Applied | `--alias-color-text-subtle`, `--alias-color-border-default`, `--alias-color-background-primary`, `--alias-color-border-active`, `--alias-color-text-primary` — all alias tokens ✅ |
| Typography | ❌ Missing | `text-xs`, `text-sm` Tailwind |
| Spacing | ❌ Missing | `h-7`, `px-2` hardcoded |
| Elevation | N/A | — |
| Shape | ✅ Applied | `--base-radius-md` used |
| Border | ✅ Applied | Alias tokens used |
| Motion | N/A | — |

---

### `popover.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | See below |
| Typography | ❌ Missing | `text-sm` Tailwind |
| Spacing | ❌ Missing | `p-3`, `gap-2.5` hardcoded |
| Elevation | ✅ Applied | `--base-shadow-04` used |
| Shape | ✅ Applied | `--base-radius-md` used |
| Border | ⚠️ Partial | `--base-color-gray-200` instead of `--alias-color-border-default` |
| Motion | ❌ Missing | `duration-100` hardcoded |

**Color issues:**
- Border: `border-[var(--base-color-gray-200)]` — should be `--alias-color-border-default`.
- Background and text: `--alias-color-background-primary` ✅, `--alias-color-text-primary` ✅.
- `PopoverDescription`: `--alias-color-text-subtle` ✅.

---

### `progress.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ✅ Applied | `--alias-color-background-tertiary` for track ✅, `--alias-color-background-brand` for indicator ✅ |
| Typography | N/A | — |
| Spacing | ❌ Missing | `h-1` hardcoded |
| Elevation | N/A | — |
| Shape | ⚠️ Partial | `rounded-full` used — acceptable for progress bar |
| Border | N/A | — |
| Motion | ❌ Missing | `transition-all` Tailwind |

---

### `radio-group.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | See below |
| Typography | ❌ Missing | `text-sm`, `text-xs`, `font-medium` Tailwind |
| Spacing | ❌ Missing | `gap-2`, `gap-0.5` hardcoded |
| Elevation | N/A | — |
| Shape | ⚠️ Partial | `rounded-full` appropriate for radio; but `rounded-[4px]` elsewhere should be `--base-radius-sm` |
| Border | ⚠️ Partial | See below |
| Motion | ❌ Missing | `transition-colors` Tailwind |

**Color issues:**
- Item border: `border-[var(--base-color-gray-300)]` — should be `--alias-color-border-default`.
- Item bg: `bg-[var(--base-color-white)]` — should be `--alias-color-background-primary`.
- Item hover: `hover:border-[var(--base-color-blue-800)]` — should be `--alias-color-border-active`.
- Item checked: `data-[state=checked]:border-[var(--base-color-blue-800)]` and `bg-[var(--base-color-blue-800)]` — should be `--alias-color-border-brand` / `--alias-color-background-brand`.
- Focus ring: `--alias-color-border-active` ✅.
- Labels: `--alias-color-text-primary` ✅, `--alias-color-text-subtle` ✅, `--alias-color-feedback-error-fg` ✅.

---

### `scroll-area.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | Scrollbar thumb uses `bg-border` — shadcn token |
| Typography | N/A | — |
| Spacing | N/A | — |
| Elevation | N/A | — |
| Shape | ⚠️ Partial | `rounded-full` for thumb is appropriate |
| Border | ⚠️ Partial | `border-t-transparent`, `border-l-transparent` — acceptable |
| Motion | ❌ Missing | `transition-colors` Tailwind |

**Color issues:**
- `ScrollAreaThumb`: `bg-border` — shadcn token; should be `--alias-color-border-default`.
- Focus ring: `focus-visible:ring-ring/50` — shadcn token; should be `--alias-color-border-active`.

---

### `segmented-control.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | See below |
| Typography | ❌ Missing | `text-xs`, `text-sm` Tailwind |
| Spacing | ❌ Missing | `h-7`, `px-2.5`, `p-0.5` hardcoded |
| Elevation | N/A | — |
| Shape | ✅ Applied | `--base-radius-md` used |
| Border | N/A | — |
| Motion | ❌ Missing | `transition-all duration-150` hardcoded |

**Color issues:**
- Container bg: `bg-[var(--base-color-gray-100)]` — `--base-color-gray-100` = `--alias-color-background-tertiary`; should prefer alias token.
- Selected: `bg-[var(--alias-color-background-primary)]` ✅ and `text-[var(--base-color-gray-900)]` — should be `--alias-color-text-primary`.
- Unselected: `text-[var(--base-color-gray-500)]` — should be `--alias-color-text-subtle`.
- Unselected hover: `text-[var(--base-color-gray-700)]` — should be `--alias-color-text-secondary`.
- Focus ring: `--alias-color-border-active` ✅.

---

### `select.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | See below |
| Typography | ❌ Missing | `text-sm` Tailwind |
| Spacing | ❌ Missing | `h-8`, `py-2`, `px-2.5` hardcoded |
| Elevation | N/A | Delegated to `ring` |
| Shape | ✅ Applied | `--base-radius-md`, `--base-radius-lg` used |
| Border | ✅ Applied | `--alias-color-border-default`, `--alias-color-border-active`, `--alias-color-border-error` used |
| Motion | ❌ Missing | `transition-colors` Tailwind |

**Color issues:**
- `SelectContent`: `ring-1 ring-[var(--alias-color-text-primary)]/10` — uses opacity modifier on a non-rgba token; acceptable.
- `SelectContent`: bg `--alias-color-background-primary` ✅, text `--alias-color-text-primary` ✅.
- `SelectField` success state: `border-[var(--base-color-success-900)]`, `ring-[var(--base-color-success-800)]` — **non-existent tokens**; should use `--alias-color-border-success` / `--alias-color-feedback-success-border`.
- Success text: `text-[var(--base-color-green-800)]` → `--alias-color-feedback-success-fg`.
- `SelectLabel`, `SelectItem` checked, `SelectSeparator` use alias tokens ✅.

---

### `separator.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | Uses `bg-border` — shadcn token |
| Typography | N/A | — |
| Spacing | N/A | — |
| Elevation | N/A | — |
| Shape | N/A | — |
| Border | ⚠️ Partial | `bg-border` — shadcn; should be `--alias-color-border-default` |
| Motion | N/A | — |

**Fix:** `bg-border` → `bg-[var(--alias-color-border-default)]`.

---

### `sheet.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | See below |
| Typography | ❌ Missing | `text-sm` Tailwind |
| Spacing | ❌ Missing | `gap-4`, `p-6` hardcoded |
| Elevation | ⚠️ Partial | `shadow-lg` Tailwind instead of `--base-shadow-04`/`05` |
| Shape | N/A | — |
| Border | ⚠️ Partial | `border-t`, `border-b`, `border-l`, `border-r` without explicit color token |
| Motion | ❌ Missing | `transition duration-200 ease-in-out` hardcoded |

**Color issues:**
- `SheetContent` bg: `bg-popover` — shadcn token; should be `--alias-color-background-primary`.
- `SheetContent` text: `text-popover-foreground` — shadcn token; should be `--alias-color-text-primary`.
- `SheetHeader` title uses `font-heading` — shadcn, not tokens 1.2.
- No explicit token for border color on the sheet edges.
- `shadow-lg` → `shadow-[var(--base-shadow-04)]`.

---

### `sidebar-nav.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | Uses `--base-color-*` extensively where alias tokens exist |
| Typography | ❌ Missing | `text-sm`, `text-[10px]`, `font-medium` Tailwind |
| Spacing | ❌ Missing | `px-2`, `h-8`, `py-3` hardcoded |
| Elevation | N/A | — |
| Shape | ✅ Applied | `--base-radius-md` used |
| Border | ⚠️ Partial | `--base-color-gray-200` instead of `--alias-color-border-default` |
| Motion | ❌ Missing | `transition-all duration-200` hardcoded |

**Color issues:**
- Sidebar bg: `bg-[var(--base-color-gray-75)]` — `--base-color-gray-75` exists ✅ but `--alias-color-background-secondary` (`#f5f5f3` = gray-75) is preferred.
- Border: `border-[var(--base-color-gray-200)]` — should be `--alias-color-border-default`.
- Section label: `--alias-color-text-subtle` ✅.
- Nav item default text: `--base-color-gray-700` — should be `--alias-color-text-secondary`.
- Nav item hover bg: `--base-color-gray-200` — should be `--alias-color-background-tertiary`.
- Nav item hover text: `--alias-color-text-primary` ✅.
- Nav item active bg: `--base-color-blue-100` — should be `--alias-color-background-hover`.
- Nav item active text: `--base-color-blue-800` — should be `--alias-color-text-brand`.

---

### `skeleton.tsx` ✅ Compliant

| Category | Status | Notes |
|----------|--------|-------|
| Color | ✅ Applied | `--alias-color-background-tertiary` used correctly |
| Typography | N/A | — |
| Spacing | N/A | — |
| Elevation | N/A | — |
| Shape | ✅ Applied | `--base-radius-md` used |
| Border | N/A | — |
| Motion | ⚠️ Partial | `animate-pulse` Tailwind utility (acceptable as no motion token covers CSS animation keyframes) |

---

### `slider.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | `--base-color-*` used directly where alias tokens exist |
| Typography | ❌ Missing | `text-sm` Tailwind |
| Spacing | ❌ Missing | `h-1.5`, `size-4` hardcoded |
| Elevation | N/A | — |
| Shape | ⚠️ Partial | `rounded-full` appropriate for slider; `--base-radius-sm` for scrollbar-like edges |
| Border | ⚠️ Partial | See below |
| Motion | ❌ Missing | `transition-colors` Tailwind |

**Color issues:**
- Track bg: `bg-[var(--base-color-gray-200)]` — should be `--alias-color-background-tertiary` or `--alias-color-border-default`.
- Range fill: `bg-[var(--base-color-blue-800)]` — should be `--alias-color-background-brand`.
- Thumb border: `border-[var(--base-color-blue-800)]` — should be `--alias-color-border-brand`.
- Thumb bg: `bg-[var(--base-color-white)]` — should be `--alias-color-background-primary`.
- Thumb hover: `hover:border-[var(--base-color-blue-700)]` — should be `--component-button-primary-background-hover` or `--alias-color-border-active`.
- Focus ring: `--alias-color-border-active` ✅.
- Label: `--alias-color-text-primary` ✅, `--alias-color-text-subtle` ✅.

---

### `sonner.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | See below |
| Typography | ❌ Missing | `--font-sans` used instead of `--base-font-family-primary` |
| Spacing | N/A | Delegated to sonner library |
| Elevation | N/A | — |
| Shape | ✅ Applied | `--base-radius-md` used for `--border-radius` |
| Border | ⚠️ Partial | `--normal-border` uses `--base-color-gray-200` instead of `--alias-color-border-default` |
| Motion | N/A | Delegated to sonner library |

**Color issues:**
- `--normal-bg`: `--base-color-white` — should be `--alias-color-background-primary`.
- `--normal-text`: `--base-color-gray-900` — should be `--alias-color-text-primary`.
- `--normal-border`: `--base-color-gray-200` — should be `--alias-color-border-default`.
- `--font-family`: `--font-sans` — Next.js CSS var, not a design token. Should be `--base-font-family-primary`.
- Success/error/warning/info icon colours: not set via tokens — sonner library defaults apply.

---

### `spinner.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | Uses `--base-color-*` directly |
| Typography | N/A | — |
| Spacing | N/A | — |
| Elevation | N/A | — |
| Shape | N/A | — |
| Border | N/A | — |
| Motion | ❌ Missing | Hardcoded `animation: spinner-spin 0.75s linear infinite` — should use `--base-duration-*` and `--base-easing-linear` tokens |

**Color issues:**
- `default` track: `--base-color-gray-200` — should be `--alias-color-border-default`.
- `default` arc: `--base-color-gray-400` — should be `--alias-color-icon-secondary`.
- `brand` track + arc: `--base-color-blue-800` — should be `--alias-color-background-brand`.
- Animation duration `0.75s` — not in token system (closest: `--base-duration-slower: 500ms`). Acceptable as-is if added to tokens.

---

### `stepper.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ✅ Applied | `--alias-color-background-brand`, `--alias-color-text-inverse`, `--alias-color-border-active`, `--alias-color-background-primary`, `--alias-color-text-brand`, `--alias-color-border-default`, `--alias-color-background-secondary`, `--alias-color-text-disabled`, `--alias-color-text-primary`, `--alias-color-text-subtle` — all alias tokens ✅ |
| Typography | ❌ Missing | `text-sm`, `text-xs`, `font-semibold`, `font-medium` Tailwind |
| Spacing | ❌ Missing | `h-8 w-8`, `px-2` hardcoded |
| Elevation | N/A | — |
| Shape | ✅ Applied | `rounded-full` for step circles; `--alias-color-border-active` for connector |
| Border | ✅ Applied | `--alias-color-border-active`, `--alias-color-border-default` used |
| Motion | ❌ Missing | `transition-all` Tailwind |

---

### `switch.tsx` ✅ Compliant

| Category | Status | Notes |
|----------|--------|-------|
| Color | ✅ Applied | `--alias-color-border-active`, `--alias-color-border-error`, `--alias-color-feedback-error-fg`, `--alias-color-background-brand`, `--alias-color-border-default`, `--alias-color-background-secondary`, `--alias-color-text-inverse`, `--alias-color-text-primary` — all alias tokens ✅ |
| Typography | N/A | — |
| Spacing | N/A | — |
| Elevation | N/A | — |
| Shape | ✅ Applied | `rounded-full` appropriate for switch |
| Border | ✅ Applied | `--alias-color-border-active` for focus ring |
| Motion | ❌ Missing | `transition-all`, `transition-transform` Tailwind |

---

### `system-banner.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | See below |
| Typography | ❌ Missing | `text-sm` Tailwind |
| Spacing | ❌ Missing | `px-6 py-3` hardcoded |
| Elevation | N/A | — |
| Shape | N/A | — |
| Border | N/A | — |
| Motion | ❌ Missing | `transition-opacity` Tailwind |

**Color issues:**
- `info` bg/fg: `--alias-color-feedback-info-bg` ✅, `--alias-color-feedback-info-fg` ✅.
- `warning` bg: `--alias-color-feedback-warning-bg` ✅, but fg uses `--base-color-gray-900` instead of `--alias-color-feedback-warning-fg`.
- `error` bg/fg: `--alias-color-feedback-error-bg` ✅, `--alias-color-feedback-error-fg` ✅.
- `success` bg/fg: `--alias-color-feedback-success-bg` ✅, `--alias-color-feedback-success-fg` ✅.

---

### `table.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ✅ Applied | `--alias-color-background-tertiary`, `--alias-color-text-primary`, `--alias-color-text-subtle` — all alias tokens ✅ |
| Typography | ❌ Missing | `text-sm`, `font-medium` Tailwind |
| Spacing | ❌ Missing | `h-10`, `px-2`, `p-2` hardcoded |
| Elevation | N/A | — |
| Shape | N/A | — |
| Border | ⚠️ Partial | `border-b` without explicit color token; `[&_tr]:border-b` inherits |
| Motion | ❌ Missing | `transition-colors` Tailwind |

---

### `tabs.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ✅ Applied | `--alias-color-background-tertiary`, `--alias-color-text-subtle`, `--alias-color-text-primary`, `--alias-color-border-active`, `--alias-color-background-secondary`, `--alias-color-border-default` — all alias tokens ✅ |
| Typography | ❌ Missing | `text-sm font-medium` Tailwind |
| Spacing | ❌ Missing | `h-8`, `px-1.5`, `py-0.5` hardcoded |
| Elevation | N/A | — |
| Shape | ✅ Applied | `--base-radius-lg`, `--base-radius-md` used |
| Border | ✅ Applied | `--alias-color-border-active`, `--alias-color-border-default` used |
| Motion | ❌ Missing | `transition-all` Tailwind |

---

### `tag-input.tsx` ✅ Compliant (Color)

| Category | Status | Notes |
|----------|--------|-------|
| Color | ✅ Applied | `--component-input-border-radius`, `--component-input-border`, `--component-input-background`, `--component-input-border-focus`, `--alias-color-border-active`, `--component-input-background-disabled`, `--alias-color-background-tertiary`, `--alias-color-text-secondary`, `--alias-color-text-tertiary`, `--alias-color-text-primary` — excellent token usage |
| Typography | ❌ Missing | `text-sm`, `text-xs` Tailwind |
| Spacing | ❌ Missing | `px-2.5 py-1`, `min-h-8` hardcoded |
| Elevation | N/A | — |
| Shape | ✅ Applied | `--component-input-border-radius` + `rounded-full` for tags |
| Border | ✅ Applied | `--component-input-border`, `--component-input-border-focus` |
| Motion | ❌ Missing | `transition-colors` Tailwind |

---

### `textarea.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | See below |
| Typography | ❌ Missing | `text-sm` Tailwind |
| Spacing | ❌ Missing | `px-2.5 py-2` hardcoded |
| Elevation | N/A | — |
| Shape | ✅ Applied | `--base-radius-md` used |
| Border | ⚠️ Partial | See below |
| Motion | ❌ Missing | `transition-colors` Tailwind |

**Color issues (same as `input.tsx`):**
- `border-[var(--base-color-gray-300)]` — should be `--component-input-border`.
- `bg-[var(--base-color-white)]` — should be `--component-input-background`.
- `disabled:bg-[var(--base-color-gray-100)]` — should be `--component-input-background-disabled`.
- `read-only:bg-[var(--base-color-gray-100)]` — should be `--component-input-background-disabled` or `--alias-color-background-tertiary`.
- Success state: `--base-color-success-900`/`--base-color-success-800` — **non-existent tokens**.
- Success text: `--base-color-green-800` → `--alias-color-feedback-success-fg`.

---

### `time-picker.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | See below |
| Typography | ❌ Missing | `text-sm`, `text-xs`, `font-medium` Tailwind |
| Spacing | ❌ Missing | `h-9`, `px-3`, `p-2` hardcoded |
| Elevation | ✅ Applied | `--base-shadow-04` used |
| Shape | ✅ Applied | `--base-radius-md`, `--base-radius-sm` used |
| Border | ⚠️ Partial | `--base-color-gray-300`/`400` instead of alias tokens |
| Motion | ❌ Missing | `duration-100` hardcoded |

**Color issues:**
- Trigger border: `--base-color-gray-300` — should be `--component-input-border`.
- Trigger bg: `--alias-color-background-primary` ✅.
- Trigger hover border: `--base-color-gray-400` — no alias; use `--alias-color-border-active` on interaction.
- Focus ring: `--base-color-blue-500` — should be `--alias-color-border-active`.
- Selected button bg: `bg-[var(--base-color-blue-800)]` — should be `--alias-color-background-brand`.
- Selected button text: `text-white` — should be `--alias-color-text-inverse`.
- Content bg: `bg-card` — shadcn token; should be `--alias-color-background-primary`.
- Content text: `text-card-foreground` — shadcn token; should be `--alias-color-text-primary`.
- Hover: `hover:bg-accent` — shadcn token; should be `--alias-color-background-tertiary`.
- Separator/labels: `text-muted-foreground` — shadcn token; should be `--alias-color-text-subtle`.
- Border: `--base-color-gray-200` — should be `--alias-color-border-default`.

---

### `timeline.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ⚠️ Partial | See below |
| Typography | ❌ Missing | `text-sm`, `text-xs`, `font-medium` Tailwind |
| Spacing | ❌ Missing | `pb-6`, `gap-4` hardcoded |
| Elevation | N/A | — |
| Shape | ✅ Applied | `rounded-full` for icon circles |
| Border | N/A | — |
| Motion | N/A | — |

**Color issues:**
- `default` variant: `bg-[var(--base-color-gray-200)]` ✅ (exists), `text-[var(--base-color-gray-600)]` — should be `--alias-color-text-subtle` or `--alias-color-icon-secondary`.
- `success`, `error`, `warning` variants: use `--alias-color-feedback-*-bg/fg` ✅ correctly.
- `info` variant: `bg-[var(--base-color-blue-100)]` ✅ (exists), `text-[var(--base-color-blue-800)]` — should be `--alias-color-text-brand` or `--alias-color-feedback-info-fg`.
- Connector line: `bg-[var(--base-color-gray-200)]` — should be `--alias-color-border-default`.

---

### `tooltip.tsx` ⚠️ Partial

| Category | Status | Notes |
|----------|--------|-------|
| Color | ✅ Applied | `--alias-color-text-primary` for bg ✅, `--alias-color-background-secondary` for text ✅ — inverted pill tooltip pattern |
| Typography | ❌ Missing | `text-xs` Tailwind |
| Spacing | ❌ Missing | `px-3 py-1.5` hardcoded |
| Elevation | N/A | — |
| Shape | ✅ Applied | `--base-radius-md` used |
| Border | N/A | — |
| Motion | ❌ Missing | `duration-100`/`zoom-in-95` Tailwind |

---

### `tree-view.tsx` ✅ Compliant

| Category | Status | Notes |
|----------|--------|-------|
| Color | ✅ Applied | `--alias-color-background-hover` ✅ for hover; selected uses `color-mix(in_srgb, var(--base-color-blue-800) 10%, transparent)` (acceptable CSS pattern using a valid token); `--base-color-blue-900` for selected text (exists ✅); `--alias-color-text-subtle` ✅; `--base-color-gray-200` for badge bg; `--base-color-blue-500` for focus ring (should be `--alias-color-border-active`) |
| Typography | ❌ Missing | `text-sm` Tailwind |
| Spacing | ❌ Missing | `px-1 py-1` hardcoded |
| Elevation | N/A | — |
| Shape | ✅ Applied | `--base-radius-sm` used |
| Border | N/A | — |
| Motion | ❌ Missing | `transition-transform duration-150` hardcoded |

**Minor issue:** Focus ring uses `--base-color-blue-500` — should be `--alias-color-border-active` (maps to `--base-color-blue-600`).

---

## Cross-Cutting Issues Summary

### 1. Non-Existent Tokens (Critical — will produce no style)

The following tokens are referenced across components but **do not exist in tokens 1.2**:

| Used Token | Correct Token | Affected Components |
|------------|---------------|---------------------|
| `--base-color-error-200` | `--semantic-color-error-200` | button, copy-to-clipboard, card (MetricCard) |
| `--base-color-error-300` | `--semantic-color-error-300` or `--alias-color-feedback-error-fg` | button, badge, copy-to-clipboard, card (MetricCard) |
| `--base-color-success-800` | `--semantic-color-success-800` | badge, copy-to-clipboard |
| `--base-color-success-900` | `--semantic-color-success-900` | input, textarea, select |
| `--base-color-success-800` (ring) | `--alias-color-feedback-success-border` | input, textarea, select |
| `--base-color-warning-50` | `--semantic-color-warning-100` (closest) | badge, card (MetricCard) |
| `--base-color-warning-100` | `--semantic-color-warning-200` | badge dotColor |
| `--base-color-info-600` | `--semantic-color-info-600` or `--component-badge-info-background` | badge |
| `--base-color-info-700` | `--semantic-color-info-700` or `--component-badge-info-text` | badge dotColor |
| `--base-color-blue-50` | `--base-color-blue-100` (closest) or `--alias-color-background-hover` | command-palette, date-range-picker |

### 2. Shadcn Tokens Used Instead of Tokens 1.2

The following Tailwind/shadcn CSS vars are used in multiple components but are **not in tokens 1.2**:

| Shadcn Token | Tokens 1.2 Equivalent | Affected Components |
|-------------|----------------------|---------------------|
| `bg-card` | `--alias-color-background-primary` | app-header, command, date-range-picker, sheet, time-picker |
| `text-card-foreground` | `--alias-color-text-primary` | command, time-picker |
| `bg-popover` | `--alias-color-background-primary` | sheet, time-picker |
| `text-popover-foreground` | `--alias-color-text-primary` | sheet |
| `text-muted-foreground` | `--alias-color-text-subtle` | alert-dialog, command, form, input-group, time-picker |
| `text-foreground` | `--alias-color-text-primary` | alert-dialog, command |
| `text-destructive` | `--alias-color-feedback-error-fg` | form |
| `bg-border` | `--alias-color-border-default` | scroll-area, separator |
| `border-input` | `--alias-color-border-default` | input-group |
| `ring-ring` | `--alias-color-border-active` | input-group, scroll-area |
| `bg-accent` | `--alias-color-background-tertiary` | time-picker |
| `hover:bg-accent` | `hover:bg-[var(--alias-color-background-tertiary)]` | time-picker |
| `--font-sans` | `--base-font-family-primary` | sonner |
| `font-heading` | `--alias-typography-heading*-font-family` | card, alert-dialog, dialog |
| `bg-input/30` | `--alias-color-background-secondary` | input-group |
| `ring-foreground/10` | `ring-[var(--alias-color-text-primary)]/10` | alert-dialog |

### 3. Typography — Universal Gap

**Every component** uses Tailwind typography utilities (`text-sm`, `text-xs`, `text-base`, `font-medium`, `font-semibold`) instead of `--alias-typography-*` tokens. The token system defines:

| Usage | Current | Should be |
|-------|---------|-----------|
| Body text | `text-sm` | `--alias-typography-body-text2-font-size` (`0.875rem`) |
| Small/caption | `text-xs` | `--alias-typography-body-text3-font-size` or `--alias-typography-caption1-font-size` |
| Base text | `text-base` | `--alias-typography-body-text1-font-size` (`1rem`) |
| Medium weight | `font-medium` | `--alias-typography-button-font-weight` or `--base-font-weight-medium` |
| Semibold | `font-semibold` | `--base-font-weight-semibold` |

### 4. Spacing — Universal Gap

**Every component** uses Tailwind spacing utilities instead of `--alias-spacing-*` or `--component-*-padding-*` tokens. Priority fixes:

| Component | Token available |
|-----------|----------------|
| button | `--component-button-primary-padding-x/y` |
| input | `--component-input-padding-x/y` |
| card | `--component-card-padding` |

### 5. Motion — Universal Gap

**Every component** uses Tailwind `transition-*` classes and hardcoded durations instead of `--alias-motion-transition-*` tokens. Universal fix pattern:

```css
/* Replace Tailwind transition-colors with: */
transition-[background-color,color,border-color]
duration-[var(--base-duration-normal)]
[transition-timing-function:var(--base-easing-ease-out)]
/* Or shorthand via CSS custom property: */
/* transition: var(--alias-motion-transition-normal) */
```

### 6. Component Tokens — Bypass Summary

| Component Token Group | Used? | Components bypassing |
|----------------------|-------|---------------------|
| `--component-button-primary-*` | Partially (bg only in some) | button, all button users |
| `--component-button-secondary-*` | ✅ file-upload | button (partially) |
| `--component-button-ghost-*` | ✅ multi-select, number-input, tag-input | button |
| `--component-button-destructive-*` | ❌ Not used anywhere | button |
| `--component-input-*` | ✅ multi-select, number-input, tag-input | input, combobox, radio-group, date-picker, date-range-picker, textarea |
| `--component-card-*` | ❌ Not used anywhere | card |
| `--component-badge-success/info/error/warning-*` | ❌ Not used anywhere | badge |

---

## Recommended Priority Fixes

**P0 — Broken (non-existent token references):**
1. `badge.tsx` — Replace all `--base-color-success-*`, `--base-color-info-*`, `--base-color-warning-*`, `--base-color-error-*` with `--component-badge-*` tokens
2. `button.tsx` destructive variant — Replace `--base-color-error-200/300` with `--component-button-destructive-*` tokens
3. `input.tsx` / `textarea.tsx` / `select.tsx` success state — Replace `--base-color-success-900/800` with `--alias-color-border-success` / `--alias-color-feedback-success-border`
4. `card.tsx` MetricCard — Replace `--base-color-success-*`, `--base-color-warning-*`, `--base-color-error-*` with `--semantic-color-*` equivalents
5. `copy-to-clipboard.tsx` — Replace `--base-color-success-800`, `--base-color-error-200/300`
6. `command-palette.tsx` / `date-range-picker.tsx` — Replace `--base-color-blue-50` (non-existent)

**P1 — Component token adoption (design consistency):**
1. `card.tsx` — Adopt all `--component-card-*` tokens
2. `badge.tsx` — Adopt all `--component-badge-*` tokens for semantic variants
3. `button.tsx` — Adopt `--component-button-*` tokens for all variants
4. `input.tsx` / `textarea.tsx` / `combobox.tsx` — Adopt `--component-input-*` tokens

**P2 — Shadcn token replacement (correctness):**
1. Replace all `bg-card`, `bg-popover`, `text-foreground`, `text-muted-foreground`, `bg-border`, `border-input` etc. with tokens 1.2 equivalents across: `form`, `command`, `sheet`, `time-picker`, `input-group`, `scroll-area`, `separator`, `app-header`, `date-range-picker`, `alert-dialog`, `dialog`

**P3 — Base-to-alias promotion (semantic correctness):**
1. `app-header.tsx`, `sidebar-nav.tsx`, `command-palette.tsx`, `date-range-picker.tsx`, `slider.tsx`, `segmented-control.tsx` — Replace direct `--base-color-*` uses with corresponding `--alias-color-*` tokens

**P4 — Typography / Spacing / Motion (systematic):**
- Adopt `--alias-typography-*` tokens to replace Tailwind text/font utilities (all components)
- Adopt `--alias-spacing-*` and `--component-*-padding-*` tokens (all components)
- Adopt `--alias-motion-transition-*` tokens to replace `transition-*` Tailwind classes (all components)
