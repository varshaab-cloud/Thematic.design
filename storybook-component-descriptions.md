# Storybook Component Descriptions
> Copy these into the `parameters.docs.description` field (or as JSDoc above each story export) in your `.stories.tsx` files.

---

## Button
`Forms and input / Button`

A button triggers an action or event. Use buttons to let users know what will happen next, and choose a variant that matches the weight of the action.

### Variants

**Primary (default)**
Use a primary button for the most important action on a page or within a section — typically a form submission or the single key call to action. Only one primary button should appear per area; not every screen needs one.

**Secondary**
Use a secondary button alongside a primary button when a supporting action is needed. It carries less visual weight than primary, making the hierarchy clear at a glance.

**Outline**
Use an outline button for actions that are important but should not compete with a primary button. Common in toolbars, filter panels, and card footers where a lower-emphasis bordered style reads clearly against a white or subtle background.

**Ghost**
Use a ghost button in spaces where context already signals interactivity — toolbars, inline action menus, or groups of sibling buttons. Avoid using ghost buttons in isolation because they are not as obviously clickable as outlined or filled styles.

**Destructive**
Use a destructive button for irreversible or high-risk actions such as deleting data or revoking access. Pair it with a confirmation dialog to prevent accidental triggers.

**Link**
Use a link button when an action navigates the user somewhere and inline text styling is preferred. It behaves like a button semantically but looks like a hyperlink.

### States

**Default**
The resting, interactive state. The button is ready to receive focus and click events.

**Disabled**
Prevents interaction and signals that the action is not currently available. Always pair a disabled button with context explaining why — either nearby helper text or a tooltip.

**Loading**
Replaces the label with a spinner to communicate that an async operation is in progress. Use this to prevent double submissions and reassure users that their action was received.

### Sizes

**xs** — Use in dense UIs like table rows, inline chips, or compact toolbars.
**sm** — Use in sidebars, filter panels, or alongside small form inputs.
**Default** — The standard size. Use in most dialogs, forms, and page-level actions.
**lg** — Use for prominent hero or onboarding calls to action that need extra visual weight.

### Icon variants

**With leading icon** — Reinforces the label with a visual cue. Use for common actions (send, download, create) where the icon improves scannability.

**With trailing icon** — Signals navigation or progression (e.g. a right-arrow on a "Continue" button). Use sparingly so it doesn't compete with the label.

**Icon only** — Use when space is very constrained and the icon is universally understood. Always include an `aria-label` for screen-reader accessibility.

### Full width

Stretches the button to fill its container. Use in mobile layouts, card footers, or any context where a full-bleed action feels natural.

### Button group

Combines multiple outline buttons into a connected control (e.g. a segmented filter or view toggle). Remove the shared border and border-radius on inner buttons so they read as a single unit.

---

## Badge
`Data display / Badge`

A badge communicates a status, category, or count. It is always decorative and never interactive on its own. Use badges to help users quickly identify the state or type of an item without reading full text.

### Variants

**Default**
Use the default badge for general labels or categories that don't carry a specific semantic meaning — for example, feature tags or content types.

**Secondary**
A lower-emphasis label for supplementary metadata. Use when the badge needs to be present but should not draw strong attention.

**Outline**
Use an outline badge for neutral states like "Draft" or "Archived" where no colour is needed and the label alone is sufficient.

**Destructive**
Use sparingly to flag items that require immediate attention or are in a critical failure state. Prefer the error semantic variant for most failure states.

**Success**
Communicates a healthy, completed, or active state — for example "Deployed", "Active", or "Verified".

**Info**
Communicates a neutral informational state in progress — for example "Building", "Processing", or "Syncing".

**Warning**
Communicates a degraded or attention-required state — for example "Degraded", "Expiring soon", or "Pending approval".

**Error**
Communicates a failed or broken state — for example "Incident", "Failed", or "Rejected".

**Brand**
Use to highlight new features, promoted items, or branded labels. Use sparingly so it retains its attention-grabbing quality.

### With dot indicator

Add a status dot before the label when the badge is being used specifically as a real-time status indicator. The dot reinforces the semantic colour with an additional visual signal, useful in dashboards and monitoring tables where scanning speed matters.

### Sizes

**sm** — Use in compact table cells, tag lists, or inline within a sentence.
**md (default)** — Use in most contexts: cards, list items, filter chips.
**lg** — Use when the badge is a prominent piece of information that needs to stand on its own, such as a status pill on a detail page header.

---

## Alert
`Messaging / Alert`

An alert communicates a system-level message that the user should notice but doesn't require an immediate response. Use alerts to inform, warn, or confirm — not to prompt decisions (use a Dialog for that).

Write alert copy following the three-part rule: **diagnose → explain → recover**. Tell users what happened, why it matters, and what they can do next.

### Variants

**Default**
Use for neutral, low-urgency system notices that don't map to a specific success/failure state — for example, scheduled maintenance or policy updates. No colour emphasis is applied.

**Info**
Use to provide helpful context or explanations that are not urgent — for example, permanent constraints ("workspace URL can't be changed"), onboarding hints, or feature explanations. Does not signal a problem.

**Success**
Use to confirm that a user-initiated action completed successfully — for example, settings saved or an invite sent. Set expectations by telling users what will happen next.

**Warning**
Use when an action has significant, hard-to-reverse consequences, or when a resource is approaching a limit. State what will happen, what the user should know, and offer an optional path forward.

**Error**
Use when something has failed and the user may need to take action to recover — for example, a failed API call, connection loss, or form submission error. Always give users a clear recovery path.

**Destructive**
Use when the warning is specifically about an irreversible action the user is about to take. Similar in tone to Warning but with higher visual urgency.

### With dismiss action

Add a dismiss button when the alert is informational and the user may want to clear it from view — for example, a trial expiry notice or a one-time upgrade prompt. Do not make error or critical warning alerts dismissible without resolution.

---

## Input
`Forms and input / Input`

An input lets users enter short, free-form text. Use inputs for single-line data entry like names, email addresses, search queries, or configuration values.

### States

**Default**
The resting state. The input is ready to receive focus and keyboard input.

**Disabled**
The input cannot be interacted with. Use when the field exists in the layout but the current context or permissions prevent editing. Always provide helper text explaining why it is locked.

**Error**
Triggered by failed validation. The error message replaces or supplements the helper text and appears immediately below the input. Write error messages that are specific and actionable — "Please enter a valid email address" rather than "Invalid input".

**Success**
Triggered when validation passes on a field where confirmation adds value — for example, checking that a username is available. Use success state deliberately; not every valid input needs a success indicator.

### Labels and helper text

**With label** — Always include a visible label for accessibility. Do not rely on placeholder text alone.

**Required** — Add a required indicator when the field must be completed before a form can be submitted. Pair with helper text to communicate the expectation clearly.

**With helper text** — Use helper text beneath the input to provide format guidance, constraints, or context — for example, "Must be 3–20 characters".

### Icons

**With prefix icon** — Use a leading icon to reinforce the purpose of the field (e.g. a search icon in a search input, a lock icon in a password field). Icons should add clarity, not decoration.

**With suffix icon** — Use a trailing icon for toggleable or supplementary actions — for example, a show/hide toggle on a password field.

**With both icons** — Use when both a contextual prefix and an interactive suffix are needed. Avoid overloading an input with icons if it adds visual noise without functional value.

### Character count

Shows a live counter of characters remaining. Use on fields with a strict character limit — for example, a bio or short description. The counter turns to an error state when the limit is reached.

### Sizes

**sm** — Use in compact forms, table inline-editing, or dense filter panels.
**md (default)** — The standard input size for most forms and dialogs.
**lg** — Use on focused, single-action pages such as a prominent search bar or an onboarding step.

---

## Textarea
`Forms and input / Textarea`

A textarea lets users enter longer, multi-line text. Use it for descriptions, notes, comments, and any free-form content where a single line would be insufficient.

### States

**Default**
The resting state. The textarea is ready for input.

**Disabled**
The field cannot be edited. Use when content is read-only in the current context — for example, a record locked by an admin. Provide helper text or a tooltip explaining the reason.

**Error**
Triggered by validation failure. Use a specific error message so users know exactly what to fix — for example, "Description is required" rather than "Required field".

**Success**
Triggered when content passes validation. Use when confirming well-formed content provides meaningful reassurance — for example, a correctly formatted code snippet.

### Additional features

**With helper text** — Use to set expectations about the content: tone, format, or audience. For example, "Visible to all team members."

**With character count** — Shows remaining characters when there is a maximum limit. Useful for bios, tweet-style summaries, or SMS copy.

**Required** — Marks the field as mandatory. Pair with clear placeholder text so users know what kind of content is expected.

**Auto-resize** — The textarea grows in height as the user types, removing the need to scroll within a fixed box. Use for open-ended content where the length is unpredictable.

---

## Checkbox
`Forms and input / Checkbox`

A checkbox lets users select or deselect a single option independently. Use checkboxes in forms, settings, and list selections where multiple items can be chosen simultaneously.

### States

**Default (unchecked)**
The resting, unselected state. The checkbox is ready for interaction.

**Checked**
The user has selected this option. The check icon confirms the selection visually.

**Disabled**
The checkbox cannot be interacted with. Use when an option is unavailable in the current context. If the option is checked and disabled, it shows a confirmed but locked selection — for example, a required permission that cannot be removed.

**Checked + disabled**
Represents a selection that is confirmed but cannot be changed — for example, an always-on feature or a plan constraint.

### With label

Always associate a visible text label with a checkbox using a `<label>` element. The label extends the click target, improves accessibility, and explains what the user is agreeing to or selecting.

---

## Switch
`Forms and input / Switch`

A switch toggles a single setting between an on and off state. Use a switch when the change takes effect immediately without requiring a form submission — for example, enabling notifications or activating dark mode.

If the setting requires a save action to take effect, use a checkbox instead.

### States

**Default (off)**
The resting, inactive state. The setting is currently disabled.

**Checked (on)**
The setting is active. The thumb moves to the right and the track changes colour to communicate the active state.

**Disabled**
The switch cannot be toggled. Use when the setting is locked in the current context — for example, a plan feature that requires an upgrade.

**Checked + disabled**
The setting is active but cannot be changed — for example, a security policy enforced at the workspace level.

### With label

Always pair a switch with a visible label that describes what will happen when it is toggled. The label should describe the on-state of the feature ("Enable notifications", "Dark mode") so users understand the outcome before they interact.

---

## Select
`Forms and input / Select`

A select lets users choose one option from a predefined list. Use a select when there are more than four options and the choices are known in advance. For fewer options, consider a radio group. For free-text with suggestions, consider a combobox.

### States

**Default**
The resting state. The trigger shows the placeholder until a value is chosen.

**Error**
Triggered when no value has been selected but one is required, or when the selected value is no longer valid. The error message appears below the trigger.

**Success**
Signals that the selected value is valid — useful when the selection has side effects that can be confirmed immediately (e.g. a plan selection that shows pricing feedback).

**Disabled**
The select cannot be opened. Use when the options are unavailable in the current context. Always provide helper text explaining the constraint.

### Additional features

**With groups** — Use `SelectGroup` and `SelectLabel` to visually organise a long list into labelled sections — for example, grouping team members by department or assets by category.

**Required** — Marks the field as mandatory in a form. Pair with helper text to set expectations.

### Sizes

**sm** — Use in compact form layouts or as an inline control within a table row or toolbar.
**Default** — Use in standard forms, settings panels, and dialogs.

---

## Tabs
`Navigation / Tabs`

Tabs organise related content into distinct views, allowing users to switch between them without leaving the page. Use tabs when content can be cleanly grouped into mutually exclusive sections and users are likely to visit multiple sections.

Do not use tabs to guide users through a sequence — use a stepper for that. Avoid tabs when there are fewer than two or more than seven items.

### Default

The standard horizontal tab strip. The active tab is visually distinguished from inactive tabs. All tab panels share the same container.

### With a disabled tab

Use a disabled tab to indicate that a section exists but is currently unavailable — for example, content the user does not have permission to view, or a feature that is coming soon. Pair with a tooltip to explain the reason.

---

## Dialog
`Overlays / Dialog`

A dialog interrupts the user's flow to surface an action or information that requires their immediate attention. Use dialogs for confirmations, short forms, and destructive action gates.

Keep dialogs focused — one topic, one decision. If the content requires scrolling or contains multiple steps, consider a Sheet or a dedicated page instead.

### Default

Use for simple confirmations where the user must explicitly acknowledge or proceed with an action. State the consequence clearly in the description.

### With form

Use when a task requires input before it can be completed — for example, inviting a team member or creating a resource. Keep the form short; if more than 3–4 fields are needed, use a dedicated page or Sheet.

### Destructive

Use when the action being confirmed is irreversible — for example, permanently deleting a project or revoking access. Use a destructive variant button in the footer to visually reinforce the risk.

---

## Accordion
`Data display / Accordion`

An accordion reveals or hides sections of content on demand. Use it to present a long list of items where most users will only need a subset — for example, FAQs, settings categories, or feature details.

Avoid using accordion when all sections are equally important and users are likely to read them in sequence — flat content is easier to scan.

### Single

Only one item can be open at a time. Expanding a new item automatically collapses the previous one. Use single-type accordions when sections are mutually exclusive or when vertical space is constrained.

### Multiple

Multiple items can be open simultaneously. Use when sections are independent and users are likely to compare or reference content from several sections at once — for example, a settings panel with unrelated categories.

---

## Toast
`Messaging / Toast`

A toast is a brief, non-blocking notification that appears in response to a user action or system event. It disappears automatically after a short delay and does not require the user to dismiss it. Use toasts for confirmations, status updates, and low-urgency alerts.

Do not use toasts for critical errors that require user action — use an Alert or Dialog instead.

### Variants

**Default**
Use for neutral, informational confirmations — for example, "Changes saved." Keep the message short and factual.

**Success**
Use to confirm that an action completed successfully — for example, "Project published" or "Deployment complete." Optionally pair with a description for more detail.

**Error**
Use when an action failed and the user should be aware — for example, "Failed to save changes." Keep the message actionable if recovery is possible.

**Warning**
Use for time-sensitive notices that may affect the user's session — for example, "Your session expires in 5 minutes."

**Info**
Use for neutral system updates that are helpful but not urgent — for example, "New version available."

**Loading**
Use when an async operation starts and the outcome will be communicated in a follow-up toast — for example, "Uploading file…". Replace with a success or error toast when the operation finishes.

### With action

Add an action button (typically "Undo" or "View") when a quick reversal or follow-up is likely. Keep the action label very short — no more than two words.

### With description

Add a description when the title alone doesn't give enough context — for example, "Version 2.4.1 is now live on production" under a "Deployment complete" title.

---

## Avatar
`Imagery / Avatar`

An avatar represents a person or entity — typically a user profile picture or their initials. Use avatars in headers, comment threads, assignee fields, and anywhere a face or identity marker adds useful context.

### With image

Displays the user's profile photo. Always provide a fallback in case the image fails to load.

### With fallback

Displays the user's initials when no image is available or the image fails to load. Use two characters (first and last initial) for the best legibility at small sizes.

### Avatar group

Stacks multiple avatars with a slight overlap to represent a group — for example, members of a project or participants in a conversation. Use a "+N" overflow avatar to indicate additional members that don't fit in the display.

---

## Dropdown Menu
`Overlays / DropdownMenu`

A dropdown menu reveals a list of actions or navigation items from a trigger element. Use dropdown menus for contextual actions that don't all need to be visible at once — for example, row actions in a table or a user account menu.

Keep menus concise. If the list has more than seven or eight items, consider grouping or filtering.

### Default

Use for contextual object actions — edit, duplicate, delete. Group related actions with separators and place destructive actions (delete, remove) at the bottom of the list, visually separated from safe actions.

### User menu

Use for account-level actions accessible from a persistent header or sidebar — profile, settings, log out. Include the user's name and email as a non-interactive label at the top to orient the user before they choose an action. Keyboard shortcuts can be shown alongside items for power users.

---

## Slider
`Forms and input / Slider`

A slider lets users select a value or range by dragging a thumb along a track. Use sliders for continuous or step-based values where approximate input is acceptable — for example, volume, opacity, price range, or a confidence threshold.

For precise numeric input, use an Input field instead of or alongside a slider.

### Default

A single-thumb slider for selecting one value within a defined range. Display the current value next to the label so users always know what they have selected.

### Range

A two-thumb slider for selecting a minimum and maximum value — for example, a price range or a date window. Both thumbs are independently draggable. Display both current values.

### With steps

Snaps to discrete values along the track — for example, priority levels (Low, Medium, High) or specific percentages (0, 25, 50, 75, 100). Format the displayed value to match the step labels.

### Disabled

The thumb cannot be moved. Use when the value is determined by the system or another setting — for example, a storage usage indicator on a read-only plan summary.

### With helper text

Use helper text to explain the effect of the slider value — for example, "Predictions below this score will be flagged for review." This is especially useful for non-obvious settings like confidence thresholds or compression levels.

---

## Progress
`Loading / Progress`

A progress bar communicates how far through a multi-step process or timed operation the user is. Use it for uploads, installs, onboarding completions, or any measurable operation where showing percentage adds meaningful feedback.

Do not use a progress bar for indeterminate operations — use a spinner or skeleton instead.

**0%** — The operation has not started. Consider only showing the bar once progress begins so it doesn't look stuck.

**In progress** — The bar fills proportionally as the operation advances. Pair with a label showing the numeric percentage or a status message like "Uploading… 45%".

**100%** — The operation is complete. Follow immediately with a success state or transition to the next step so users know they can proceed.

---

## Skeleton
`Loading / Skeleton`

A skeleton screen is a low-fidelity placeholder that mimics the layout of content while it loads. It reduces perceived wait time by showing structure immediately, rather than an empty space or a spinner.

Use skeleton screens for any content that loads asynchronously — cards, tables, profiles, lists. Match the skeleton shape as closely as possible to the real content.

### Default

A single-line skeleton for a text snippet, label, or short value.

### Card skeleton

Mimics a card layout with a title placeholder and several lines of body text. Use while a card's data is being fetched — for example, a project summary card or a settings panel.

### Table skeleton

Mimics a table header and rows. Use while paginated or filtered table data is loading. Match the number of skeleton rows to the expected page size so the layout doesn't jump when real data arrives.

### Profile skeleton

Mimics a user row with a circular avatar and two lines of text (name + email or role). Use in assignee lists, member directories, and comment threads.
