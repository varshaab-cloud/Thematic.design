import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import React from "react"
import { Combobox } from "@/components/ui/combobox"

const meta: Meta<typeof Combobox> = {
  title: "Forms and input/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}
export default meta
type Story = StoryObj<typeof Combobox>

const roles = [
  { value: "designer", label: "Designer" },
  { value: "engineer", label: "Engineer" },
  { value: "pm", label: "Product Manager" },
  { value: "data", label: "Data Analyst" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "support", label: "Customer Support" },
]

const countries = [
  { value: "in", label: "India", description: "Asia/Kolkata" },
  { value: "us", label: "United States", description: "America/New_York" },
  { value: "gb", label: "United Kingdom", description: "Europe/London" },
  { value: "de", label: "Germany", description: "Europe/Berlin" },
  { value: "fr", label: "France", description: "Europe/Paris" },
  { value: "jp", label: "Japan", description: "Asia/Tokyo" },
  { value: "au", label: "Australia", description: "Australia/Sydney" },
]

function ControlledCombobox({ options, label, helperText }: { options: typeof roles, label?: string, helperText?: string }) {
  const [value, setValue] = React.useState("")
  return (
    <div className="w-72">
      <Combobox
        options={options}
        value={value}
        onValueChange={setValue}
        label={label}
        helperText={helperText}
      />
    </div>
  )
}

export const States: Story = {
  name: "States",
  render: () => (
    <div className="flex flex-nowrap items-start gap-4">
      <div className="flex flex-col items-start gap-2 w-44">
        <Combobox options={roles} label="Role" />
        <span className="text-xs text-muted-foreground">Default</span>
      </div>
      <div className="flex flex-col items-start gap-2 w-44">
        <Combobox options={roles} value="engineer" onValueChange={() => {}} label="Role" />
        <span className="text-xs text-muted-foreground">Filled</span>
      </div>
      <div className="flex flex-col items-start gap-2 w-44">
        <Combobox options={roles} label="Role" required errorMessage="Please select a role." />
        <span className="text-xs text-muted-foreground">Error</span>
      </div>
      <div className="flex flex-col items-start gap-2 w-44">
        <Combobox options={roles} value="engineer" onValueChange={() => {}} label="Role" disabled helperText="Contact admin to change." />
        <span className="text-xs text-muted-foreground">Disabled</span>
      </div>
    </div>
  ),
}

export const Default: Story = {
  render: () => <ControlledCombobox options={roles} label="Role" />,
}

export const WithDescriptions: Story = {
  render: () => <ControlledCombobox options={countries} label="Timezone" helperText="Used for scheduling and notifications." />,
}

export const WithError: Story = {
  render: () => (
    <div className="w-72">
      <Combobox
        options={roles}
        label="Role"
        required
        errorMessage="Please select a role to continue."
      />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="w-72">
      <Combobox
        options={roles}
        value="engineer"
        label="Role"
        disabled
        helperText="Contact your admin to change your role."
      />
    </div>
  ),
}
