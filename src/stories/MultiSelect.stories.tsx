import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { MultiSelect } from "../../components/ui/multi-select"

const DEPT_OPTIONS = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
  { value: "marketing", label: "Marketing" },
  { value: "product", label: "Product" },
  { value: "operations", label: "Operations" },
]

const MANY_OPTIONS = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
  { value: "marketing", label: "Marketing" },
  { value: "product", label: "Product" },
  { value: "operations", label: "Operations" },
  { value: "sales", label: "Sales" },
  { value: "finance", label: "Finance" },
  { value: "legal", label: "Legal" },
  { value: "hr", label: "HR" },
  { value: "support", label: "Support" },
]

const meta: Meta<typeof MultiSelect> = {
  title: "Forms and input/Multi-select",
  component: MultiSelect,
}

export default meta
type Story = StoryObj<typeof MultiSelect>

export const States: Story = {
  name: "States",
  render: () => {
    const [emptyVal, setEmptyVal] = useState<string[]>([])
    const [withVal, setWithVal] = useState<string[]>(["design", "product"])
    const [disabledVal] = useState<string[]>(["engineering"])

    return (
      <div className="flex flex-wrap items-start gap-6">
        <div className="flex flex-col gap-2 w-64">
          <MultiSelect
            options={DEPT_OPTIONS}
            value={emptyVal}
            onChange={setEmptyVal}
            placeholder="Select departments"
          />
          <span className="text-xs text-muted-foreground">Default</span>
        </div>
        <div className="flex flex-col gap-2 w-64">
          <MultiSelect
            options={DEPT_OPTIONS}
            value={withVal}
            onChange={setWithVal}
            placeholder="Select departments"
          />
          <span className="text-xs text-muted-foreground">With selections</span>
        </div>
        <div className="flex flex-col gap-2 w-64">
          <MultiSelect
            options={DEPT_OPTIONS}
            value={disabledVal}
            onChange={() => {}}
            placeholder="Select departments"
            disabled
          />
          <span className="text-xs text-muted-foreground">Disabled</span>
        </div>
      </div>
    )
  },
}

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])
    return (
      <div className="w-64">
        <MultiSelect
          options={DEPT_OPTIONS}
          value={value}
          onChange={setValue}
          placeholder="Select departments"
        />
      </div>
    )
  },
}

export const WithSelections: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(["design", "product"])
    return (
      <div className="w-64">
        <MultiSelect
          options={DEPT_OPTIONS}
          value={value}
          onChange={setValue}
          placeholder="Select departments"
        />
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => {
    return (
      <div className="w-64">
        <MultiSelect
          options={DEPT_OPTIONS}
          value={["engineering"]}
          onChange={() => {}}
          placeholder="Select departments"
          disabled
        />
      </div>
    )
  },
}

export const ManyOptions: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])
    return (
      <div className="w-64">
        <MultiSelect
          options={MANY_OPTIONS}
          value={value}
          onChange={setValue}
          placeholder="Select teams"
        />
      </div>
    )
  },
}
