import * as React from "react"
import { Minus, Plus } from "lucide-react"

import { cn } from "@/lib/utils"

export interface NumberInputProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  placeholder?: string
  className?: string
}

function NumberInput({
  value,
  onChange,
  min,
  max,
  step = 1,
  disabled = false,
  placeholder,
  className,
}: NumberInputProps) {
  const atMin = min !== undefined && value <= min
  const atMax = max !== undefined && value >= max

  function clamp(val: number): number {
    let result = val
    if (min !== undefined) result = Math.max(min, result)
    if (max !== undefined) result = Math.min(max, result)
    return result
  }

  function handleDecrement() {
    if (!atMin) onChange(clamp(value - step))
  }

  function handleIncrement() {
    if (!atMax) onChange(clamp(value + step))
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const parsed = parseFloat(e.target.value)
    if (!isNaN(parsed)) onChange(clamp(parsed))
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      handleIncrement()
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      handleDecrement()
    }
  }

  const sharedButtonClass =
    "flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--component-input-border)] bg-[var(--component-input-background)] text-[var(--alias-color-icon-primary)] transition-colors hover:bg-[var(--alias-color-background-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--component-input-border-focus)] disabled:pointer-events-none disabled:bg-[var(--component-input-background-disabled)] disabled:text-[var(--alias-color-icon-disabled)]"

  return (
    <div
      data-slot="number-input"
      className={cn(
        "inline-flex items-center",
        disabled && "opacity-50",
        className
      )}
    >
      <button
        type="button"
        aria-label="Decrease value"
        aria-disabled={atMin || disabled}
        disabled={atMin || disabled}
        onClick={handleDecrement}
        className={cn(
          sharedButtonClass,
          "rounded-l-[var(--component-input-border-radius)] border-r-0"
        )}
      >
        <Minus aria-hidden="true" className="h-4 w-4" />
      </button>

      <input
        type="number"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          "h-9 flex-1 border border-[var(--component-input-border)] bg-[var(--component-input-background)] px-2 text-center text-sm text-[var(--component-input-text)] outline-none transition-colors placeholder:text-[var(--component-input-text-placeholder)] focus-visible:border-[var(--component-input-border-focus)] focus-visible:ring-3 focus-visible:ring-[var(--component-input-border-focus)]/30 disabled:bg-[var(--component-input-background-disabled)] disabled:text-[var(--component-input-text-disabled)] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        )}
      />

      <button
        type="button"
        aria-label="Increase value"
        aria-disabled={atMax || disabled}
        disabled={atMax || disabled}
        onClick={handleIncrement}
        className={cn(
          sharedButtonClass,
          "rounded-r-[var(--component-input-border-radius)] border-l-0"
        )}
      >
        <Plus aria-hidden="true" className="h-4 w-4" />
      </button>
    </div>
  )
}

export { NumberInput }
