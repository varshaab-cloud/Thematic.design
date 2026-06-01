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
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-[var(--component-input-checkbox-dimension-radius)] border border-[var(--component-input-checkbox-color-stroke-default)] [transition:var(--alias-motion-transition-normal)] outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-[var(--component-input-checkbox-color-stroke-checked)] focus-visible:ring-3 focus-visible:ring-[var(--component-input-checkbox-color-stroke-checked)]/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-[var(--component-input-checkbox-color-stroke-default)] aria-invalid:ring-3 aria-invalid:ring-[var(--component-input-checkbox-color-stroke-default)]/20 aria-invalid:aria-checked:border-[var(--component-input-checkbox-color-stroke-checked)] dark:bg-[var(--alias-color-border-default)]/30 dark:aria-invalid:border-[var(--component-input-checkbox-color-stroke-default)]/50 dark:aria-invalid:ring-[var(--component-input-checkbox-color-stroke-default)]/40 data-checked:border-[var(--component-input-checkbox-color-stroke-checked)] data-checked:bg-[var(--component-input-checkbox-color-bg-checked)] data-checked:text-[var(--component-input-checkbox-color-icon-default)] dark:data-checked:bg-[var(--component-input-checkbox-color-bg-checked)]",
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
