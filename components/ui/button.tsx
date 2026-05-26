import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-[var(--base-radius-md)] border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-[var(--alias-color-border-active)] focus-visible:ring-3 focus-visible:ring-[var(--alias-color-border-active)]/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-[var(--alias-color-border-error)] aria-invalid:ring-3 aria-invalid:ring-[var(--alias-color-feedback-error-fg)]/20 dark:aria-invalid:border-[var(--alias-color-border-error)]/50 dark:aria-invalid:ring-[var(--alias-color-feedback-error-fg)]/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Taste profile: blue anchors only — primary is the ONE blue thing
        default:     "bg-[var(--alias-color-background-brand)] text-[var(--alias-color-text-inverse)] hover:bg-[var(--base-color-blue-700)] active:bg-[var(--base-color-blue-900)]",
        // Taste profile: outline hover uses gray-100 — warm neutral, not blue
        outline:     "border-[var(--alias-color-border-default)] bg-[var(--alias-color-background-primary)] hover:bg-[var(--base-color-gray-100)] hover:text-[var(--alias-color-text-primary)] aria-expanded:bg-[var(--base-color-gray-100)] dark:border-[var(--alias-color-border-default)] dark:bg-[var(--alias-color-border-default)]/30 dark:hover:bg-[var(--alias-color-border-default)]/50",
        // Taste profile: secondary is a muted surface — gray-100 base
        secondary:   "bg-[var(--alias-color-background-tertiary)] text-[var(--alias-color-text-secondary)] hover:bg-[var(--base-color-gray-200)] aria-expanded:bg-[var(--alias-color-background-tertiary)]",
        // Taste profile: ghost is invisible until interaction
        ghost:       "hover:bg-[var(--base-color-gray-100)] hover:text-[var(--alias-color-text-primary)] aria-expanded:bg-[var(--base-color-gray-100)] dark:hover:bg-[var(--alias-color-background-tertiary)]/50",
        // Taste profile: destructive uses error token
        destructive: "bg-[var(--base-color-error-200)] text-[var(--base-color-error-300)] hover:bg-[var(--base-color-error-300)] hover:text-white focus-visible:ring-[var(--alias-color-feedback-error-fg)]/20",
        link:        "text-[var(--alias-color-background-brand)] underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  isLoading = false,
  fullWidth = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    isLoading?: boolean
    fullWidth?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      disabled={isLoading || props.disabled}
      className={cn(
        buttonVariants({ variant, size, className }),
        fullWidth && "w-full"
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" />
          {children}
        </>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
