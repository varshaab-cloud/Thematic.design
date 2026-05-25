import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "../../components/ui/button"
import { Mail, Trash2, Plus, ArrowRight, Download } from "lucide-react"

const meta: Meta<typeof Button> = {
  title: "Thematic/Atoms/Button",
  component: Button,
  tags: ["autodocs"],
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

// All variants overview
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs text-muted-foreground mb-3 font-mono">Variants</p>
        <div className="flex flex-wrap gap-3">
          <Button variant="default">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-3 font-mono">Sizes</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-3 font-mono">States</p>
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button disabled>Disabled</Button>
          <Button isLoading>Loading</Button>
        </div>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-3 font-mono">With Icons</p>
        <div className="flex flex-wrap gap-3">
          <Button><Mail />Send Email</Button>
          <Button variant="outline"><Download />Download</Button>
          <Button variant="destructive"><Trash2 />Delete</Button>
          <Button size="icon"><Plus /></Button>
        </div>
      </div>
    </div>
  ),
}
