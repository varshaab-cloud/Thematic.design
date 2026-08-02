# DESIGN.generated.md — Thematic.design

> **Generated file — do not edit by hand.** Regenerate with `node scripts/design-index.cjs`.
> Token namespaces and relationships are derived from source, so they cannot drift
> from the system. Prose fields are lifted verbatim from each component's `.mdx`.

> Coverage: **54 components** · **1607 tokens** defined in `tokens.css`.

---

## AgentStatus / ToolCall

- **source:** `AIAgentStatus.mdx` · `AIAgentStatus.stories.tsx` · `components/ui/agent-status.tsx`
- **component tokens:** 7 (`--component-agentstatus-*`)
- **intent:** Shows what the assistant is doing between when a user sends a message and when the response arrives. Honest, specific labels are required — never use "Working on it…" or "Please wait".
- **avoid:** Do not use AgentStatus for simple text generation — the streaming cursor in MessageBubble is sufficient. Reserve AgentStatus for operations that involve tool calls or extended reasoning phases.
- **accessibility:** - Uses `role="status"` with `aria-live="polite"` and `aria-atomic="true"` so the label is announced when it changes. - The label must be human-readable and specific. Screen-reader users rely on this announcement to understand what the assistant is doing. - The spinner is `aria-hidden="true"` — only the text label is announced. - The expand toggle uses `aria-expanded` and `aria-label` ("Show details" / "Hide details"). - Error state uses error surface tokens and an alert icon — never only colour.

## ChatInput (Composer)

- **source:** `AIChatInput.mdx` · `AIChatInput.stories.tsx` · `components/ui/chat-input.tsx`
- **component tokens:** 23 (`--component-composer-dimension-*` · `--component-attachment-dimension-*` · `--component-attachment-color-*` · `--component-composer-color-*` · `--component-voice-color-*`)
- **intent:** The multimodal message entry area. Supports text, image, file/document, and voice input. A single Send/Stop control flips state while the assistant is generating so users can always cancel.
- **composes:** Button · Tooltip
- **accessibility:** - The textarea has `aria-label="Message input"`, `aria-multiline="true"`, and `aria-invalid` when in error/over-limit state. - Character count is wrapped in `aria-live="polite" aria-atomic="true"` so screen readers announce the count as users type. - The Stop button is always keyboard-reachable (never disabled while streaming); labelled "Stop generating". - The hidden file `<input>` is `aria-hidden="true"` and `tabIndex={-1}` — never in the focus order. - Mic button uses `aria-pressed` to convey recording state; `aria-label` changes to "Stop recording" while active. - Error messages use `role="alert"` for immediate announcement.

## MessageBubble

- **source:** `AIMessageBubble.mdx` · `AIMessageBubble.stories.tsx` · `components/ui/message-bubble.tsx`
- **component tokens:** 13 (`--component-message-*`)
- **intent:** A single conversational turn. MessageBubble renders one message from a `user`, `assistant`, or `system`. It handles streaming state, error state, and edited labels so the consumer only needs to pass props.
- **composes:** Avatar
- **variants:**
    - `assistant` — Left-aligned with avatar. Uses the secondary surface to keep visual weight low; the user's bubble anchors attention.
    - `user` — Right-aligned. Uses the brand fill colour to clearly distinguish the user's turn from the assistant's.
    - `system` — Centred, full-width, italic notice. Used for conversation housekeeping ("Context cleared", "New session started"). Does not render an avatar.
- **states:**
    - `Streaming` — Appends an animated blinking cursor after the last character while `isStreaming={true}`. The cursor is `aria-hidden`; the live region wrapping the message thread announces new tokens.
    - `Error` — Applies error surface and foreground tokens; prepends a warning icon. Always show a clear, actionable message — never just "Error".
    - `Edited` — Adds an "edited" label and optional timestamp in the message footer. Shown after a user edits and resends a message.
- **composition:** MessageBubble renders an Avatar internally. Pass `avatarSrc` for a real photo and `avatarFallback` for initials. For the assistant, the default fallback is "AI"; for the user, "You".
- **accessibility:** - The message bubble itself does not set `aria-live`. Wrap the **full message thread** in `role="log"` with `aria-live="polite"` and `aria-atomic="false"` so screen readers announce new tokens as they arrive — never the whole thread. - Batch announcements: debounce the live region update to every 2–4 seconds during streaming so screen readers are not flooded per token. - The **streaming cursor** is `aria-hidden="true"` — purely decorative. - The **system variant** uses `role="status"` which announces changes politely and does not interrupt reading flow. - Error state must include an actionable description — do not rely on colour alone. - Ensure `avatarFallback` is meaningful; the Avatar `alt` defaults to the `name` prop.

## Multimodal — AttachmentPreview & VoiceInput

- **source:** `AIMultimodal.mdx` · `AIAttachmentVoice.stories.tsx` · `components/ui/attachment-preview.tsx`
- **component tokens:** 9 (`--component-attachment-*`)
- **intent:** Components for attaching files/images and recording voice, composing into the ChatInput toolbar.
- **used with:** VoiceInput

## AI / Conversation — Pattern overview

- **source:** `AIPatterns.mdx` *(overview page — documents a family, not a single component)*
- **intent:** Five governor and trust-builder patterns grounded in [The Shape of AI](https://www.shapeof.ai) and [AI UX Patterns](https://www.aiuxpatterns.com/patterns.html) pattern libraries.

## PromptSuggestions

- **source:** `AIPromptSuggestions.mdx` · `AIPromptSuggestions.stories.tsx` · `components/ui/prompt-suggestions.tsx`
- **component tokens:** 5 (`--component-promptsuggestion-*`)
- **intent:** Tappable suggested-prompt chips shown in the empty/onboarding state of a conversational AI view, or as contextual follow-up suggestions after a response. Reduces the blank-page problem by giving users concrete starting points.
- **avoid:** Do not show suggestions during an active streaming response. Hide or disable them until the response completes.
- **accessibility:** - The suggestions container uses `role="list"` with `aria-label` so it is announced as a list. - Each chip uses `role="listitem"` and is a `<button>` — keyboard-focusable and activatable with `Enter`/`Space`. - All chips have visible focus rings via `focus-visible:ring-2`. - Icons are `aria-hidden="true"` — the label text carries the full accessible name. - Suggestions are not required reading; placing them below the main heading and before the composer ensures logical focus order without disrupting the primary task.

## SourceCitation

- **source:** `AISourceCitation.mdx` · `AISourceCitation.stories.tsx` · `components/ui/source-citation.tsx`
- **component tokens:** 5 (`--component-citation-*`)
- **intent:** Inline numbered references and their corresponding source list. Sources must always be visible — never hidden behind an additional click. This is a core AI transparency requirement.
- **avoid:** Do not use for generated content that is not grounded in retrieved sources. Using false citation markers undermines user trust.
- **composes:** Tooltip
- **accessibility:** - Each `CitationMarker` has an `aria-label` that names the source — screen readers can identify references without seeing the visual badge. - Source links use `target="_blank"` with `rel="noopener noreferrer"` and include a visible `ExternalLink` icon labelled "Opens in new tab". - The `SourceList` has `aria-label` matching its heading so it is identifiable as a landmark in the accessibility tree. - Do not hide the source list behind a disclosure — users with screen readers should not have to navigate to a separate control to access citation content.

## Accordion

- **source:** `Accordion.mdx` · `Accordion.stories.tsx` · `components/ui/accordion.tsx`
- **component tokens:** 12 (`--component-accordion-dimension-*` · `--component-accordion-color-*`)
- **intent:** An accordion reveals or hides sections of content on demand. Use it to present a long list of items where most users will only need a subset — for example, FAQs, settings categories, or feature details.
- **accessibility:** Accordion is built on Radix UI's `AccordionPrimitive`, which implements the WAI-ARIA Disclosure pattern with correct heading, button, and region roles. **Built-in behaviour** - Each trigger renders inside an `AccordionPrimitive.Header`, which maps to `role="heading"` at the default level — providing document structure for screen readers. - Each trigger has `aria-expanded` (`"true"` / `"false"`) that updates when toggled. - `aria-controls` links each trigger to its content panel. - The content region has `aria-labelledby` pointing back to its trigger.

## Alert

- **source:** `Alert.mdx` · `Alert.stories.tsx` · `components/ui/alert.tsx`
- **component tokens:** 34 (`--component-feedback-alert-*`)
- **intent:** An alert communicates a system-level message that the user should notice but doesn't require an immediate response. Use alerts to inform, warn, or confirm — not to prompt decisions (use a Dialog for that).
- **used with:** Button
- **variants:**
    - `Default` — Use for neutral, low-urgency system notices that don't map to a specific success/failure state — for example, scheduled maintenance or policy updates. No colour emphasis is applied.
    - `Info` — Use to provide helpful context or explanations that are not urgent — for example, permanent constraints ("workspace URL can't be changed"), onboarding hints, or feature explanations. Does not signal a problem.
    - `Success` — Use to confirm that a user-initiated action completed successfully — for example, settings saved or an invite sent. Set expectations by telling users what will happen next.
    - `Warning` — Use when an action has significant, hard-to-reverse consequences, or when a resource is approaching a limit. State what will happen, what the user should know, and offer an optional path forward.
    - `Error` — Use when something has failed and the user may need to take action to recover — for example, a failed API call, connection loss, or form submission error. Always give users a clear recovery path.
    - `Destructive` — Use when the warning is specifically about an irreversible action the user is about to take. Similar in tone to Warning but with higher visual urgency.
- **accessibility:** Alert renders with a semantic role that matches its urgency level so screen readers announce it at the right moment. **Built-in behaviour** - Use `role="status"` (or `aria-live="polite"`) for Info, Success, Warning, and Default alerts — the announcement waits for a pause in screen reader output. - Use `role="alert"` (or `aria-live="assertive"`) for Error and Destructive alerts — the announcement fires immediately, reflecting higher urgency. **Developer responsibilities** - **Static vs. dynamic alerts** — if the alert is present in the DOM on page load (not injected after a user action), `aria-live` regions do not fire. For static alerts, the content is read in normal document order, which is usually sufficient. Use live region attributes only on alerts that are dynamically injected.

## AppHeader

- **source:** `AppHeader.mdx` · `AppHeader.stories.tsx` · `components/ui/app-header.tsx`
- **component tokens:** 69 (`--component-nav-header-*` · `--component-input-field-*` · `--component-feedback-badge-*` · `--component-avatar-color-*`)
- **intent:** A full-width horizontal navigation bar, 56 px tall, white background. It sits at the top of every application page and provides consistent access to the logo, primary navigation, search, notifications, and the user account menu. Compose it from the provided sub-components to match the exact navigation model of your product.
- **accessibility:** The `AppHeader` renders as a `<header>` landmark. Active nav items use `aria-current="page"`. The notification button includes an `aria-label` that announces the unread count when it is greater than zero. The user menu trigger is a `<button>` with a descriptive `aria-label`. | Component | Element | Landmark / role | |---|---|---| | `AppHeader` | `<header>` | `banner` landmark | | `AppHeaderNav` | `<nav>` | `navigation` landmark | | `AppHeaderNavItem` | `<a>` or `<button>` | Native link / button |

## Avatar

- **source:** `Avatar.mdx` · `Avatar.stories.tsx` · `components/ui/avatar.tsx`
- **component tokens:** 8 (`--component-avatar-color-*`)
- **intent:** An avatar represents a person or entity — typically a user profile picture or their initials. Use avatars in headers, comment threads, assignee fields, and anywhere a face or identity marker adds useful context.
- **accessibility:** Avatar is built on Radix UI's `AvatarPrimitive`. It is a decorative element when used alongside a visible name, and an informative element when used alone. **Developer responsibilities** - **Image avatars** — the underlying `<img>` requires an `alt` attribute. Use the person's name as the alt text (e.g. `alt="Priya Sharma"`). If the avatar is purely decorative (the name is displayed adjacent to it), pass `alt=""` to hide it from screen readers. - **Fallback avatars (initials)** — initials are rendered as visible text, but the container should also carry `aria-label` with the full name so screen readers announce "PS" as "Priya Sharma" rather than spelling out the letters. - **Avatar group** — the overflow "+N" avatar is decorative; wrap the group in an element with `aria-label` summarising all members (e.g. `aria-label="4 members: Priya Sharma, Jordan Lee, and 2 others"`). - **Clickable avatars** — if an avatar is a link to a profile, wrap it in an `<a>` with `aria-label="View Priya Sharma's profile"`. Do not use `onClick` on a bare `<div>`.

## Badge

- **source:** `Badge.mdx` · `Badge.stories.tsx` · `components/ui/badge.tsx`
- **component tokens:** 21 (`--component-feedback-badge-*`)
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
- **accessibility:** Badge is a purely decorative, non-interactive element. It has no interactive role and does not receive focus. **Developer responsibilities** - **Do not rely on colour alone** — status badges use colour to communicate meaning (green = success, red = error). Always pair the colour with a text label. Users with colour vision deficiency cannot distinguish status from colour alone. - **Status dots** — the dot indicator is decorative and should be hidden from assistive technology with `aria-hidden="true"`. The badge label already carries the semantic information. - **Counts in nav badges** — when a badge appears on a navigation item (e.g. "Inbox · 4"), ensure the parent nav item's label includes the count for screen readers (e.g. `aria-label="Inbox, 4 unread"`). Visually placing the count inside the badge does not automatically expose it to screen readers in all contexts. - **Badge as status only** — badges should never be the sole indicator of a critical state. If an item is in error, the error must also be surfaced in context (e.g. an inline message, an error border, or a page-level alert) — not just through a red badge.

## Breadcrumb

- **source:** `Breadcrumb.mdx` · `Breadcrumb.stories.tsx` · `components/ui/breadcrumb.tsx`
- **component tokens:** 11 (`--component-nav-breadcrumb-*`)
- **intent:** A breadcrumb shows the user's current location within a hierarchy and provides links to navigate back up the tree. Use it on any page that is more than one level deep in the product structure.
- **accessibility:** The `Breadcrumb` wrapper renders as a `<nav>` element with `aria-label="breadcrumb"`, which creates a distinct landmark that screen reader users can jump to directly. The current page item has `aria-current="page"` and `aria-disabled="true"` to signal that it is not interactive. All separators have `aria-hidden="true"` so they are skipped by screen readers. The ellipsis item is also `aria-hidden` — if you expand a collapsed path on interaction, ensure the newly revealed links are focusable and announced correctly.

## Button

- **source:** `Button.mdx` · `Button.stories.tsx` · `components/ui/button.tsx`
- **component tokens:** 65 (`--component-button-*`)
- **intent:** A button triggers an action or event. Use buttons to let users know what will happen next, and choose a variant that matches the weight of the action.
- **variants:**
    - `Primary (default)` — Use a primary button for the most important action on a page or within a section — typically a form submission or the single key call to action.
    - `Secondary` — Use a secondary button alongside a primary button when a supporting action is needed. It carries less visual weight than primary, making the hierarchy clear at a glance.
    - `Outline` — Use an outline button for actions that are important but should not compete with a primary button. Common in toolbars, filter panels, and card footers where a lower-emphasis bordered style reads clearly against a white or subtle background.
    - `Ghost` — Use a ghost button in spaces where context already signals interactivity — toolbars, inline action menus, or groups of sibling buttons. Avoid using ghost buttons in isolation because they are not as obviously clickable as outlined or filled styles.
    - `Destructive` — Use a destructive button for irreversible or high-risk actions such as deleting data or revoking access. Pair it with a confirmation dialog to prevent accidental triggers.
    - `Link` — Use a link button when an action navigates the user somewhere and inline text styling is preferred. It behaves like a button semantically but looks like a hyperlink.
- **states:**
    - `Default` — The resting, interactive state. The button is ready to receive focus and click events.
    - `Disabled` — Prevents interaction and signals that the action is not currently available. Always pair a disabled button with context explaining why — either nearby helper text or a tooltip.
    - `Loading` — Replaces the label with a spinner to communicate that an async operation is in progress. Use this to prevent double submissions and reassure users that their action was received.
- **composition:** Button renders a native `<button>` element. Passing `asChild` swaps it for Radix's `Slot`, which merges all button styling and props onto whatever single child you provide — use this to render a button-styled `<a>` or a Next.js `<Link>` without nesting interactive elements. **What the component owns** - **The loading spinner.** When `isLoading` is `true`, Button renders a `Loader2` icon from `lucide-react` with a spin animation before the label. The label stays visible — the spinner is prepended, not swapped in. Do not pass your own spinner.
- **accessibility:** The Button renders a native `<button>` element, which gives it keyboard focus, `Enter`/`Space` activation, and the correct implicit `role="button"` for free. **Keyboard interaction** | Key | Behaviour | |---|---| | `Tab` / `Shift+Tab` | Moves focus to / away from the button | | `Enter` or `Space` | Activates the button |

## Card

- **source:** `Card.mdx` · `Card.stories.tsx` · `components/ui/card.tsx`
- **component tokens:** 18 (`--component-nav-card-*`)
- **intent:** A card groups related content and actions into a contained, scannable unit. Use cards to present discrete items — a user profile, a metric, a project summary — where each item needs visual separation from its neighbours.
- **used with:** Button · Badge
- **accessibility:** Card is a layout container with no built-in interactive role. **Developer responsibilities** - **Clickable cards** — if the entire card is a link or triggers an action, wrap it in an `<a>` or `<button>` element and give it an `aria-label` that describes the destination or action (e.g. `aria-label="View Project Alpha details"`). Never make a `<div>` clickable with only an `onClick` handler — it will be invisible to keyboard and screen reader users. - **Heading hierarchy** — the `CardTitle` should use a heading element (`<h2>`, `<h3>`, etc.) at the correct level for the page structure. Cards that sit inside a section headed by an `<h2>` should use `<h3>`. Do not use headings solely for visual sizing. - **Actions in card header** — icon buttons in the card header (e.g. settings or share) must have `aria-label` values that include the card's subject (e.g. `aria-label="Share Project Alpha"`) so they are distinguishable from identically-labelled buttons on sibling cards. - **MetricCard trend indicators** — the trend arrow and percentage are visual; the accessible label for the trend region should include both direction and value (e.g. `aria-label="Up 12% vs last month"`). Do not rely on the arrow icon alone to convey direction to screen readers.

## Checkbox

- **source:** `Checkbox.mdx` · `Checkbox.stories.tsx` · `components/ui/checkbox.tsx`
- **component tokens:** 16 (`--component-input-checkbox-*`)
- **intent:** A checkbox lets users select or deselect a single option independently. Use checkboxes in forms, settings, and list selections where multiple items can be chosen simultaneously.
- **states:**
    - `Default (unchecked)` — The resting, unselected state. The checkbox is ready for interaction.
    - `Checked` — The user has selected this option. The check icon confirms the selection visually.
    - `Disabled` — The checkbox cannot be interacted with. Use when an option is unavailable in the current context. If the option is checked and disabled, it shows a confirmed but locked selection — for example, a required permission that cannot be removed.
    - `Checked + disabled` — Represents a selection that is confirmed but cannot be changed — for example, an always-on feature or a plan constraint.
- **accessibility:** Checkbox is built on Radix UI's `CheckboxPrimitive`, which renders a `<button role="checkbox">` with full ARIA state management. **Built-in behaviour** - `aria-checked` is managed automatically — `"true"`, `"false"`, or `"mixed"` for indeterminate state. - `aria-disabled` is applied when the `disabled` prop is set. - `aria-required` is applied when the `required` prop is set. **Keyboard interaction**

## Combobox

- **source:** `Combobox.mdx` · `Combobox.stories.tsx` · `components/ui/combobox.tsx`
- **component tokens:** 31 (`--component-combobox-trigger-*` · `--component-select-option-*`)
- **intent:** A combobox combines a trigger button with a searchable dropdown list. Use it when users need to pick one option from a long list — typically more than ten items — and filtering by typing speeds up selection. For shorter, static lists where scanning is fast, use a [Select](/docs/forms-and-input-select--docs) instead.
- **composes:** Button · Popover · Command
- **states:**
    - `Default` — The resting state. The trigger shows the placeholder text until a value is chosen.
    - `Filled` — A value has been selected. A clear button (×) appears alongside the chevron so users can remove the selection without reopening the dropdown.
    - `Error` — Shown when validation fails — for example, when a required field has no selection on form submit. The error message appears in red below the trigger.
    - `Disabled` — The combobox cannot be opened. Always pair with helper text explaining why the field is unavailable and how to resolve it ("Contact admin to change.").
- **accessibility:** The Combobox is built on Radix UI `PopoverPrimitive` combined with `CommandPrimitive`, giving it full keyboard support and correct ARIA semantics out of the box. **Built-in behaviour** - The trigger renders with `role="combobox"` and `aria-expanded` to communicate open/closed state to assistive technologies. - The search input inside the dropdown receives focus automatically when the popover opens. - `aria-invalid` is applied to the trigger whenever an `errorMessage` is present. - The clear button renders with `role="button"` and `aria-label="Clear selection"` so keyboard and screen reader users can remove the value without reopening the dropdown.

## CommandPalette

- **source:** `CommandPalette.mdx` · `CommandPalette.stories.tsx` · `components/ui/command-palette.tsx`
- **component tokens:** 38 (`--component-command-color-*` · `--component-input-field-*`)
- **intent:** A Spotlight-style command palette that drops from the top of the viewport. It provides fast keyboard-driven access to pages, actions, and recently visited files — without interrupting the user's flow with a full modal overlay. Use it wherever users need to navigate a large information space without reaching for the mouse.
- **accessibility:** | Key | Behaviour | |---|---| | `⌘K` / `Ctrl+K` | Opens the palette from anywhere on the page | | `↑` / `↓` | Moves focus between result items | | `Enter` | Selects the focused item | | `Escape` | Closes the palette and returns focus to the trigger |

## Context Menu

- **source:** `ContextMenu.mdx` · `ContextMenu.stories.tsx` · `components/ui/context-menu.tsx`
- **component tokens:** 22 (`--component-context-*`)
- **intent:** A context menu surfaces a set of actions relevant to the element the user right-clicked. Use it when a set of contextual actions would clutter the UI if always visible — for example, file operations on a card, row-level actions in a table, or canvas operations in an editor.
- **accessibility:** ContextMenu is built on Radix UI's `ContextMenu`, which implements the WAI-ARIA menu pattern with correct roles, focus management, and dismissal. **Built-in behaviour** - Opens on right-click (or the platform context-menu gesture); items expose `role="menuitem"`. - Focus moves into the menu on open and returns to the trigger on close. - `Escape` closes the menu. **Keyboard interaction**

## CopyToClipboard

- **source:** `CopyToClipboard.mdx` · `CopyToClipboard.stories.tsx` · `components/ui/copy-to-clipboard.tsx`
- **component tokens:** 12 (`--component-copy-*`)
- **intent:** A copy-to-clipboard button gives users a one-click way to copy a value — an API key, a command, a URL — without selecting and using keyboard shortcuts. It cycles through three states: idle (Copy icon), copied (Check icon + "Copied" label), and error (X icon), then automatically reverts after a configurable timeout.
- **accessibility:** The control renders a native `<button>` with an `aria-label`, so it gets keyboard focus, `Enter`/`Space` activation, and `role="button"` for free. **Built-in behaviour** - The trigger exposes an `aria-label` describing the action (e.g. "Copy to clipboard"). - Copy success is reflected visually via an icon/label change. **Keyboard interaction** | Key | Behaviour |

## DataTable

- **source:** `DataTable.mdx` · `DataTable.stories.tsx` · `components/ui/data-table.tsx`
- **component tokens:** 35 (`--component-data-table-*` · `--component-nav-pagination-*` · `--component-table-color-*`)
- **intent:** A DataTable is a full-featured data grid for displaying, searching, sorting, and paginating structured datasets. Use it when users need to browse, find, or act on records — team members, transactions, issues, orders.
- **composes:** Button · Checkbox
- **used with:** Badge
- **composition:** DataTable wraps TanStack Table and renders native HTML table elements. It composes Button and Checkbox from the library internally, and uses `lucide-react` icons for sort, pagination, search, and the column toggle. **What the component owns** - **All table state.** Sorting, filtering, pagination, column visibility, and row selection are managed internally through TanStack's row models. Do not lift this state unless you need to persist it.
- **accessibility:** DataTable uses native HTML table elements with TanStack Table managing sort and selection state. **Developer responsibilities** - **Column headers** — sortable column headers must use `<th scope="col">` with `aria-sort="ascending"`, `"descending"`, or `"none"` so screen readers announce the sort state. Update this attribute when the user changes the sort direction. - **Caption or label** — add a visually hidden `<caption>` or `aria-label` on the `<table>` element describing the dataset (e.g. "Team members, 24 results"). - **Row selection checkboxes** — the header "select all" checkbox must have `aria-label="Select all rows"`. Each row checkbox must include the row's identity in its label (e.g. `aria-label="Select Priya Sharma"`) so screen readers can distinguish them. - **Row actions** — the DropdownMenu trigger in the actions cell must have an `aria-label` that includes the row identifier (e.g. `aria-label="Row actions for Priya Sharma"`). Without this, every "more actions" button sounds the same.

## Date picker

- **source:** `DatePicker.mdx` · `DatePicker.stories.tsx` · `components/ui/date-picker.tsx`
- **component tokens:** 38 (`--component-date-picker-*`)
- **intent:** A date picker lets users select a date by navigating a calendar grid. Use it for fields where the date context matters visually — booking dates, deadlines, birth dates — and where typing a date in a text field would require the user to know the expected format. For date ranges, use two date pickers with linked `min` and `max` props.
- **composes:** Popover
- **accessibility:** The calendar grid uses `role="grid"` with `role="gridcell"` for each day. The selected date has `aria-selected="true"`. Disabled dates have `aria-disabled="true"`. Navigation buttons carry `aria-label="Previous month"` and `aria-label="Next month"` so screen readers announce their purpose without relying on icon-only affordance. The popover trigger has `aria-haspopup="dialog"` and `aria-expanded` reflecting the current open state. Keyboard interaction: arrow keys navigate between days in the grid, Enter selects the focused day, Escape closes the popover and returns focus to the trigger. Page Up and Page Down move backwards and forwards one month respectively. Tab and Shift+Tab cycle between the navigation buttons and the day cells within the popover.

## DateRangePicker

- **source:** `DateRangePicker.mdx` · `DateRangePicker.stories.tsx` · `components/ui/date-range-picker.tsx`
- **component tokens:** 44 (`--component-date-range-*`)
- **intent:** A date range input backed by a Radix Popover. Clicking the trigger opens a floating panel with two calendar months side by side, allowing users to select a start and end date in one fluid interaction. Built on native JS `Date` — no external date library required.
- **accessibility:** The range picker pairs a trigger button with a Radix UI `Popover` containing the calendar; the popover handles focus trapping and dismissal. **Built-in behaviour** - Opening moves focus into the calendar; closing returns focus to the trigger. - Month navigation controls expose `aria-label`s ("Previous month", "Next month"). - `Escape` closes the popover. **Keyboard interaction**

## Dialog

- **source:** `Dialog.mdx` · `Dialog.stories.tsx` · `components/ui/dialog.tsx`
- **component tokens:** 6 (`--component-dialog-color-*`)
- **intent:** A dialog interrupts the user's flow to surface an action or information that requires their immediate attention. Use dialogs for confirmations, short forms, and destructive action gates.
- **composes:** Button
- **used with:** AlertDialog · Input
- **composition:** Dialog is a set of composable parts, not a single component. Assemble it from `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, and `DialogClose`. Each part is a thin wrapper over the matching Radix primitive. ```tsx </DialogHeader>
- **accessibility:** Dialog and AlertDialog are built on Radix UI's `DialogPrimitive` and `AlertDialogPrimitive`, which handle focus trapping, scroll locking, and ARIA roles automatically. **Built-in behaviour** - The dialog panel renders with `role="dialog"` and `aria-modal="true"` (AlertDialog uses `role="alertdialog"`). - Focus moves into the dialog when it opens and returns to the trigger element when it closes. - Focus is trapped inside while the dialog is open — Tab and Shift+Tab cycle only through focusable elements within the panel. - Clicking the overlay or pressing `Escape` closes a regular Dialog (but not an AlertDialog, by design).

## Dropdown Menu

- **source:** `DropdownMenu.mdx` · `DropdownMenu.stories.tsx` · `components/ui/dropdown-menu.tsx`
- **component tokens:** 22 (`--component-dropdown-*`)
- **intent:** A dropdown menu reveals a list of actions or navigation items from a trigger element. Use dropdown menus for contextual actions that don't all need to be visible at once — for example, row actions in a table or a user account menu.
- **used with:** Button
- **accessibility:** DropdownMenu is built on Radix UI's `DropdownMenuPrimitive`, which implements the WAI-ARIA Menu Button pattern with full keyboard support. **Built-in behaviour** - The trigger renders with `aria-haspopup="menu"` and `aria-expanded`. - The menu renders with `role="menu"`; each item has `role="menuitem"` (or `"menuitemcheckbox"` / `"menuitemradio"` as appropriate). - Focus moves into the menu on open and returns to the trigger on close. - `aria-disabled` is applied to disabled items.

## Empty state

- **source:** `EmptyState.mdx` · `EmptyState.stories.tsx` · `components/ui/empty-state.tsx`
- **component tokens:** 16 (`--component-empty-*`)
- **intent:** An empty state fills the space where content would normally appear — after a search returns no results, when a list has no items, or when a feature hasn't been used yet. A well-written empty state explains why the space is empty and tells the user what to do next.
- **used with:** Button
- **accessibility:** The empty state is read naturally as static content. If it appears after an action (for example, a search returns no results), wrap it in a region with `aria-live="polite"` so screen readers announce the change. The icon is hidden from the accessibility tree with `aria-hidden="true"` because the heading and description convey the full meaning — do not rely on the icon alone.

## Error pages

- **source:** `ErrorPages.mdx` · `ErrorPages.stories.tsx` · `components/ui/button.tsx`
- **component tokens:** 65 (`--component-button-*`)
- **intent:** Error pages replace the full application layout when a route cannot be rendered. They give users clear context about what went wrong and a reliable path back to safety. Three variants cover the most common failure states: page not found (404), server error (500), and planned maintenance.
- **accessibility:** Error pages should set the document title to reflect the error — "404 · Page not found" or "500 · Server error". The main content has `role="main"`. The error code and heading together describe the situation — do not rely on the number alone to communicate meaning. The large numeral carries `aria-hidden="true"` because the visible heading conveys the same information to screen readers.

## File upload

- **source:** `FileUpload.mdx` · `FileUpload.stories.tsx` · `components/ui/file-upload.tsx`
- **component tokens:** 32 (`--component-file-upload-*` · `--component-button-secondary-*`)
- **intent:** A file upload area lets users attach files to a form either by dragging and dropping or by clicking to open a file browser. Use it when file submission is the primary purpose of an interaction — document uploads, image attachments, CSV imports. For secondary or incidental attachments, an icon button with a hidden file input may be less disruptive.
- **accessibility:** The drop zone has `role="button"`, `tabIndex={0}`, and responds to Enter and Space to open the file browser, making it fully keyboard operable. It has an `aria-label` describing the upload action. The hidden `<input type="file">` has `aria-hidden="true"` since the visible button handles the interaction and announcing both would be redundant. Error messages for oversized or wrong-format files should be associated with the drop zone via `aria-describedby` so they are announced when focus enters the area.

## Input

- **source:** `Input.mdx` · `Input.stories.tsx` · `components/ui/input.tsx`
- **component tokens:** 25 (`--component-input-field-*`)
- **intent:** An input lets users enter short, free-form text. Use inputs for single-line data entry like names, email addresses, search queries, or configuration values.
- **states:**
    - `Default` — The resting state. The input is ready to receive focus and keyboard input.
    - `Disabled` — The input cannot be interacted with. Use when the field exists in the layout but the current context or permissions prevent editing. Always provide helper text explaining why it is locked.
    - `Error` — Triggered by failed validation. The error message replaces or supplements the helper text and appears immediately below the input. Write error messages that are specific and actionable — "Please enter a valid email address" rather than "Invalid input".
    - `Success` — Triggered when validation passes on a field where confirmation adds value — for example, checking that a username is available. Use success state deliberately; not every valid input needs a success indicator.
- **accessibility:** Input renders a native `<input>` element and uses `aria-invalid` to communicate validation state to assistive technology. **Developer responsibilities** - **Always use a visible label** — associate it with the input via `htmlFor` / `id`. Never rely on `placeholder` alone; placeholder text disappears on focus and has poor contrast in most browsers. - **Required fields** — pass the `required` prop, which sets the native `required` attribute. Screen readers announce "required" alongside the label. - **Error messages** — when an error is present, set `aria-invalid="true"` on the input and link the error message with `aria-describedby="[errorId]"` so screen readers read it automatically after the label. - **Helper text** — also link helper text via `aria-describedby` so it is announced when the field receives focus.

## List

- **source:** `List.mdx` · `List.stories.tsx` · `components/ui/list.tsx`
- **component tokens:** 11 (`--component-list-color-*`)
- **intent:** A List renders a vertical stack of rows separated by hairline dividers. It is composed from primitive sub-components — `ListItem`, `ListItemAvatar`, `ListItemContent`, `ListItemTitle`, `ListItemDescription`, `ListItemAction`, and `ListDivider` — so you can mix and match exactly what each row needs.
- **used with:** Avatar · Badge
- **accessibility:** List items expose selection and disabled state via `aria-selected` and `aria-disabled`; non-interactive dividers use `role="separator"`. **Built-in behaviour** - Selectable items reflect state with `aria-selected`. - Unavailable items set `aria-disabled` and are skipped by activation. - Dividers are exposed as `role="separator"` so they are not read as content. **Keyboard interaction**

## MetricCard

- **source:** `MetricCard.mdx` · `MetricCard.stories.tsx` · `components/ui/card.tsx`
- **component tokens:** 18 (`--component-nav-card-*`)
- **intent:** A MetricCard displays a single KPI with its trend direction. Use metric cards in dashboards and summary pages where users need to quickly read a key number and understand whether it is moving in the right direction.
- **variants:**
    - `Default` — A neutral surface for any quantitative metric. Works in any context.
    - `Brand` — Use to highlight the most important or signature metric — typically the primary business KPI in a dashboard header. The solid brand-blue background commands the most visual weight in a grid.
    - `Success` — Use when the metric reflects a healthy state (high uptime, strong conversion, low error rate). The green tint reinforces positive status.
    - `Warning` — Use when a metric is approaching a threshold that requires attention but hasn't yet become critical. The amber tint signals "watch this".
    - `Error` — Use when a metric reflects a critical or failing state (high error rate, failed payments, SLA breach). Reserve for genuinely actionable problems.
- **accessibility:** **Developer responsibilities** - **Trend indicators** — the trend arrow and percentage are visual. Wrap the entire trend row in a `<span aria-label="Up 12.5% vs last month">` so screen reader users hear the full direction and magnitude in one announcement. Do not rely on the arrow icon alone. - **Colour-only meaning** — variant colours (success green, warning amber, error red) must not be the only signal. Always pair them with a clear label or icon so users who cannot distinguish colours still understand the state. - **Value format** — ensure large formatted numbers include a readable equivalent if the abbreviated form is ambiguous (e.g. "$48.3k" vs "$48,295"). For screen readers, consider an `aria-label` on the value element with the full unabbreviated figure. - **Heading hierarchy** — if `CardTitle` / the metric label should be part of the page outline, render it as a heading element at the appropriate level rather than a plain `<p>`.

## Multi-select

- **source:** `MultiSelect.mdx` · `MultiSelect.stories.tsx` · `components/ui/multi-select.tsx`
- **component tokens:** 59 (`--component-input-field-*` · `--component-multi-select-*`)
- **intent:** A multi-select lets users choose multiple items from a predefined list. Use it when two or more options can apply simultaneously and the list has between 4 and 20 items. For fewer than 4 options, use a checkbox group. For free-form entry of values not from a fixed list, use a tag input instead.
- **accessibility:** The trigger button has `aria-haspopup="listbox"` and `aria-expanded` to communicate its state to assistive technologies. The dropdown has `role="listbox"` and `aria-multiselectable="true"`. Each option has `role="option"` and `aria-selected` reflecting its current selection state. Keyboard interaction: Enter or Space toggles the focused option, Escape closes the dropdown without changing the selection, and arrow keys navigate between options.

## Number input

- **source:** `NumberInput.mdx` · `NumberInput.stories.tsx` · `components/ui/number-input.tsx`
- **component tokens:** 35 (`--component-input-field-*` · `--component-number-input-*`)
- **intent:** A number input lets users set an exact numeric value using increment and decrement controls, or by typing directly. Use it when the range is known and bounded, and when small adjustments are common — quantity selectors, seat counts, duration fields.
- **accessibility:** The input has `type="number"` and should be associated with a visible label via `id` and `for`, or wrapped in a `<label>` element. Increment and decrement buttons have `aria-label="Increase value"` and `aria-label="Decrease value"` respectively so they are announced correctly when focused. Both buttons carry `aria-disabled` when they are at the min or max boundary, ensuring the disabled state is communicated to screen readers even though the visual appearance alone may not be sufficient. The up and down arrow keys increment and decrement the value, matching the expected keyboard behaviour for numeric steppers described in the ARIA authoring practices.

## Pagination

- **source:** `Pagination.mdx` · `Pagination.stories.tsx` · `components/ui/pagination.tsx`
- **component tokens:** 17 (`--component-nav-pagination-*`)
- **intent:** Pagination splits a large dataset across multiple pages and gives users controls to move between them. Use pagination on any list or table where showing all records at once would hurt performance or readability.
- **accessibility:** Pagination is built on native HTML elements and shadcn/ui primitives. **Built-in behaviour** - The pagination bar is wrapped in a `<nav>` with `aria-label="pagination"` so screen readers identify it as a landmark. - Page number buttons are `<a>` or `<button>` elements; the current page carries `aria-current="page"`. - Disabled previous/next/first/last buttons use the `disabled` attribute to communicate their unavailability. **Keyboard interaction**

## Popover

- **source:** `Popover.mdx` · `Popover.stories.tsx` · `components/ui/popover.tsx`
- **component tokens:** 16 (`--component-popover-*`)
- **intent:** A popover is a floating panel anchored to a trigger element. Use it to surface secondary actions, short forms, or contextual controls without navigating away or opening a full dialog.
- **used with:** Button · Input
- **accessibility:** Popover is built on Radix UI's `PopoverPrimitive`, which manages focus, ARIA state, and dismissal behaviour automatically. **Built-in behaviour** - The trigger renders with `aria-haspopup="dialog"` and `aria-expanded`. - The panel renders with `role="dialog"`. - Focus moves into the panel when it opens and returns to the trigger when it closes. - Clicking outside or pressing `Escape` closes the popover.

## Progress

- **source:** `Progress.mdx` · `Progress.stories.tsx` · `components/ui/progress.tsx`
- **component tokens:** 6 (`--component-progress-*`)
- **intent:** A progress bar communicates how far through a multi-step process or timed operation the user is. Use it for uploads, installs, onboarding completions, or any measurable operation where showing percentage adds meaningful feedback.
- **states:**
    - `0%` — The operation has not started. Consider only showing the bar once progress begins so it doesn't look stuck.
    - `In progress` — The bar fills proportionally as the operation advances. Pair with a label showing the numeric percentage or a status message like "Uploading… 45%".
    - `100%` — The operation is complete. Follow immediately with a success state or transition to the next step so users know they can proceed.
- **accessibility:** Progress is built on Radix UI's `ProgressPrimitive`, which renders a `role="progressbar"` with the correct ARIA value attributes. **Built-in behaviour** - Renders with `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, and `aria-valuemax="100"`. - Screen readers announce the current progress value when focus lands on the element or when the value changes. **Developer responsibilities** - **Label the progress bar** — provide an `aria-label` or `aria-labelledby` describing what is progressing (e.g. `aria-label="File upload progress"`). Without a label, screen readers announce only the numeric value with no context.

## RadioGroup

- **source:** `RadioGroup.mdx` · `RadioGroup.stories.tsx` · `components/ui/radio-group.tsx`
- **component tokens:** 22 (`--component-input-label-*` · `--component-input-radio-*`)
- **intent:** A radio group lets users select exactly one option from a set. Use radio groups when the choices are mutually exclusive and all options should be visible at once — for example, selecting a role, a billing cycle, or an access level.
- **accessibility:** RadioGroup is built on Radix UI's `RadioGroupPrimitive`, which renders `role="radiogroup"` with full keyboard and ARIA state management. **Built-in behaviour** - The group renders with `role="radiogroup"`. - Each item renders with `role="radio"` and `aria-checked`. - `aria-disabled` is applied to disabled items and the whole group. - `aria-required` is applied when the group is required.

## SegmentedControl

- **source:** `SegmentedControl.mdx` · `SegmentedControl.stories.tsx` · `components/ui/segmented-control.tsx`
- **component tokens:** 17 (`--component-segmented-*`)
- **intent:** A segmented control presents a set of mutually exclusive options in a compact pill. Use it when you have 2–5 choices and want the selected option to feel immediately obvious — like switching between List, Grid, and Board views.
- **accessibility:** The control implements the WAI-ARIA radio group pattern: the container is `role="radiogroup"` and each option is `role="radio"` with `aria-checked`. **Built-in behaviour** - Only one option is checked at a time; `aria-checked` updates on selection. - A disabled group is reflected with `aria-disabled`. **Keyboard interaction** | Key | Behaviour |

## Select

- **source:** `Select.mdx` · `Select.stories.tsx` · `components/ui/select.tsx`
- **component tokens:** 36 (`--component-select-*`)
- **intent:** A select lets users choose one option from a predefined list. Use a select when there are more than four options and the choices are known in advance. For fewer options, consider a radio group. For free-text with suggestions, consider a combobox.
- **states:**
    - `Default` — The resting state. The trigger shows the placeholder until a value is chosen.
    - `Error` — Triggered when no value has been selected but one is required, or when the selected value is no longer valid. The error message appears below the trigger.
    - `Success` — Signals that the selected value is valid — useful when the selection has side effects that can be confirmed immediately (e.g. a plan selection that shows pricing feedback).
    - `Disabled` — The select cannot be opened. Use when the options are unavailable in the current context. Always provide helper text explaining the constraint.
- **accessibility:** Select is built on Radix UI's `SelectPrimitive`, which manages focus, keyboard navigation, and ARIA attributes automatically. **Built-in behaviour** - The trigger renders with `role="combobox"`, `aria-expanded`, and `aria-haspopup="listbox"`. - The listbox renders with `role="listbox"`; each option has `role="option"` and `aria-selected`. - `aria-invalid` is applied when validation fails. - Focus returns to the trigger when the listbox closes.

## SidebarNav

- **source:** `SidebarNav.mdx` · `SidebarNav.stories.tsx` · `components/ui/sidebar-nav.tsx`
- **component tokens:** 50 (`--component-nav-sidebar-*` · `--component-feedback-badge-*`)
- **intent:** A SidebarNav provides persistent, hierarchical navigation for an application. It anchors the user's position within the product structure and makes top-level destinations accessible from any page. Use it in full application layouts where users navigate between multiple sections.
- **used with:** Avatar
- **accessibility:** SidebarNav renders as a `<nav>` landmark with each item as a native anchor or button element. **Built-in behaviour** - The outer element is a `<nav>` landmark, which screen readers expose as a navigation region. - Active items use `aria-current="page"` to identify the user's current location. - The collapse toggle button has `aria-expanded` to communicate the sidebar's open/closed state. **Keyboard interaction**

## Skeleton

- **source:** `Skeleton.mdx` · `Skeleton.stories.tsx` · `components/ui/skeleton.tsx`
- **component tokens:** 2 (`--component-skeleton-*`)
- **intent:** A skeleton screen is a low-fidelity placeholder that mimics the layout of content while it loads. It reduces perceived wait time by showing structure immediately, rather than an empty space or a spinner.
- **accessibility:** Skeleton screens are purely visual placeholders. They must be invisible to assistive technology so screen readers are not distracted by placeholder shapes. **Developer responsibilities** - **Hide from screen readers** — apply `aria-hidden="true"` to skeleton elements so they are skipped by screen readers entirely. - **Announce the loading state** — the container that holds the skeleton should carry `aria-busy="true"` while loading and switch to `aria-busy="false"` when real content replaces it. Optionally add `aria-label="Loading…"` to the container so screen readers can announce the in-progress state. - **Live region on completion** — when skeletons are replaced by real content, a screen reader user may not notice unless the update is announced. Wrap the container in `aria-live="polite"` so the new content is read when it appears. - **Do not animate indefinitely** — the pulsing animation should respect `prefers-reduced-motion`. Users who are sensitive to motion should see a static placeholder. Tailwind's `animate-pulse` class does not automatically honour this; add a `@media (prefers-reduced-motion: reduce)` override to remove the animation.

## Slider

- **source:** `Slider.mdx` · `Slider.stories.tsx` · `components/ui/slider.tsx`
- **component tokens:** 8 (`--component-slider-color-*`)
- **intent:** A slider lets users select a value or range by dragging a thumb along a track. Use sliders for continuous or step-based values where approximate input is acceptable — for example, volume, opacity, price range, or a confidence threshold.
- **accessibility:** Slider is built on Radix UI's `SliderPrimitive`, which renders each thumb as a `role="slider"` with full ARIA value management. **Built-in behaviour** - Each thumb renders with `role="slider"`, `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`. - `aria-disabled` is applied when the slider is disabled. - `aria-orientation="horizontal"` (default) or `"vertical"` is set automatically. **Keyboard interaction**

## Spinner

- **source:** `Spinner.mdx` · `Spinner.stories.tsx` · `components/ui/spinner.tsx`
- **component tokens:** 3 (`--component-spinner-color-*`)
- **intent:** A spinner communicates that an operation is in progress. Use it to reassure users their action was received and the system is working. Keep spinners short-lived — if an operation takes more than a few seconds, consider a progress bar or skeleton instead.
- **variants:**
    - `Default` — A neutral gray arc. Use on white or light surfaces where no brand colour is needed.
    - `Brand` — A blue arc using the primary brand colour. Use when the spinner appears in a branded loading screen or alongside primary actions.
- **accessibility:** The spinner renders with `role="status"` and an `aria-label`, so assistive tech announces loading without requiring focus. **Built-in behaviour** - `role="status"` creates a polite live region; the `aria-label` (e.g. "Loading") provides the accessible name. - The animated graphic itself carries no semantic meaning. **Developer responsibilities** - **Give it a meaningful label** — set the label to describe what is loading (e.g. "Loading results") rather than a generic "Loading".

## Stepper

- **source:** `Stepper.mdx` · `Stepper.stories.tsx` · `components/ui/stepper.tsx`
- **component tokens:** 21 (`--component-stepper-dimension-*` · `--component-stepper-color-*`)
- **intent:** A stepper guides users through a multi-step process with a clear indication of where they are, where they have been, and what remains. Use it for wizards, onboarding flows, checkout sequences, and any task that must be completed in a defined order across multiple screens.
- **composes:** Button
- **used with:** Input
- **accessibility:** The stepper has `role="list"` with each step as `role="listitem"`. The current step has `aria-current="step"`. Completed steps include "completed" in their `aria-label` — for example, "Account details, completed". The step number and status together should be readable as a coherent sentence: "Step 1 of 3, Account details, completed". `StepperActions` uses a `<nav>` element with `aria-label="Step navigation"`. The Back button has `aria-label="Go to previous step"`. The Next/Submit button describes what will happen: "Continue to step 2" or "Submit form", giving keyboard and screen reader users a clear understanding of the consequence before they act. When a step has a validation error, the error message must be associated with the relevant field using standard label/input/error patterns. Do not announce the error only at the moment the user tries to advance — surface it at the input level so assistive technology reads the error in context.

## Switch

- **source:** `Switch.mdx` · `Switch.stories.tsx` · `components/ui/switch.tsx`
- **component tokens:** 14 (`--component-switch-*`)
- **intent:** A switch toggles a single setting between an on and off state. Use a switch when the change takes effect immediately without requiring a form submission — for example, enabling notifications or activating dark mode.
- **states:**
    - `Default (off)` — The resting, inactive state. The setting is currently disabled.
    - `Checked (on)` — The setting is active. The thumb moves to the right and the track changes colour to communicate the active state.
    - `Disabled` — The switch cannot be toggled. Use when the setting is locked in the current context — for example, a plan feature that requires an upgrade.
    - `Checked + disabled` — The setting is active but cannot be changed — for example, a security policy enforced at the workspace level.
- **accessibility:** Switch is built on Radix UI's `SwitchPrimitive`, which renders `role="switch"` — the correct ARIA role for an immediate-effect toggle, distinct from a checkbox. **Built-in behaviour** - Renders with `role="switch"` and `aria-checked` (`"true"` / `"false"`). - `aria-disabled` is applied when the `disabled` prop is set. **Keyboard interaction** | Key | Behaviour |

## System banner

- **source:** `SystemBanner.mdx` · `SystemBanner.stories.tsx` · `components/ui/system-banner.tsx`
- **component tokens:** 25 (`--component-system-*`)
- **intent:** A system banner is a full-width notification that spans the top of the page, above the main content and below the application header. Use it for events that affect the entire session or account — scheduled maintenance, trial expiry warnings, degraded service, or successful bulk operations. It is not a replacement for inline Alert, which communicates field- or section-level feedback.
- **accessibility:** Info and success banners render with `role="status"`, which maps to an `aria-live="polite"` region. Warning and error banners render with `role="alert"`, which maps to `aria-live="assertive"` and interrupts the screen reader immediately. The dismiss button has `aria-label="Dismiss banner"` to ensure it is announced correctly by screen readers regardless of its icon-only appearance. All icons are marked `aria-hidden="true"` — the meaning of the banner is conveyed entirely through its text content and ARIA role, not its colour or icon.

## Table

- **source:** `Table.mdx` · `Table.stories.tsx` · `components/ui/table.tsx`
- **component tokens:** 11 (`--component-table-color-*`)
- **intent:** A Table is a lightweight, static data display for small, stable datasets that don't require sorting, filtering, or pagination. Use it for reference data, comparison layouts, settings summaries, and read-only records.
- **used with:** Badge · Button
- **accessibility:** Table uses native HTML table elements, which give screen readers full structural context when marked up correctly. **Developer responsibilities** - **Column headers** — always use `<th scope="col">` for column headers. `scope="col"` tells screen readers which cells belong to each header, especially important in multi-column tables. - **Row headers** — if the first column identifies a row (e.g. a name or ID), mark it with `<th scope="row">` so screen readers announce the row identifier alongside each cell value. - **Caption** — add a `<caption>` element to describe the table's content (e.g. "Project members"). This is the accessible name of the table and helps screen reader users who are scanning landmarks. - **Row actions** — ghost icon buttons in a trailing cell must have `aria-label` values that include the row context (e.g. `aria-label="Edit Priya Sharma"` rather than just `aria-label="Edit"`), otherwise all action buttons on the page sound identical to screen reader users.

## Tabs

- **source:** `Tabs.mdx` · `Tabs.stories.tsx` · `components/ui/tabs.tsx`
- **component tokens:** 18 (`--component-nav-tabs-*`)
- **intent:** Tabs organise related content into distinct views, allowing users to switch between them without leaving the page. Use tabs when content can be cleanly grouped into mutually exclusive sections and users are likely to visit multiple sections.
- **used with:** Card
- **accessibility:** Tabs is built on Radix UI's `TabsPrimitive`, which implements the WAI-ARIA Tabs pattern in full. **Built-in behaviour** - The tab list renders with `role="tablist"`. - Each tab renders with `role="tab"`, `aria-selected`, and `aria-controls` linking it to its panel. - Each panel renders with `role="tabpanel"` and `aria-labelledby` linking it back to its tab. - `aria-disabled` is applied to disabled tabs.

## Tag input

- **source:** `TagInput.mdx` · `TagInput.stories.tsx` · `components/ui/tag-input.tsx`
- **component tokens:** 33 (`--component-input-field-*` · `--component-tag-input-*`)
- **intent:** A tag input lets users create and manage a list of free-form text values. Each value is entered and confirmed as a tag chip that can be individually removed. Use it for labels, keywords, email recipients, and any field where the user supplies the values rather than choosing from a predefined list. For selecting from a fixed set of options, use Multi-select instead.
- **accessibility:** The container has `role="group"`. Each tag has `role="listitem"`. Remove buttons have `aria-label="Remove [tag name]"` so screen reader users hear which tag will be deleted. The text input has an `aria-label` matching its visible placeholder, or should be associated with a visible label via `htmlFor` when used inside a labelled form field.

## Textarea

- **source:** `Textarea.mdx` · `Textarea.stories.tsx` · `components/ui/textarea.tsx`
- **component tokens:** 22 (`--component-textarea-*`)
- **intent:** A textarea lets users enter longer, multi-line text. Use it for descriptions, notes, comments, and any free-form content where a single line would be insufficient.
- **states:**
    - `Default` — The resting state. The textarea is ready for input.
    - `Disabled` — The field cannot be edited. Use when content is read-only in the current context — for example, a record locked by an admin. Provide helper text or a tooltip explaining the reason.
    - `Error` — Triggered by validation failure. Use a specific error message so users know exactly what to fix — for example, "Description is required" rather than "Required field".
    - `Success` — Triggered when content passes validation. Use when confirming well-formed content provides meaningful reassurance — for example, a correctly formatted code snippet.
- **accessibility:** Textarea renders a native `<textarea>` element and shares the same accessibility contract as Input. **Developer responsibilities** - **Always use a visible label** — associate it with the textarea via `htmlFor` / `id`. Never rely on placeholder text alone. - **Required fields** — pass the `required` prop to communicate mandatory status to assistive technology. - **Error messages** — set `aria-invalid="true"` and link the error message with `aria-describedby="[errorId]"` so it is announced when focus enters the field. - **Character count** — the live counter must use `aria-live="polite"` so remaining-character updates are announced without interrupting the user.

## Time Picker

- **source:** `TimePicker.mdx` · `TimePicker.stories.tsx` · `components/ui/time-picker.tsx`
- **component tokens:** 45 (`--component-time-*`)
- **intent:** A time picker lets users select a time by scrolling through a column-based panel. Use it for meeting times, deadlines, recurring events, or any field where a user needs to select a specific hour and minute without typing.
- **accessibility:** The time picker pairs a trigger button (with an `aria-label`) and a Radix UI `Popover` panel; the popover manages focus and dismissal. **Built-in behaviour** - The trigger's `aria-label` reflects the current value or placeholder. - Opening moves focus into the panel; `Escape` closes it and returns focus to the trigger. **Keyboard interaction** | Key | Behaviour |

## Timeline

- **source:** `Timeline.mdx` · `Timeline.stories.tsx` · `components/ui/timeline.tsx`
- **component tokens:** 21 (`--component-timeline-*`)
- **intent:** A timeline displays a sequence of events in chronological order. Use it for activity feeds, audit logs, process histories, or any situation where the order and timing of events matters to the user.
- **accessibility:** A timeline is a sequence of events read in order, so it maps to an ordered list semantically. **Built-in behaviour** - Content renders in DOM order, matching the visual and reading order. **Developer responsibilities** - **Use list semantics** — render the sequence as `<ol>`/`<li>` so screen readers announce position and count ("3 of 7"). - **Hide decorative markers** — dots, connector lines, and status icons carry no meaning; mark them `aria-hidden="true"`.

## Toast

- **source:** `Toast.mdx` · `Toast.stories.tsx` · `components/ui/sonner.tsx`
- **component tokens:** 31 (`--component-feedback-toast-*`)
- **intent:** A toast is a brief, non-blocking notification that appears in response to a user action or system event. It disappears automatically after a short delay and does not require the user to dismiss it. Use toasts for confirmations, status updates, and low-urgency alerts.
- **used with:** Button
- **variants:**
    - `Default` — Use for neutral, informational confirmations — for example, "Changes saved." Keep the message short and factual.
    - `Success` — Use to confirm that an action completed successfully — for example, "Project published" or "Deployment complete." Optionally pair with a description for more detail.
    - `Error` — Use when an action failed and the user should be aware — for example, "Failed to save changes." Keep the message actionable if recovery is possible.
    - `Warning` — Use for time-sensitive notices that may affect the user's session — for example, "Your session expires in 5 minutes."
    - `Info` — Use for neutral system updates that are helpful but not urgent — for example, "New version available."
    - `Loading` — Use when an async operation starts and the outcome will be communicated in a follow-up toast — for example, "Uploading file…". Replace with a success or error toast when the operation finishes.
- **accessibility:** Toast is powered by Sonner, which renders notifications in a live region so screen readers announce them without requiring user focus. **Built-in behaviour** - Standard toasts render with `role="status"` and `aria-live="polite"` — the announcement waits for a pause in screen reader output so it doesn't interrupt the user mid-action. - Error toasts render with `role="alert"` and `aria-live="assertive"` — the announcement is immediate, reflecting the higher urgency. **Developer responsibilities** - **Keep titles short** — screen readers announce the full toast title; a long sentence mid-task is disruptive. Aim for six words or fewer.

## Tooltip

- **source:** `Tooltip.mdx` · `Tooltip.stories.tsx` · `components/ui/tooltip.tsx`
- **component tokens:** 11 (`--component-tooltip-*`)
- **intent:** A tooltip surfaces a short, supplementary label when a user hovers over or focuses an element. Use tooltips to clarify the purpose of icon-only controls, reveal keyboard shortcuts, or provide brief definitions for terms that may be unfamiliar.
- **used with:** Button
- **accessibility:** Tooltip is built on Radix UI's `TooltipPrimitive`, which wires up `aria-describedby` between the trigger and the tooltip content automatically. **Built-in behaviour** - The tooltip content is linked to its trigger via `aria-describedby`, so screen readers announce it after the trigger's label. - The tooltip opens on hover and on keyboard focus — keyboard users receive the same information as pointer users without any extra work. - Pressing `Escape` dismisses the tooltip. **Keyboard interaction**

## Tree View

- **source:** `TreeView.mdx` · `TreeView.stories.tsx` · `components/ui/tree-view.tsx`
- **component tokens:** 17 (`--component-tree-*`)
- **intent:** A tree view displays hierarchical data as an indented, collapsible structure. Use it for file systems, navigation trees, category hierarchies, or any data where parent–child relationships need to be browsable.
- **accessibility:** TreeView implements the WAI-ARIA tree pattern: the container is `role="tree"`, nodes are `role="treeitem"` with `aria-selected` and `aria-expanded`, and nested levels are wrapped in `role="group"`. **Built-in behaviour** - Expandable nodes expose `aria-expanded` (`true`/`false`); leaf nodes omit it. - Selected nodes reflect `aria-selected`. - Child groups are wrapped in `role="group"` so depth is conveyed. - Decorative expand/collapse icons are `aria-hidden="true"`.
