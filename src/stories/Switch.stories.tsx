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

export const States: Story = {
  name: "States",
  render: () => (
    <div className="flex items-start gap-8">
      {[
        { label: "Default",            props: {} },
        { label: "Checked",            props: { checked: true,  onCheckedChange: () => {} } },
        { label: "Disabled",           props: { disabled: true } },
        { label: "Checked + disabled", props: { checked: true,  onCheckedChange: () => {}, disabled: true } },
      ].map(({ label, props }) => (
        <div key={label} className="flex flex-col items-center gap-2">
          <Switch {...props} />
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
