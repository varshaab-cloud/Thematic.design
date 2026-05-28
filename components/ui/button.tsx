import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-[var(--component-button-primary-border-radius)] border border-transparent bg-clip-padding text-[length:var(--component-button-primary-font-size)] font-[number:var(--component-button-primary-font-weight)] whitespace-nowrap [transition:var(--alias-motion-transition-normal)] outline-none select-none focus-visible:border-[var(--alias-color-border-active)] focus-visible:ring-3 focus-visible:ring-[var(--alias-color-border-active)]/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-[var(--alias-color-border-error)] aria-invalid:ring-3 aria-invalid:ring-[var(--alias-color-feedback-error-fg)]/20 dark:aria-invalid:border-[var(--alias-color-border-error)]/50 dark:aria-invalid:ring-[var(--alias-color-feedback-error-fg)]/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Taste profile: blue anchors only — primary is the ONE blue thing
        default:     "bg-[var(--component-button-primary-background)] text-[var(--component-button-primary-text)] border-[var(--component-button-primary-border)] hover:bg-[var(--component-button-primary-background-hover)] active:bg-[var(--component-button-primary-background-active)] disabled:bg-[var(--component-button-primary-background-disabled)] disabled:text-[var(--component-button-primary-text-disabled)]",
        // Taste profile: outline has visible brand border + transparent bg — stands apart from filled variants
        outline:     "border-[var(--component-button-secondary-border)] bg-transparent text-[var(--component-button-secondary-text)] hover:bg-[var(--component-button-secondary-background-hover)] active:bg-[var(--component-button-secondary-background-active)] aria-expanded:bg-[var(--component-button-secondary-background-hover)] disabled:bg-transparent disabled:text-[var(--component-button-secondary-text-disabled)] dark:border-[var(--alias-color-border-default)] dark:bg-[var(--alias-color-border-default)]/30 dark:hover:bg-[var(--alias-color-border-default)]/50",
        // Taste profile: secondary is a filled warm-gray surface — clearly distinct from outline, for less-prominent actions
        secondary:   "bg-[var(--alias-color-background-secondary)] text-[var(--alias-color-text-primary)] border-[var(--alias-color-border-default)] hover:bg-[var(--alias-color-background-tertiary)] active:bg-[var(--alias-color-background-tertiary)] aria-expanded:bg-[var(--alias-color-background-secondary)] disabled:bg-[var(--alias-color-background-secondary)] disabled:text-[var(--alias-color-text-disabled)]",
        // Taste profile: ghost is invisible until interaction
        ghost:       "bg-[var(--component-button-ghost-background)] text-[var(--component-button-ghost-text)] border-[var(--component-button-ghost-border)] hover:bg-[var(--component-button-ghost-background-hover)] aria-expanded:bg-[var(--component-button-ghost-background-hover)] disabled:text-[var(--component-button-ghost-text-disabled)] dark:hover:bg-[var(--alias-color-background-tertiary)]/50",
        // Taste profile: destructive uses error token
        destructive: "bg-[var(--component-button-destructive-background)] text-[var(--component-button-destructive-text)] border-[var(--component-button-destructive-border)] hover:bg-[var(--component-button-destructive-background-hover)] focus-visible:ring-[var(--alias-color-feedback-error-fg)]/20",
        link:        "text-[var(--alias-color-background-brand)] underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-[var(--alias-spacing-inline-xs)] rounded-[var(--base-radius-md)] px-[var(--alias-spacing-padding-xs)] text-[length:var(--alias-typography-button-font-size)] in-data-[slot=button-group]:rounded-[var(--base-radius-lg)] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-[var(--alias-spacing-inline-xs)] rounded-[var(--base-radius-md)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-[var(--base-radius-lg)] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[var(--base-radius-md)] in-data-[slot=button-group]:rounded-[var(--base-radius-lg)] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[var(--base-radius-md)] in-data-[slot=button-group]:rounded-[var(--base-radius-lg)]",
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
