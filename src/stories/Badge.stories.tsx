import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "../../components/ui/badge"

const meta: Meta<typeof Badge> = {
  title: "Data display/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "destructive", "success", "info", "warning", "error", "brand"],
      description: "Visual style of the badge",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the badge",
    },
    dot: {
      control: "boolean",
      description: "Shows a status dot before the label",
    },
    children: {
      control: "text",
      description: "Badge label",
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Variants: Story = {
  name: "Variants",
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      {[
        { label: "Default",     props: { variant: "default"     as const, children: "Default" } },
        { label: "Secondary",   props: { variant: "secondary"   as const, children: "Secondary" } },
        { label: "Outline",     props: { variant: "outline"     as const, children: "Outline" } },
        { label: "Destructive", props: { variant: "destructive" as const, children: "Destructive" } },
        { label: "Success",     props: { variant: "success"     as const, children: "Success" } },
        { label: "Info",        props: { variant: "info"        as const, children: "Info" } },
        { label: "Warning",     props: { variant: "warning"     as const, children: "Warning" } },
        { label: "Error",       props: { variant: "error"       as const, children: "Error" } },
        { label: "Brand",       props: { variant: "brand"       as const, children: "Brand" } },
      ].map(({ label, props }) => (
        <div key={label} className="flex flex-col items-center gap-2">
          <Badge {...props} />
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  ),
}

export const WithDotAll: Story = {
  name: "With dot indicator",
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      {[
        { label: "Success", props: { variant: "success" as const, dot: true, children: "Active" } },
        { label: "Info",    props: { variant: "info"    as const, dot: true, children: "Processing" } },
        { label: "Warning", props: { variant: "warning" as const, dot: true, children: "Degraded" } },
        { label: "Error",   props: { variant: "error"   as const, dot: true, children: "Incident" } },
      ].map(({ label, props }) => (
        <div key={label} className="flex flex-col items-center gap-2">
          <Badge {...props} />
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  ),
}

// Core variants
export const Default: Story = {
  args: { children: "Default" },
}

export const Secondary: Story = {
  args: { children: "Secondary", variant: "secondary" },
}

export const Outline: Story = {
  args: { children: "Outline", variant: "outline" },
}

export const Destructive: Story = {
  args: { children: "Destructive", variant: "destructive" },
}

// Thematic semantic variants
export const Success: Story = {
  args: { children: "Success", variant: "success" },
}

export const Info: Story = {
  args: { children: "Info", variant: "info" },
}

export const Warning: Story = {
  args: { children: "Warning", variant: "warning" },
}

export const Error: Story = {
  args: { children: "Error", variant: "error" },
}

export const Brand: Story = {
  args: { children: "Brand", variant: "brand" },
}

// With dot indicator
export const WithDot: Story = {
  args: { children: "Active", variant: "success", dot: true },
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
}

// All semantic variants
export const SemanticVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs text-muted-foreground mb-2 font-mono">Semantic — from Thematic tokens</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">Success</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="brand">Brand</Badge>
        </div>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-2 font-mono">With dot indicator</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success" dot>Active</Badge>
          <Badge variant="warning" dot>Pending</Badge>
          <Badge variant="error" dot>Failed</Badge>
          <Badge variant="info" dot>Processing</Badge>
        </div>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-2 font-mono">Sizes</p>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="success" size="sm">Small</Badge>
          <Badge variant="success" size="md">Medium</Badge>
          <Badge variant="success" size="lg">Large</Badge>
        </div>
      </div>
    </div>
  ),
}

export const StatusExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-muted-foreground font-mono mb-1">Real-world status usage</p>
      <div className="flex flex-wrap gap-2">
        <Badge variant="success" dot>Deployed</Badge>
        <Badge variant="info" dot>Building</Badge>
        <Badge variant="warning" dot>Degraded</Badge>
        <Badge variant="error" dot>Incident</Badge>
        <Badge variant="outline">Draft</Badge>
        <Badge variant="secondary">Archived</Badge>
        <Badge variant="brand">New</Badge>
      </div>
    </div>
  ),
}
