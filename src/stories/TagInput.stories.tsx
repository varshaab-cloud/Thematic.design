import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { TagInput } from "../../components/ui/tag-input"

const meta: Meta<typeof TagInput> = {
  title: "Forms and input/Tag input",
  component: TagInput,
}

export default meta
type Story = StoryObj<typeof TagInput>

export const States: Story = {
  name: "States",
  render: () => {
    const [emptyVal, setEmptyVal] = useState<string[]>([])
    const [withTags, setWithTags] = useState<string[]>(["React", "TypeScript", "Design systems"])
    const [maxVal, setMaxVal] = useState<string[]>(["UX", "Research", "Strategy"])

    return (
      <div className="flex flex-wrap items-start gap-6">
        <div className="flex flex-col gap-2 w-64">
          <TagInput
            value={emptyVal}
            onChange={setEmptyVal}
            placeholder="Add tags…"
          />
          <span className="text-xs text-muted-foreground">Empty</span>
        </div>
        <div className="flex flex-col gap-2 w-64">
          <TagInput
            value={withTags}
            onChange={setWithTags}
            placeholder="Add tags…"
          />
          <span className="text-xs text-muted-foreground">With tags</span>
        </div>
        <div className="flex flex-col gap-2 w-64">
          <TagInput
            value={["Design", "Code"]}
            onChange={() => {}}
            placeholder="Add tags…"
            disabled
          />
          <span className="text-xs text-muted-foreground">Disabled</span>
        </div>
        <div className="flex flex-col gap-2 w-64">
          <TagInput
            value={maxVal}
            onChange={setMaxVal}
            placeholder="Add tags…"
            maxTags={3}
          />
          <span className="text-xs text-muted-foreground">Max reached</span>
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
        <TagInput
          value={value}
          onChange={setValue}
          placeholder="Add tags…"
        />
      </div>
    )
  },
}

export const WithTags: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(["React", "TypeScript", "Design systems"])
    return (
      <div className="w-64">
        <TagInput
          value={value}
          onChange={setValue}
          placeholder="Add tags…"
        />
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => {
    return (
      <div className="w-64">
        <TagInput
          value={["Design", "Code"]}
          onChange={() => {}}
          placeholder="Add tags…"
          disabled
        />
      </div>
    )
  },
}

export const WithMaxTags: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(["UX", "Research"])
    return (
      <div className="w-64">
        <TagInput
          value={value}
          onChange={setValue}
          placeholder="Add tags…"
          maxTags={3}
        />
      </div>
    )
  },
}
