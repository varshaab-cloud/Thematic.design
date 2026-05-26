# Storybook Component Descriptions
> Copy these into the `parameters.docs.description` field (or as JSDoc above each story export) in your `.stories.tsx` files.

---

## Card
`Data display / Card`

A card groups related content and actions into a contained, scannable unit. Use cards to present discrete items — a user profile, a metric, a project summary — where each item needs visual separation from its neighbours.

Cards are layout containers, not interactive elements in themselves. If the entire card is clickable, apply a hover state and ensure it has an accessible role and label.

### Default

The base card with a header, content area, and optional footer. Use for any grouped content that needs a title, supporting description, and one or more actions. The footer holds the card's primary and secondary actions — keep it to two buttons at most.

### With action (header action)

Places a secondary action — typically a small button or badge — in the top-right corner of the card header. Use for contextual shortcuts that relate to the card's subject without being the card's primary CTA: an "Invite" button on a team card, a settings link on a project card, or a live status badge on a deployment card.

### Small (compact)

A reduced-padding variant for dense layouts such as sidebars, dashboards with many tiles, or stacked lists. Use when cards need to fit comfortably in a constrained grid without competing with each other for space.

### Status card

Combines a header action badge with semantic badge pills in the content area. Use to communicate the real-time health or state of a system, deployment, or resource at a glance. Keep the content scannable — favour badges and short labels over prose.

---

### MetricCard
`Data display / Card → MetricCard`

A MetricCard is a specialised card for displaying a single KPI with its trend direction. Use metric cards in dashboards and summary pages where users need to quickly read a key number and understand whether it is moving in the right direction.

Always show a trend label so the comparison period is clear ("vs last month", "vs last week"). Never show a trend without a reference point.

### Default

Displays a label, a large value, and a trend indicator. Use for any quantitative metric where the absolute value and its direction both matter.

### Brand

Use the brand variant to highlight your most important or signature metric — typically the primary business KPI on a dashboard header.

### Success

Use the success variant when the metric value represents a healthy or target-exceeding outcome and you want to reinforce that positively.

### Warning

Use the warning variant when the metric value is trending in the wrong direction or approaching a threshold that requires attention. Combine with a downward trend indicator.

### Trend: up / down / neutral

The trend indicator (arrow + percentage) communicates direction relative to the comparison period. Use "up" for improvement, "down" for decline, and "neutral" when there is no meaningful change. Choose whether "up" is good or bad based on the metric — churn going up is bad; revenue going up is good — and apply the card variant accordingly.

### Dashboard grid

Arrange metric cards in a responsive grid (typically 2–4 columns) at the top of a dashboard. Group related metrics together and maintain consistent comparison periods across all cards on the same view.

---

## DataTable
`Data display / DataTable`

A DataTable is a full-featured data grid for displaying, searching, sorting, and paginating structured datasets. Use it when users need to browse, find, or act on records — team members, transactions, issues, orders.

Prefer DataTable over a plain Table when the dataset has more than one page of results, requires sorting or filtering, or when users need to select and act on multiple rows at once.

### Default

Displays the dataset with search, sorting, and pagination built in. The search bar filters across visible columns in real time. Column headers are sortable on click. Pair each row with an actions menu for row-level operations.

### With row selection

Adds a checkbox column to allow users to select one or more rows. Use when users need to perform bulk actions — delete, export, reassign. Show a bulk-action bar or toolbar when one or more rows are selected.

### With column toggle

Adds a column visibility control that lets users show or hide columns. Use for tables with many columns where different users care about different fields. The toggle remembers user preferences within the session.

### Loading (skeleton)

Displays skeleton rows while data is being fetched. Match the number of skeleton rows to the expected page size so the layout doesn't reflow when real data arrives. Always show the search bar and table header during loading so the structure is immediately understood.

### Empty state (default)

Shown when the dataset is genuinely empty — no records exist yet. Use a simple, centred message. Keep the tone constructive rather than diagnostic.

### Custom empty state

Use a custom empty state when the context calls for a more specific message and a clear next action — for example, "No team members yet" with an "Invite member" button. Match the icon and copy to the domain so the state feels intentional rather than generic.

---

## Table
`Data display / Table`

A Table is a lightweight, static data display for small, stable datasets that don't require sorting, filtering, or pagination. Use it for reference data, comparison layouts, settings summaries, and read-only records.

When the dataset is dynamic, paginated, or needs row actions, use DataTable instead.

### Default

A standard table with a header row and data rows. Use semantic column headers to describe each column clearly. Place row-level actions (Edit, Delete) in a trailing cell using ghost buttons to keep the table visually clean.

### Simple table

A minimal two-column layout for key–value reference data — for example, design tokens, configuration values, or specification tables. No actions needed; the value of each row speaks for itself.

---

## RadioGroup
`Forms and input / RadioGroup`

A radio group lets users select exactly one option from a set. Use radio groups when the choices are mutually exclusive and all options should be visible at once — for example, selecting a role, a billing cycle, or an access level.

Use a [Select](https://thematic-design-ame0o472q-varshaab-clouds-projects.vercel.app/?path=/docs/forms-and-input-select--docs) when there are more than five or six options and screen space is constrained. Use a [Checkbox](https://thematic-design-ame0o472q-varshaab-clouds-projects.vercel.app/?path=/docs/forms-and-input-checkbox--docs) when multiple items can be selected simultaneously.

### Default

A vertical list of options with a shared group label. Each item has a radio control and a text label. The selected option is visually distinguished by the filled radio button.

### With descriptions

Each option includes a supporting description beneath the label. Use when the options are non-obvious or have meaningfully different consequences — for example, access level tiers ("Can view all projects but cannot make changes"). Descriptions help users make an informed choice without needing to leave the page for documentation.

### With disabled item

One or more options are unavailable in the current context — for example, a plan tier that requires a sales conversation, or a role that requires additional permissions. Show the option so users know it exists, and pair it with a description explaining how to unlock it.

### All disabled

The entire group is non-interactive. Use when the selection is determined by the system or another setting — for example, showing a locked plan configuration on a read-only billing page.

### Horizontal

Lays the options out in a row. Use for short, visually compact option sets — sizes, time intervals, or simple A/B choices — where the options are brief enough to read comfortably side by side.

---

## Tooltip
`Overlays / Tooltip`

A tooltip surfaces a short, supplementary label when a user hovers over or focuses an element. Use tooltips to clarify the purpose of icon-only controls, reveal keyboard shortcuts, or provide brief definitions for terms that may be unfamiliar.

Tooltips are not interactive and should not contain links, buttons, or multi-line instructions. For richer contextual content, use a Popover. Never put information in a tooltip that is critical to completing a task — it must be reachable without hovering.

### Default

A text label attached to any focusable trigger — typically a button or icon button. The tooltip appears on hover and keyboard focus and dismisses when the user moves away.

### On icon

The most common pattern: a small info or help icon placed inline with a label or form field. The tooltip explains a constraint, limit, or term that would otherwise require inline documentation. Always include a visually hidden `sr-only` label on the icon for screen readers.

### Positions (top / right / bottom / left)

Tooltips can be positioned on any side of their trigger. The default is `top`. Use `right` or `left` when vertical space is constrained — for example, in a narrow sidebar. Use `bottom` when the tooltip would otherwise be obscured by a sticky header or the viewport edge.

---

## Pagination
`Navigation / Pagination`

Pagination splits a large dataset across multiple pages and gives users controls to move between them. Use pagination on any list or table where showing all records at once would hurt performance or readability.

Always show the total record count and the current page context ("1–10 of 142 members") so users always know where they are in the dataset.

### Default

The standard pagination bar with previous/next controls, numbered page buttons, a row-count summary, and a page-size selector. Use this in most table and list contexts.

### First page

On the first page, the Previous and First buttons are disabled but remain visible. Never hide navigation controls — hiding them causes layout shifts and disorientation when the user reaches the boundary.

### Last page

On the last page, the Next and Last buttons are disabled. The row-count summary adjusts to reflect the final page's actual record count, which may be fewer than the selected page size.

### Many pages (with ellipsis)

When the total number of pages exceeds the display threshold, the middle of the page range collapses into ellipsis markers (…), keeping the first, last, and pages surrounding the current page always visible. This prevents the pagination bar from becoming too wide on large datasets.

### Small dataset (≤7 pages)

When the total pages fall within the display threshold, all page numbers are shown without ellipsis. No truncation is applied.

### Single page

When all records fit on one page, all navigation controls are disabled. The row-count summary still shows the total number of records so the user understands why navigation is unavailable.

### No page size selector

Use when the page size is fixed by the application or context and the user should not be able to change it — for example, a fixed-length feed or an export preview.

### Empty (zero rows)

When there are no records, the pagination bar shows zero-state counts and disables all controls. Use this state alongside an empty state message in the table or list above it.

---

## SidebarNav
`Navigation / SidebarNav`

A SidebarNav provides persistent, hierarchical navigation for an application. It anchors the user's position within the product structure and makes top-level destinations accessible from any page. Use it in full application layouts where users navigate between multiple sections.

Keep the sidebar focused — it should reflect the product's primary navigation structure, not surface every feature. Group items into labelled sections to communicate hierarchy without overwhelming the user.

### Expanded

The full-width sidebar with a logo, labelled navigation items, section titles, and a user footer. Labels and section titles are fully visible. Use this as the default state on desktop viewports with sufficient horizontal space.

Active items are visually distinguished to anchor the user. Badge counts on items (e.g. "Inbox · 4") surface urgent counts without requiring the user to navigate there first.

### Collapsed (icon rail)

Collapses the sidebar to a narrow icon rail, hiding all text labels and section titles. Use on smaller viewports, or as a user preference for users who want to maximise content area. Ensure every icon is universally recognisable or pair with a tooltip on hover so navigation remains unambiguous without labels.

### Toggle (expandable)

A user-controlled toggle button at the edge of the sidebar expands and collapses it between the full and icon-rail states. Use when both states are valuable and users should choose their preferred layout. Animate the transition so the collapse feels intentional rather than abrupt.

### Interactive (active state)

Navigation items respond to clicks by updating the active state. Only one item should be active at a time, reflecting the user's current location. Use `onClick` handlers to sync the active item with the router or application state.

### Minimal (no section titles)

A single flat list of items with no section groupings. Use when the navigation structure is shallow and sections would add visual noise without meaningful categorisation — for example, a simple five-item product with no sub-domains.
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

A checkbox lets users select or deselect a single option independently. Use checkboxes in forms, settings, and list selections where multiple items can be chosen simultaneously. For mutually exclusive choices where only one option should be selected at a time, use a [RadioGroup](https://thematic-design-ame0o472q-varshaab-clouds-projects.vercel.app/?path=/docs/forms-and-input-radiogroup--docs) instead. For choosing from a long list of options, use a [Select](https://thematic-design-ame0o472q-varshaab-clouds-projects.vercel.app/?path=/docs/forms-and-input-select--docs).

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

A select lets users choose one option from a predefined list. Use a select when there are more than four options and the choices are known in advance. For fewer options, consider a [RadioGroup](https://thematic-design-ame0o472q-varshaab-clouds-projects.vercel.app/?path=/docs/forms-and-input-radiogroup--docs). For free-text with suggestions, consider a [Combobox](https://thematic-design-ame0o472q-varshaab-clouds-projects.vercel.app/?path=/docs/forms-and-input-combobox--docs).

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
