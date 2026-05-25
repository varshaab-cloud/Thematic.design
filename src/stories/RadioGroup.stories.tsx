import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { RadioGroup, RadioGroupItem, RadioGroupLabel } from "@/components/ui/radio-group"

const meta: Meta<typeof RadioGroup> = {
  title: "Forms and input/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}
export default meta
type Story = StoryObj

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
    <RadioGroup defaultValue="md" className="flex-row gap-4">
      <RadioGroupItem value="sm" label="Small" />
      <RadioGroupItem value="md" label="Medium" />
      <RadioGroupItem value="lg" label="Large" />
    </RadioGroup>
  ),
}
