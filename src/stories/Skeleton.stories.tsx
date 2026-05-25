import type { Meta, StoryObj } from "@storybook/react"
import { Skeleton } from "../../components/ui/skeleton"

const meta: Meta<typeof Skeleton> = {
  title: "Loading/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  render: () => <Skeleton className="h-4 w-48" />,
}

export const CardSkeleton: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm p-4 border rounded-md">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  ),
}

export const TableSkeleton: Story = {
  render: () => (
    <div className="flex flex-col gap-2 max-w-lg">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-3/4" />
    </div>
  ),
}

export const ProfileSkeleton: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-48" />
      </div>
    </div>
  ),
}
