"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SegmentedControlOption {
  value: string
  label: string
  icon?: React.ReactNode
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[]
  value: string
  onChange: (value: string) => void
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  fullWidth?: boolean
  className?: string
}

const sizeClasses = {
  sm: {
    container: "h-7 p-0.5 gap-0.5",
    segment: "h-6 px-2.5 text-xs gap-1 [&_svg]:size-3",
  },
  md: {
    container: "h-9 p-0.5 gap-0.5",
    segment: "h-8 px-3 text-sm gap-1.5 [&_svg]:size-4",
  },
  lg: {
    container: "h-11 p-1 gap-0.5",
    segment: "h-9 px-4 text-sm gap-2 [&_svg]:size-4",
  },
}

function SegmentedControl({
  options,
  value,
  onChange,
  size = "md",
  disabled = false,
  fullWidth = false,
  className,
}: SegmentedControlProps) {
  const sizes = sizeClasses[size]

  return (
    <div
      role="radiogroup"
      data-slot="segmented-control"
      aria-disabled={disabled || undefined}
      className={cn(
        "inline-flex items-center rounded-[var(--base-radius-md)] bg-[var(--base-color-gray-100)] transition-colors",
        sizes.container,
        fullWidth && "flex w-full",
        disabled && "pointer-events-none opacity-50",
        className
      )}
    >
      {options.map((option) => {
        const isSelected = option.value === value
        return (
          <button
            key={option.value}
            role="radio"
            aria-checked={isSelected}
            type="button"
            disabled={disabled}
            onClick={() => !disabled && onChange(option.value)}
            className={cn(
              "relative inline-flex shrink-0 items-center justify-center rounded-[calc(var(--base-radius-md)-2px)] font-medium whitespace-nowrap transition-all duration-150 outline-none select-none",
              "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-1",
              sizes.segment,
              fullWidth && "flex-1",
              isSelected
                ? "bg-white text-[var(--base-color-gray-900)] shadow-sm"
                : "text-[var(--base-color-gray-500)] hover:text-[var(--base-color-gray-700)]"
            )}
          >
            {option.icon && (
              <span className="shrink-0 [&_svg]:pointer-events-none">
                {option.icon}
              </span>
            )}
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export { SegmentedControl }
