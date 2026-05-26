import type { Meta, StoryObj } from "@storybook/react"
import { CopyToClipboard } from "../../components/ui/copy-to-clipboard"

const meta: Meta<typeof CopyToClipboard> = {
  title: "Forms and input/CopyToClipboard",
  component: CopyToClipboard,
  tags: ["!autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "Text to copy to clipboard",
    },
    timeout: {
      control: "number",
      description: "Milliseconds before reverting to idle state",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the copy button",
    },
  },
}

export default meta
type Story = StoryObj<typeof CopyToClipboard>

export const Default: Story = {
  args: {
    value: "npm install @thematic/ui",
    size: "md",
    timeout: 2000,
  },
}

export const WithCodeBlock: Story = {
  name: "With code block",
  render: () => (
    <div className="relative max-w-md rounded-[var(--base-radius-md)] bg-[var(--base-color-gray-900)] p-4 font-mono text-sm text-[var(--base-color-gray-100)]">
      <CopyToClipboard
        value="npm install @thematic/ui"
        size="sm"
        className="absolute right-2 top-2"
      />
      <pre className="pr-8">npm install @thematic/ui</pre>
    </div>
  ),
}

export const InlineText: Story = {
  name: "Inline with text",
  render: () => (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground font-mono">API key</span>
      <CopyToClipboard value="sk-thematic-abc123xyz789">
        <code className="rounded bg-[var(--base-color-gray-100)] px-2 py-1 text-xs font-mono text-[var(--base-color-gray-900)]">
          sk-thematic-abc123xyz789
        </code>
      </CopyToClipboard>
    </div>
  ),
}
