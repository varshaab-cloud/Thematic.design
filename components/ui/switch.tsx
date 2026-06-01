"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-[var(--component-switch-dimension-radius)] border border-transparent [transition:var(--alias-motion-transition-normal)] outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-[var(--alias-color-border-active)] focus-visible:ring-3 focus-visible:ring-[var(--alias-color-border-active)]/50 aria-invalid:border-[var(--component-switch-color-track-error)] aria-invalid:ring-3 aria-invalid:ring-[var(--alias-color-feedback-error-fg)]/20 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] dark:aria-invalid:border-[var(--component-switch-color-track-error)]/50 dark:aria-invalid:ring-[var(--alias-color-feedback-error-fg)]/40 data-checked:bg-[var(--component-switch-color-track-checked)] data-unchecked:bg-[var(--component-switch-color-track-default)] dark:data-unchecked:bg-[var(--component-switch-color-track-default)]/80 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-[var(--component-switch-dimension-radius)] bg-[var(--component-switch-color-thumb-default)] ring-0 [transition:var(--alias-motion-transition-normal)] group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] dark:data-checked:bg-[var(--alias-color-text-inverse)] group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-[var(--alias-color-text-primary)]"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
