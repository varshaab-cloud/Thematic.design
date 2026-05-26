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
      <p className="text-sm font-semibold text-[var(--base-color-gray-900)] text-center mb-3">
        {MONTHS[month]} {year}
      </p>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <span
            key={d}
            className="text-center text-[10px] font-medium text-[var(--base-color-gray-400)] py-1"
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
                  style={{ background: "color-mix(in srgb, var(--base-color-blue-100) 50%, transparent)" }}
                />
              )}
              {/* Half-band on from/to endpoints */}
              {isFrom && effectiveTo && (
                <span
                  className="absolute inset-y-1 right-0 left-1/2"
                  style={{ background: "color-mix(in srgb, var(--base-color-blue-100) 50%, transparent)" }}
                />
              )}
              {isTo && effectiveFrom && !isSameDay(startOfDay(effectiveFrom), startOfDay(effectiveTo)) && (
                <span
                  className="absolute inset-y-1 left-0 right-1/2"
                  style={{ background: "color-mix(in srgb, var(--base-color-blue-100) 50%, transparent)" }}
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
                  "text-xs font-medium transition-colors",
                  isDisabled && "opacity-30 cursor-not-allowed",
                  !isDisabled && !isEndpoint && "hover:bg-[var(--base-color-gray-100)] hover:text-[var(--base-color-gray-900)]",
                  isEndpoint
                    ? "bg-[var(--base-color-blue-800)] text-white"
                    : inRange
                    ? "text-[var(--base-color-blue-800)]"
                    : "text-[var(--base-color-gray-900)]"
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
            "flex items-center gap-2 h-9 px-3 rounded-[var(--base-radius-md)]",
            "border border-[var(--base-color-gray-200)] bg-white",
            "text-sm transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--base-color-blue-400)]",
            range.from
              ? "text-[var(--base-color-gray-900)]"
              : "text-[var(--base-color-gray-400)]",
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:border-[var(--base-color-gray-300)] cursor-pointer",
            className
          )}
        >
          <CalendarIcon
            className="shrink-0 text-[var(--base-color-gray-400)]"
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
            "border border-[var(--base-color-gray-200)] bg-white",
            "shadow-[var(--base-shadow-05)]",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            "duration-100 origin-(--radix-popover-content-transform-origin)"
          )}
        >
          {/* Presets column */}
          {presets && presets.length > 0 && (
            <div className="flex flex-col gap-0.5 p-2 border-r border-[var(--base-color-gray-200)] min-w-[140px]">
              <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--base-color-gray-400)]">
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
                      "flex items-center gap-2 px-2 py-1.5 rounded-[var(--base-radius-sm)]",
                      "text-sm text-left transition-colors",
                      isActive
                        ? "bg-[var(--base-color-blue-50)] text-[var(--base-color-blue-800)] font-medium"
                        : "text-[var(--base-color-gray-700)] hover:bg-[var(--base-color-gray-100)]"
                    )}
                  >
                    {preset.label}
                  </button>
                )
              })}
            </div>
          )}

          {/* Calendar area */}
          <div className="p-3">
            {/* Navigation row */}
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={handlePrevMonth}
                className={cn(
                  "flex items-center justify-center w-7 h-7 rounded-[var(--base-radius-sm)]",
                  "text-[var(--base-color-gray-500)] hover:text-[var(--base-color-gray-900)]",
                  "hover:bg-[var(--base-color-gray-100)] transition-colors"
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
                  "text-[var(--base-color-gray-500)] hover:text-[var(--base-color-gray-900)]",
                  "hover:bg-[var(--base-color-gray-100)] transition-colors"
                )}
                aria-label="Next month"
              >
                <ChevronRight style={{ width: 14, height: 14 }} />
              </button>
            </div>

            {/* Two months side by side */}
            <div className="flex gap-6">
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
            <div className="mt-3 pt-3 border-t border-[var(--base-color-gray-100)] flex items-center justify-between">
              <p className="text-xs text-[var(--base-color-gray-400)]">
                {selecting === "from" ? "Select start date" : "Select end date"}
              </p>
              {(range.from || range.to) && (
                <button
                  type="button"
                  onClick={() => {
                    setRange({ from: null, to: null })
                    setSelecting("from")
                  }}
                  className="text-xs text-[var(--base-color-gray-400)] hover:text-[var(--base-color-gray-700)] transition-colors"
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
