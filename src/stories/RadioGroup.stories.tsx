import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { RadioGroup, RadioGroupItem, RadioGroupLabel } from "@/components/ui/radio-group"

const meta: Meta<typeof RadioGroup> = {
  title: "Forms and input/RadioGroup",
  component: RadioGroup,
  parameters: { layout: "centered" },
}
export default meta
type Story = StoryObj

export const States: Story = {
  name: "States",
  render: () => (
    <div className="flex flex-wrap items-start gap-16">
      <div className="flex flex-col items-start gap-2">
        <RadioGroup defaultValue="member">
          <RadioGroupLabel>Access level</RadioGroupLabel>
          <RadioGroupItem value="viewer" label="Viewer" />
          <RadioGroupItem value="member" label="Member" />
          <RadioGroupItem value="admin"  label="Admin" />
        </RadioGroup>
        <span className="text-xs text-muted-foreground">Default</span>
      </div>
      <div className="flex flex-col items-start gap-2">
        <RadioGroup defaultValue="monthly">
          <RadioGroupLabel>Billing</RadioGroupLabel>
          <RadioGroupItem value="monthly"    label="Monthly" />
          <RadioGroupItem value="annual"     label="Annual" />
          <RadioGroupItem value="enterprise" label="Enterprise" disabled />
        </RadioGroup>
        <span className="text-xs text-muted-foreground">With disabled item</span>
      </div>
      <div className="flex flex-col items-start gap-2">
        <RadioGroup>
          <RadioGroupLabel>Billing</RadioGroupLabel>
          <RadioGroupItem value="monthly"    label="Monthly"    disabled />
          <RadioGroupItem value="annual"     label="Annual"     disabled />
          <RadioGroupItem value="enterprise" label="Enterprise" disabled />
        </RadioGroup>
        <span className="text-xs text-muted-foreground">All disabled</span>
      </div>
    </div>
  ),
}

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="designer">
      <RadioGroupLabel>Role</RadioGroupLabel>
      <RadioGroupItem value="designer" label="Designer" />
      <RadioGroupItem value="engineer" label="Engineer" />
      <RadioGroupItem value="pm" label="Product Manager" />
    </RadioGroup>
  ),
}

export const WithDescriptions: Story = {
  render: () => (
    <RadioGroup defaultValue="team">
      <RadioGroupLabel>Access level</RadioGroupLabel>
      <RadioGroupItem
        value="view"
        label="Viewer"
        description="Can view all projects but cannot make changes."
      />
      <RadioGroupItem
        value="team"
        label="Member"
        description="Can create, edit, and comment on projects."
      />
      <RadioGroupItem
        value="admin"
        label="Admin"
        description="Full access including billing and team settings."
      />
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="monthly">
      <RadioGroupLabel>Billing cycle</RadioGroupLabel>
      <RadioGroupItem value="monthly" label="Monthly" />
      <RadioGroupItem value="annual" label="Annual — 20% off" />
      <RadioGroupItem value="enterprise" label="Enterprise" disabled description="Contact sales to enable." />
    </RadioGroup>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="md" className="flex-row gap-6">
      <RadioGroupItem value="sm" label="Small" />
      <RadioGroupItem value="md" label="Medium" />
      <RadioGroupItem value="lg" label="Large" />
    </RadioGroup>
  ),
}

export const Sizes: Story = {
  name: "Sizes",
  render: () => (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">SM</span>
        <RadioGroup defaultValue="b" className="flex-row gap-5">
          <RadioGroupItem value="a" label="Small" size="sm" />
          <RadioGroupItem value="b" label="Medium" size="sm" />
          <RadioGroupItem value="c" label="Large" size="sm" />
        </RadioGroup>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">MD (default)</span>
        <RadioGroup defaultValue="b" className="flex-row gap-5">
          <RadioGroupItem value="a" label="Small" size="md" />
          <RadioGroupItem value="b" label="Medium" size="md" />
          <RadioGroupItem value="c" label="Large" size="md" />
        </RadioGroup>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">LG</span>
        <RadioGroup defaultValue="b" className="flex-row gap-5">
          <RadioGroupItem value="a" label="Small" size="lg" />
          <RadioGroupItem value="b" label="Medium" size="lg" />
          <RadioGroupItem value="c" label="Large" size="lg" />
        </RadioGroup>
      </div>
    </div>
  ),
}
