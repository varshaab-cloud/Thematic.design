import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { ActionPlan } from "../../components/ui/action-plan"
import type { PlanStep } from "../../components/ui/action-plan"

const STEPS: PlanStep[] = [
  { id: "1", label: "Search the web for recent pricing data",       description: "tool: web_search" },
  { id: "2", label: "Extract relevant figures from top 3 results",  description: "tool: read_page" },
  { id: "3", label: "Compile comparison table",                     description: "Structured output" },
  { id: "4", label: "Write summary with sources",                   description: "Final response" },
]

const meta: Meta<typeof ActionPlan> = {
  title: "AI / Conversation/ActionPlan",
  component: ActionPlan,
  parameters: { layout: "padded" },
  argTypes: {
    state: {
      control: "select",
      options: ["awaiting-confirmation", "executing", "done", "cancelled", "error"],
    },
  },
}

export default meta
type Story = StoryObj<typeof ActionPlan>

export const AwaitingConfirmation: Story = {
  name: "Awaiting confirmation",
  render: () => (
    <div className="max-w-lg">
      <ActionPlan
        steps={STEPS}
        state="awaiting-confirmation"
        title="Here's what I'll do:"
        onConfirm={() => alert("Confirmed!")}
        onCancel={() => alert("Cancelled")}
      />
    </div>
  ),
}

export const Executing: Story = {
  name: "Executing — step 2 active",
  render: () => (
    <div className="max-w-lg">
      <ActionPlan
        steps={[
          { ...STEPS[0], state: "done" },
          { ...STEPS[1], state: "active" },
          { ...STEPS[2], state: "pending" },
          { ...STEPS[3], state: "pending" },
        ]}
        state="executing"
        title="Working on it…"
      />
    </div>
  ),
}

export const Done: Story = {
  name: "Done",
  render: () => (
    <div className="max-w-lg">
      <ActionPlan
        steps={STEPS.map((s) => ({ ...s, state: "done" as const }))}
        state="done"
        title="Completed:"
      />
    </div>
  ),
}

export const Cancelled: Story = {
  name: "Cancelled",
  render: () => (
    <div className="max-w-lg">
      <ActionPlan
        steps={[
          { ...STEPS[0], state: "done" },
          { ...STEPS[1], state: "skipped" },
          { ...STEPS[2], state: "skipped" },
          { ...STEPS[3], state: "skipped" },
        ]}
        state="cancelled"
        title="Cancelled after step 1"
      />
    </div>
  ),
}

export const WithError: Story = {
  name: "Error on step 2",
  render: () => (
    <div className="max-w-lg">
      <ActionPlan
        steps={[
          { ...STEPS[0], state: "done" },
          { ...STEPS[1], state: "error", description: "tool: read_page — ECONNREFUSED" },
          { ...STEPS[2], state: "skipped" },
          { ...STEPS[3], state: "skipped" },
        ]}
        state="error"
        title="Stopped — tool call failed"
      />
    </div>
  ),
}

export const Playground: Story = {
  args: {
    steps: STEPS,
    state: "awaiting-confirmation",
    title: "Here's what I'll do:",
    confirmLabel: "Confirm & run",
    cancelLabel: "Cancel",
  },
}
