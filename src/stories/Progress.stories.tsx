import type { Meta, StoryObj } from "@storybook/react"
import { Progress } from "../../components/ui/progress"

const meta: Meta<typeof Progress> = {
  title: "Loading/Progress",
  component: Progress,
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Progress value from 0 to 100",
    },
  },
}

export default meta
type Story = StoryObj<typeof Progress>

export const States: Story = {
  name: "States",
  render: () => (
    <div className="flex flex-col gap-6 w-64">
      <div className="flex flex-col gap-2">
        <Progress value={0} />
        <span className="text-xs text-muted-foreground">0% — Not started</span>
      </div>
      <div className="flex flex-col gap-2">
        <Progress value={45} />
        <span className="text-xs text-muted-foreground">45% — In progress</span>
      </div>
      <div className="flex flex-col gap-2">
        <Progress value={100} />
        <span className="text-xs text-muted-foreground">100% — Complete</span>
      </div>
    </div>
  ),
}

export const Default: Story = {
  args: { value: 50 },
}

export const Empty: Story = {
  args: { value: 0 },
}

export const Full: Story = {
  args: { value: 100 },
}

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <div>
        <p className="text-xs text-muted-foreground mb-1">25%</p>
        <Progress value={25} />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-1">50%</p>
        <Progress value={50} />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-1">75%</p>
        <Progress value={75} />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-1">100%</p>
        <Progress value={100} />
      </div>
    </div>
  ),
}
