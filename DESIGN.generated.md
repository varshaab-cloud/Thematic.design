# DESIGN.md — Thematic.design (generated first pass)

> Auto-extracted from `src/stories/*.mdx` (guidance) and `src/styles/tokens.json` (tokens) in the Thematic.design repo. **All wording is yours, lifted verbatim.** This is a first pass for human review — verify, then merge into the master DESIGN.md. `avoid_when` and edge guidance that were written inline in prose are preserved under each entry; restructure into explicit fields where useful.

> Coverage: **48 components** across **8 families** · **959 tokens** total.


---


## Forms and input


### Button

- **source:** `Button.mdx` · `Button.stories.tsx`
- **component tokens:** ~43 (`--component-button-*`)
- **intent:** A button triggers an action or event. Use buttons to let users know what will happen next, and choose a variant that matches the weight of the action.
- **variants:**
    - `Primary (default)` — Use a primary button for the most important action on a page or within a section — typically a form submission or the single key call to action.
    - `Secondary` — Use a secondary button alongside a primary button when a supporting action is needed. It carries less visual weight than primary, making the hierarchy clear at a glance.
    - `Outline` — Use an outline button for actions that are important but should not compete with a primary button. Common in toolbars, filter panels, and card footers where a lower-emphasis bordered style reads clearly against a white or subtle background.
    - `Ghost` — Use a ghost button in spaces where context already signals interactivity — toolbars, inline action menus, or groups of sibling buttons. Avoid using ghost buttons in isolation because they are not as obviously clickable as outlined or filled styles.
    - `Destructive` — Use a destructive button for irreversible or high-risk actions such as deleting data or revoking access. Pair it with a confirmation dialog to prevent accidental triggers.
    - `Link` — Use a link button when an action navigates the user somewhere and inline text styling is preferred. It behaves like a button semantically but looks like a hyperlink.
    - `With leading icon` — Reinforces the label with a visual cue. Use for common actions (send, download, create) where the icon improves scannability.
    - `With trailing icon` — Signals navigation or progression (e.g. a right-arrow on a "Continue" button). Use sparingly so it doesn't compete with the label.
    - `Icon only` — Use when space is very constrained and the icon is universally understood. Always include an `aria-label` for screen-reader accessibility.
- **states:**
    - `Default` — The resting, interactive state. The button is ready to receive focus and click events.
    - `Disabled` — Prevents interaction and signals that the action is not currently available. Always pair a disabled button with context explaining why — either nearby helper text or a tooltip.
    - `Loading` — Replaces the label with a spinner to communicate that an async operation is in progress. Use this to prevent double submissions and reassure users that their action was received.
- **sizes:**
    - `xs` — Use in dense UIs like table rows, inline chips, or compact toolbars.
    - `sm` — Use in sidebars, filter panels, or alongside small form inputs.
    - `Default` — The standard size. Use in most dialogs, forms, and page-level actions.
    - `lg` — Use for prominent hero or onboarding calls to action that need extra visual weight.
- **full width:**
    - Stretches the button to fill its container. Use in mobile layouts, card footers, or any context where a full-bleed action feels natural.
- **button group:**
    - Combines multiple outline buttons into a connected control (e.g. a segmented filter or view toggle). Remove the shared border and border-radius on inner buttons so they read as a single unit.
- **accessibility:**
    - **Icon-only buttons** — always pass an `aria-label` that describes the action (e.g. `aria-label="Close dialog"`). The `<span className="sr-only">` pattern inside the component also satisfies this; pick one approach and be consistent.
    - **Loading state** — when `isLoading` is `true`, add `aria-busy="true"` and `aria-label="Saving…"` (or similar) so screen readers announce the in-progress state rather than reading a spinner icon.
    - **Disabled buttons** — the native `disabled` attribute removes the button from the tab order. If you need a disabled button to remain focusable (so a tooltip can explain why), use `aria-disabled="true"` instead and suppress the click handler manually.
    - **Destructive actions** — pair the destructive button with a confirmation dialog so keyboard-only and screen-reader users have the same safety gate as pointer users.
    - The Button renders a native `<button>` element, which gives it keyboard focus, `Enter`/`Space` activation, and the correct implicit `role="button"` for free.

### Checkbox

- **source:** `Checkbox.mdx` · `Checkbox.stories.tsx`
- **component tokens:** ~9 (`--component-checkbox-*`)
- **intent:** A checkbox lets users select or deselect a single option independently. Use checkboxes in forms, settings, and list selections where multiple items can be chosen simultaneously.
- **states:**
    - `Default (unchecked)` — The resting, unselected state. The checkbox is ready for interaction.
    - `Checked` — The user has selected this option. The check icon confirms the selection visually.
    - `Disabled` — The checkbox cannot be interacted with. Use when an option is unavailable in the current context. If the option is checked and disabled, it shows a confirmed but locked selection — for example, a required permission that cannot be removed.
    - `Checked + disabled` — Represents a selection that is confirmed but cannot be changed — for example, an always-on feature or a plan constraint.
- **with label:**
    - Always associate a visible text label with a checkbox using a `<label>` element. The label extends the click target, improves accessibility, and explains what the user is agreeing to or selecting.
- **accessibility:**
    - `aria-checked` is managed automatically — `"true"`, `"false"`, or `"mixed"` for indeterminate state.
    - `aria-disabled` is applied when the `disabled` prop is set.
    - `aria-required` is applied when the `required` prop is set.
    - **Always pair with a label** — use a visible `<label>` element linked via `htmlFor` / `id`. This extends the click target and allows screen readers to announce the label text alongside the checkbox state.
    - **Indeterminate state** — use `checked="indeterminate"` for "select all" controls where only some children are selected. Screen readers will announce it as partially checked.
    - **Group context** — when multiple checkboxes relate to a single question, wrap them in a `<fieldset>` with a `<legend>` so the group label is announced alongside each option.
    - Checkbox is built on Radix UI's `CheckboxPrimitive`, which renders a `<button role="checkbox">` with full ARIA state management.

### Combobox

- **source:** `Combobox.mdx` · `Combobox.stories.tsx`
- **component tokens:** ~14 (`--component-combobox-*`)
- **intent:** A combobox combines a trigger button with a searchable dropdown list. Use it when users need to pick one option from a long list — typically more than ten items — and filtering by typing speeds up selection. For shorter, static lists where scanning is fast, use a [Select](/docs/forms-and-input-select--docs) instead.
- **states:**
    - `Default` — The resting state. The trigger shows the placeholder text until a value is chosen.
    - `Filled` — A value has been selected. A clear button (×) appears alongside the chevron so users can remove the selection without reopening the dropdown.
    - `Error` — Shown when validation fails — for example, when a required field has no selection on form submit. The error message appears in red below the trigger.
    - `Disabled` — The combobox cannot be opened. Always pair with helper text explaining why the field is unavailable and how to resolve it ("Contact admin to change.").
- **with descriptions:**
    - Options can carry a secondary description line — useful when the label alone is ambiguous. Common uses: timezone offsets below a city name, a department below a person's name, or a plan feature summary below a plan tier name. Keep descriptions short (under 40 characters) so they don't wrap inside the dropdown.
- **disabled:**
    - Disabled comboboxes are read-only and cannot be interacted with. Use the `helperText` prop to explain the constraint so users know what to do next.
- **usage guidelines:**
    - `Clear button` — the × button appears only when a value is selected and the field is not disabled. Do not remove it: it gives users a one-click escape without having to reopen the dropdown.
    - `Empty state` — always customise the `emptyText` prop to match the context ("No matching roles", "No country found") rather than leaving the generic fallback.
- **accessibility:**
    - The trigger renders with `role="combobox"` and `aria-expanded` to communicate open/closed state to assistive technologies.
    - The search input inside the dropdown receives focus automatically when the popover opens.
    - `aria-invalid` is applied to the trigger whenever an `errorMessage` is present.
    - The clear button renders with `role="button"` and `aria-label="Clear selection"` so keyboard and screen reader users can remove the value without reopening the dropdown.
    - **Always use a visible label** — pass the `label` prop so the field is announced correctly. Without a label, screen reader users have no context for what the field represents.
    - **Required fields** — set `required` so the asterisk renders alongside the label, and add `aria-required="true"` to the trigger if building a custom wrapper.
    - **Error messages** — the error text is rendered below the trigger. Wire up `aria-describedby` on the trigger pointing to the error element's `id` for reliable announcement on focus.
    - **Helper text** — provide `helperText` to set user expectations before submission; this reduces error frequency and avoids the need to explain constraints after failure.
    - The Combobox is built on Radix UI `PopoverPrimitive` combined with `CommandPrimitive`, giving it full keyboard support and correct ARIA semantics out of the box.

### CopyToClipboard

- **source:** `CopyToClipboard.mdx` · `CopyToClipboard.stories.tsx`
- **component tokens:** ~8 (`--component-copy-*`)
- **intent:** A copy-to-clipboard button gives users a one-click way to copy a value — an API key, a command, a URL — without selecting and using keyboard shortcuts. It cycles through three states: idle (Copy icon), copied (Check icon + "Copied" label), and error (X icon), then automatically reverts after a configurable timeout.
- **with code block:**
    - Position a `sm` copy button in the top-right corner of a code block. The button sits absolutely inside a `relative` container and does not push the code content.
- **inline with text:**
    - When `children` is provided, the component wraps the content and appends the copy button immediately after. Use this pattern for API keys, tokens, and short values that benefit from an inline copy action.
- **accessibility:**
    - The trigger exposes an `aria-label` describing the action (e.g. "Copy to clipboard").
    - Copy success is reflected visually via an icon/label change.
    - **Announce the result** — visual-only feedback is invisible to screen-reader users. Render the "Copied" confirmation inside a container with `aria-live="polite"` (or `role="status"`) so the change is announced.
    - **Label the action, not the value** — keep the `aria-label` on the verb ("Copy API key"), not the raw string being copied.
    - **Keep focus on the trigger** — do not move focus on copy, so keyboard users stay oriented.
    - The control renders a native `<button>` with an `aria-label`, so it gets keyboard focus, `Enter`/`Space` activation, and `role="button"` for free.

### Date picker

- **source:** `DatePicker.mdx` · `DatePicker.stories.tsx`
- **component tokens:** ~32 (`--component-date-*`)
- **intent:** A date picker lets users select a date by navigating a calendar grid. Use it for fields where the date context matters visually — booking dates, deadlines, birth dates — and where typing a date in a text field would require the user to know the expected format. For date ranges, use two date pickers with linked `min` and `max` props.
- **default:**
    - An empty date picker opens to the current month. The placeholder communicates what the field is for and which format the value will display in. Selecting a date closes the popover and displays the value in the trigger.
- **with selected value:**
    - When a value is already set — for example, when editing an existing record — the trigger shows the formatted date rather than the placeholder. The calendar opens to the selected date's month and highlights that date.
- **with min / max constraints:**
    - Use `min` and `max` to constrain selection to the valid domain. Dates outside the range are visually dimmed and cannot be selected. Always pair range constraints with field-level validation for dates that must satisfy business rules beyond a simple range. For booking or scheduling flows, consider showing availability or context within the calendar cells.
- **disabled:**
    - A disabled date picker cannot be interacted with. Use this when the field is not applicable in the current state, not when the user has made an error — use an error state with a message for validation failures.
- **calendar only:**
    - The `Calendar` component can be used standalone without the popover trigger — useful for inline date selection in forms, sidebars, or custom overlays where the trigger-and-popover pattern is not appropriate.
- **usage guidelines:**
    - Pre-populate the calendar to the selected value if one exists, or to today's date when empty — never open on a blank or distant month. Use `min` and `max` to constrain selection to the valid domain; always pair with field-level validation for dates that must satisfy business rules beyond a simple range. For booking or scheduling flows, consider showing availability or context within the calendar cells.
    - Label the field clearly — "Start date", "Date of birth", "Due date" — not just "Date". The label should make clear what the date represents in context, not just that a date is required. Format the displayed value in the user's locale so the date is immediately readable without interpretation.
    - Do not use a date picker for year-only or month-only inputs — a `<select>` is more appropriate for those cases, since the full calendar grid is unnecessary and adds navigational overhead. Do not use a date picker when a relative time reference ("in 7 days", "end of quarter") serves the user's mental model better than an absolute date.
- **accessibility:**
    - The calendar grid uses `role="grid"` with `role="gridcell"` for each day. The selected date has `aria-selected="true"`. Disabled dates have `aria-disabled="true"`. Navigation buttons carry `aria-label="Previous month"` and `aria-label="Next month"` so screen readers announce their purpose without relying on icon-only affordance. The popover trigger has `aria-haspopup="dialog"` and `aria-expanded` reflecting the current open state.
    - Keyboard interaction: arrow keys navigate between days in the grid, Enter selects the focused day, Escape closes the popover and returns focus to the trigger. Page Up and Page Down move backwards and forwards one month respectively. Tab and Shift+Tab cycle between the navigation buttons and the day cells within the popover.

### DateRangePicker

- **source:** `DateRangePicker.mdx` · `DateRangePicker.stories.tsx`
- **component tokens:** ~32 (`--component-date-*`)
- **intent:** A date range input backed by a Radix Popover. Clicking the trigger opens a floating panel with two calendar months side by side, allowing users to select a start and end date in one fluid interaction. Built on native JS `Date` — no external date library required. The trigger shows a calendar icon and a formatted label once a range is selected. The popover panel aligns to the trigger's leading edge and positions itself automatically via Radix to stay within the viewport.
- **controlled:**
    - Pass `value` and `onChange` to use the picker in controlled mode. The `value` prop is `{ from: Date | null; to: Date | null }`. Useful when you need to reflect the selected range elsewhere on the page — for example, in a query preview or a summary panel.
- **with presets:**
    - Pass a `presets` array to render a quick-pick column on the left side of the popover. Each preset has a `label` and a `range`. Use presets for common reporting windows — Last 7 days, Last 30 days, This month, This quarter — to reduce the number of calendar interactions for frequent tasks. Selecting a preset closes the popover immediately.
- **disabled:**
    - Set `disabled={true}` to make the picker read-only. The trigger renders with reduced opacity and a `not-allowed` cursor. Use this when the date range is determined by another control (for example, locked to a billing cycle) and the user should not be able to change it.
- **usage guidelines:**
    - Use `minDate` and `maxDate` to constrain valid selections — for example, prevent selecting future dates in a "report for" scenario, or prevent selecting dates before a subscription started. Days outside the allowed range are visually dimmed and cannot be clicked.
    - Selecting works in two clicks: first click sets the start date, second click sets the end date. If the user clicks an end date earlier than the start, the range is automatically swapped. A hover preview shows the would-be range before the second click is committed.
    - Always provide a `placeholder` that describes the expected input in context — "Select billing period" is clearer than the generic default. Show the selected range in a human-readable format (`MMM D, YYYY – MMM D, YYYY`) so users can confirm their selection at a glance without reopening the picker.
- **accessibility:**
    - Opening moves focus into the calendar; closing returns focus to the trigger.
    - Month navigation controls expose `aria-label`s ("Previous month", "Next month").
    - `Escape` closes the popover.
    - **Label the field** — give the trigger a visible label and an `aria-label` naming the range (e.g. "Booking date range").
    - **Announce the selected range** — surface the chosen start/end dates as text near the field, not calendar colour alone.
    - **Explain the two-step selection** — make clear via helper text that the first selection sets the start date and the second sets the end.
    - The range picker pairs a trigger button with a Radix UI `Popover` containing the calendar; the popover handles focus trapping and dismissal.

### File upload

- **source:** `FileUpload.mdx` · `FileUpload.stories.tsx`
- **component tokens:** ~7 (`--component-file-*`)
- **intent:** A file upload area lets users attach files to a form either by dragging and dropping or by clicking to open a file browser. Use it when file submission is the primary purpose of an interaction — document uploads, image attachments, CSV imports. For secondary or incidental attachments, an icon button with a hidden file input may be less disruptive.
- **default:**
    - The default upload area accepts any file type and a single file at a time. The dashed border and centered layout signal that this zone is droppable. The "Browse files" button provides a keyboard-accessible fallback for users who cannot or prefer not to drag.
- **image only:**
    - Setting `accept="image/*"` restricts the file browser to image formats. The constraint text at the bottom of the zone tells users what is accepted and the maximum file size before they attempt an upload.
- **multiple files:**
    - When `multiple` is true, users can select more than one file in a single browser interaction or drop multiple files at once. Display a list of selected files with individual remove controls after selection, before the user submits the form.
- **disabled:**
    - The disabled state prevents all interaction — drag, drop, and click. The zone is visually dimmed and the cursor becomes not-allowed.
- **usage guidelines:**
    - Always display the accepted file types and size limit directly in the upload area so users know before they attempt an upload. Validate file size client-side immediately on selection and show an inline error rather than waiting for a server response. When multiple files are allowed, show a list of selected files with individual remove controls before the user submits the form.
    - Do show accepted formats and size limits in the UI. Do validate immediately on selection. Do not clear the selected files on a failed upload — let the user correct and retry. Do not use a file upload zone for single-click actions that could be a simple icon button; the drop zone implies drag-and-drop, which sets expectations.
- **accessibility:**
    - The drop zone has `role="button"`, `tabIndex={0}`, and responds to Enter and Space to open the file browser, making it fully keyboard operable. It has an `aria-label` describing the upload action. The hidden `<input type="file">` has `aria-hidden="true"` since the visible button handles the interaction and announcing both would be redundant. Error messages for oversized or wrong-format files should be associated with the drop zone via `aria-describedby` so they are announced when focus enters the area.

### Input

- **source:** `Input.mdx` · `Input.stories.tsx`
- **component tokens:** ~20 (`--component-input-*`)
- **intent:** An input lets users enter short, free-form text. Use inputs for single-line data entry like names, email addresses, search queries, or configuration values.
- **states:**
    - `Default` — The resting state. The input is ready to receive focus and keyboard input.
    - `Disabled` — The input cannot be interacted with. Use when the field exists in the layout but the current context or permissions prevent editing. Always provide helper text explaining why it is locked.
    - `Error` — Triggered by failed validation. The error message replaces or supplements the helper text and appears immediately below the input. Write error messages that are specific and actionable — "Please enter a valid email address" rather than "Invalid input".
    - `Success` — Triggered when validation passes on a field where confirmation adds value — for example, checking that a username is available. Use success state deliberately; not every valid input needs a success indicator.
- **sizes:**
    - `sm` — Use in compact forms, table inline-editing, or dense filter panels.
    - `md (default)` — The standard input size for most forms and dialogs.
    - `lg` — Use on focused, single-action pages such as a prominent search bar or an onboarding step.
- **labels and helper text:**
    - `With label` — Always include a visible label for accessibility. Do not rely on placeholder text alone.
    - `Required` — Add a required indicator when the field must be completed before a form can be submitted. Pair with helper text to communicate the expectation clearly.
    - `With helper text` — Use helper text beneath the input to provide format guidance, constraints, or context — for example, "Must be 3–20 characters".
- **icons:**
    - `With prefix icon` — Use a leading icon to reinforce the purpose of the field (e.g. a search icon in a search input, a lock icon in a password field). Icons should add clarity, not decoration.
    - `With suffix icon` — Use a trailing icon for toggleable or supplementary actions — for example, a show/hide toggle on a password field.
    - `With both icons` — Use when both a contextual prefix and an interactive suffix are needed. Avoid overloading an input with icons if it adds visual noise without functional value.
- **character count:**
    - Shows a live counter of characters remaining. Use on fields with a strict character limit — for example, a bio or short description. The counter turns to an error state when the limit is reached.
- **accessibility:**
    - **Always use a visible label** — associate it with the input via `htmlFor` / `id`. Never rely on `placeholder` alone; placeholder text disappears on focus and has poor contrast in most browsers.
    - **Required fields** — pass the `required` prop, which sets the native `required` attribute. Screen readers announce "required" alongside the label.
    - **Error messages** — when an error is present, set `aria-invalid="true"` on the input and link the error message with `aria-describedby="[errorId]"` so screen readers read it automatically after the label.
    - **Helper text** — also link helper text via `aria-describedby` so it is announced when the field receives focus.
    - **Icon-only suffix actions** (e.g. show/hide password) — the icon button must have an `aria-label` and must toggle descriptively (e.g. `"Show password"` / `"Hide password"`).
    - **Character count** — the live counter should use `aria-live="polite"` so updates are announced without interrupting the user mid-typing.
    - Input renders a native `<input>` element and uses `aria-invalid` to communicate validation state to assistive technology.
    - Input is a native element; all standard browser keyboard behaviour applies — `Tab` to focus, standard text editing keys, `Escape` to clear if a clear button is present.

### Multi-select

- **source:** `MultiSelect.mdx` · `MultiSelect.stories.tsx`
- **component tokens:** ~9 (`--component-multi-*`)
- **intent:** A multi-select lets users choose multiple items from a predefined list. Use it when two or more options can apply simultaneously and the list has between 4 and 20 items. For fewer than 4 options, use a checkbox group. For free-form entry of values not from a fixed list, use a tag input instead.
- **default:**
    - The resting state shows a placeholder until at least one option is chosen. Clicking the trigger opens a dropdown listbox where each option has a checkbox indicator.
- **with selections:**
    - Selected items appear as inline chips inside the trigger. A "Clear" button appears alongside the chevron whenever at least one item is selected, allowing users to remove all selections in a single action.
- **disabled:**
    - The disabled state prevents interaction. The trigger is visually dimmed and the cursor becomes not-allowed. Pre-selected values are still shown so users can see the current state even when they cannot change it.
- **many options:**
    - When the list has more options than fit in the viewport, the dropdown scrolls vertically. The maximum height is capped to keep the popover contained.
- **usage guidelines:**
    - Show the count of selected items in the trigger when the selections would overflow the trigger width — for example "3 selected" rather than showing all three badge labels truncated. Always allow clearing all selections in a single action. Avoid using multi-select for mutually exclusive options; use a radio group or select instead.
    - Do use multi-select for filtering, category assignment, and permission sets. Do not use it when the user needs to create new values not in the list — use a tag input for that case instead.
- **accessibility:**
    - The trigger button has `aria-haspopup="listbox"` and `aria-expanded` to communicate its state to assistive technologies. The dropdown has `role="listbox"` and `aria-multiselectable="true"`. Each option has `role="option"` and `aria-selected` reflecting its current selection state. Keyboard interaction: Enter or Space toggles the focused option, Escape closes the dropdown without changing the selection, and arrow keys navigate between options.

### Number input

- **source:** `NumberInput.mdx` · `NumberInput.stories.tsx`
- **component tokens:** ~4 (`--component-number-*`)
- **intent:** A number input lets users set an exact numeric value using increment and decrement controls, or by typing directly. Use it when the range is known and bounded, and when small adjustments are common — quantity selectors, seat counts, duration fields. The component renders as a single inline row: a decrement button on the left, a centred text input in the middle, and an increment button on the right. The outer corners are rounded using the standard input border-radius token while the inner edges share a flush border, creating a unified control group.
- **default:**
    - The default story shows a value of 1 with a min of 0 and a max of 10 and a step of 1. The decrement and increment buttons clamp automatically to the min and max boundaries. Users can also type a value directly; the input clamps on change.
- **with limits:**
    - When `min` and `max` are provided, the corresponding button becomes disabled and visually muted as soon as the boundary is reached. This gives users immediate feedback that they have reached the allowed range without an error message. The `aria-disabled` attribute is also applied so the boundary state is communicated to assistive technology.
- **disabled:**
    - The entire control — both buttons and the input — is disabled when the `disabled` prop is true. Use this when the field is not applicable given the current form state, rather than hiding it, so users understand the field exists but cannot be edited.
- **large step:**
    - Set `step` to any positive number to change the increment size. A step of 5 is appropriate for percentage fields or coarse quantity adjustments. The up and down arrow keys on the keyboard also respect the configured step value.
- **usage guidelines:**
    - Always set a `min` and `max` when the domain is bounded. Use `step` to reflect the smallest meaningful unit — a quantity of items uses step 1, a percentage field might use step 5. Never use a number input for unbounded values like currency amounts or IDs — use a plain text input instead. Pair the number input with a visible label; the component itself does not render a label so the label must be provided by the surrounding form layout.
- **accessibility:**
    - The input has `type="number"` and should be associated with a visible label via `id` and `for`, or wrapped in a `<label>` element. Increment and decrement buttons have `aria-label="Increase value"` and `aria-label="Decrease value"` respectively so they are announced correctly when focused. Both buttons carry `aria-disabled` when they are at the min or max boundary, ensuring the disabled state is communicated to screen readers even though the visual appearance alone may not be sufficient. The up and down arrow keys increment and decrement the value, matching the expected keyboard behaviour for numeric steppers described in the ARIA authoring practices.

### RadioGroup

- **source:** `RadioGroup.mdx` · `RadioGroup.stories.tsx`
- **component tokens:** ~9 (`--component-radio-*`)
- **intent:** A radio group lets users select exactly one option from a set. Use radio groups when the choices are mutually exclusive and all options should be visible at once — for example, selecting a role, a billing cycle, or an access level. Use a Select when there are more than five or six options and screen space is constrained. Use a Checkbox when multiple items can be selected simultaneously.
- **default:**
    - A vertical list of options with a shared group label. Each item has a radio control and a text label. The selected option is visually distinguished by the filled radio button.
- **with descriptions:**
    - Each option includes a supporting description beneath the label. Use when the options are non-obvious or have meaningfully different consequences — for example, access level tiers ("Can view all projects but cannot make changes"). Descriptions help users make an informed choice without needing to leave the page for documentation.
- **with disabled item:**
    - Use a disabled item when one or more options are unavailable in the current context — for example, a plan tier that requires a sales conversation, or a role that requires additional permissions. Show the option so users know it exists, and pair it with a description explaining how to unlock it.
- **all disabled:**
    - The entire group is non-interactive. Use when the selection is determined by the system or another setting — for example, showing a locked plan configuration on a read-only billing page.
- **horizontal:**
    - Lays the options out in a row. Use for short, visually compact option sets — sizes, time intervals, or simple A/B choices — where the options are brief enough to read comfortably side by side.
- **accessibility:**
    - The group renders with `role="radiogroup"`.
    - Each item renders with `role="radio"` and `aria-checked`.
    - `aria-disabled` is applied to disabled items and the whole group.
    - `aria-required` is applied when the group is required.
    - **Group label** — always wrap the RadioGroup in a `<fieldset>` with a `<legend>` so the group question is announced alongside each option. Without it, screen readers only announce the individual item labels with no context about what the user is choosing.
    - **Option descriptions** — link description text to its item via `aria-describedby` so it is read after the label and state.
    - **Disabled items** — explain why an option is unavailable; a disabled radio gives no screen-reader affordance beyond being skipped, so a visible explanation is essential.
    - RadioGroup is built on Radix UI's `RadioGroupPrimitive`, which renders `role="radiogroup"` with full keyboard and ARIA state management.

### SegmentedControl

- **source:** `SegmentedControl.mdx` · `SegmentedControl.stories.tsx`
- **component tokens:** ~7 (`--component-segmented-*`)
- **intent:** A segmented control presents a set of mutually exclusive options in a compact pill. Use it when you have 2–5 choices and want the selected option to feel immediately obvious — like switching between List, Grid, and Board views.
- **sizes:**
    - `sm` — Use in toolbars, table headers, and compact filter rows.
    - `md (default)` — The standard size for most page-level view toggles and settings panels.
    - `lg` — Use when the control is a primary navigational element or needs extra touch target size.
- **with icons:**
    - Pair each segment with an icon to reinforce the label. Icons improve scannability in toolbars and dense UIs where reading every label quickly is important.
- **disabled:**
    - Disable the entire control when the feature is unavailable. Always pair with a tooltip or helper text explaining why.
- **full width:**
    - Stretches the control to fill its container, with each segment sharing equal width. Use in sidebars, drawers, or narrow panels where the full available width should be used.
- **accessibility:**
    - Only one option is checked at a time; `aria-checked` updates on selection.
    - A disabled group is reflected with `aria-disabled`.
    - **Label the group** — provide `aria-label` or `aria-labelledby` on the radiogroup so its purpose is announced (e.g. "View mode").
    - **Keep labels short and parallel** — each segment's text is its accessible name; never ship an icon-only segment without an `aria-label`.
    - **Roving focus** — only the selected option stays in the tab order; the rest are reachable via arrow keys, matching the radio pattern.
    - The control implements the WAI-ARIA radio group pattern: the container is `role="radiogroup"` and each option is `role="radio"` with `aria-checked`.

### Select

- **source:** `Select.mdx` · `Select.stories.tsx`
- **component tokens:** ~14 (`--component-select-*`)
- **intent:** A select lets users choose one option from a predefined list. Use a select when there are more than four options and the choices are known in advance. For fewer options, consider a radio group. For free-text with suggestions, consider a combobox.
- **states:**
    - `Default` — The resting state. The trigger shows the placeholder until a value is chosen.
    - `Error` — Triggered when no value has been selected but one is required, or when the selected value is no longer valid. The error message appears below the trigger.
    - `Success` — Signals that the selected value is valid — useful when the selection has side effects that can be confirmed immediately (e.g. a plan selection that shows pricing feedback).
    - `Disabled` — The select cannot be opened. Use when the options are unavailable in the current context. Always provide helper text explaining the constraint.
- **sizes:**
    - `sm` — Use in compact form layouts or as an inline control within a table row or toolbar.
    - `Default` — Use in standard forms, settings panels, and dialogs.
- **additional features:**
    - `With groups` — Use `SelectGroup` and `SelectLabel` to visually organise a long list into labelled sections — for example, grouping team members by department or assets by category.
    - `Required` — Marks the field as mandatory in a form. Pair with helper text to set expectations.
- **accessibility:**
    - The trigger renders with `role="combobox"`, `aria-expanded`, and `aria-haspopup="listbox"`.
    - The listbox renders with `role="listbox"`; each option has `role="option"` and `aria-selected`.
    - `aria-invalid` is applied when validation fails.
    - Focus returns to the trigger when the listbox closes.
    - **Always use a visible label** — associate it with the trigger via `htmlFor` / `id` or wrap in a `SelectField` which handles this automatically.
    - **Error messages** — link the error text via `aria-describedby` on the trigger so it is announced when focus enters the field.
    - **Grouped options** — `SelectLabel` renders visually but is not announced as a group name by all screen readers; for critical grouping semantics, consider adding `aria-label` to `SelectGroup`.
    - Select is built on Radix UI's `SelectPrimitive`, which manages focus, keyboard navigation, and ARIA attributes automatically.

### Slider

- **source:** `Slider.mdx` · `Slider.stories.tsx`
- **component tokens:** ~7 (`--component-slider-*`)
- **intent:** A slider lets users select a value or range by dragging a thumb along a track. Use sliders for continuous or step-based values where approximate input is acceptable — for example, volume, opacity, price range, or a confidence threshold. For precise numeric input, use an Input field instead of or alongside a slider.
- **default:**
    - A single-thumb slider for selecting one value within a defined range. Display the current value next to the label so users always know what they have selected.
- **range:**
    - A two-thumb slider for selecting a minimum and maximum value — for example, a price range or a date window. Both thumbs are independently draggable. Display both current values.
- **with steps:**
    - Snaps to discrete values along the track — for example, priority levels (Low, Medium, High) or specific percentages (0, 25, 50, 75, 100). Format the displayed value to match the step labels.
- **disabled:**
    - The thumb cannot be moved. Use when the value is determined by the system or another setting — for example, a storage usage indicator on a read-only plan summary.
- **with helper text:**
    - Use helper text to explain the effect of the slider value — for example, "Predictions below this score will be flagged for review." This is especially useful for non-obvious settings like confidence thresholds or compression levels.
- **accessibility:**
    - Each thumb renders with `role="slider"`, `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`.
    - `aria-disabled` is applied when the slider is disabled.
    - `aria-orientation="horizontal"` (default) or `"vertical"` is set automatically.
    - **Provide an `aria-label` or `aria-labelledby`** on each thumb — Radix does not infer this from sibling label elements. For a range slider, label both thumbs descriptively (e.g. `"Minimum price"` / `"Maximum price"`).
    - **Display the current value visibly** — screen readers announce `aria-valuenow`, but sighted users need a visible readout too. Always show the current value next to the label.
    - **Meaningful value text** — if `aria-valuenow` would read as a raw number that is hard to interpret, provide `aria-valuetext` with a human-readable string (e.g. `"$250"` or `"High"`).
    - **Step values** — when the slider uses non-obvious steps, ensure the displayed labels and `aria-valuetext` reflect the step semantics.
    - Slider is built on Radix UI's `SliderPrimitive`, which renders each thumb as a `role="slider"` with full ARIA value management.

### Switch

- **source:** `Switch.mdx` · `Switch.stories.tsx`
- **component tokens:** ~6 (`--component-switch-*`)
- **intent:** A switch toggles a single setting between an on and off state. Use a switch when the change takes effect immediately without requiring a form submission — for example, enabling notifications or activating dark mode. If the setting requires a save action to take effect, use a checkbox instead.
- **states:**
    - `Default (off)` — The resting, inactive state. The setting is currently disabled.
    - `Checked (on)` — The setting is active. The thumb moves to the right and the track changes colour to communicate the active state.
    - `Disabled` — The switch cannot be toggled. Use when the setting is locked in the current context — for example, a plan feature that requires an upgrade.
    - `Checked + disabled` — The setting is active but cannot be changed — for example, a security policy enforced at the workspace level.
- **with label:**
    - Always pair a switch with a visible label that describes what will happen when it is toggled. The label should describe the on-state of the feature ("Enable notifications", "Dark mode") so users understand the outcome before they interact.
- **accessibility:**
    - Renders with `role="switch"` and `aria-checked` (`"true"` / `"false"`).
    - `aria-disabled` is applied when the `disabled` prop is set.
    - **Always pair with a visible label** — use a `<label>` linked via `htmlFor` / `id`. The label should describe the setting in its on-state (e.g. "Enable notifications") so users understand the outcome before toggling.
    - **Do not use `aria-label` as a substitute for a visible label** — screen-reader-only labels remove the visual affordance that sighted users rely on. Use `aria-label` only on icon-only controls with no visible text.
    - **Immediate effect** — because switch changes take effect instantly, the label should not say "Save" or imply a deferred action. If the change needs a form submission to apply, use a Checkbox instead.
    - Switch is built on Radix UI's `SwitchPrimitive`, which renders `role="switch"` — the correct ARIA role for an immediate-effect toggle, distinct from a checkbox.

### Tag input

- **source:** `TagInput.mdx` · `TagInput.stories.tsx`
- **component tokens:** ~4 (`--component-tag-*`)
- **intent:** A tag input lets users create and manage a list of free-form text values. Each value is entered and confirmed as a tag chip that can be individually removed. Use it for labels, keywords, email recipients, and any field where the user supplies the values rather than choosing from a predefined list. For selecting from a fixed set of options, use Multi-select instead.
- **default:**
    - The empty state shows only the placeholder text inside an input-styled container. Users type a value and press Enter or comma to confirm it as a tag.
- **with tags:**
    - Confirmed tags appear as pill chips to the left of the cursor. Each chip has an X button for individual removal. The text input follows the last chip and expands to fill the remaining width.
- **disabled:**
    - When disabled, existing tags are shown but cannot be removed and no new tags can be added. The container and chips are visually dimmed.
- **with max tags:**
    - When a `maxTags` limit is set and reached, the text input is disabled and its placeholder changes to communicate that the limit has been reached. Removing an existing tag re-enables entry.
- **usage guidelines:**
    - Confirm a tag on Enter or comma. Allow backspace on an empty input to remove the last tag — this is a well-established convention that experienced users expect. Show a count indicator or disable the input when a `maxTags` limit is reached so users understand why entry has stopped. Strip leading and trailing whitespace silently; reject duplicates silently without an error state.
- **accessibility:**
    - The container has `role="group"`. Each tag has `role="listitem"`. Remove buttons have `aria-label="Remove [tag name]"` so screen reader users hear which tag will be deleted. The text input has an `aria-label` matching its visible placeholder, or should be associated with a visible label via `htmlFor` when used inside a labelled form field.

### Textarea

- **source:** `Textarea.mdx` · `Textarea.stories.tsx`
- **component tokens:** ~11 (`--component-textarea-*`)
- **intent:** A textarea lets users enter longer, multi-line text. Use it for descriptions, notes, comments, and any free-form content where a single line would be insufficient.
- **states:**
    - `Default` — The resting state. The textarea is ready for input.
    - `Disabled` — The field cannot be edited. Use when content is read-only in the current context — for example, a record locked by an admin. Provide helper text or a tooltip explaining the reason.
    - `Error` — Triggered by validation failure. Use a specific error message so users know exactly what to fix — for example, "Description is required" rather than "Required field".
    - `Success` — Triggered when content passes validation. Use when confirming well-formed content provides meaningful reassurance — for example, a correctly formatted code snippet.
- **additional features:**
    - `With helper text` — Use to set expectations about the content: tone, format, or audience. For example, "Visible to all team members."
    - `With character count` — Shows remaining characters when there is a maximum limit. Useful for bios, tweet-style summaries, or SMS copy.
    - `Required` — Marks the field as mandatory. Pair with clear placeholder text so users know what kind of content is expected.
    - `Auto-resize` — The textarea grows in height as the user types, removing the need to scroll within a fixed box. Use for open-ended content where the length is unpredictable.
- **accessibility:**
    - **Always use a visible label** — associate it with the textarea via `htmlFor` / `id`. Never rely on placeholder text alone.
    - **Required fields** — pass the `required` prop to communicate mandatory status to assistive technology.
    - **Error messages** — set `aria-invalid="true"` and link the error message with `aria-describedby="[errorId]"` so it is announced when focus enters the field.
    - **Character count** — the live counter must use `aria-live="polite"` so remaining-character updates are announced without interrupting the user.
    - **Auto-resize** — the height change is purely visual; no additional ARIA is needed, but avoid using JavaScript `focus` traps or scroll-jacking during resize.
    - **Disabled state** — if the field is disabled and you need to explain why, use a `<Tooltip>` on the wrapping element (not the textarea itself, since disabled elements cannot be focused).
    - Textarea renders a native `<textarea>` element and shares the same accessibility contract as Input.

### Time Picker

- **source:** `TimePicker.mdx` · `TimePicker.stories.tsx`
- **component tokens:** ~13 (`--component-time-*`)
- **intent:** A time picker lets users select a time by scrolling through a column-based panel. Use it for meeting times, deadlines, recurring events, or any field where a user needs to select a specific hour and minute without typing. The trigger shows a clock icon and the formatted time value. Clicking it opens a popover with scrollable columns for hours and minutes. In 12-hour mode, AM/PM buttons appear alongside the columns. The selected values are highlighted in brand blue.
- **controlled:**
    - Wire `value` and `onChange` to React state to control the picker. The internal value format is always `"HH:MM"` in 24-hour notation, regardless of the `use12Hour` display setting.
- **24-hour format:**
    - Set `use12Hour={false}` for contexts where 24-hour time is the expected convention — developer tools, scheduling dashboards, or international markets that use the 24-hour clock by default.
- **disabled:**
    - A disabled time picker displays the current value but cannot be interacted with. Use this when the time field is not applicable in the current state.
- **usage guidelines:**
    - The `minuteStep` prop controls the granularity of the minutes column (default `5`). Use `minuteStep={1}` for precise scheduling and `minuteStep={15}` or `minuteStep={30}` for simpler booking flows where exact minutes don't matter.
    - Always store and pass values in `"HH:MM"` 24-hour format. The `use12Hour` prop only affects the display; it does not change the internal value format.
    - For forms, wrap the picker in a label element or use `aria-labelledby` to associate a visible label with the trigger button.
- **accessibility:**
    - The trigger's `aria-label` reflects the current value or placeholder.
    - Opening moves focus into the panel; `Escape` closes it and returns focus to the trigger.
    - **Name the field** — give the trigger a visible label and an `aria-label` (e.g. "Start time").
    - **State the format** — communicate the expected format (12h/24h) in helper text.
    - **Announce selection** — ensure the chosen time appears as text on the trigger, not only as a highlight in the panel.
    - The time picker pairs a trigger button (with an `aria-label`) and a Radix UI `Popover` panel; the popover manages focus and dismissal.

## Data display


### Accordion

- **source:** `Accordion.mdx` · `Accordion.stories.tsx`
- **component tokens:** ~6 (`--component-accordion-*`)
- **intent:** An accordion reveals or hides sections of content on demand. Use it to present a long list of items where most users will only need a subset — for example, FAQs, settings categories, or feature details. Avoid using accordion when all sections are equally important and users are likely to read them in sequence — flat content is easier to scan.
- **single:**
    - Only one item can be open at a time. Expanding a new item automatically collapses the previous one. Use single-type accordions when sections are mutually exclusive or when vertical space is constrained.
- **multiple:**
    - Multiple items can be open simultaneously. Use when sections are independent and users are likely to compare or reference content from several sections at once — for example, a settings panel with unrelated categories.
- **accessibility:**
    - Each trigger renders inside an `AccordionPrimitive.Header`, which maps to `role="heading"` at the default level — providing document structure for screen readers.
    - Each trigger has `aria-expanded` (`"true"` / `"false"`) that updates when toggled.
    - `aria-controls` links each trigger to its content panel.
    - The content region has `aria-labelledby` pointing back to its trigger.
    - **Heading level** — by default, each trigger is wrapped in an `<h3>`. Override the heading level to match your page hierarchy by passing a custom `AccordionPrimitive.Header` element if the accordion sits inside an `<h2>` section.
    - **Content links** — links and interactive elements inside accordion content panels are keyboard-reachable when the panel is open; ensure they are not present in the DOM (or are hidden with `display: none`) when the panel is closed. Radix handles this automatically.
    - **Avoid deeply nested accordions** — more than two levels of nested disclosure adds cognitive and keyboard navigation overhead for all users.
    - Accordion is built on Radix UI's `AccordionPrimitive`, which implements the WAI-ARIA Disclosure pattern with correct heading, button, and region roles.

### Badge

- **source:** `Badge.mdx` · `Badge.stories.tsx`
- **component tokens:** ~12 (`--component-badge-*`)
- **intent:** A badge communicates a status, category, or count. It is always decorative and never interactive on its own. Use badges to help users quickly identify the state or type of an item without reading full text.
- **variants:**
    - `Default` — Use the default badge for general labels or categories that don't carry a specific semantic meaning — for example, feature tags or content types.
    - `Secondary` — A lower-emphasis label for supplementary metadata. Use when the badge needs to be present but should not draw strong attention.
    - `Outline` — Use an outline badge for neutral states like "Draft" or "Archived" where no colour is needed and the label alone is sufficient.
    - `Destructive` — Use sparingly to flag items that require immediate attention or are in a critical failure state. Prefer the error semantic variant for most failure states.
    - `Success` — Communicates a healthy, completed, or active state — for example "Deployed", "Active", or "Verified".
    - `Info` — Communicates a neutral informational state in progress — for example "Building", "Processing", or "Syncing".
    - `Warning` — Communicates a degraded or attention-required state — for example "Degraded", "Expiring soon", or "Pending approval".
    - `Error` — Communicates a failed or broken state — for example "Incident", "Failed", or "Rejected".
    - `Brand` — Use to highlight new features, promoted items, or branded labels. Use sparingly so it retains its attention-grabbing quality.
- **sizes:**
    - `sm` — Use in compact table cells, tag lists, or inline within a sentence.
    - `md (default)` — Use in most contexts: cards, list items, filter chips.
    - `lg` — Use when the badge is a prominent piece of information that needs to stand on its own, such as a status pill on a detail page header.
- **with dot indicator:**
    - Add a status dot before the label when the badge is being used specifically as a real-time status indicator. The dot reinforces the semantic colour with an additional visual signal, useful in dashboards and monitoring tables where scanning speed matters.
- **accessibility:**
    - **Do not rely on colour alone** — status badges use colour to communicate meaning (green = success, red = error). Always pair the colour with a text label. Users with colour vision deficiency cannot distinguish status from colour alone.
    - **Status dots** — the dot indicator is decorative and should be hidden from assistive technology with `aria-hidden="true"`. The badge label already carries the semantic information.
    - **Counts in nav badges** — when a badge appears on a navigation item (e.g. "Inbox · 4"), ensure the parent nav item's label includes the count for screen readers (e.g. `aria-label="Inbox, 4 unread"`). Visually placing the count inside the badge does not automatically expose it to screen readers in all contexts.
    - **Badge as status only** — badges should never be the sole indicator of a critical state. If an item is in error, the error must also be surfaced in context (e.g. an inline message, an error border, or a page-level alert) — not just through a red badge.
    - Badge is a purely decorative, non-interactive element. It has no interactive role and does not receive focus.

### Card

- **source:** `Card.mdx` · `Card.stories.tsx`
- **component tokens:** ~7 (`--component-card-*`)
- **intent:** A card groups related content and actions into a contained, scannable unit. Use cards to present discrete items — a user profile, a metric, a project summary — where each item needs visual separation from its neighbours. Cards are layout containers, not interactive elements in themselves. If the entire card is clickable, apply a hover state and ensure it has an accessible role and label.
- **default:**
    - Use for any grouped content that needs a title, supporting description, and one or more actions. The footer holds the card's primary and secondary actions — keep it to two buttons at most.
    - Displays a label, a large value, and a trend indicator. Use for any quantitative metric where the absolute value and its direction both matter.
- **with action:**
    - Places a secondary action — typically a small button or badge — in the top-right corner of the card header. Use for contextual shortcuts that relate to the card's subject without being the card's primary CTA: an "Invite" button on a team card, a settings link on a project card, or a live status badge on a deployment card.
- **small (compact):**
    - A reduced-padding variant for dense layouts such as sidebars, dashboards with many tiles, or stacked lists. Use when cards need to fit comfortably in a constrained grid without competing with each other for space.
- **status card:**
    - Combines a header action badge with semantic badge pills in the content area. Use to communicate the real-time health or state of a system, deployment, or resource at a glance. Keep the content scannable — favour badges and short labels over prose.
    - ---
    - # MetricCard
    - A MetricCard is a specialised card for displaying a single KPI with its trend direction. Use metric cards in dashboards and summary pages where users need to quickly read a key number and understand whether it is moving in the right direction.
    - Always show a trend label so the comparison period is clear ("vs last month", "vs last week"). Never show a trend without a reference point.
- **brand:**
    - Use the brand variant to highlight your most important or signature metric — typically the primary business KPI on a dashboard header.
- **trend: up / down / neutral:**
    - The trend indicator (arrow + percentage) communicates direction relative to the comparison period. Use "up" for improvement, "down" for decline, and "neutral" when there is no meaningful change. Choose whether "up" is good or bad based on the metric — churn going up is bad; revenue going up is good — and apply the card variant accordingly.
- **dashboard grid:**
    - Arrange metric cards in a responsive grid (typically 2–4 columns) at the top of a dashboard. Group related metrics together and maintain consistent comparison periods across all cards on the same view.
- **accessibility:**
    - **Clickable cards** — if the entire card is a link or triggers an action, wrap it in an `<a>` or `<button>` element and give it an `aria-label` that describes the destination or action (e.g. `aria-label="View Project Alpha details"`). Never make a `<div>` clickable with only an `onClick` handler — it will be invisible to keyboard and screen reader users.
    - **Heading hierarchy** — the `CardTitle` should use a heading element (`<h2>`, `<h3>`, etc.) at the correct level for the page structure. Cards that sit inside a section headed by an `<h2>` should use `<h3>`. Do not use headings solely for visual sizing.
    - **Actions in card header** — icon buttons in the card header (e.g. settings or share) must have `aria-label` values that include the card's subject (e.g. `aria-label="Share Project Alpha"`) so they are distinguishable from identically-labelled buttons on sibling cards.
    - **MetricCard trend indicators** — the trend arrow and percentage are visual; the accessible label for the trend region should include both direction and value (e.g. `aria-label="Up 12% vs last month"`). Do not rely on the arrow icon alone to convey direction to screen readers.
    - Card is a layout container with no built-in interactive role.

### DataTable

- **source:** `DataTable.mdx` · `DataTable.stories.tsx`
- **component tokens:** ~11 (`--component-data-*`)
- **intent:** A DataTable is a full-featured data grid for displaying, searching, sorting, and paginating structured datasets. Use it when users need to browse, find, or act on records — team members, transactions, issues, orders. Prefer DataTable over a plain Table when the dataset has more than one page of results, requires sorting or filtering, or when users need to select and act on multiple rows at once.
- **default:**
    - Displays the dataset with search, sorting, and pagination built in. The search bar filters across visible columns in real time. Column headers are sortable on click. Pair each row with an actions menu for row-level operations.
- **with row selection:**
    - Adds a checkbox column to allow users to select one or more rows. Use when users need to perform bulk actions — delete, export, reassign. Show a bulk-action bar or toolbar when one or more rows are selected.
- **with column toggle:**
    - Adds a column visibility control that lets users show or hide columns. Use for tables with many columns where different users care about different fields. The toggle remembers user preferences within the session.
- **loading:**
    - Displays skeleton rows while data is being fetched. Match the number of skeleton rows to the expected page size so the layout doesn't reflow when real data arrives. Always show the search bar and table header during loading so the structure is immediately understood.
- **column types:**
    - The identity cell is always the first column. It shows a name in bold on the primary line and a secondary value such as an email address or subtitle below it in muted foreground. Never truncate the name. Status values should use a Badge with a dot and the appropriate semantic variant — success, warning, or error — never plain text or raw colour. Date and time columns should use relative time for recent events ("2h ago", "yesterday") and absolute dates for historical records, rendered in muted foreground. Numeric columns are always right-aligned and should use tabular-nums so values stack cleanly. The actions cell is always the last column; use a DropdownMenu with a MoreHorizontal trigger for three or more row-level actions, with destructive actions placed below a separator in destructive colour. Boolean values should be represented by a read-only icon or switch, never the raw text "true", "false", "yes", or "no".
- **usage guidelines:**
    - Every DataTable has four states that must all be designed before implementation: loading, empty, error, and populated. Loading shows skeleton rows that match the real column layout and row count so the table does not reflow when data arrives. Empty names what is missing in plain language. Error shows an Alert with a retry action rather than a blank table. Populated displays the row count near the header, not inside the toolbar.
    - Lay out the toolbar with search and filter controls on the left and export with the primary call to action on the right. There is one primary action per toolbar at most. Export must respect any active filters — exporting the full unfiltered dataset when a filter is in effect is a common mistake that damages user trust in the data they receive.
- **accessibility:**
    - **Column headers** — sortable column headers must use `<th scope="col">` with `aria-sort="ascending"`, `"descending"`, or `"none"` so screen readers announce the sort state. Update this attribute when the user changes the sort direction.
    - **Caption or label** — add a visually hidden `<caption>` or `aria-label` on the `<table>` element describing the dataset (e.g. "Team members, 24 results").
    - **Row selection checkboxes** — the header "select all" checkbox must have `aria-label="Select all rows"`. Each row checkbox must include the row's identity in its label (e.g. `aria-label="Select Priya Sharma"`) so screen readers can distinguish them.
    - **Row actions** — the DropdownMenu trigger in the actions cell must have an `aria-label` that includes the row identifier (e.g. `aria-label="Row actions for Priya Sharma"`). Without this, every "more actions" button sounds the same.
    - **Loading state** — the skeleton rows are decorative; wrap the loading region in `aria-busy="true"` and `aria-label="Loading data"` so screen readers announce the in-progress state.
    - **Empty and error states** — both states should be announced. Wrap them in a live region with `aria-live="polite"` so they are announced when they appear after a filter or load operation.
    - **Search input** — the search input must have a visible or screen-reader label (e.g. `aria-label="Search team members"`) so its purpose is clear in isolation.
    - DataTable uses native HTML table elements with TanStack Table managing sort and selection state.

### Empty state

- **source:** `EmptyState.mdx` · `EmptyState.stories.tsx`
- **component tokens:** ~4 (`--component-empty-*`)
- **intent:** An empty state fills the space where content would normally appear — after a search returns no results, when a list has no items, or when a feature hasn't been used yet. A well-written empty state explains why the space is empty and tells the user what to do next.
- **default:**
    - The default medium size is the right choice for most list views, data tables, and inline panels. Pair it with a search icon when the context is a filtered or searched list, and always offer a reset action when one is available.
- **small (inline):**
    - Use the small size inside cards, sidebars, and tightly-constrained panels where a full-sized empty state would feel overweight. The reduced icon, tighter type scale, and narrower max-width keep it proportional to the surrounding layout.
- **large (full page):**
    - Reserve the large size for top-level routes where an entire page is empty — an inbox, a project list, or a team directory before any records exist. The larger icon and generous whitespace give the state appropriate visual weight for a whole-page context.
- **without icon:**
    - Omit the icon when no useful visual metaphor exists for the content type, or when the state appears in a context where an icon would feel decorative rather than informative. The heading and description carry the message on their own.
- **without action:**
    - Not every empty state has a recovery path the user can take. When the space is empty because no one has sent a message or shared a file, it is fine to inform the user without offering a button. Don't manufacture an action that isn't meaningful.
- **usage guidelines:**
    - Write the heading as a statement of the current state, not a question. The description should answer "what now?" in one sentence — point to the action or explain the cause. Use the large size for top-level pages and the small size for panels and cards within a larger layout. Never say "No data found" — be specific about what is absent.
    - Do be specific — "No invoices this month" beats "Nothing here". Do always offer a way forward when one exists. Don't use an empty state as a placeholder during loading — use Skeleton instead.
- **accessibility:**
    - The empty state is read naturally as static content. If it appears after an action (for example, a search returns no results), wrap it in a region with `aria-live="polite"` so screen readers announce the change. The icon is hidden from the accessibility tree with `aria-hidden="true"` because the heading and description convey the full meaning — do not rely on the icon alone.

### List

- **source:** `List.mdx` · `List.stories.tsx`
- **component tokens:** ~9 (`--component-list-*`)
- **intent:** A List renders a vertical stack of rows separated by hairline dividers. It is composed from primitive sub-components — `ListItem`, `ListItemAvatar`, `ListItemContent`, `ListItemTitle`, `ListItemDescription`, `ListItemAction`, and `ListDivider` — so you can mix and match exactly what each row needs.
- **with avatars:**
    - Add a `ListItemAvatar` on the left with an `Avatar` inside. Pair it with `ListItemContent` holding a title and description for the standard contact-list layout.
- **with actions:**
    - Add a `ListItemAction` on the right to surface per-row metadata — a status badge, a button, a count, or a chevron. The action slot uses `ml-auto` to always align to the trailing edge.
- **interactive:**
    - Pass `interactive` to a `ListItem` to add hover state and cursor pointer. Pass `selected` to highlight the active row. Use `useState` to track selection in the parent.
- **mixed:**
    - The full composition: avatar, title, description, and a trailing chevron icon — all inside interactive rows. A `ListDivider` separates logical groups within the same list.
- **accessibility:**
    - Selectable items reflect state with `aria-selected`.
    - Unavailable items set `aria-disabled` and are skipped by activation.
    - Dividers are exposed as `role="separator"` so they are not read as content.
    - **Use the right container role** — for a single-select option list use `role="listbox"` with `role="option"` children; for a plain content list, native `<ul>`/`<li>` is correct and needs no ARIA.
    - **Do not disable silently** — pair `aria-disabled` items with context explaining why they are unavailable.
    - **Keep separators decorative** — never place meaningful content inside a `role="separator"` element.
    - List items expose selection and disabled state via `aria-selected` and `aria-disabled`; non-interactive dividers use `role="separator"`.

### MetricCard

- **source:** `MetricCard.mdx` · `MetricCard.stories.tsx`
- **component tokens:** ~0 (`--component-metric-*`) ⚠️ none matched — check namespace
- **intent:** A MetricCard displays a single KPI with its trend direction. Use metric cards in dashboards and summary pages where users need to quickly read a key number and understand whether it is moving in the right direction. Always show a trend label so the comparison period is clear ("vs last month", "vs last week"). Never show a trend arrow without a reference period — direction without context is meaningless.
- **variants:**
    - `Default` — A neutral surface for any quantitative metric. Works in any context.
    - `Brand` — Use to highlight the most important or signature metric — typically the primary business KPI in a dashboard header. The solid brand-blue background commands the most visual weight in a grid.
    - `Success` — Use when the metric reflects a healthy state (high uptime, strong conversion, low error rate). The green tint reinforces positive status.
    - `Warning` — Use when a metric is approaching a threshold that requires attention but hasn't yet become critical. The amber tint signals "watch this".
    - `Error` — Use when a metric reflects a critical or failing state (high error rate, failed payments, SLA breach). Reserve for genuinely actionable problems.
- **default:**
    - Displays a label, a large value, and a trend row. The icon in the top-right corner gives a quick visual cue for the metric's domain — use icons sparingly and consistently (one per card, same icon style throughout the grid).
- **brand:**
    - The brand variant inverts the colour scheme to white text on the brand blue. Use for the single most important metric on a page — overusing it removes the emphasis.
- **trend directions:**
    - The trend row combines an arrow icon, a delta value, and a comparison label. Choose direction semantics carefully — "up" does not always mean good. Churn going up is bad; revenue going up is good. If needed, use the `variant` prop to reinforce whether the direction is positive or negative:
- **without icon:**
    - The `icon` prop is optional. Omit it for compact grids where icons add clutter, or when the label is already descriptive enough on its own.
- **dashboard grid:**
    - Arrange metric cards in a responsive grid (2–4 columns depending on viewport) at the top of a dashboard. Keep comparison periods consistent across all cards in the same view — mixing "vs last month" and "vs last year" in the same row makes trend comparisons misleading.
- **accessibility:**
    - **Trend indicators** — the trend arrow and percentage are visual. Wrap the entire trend row in a `<span aria-label="Up 12.5% vs last month">` so screen reader users hear the full direction and magnitude in one announcement. Do not rely on the arrow icon alone.
    - **Colour-only meaning** — variant colours (success green, warning amber, error red) must not be the only signal. Always pair them with a clear label or icon so users who cannot distinguish colours still understand the state.
    - **Value format** — ensure large formatted numbers include a readable equivalent if the abbreviated form is ambiguous (e.g. "$48.3k" vs "$48,295"). For screen readers, consider an `aria-label` on the value element with the full unabbreviated figure.
    - **Heading hierarchy** — if `CardTitle` / the metric label should be part of the page outline, render it as a heading element at the appropriate level rather than a plain `<p>`.

### Table

- **source:** `Table.mdx` · `Table.stories.tsx`
- **component tokens:** ~10 (`--component-table-*`)
- **intent:** A Table is a lightweight, static data display for small, stable datasets that don't require sorting, filtering, or pagination. Use it for reference data, comparison layouts, settings summaries, and read-only records. When the dataset is dynamic, paginated, or needs row actions, use DataTable instead.
- **default:**
    - A standard table with a header row and data rows. Use semantic column headers to describe each column clearly. Place row-level actions (Edit, Delete) in a trailing cell using ghost buttons to keep the table visually clean.
- **simple table:**
    - A minimal two-column layout for key–value reference data — for example, design tokens, configuration values, or specification tables. No actions needed; the value of each row speaks for itself.
- **accessibility:**
    - **Column headers** — always use `<th scope="col">` for column headers. `scope="col"` tells screen readers which cells belong to each header, especially important in multi-column tables.
    - **Row headers** — if the first column identifies a row (e.g. a name or ID), mark it with `<th scope="row">` so screen readers announce the row identifier alongside each cell value.
    - **Caption** — add a `<caption>` element to describe the table's content (e.g. "Project members"). This is the accessible name of the table and helps screen reader users who are scanning landmarks.
    - **Row actions** — ghost icon buttons in a trailing cell must have `aria-label` values that include the row context (e.g. `aria-label="Edit Priya Sharma"` rather than just `aria-label="Edit"`), otherwise all action buttons on the page sound identical to screen reader users.
    - **Avoid using tables for layout** — only use `<table>` for genuine tabular data. CSS Grid or Flexbox should be used for visual alignment.
    - Table uses native HTML table elements, which give screen readers full structural context when marked up correctly.

### Timeline

- **source:** `Timeline.mdx` · `Timeline.stories.tsx`
- **component tokens:** ~20 (`--component-timeline-*`)
- **intent:** A timeline displays a sequence of events in chronological order. Use it for activity feeds, audit logs, process histories, or any situation where the order and timing of events matters to the user. Each item consists of a circular icon on the left connected to the next item by a vertical line, and a content block on the right with a title, optional description, and time.
- **with icons:**
    - Pass a `lucide-react` icon (or any React node) to the `icon` prop on `TimelineIcon` to provide visual context for each event type. Use consistent iconography within a single timeline — don't mix abstract icons and literal representations.
- **compact:**
    - The compact style reduces vertical spacing between items, making it suitable for dense audit logs or activity streams where many events need to fit in a limited vertical space. Pair the time inline with the title row rather than below the description to save further vertical space.
- **usage guidelines:**
    - Always mark the last `TimelineItem` and `TimelineIcon` with the `last` prop — this removes the connecting line below the final item.
    - Use `TimelineTime` to communicate when the event occurred. Relative timestamps ("2 minutes ago") work well for recent activity feeds; absolute timestamps ("09:41") suit audit logs where precision matters.
    - Keep descriptions concise — one or two lines. For events with rich detail, link to a detail view from the title rather than expanding inline.
- **accessibility:**
    - Content renders in DOM order, matching the visual and reading order.
    - **Use list semantics** — render the sequence as `<ol>`/`<li>` so screen readers announce position and count ("3 of 7").
    - **Hide decorative markers** — dots, connector lines, and status icons carry no meaning; mark them `aria-hidden="true"`.
    - **State status in text** — if a step's state (complete, current, upcoming) is shown by colour or icon, also include it as visible or visually-hidden text.
    - **Do not rely on colour alone** — event status must be distinguishable without colour (WCAG 1.4.1).
    - A timeline is a sequence of events read in order, so it maps to an ordered list semantically.

### Tree View

- **source:** `TreeView.mdx` · `TreeView.stories.tsx`
- **component tokens:** ~10 (`--component-tree-*`)
- **intent:** A tree view displays hierarchical data as an indented, collapsible structure. Use it for file systems, navigation trees, category hierarchies, or any data where parent–child relationships need to be browsable. Click the chevron icon to expand or collapse a node with children. Click the label to select a node. Keyboard users can navigate with arrow keys, and activate or expand nodes with Enter or Space.
- **with icons:**
    - Use icons to help users distinguish node types at a glance — for example, folder icons for containers and file-type icons for leaf nodes. Icons are optional; nodes without them align flush with their siblings.
- **with badges:**
    - Badges communicate counts or statuses alongside node labels — for example, unread message counts or the number of items in a folder. Keep badge values short (under four digits) so they fit within the constrained row width.
- **controlled selection:**
    - Wire the `onSelect` callback to external state to respond to selection changes — for example, navigating to the selected item's detail view or filtering a list panel.
- **usage guidelines:**
    - Keep nesting shallow wherever possible — three to four levels is usually the practical limit before the indentation becomes difficult to parse. For very deep hierarchies, consider a breadcrumb or column-based navigation instead.
    - The `defaultExpanded` prop accepts an array of node IDs that should be open on first render. Use it to surface the most relevant part of the tree without forcing the user to expand multiple levels manually.
- **accessibility:**
    - Expandable nodes expose `aria-expanded` (`true`/`false`); leaf nodes omit it.
    - Selected nodes reflect `aria-selected`.
    - Child groups are wrapped in `role="group"` so depth is conveyed.
    - Decorative expand/collapse icons are `aria-hidden="true"`.
    - **Single tab stop** — the tree is one tab stop with roving focus between nodes, not one stop per node.
    - **Label the tree** — provide an `aria-label` describing its contents (e.g. "File browser").
    - **Name from text** — each treeitem's accessible name should come from its label text, not an icon alone.
    - TreeView implements the WAI-ARIA tree pattern: the container is `role="tree"`, nodes are `role="treeitem"` with `aria-selected` and `aria-expanded`, and nested levels are wrapped in `role="group"`.

## Navigation


### AppHeader

- **source:** `AppHeader.mdx` · `AppHeader.stories.tsx`
- **component tokens:** ~20 (`--component-app-*`)
- **intent:** A full-width horizontal navigation bar, 56 px tall, white background. It sits at the top of every application page and provides consistent access to the logo, primary navigation, search, notifications, and the user account menu. Compose it from the provided sub-components to match the exact navigation model of your product. The header is `56px` tall and uses `var(--base-color-gray-200)` for the bottom border. Text uses `var(--base-color-gray-900)`; active nav items use `var(--base-color-blue-800)` text and a 2 px bottom border in the same colour.
- **minimal:**
    - Strip the header to its essentials — logo and user avatar — for flows that should not distract with navigation. Useful for onboarding screens, focused editors, or checkout-style pages where the full nav would pull users away from the task.
- **active navigation:**
    - Mark the active nav item with `active={true}` to anchor the user's position. Only one item should be active at a time. Connect the active prop to your router so it reflects the current route automatically.
- **usage guidelines:**
    - Keep the nav to five items or fewer. Beyond that, consider grouping secondary destinations in a dropdown or moving them to a sidebar. The logo is always the leftmost element; the user account menu is always the rightmost. The search trigger sits between the nav and the actions cluster to keep the information architecture visually clear.
    - For apps that use the command palette, wire `AppHeaderSearch` with `onSearchClick` to open it instead of rendering an inline input. This keeps the header light and moves power users to a more capable interface.
- **accessibility:**
    - The `AppHeader` renders as a `<header>` landmark. Active nav items use `aria-current="page"`. The notification button includes an `aria-label` that announces the unread count when it is greater than zero. The user menu trigger is a `<button>` with a descriptive `aria-label`.

### Breadcrumb

- **source:** `Breadcrumb.mdx` · `Breadcrumb.stories.tsx`
- **component tokens:** ~3 (`--component-breadcrumb-*`)
- **intent:** A breadcrumb shows the user's current location within a hierarchy and provides links to navigate back up the tree. Use it on any page that is more than one level deep in the product structure. The breadcrumb is fully composable — each piece (`Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`) is exported individually so you can arrange and style them to fit your layout without modifying the primitives.
- **default:**
    - The default three-level breadcrumb is the most common pattern. Each ancestor is a link styled in muted colour, and the current page is rendered as plain non-linked text in the foreground colour. Separators use ChevronRight by default and are hidden from assistive technology.
- **with ellipsis:**
    - When a path is more than four levels deep, use `BreadcrumbEllipsis` to collapse the middle segments. This keeps the trail readable without wrapping onto a second line. The ellipsis is decorative and screen-reader-hidden — only the visible ancestor links and the current page are announced.
- **single level:**
    - On pages that are only one level below home, the breadcrumb contains just two items: the parent link and the current page. This is the minimal useful form and is preferable to hiding the breadcrumb entirely, since it still gives the user a one-click escape route.
- **custom separator:**
    - Pass any string or node as a child to `BreadcrumbSeparator` to override the default chevron. A forward slash is a common alternative for products that want a more URL-like appearance. Whatever you pass still renders inside an `aria-hidden` list item, so separators are never announced.
- **usage guidelines:**
    - Always reflect the navigational hierarchy — not the user's browser history. The breadcrumb should match the information architecture of the product, so the same page always shows the same trail regardless of how the user arrived. The current page is the last item and is never a link. Truncate long paths with an ellipsis when more than four levels deep rather than wrapping onto multiple lines. Do not use a breadcrumb on top-level pages — it adds noise when there is nothing to navigate back to.
- **accessibility:**
    - The `Breadcrumb` wrapper renders as a `<nav>` element with `aria-label="breadcrumb"`, which creates a distinct landmark that screen reader users can jump to directly. The current page item has `aria-current="page"` and `aria-disabled="true"` to signal that it is not interactive. All separators have `aria-hidden="true"` so they are skipped by screen readers. The ellipsis item is also `aria-hidden` — if you expand a collapsed path on interaction, ensure the newly revealed links are focusable and announced correctly.

### CommandPalette

- **source:** `CommandPalette.mdx` · `CommandPalette.stories.tsx`
- **component tokens:** ~24 (`--component-command-*`)
- **intent:** A Spotlight-style command palette that drops from the top of the viewport. It provides fast keyboard-driven access to pages, actions, and recently visited files — without interrupting the user's flow with a full modal overlay. Use it wherever users need to navigate a large information space without reaching for the mouse. The palette appears at `top: 80px`, centred, on a subtle `bg-black/20` backdrop. The floating panel is `max-w-xl`, with grouped results and a search input that filters as the user types.
- **with trigger:**
    - Wire the palette to a search button and the `⌘K` (or `Ctrl+K`) keyboard shortcut so users can open it from anywhere on the page. The trigger button in the app header is the canonical entry point — it doubles as a visual affordance for the shortcut.
- **usage guidelines:**
    - Use the command palette for navigation and quick actions — not as a form or settings panel. Keep items focused: a well-curated list of 10–20 items is more useful than an exhaustive dump of every feature. Always include a shortcut (`⌘K`) and surface it visibly in the trigger so users discover it without documentation.
    - Group items consistently: Pages first, then Actions, then Recent. Within each group, order by frequency of use. Limit groups to 3–4 visible items before truncating — users stop reading at depth. Keyboard navigation (↑ ↓ Enter Esc) must work without any mouse interaction.
- **accessibility:**
    - The palette renders inside a Radix Dialog Portal, giving it the correct ARIA `role="dialog"` and focus trap. The input has `aria-autocomplete="list"` and each result button has `role="option"` and `aria-selected`.

### Pagination

- **source:** `Pagination.mdx` · `Pagination.stories.tsx`
- **component tokens:** ~9 (`--component-pagination-*`)
- **intent:** Pagination splits a large dataset across multiple pages and gives users controls to move between them. Use pagination on any list or table where showing all records at once would hurt performance or readability. Always show the total record count and the current page context ("1–10 of 142 members") so users always know where they are in the dataset.
- **default:**
    - The standard pagination bar with previous/next controls, numbered page buttons, a row-count summary, and a page-size selector. Use this in most table and list contexts.
- **first page:**
    - On the first page, the Previous and First buttons are disabled but remain visible. Never hide navigation controls — hiding them causes layout shifts and disorientation when the user reaches the boundary.
- **last page:**
    - On the last page, the Next and Last buttons are disabled. The row-count summary adjusts to reflect the final page's actual record count, which may be fewer than the selected page size.
- **many pages (with ellipsis):**
    - When the total number of pages exceeds the display threshold, the middle of the page range collapses into ellipsis markers (…), keeping the first, last, and pages surrounding the current page always visible. This prevents the pagination bar from becoming too wide on large datasets.
- **small dataset (≤7 pages):**
    - When the total pages fall within the display threshold, all page numbers are shown without ellipsis. No truncation is applied.
- **single page:**
    - When all records fit on one page, all navigation controls are disabled. The row-count summary still shows the total number of records so the user understands why navigation is unavailable.
- **empty (zero rows):**
    - When there are no records, the pagination bar shows zero-state counts and disables all controls. Use this state alongside an empty state message in the table or list above it.
- **usage guidelines:**
    - Default to a page size of 10 rows. Offer 10, 25, and 50 as options in the page-size selector, but never default to "All" — loading an unbounded dataset locks the browser on large tables and gives users no sense of scale.
    - Whenever the user changes a filter, reset the pagination to page 1 and update the row-count summary to reflect the filtered result set. Remaining on page 4 after a filter is applied is disorienting, and showing a count that does not match the visible rows erodes trust in the data.
- **accessibility:**
    - The pagination bar is wrapped in a `<nav>` with `aria-label="pagination"` so screen readers identify it as a landmark.
    - Page number buttons are `<a>` or `<button>` elements; the current page carries `aria-current="page"`.
    - Disabled previous/next/first/last buttons use the `disabled` attribute to communicate their unavailability.
    - **Page button labels** — page number buttons are labelled by their visible number, but Previous / Next / First / Last icon buttons must have descriptive `aria-label` values (e.g. `aria-label="Go to previous page"`) so screen readers announce their purpose.
    - **Ellipsis items** — the `…` markers are decorative and should be rendered with `aria-hidden="true"` so screen readers skip them rather than announcing "Ellipsis".
    - **Row-count summary** — the "1–10 of 142 results" text should have an appropriate `aria-live="polite"` region so screen readers announce the update when the page changes without requiring the user to re-read the entire bar.
    - **Page-size selector** — treat it as a labelled `<Select>` with an associated `<label>` (e.g. "Rows per page:") for screen reader context.
    - Pagination is built on native HTML elements and shadcn/ui primitives.

### SidebarNav

- **source:** `SidebarNav.mdx` · `SidebarNav.stories.tsx`
- **component tokens:** ~15 (`--component-sidebar-*`)
- **intent:** A SidebarNav provides persistent, hierarchical navigation for an application. It anchors the user's position within the product structure and makes top-level destinations accessible from any page. Use it in full application layouts where users navigate between multiple sections. Keep the sidebar focused — it should reflect the product's primary navigation structure, not surface every feature. Group items into labelled sections to communicate hierarchy without overwhelming the user.
- **expanded:**
    - The full-width sidebar with a logo, labelled navigation items, section titles, and a user footer. Labels and section titles are fully visible. Use this as the default state on desktop viewports with sufficient horizontal space.
    - Active items are visually distinguished to anchor the user. Badge counts on items (e.g. "Inbox · 4") surface urgent counts without requiring the user to navigate there first.
- **collapsed (icon rail):**
    - Collapses the sidebar to a narrow icon rail, hiding all text labels and section titles. Use on smaller viewports, or as a user preference for users who want to maximise content area. Ensure every icon is universally recognisable or pair with a tooltip on hover so navigation remains unambiguous without labels.
- **toggle (expandable):**
    - A user-controlled toggle button at the edge of the sidebar expands and collapses it between the full and icon-rail states. Use when both states are valuable and users should choose their preferred layout. Animate the transition so the collapse feels intentional rather than abrupt.
- **minimal (no section titles):**
    - A single flat list of items with no section groupings. Use when the navigation structure is shallow and sections would add visual noise without meaningful categorisation — for example, a simple five-item product with no sub-domains.
- **usage guidelines:**
    - Keep each section to a maximum of 5 items, and limit the sidebar to no more than 4 sections total. Beyond those thresholds the sidebar becomes a menu rather than navigation, and users lose their sense of where they are. Order sections by frequency of use so the destinations people visit most are closest to the top.
    - Settings always belongs in the last section, alone or paired with Billing. It is a low-frequency destination and should not compete visually with the primary navigation. The primary section — Overview, Inbox, and similar top-level destinations — should have no section title at all.
    - Badge counts signal pending items and unread content. Cap the displayed count at 99+ rather than showing the exact number, which becomes noise at scale. Never show a zero — remove the badge entirely when the count reaches zero. Always use the info (blue) variant for nav badges; red is reserved for errors, not quantities. Never badge the Settings or Overview items, as neither carries urgency.
- **accessibility:**
    - The outer element is a `<nav>` landmark, which screen readers expose as a navigation region.
    - Active items use `aria-current="page"` to identify the user's current location.
    - The collapse toggle button has `aria-expanded` to communicate the sidebar's open/closed state.
    - **Label the nav landmark** — if the page contains more than one `<nav>` element (e.g. a sidebar and a breadcrumb trail), give each a distinct `aria-label` (e.g. `aria-label="Main navigation"`) so screen reader users can distinguish them in the landmark list.
    - **Active state** — set `aria-current="page"` on the item matching the current route. Do not rely solely on visual highlight — screen readers use `aria-current` to announce which page is active.
    - **Collapsed state (icon rail)** — when text labels are hidden, each icon button must have an `aria-label` or a `<Tooltip>` with `aria-describedby` so keyboard users know which destination each icon represents.
    - **Badge counts** — the visual count inside a nav badge should be included in the item's accessible name (e.g. `aria-label="Inbox, 4 unread items"`) so screen readers announce the count as part of the navigation item rather than as a separate element.
    - SidebarNav renders as a `<nav>` landmark with each item as a native anchor or button element.

### Stepper

- **source:** `Stepper.mdx` · `Stepper.stories.tsx`
- **component tokens:** ~14 (`--component-stepper-*`)
- **intent:** A stepper guides users through a multi-step process with a clear indication of where they are, where they have been, and what remains. Use it for wizards, onboarding flows, checkout sequences, and any task that must be completed in a defined order across multiple screens.
- **default (horizontal):**
    - The horizontal stepper is the standard layout. Steps are connected by a line that transitions from solid blue for completed segments to dashed grey for upcoming ones. The current step's circle has a blue border and number; completed steps show a filled check icon; upcoming steps are grey and recessed.
    - The `StepperContent` component renders only when its `step` prop matches the `currentStep`, so each panel mounts only when it is active. `StepperActions` provides a standardised Back / Next / Submit row with correct disabled and loading states.
- **vertical:**
    - Use the vertical layout when the steps have descriptions, when there is room to run the progress indicator down the left side of a layout, or when the horizontal layout would be too compressed. The label and description sit to the right of each circle, and the connecting line runs vertically on the left.
- **four steps:**
    - The stepper scales from 3 to 6 steps. At 4 steps, the horizontal connector lines compress slightly but labels remain readable. If labels are long, switch to the vertical orientation or shorten the label to a noun phrase.
- **with validation:**
    - Validate each step before allowing the user to advance. Disable or withhold the Next button until the required conditions for that step are met, and surface inline error messages so the user knows exactly what is blocking progress. Do not collect all errors on the final step — validate as close to the point of entry as possible.
- **usage guidelines:**
    - Keep the number of steps between 3 and 6. Fewer than 3 steps do not need a stepper — a single form or a simple confirm dialog is sufficient. More than 6 steps should be restructured or split into separate flows. Label each step with a short noun phrase that names the task — "Billing", "Review", "Confirm" — not a verb phrase like "Enter your billing details". Always allow the user to go back and edit a previous step before submitting. Validate each step before advancing — do not surface all errors on the final step.
    - Allow navigation back to completed steps. Show completed steps as visually distinct from upcoming ones using the filled check icon and brand colour. Do not disable the Back button on the first step — hide it instead so the layout does not shift. Do not use a stepper for non-linear processes where the user can complete steps in any order — use a checklist or tabbed interface instead.
    - The Back button is always rendered as a ghost-style control so the primary action (Next or Submit) is visually dominant. On the last step, the primary button changes label to "Submit" — or a contextually specific label like "Publish" or "Send invite" — to communicate that clicking it will finalise the flow, not merely advance to another step.
- **accessibility:**
    - The stepper has `role="list"` with each step as `role="listitem"`. The current step has `aria-current="step"`. Completed steps include "completed" in their `aria-label` — for example, "Account details, completed". The step number and status together should be readable as a coherent sentence: "Step 1 of 3, Account details, completed".
    - `StepperActions` uses a `<nav>` element with `aria-label="Step navigation"`. The Back button has `aria-label="Go to previous step"`. The Next/Submit button describes what will happen: "Continue to step 2" or "Submit form", giving keyboard and screen reader users a clear understanding of the consequence before they act.
    - When a step has a validation error, the error message must be associated with the relevant field using standard label/input/error patterns. Do not announce the error only at the moment the user tries to advance — surface it at the input level so assistive technology reads the error in context.

### Tabs

- **source:** `Tabs.mdx` · `Tabs.stories.tsx`
- **component tokens:** ~10 (`--component-tabs-*`)
- **intent:** Tabs organise related content into distinct views, allowing users to switch between them without leaving the page. Use tabs when content can be cleanly grouped into mutually exclusive sections and users are likely to visit multiple sections. Do not use tabs to guide users through a sequence — use a stepper for that. Avoid tabs when there are fewer than two or more than seven items.
- **default:**
    - The standard horizontal tab strip. The active tab is visually distinguished from inactive tabs. All tab panels share the same container.
- **with a disabled tab:**
    - Use a disabled tab to indicate that a section exists but is currently unavailable — for example, content the user does not have permission to view, or a feature that is coming soon. Pair with a tooltip to explain the reason.
- **accessibility:**
    - The tab list renders with `role="tablist"`.
    - Each tab renders with `role="tab"`, `aria-selected`, and `aria-controls` linking it to its panel.
    - Each panel renders with `role="tabpanel"` and `aria-labelledby` linking it back to its tab.
    - `aria-disabled` is applied to disabled tabs.
    - **Disabled tabs** — pair every disabled tab with a `<Tooltip>` explaining why it is unavailable. A disabled tab is still rendered and visible, but keyboard users receive no feedback about the reason without one.
    - **Avoid using tabs for sequential flows** — the arrow-key navigation pattern implies that all tabs are equally reachable in any order. If the content must be completed in sequence, use a stepper pattern instead.
    - **Panel focus management** — if the tab panel contains no focusable elements, the panel itself must remain reachable via `Tab`. Radix ensures the panel has `tabIndex={0}` in this case, so do not override it to `-1`.
    - Tabs is built on Radix UI's `TabsPrimitive`, which implements the WAI-ARIA Tabs pattern in full.

## Overlays


### Context Menu

- **source:** `ContextMenu.mdx` · `ContextMenu.stories.tsx`
- **component tokens:** ~8 (`--component-context-*`)
- **intent:** A context menu surfaces a set of actions relevant to the element the user right-clicked. Use it when a set of contextual actions would clutter the UI if always visible — for example, file operations on a card, row-level actions in a table, or canvas operations in an editor. Keep menus short. If you have more than seven or eight items, group related actions with separators or move secondary actions into submenus. Place destructive actions (delete, remove) at the bottom, visually separated from safe actions.
- **with submenus:**
    - Use submenus to group a set of related destinations or options behind a single trigger item. Keep nesting to one level — deeper hierarchies are hard to navigate with a mouse and nearly impossible on touch.
- **with checkboxes and radio items:**
    - Checkbox items let users toggle boolean preferences in place. Radio groups let users switch between mutually exclusive modes without leaving the menu. Both variants persist state across menu open/close cycles.
- **usage guidelines:**
    - Trigger a context menu only via right-click (or a long press on touch). Do not also provide a visible trigger button — if the actions need to be discoverable, use a dropdown menu with an explicit trigger instead.
    - Label groups with a `ContextMenuLabel` when the items below the label need extra context. Omit the label when the group is self-evident from the items themselves.
- **accessibility:**
    - Opens on right-click (or the platform context-menu gesture); items expose `role="menuitem"`.
    - Focus moves into the menu on open and returns to the trigger on close.
    - `Escape` closes the menu.
    - **Provide a keyboard path** — a menu opened only by right-click is invisible to keyboard users; ensure `Shift+F10` works (Radix handles this) and that important actions also exist elsewhere.
    - **Label destructive items clearly** — and pair irreversible actions with confirmation, as elsewhere in the system.
    - **Supplement, do not hide** — a right-click menu should not be the only route to an important action.
    - ContextMenu is built on Radix UI's `ContextMenu`, which implements the WAI-ARIA menu pattern with correct roles, focus management, and dismissal.

### Dialog

- **source:** `Dialog.mdx` · `Dialog.stories.tsx`
- **component tokens:** ~9 (`--component-dialog-*`)
- **intent:** A dialog interrupts the user's flow to surface an action or information that requires their immediate attention. Use dialogs for confirmations, short forms, and destructive action gates. Keep dialogs focused — one topic, one decision. If the content requires scrolling or contains multiple steps, consider a Sheet or a dedicated page instead.
- **default:**
    - Use for simple confirmations where the user must explicitly acknowledge or proceed with an action. State the consequence clearly in the description.
- **with form:**
    - Use when a task requires input before it can be completed — for example, inviting a team member or creating a resource. Keep the form short; if more than 3–4 fields are needed, use a dedicated page or Sheet.
- **destructive:**
    - Use when the action being confirmed is irreversible — for example, permanently deleting a project or revoking access. Use a destructive variant button in the footer to visually reinforce the risk.
- **confirmation dialog:**
    - Use an `AlertDialog` when you need a system-enforced confirmation — unlike a regular Dialog, it cannot be dismissed by clicking outside or pressing Escape. Reserve this for truly irreversible actions where accidental dismissal would be harmful, such as deleting an account or removing a team.
    - Not all confirmations are destructive. Use a non-destructive confirmation dialog when an action is significant but reversible — for example, publishing to production or sending a bulk notification.
- **writing confirmation copy:**
    - The dialog title should name the specific thing being acted on, not the action itself. "Remove Priya Sharma from this workspace?" is correct; "Confirm removal?" tells the user nothing. Ask what is happening, not what the user is doing.
    - The body should state the exact consequence in one sentence, and add "This can't be undone." as a second sentence only when that is literally true. Keep the tone direct and specific — name counts, names, or scope where relevant, so the user can make a confident decision without re-reading.
    - The confirm button must use a specific verb and noun together, matching what will actually happen: "Delete project", "Remove member", or "Cancel subscription". Never use "Delete", "Confirm", or "Yes" alone — the button is the last thing the user reads before the action fires. The cancel button is always exactly "Cancel", nothing else.
    - Avoid the words "permanently", "forever", "irreversible", and "warning" in dialog copy. State the consequence directly instead — "can't be undone" carries the same meaning without the alarm that makes experienced users second-guess routine operations.
- **accessibility:**
    - The dialog panel renders with `role="dialog"` and `aria-modal="true"` (AlertDialog uses `role="alertdialog"`).
    - Focus moves into the dialog when it opens and returns to the trigger element when it closes.
    - Focus is trapped inside while the dialog is open — Tab and Shift+Tab cycle only through focusable elements within the panel.
    - Clicking the overlay or pressing `Escape` closes a regular Dialog (but not an AlertDialog, by design).
    - `DialogTitle` renders as an `aria-labelledby` target; `DialogDescription` renders as an `aria-describedby` target.
    - **Always include a `DialogTitle`** — it is the accessible name of the dialog. If you need a visually hidden title, use `<VisuallyHidden>` from Radix rather than omitting the element entirely.
    - **Always include a `DialogDescription`** — even if brief, it gives screen readers context about the dialog's purpose beyond the title.
    - **Initial focus** — by default, focus moves to the first focusable element. If the first element is a destructive action, set `autoFocus` on a safer element (e.g. the Cancel button) to avoid accidental activation.
    - **AlertDialog** — because it cannot be dismissed with `Escape`, use it only for truly irreversible actions. Trapping users in a dialog that cannot be escaped without an explicit decision is a significant friction point for keyboard users.
    - Dialog and AlertDialog are built on Radix UI's `DialogPrimitive` and `AlertDialogPrimitive`, which handle focus trapping, scroll locking, and ARIA roles automatically.

### Dropdown Menu

- **source:** `DropdownMenu.mdx` · `DropdownMenu.stories.tsx`
- **component tokens:** ~11 (`--component-dropdown-*`)
- **intent:** A dropdown menu reveals a list of actions or navigation items from a trigger element. Use dropdown menus for contextual actions that don't all need to be visible at once — for example, row actions in a table or a user account menu. Keep menus concise. If the list has more than seven or eight items, consider grouping or filtering.
- **default:**
    - Use for contextual object actions — edit, duplicate, delete. Group related actions with separators and place destructive actions (delete, remove) at the bottom of the list, visually separated from safe actions.
- **user menu:**
    - Use for account-level actions accessible from a persistent header or sidebar — profile, settings, log out. Include the user's name and email as a non-interactive label at the top to orient the user before they choose an action. Keyboard shortcuts can be shown alongside items for power users.
- **accessibility:**
    - The trigger renders with `aria-haspopup="menu"` and `aria-expanded`.
    - The menu renders with `role="menu"`; each item has `role="menuitem"` (or `"menuitemcheckbox"` / `"menuitemradio"` as appropriate).
    - Focus moves into the menu on open and returns to the trigger on close.
    - `aria-disabled` is applied to disabled items.
    - **Trigger label** — the trigger button must have a visible label or an `aria-label`. An icon-only trigger (e.g. a three-dot menu button) must have `aria-label="More actions"` or equivalent.
    - **Destructive items** — add `aria-label` to destructive items if the label alone is ambiguous (e.g. "Delete" could refer to multiple objects). Consider displaying the object name in the label.
    - **Keyboard shortcuts** — shortcut hints shown in the UI are purely visual; they do not automatically register keyboard handlers. Wire up the actual shortcut separately.
    - DropdownMenu is built on Radix UI's `DropdownMenuPrimitive`, which implements the WAI-ARIA Menu Button pattern with full keyboard support.

### Popover

- **source:** `Popover.mdx` · `Popover.stories.tsx`
- **component tokens:** ~6 (`--component-popover-*`)
- **intent:** A popover is a floating panel anchored to a trigger element. Use it to surface secondary actions, short forms, or contextual controls without navigating away or opening a full dialog. Unlike a tooltip, a popover is interactive — it can contain inputs, buttons, and other controls. It is dismissed by clicking outside or pressing Escape. If the content is purely informational and requires no interaction, use a Tooltip instead. If the content requires a decision or is critical to the flow, use a Dialog.
- **default:**
    - Use for quick settings or configuration that applies to a specific element in the UI — for example, editing display preferences for a view, or updating a single field inline.
- **filter popover:**
    - Use a popover to house filter controls in toolbars and table headers. This keeps the filter UI accessible without taking up permanent space in the layout. Include Clear and Apply actions so users can reset or confirm their selection.
- **accessibility:**
    - The trigger renders with `aria-haspopup="dialog"` and `aria-expanded`.
    - The panel renders with `role="dialog"`.
    - Focus moves into the panel when it opens and returns to the trigger when it closes.
    - Clicking outside or pressing `Escape` closes the popover.
    - **Panel label** — provide an `aria-label` or `aria-labelledby` on the `PopoverContent` so screen readers announce the panel's purpose when it opens (e.g. `aria-label="Filter options"`).
    - **Interactive content** — ensure all controls inside the popover have visible labels. Popovers are frequently used for quick forms; apply the same label and error-message requirements as standalone form fields.
    - **Close button** — if you include an explicit close button, give it an `aria-label="Close"` so its purpose is clear in isolation.
    - **Do not use for critical information** — if a user must read the content to complete a task, promote it to a Dialog or inline section.
    - Popover is built on Radix UI's `PopoverPrimitive`, which manages focus, ARIA state, and dismissal behaviour automatically.

### Tooltip

- **source:** `Tooltip.mdx` · `Tooltip.stories.tsx`
- **component tokens:** ~5 (`--component-tooltip-*`)
- **intent:** A tooltip surfaces a short, supplementary label when a user hovers over or focuses an element. Use tooltips to clarify the purpose of icon-only controls, reveal keyboard shortcuts, or provide brief definitions for terms that may be unfamiliar. Tooltips are not interactive and should not contain links, buttons, or multi-line instructions. For richer contextual content, use a Popover. Never put information in a tooltip that is critical to completing a task — it must be reachable without hovering.
- **default:**
    - A text label attached to any focusable trigger — typically a button or icon button. The tooltip appears on hover and keyboard focus and dismisses when the user moves away.
- **on icon:**
    - The most common pattern: a small info or help icon placed inline with a label or form field. The tooltip explains a constraint, limit, or term that would otherwise require inline documentation. Always include a visually hidden `sr-only` label on the icon for screen readers.
- **positions:**
    - Tooltips can be positioned on any side of their trigger — top, right, bottom, or left. The default is `top`. Use `right` or `left` when vertical space is constrained — for example, in a narrow sidebar. Use `bottom` when the tooltip would otherwise be obscured by a sticky header or the viewport edge.
- **accessibility:**
    - The tooltip content is linked to its trigger via `aria-describedby`, so screen readers announce it after the trigger's label.
    - The tooltip opens on hover and on keyboard focus — keyboard users receive the same information as pointer users without any extra work.
    - Pressing `Escape` dismisses the tooltip.
    - **Never put critical information only in a tooltip** — tooltip content is not accessible on touch-only devices, and users must hover or focus to see it. Any information required to complete a task must also appear inline.
    - **Icon-only triggers** — always add a visible or screen-reader label (`aria-label` or `<span className="sr-only">`) to the trigger element itself. The tooltip supplements the label but does not replace it.
    - **Do not put interactive elements inside a tooltip** — links, buttons, and form controls belong in a Popover. Tooltip content is announced as supplementary text, not as a focusable region.
    - **Delay** — the default open delay (400ms) helps avoid accidental triggers on hover. Do not reduce it to zero for permanent tooltips, as this causes tooltips to fire on every mouse pass-through.
    - Tooltip is built on Radix UI's `TooltipPrimitive`, which wires up `aria-describedby` between the trigger and the tooltip content automatically.

## Messaging


### Alert

- **source:** `Alert.mdx` · `Alert.stories.tsx`
- **component tokens:** ~38 (`--component-alert-*`)
- **intent:** An alert communicates a system-level message that the user should notice but doesn't require an immediate response. Use alerts to inform, warn, or confirm — not to prompt decisions (use a Dialog for that). Write alert copy following the three-part rule: **diagnose → explain → recover**. Tell users what happened, why it matters, and what they can do next.
- **variants:**
    - `Default` — Use for neutral, low-urgency system notices that don't map to a specific success/failure state — for example, scheduled maintenance or policy updates. No colour emphasis is applied.
    - `Info` — Use to provide helpful context or explanations that are not urgent — for example, permanent constraints ("workspace URL can't be changed"), onboarding hints, or feature explanations. Does not signal a problem.
    - `Success` — Use to confirm that a user-initiated action completed successfully — for example, settings saved or an invite sent. Set expectations by telling users what will happen next.
    - `Warning` — Use when an action has significant, hard-to-reverse consequences, or when a resource is approaching a limit. State what will happen, what the user should know, and offer an optional path forward.
    - `Error` — Use when something has failed and the user may need to take action to recover — for example, a failed API call, connection loss, or form submission error. Always give users a clear recovery path.
    - `Destructive` — Use when the warning is specifically about an irreversible action the user is about to take. Similar in tone to Warning but with higher visual urgency.
- **with dismiss action:**
    - Add a dismiss button when the alert is informational and the user may want to clear it from view — for example, a trial expiry notice or a one-time upgrade prompt. Do not make error or critical warning alerts dismissible without resolution.
    - Use the **icon button** (×) when screen space is tight or the alert sits alongside dense UI. Use the **link button** when there is enough breathing room and a labelled action reads more clearly.
- **accessibility:**
    - Use `role="status"` (or `aria-live="polite"`) for Info, Success, Warning, and Default alerts — the announcement waits for a pause in screen reader output.
    - Use `role="alert"` (or `aria-live="assertive"`) for Error and Destructive alerts — the announcement fires immediately, reflecting higher urgency.
    - **Static vs. dynamic alerts** — if the alert is present in the DOM on page load (not injected after a user action), `aria-live` regions do not fire. For static alerts, the content is read in normal document order, which is usually sufficient. Use live region attributes only on alerts that are dynamically injected.
    - **Dismiss button** — an icon-only dismiss button (×) must have `aria-label="Dismiss"` or equivalent so screen readers do not announce it as an unlabelled button.
    - **Do not make error alerts dismissible without resolution** — if a user dismisses a critical error via keyboard and has no way to recover the message, they lose their only recovery path. Require resolution before dismissal, or persist the error in a visible location.
    - **Icon + colour** — alert icons and background colour are redundant visual signals. Do not rely on them alone; the alert text must convey the severity (e.g. write "Error: …" in the title rather than relying on a red background that may not be visible to colour-blind users).
    - Alert renders with a semantic role that matches its urgency level so screen readers announce it at the right moment.

### System banner

- **source:** `SystemBanner.mdx` · `SystemBanner.stories.tsx`
- **component tokens:** ~12 (`--component-system-*`)
- **intent:** A system banner is a full-width notification that spans the top of the page, above the main content and below the application header. Use it for events that affect the entire session or account — scheduled maintenance, trial expiry warnings, degraded service, or successful bulk operations. It is not a replacement for inline Alert, which communicates field- or section-level feedback. The banner is always full width with no border-radius, sitting flush with the edges of the viewport. It contains an icon, a message, an optional call-to-action, and an optional dismiss button arranged in a single compact row.
- **info:**
    - Use the info variant for neutral, non-urgent notifications that affect the user's session. Maintenance windows, policy updates, and feature announcements with no required action are all appropriate uses. The info banner uses a polite `role="status"` so screen readers announce it at a natural pause rather than interrupting.
- **warning:**
    - Use the warning variant when something requires the user's attention but has not yet failed — a trial that is about to expire, approaching storage limits, or a configuration that needs review. Pair it with an action when there is a clear path forward. The warning banner uses `role="alert"` to announce assertively, reflecting the higher urgency.
- **error:**
    - Use the error variant when a service degradation or system failure is actively affecting the user's work. Include a link to a status page or support resource when available. Error banners also use `role="alert"` for immediate screen reader announcement. If the situation cannot be resolved by the user, omit the dismiss button so the banner persists until the issue clears.
- **success:**
    - Use the success variant to confirm that a significant account- or session-level operation has completed — for example, a successful data import or a version upgrade. Success banners are almost always dismissible because the information is transient. They use `role="status"` for polite announcement.
- **without dismiss:**
    - Omit `onDismiss` when the situation is outside the user's control and the banner should remain visible until the underlying condition changes — for example, an ongoing service outage. Persistent banners should be used sparingly; they lose their urgency if they appear too often or for too long.
- **usage guidelines:**
    - Show at most one system banner at a time. Dismissible banners should remember the user's preference for the session — do not re-show a dismissed banner on page navigation within the same session. Persistent banners (no dismiss) should only be used for situations the user cannot resolve themselves, such as a service outage. Never use a system banner for marketing messages or feature announcements; use a dedicated notification surface for those cases. Do use system banners for account- or session-level events that affect all users or the current account. Avoid stacking multiple banners — if two events occur simultaneously, show the higher severity one and queue the other.
- **accessibility:**
    - Info and success banners render with `role="status"`, which maps to an `aria-live="polite"` region. Warning and error banners render with `role="alert"`, which maps to `aria-live="assertive"` and interrupts the screen reader immediately. The dismiss button has `aria-label="Dismiss banner"` to ensure it is announced correctly by screen readers regardless of its icon-only appearance. All icons are marked `aria-hidden="true"` — the meaning of the banner is conveyed entirely through its text content and ARIA role, not its colour or icon.

### Toast

- **source:** `Toast.mdx` · `Toast.stories.tsx`
- **component tokens:** ~0 (`--component-toast-*`) ⚠️ none matched — check namespace
- **intent:** A toast is a brief, non-blocking notification that appears in response to a user action or system event. It disappears automatically after a short delay and does not require the user to dismiss it. Use toasts for confirmations, status updates, and low-urgency alerts. Do not use toasts for critical errors that require user action — use an Alert or Dialog instead.
- **variants:**
    - `Default` — Use for neutral, informational confirmations — for example, "Changes saved." Keep the message short and factual.
    - `Success` — Use to confirm that an action completed successfully — for example, "Project published" or "Deployment complete." Optionally pair with a description for more detail.
    - `Error` — Use when an action failed and the user should be aware — for example, "Failed to save changes." Keep the message actionable if recovery is possible.
    - `Warning` — Use for time-sensitive notices that may affect the user's session — for example, "Your session expires in 5 minutes."
    - `Info` — Use for neutral system updates that are helpful but not urgent — for example, "New version available."
    - `Loading` — Use when an async operation starts and the outcome will be communicated in a follow-up toast — for example, "Uploading file…". Replace with a success or error toast when the operation finishes.
- **with action:**
    - Add an action button (typically "Undo" or "View") when a quick reversal or follow-up is likely. Keep the action label very short — no more than two words.
- **with description:**
    - Add a description when the title alone doesn't give enough context — for example, "Version 2.4.1 is now live on production" under a "Deployment complete" title.
- **usage guidelines:**
    - Toasts auto-dismiss after 4 seconds by default — long enough to read a short sentence without demanding attention. Error toasts are an exception: they persist until the user explicitly dismisses them, because errors require acknowledgement. When a toast includes an undo action, keep it visible for 5–8 seconds to match the undo window and give the user time to react.
    - Always render toasts in the bottom-right corner. This placement keeps them out of primary content and away from form submission areas, so they never obscure an action the user is in the middle of taking.
    - Write toast titles as a plain statement of what happened, not a label for a state. "Settings saved" is correct; "Success!" is not. When a description is present, use the title for what happened and the description for what it means or what to do next — for example, a title of "Couldn't save changes" paired with a description of "Connection issue — check your network."
- **accessibility:**
    - Standard toasts render with `role="status"` and `aria-live="polite"` — the announcement waits for a pause in screen reader output so it doesn't interrupt the user mid-action.
    - Error toasts render with `role="alert"` and `aria-live="assertive"` — the announcement is immediate, reflecting the higher urgency.
    - **Keep titles short** — screen readers announce the full toast title; a long sentence mid-task is disruptive. Aim for six words or fewer.
    - **Action buttons** — if a toast includes an action (e.g. "Undo"), ensure the button has a meaningful label. "Undo" alone is acceptable when the preceding title makes the object clear; avoid standalone labels like "Do it" or "OK".
    - **Do not rely on toasts for critical errors** — `aria-live="assertive"` is still only announced when the screen reader is ready; it does not guarantee the user will catch it. Use an Alert component or an inline error message for errors that block task completion.
    - **Auto-dismiss timing** — the 4-second default gives most users time to read one short sentence. Do not reduce this; users relying on screen magnification or slower reading speeds need the full window. Error toasts that persist until dismissed are the right default — do not auto-dismiss them.
    - Toast is powered by Sonner, which renders notifications in a live region so screen readers announce them without requiring user focus.

## Loading


### Progress

- **source:** `Progress.mdx` · `Progress.stories.tsx`
- **component tokens:** ~4 (`--component-progress-*`)
- **intent:** A progress bar communicates how far through a multi-step process or timed operation the user is. Use it for uploads, installs, onboarding completions, or any measurable operation where showing percentage adds meaningful feedback. Do not use a progress bar for indeterminate operations — use a spinner or skeleton instead.
- **states:**
    - `0%` — The operation has not started. Consider only showing the bar once progress begins so it doesn't look stuck.
    - `In progress` — The bar fills proportionally as the operation advances. Pair with a label showing the numeric percentage or a status message like "Uploading… 45%".
    - `100%` — The operation is complete. Follow immediately with a success state or transition to the next step so users know they can proceed.
- **accessibility:**
    - Renders with `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, and `aria-valuemax="100"`.
    - Screen readers announce the current progress value when focus lands on the element or when the value changes.
    - **Label the progress bar** — provide an `aria-label` or `aria-labelledby` describing what is progressing (e.g. `aria-label="File upload progress"`). Without a label, screen readers announce only the numeric value with no context.
    - **`aria-valuetext`** — if `aria-valuenow` would read as a bare number, supplement it with `aria-valuetext` for a human-readable string (e.g. `"45% — Uploading file.zip"` or `"Step 2 of 5"`). This is especially useful for multi-step progress bars where percentage is less meaningful than step count.
    - **Completion** — when progress reaches 100%, update the label or provide a live region announcement so screen readers know the operation is done. Do not leave the bar at 100% silently.
    - Progress is built on Radix UI's `ProgressPrimitive`, which renders a `role="progressbar"` with the correct ARIA value attributes.

### Skeleton

- **source:** `Skeleton.mdx` · `Skeleton.stories.tsx`
- **component tokens:** ~3 (`--component-skeleton-*`)
- **intent:** A skeleton screen is a low-fidelity placeholder that mimics the layout of content while it loads. It reduces perceived wait time by showing structure immediately, rather than an empty space or a spinner. Use skeleton screens for any content that loads asynchronously — cards, tables, profiles, lists. Match the skeleton shape as closely as possible to the real content.
- **default:**
    - A single-line skeleton for a text snippet, label, or short value.
- **card skeleton:**
    - Mimics a card layout with a title placeholder and several lines of body text. Use while a card's data is being fetched — for example, a project summary card or a settings panel.
- **table skeleton:**
    - Mimics a table header and rows. Use while paginated or filtered table data is loading. Match the number of skeleton rows to the expected page size so the layout doesn't jump when real data arrives.
- **profile skeleton:**
    - Mimics a user row with a circular avatar and two lines of text (name + email or role). Use in assignee lists, member directories, and comment threads.
- **accessibility:**
    - **Hide from screen readers** — apply `aria-hidden="true"` to skeleton elements so they are skipped by screen readers entirely.
    - **Announce the loading state** — the container that holds the skeleton should carry `aria-busy="true"` while loading and switch to `aria-busy="false"` when real content replaces it. Optionally add `aria-label="Loading…"` to the container so screen readers can announce the in-progress state.
    - **Live region on completion** — when skeletons are replaced by real content, a screen reader user may not notice unless the update is announced. Wrap the container in `aria-live="polite"` so the new content is read when it appears.
    - **Do not animate indefinitely** — the pulsing animation should respect `prefers-reduced-motion`. Users who are sensitive to motion should see a static placeholder. Tailwind's `animate-pulse` class does not automatically honour this; add a `@media (prefers-reduced-motion: reduce)` override to remove the animation.
    - Skeleton screens are purely visual placeholders. They must be invisible to assistive technology so screen readers are not distracted by placeholder shapes.

### Spinner

- **source:** `Spinner.mdx` · `Spinner.stories.tsx`
- **component tokens:** ~6 (`--component-spinner-*`)
- **intent:** A spinner communicates that an operation is in progress. Use it to reassure users their action was received and the system is working. Keep spinners short-lived — if an operation takes more than a few seconds, consider a progress bar or skeleton instead.
- **variants:**
    - `Default` — A neutral gray arc. Use on white or light surfaces where no brand colour is needed.
    - `Brand` — A blue arc using the primary brand colour. Use when the spinner appears in a branded loading screen or alongside primary actions.
- **sizes:**
    - `sm (16 px)` — Use inline with text, inside buttons, or in tight table cells.
    - `md (24 px, default)` — The standard size for most loading states: page sections, form submissions, and dialogs.
    - `lg (32 px)` — Use for full-page or full-panel loading states where the spinner is the primary visual.
- **inline with text:**
    - Pair a `sm` spinner with a short status message to give users both a visual signal and a readable description of what is happening.
- **accessibility:**
    - `role="status"` creates a polite live region; the `aria-label` (e.g. "Loading") provides the accessible name.
    - The animated graphic itself carries no semantic meaning.
    - **Give it a meaningful label** — set the label to describe what is loading (e.g. "Loading results") rather than a generic "Loading".
    - **Do not trap focus** — a spinner is a status indicator, not an interactive element; it should not receive focus.
    - **Pair with text for long waits** — for waits beyond a couple of seconds, show visible text alongside.
    - **Respect reduced motion** — honour `prefers-reduced-motion` by reducing or replacing the spin animation.
    - The spinner renders with `role="status"` and an `aria-label`, so assistive tech announces loading without requiring focus.

## Imagery


### Avatar

- **source:** `Avatar.mdx` · `Avatar.stories.tsx`
- **component tokens:** ~12 (`--component-avatar-*`)
- **intent:** An avatar represents a person or entity — typically a user profile picture or their initials. Use avatars in headers, comment threads, assignee fields, and anywhere a face or identity marker adds useful context.
- **with image:**
    - Displays the user's profile photo. Always provide a fallback in case the image fails to load.
- **with fallback:**
    - Displays the user's initials when no image is available or the image fails to load. Use two characters (first and last initial) for the best legibility at small sizes.
- **avatar group:**
    - Stacks multiple avatars with a slight overlap to represent a group — for example, members of a project or participants in a conversation. Use a "+N" overflow avatar to indicate additional members that don't fit in the display.
- **accessibility:**
    - **Image avatars** — the underlying `<img>` requires an `alt` attribute. Use the person's name as the alt text (e.g. `alt="Priya Sharma"`). If the avatar is purely decorative (the name is displayed adjacent to it), pass `alt=""` to hide it from screen readers.
    - **Fallback avatars (initials)** — initials are rendered as visible text, but the container should also carry `aria-label` with the full name so screen readers announce "PS" as "Priya Sharma" rather than spelling out the letters.
    - **Avatar group** — the overflow "+N" avatar is decorative; wrap the group in an element with `aria-label` summarising all members (e.g. `aria-label="4 members: Priya Sharma, Jordan Lee, and 2 others"`).
    - **Clickable avatars** — if an avatar is a link to a profile, wrap it in an `<a>` with `aria-label="View Priya Sharma's profile"`. Do not use `onClick` on a bare `<div>`.
    - Avatar is built on Radix UI's `AvatarPrimitive`. It is a decorative element when used alongside a visible name, and an informative element when used alone.

## Pages


### Error pages

- **source:** `ErrorPages.mdx` · `ErrorPages.stories.tsx`
- **component tokens:** ~0 (`--component-error-*`) ⚠️ none matched — check namespace
- **intent:** Error pages replace the full application layout when a route cannot be rendered. They give users clear context about what went wrong and a reliable path back to safety. Three variants cover the most common failure states: page not found (404), server error (500), and planned maintenance.
- **404 not found:**
    - The 404 page appears when the requested URL doesn't match any known route. The large "404" numeral is rendered in a muted blue to signal a system state rather than a critical failure — the problem is navigational, not operational. Two actions give users a choice: return to a known-good page, or go back to where they came from.
- **500 server error:**
    - The 500 page appears when the server encounters an unhandled error. The red numeral signals higher severity than the 404. Copy explicitly acknowledges that the fault lies on the product side — "We're having trouble on our end" — which preserves user trust and removes any ambiguity about whether they did something wrong. The "contact support" link below the actions is a secondary escape hatch for cases where the error persists.
- **maintenance:**
    - The maintenance page is used for planned downtime. Unlike 404 and 500, there is no recovery action — the user cannot do anything to resolve the situation, so offering a button would be misleading. A wrench icon replaces the error number to distinguish this state visually as intentional and temporary. A time estimate sets an expectation and reduces the need for users to repeatedly check back.
- **usage guidelines:**
    - Always provide at least one actionable route out of an error page. The primary action should be the most likely recovery path — "Go to dashboard" for 404 and maintenance, "Try again" for 500. For server errors, reassure the user that the problem is on your side and that it has been noticed — do not ask them to report it. Maintenance pages should set an expectation with a time estimate wherever possible.
- **accessibility:**
    - Error pages should set the document title to reflect the error — "404 · Page not found" or "500 · Server error". The main content has `role="main"`. The error code and heading together describe the situation — do not rely on the number alone to communicate meaning. The large numeral carries `aria-hidden="true"` because the visible heading conveys the same information to screen readers.


---

## Extraction review flags

- None — all components parsed with intent and accessibility content.
