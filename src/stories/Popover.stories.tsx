import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Popover, PopoverContent, PopoverTrigger, PopoverHeader, PopoverTitle, PopoverDescription } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Filter } from "lucide-react"

const meta: Meta = {
  title: "Overlays/Popover",
  parameters: { layout: "centered" },
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Quick settings</PopoverTitle>
          <PopoverDescription>Adjust preferences for this view.</PopoverDescription>
        </PopoverHeader>
        <div className="flex flex-col gap-2 pt-1">
          <Input label="Display name" placeholder="My workspace" />
          <Button size="sm" fullWidth>Save changes</Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const FilterPopover: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter /> Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <PopoverHeader>
          <PopoverTitle>Filter by status</PopoverTitle>
        </PopoverHeader>
        <div className="flex flex-col gap-1 pt-2">
          {["Active", "Pending", "Inactive", "Archived"].map(status => (
            <label key={status} className="flex items-center gap-2 rounded-md px-1.5 py-1 text-sm hover:bg-[var(--base-color-gray-100)] cursor-pointer">
              <input type="checkbox" className="size-3.5 accent-primary" />
              {status}
            </label>
          ))}
        </div>
        <div className="flex gap-2 pt-3 border-t border-[var(--base-color-gray-200)] mt-2">
          <Button variant="ghost" size="sm" fullWidth>Clear</Button>
          <Button size="sm" fullWidth>Apply</Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
}
