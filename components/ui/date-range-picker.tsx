"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "radix-ui"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DateRange {
  from: Date | null
  to: Date | null
}

export interface DateRangePreset {
  label: string
  range: { from: Date; to: Date }
}

export interface DateRangePickerProps {
  value?: DateRange
  onChange?: (range: DateRange) => void
  placeholder?: string
  disabled?: boolean
  minDate?: Date
  maxDate?: Date
  presets?: DateRangePreset[]
  className?: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

function formatDate(date: Date | null): string {
  if (!date) return ""
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function isBefore(a: Date, b: Date): boolean {
  return a.getTime() < b.getTime()
}

function startOfDay(d: Date): Date {
  const out = new Date(d)
  out.setHours(0, 0, 0, 0)
  return out
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

function addMonths(date: Date, n: number): Date {
  const out = new Date(date)
  out.setMonth(out.getMonth() + n)
  out.setDate(1)
  return out
}

// ─── Calendar ─────────────────────────────────────────────────────────────────

interface CalendarMonthProps {
  year: number
  month: number
  range: DateRange
  hoverDate: Date | null
  selecting: "from" | "to"
  onDateClick: (date: Date) => void
  onDateHover: (date: Date | null) => void
  minDate?: Date
  maxDate?: Date
}

function CalendarMonth({
  year,
  month,
  range,
  hoverDate,
  selecting,
  onDateClick,
  onDateHover,
  minDate,
  maxDate,
}: CalendarMonthProps) {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfWeek(year, month)

  // Effective range for highlighting (including hover preview)
  const effectiveFrom = range.from
  const effectiveTo =
    range.from && !range.to && hoverDate
      ? isBefore(hoverDate, range.from)
        ? range.from
        : hoverDate
      : range.to

  const effectiveFromForMin =
    range.from && !range.to && hoverDate && isBefore(hoverDate, range.from)
      ? hoverDate
      : range.from

  const cells: (Date | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ]

  return (
    <div className="select-none">
      {/* Month/year heading */}
      <p className="text-[length:var(--alias-typography-body-text2-font-size)] font-[number:var(--base-font-weight-semibold)] text-[var(--component-date-range-picker-text)] text-center mb-3">
        {MONTHS[month]} {year}
      </p>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <span
            key={d}
            className="text-center text-[10px] font-[number:var(--base-font-weight-medium)] text-[var(--component-date-range-picker-placeholder)] py-[var(--alias-spacing-inline-xs)]"
          >
            {d}
          </span>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7">
        {cells.map((date, idx) => {
          if (!date) {
            return <span key={`empty-${idx}`} />
          }

          const dateStart = startOfDay(date)
          const isFrom = effectiveFrom && isSameDay(dateStart, startOfDay(effectiveFrom))
          const isTo = effectiveTo && isSameDay(dateStart, startOfDay(effectiveTo))
          const isFromForMin = effectiveFromForMin && isSameDay(dateStart, startOfDay(effectiveFromForMin))

          const inRange =
            effectiveFrom &&
            effectiveTo &&
            dateStart > startOfDay(effectiveFrom) &&
            dateStart < startOfDay(effectiveTo)

          const isDisabled =
            (minDate && dateStart < startOfDay(minDate)) ||
            (maxDate && dateStart > startOfDay(maxDate))

          const isEndpoint = isFrom || isTo

          return (
            <div
              key={date.toISOString()}
              className="relative flex items-center justify-center"
              style={{ height: 32 }}
            >
              {/* Range background band */}
              {inRange && (
                <span
                  className="absolute inset-y-1 inset-x-0"
                  style={{ background: "color-mix(in srgb, var(--component-date-range-picker-range-in-range-bg) 50%, transparent)" }}
                />
              )}
              {/* Half-band on from/to endpoints */}
              {isFrom && effectiveTo && (
                <span
                  className="absolute inset-y-1 right-0 left-1/2"
                  style={{ background: "color-mix(in srgb, var(--component-date-range-picker-range-in-range-bg) 50%, transparent)" }}
                />
              )}
              {isTo && effectiveFrom && !isSameDay(startOfDay(effectiveFrom), startOfDay(effectiveTo)) && (
                <span
                  className="absolute inset-y-1 left-0 right-1/2"
                  style={{ background: "color-mix(in srgb, var(--component-date-range-picker-range-in-range-bg) 50%, transparent)" }}
                />
              )}

              <button
                type="button"
                disabled={isDisabled}
                onClick={() => !isDisabled && onDateClick(date)}
                onMouseEnter={() => !isDisabled && onDateHover(date)}
                onMouseLeave={() => onDateHover(null)}
                className={cn(
                  "relative z-10 flex items-center justify-center w-8 h-8 rounded-full",
                  "text-[length:var(--alias-typography-caption1-font-size)] font-[number:var(--alias-typography-button-font-weight)] [transition:var(--alias-motion-transition-normal)]",
                  isDisabled && "opacity-30 cursor-not-allowed",
                  !isDisabled && !isEndpoint && "hover:bg-[var(--alias-color-background-tertiary)] hover:text-[var(--component-date-range-picker-text)]",
                  isEndpoint
                    ? "bg-[var(--component-date-range-picker-day-selected-bg)] text-white"
                    : inRange
                    ? "text-[var(--component-date-range-picker-preset-active-text)]"
                    : "text-[var(--component-date-range-picker-text)]"
                )}
              >
                {date.getDate()}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── DateRangePicker ──────────────────────────────────────────────────────────

export function DateRangePicker({
  value,
  onChange,
  placeholder = "Select date range",
  disabled = false,
  minDate,
  maxDate,
  presets,
  className,
}: DateRangePickerProps) {
  const today = new Date()

  // Internal state (uncontrolled fallback)
  const [internalRange, setInternalRange] = React.useState<DateRange>({
    from: null,
    to: null,
  })
  const [open, setOpen] = React.useState(false)
  const [hoverDate, setHoverDate] = React.useState<Date | null>(null)
  const [selecting, setSelecting] = React.useState<"from" | "to">("from")
  const [leftMonth, setLeftMonth] = React.useState<Date>(
    new Date(today.getFullYear(), today.getMonth(), 1)
  )

  const range = value ?? internalRange
  const rightMonth = addMonths(leftMonth, 1)

  function setRange(r: DateRange) {
    if (onChange) onChange(r)
    else setInternalRange(r)
  }

  function handleDateClick(date: Date) {
    const d = startOfDay(date)

    if (selecting === "from" || (range.from && range.to)) {
      // Start fresh selection
      setRange({ from: d, to: null })
      setSelecting("to")
    } else {
      // Second click — set "to" (swap if needed)
      const from = range.from!
      if (isBefore(d, from)) {
        setRange({ from: d, to: from })
      } else {
        setRange({ from, to: d })
      }
      setSelecting("from")
      setOpen(false)
    }
  }

  function handlePresetClick(preset: DateRangePreset) {
    setRange({ from: startOfDay(preset.range.from), to: startOfDay(preset.range.to) })
    setSelecting("from")
    setOpen(false)
  }

  function handlePrevMonth() {
    setLeftMonth((m) => addMonths(m, -1))
  }

  function handleNextMonth() {
    setLeftMonth((m) => addMonths(m, 1))
  }

  const triggerLabel = (() => {
    if (range.from && range.to) {
      return `${formatDate(range.from)} – ${formatDate(range.to)}`
    }
    if (range.from) {
      return `${formatDate(range.from)} – …`
    }
    return placeholder
  })()

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={disabled ? undefined : setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          disabled={disabled}
          data-slot="date-range-picker-trigger"
          className={cn(
            "flex items-center gap-[var(--alias-spacing-inline-sm)] h-9 px-[var(--alias-spacing-padding-sm)] rounded-[var(--base-radius-md)]",
            "border border-[var(--component-date-range-picker-border)] bg-[var(--component-date-range-picker-background)]",
            "text-[length:var(--alias-typography-button-font-size)] [transition:var(--alias-motion-transition-normal)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--component-date-range-picker-border-focus)]",
            range.from
              ? "text-[var(--component-date-range-picker-text)]"
              : "text-[var(--component-date-range-picker-placeholder)]",
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:border-[var(--alias-color-border-default)] cursor-pointer",
            className
          )}
        >
          <CalendarIcon
            className="shrink-0 text-[var(--component-date-range-picker-placeholder)]"
            style={{ width: 15, height: 15 }}
          />
          <span>{triggerLabel}</span>
        </button>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={6}
          className={cn(
            "z-50 flex rounded-[var(--base-radius-lg)]",
            "border border-[var(--component-date-range-picker-border)] bg-[var(--component-date-range-picker-background)]",
            "shadow-[var(--component-date-range-picker-calendar-shadow)]",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            "duration-100 origin-(--radix-popover-content-transform-origin)"
          )}
        >
          {/* Presets column */}
          {presets && presets.length > 0 && (
            <div className="flex flex-col gap-0.5 p-[var(--alias-spacing-padding-xs)] border-r border-[var(--component-date-range-picker-border)] min-w-[140px]">
              <p className="px-[var(--alias-spacing-padding-xs)] py-[var(--alias-spacing-inline-xs)] text-[10px] font-[number:var(--base-font-weight-semibold)] uppercase tracking-wider text-[var(--component-date-range-picker-placeholder)]">
                Presets
              </p>
              {presets.map((preset) => {
                const isActive =
                  range.from &&
                  range.to &&
                  isSameDay(range.from, preset.range.from) &&
                  isSameDay(range.to, preset.range.to)

                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handlePresetClick(preset)}
                    className={cn(
                      "flex items-center gap-[var(--alias-spacing-inline-sm)] px-[var(--alias-spacing-padding-xs)] py-1.5 rounded-[var(--base-radius-sm)]",
                      "text-[length:var(--alias-typography-button-font-size)] text-left [transition:var(--alias-motion-transition-normal)]",
                      isActive
                        ? "bg-[var(--component-date-range-picker-preset-active-bg)] text-[var(--component-date-range-picker-preset-active-text)] font-[number:var(--alias-typography-button-font-weight)]"
                        : "text-[var(--alias-color-text-tertiary)] hover:bg-[var(--alias-color-background-tertiary)]"
                    )}
                  >
                    {preset.label}
                  </button>
                )
              })}
            </div>
          )}

          {/* Calendar area */}
          <div className="p-[var(--alias-spacing-padding-sm)]">
            {/* Navigation row */}
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={handlePrevMonth}
                className={cn(
                  "flex items-center justify-center w-7 h-7 rounded-[var(--base-radius-sm)]",
                  "text-[var(--alias-color-text-disabled)] hover:text-[var(--component-date-range-picker-text)]",
                  "hover:bg-[var(--alias-color-background-tertiary)] [transition:var(--alias-motion-transition-normal)]"
                )}
                aria-label="Previous month"
              >
                <ChevronLeft style={{ width: 14, height: 14 }} />
              </button>

              <button
                type="button"
                onClick={handleNextMonth}
                className={cn(
                  "flex items-center justify-center w-7 h-7 rounded-[var(--base-radius-sm)]",
                  "text-[var(--alias-color-text-disabled)] hover:text-[var(--component-date-range-picker-text)]",
                  "hover:bg-[var(--alias-color-background-tertiary)] [transition:var(--alias-motion-transition-normal)]"
                )}
                aria-label="Next month"
              >
                <ChevronRight style={{ width: 14, height: 14 }} />
              </button>
            </div>

            {/* Two months side by side */}
            <div className="flex gap-[var(--alias-spacing-padding-lg)]">
              <CalendarMonth
                year={leftMonth.getFullYear()}
                month={leftMonth.getMonth()}
                range={range}
                hoverDate={hoverDate}
                selecting={selecting}
                onDateClick={handleDateClick}
                onDateHover={setHoverDate}
                minDate={minDate}
                maxDate={maxDate}
              />
              <CalendarMonth
                year={rightMonth.getFullYear()}
                month={rightMonth.getMonth()}
                range={range}
                hoverDate={hoverDate}
                selecting={selecting}
                onDateClick={handleDateClick}
                onDateHover={setHoverDate}
                minDate={minDate}
                maxDate={maxDate}
              />
            </div>

            {/* Footer hint */}
            <div className="mt-3 pt-3 border-t border-[var(--alias-color-background-tertiary)] flex items-center justify-between">
              <p className="text-[length:var(--alias-typography-caption1-font-size)] text-[var(--component-date-range-picker-placeholder)]">
                {selecting === "from" ? "Select start date" : "Select end date"}
              </p>
              {(range.from || range.to) && (
                <button
                  type="button"
                  onClick={() => {
                    setRange({ from: null, to: null })
                    setSelecting("from")
                  }}
                  className="text-[length:var(--alias-typography-caption1-font-size)] text-[var(--component-date-range-picker-placeholder)] hover:text-[var(--alias-color-text-tertiary)] [transition:var(--alias-motion-transition-normal)]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
