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
  size?: "sm" | "md" | "lg"
}

const itemSizeConfig = {
  sm: {
    indicator: "size-3.5",
    dot: "size-1",
    label: "text-[13px]",
    description: "text-[11px]",
    gap: "gap-2",
    mt: "mt-0",
  },
  md: {
    indicator: "size-4",
    dot: "size-1.5",
    label: "text-[length:var(--alias-typography-body-text2-font-size)]",
    description: "text-[length:var(--alias-typography-caption1-font-size)]",
    gap: "gap-2.5",
    mt: "mt-0.5",
  },
  lg: {
    indicator: "size-5",
    dot: "size-2",
    label: "text-[16px]",
    description: "text-[13px]",
    gap: "gap-3",
    mt: "mt-0.5",
  },
}

// RadioGroupField — enterprise wrapper matching Input/Select/Textarea pattern
export interface RadioGroupFieldProps {
  label?: string
  helperText?: string
  errorMessage?: string
  required?: boolean
  className?: string
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
  disabled?: boolean
}

function RadioGroupField({
  label,
  helperText,
  errorMessage,
  required,
  className,
  children,
  ...rootProps
}: RadioGroupFieldProps) {
  const hasError = !!errorMessage
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <p className="text-[length:var(--alias-typography-body-text2-font-size)] font-[number:var(--base-font-weight-medium)] text-[var(--component-radio-group-label-text)]">
          {label}
          {required && <span className="text-[var(--alias-color-feedback-error-fg)] ml-1">*</span>}
        </p>
      )}
      <RadioGroupPrimitive.Root
        data-slot="radio-group"
        aria-invalid={hasError || undefined}
        className="flex flex-col gap-[var(--alias-spacing-stack-xs)]"
        {...rootProps}
      >
        {children}
      </RadioGroupPrimitive.Root>
      {hasError && <p className="text-[length:var(--alias-typography-caption1-font-size)] text-[var(--alias-color-feedback-error-fg)]">{errorMessage}</p>}
      {helperText && !hasError && <p className="text-[length:var(--alias-typography-caption1-font-size)] text-[var(--component-radio-group-description-text)]">{helperText}</p>}
    </div>
  )
}

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("flex flex-col gap-[var(--alias-spacing-stack-xs)]", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  label,
  description,
  children,
  size = "md",
  ...props
}: RadioGroupItemProps) {
  const id = React.useId()
  const sc = itemSizeConfig[size]

  return (
    <div className={cn("flex items-start has-[[data-disabled]]:opacity-50 has-[[data-disabled]]:pointer-events-none", sc.gap)}>
      <RadioGroupPrimitive.Item
        id={id}
        data-slot="radio-group-item"
        className={cn(
          // Base
          sc.mt, sc.indicator, "shrink-0 rounded-[var(--component-radio-group-border-radius)] border border-[var(--component-radio-group-border)] bg-[var(--component-radio-group-background)]",
          "[transition:var(--alias-motion-transition-normal)] outline-none cursor-pointer",
          // Hover
          "hover:border-[var(--component-radio-group-border-checked)]",
          // Focus
          "focus-visible:ring-3 focus-visible:ring-[var(--alias-color-border-active)]/50 focus-visible:border-[var(--alias-color-border-active)]",
          // Checked
          "data-[state=checked]:border-[var(--component-radio-group-border-checked)] data-[state=checked]:bg-[var(--component-radio-group-background-checked)]",
          // Disabled
          "disabled:pointer-events-none",
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator
          data-slot="radio-group-indicator"
          className="flex items-center justify-center"
        >
          <div className={cn(sc.dot, "rounded-full bg-white")} />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>

      {(label || description || children) && (
        <div className="flex flex-col gap-0.5">
          {label && (
            <label
              htmlFor={id}
              className={cn(sc.label, "font-[number:var(--base-font-weight-medium)] text-[var(--component-radio-group-label-text)] cursor-pointer leading-none pt-0.5")}
            >
              {label}
            </label>
          )}
          {description && (
            <p className={cn(sc.description, "text-[var(--component-radio-group-description-text)]")}>{description}</p>
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
      className={cn("text-[length:var(--alias-typography-body-text2-font-size)] font-[number:var(--base-font-weight-medium)] text-[var(--component-radio-group-label-text)] mb-1", className)}
      {...props}
    />
  )
}

export { RadioGroup, RadioGroupField, RadioGroupItem, RadioGroupLabel }
