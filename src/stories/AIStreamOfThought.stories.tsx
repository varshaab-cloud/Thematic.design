import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { StreamOfThought } from "../../components/ui/stream-of-thought"
import type { ThoughtStep } from "../../components/ui/stream-of-thought"

const STEPS_DONE: ThoughtStep[] = [
  { id: "1", content: "The user wants a summary of the quarterly report. I should look for key financial metrics, highlights and risks." },
  { id: "2", content: "The document is 42 pages. I'll focus on the executive summary, P&L, and the outlook section." },
  { id: "3", content: "Revenue grew 12% YoY. Costs grew 8%. Net margin improved by 2pp. Main risk flagged is supply-chain exposure." },
  { id: "4", content: "I have enough to write a concise 4-point summary. No citations needed as this is a single uploaded document." },
]

const STEPS_STREAMING: ThoughtStep[] = [
  { id: "1", content: "The user is asking about token budgets. Let me recall how extended thinking works." },
  { id: "2", content: "Token budget controls the internal reasoning chain length before responding." },
  { id: "3", content: "I should explain the quality-latency-cost trade-off clearly", isStreaming: true },
]

const meta: Meta<typeof StreamOfThought> = {
  title: "AI / Conversation/StreamOfThought",
  component: StreamOfThought,
  parameters: { layout: "padded" },
  argTypes: {
    isStreaming:      { control: "boolean" },
    defaultExpanded:  { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof StreamOfThought>

export const Collapsed: Story = {
  name: "Collapsed — done",
  render: () => (
    <div className="max-w-2xl">
      <StreamOfThought steps={STEPS_DONE} label="Thinking" />
    </div>
  ),
}

export const Expanded: Story = {
  name: "Expanded — done",
  render: () => (
    <div className="max-w-2xl">
      <StreamOfThought steps={STEPS_DONE} defaultExpanded label="Thinking" />
    </div>
  ),
}

export const StreamingInProgress: Story = {
  name: "Streaming — in progress",
  render: () => (
    <div className="max-w-2xl">
      <StreamOfThought
        steps={STEPS_STREAMING}
        isStreaming
        defaultExpanded
        label="Thinking"
      />
    </div>
  ),
}

export const Empty: Story = {
  name: "Streaming — empty (just started)",
  render: () => (
    <div className="max-w-2xl">
      <StreamOfThought steps={[]} isStreaming defaultExpanded label="Thinking" />
    </div>
  ),
}

export const InContext: Story = {
  name: "In message thread context",
  render: () => (
    <div className="flex flex-col gap-3 max-w-2xl">
      <div className="text-sm text-muted-foreground ml-10">User: Summarise this document for me</div>
      <StreamOfThought steps={STEPS_DONE} label="Thinking" defaultExpanded />
      <div className="ml-10 rounded-xl bg-muted px-4 py-3 text-sm">
        Here's a 4-point summary of the quarterly report: Revenue grew 12% YoY, costs grew 8%,
        net margin improved 2pp, and the key risk is supply-chain exposure.
      </div>
    </div>
  ),
}

export const Playground: Story = {
  args: {
    steps: STEPS_DONE,
    label: "Thinking",
    isStreaming: false,
    defaultExpanded: false,
  },
}
