import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-[var(--component-skeleton-border-radius)] bg-[var(--component-skeleton-background)]", className)}
      {...props}
    />
  )
}

export { Skeleton }
