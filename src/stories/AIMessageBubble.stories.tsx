import type { Meta, StoryObj } from "@storybook/react"
import { MessageBubble } from "../../components/ui/message-bubble"

const meta: Meta<typeof MessageBubble> = {
  title: "AI / Conversation/MessageBubble",
  component: MessageBubble,
  parameters: { layout: "padded" },
  argTypes: {
    variant: {
      control: "select",
      options: ["assistant", "user", "system"],
    },
    isStreaming: { control: "boolean" },
    isError:     { control: "boolean" },
    isEdited:    { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof MessageBubble>

export const AssistantDefault: Story = {
  name: "Assistant — default",
  render: () => (
    <MessageBubble variant="assistant" name="Assistant" avatarFallback="AI">
      Sure — here's a quick summary of the key points from the document you shared.
    </MessageBubble>
  ),
}

export const UserDefault: Story = {
  name: "User — default",
  render: () => (
    <MessageBubble variant="user" name="You" avatarFallback="SN">
      Can you summarise this for me?
    </MessageBubble>
  ),
}

export const AssistantStreaming: Story = {
  name: "Assistant — streaming",
  render: () => (
    <MessageBubble variant="assistant" name="Assistant" avatarFallback="AI" isStreaming>
      The document covers three main themes: cost reduction, process automation, and
    </MessageBubble>
  ),
}

export const AssistantError: Story = {
  name: "Assistant — error",
  render: () => (
    <MessageBubble variant="assistant" name="Assistant" avatarFallback="AI" isError>
      Something went wrong. Please try again.
    </MessageBubble>
  ),
}

export const UserEdited: Story = {
  name: "User — edited",
  render: () => (
    <MessageBubble variant="user" name="You" avatarFallback="SN" isEdited timestamp="2:34 PM">
      Summarise this document in bullet points, please.
    </MessageBubble>
  ),
}

export const SystemNotice: Story = {
  name: "System — notice",
  render: () => (
    <MessageBubble variant="system">
      Conversation context cleared. Starting a new session.
    </MessageBubble>
  ),
}

export const AllVariants: Story = {
  name: "All variants",
  render: () => (
    <div className="flex flex-col gap-4 max-w-2xl">
      <MessageBubble variant="system">Conversation started</MessageBubble>
      <MessageBubble variant="user" name="You" avatarFallback="SN">
        Can you explain token budgets?
      </MessageBubble>
      <MessageBubble variant="assistant" name="Assistant" avatarFallback="AI">
        A token budget sets a maximum number of tokens the model will use when reasoning through a problem.
        By capping internal thinking, you trade some quality for lower latency and cost.
      </MessageBubble>
      <MessageBubble variant="assistant" name="Assistant" avatarFallback="AI" isStreaming>
        Extended thinking lets the model reason more
      </MessageBubble>
    </div>
  ),
}

export const Playground: Story = {
  args: {
    variant: "assistant",
    name: "Assistant",
    avatarFallback: "AI",
    isStreaming: false,
    isError: false,
    isEdited: false,
    children: "This is a sample message from the assistant.",
  },
}
