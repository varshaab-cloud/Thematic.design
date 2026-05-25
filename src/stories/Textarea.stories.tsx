import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Textarea } from "@/components/ui/textarea"

const meta: Meta<typeof Textarea> = {
  title: "Forms and input/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}
export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <Textarea label="Description" placeholder="Write something…" />
    </div>
  ),
}

export const WithHelperText: Story = {
  render: () => (
    <div className="w-80">
      <Textarea
        label="Project notes"
        helperText="Visible to all team members."
        placeholder="Add notes…"
      />
    </div>
  ),
}

export const WithCharCount: Story = {
  render: () => (
    <div className="w-80">
      <Textarea
        label="Bio"
        placeholder="Tell us about yourself…"
        maxChars={160}
        helperText="Keep it short and clear."
      />
    </div>
  ),
}

export const Required: Story = {
  render: () => (
    <div className="w-80">
      <Textarea
        label="Reason for request"
        required
        placeholder="Explain why you need access…"
        rows={4}
      />
    </div>
  ),
}

export const ErrorState: Story = {
  render: () => (
    <div className="w-80">
      <Textarea
        label="Description"
        errorMessage="Description is required."
        defaultValue=""
        placeholder="Write something…"
      />
    </div>
  ),
}

export const SuccessState: Story = {
  render: () => (
    <div className="w-80">
      <Textarea
        label="Description"
        successMessage="Looks good!"
        defaultValue="This is a well-written description that passes validation."
      />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <Textarea
        label="Internal notes"
        disabled
        defaultValue="This field is locked by an admin."
      />
    </div>
  ),
}

export const AutoResize: Story = {
  render: () => (
    <div className="w-80">
      <Textarea
        label="Auto-resizing"
        autoResize
        placeholder="Start typing — this grows with your content…"
        helperText="Expands automatically as you type."
      />
    </div>
  ),
}
