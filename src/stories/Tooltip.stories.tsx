import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Info, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

const meta: Meta = {
  title: "Thematic/Patterns/Tooltip",
  parameters: { layout: "centered" },
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>This is a tooltip</TooltipContent>
    </Tooltip>
  ),
}

export const OnIcon: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <span className="text-sm text-foreground">API rate limit</span>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <HelpCircle className="size-4" />
            <span className="sr-only">More info</span>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          Maximum 1,000 requests per minute per API key.
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}

export const Positions: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(["top", "right", "bottom", "left"] as const).map(side => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" className="capitalize">{side}</Button>
          </TooltipTrigger>
          <TooltipContent side={side}>Tooltip on {side}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
}
