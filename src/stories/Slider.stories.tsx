import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Slider } from "@/components/ui/slider"

const meta: Meta<typeof Slider> = {
  title: "Thematic/Controls/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div className="w-72">
      <Slider defaultValue={[40]} max={100} step={1} label="Volume" showValue />
    </div>
  ),
}

export const WithHelperText: Story = {
  render: () => (
    <div className="w-72">
      <Slider
        defaultValue={[25]}
        max={100}
        step={5}
        label="Confidence threshold"
        showValue
        formatValue={(v) => `${v}%`}
        helperText="Predictions below this score will be flagged for review."
      />
    </div>
  ),
}

export const Range: Story = {
  render: () => (
    <div className="w-72">
      <Slider
        defaultValue={[20, 80]}
        max={100}
        step={1}
        label="Price range"
        showValue
        formatValue={(v) => `$${v}`}
      />
    </div>
  ),
}

export const Steps: Story = {
  render: () => (
    <div className="w-72">
      <Slider
        defaultValue={[3]}
        min={1}
        max={5}
        step={1}
        label="Priority"
        showValue
        formatValue={(v) => ["", "Low", "Medium", "High", "Critical", "Blocker"][v]}
        helperText="Sets the default priority for new issues."
      />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="w-72">
      <Slider defaultValue={[60]} max={100} label="Storage used" showValue formatValue={(v) => `${v}%`} disabled />
    </div>
  ),
}
