import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        // shadcn defaults
        default:   "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive/10 text-destructive",
        outline:   "border-border text-foreground",

        // Thematic semantic variants — using your token system
        success: "bg-[var(--base-color-success-800)] text-[var(--base-color-green-800)] border-[var(--base-color-success-900)]/20",
        info:    "bg-[var(--base-color-info-600)] text-[var(--base-color-info-700)] border-[var(--base-color-info-700)]/20",
        warning: "bg-[var(--base-color-warning-50)] text-[var(--base-color-gray-900)] border-[var(--base-color-warning-100)]/40",
        error:   "bg-[var(--base-color-error-200)] text-[var(--base-color-error-300)] border-[var(--base-color-error-300)]/20",
        brand:   "bg-[var(--base-color-blue-800)] text-white",
      },
      size: {
        sm: "h-4 px-1.5 text-[10px]",
        md: "h-5 px-2 text-xs",
        lg: "h-6 px-2.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface BadgeProps extends React.ComponentProps<"span">,
  VariantProps<typeof badgeVariants> {
  asChild?: boolean
  dot?: boolean
}

function Badge({
  className,
  variant = "default",
  size = "md",
  asChild = false,
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot.Root : "span"

  const dotColor: Record<string, string> = {
    success:     "bg-[var(--base-color-green-800)]",
    info:        "bg-[var(--base-color-info-700)]",
    warning:     "bg-[var(--base-color-warning-100)]",
    error:       "bg-[var(--base-color-error-300)]",
    brand:       "bg-white",
    default:     "bg-primary-foreground",
    secondary:   "bg-secondary-foreground",
    destructive: "bg-destructive",
    outline:     "bg-foreground",
  }

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {dot && (
        <span className={cn("size-1.5 rounded-full shrink-0", dotColor[variant ?? "default"])} />
      )}
      {children}
    </Comp>
  )
}

export { Badge, badgeVariants }
