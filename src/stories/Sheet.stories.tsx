import type { Meta, StoryObj } from "@storybook/react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../../components/ui/sheet"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"

const meta: Meta<typeof Sheet> = {
  title: "Thematic/Components/Sheet",
  component: Sheet,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Sheet>

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Panel</SheetTitle>
          <SheetDescription>This slides in from the right. Used for detail panels and settings in enterprise apps.</SheetDescription>
        </SheetHeader>
        <div className="mt-6 flex flex-col gap-4">
          <Input placeholder="Search..." />
          <Button>Save Changes</Button>
        </div>
      </SheetContent>
    </Sheet>
  ),
}

export const LeftSheet: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Left Sheet</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Left Panel</SheetTitle>
          <SheetDescription>This slides in from the left. Great for navigation drawers.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
}
