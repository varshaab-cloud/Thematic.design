import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { PromptTemplates } from "../../components/ui/prompt-templates"
import type { PromptTemplate } from "../../components/ui/prompt-templates"

const TEMPLATES: PromptTemplate[] = [
  {
    id: "summarise",
    title: "Summarise document",
    description: "Get a concise structured summary of the attached file",
    content: "Please summarise the attached document in 5 bullet points, focusing on key findings, decisions, and next steps.",
    category: "Analysis",
    pinned: true,
  },
  {
    id: "rewrite-formal",
    title: "Rewrite — formal tone",
    description: "Make this more professional and concise",
    content: "Rewrite the following text in a formal, professional tone suitable for a business audience. Remove filler words and tighten the prose:\n\n{{text}}",
    category: "Writing",
    pinned: true,
  },
  {
    id: "code-review",
    title: "Code review",
    description: "Review this code for bugs, style, and performance",
    content: "Please review the following code. Look for: (1) bugs or logical errors, (2) security issues, (3) performance concerns, (4) style/readability improvements. Be specific and actionable.\n\n```\n{{code}}\n```",
    category: "Code",
  },
  {
    id: "explain-simple",
    title: "Explain simply",
    description: "Explain this concept as if to a non-expert",
    content: "Explain the following concept in plain language, as if explaining to someone with no technical background. Use an analogy if helpful:\n\n{{concept}}",
    category: "Analysis",
  },
  {
    id: "action-items",
    title: "Extract action items",
    description: "Pull out tasks, owners, and deadlines from meeting notes",
    content: "Read the following meeting notes and extract all action items. Format as a table with columns: Task | Owner | Deadline | Priority.\n\n{{notes}}",
    category: "Productivity",
  },
  {
    id: "translate",
    title: "Translate to English",
    description: "Translate text while preserving tone and nuance",
    content: "Translate the following text into English. Preserve the original tone and formality level. If there are ambiguous phrases, note them:\n\n{{text}}",
    category: "Writing",
  },
]

const meta: Meta = {
  title: "AI / Conversation/PromptTemplates",
  parameters: { layout: "padded" },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  name: "Popover trigger",
  render: () => {
    const [selected, setSelected] = React.useState<string | null>(null)
    return (
      <div className="flex flex-col gap-4">
        <PromptTemplates
          templates={TEMPLATES}
          onSelect={(t) => setSelected(t.content)}
        />
        {selected && (
          <div className="max-w-lg rounded-lg border border-[var(--alias-color-border-default)] bg-muted p-3 text-sm font-mono whitespace-pre-wrap text-xs">
            {selected}
          </div>
        )}
      </div>
    )
  },
}

export const InComposerToolbar: Story = {
  name: "In composer toolbar",
  render: () => {
    const [value, setValue] = React.useState("")
    return (
      <div className="max-w-2xl">
        <div className="flex flex-col rounded-xl border border-[var(--alias-color-border-default)] bg-white">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Message or select a template…"
            className="min-h-[80px] resize-none bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
          />
          <div className="flex items-center justify-between border-t border-[var(--alias-color-border-subtle)] px-3 py-2">
            <PromptTemplates
              templates={TEMPLATES}
              triggerLabel="Templates"
              onSelect={(t) => setValue(t.content)}
            />
            <button
              type="button"
              className="rounded-md bg-[var(--alias-color-background-brand)] px-3 py-1.5 text-sm text-white disabled:opacity-40"
              disabled={!value.trim()}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    )
  },
}

export const AllTemplates: Story = {
  name: "All templates — categories",
  render: () => (
    <PromptTemplates
      templates={TEMPLATES}
      onSelect={(t) => alert(`Selected: ${t.title}`)}
    />
  ),
}
