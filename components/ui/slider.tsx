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
            <label className="text-[length:var(--alias-typography-body-text2-font-size)] font-[number:var(--base-font-weight-medium)] text-[var(--alias-color-text-primary)]">{label}</label>
          )}
          {showValue && (
            <span className="text-[length:var(--alias-typography-body-text2-font-size)] tabular-nums text-[var(--alias-color-text-subtle)]">
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
          className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-[var(--component-slider-track-bg)]"
        >
          <SliderPrimitive.Range
            data-slot="slider-range"
            className="absolute h-full bg-[var(--component-slider-fill-bg)]"
          />
        </SliderPrimitive.Track>

        {/* Thumb(s) */}
        {currentValue.map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            data-slot="slider-thumb"
            className={cn(
              "block size-4 rounded-full border-2 border-[var(--component-slider-thumb-border)] bg-[var(--component-slider-thumb-bg)]",
              "[transition:var(--alias-motion-transition-normal)] outline-none cursor-pointer",
              "hover:border-[var(--alias-color-icon-brand)]",
              "focus-visible:ring-3 focus-visible:ring-[var(--alias-color-border-active)]/50 focus-visible:border-[var(--alias-color-border-active)]",
              "active:scale-110"
            )}
          />
        ))}
      </SliderPrimitive.Root>

      {helperText && (
        <p className="text-[length:var(--alias-typography-caption1-font-size)] text-[var(--alias-color-text-subtle)]">{helperText}</p>
      )}
    </div>
  )
}

export { Slider }
