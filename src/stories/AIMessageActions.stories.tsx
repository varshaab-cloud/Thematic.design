import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { MessageActions } from "../../components/ui/message-actions"

const meta: Meta<typeof MessageActions> = {
  title: "AI / Conversation/MessageActions",
  component: MessageActions,
  parameters: { layout: "padded" },
}

export default meta
type Story = StoryObj<typeof MessageActions>

export const AssistantActions: Story = {
  name: "Assistant message actions",
  render: () => (
    <MessageActions
      onCopy={() => alert("Copied!")}
      onRegenerate={() => alert("Regenerate")}
      onThumbsUp={() => alert("👍")}
      onThumbsDown={() => alert("👎")}
    />
  ),
}

export const UserActions: Story = {
  name: "User message actions",
  render: () => (
    <MessageActions
      showEdit
      showRegenerate={false}
      onCopy={() => alert("Copied!")}
      onEdit={() => alert("Edit")}
      onThumbsUp={() => alert("👍")}
      onThumbsDown={() => alert("👎")}
    />
  ),
}

export const CopiedState: Story = {
  name: "Copy — confirmed",
  render: () => (
    <MessageActions
      isCopied
      onCopy={() => {}}
      onRegenerate={() => {}}
      onThumbsUp={() => {}}
      onThumbsDown={() => {}}
    />
  ),
}

export const InContext: Story = {
  name: "In context — below a message",
  render: () => (
    <div className="flex flex-col gap-1 max-w-2xl">
      <div className="rounded-xl bg-muted px-4 py-3 text-sm">
        Token budgets allow you to control how much internal reasoning a model performs before
        returning its response, trading some quality for lower latency and cost.
      </div>
      <div className="flex justify-start pl-10">
        <MessageActions
          onCopy={() => {}}
          onRegenerate={() => {}}
          onThumbsUp={() => {}}
          onThumbsDown={() => {}}
        />
      </div>
    </div>
  ),
}
