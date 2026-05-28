import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-[var(--alias-spacing-inline-xs)] overflow-hidden rounded-full border border-transparent px-[var(--alias-spacing-padding-xs)] py-0.5 text-[length:var(--alias-typography-caption1-font-size)] font-[number:var(--base-font-weight-medium)] whitespace-nowrap [transition:var(--alias-motion-transition-normal)] focus-visible:border-[var(--alias-color-border-active)] focus-visible:ring-[3px] focus-visible:ring-[var(--alias-color-border-active)]/50 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        // shadcn defaults
        default:   "bg-[var(--alias-color-background-brand)] text-[var(--alias-color-text-inverse)]",
        secondary: "bg-[var(--alias-color-background-tertiary)] text-[var(--alias-color-text-secondary)]",
        destructive: "bg-[var(--alias-color-feedback-error-fg)]/10 text-[var(--alias-color-feedback-error-fg)]",
        outline:   "border-[var(--alias-color-border-default)] text-[var(--alias-color-text-primary)]",

        // Thematic semantic variants — using your token system
        success: "rounded-[var(--component-badge-success-border-radius)] bg-[var(--component-badge-success-background)] text-[var(--component-badge-success-text)] border-[var(--component-badge-success-text)]/20",
        info:    "rounded-[var(--component-badge-info-border-radius)] bg-[var(--component-badge-info-background)] text-[var(--component-badge-info-text)] border-[var(--component-badge-info-text)]/20",
        warning: "rounded-[var(--component-badge-warning-border-radius)] bg-[var(--component-badge-warning-background)] text-[var(--component-badge-warning-text)] border-[var(--component-badge-warning-text)]/20",
        error:   "rounded-[var(--component-badge-error-border-radius)] bg-[var(--component-badge-error-background)] text-[var(--component-badge-error-text)] border-[var(--component-badge-error-text)]/20",
        brand:   "bg-[var(--alias-color-background-brand)] text-[var(--alias-color-text-inverse)]",
      },
      size: {
        sm: "h-4 px-1.5 text-[10px]",
        md: "h-5 px-[var(--alias-spacing-padding-xs)] text-[length:var(--alias-typography-caption1-font-size)]",
        lg: "h-6 px-2.5 text-[length:var(--alias-typography-body-text2-font-size)]",
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
    success:     "bg-[var(--component-badge-success-text)]",
    info:        "bg-[var(--component-badge-info-text)]",
    warning:     "bg-[var(--component-badge-warning-text)]",
    error:       "bg-[var(--component-badge-error-text)]",
    brand:       "bg-white",
    default:     "bg-[var(--alias-color-text-inverse)]",
    secondary:   "bg-[var(--alias-color-text-secondary)]",
    destructive: "bg-[var(--alias-color-feedback-error-fg)]",
    outline:     "bg-[var(--alias-color-text-primary)]",
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
