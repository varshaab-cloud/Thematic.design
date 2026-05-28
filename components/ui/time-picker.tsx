"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "radix-ui"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Helpers ──────────────────────────────────────────────────────────────────

function pad(n: number): string {
  return String(n).padStart(2, "0")
}

function parseTime(value: string | undefined): { hours: number; minutes: number } | null {
  if (!value) return null
  const [h, m] = value.split(":").map(Number)
  if (isNaN(h) || isNaN(m)) return null
  return { hours: h, minutes: m }
}

function formatDisplay(value: string | undefined, use12Hour: boolean): string {
  const parsed = parseTime(value)
  if (!parsed) return ""
  const { hours, minutes } = parsed
  if (!use12Hour) {
    return `${pad(hours)}:${pad(minutes)}`
  }
  const period = hours < 12 ? "AM" : "PM"
  const h = hours % 12 === 0 ? 12 : hours % 12
  return `${pad(h)}:${pad(minutes)} ${period}`
}

// ─── TimePicker ───────────────────────────────────────────────────────────────

type TimePickerProps = {
  value?: string
  onChange?: (value: string) => void
  use12Hour?: boolean
  placeholder?: string
  disabled?: boolean
  minuteStep?: number
  className?: string
}

function TimePicker({
  value,
  onChange,
  use12Hour = true,
  placeholder = "Select time",
  disabled = false,
  minuteStep = 5,
  className,
}: TimePickerProps) {
  const [open, setOpen] = React.useState(false)

  const parsed = parseTime(value)
  const currentHours = parsed?.hours ?? 0
  const currentMinutes = parsed?.minutes ?? 0

  // For 12-hour mode we track period internally
  const [period, setPeriod] = React.useState<"AM" | "PM">(() => {
    if (parsed) return parsed.hours >= 12 ? "PM" : "AM"
    return "AM"
  })

  // Sync period when value changes externally
  React.useEffect(() => {
    if (parsed) {
      setPeriod(parsed.hours >= 12 ? "PM" : "AM")
    }
  }, [value])

  const hourOptions = use12Hour
    ? Array.from({ length: 12 }, (_, i) => i + 1) // 1–12
    : Array.from({ length: 24 }, (_, i) => i) // 0–23

  const minuteOptions = Array.from(
    { length: Math.ceil(60 / minuteStep) },
    (_, i) => i * minuteStep
  )

  // Display hours: convert from 24h to 12h for comparison
  const displayHour12 = currentHours % 12 === 0 ? 12 : currentHours % 12

  function handleHourSelect(h: number) {
    let h24 = h
    if (use12Hour) {
      if (period === "AM") {
        h24 = h === 12 ? 0 : h
      } else {
        h24 = h === 12 ? 12 : h + 12
      }
    }
    onChange?.(`${pad(h24)}:${pad(currentMinutes)}`)
  }

  function handleMinuteSelect(m: number) {
    onChange?.(`${pad(currentHours)}:${pad(m)}`)
  }

  function handlePeriodToggle(p: "AM" | "PM") {
    setPeriod(p)
    let h24 = currentHours
    if (p === "AM" && h24 >= 12) {
      h24 = h24 - 12
    } else if (p === "PM" && h24 < 12) {
      h24 = h24 + 12
    }
    onChange?.(`${pad(h24)}:${pad(currentMinutes)}`)
  }

  const displayValue = formatDisplay(value, use12Hour)

  // Refs for scroll-into-view
  const selectedHourRef = React.useRef<HTMLButtonElement>(null)
  const selectedMinuteRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (open) {
      const t = setTimeout(() => {
        selectedHourRef.current?.scrollIntoView({ block: "nearest" })
        selectedMinuteRef.current?.scrollIntoView({ block: "nearest" })
      }, 50)
      return () => clearTimeout(t)
    }
  }, [open])

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={disabled ? undefined : setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          disabled={disabled}
          aria-label={displayValue || placeholder}
          data-slot="time-picker-trigger"
          className={cn(
            "inline-flex h-9 w-full items-center justify-between gap-[var(--alias-spacing-inline-sm)] rounded-[var(--base-radius-md)] border border-[var(--component-time-picker-border)] bg-[var(--alias-color-background-primary)] px-[var(--alias-spacing-padding-sm)] text-[length:var(--alias-typography-button-font-size)] [transition:var(--alias-motion-transition-normal)]",
            "hover:border-[var(--alias-color-border-disabled)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--alias-color-border-active)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            !displayValue && "text-[var(--component-time-picker-column-item-text)]/50",
            className
          )}
        >
          <span>{displayValue || placeholder}</span>
          <Clock className="size-4 shrink-0 text-[var(--alias-color-text-subtle)]" />
        </button>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          data-slot="time-picker-content"
          sideOffset={4}
          align="start"
          className={cn(
            "z-50 rounded-[var(--base-radius-md)] border border-[var(--component-time-picker-panel-border)] bg-[var(--component-time-picker-panel-bg)] p-[var(--alias-spacing-padding-xs)] text-[var(--component-time-picker-column-item-text)] shadow-[var(--base-shadow-04)] outline-none",
            "duration-100 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          )}
        >
          <div className="flex items-start gap-[var(--alias-spacing-inline-sm)]">
            {/* Hours column */}
            <div className="flex flex-col gap-0.5">
              <p className="px-1 py-0.5 text-center text-[length:var(--alias-typography-caption1-font-size)] font-[number:var(--base-font-weight-medium)] text-[var(--alias-color-text-subtle)]">
                {use12Hour ? "HR" : "HH"}
              </p>
              <div className="flex max-h-48 flex-col gap-px overflow-y-auto rounded-[var(--base-radius-sm)]" style={{ scrollbarWidth: "none" }}>
                {hourOptions.map((h) => {
                  const isSelected = use12Hour ? displayHour12 === h : currentHours === h
                  return (
                    <button
                      key={h}
                      ref={isSelected ? selectedHourRef : undefined}
                      type="button"
                      onClick={() => handleHourSelect(h)}
                      className={cn(
                        "w-10 rounded-[var(--base-radius-sm)] px-[var(--alias-spacing-padding-xs)] py-[var(--alias-spacing-inline-xs)] text-center text-[length:var(--alias-typography-button-font-size)] tabular-nums [transition:var(--alias-motion-transition-normal)]",
                        isSelected
                          ? "bg-[var(--component-time-picker-column-item-selected-bg)] text-[var(--component-time-picker-column-item-selected-text)]"
                          : "hover:bg-[var(--component-time-picker-column-item-hover-bg)]"
                      )}
                    >
                      {pad(h)}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Separator */}
            <div className="flex flex-col items-center">
              <p className="py-0.5 text-[length:var(--alias-typography-caption1-font-size)] font-[number:var(--base-font-weight-medium)] text-transparent select-none">:</p>
              <div className="flex h-48 items-center justify-center">
                <span className="text-lg font-light text-[var(--component-time-picker-separator-color)]">:</span>
              </div>
            </div>

            {/* Minutes column */}
            <div className="flex flex-col gap-0.5">
              <p className="px-1 py-0.5 text-center text-[length:var(--alias-typography-caption1-font-size)] font-[number:var(--base-font-weight-medium)] text-[var(--alias-color-text-subtle)]">MM</p>
              <div className="flex max-h-48 flex-col gap-px overflow-y-auto rounded-[var(--base-radius-sm)]" style={{ scrollbarWidth: "none" }}>
                {minuteOptions.map((m) => {
                  const isSelected = currentMinutes === m
                  return (
                    <button
                      key={m}
                      ref={isSelected ? selectedMinuteRef : undefined}
                      type="button"
                      onClick={() => handleMinuteSelect(m)}
                      className={cn(
                        "w-10 rounded-[var(--base-radius-sm)] px-[var(--alias-spacing-padding-xs)] py-[var(--alias-spacing-inline-xs)] text-center text-[length:var(--alias-typography-button-font-size)] tabular-nums [transition:var(--alias-motion-transition-normal)]",
                        isSelected
                          ? "bg-[var(--component-time-picker-column-item-selected-bg)] text-[var(--component-time-picker-column-item-selected-text)]"
                          : "hover:bg-[var(--component-time-picker-column-item-hover-bg)]"
                      )}
                    >
                      {pad(m)}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* AM/PM column */}
            {use12Hour && (
              <div className="flex flex-col gap-0.5">
                <p className="px-1 py-0.5 text-center text-[length:var(--alias-typography-caption1-font-size)] font-[number:var(--base-font-weight-medium)] text-transparent select-none">–</p>
                <div className="flex flex-col gap-[var(--alias-spacing-stack-xs)] pt-1">
                  {(["AM", "PM"] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => handlePeriodToggle(p)}
                      className={cn(
                        "w-10 rounded-[var(--base-radius-sm)] px-[var(--alias-spacing-padding-xs)] py-[var(--alias-spacing-inline-xs)] text-center text-[length:var(--alias-typography-button-font-size)] font-[number:var(--alias-typography-button-font-weight)] [transition:var(--alias-motion-transition-normal)]",
                        period === p
                          ? "bg-[var(--component-time-picker-column-item-selected-bg)] text-[var(--component-time-picker-column-item-selected-text)]"
                          : "hover:bg-[var(--component-time-picker-column-item-hover-bg)] text-[var(--alias-color-text-subtle)]"
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

export { TimePicker }
