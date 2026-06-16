import type { Meta, StoryObj } from "@storybook/react"
import { TypingIndicator, StreamingText } from "../../components/ui/streaming-text"

const meta: Meta = {
  title: "AI / Conversation/StreamingText",
  parameters: { layout: "padded" },
}

export default meta
type Story = StoryObj

export const TypingDots: Story = {
  name: "TypingIndicator — dots",
  render: () => <TypingIndicator />,
}

export const StreamingInProgress: Story = {
  name: "StreamingText — in progress",
  render: () => (
    <p className="text-sm max-w-lg">
      <StreamingText isStreaming>
        The model is currently generating this response token by token.
        As each word arrives it is appended to the message
      </StreamingText>
    </p>
  ),
}

export const StreamingStopped: Story = {
  name: "StreamingText — stopped",
  render: () => (
    <p className="text-sm max-w-lg">
      <StreamingText isStopped>
        The response was cut short because you pressed Stop.
      </StreamingText>
    </p>
  ),
}

export const StreamingDone: Story = {
  name: "StreamingText — done",
  render: () => (
    <p className="text-sm max-w-lg">
      <StreamingText>
        The full response has been received and the cursor is gone.
      </StreamingText>
    </p>
  ),
}

export const AllStates: Story = {
  name: "All states",
  render: () => (
    <div className="flex flex-col gap-6 max-w-lg">
      <div>
        <p className="text-xs text-muted-foreground mb-2">Typing indicator (assistant thinking)</p>
        <TypingIndicator />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-2">Streaming in progress</p>
        <p className="text-sm">
          <StreamingText isStreaming>Generating your response</StreamingText>
        </p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-2">Stopped mid-stream</p>
        <p className="text-sm">
          <StreamingText isStopped>This response was stopped early by the user</StreamingText>
        </p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-2">Complete</p>
        <p className="text-sm">
          <StreamingText>The full message has finished generating.</StreamingText>
        </p>
      </div>
    </div>
  ),
}
