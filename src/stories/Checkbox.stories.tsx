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
