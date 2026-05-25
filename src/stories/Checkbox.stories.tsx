import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox } from "../../components/ui/checkbox"

const meta: Meta<typeof Checkbox> = {
  title: "Forms and input/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean", description: "Disables the checkbox" },
    checked: { control: "boolean", description: "Controlled checked state" },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const States: Story = {
  name: "States",
  render: () => (
    <div className="flex items-start gap-8">
      {[
        { label: "Default",          props: {} },
        { label: "Checked",          props: { checked: true, onCheckedChange: () => {} } },
        { label: "Disabled",         props: { disabled: true } },
        { label: "Checked + disabled", props: { checked: true, disabled: true, onCheckedChange: () => {} } },
      ].map(({ label, props }) => (
        <div key={label} className="flex flex-col items-center gap-2">
          <Checkbox {...props} />
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  ),
}

export const Default: Story = {}

export const Checked: Story = {
  args: { checked: true },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Checkbox id="terms" />
        <label htmlFor="terms" className="text-sm">Accept terms and conditions</label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="newsletter" defaultChecked />
        <label htmlFor="newsletter" className="text-sm">Subscribe to newsletter</label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="disabled" disabled />
        <label htmlFor="disabled" className="text-sm text-muted-foreground">Disabled option</label>
      </div>
    </div>
  ),
}
