import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-[var(--alias-spacing-inline-xs)] overflow-hidden rounded-full border border-transparent px-[var(--alias-spacing-padding-xs)] py-0.5 text-[length:var(--alias-typography-caption1-font-size)] font-[number:var(--alias-typography-weight-medium)] whitespace-nowrap [transition:var(--alias-motion-transition-normal)] focus-visible:border-[var(--alias-color-border-active)] focus-visible:ring-[3px] focus-visible:ring-[var(--alias-color-border-active)]/50 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        // shadcn defaults
        default:   "bg-[var(--alias-color-background-brand)] text-[var(--alias-color-text-inverse)]",
        secondary: "bg-[var(--alias-color-background-tertiary)] text-[var(--alias-color-text-secondary)]",
        destructive: "bg-[var(--alias-color-feedback-error-fg)]/10 text-[var(--alias-color-feedback-error-fg)]",
        outline:   "border-[var(--alias-color-border-default)] text-[var(--alias-color-text-primary)]",

        // Thematic semantic variants — using your token system
        success: "rounded-[var(--component-feedback-badge-shared-dimension-radius)] bg-[var(--component-feedback-badge-success-color-bg)] text-[var(--component-feedback-badge-success-color-text)] border-[var(--component-feedback-badge-success-color-text)]/20",
        info:    "rounded-[var(--component-feedback-badge-shared-dimension-radius)] bg-[var(--component-feedback-badge-info-color-bg)] text-[var(--component-feedback-badge-info-color-text)] border-[var(--component-feedback-badge-info-color-text)]/20",
        warning: "rounded-[var(--component-feedback-badge-shared-dimension-radius)] bg-[var(--component-feedback-badge-warning-color-bg)] text-[var(--component-feedback-badge-warning-color-text)] border-[var(--component-feedback-badge-warning-color-text)]/20",
        error:   "rounded-[var(--component-feedback-badge-shared-dimension-radius)] bg-[var(--component-feedback-badge-error-color-bg)] text-[var(--component-feedback-badge-error-color-text)] border-[var(--component-feedback-badge-error-color-text)]/20",
        brand:   "bg-[var(--alias-color-background-brand)] text-[var(--alias-color-text-inverse)]",
      },
      size: {
        sm: "h-4 px-1.5 text-[length:var(--alias-typography-caption2-font-size)]",
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
    success:     "bg-[var(--component-feedback-badge-success-color-text)]",
    info:        "bg-[var(--component-feedback-badge-info-color-text)]",
    warning:     "bg-[var(--component-feedback-badge-warning-color-text)]",
    error:       "bg-[var(--component-feedback-badge-error-color-text)]",
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
