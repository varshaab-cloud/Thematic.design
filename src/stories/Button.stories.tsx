import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "../../components/ui/button"
import { Mail, Trash2, Plus, ArrowRight, Download } from "lucide-react"

const meta: Meta<typeof Button> = {
  title: "Forms and input/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A button triggers an action or event. Use buttons to let users know what will happen next, and choose a variant that matches the weight of the action.

## Variants

**Primary (\`default\`)** — Use a primary button for the most important action on a page or within a section — typically a form submission or the single key call to action.

**Secondary** — Use a secondary button alongside a primary button when a supporting action is needed. It carries less visual weight than primary, making the hierarchy clear at a glance.

**Outline** — Use an outline button for actions that are important but should not compete with a primary button. Common in toolbars, filter panels, and card footers where a lower-emphasis bordered style reads clearly against a white or subtle background.

**Ghost** — Use a ghost button in spaces where context already signals interactivity — toolbars, inline action menus, or groups of sibling buttons. Avoid using ghost buttons in isolation because they are not as obviously clickable as outlined or filled styles.

**Destructive** — Use a destructive button for irreversible or high-risk actions such as deleting data or revoking access. Pair it with a confirmation dialog to prevent accidental triggers.

**Link** — Use a link button when an action navigates the user somewhere and inline text styling is preferred. It behaves like a button semantically but looks like a hyperlink.

## States

**Default** — The resting, interactive state. The button is ready to receive focus and click events.

**Disabled** — Prevents interaction and signals that the action is not currently available. Always pair a disabled button with context explaining why — either nearby helper text or a tooltip.

**Loading** — Replaces the label with a spinner to communicate that an async operation is in progress. Use this to prevent double submissions and reassure users that their action was received.

## Sizes

**\`xs\`** — Use in dense UIs like table rows, inline chips, or compact toolbars.

**\`sm\`** — Use in sidebars, filter panels, or alongside small form inputs.

**Default** — The standard size. Use in most dialogs, forms, and page-level actions.

**\`lg\`** — Use for prominent hero or onboarding calls to action that need extra visual weight.

## Icon variants

**With leading icon** — Reinforces the label with a visual cue. Use for common actions (send, download, create) where the icon improves scannability.

**With trailing icon** — Signals navigation or progression (e.g. a right-arrow on a "Continue" button). Use sparingly so it doesn't compete with the label.

**Icon only** — Use when space is very constrained and the icon is universally understood. Always include an \`aria-label\` for screen-reader accessibility.

## Full width

Stretches the button to fill its container. Use in mobile layouts, card footers, or any context where a full-bleed action feels natural.

## Button group

Combines multiple outline buttons into a connected control (e.g. a segmented filter or view toggle). Remove the shared border and border-radius on inner buttons so they read as a single unit.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "ghost", "destructive", "link"],
      description: "Visual style of the button",
    },
    size: {
      control: "select",
      options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
      description: "Size of the button",
    },
    disabled: {
      control: "boolean",
      description: "Disables the button",
    },
    isLoading: {
      control: "boolean",
      description: "Shows loading spinner",
    },
    fullWidth: {
      control: "boolean",
      description: "Makes button full width",
    },
    children: {
      control: "text",
      description: "Button label",
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const States: Story = {
  name: "States",
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs text-muted-foreground mb-4">Variants</p>
        <div className="flex flex-wrap items-start gap-6">
          {[
            { label: "Primary",     props: { variant: "default"     as const, children: "Button" } },
            { label: "Secondary",   props: { variant: "secondary"   as const, children: "Button" } },
            { label: "Outline",     props: { variant: "outline"     as const, children: "Button" } },
            { label: "Ghost",       props: { variant: "ghost"       as const, children: "Button" } },
            { label: "Destructive", props: { variant: "destructive" as const, children: "Button" } },
            { label: "Link",        props: { variant: "link"        as const, children: "Button" } },
          ].map(({ label, props }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <Button {...props} />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-4">States</p>
        <div className="flex flex-wrap items-start gap-6">
          {[
            { label: "Default",  props: { children: "Button" } },
            { label: "Disabled", props: { children: "Button", disabled: true } },
            { label: "Loading",  props: { children: "Saving…", isLoading: true } },
          ].map(({ label, props }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <Button {...props} />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-4">Sizes</p>
        <div className="flex flex-wrap items-end gap-6">
          {[
            { label: "xs",      props: { size: "xs"      as const, children: "Button" } },
            { label: "sm",      props: { size: "sm"      as const, children: "Button" } },
            { label: "Default", props: { size: "default" as const, children: "Button" } },
            { label: "lg",      props: { size: "lg"      as const, children: "Button" } },
          ].map(({ label, props }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <Button {...props} />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}

// Core variants
export const Primary: Story = {
  args: { children: "Primary Button", variant: "default" },
}

export const Secondary: Story = {
  args: { children: "Secondary Button", variant: "secondary" },
}

export const Outline: Story = {
  args: { children: "Outline Button", variant: "outline" },
}

export const Ghost: Story = {
  args: { children: "Ghost Button", variant: "ghost" },
}

export const Destructive: Story = {
  args: { children: "Destructive Button", variant: "destructive" },
}

export const Link: Story = {
  args: { children: "Link Button", variant: "link" },
}

// States
export const Disabled: Story = {
  args: { children: "Disabled Button", disabled: true },
}

export const Loading: Story = {
  args: { children: "Saving...", isLoading: true },
}

export const LoadingOutline: Story = {
  args: { children: "Loading...", isLoading: true, variant: "outline" },
}

// Sizes
export const ExtraSmall: Story = {
  args: { children: "Extra Small", size: "xs" },
}

export const Small: Story = {
  args: { children: "Small", size: "sm" },
}

export const Large: Story = {
  args: { children: "Large", size: "lg" },
}

// With icons
export const WithLeadingIcon: Story = {
  render: () => (
    <Button>
      <Mail />
      Send Email
    </Button>
  ),
}

export const WithTrailingIcon: Story = {
  render: () => (
    <Button>
      Continue
      <ArrowRight />
    </Button>
  ),
}

export const WithDestructiveIcon: Story = {
  render: () => (
    <Button variant="destructive">
      <Trash2 />
      Delete
    </Button>
  ),
}

// Icon only
export const IconOnly: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button size="icon"><Plus /></Button>
      <Button size="icon" variant="outline"><Download /></Button>
      <Button size="icon" variant="ghost"><Trash2 /></Button>
    </div>
  ),
}

// Full width
export const FullWidth: Story = {
  render: () => (
    <div className="max-w-sm">
      <Button fullWidth>Full Width Button</Button>
    </div>
  ),
}

// Button group pattern
export const ButtonGroup: Story = {
  render: () => (
    <div data-slot="button-group" className="flex">
      <Button variant="outline" className="rounded-r-none border-r-0">Left</Button>
      <Button variant="outline" className="rounded-none border-r-0">Center</Button>
      <Button variant="outline" className="rounded-l-none">Right</Button>
    </div>
  ),
}

