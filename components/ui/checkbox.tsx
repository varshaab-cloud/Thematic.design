"use client"

import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-[var(--alias-color-border-default)] transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-[var(--alias-color-border-active)] focus-visible:ring-3 focus-visible:ring-[var(--alias-color-border-active)]/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-[var(--alias-color-border-error)] aria-invalid:ring-3 aria-invalid:ring-[var(--alias-color-feedback-error-fg)]/20 aria-invalid:aria-checked:border-[var(--alias-color-border-brand)] dark:bg-[var(--alias-color-border-default)]/30 dark:aria-invalid:border-[var(--alias-color-border-error)]/50 dark:aria-invalid:ring-[var(--alias-color-feedback-error-fg)]/40 data-checked:border-[var(--alias-color-border-brand)] data-checked:bg-[var(--alias-color-background-brand)] data-checked:text-[var(--alias-color-text-inverse)] dark:data-checked:bg-[var(--alias-color-background-brand)]",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
      >
        <CheckIcon
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
