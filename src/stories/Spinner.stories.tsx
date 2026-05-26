import type { Meta, StoryObj } from "@storybook/react"
import { Spinner } from "../../components/ui/spinner"

const meta: Meta<typeof Spinner> = {
  title: "Loading/Spinner",
  component: Spinner,
  tags: ["!autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the spinner",
    },
    variant: {
      control: "select",
      options: ["default", "brand"],
      description: "Colour variant",
    },
    label: {
      control: "text",
      description: "Screen-reader label (sr-only)",
    },
  },
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  args: { size: "md", variant: "default", label: "Loading" },
}

export const Sizes: Story = {
  name: "Sizes",
  render: () => (
    <div className="flex items-center gap-6">
      {(["sm", "md", "lg"] as const).map((s) => (
        <div key={s} className="flex flex-col items-center gap-2">
          <Spinner size={s} />
          <span className="text-xs text-muted-foreground">{s}</span>
        </div>
      ))}
    </div>
  ),
}

export const Variants: Story = {
  name: "Variants",
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="default" />
        <span className="text-xs text-muted-foreground">Default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="brand" />
        <span className="text-xs text-muted-foreground">Brand</span>
      </div>
    </div>
  ),
}

export const InlineWithText: Story = {
  name: "Inline with text",
  render: () => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Spinner size="sm" />
      <span>Saving changes…</span>
    </div>
  ),
}
