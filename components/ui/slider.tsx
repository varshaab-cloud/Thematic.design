"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

// ◆ design-lead
// Slider for numeric range input.
// Track: gray-200 base, blue-800 fill for range.
// Thumb: white with gray-200 border, blue-800 on active/focus.
// Taste profile: compact, no decorative elements, precise state feedback.

export interface SliderProps
  extends React.ComponentProps<typeof SliderPrimitive.Root> {
  label?: string
  helperText?: string
  showValue?: boolean
  formatValue?: (value: number) => string
}

function Slider({
  className,
  label,
  helperText,
  showValue = false,
  formatValue = (v) => String(v),
  value,
  defaultValue,
  ...props
}: SliderProps) {
  const currentValue = (value ?? defaultValue ?? [0]) as number[]

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <label className="text-sm font-medium text-foreground">{label}</label>
          )}
          {showValue && (
            <span className="text-sm tabular-nums text-muted-foreground">
              {currentValue.map(formatValue).join(" – ")}
            </span>
          )}
        </div>
      )}

      <SliderPrimitive.Root
        data-slot="slider"
        value={value}
        defaultValue={defaultValue}
        className={cn(
          "relative flex w-full touch-none items-center select-none",
          "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
          className
        )}
        {...props}
      >
        {/* Track */}
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-[var(--base-color-gray-200)]"
        >
          <SliderPrimitive.Range
            data-slot="slider-range"
            className="absolute h-full bg-[var(--base-color-blue-800)]"
          />
        </SliderPrimitive.Track>

        {/* Thumb(s) */}
        {currentValue.map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            data-slot="slider-thumb"
            className={cn(
              "block size-4 rounded-full border-2 border-[var(--base-color-blue-800)] bg-[var(--base-color-white)]",
              "transition-colors outline-none cursor-pointer",
              "hover:border-[var(--base-color-blue-700)]",
              "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring",
              "active:scale-110"
            )}
          />
        ))}
      </SliderPrimitive.Root>

      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  )
}

export { Slider }
