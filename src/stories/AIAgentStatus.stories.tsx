import type { Meta, StoryObj } from "@storybook/react"
import { AgentStatus } from "../../components/ui/agent-status"

const meta: Meta<typeof AgentStatus> = {
  title: "AI / Conversation/AgentStatus",
  component: AgentStatus,
  parameters: { layout: "padded" },
  argTypes: {
    state: {
      control: "select",
      options: ["thinking", "tool-running", "done", "error"],
    },
    expandable: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof AgentStatus>

export const Thinking: Story = {
  name: "Thinking",
  render: () => <AgentStatus state="thinking" label="Thinking…" />,
}

export const ToolRunning: Story = {
  name: "Tool running",
  render: () => (
    <AgentStatus
      state="tool-running"
      label="Searching the web"
      detail={`tool: web_search\nquery: "thematic design system storybook"`}
      expandable
    />
  ),
}

export const ToolDone: Story = {
  name: "Done",
  render: () => (
    <AgentStatus
      state="done"
      label="Search complete — 5 results found"
      detail={`tool: web_search\nresults: 5`}
      expandable
    />
  ),
}

export const ToolError: Story = {
  name: "Error",
  render: () => (
    <AgentStatus
      state="error"
      label="Tool call failed — could not connect"
      detail={`tool: get_weather\nerror: ECONNREFUSED`}
      expandable
    />
  ),
}

export const AllStates: Story = {
  name: "All states",
  render: () => (
    <div className="flex flex-col gap-3">
      <AgentStatus state="thinking" label="Thinking…" />
      <AgentStatus state="tool-running" label="Searching the web" />
      <AgentStatus state="tool-running" label="Calling get_current_weather" expandable detail={`tool: get_current_weather\nargs: { location: "London" }`} />
      <AgentStatus state="done" label="Code executed successfully" />
      <AgentStatus state="error" label="Tool call failed — rate limit exceeded" />
    </div>
  ),
}

export const Playground: Story = {
  args: {
    state: "tool-running",
    label: "Calling get_weather",
    detail: `tool: get_weather\nargs: { location: "Sydney" }`,
    expandable: true,
  },
}
