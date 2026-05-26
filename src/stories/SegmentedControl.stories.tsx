import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { LayoutList, LayoutGrid, Columns2 } from "lucide-react"
import { SegmentedControl } from "../../components/ui/segmented-control"

const meta: Meta<typeof SegmentedControl> = {
  title: "Forms and input/SegmentedControl",
  component: SegmentedControl,
  tags: ["!autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the control",
    },
    disabled: {
      control: "boolean",
      description: "Disables all segments",
    },
    fullWidth: {
      control: "boolean",
      description: "Stretches the control to fill its container",
    },
  },
}

export default meta
type Story = StoryObj<typeof SegmentedControl>

const viewOptions = [
  { value: "list",  label: "List" },
  { value: "grid",  label: "Grid" },
  { value: "board", label: "Board" },
]

const iconOptions = [
  { value: "list",  label: "List",  icon: <LayoutList /> },
  { value: "grid",  label: "Grid",  icon: <LayoutGrid /> },
  { value: "board", label: "Board", icon: <Columns2 /> },
]

function Controlled({ options = viewOptions, ...props }: Partial<React.ComponentProps<typeof SegmentedControl>> & { options?: typeof viewOptions }) {
  const [val, setVal] = useState(options[0].value)
  return (
    <SegmentedControl
      options={options}
      value={val}
      onChange={setVal}
      {...props}
    />
  )
}

export const Default: Story = {
  render: () => <Controlled options={viewOptions} />,
}

export const WithIcons: Story = {
  name: "With icons",
  render: () => <Controlled options={iconOptions} />,
}

export const Sizes: Story = {
  name: "Sizes",
  render: () => (
    <div className="flex flex-col gap-4">
      {(["sm", "md", "lg"] as const).map((s) => (
        <div key={s} className="flex items-center gap-4">
          <span className="w-6 text-xs text-muted-foreground font-mono">{s}</span>
          <Controlled options={viewOptions} size={s} />
        </div>
      ))}
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Controlled options={viewOptions} disabled />
  ),
}

export const FullWidth: Story = {
  name: "Full width",
  render: () => (
    <div className="max-w-sm">
      <Controlled options={viewOptions} fullWidth />
    </div>
  ),
}
