import type { Meta, StoryObj } from "@storybook/react"
import { PromptSuggestions } from "../../components/ui/prompt-suggestions"
import type { Suggestion } from "../../components/ui/prompt-suggestions"
import { FileText, BarChart2, Code2, MessageSquare } from "lucide-react"

const SUGGESTIONS: Suggestion[] = [
  {
    id: "summarise",
    label: "Summarise this document",
    description: "Get a structured overview of the key points",
    icon: <FileText className="size-4" />,
  },
  {
    id: "analyse",
    label: "Analyse the data",
    description: "Spot trends, outliers, and key insights",
    icon: <BarChart2 className="size-4" />,
  },
  {
    id: "code",
    label: "Write a code snippet",
    description: "Generate or explain code in any language",
    icon: <Code2 className="size-4" />,
  },
  {
    id: "brainstorm",
    label: "Brainstorm ideas",
    description: "Explore creative angles on any topic",
    icon: <MessageSquare className="size-4" />,
  },
]

const meta: Meta<typeof PromptSuggestions> = {
  title: "AI / Conversation/PromptSuggestions",
  component: PromptSuggestions,
  parameters: { layout: "padded" },
  argTypes: {
    layout: {
      control: "select",
      options: ["wrap", "column"],
    },
  },
}

export default meta
type Story = StoryObj<typeof PromptSuggestions>

export const WrapLayout: Story = {
  name: "Wrap layout",
  render: () => (
    <div className="max-w-2xl">
      <PromptSuggestions
        heading="What can I help you with?"
        suggestions={SUGGESTIONS}
        onSelect={(s) => alert(s.label)}
      />
    </div>
  ),
}

export const ColumnLayout: Story = {
  name: "Column layout",
  render: () => (
    <div className="max-w-md">
      <PromptSuggestions
        heading="Suggested actions"
        suggestions={SUGGESTIONS.slice(0, 3)}
        layout="column"
        onSelect={(s) => alert(s.label)}
      />
    </div>
  ),
}

export const EmptyState: Story = {
  name: "Empty onboarding state",
  render: () => (
    <div className="flex flex-col items-center gap-6 py-12 max-w-2xl mx-auto">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-[var(--alias-color-text-primary)]">
          What would you like to do?
        </h2>
        <p className="mt-1 text-sm text-[var(--alias-color-text-subtle)]">
          Start with a suggestion or type your own message below.
        </p>
      </div>
      <PromptSuggestions
        suggestions={SUGGESTIONS}
        onSelect={(s) => alert(s.label)}
      />
    </div>
  ),
}

export const Playground: Story = {
  args: {
    heading: "Suggested prompts",
    layout: "wrap",
    suggestions: SUGGESTIONS,
  },
}
