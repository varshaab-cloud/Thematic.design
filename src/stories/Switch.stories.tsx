import type { Meta, StoryObj } from "@storybook/react"
import { Switch } from "../../components/ui/switch"

const meta: Meta<typeof Switch> = {
  title: "Forms and input/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean", description: "Disables the switch" },
    checked: { control: "boolean", description: "Controlled checked state" },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {}

export const Checked: Story = {
  args: { checked: true },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Switch id="notifications" />
        <label htmlFor="notifications" className="text-sm">Enable notifications</label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="darkmode" defaultChecked />
        <label htmlFor="darkmode" className="text-sm">Dark mode</label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="disabled" disabled />
        <label htmlFor="disabled" className="text-sm text-muted-foreground">Disabled option</label>
      </div>
    </div>
  ),
}
