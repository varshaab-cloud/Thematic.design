import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { ModelSelector } from "../../components/ui/model-selector"
import type { ModelOption } from "../../components/ui/model-selector"

const MODELS: ModelOption[] = [
  { id: "claude-opus-4-6",    name: "Claude Opus 4.6",    description: "Most capable — complex reasoning",    recommended: true },
  { id: "claude-sonnet-4-6",  name: "Claude Sonnet 4.6",  description: "Balanced — speed and intelligence" },
  { id: "claude-haiku-4-5",   name: "Claude Haiku 4.5",   description: "Fast — lightweight tasks" },
]

const meta: Meta<typeof ModelSelector> = {
  title: "AI / Conversation/ModelSelector",
  component: ModelSelector,
  parameters: { layout: "padded" },
  argTypes: {
    compact:  { control: "boolean" },
    disabled: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof ModelSelector>

export const Default: Story = {
  name: "Default",
  render: () => {
    const [value, setValue] = React.useState("claude-sonnet-4-6")
    return (
      <ModelSelector
        models={MODELS}
        value={value}
        onValueChange={setValue}
      />
    )
  },
}

export const Compact: Story = {
  name: "Compact — for toolbar",
  render: () => {
    const [value, setValue] = React.useState("claude-sonnet-4-6")
    return (
      <ModelSelector
        compact
        models={MODELS}
        value={value}
        onValueChange={setValue}
      />
    )
  },
}

export const InToolbar: Story = {
  name: "In composer toolbar",
  render: () => {
    const [value, setValue] = React.useState("claude-sonnet-4-6")
    return (
      <div className="max-w-2xl rounded-xl border border-[var(--alias-color-border-default)] bg-[var(--alias-color-background-primary)] px-3 py-2 flex items-center justify-between">
        <span className="text-sm text-[var(--alias-color-text-subtle)]">Toolbar context</span>
        <ModelSelector
          compact
          models={MODELS}
          value={value}
          onValueChange={setValue}
        />
      </div>
    )
  },
}

export const Playground: Story = {
  args: {
    models: MODELS,
    compact: false,
    disabled: false,
  },
}
