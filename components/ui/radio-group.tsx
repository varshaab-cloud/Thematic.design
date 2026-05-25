"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cn } from "@/lib/utils"

// ◆ design-lead
// Radio group for single-choice selection in forms.
// Taste profile: blue-800 for selected indicator, gray-300 border at rest,
// clear active/focus states, medium-weight labels, compact density.

export interface RadioGroupItemProps
  extends React.ComponentProps<typeof RadioGroupPrimitive.Item> {
  label?: string
  description?: string
}

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  label,
  description,
  children,
  ...props
}: RadioGroupItemProps) {
  const id = React.useId()

  return (
    <div className="flex items-start gap-2.5">
      <RadioGroupPrimitive.Item
        id={id}
        data-slot="radio-group-item"
        className={cn(
          // Base
          "mt-0.5 size-4 shrink-0 rounded-full border border-[var(--base-color-gray-300)] bg-[var(--base-color-white)]",
          "transition-colors outline-none cursor-pointer",
          // Hover
          "hover:border-[var(--base-color-blue-800)]",
          // Focus
          "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring",
          // Checked
          "data-[state=checked]:border-[var(--base-color-blue-800)] data-[state=checked]:bg-[var(--base-color-blue-800)]",
          // Disabled
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator
          data-slot="radio-group-indicator"
          className="flex items-center justify-center"
        >
          <div className="size-1.5 rounded-full bg-white" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>

      {(label || description || children) && (
        <div className="flex flex-col gap-0.5">
          {label && (
            <label
              htmlFor={id}
              className="text-sm font-medium text-foreground cursor-pointer leading-none pt-0.5"
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          {children}
        </div>
      )}
    </div>
  )
}

function RadioGroupLabel({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="radio-group-label"
      className={cn("text-sm font-medium text-foreground mb-1", className)}
      {...props}
    />
  )
}

export { RadioGroup, RadioGroupItem, RadioGroupLabel }
