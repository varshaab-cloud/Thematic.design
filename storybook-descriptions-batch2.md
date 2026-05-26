# Storybook Component Descriptions — Batch 2
> Card, DataTable, Table, RadioGroup, Tooltip, Pagination, SidebarNav
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

## MetricCard
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
