import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { Button } from "@/components/ui/button"

const meta: Meta = {
  title: "Messaging/Toast",
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster position="bottom-right" />
      </>
    ),
  ],
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Button variant="outline" onClick={() => toast("Project saved successfully.")}>
      Show toast
    </Button>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast("Changes saved.")}>
        Default
      </Button>
      <Button variant="outline" onClick={() => toast.success("Project published.")}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.error("Failed to save changes.")}>
        Error
      </Button>
      <Button variant="outline" onClick={() => toast.warning("Your session expires in 5 minutes.")}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => toast.info("New version available.")}>
        Info
      </Button>
      <Button variant="outline" onClick={() => toast.loading("Uploading file…")}>
        Loading
      </Button>
    </div>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast("Team member removed.", {
          action: {
            label: "Undo",
            onClick: () => toast.success("Action undone."),
          },
        })
      }
    >
      Remove with undo
    </Button>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast.success("Deployment complete", {
          description: "Version 2.4.1 is now live on production.",
        })
      }
    >
      With description
    </Button>
  ),
}
