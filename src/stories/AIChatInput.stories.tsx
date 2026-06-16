import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { ChatInput } from "../../components/ui/chat-input"

const meta: Meta<typeof ChatInput> = {
  title: "AI / Conversation/ChatInput",
  component: ChatInput,
  parameters: { layout: "padded" },
  argTypes: {
    isStreaming:  { control: "boolean" },
    disabled:     { control: "boolean" },
    isOverLimit:  { control: "boolean" },
    showVoice:    { control: "boolean" },
    showAttach:   { control: "boolean" },
    placeholder:  { control: "text" },
    errorMessage: { control: "text" },
    maxChars:     { control: "number" },
  },
}

export default meta
type Story = StoryObj<typeof ChatInput>

export const Empty: Story = {
  name: "Empty — default",
  render: () => (
    <div className="max-w-2xl">
      <ChatInput placeholder="Message the assistant…" />
    </div>
  ),
}

export const Streaming: Story = {
  name: "Streaming — Stop shown",
  render: () => (
    <div className="max-w-2xl">
      <ChatInput
        isStreaming
        placeholder="Message the assistant…"
        onStop={() => alert("Stop clicked")}
      />
    </div>
  ),
}

export const WithVoice: Story = {
  name: "With voice input",
  render: () => (
    <div className="max-w-2xl">
      <ChatInput showVoice placeholder="Message or speak…" />
    </div>
  ),
}

export const WithAttachments: Story = {
  name: "With attachments",
  render: () => (
    <div className="max-w-2xl">
      <ChatInput
        attachments={[
          { id: "1", name: "report.pdf", type: "file", progress: 100 },
          { id: "2", name: "screenshot.png", type: "image", progress: 65 },
          { id: "3", name: "huge-file.zip", type: "file", error: "File too large (max 25 MB)" },
        ]}
        onRemoveAttachment={(id) => alert(`Remove ${id}`)}
        placeholder="Add a message…"
      />
    </div>
  ),
}

export const WithCharLimit: Story = {
  name: "With character limit",
  render: () => (
    <div className="max-w-2xl">
      <ChatInput
        maxChars={500}
        placeholder="Max 500 characters…"
      />
    </div>
  ),
}

export const OverLimit: Story = {
  name: "Over limit",
  render: () => (
    <div className="max-w-2xl">
      <ChatInput
        isOverLimit
        maxChars={100}
        errorMessage="Message exceeds the 100 character limit."
        placeholder="Message…"
      />
    </div>
  ),
}

export const ErrorState: Story = {
  name: "Error state",
  render: () => (
    <div className="max-w-2xl">
      <ChatInput
        errorMessage="Failed to send. Check your connection and try again."
        placeholder="Message…"
      />
    </div>
  ),
}

export const DisabledState: Story = {
  name: "Disabled",
  render: () => (
    <div className="max-w-2xl">
      <ChatInput disabled placeholder="Conversation not available" />
    </div>
  ),
}

export const Playground: Story = {
  args: {
    placeholder: "Message the assistant…",
    isStreaming:  false,
    disabled:     false,
    isOverLimit:  false,
    showVoice:    false,
    showAttach:   true,
  },
  render: (args) => (
    <div className="max-w-2xl">
      <ChatInput {...args} />
    </div>
  ),
}
