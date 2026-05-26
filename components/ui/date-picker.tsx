"use client"

import * as React from "react"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// ─── Helper functions ──────────────────────────────────────────────────────────

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

const SHORT_MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

function formatDate(date: Date): string {
  const day = date.getDate()
  const month = SHORT_MONTH_NAMES[date.getMonth()]
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function isDateDisabled(
  date: Date,
  min?: Date,
  max?: Date,
  disabledDates?: Date[]
): boolean {
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate())

  if (min) {
    const minOnly = new Date(min.getFullYear(), min.getMonth(), min.getDate())
    if (dateOnly < minOnly) return true
  }

  if (max) {
    const maxOnly = new Date(max.getFullYear(), max.getMonth(), max.getDate())
    if (dateOnly > maxOnly) return true
  }

  if (disabledDates) {
    for (const d of disabledDates) {
      if (isSameDay(date, d)) return true
    }
  }

  return false
}

// ─── Calendar ─────────────────────────────────────────────────────────────────

export interface CalendarProps {
  value?: Date
  onChange: (date: Date) => void
  min?: Date
  max?: Date
  disabledDates?: Date[]
  className?: string
}

export function Calendar({
  value,
  onChange,
  min,
  max,
  disabledDates,
  className,
}: CalendarProps) {
  const today = new Date()
  const [viewYear, setViewYear] = React.useState(
    value ? value.getFullYear() : today.getFullYear()
  )
  const [viewMonth, setViewMonth] = React.useState(
    value ? value.getMonth() : today.getMonth()
  )

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

  const daysInPrevMonth = getDaysInMonth(
    viewMonth === 0 ? viewYear - 1 : viewYear,
    viewMonth === 0 ? 11 : viewMonth - 1
  )

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear((y) => y - 1)
    } else {
      setViewMonth((m) => m - 1)
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear((y) => y + 1)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  // Build the grid cells: prefix (prev month tail) + current month + suffix (next month head)
  type DayCell = {
    date: Date
    isCurrentMonth: boolean
  }

  const cells: DayCell[] = []

  // Previous month tail
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i
    const prevMonthIndex = viewMonth === 0 ? 11 : viewMonth - 1
    const prevYear = viewMonth === 0 ? viewYear - 1 : viewYear
    cells.push({ date: new Date(prevYear, prevMonthIndex, d), isCurrentMonth: false })
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(viewYear, viewMonth, d), isCurrentMonth: true })
  }

  // Next month head — fill to complete the last row
  const remaining = 7 - (cells.length % 7)
  if (remaining < 7) {
    const nextMonthIndex = viewMonth === 11 ? 0 : viewMonth + 1
    const nextYear = viewMonth === 11 ? viewYear + 1 : viewYear
    for (let d = 1; d <= remaining; d++) {
      cells.push({ date: new Date(nextYear, nextMonthIndex, d), isCurrentMonth: false })
    }
  }

  const rows: DayCell[][] = []
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7))
  }

  return (
    <div
      role="grid"
      aria-label={`${MONTH_NAMES[viewMonth]} ${viewYear}`}
      className={cn("w-[280px] select-none p-3", className)}
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous month"
          onClick={prevMonth}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-[var(--base-radius-sm)]",
            "text-[var(--alias-color-icon-secondary)] transition-colors",
            "hover:bg-[var(--alias-color-background-tertiary)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--alias-color-border-active)]"
          )}
        >
          <ChevronLeft className="size-4" />
        </button>

        <span className="text-sm font-semibold text-[var(--alias-color-text-primary)]">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>

        <button
          type="button"
          aria-label="Next month"
          onClick={nextMonth}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-[var(--base-radius-sm)]",
            "text-[var(--alias-color-icon-secondary)] transition-colors",
            "hover:bg-[var(--alias-color-background-tertiary)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--alias-color-border-active)]"
          )}
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      {/* Weekday labels */}
      <div className="mb-1 grid grid-cols-7">
        {WEEKDAY_LABELS.map((day) => (
          <div
            key={day}
            aria-hidden="true"
            className="flex h-8 items-center justify-center text-[11px] font-medium text-[var(--alias-color-text-disabled)]"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Day grid */}
      {rows.map((row, ri) => (
        <div key={ri} role="row" className="grid grid-cols-7">
          {row.map(({ date, isCurrentMonth }, ci) => {
            const disabled = isDateDisabled(date, min, max, disabledDates)
            const isToday = isSameDay(date, today)
            const isSelected = value ? isSameDay(date, value) : false

            return (
              <div key={ci} role="gridcell">
                <button
                  type="button"
                  aria-label={formatDate(date)}
                  aria-selected={isSelected}
                  aria-disabled={disabled}
                  disabled={disabled}
                  onClick={() => !disabled && onChange(date)}
                  className={cn(
                    "mx-auto flex h-9 w-9 items-center justify-center rounded-full text-[14px] transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--alias-color-border-active)]",
                    // Base text colour
                    isCurrentMonth
                      ? "text-[var(--alias-color-text-primary)]"
                      : "text-[var(--alias-color-text-disabled)]",
                    // Today ring
                    isToday && !isSelected && "border border-[var(--alias-color-border-active)]",
                    // Selected
                    isSelected && [
                      "bg-[var(--alias-color-background-brand)] text-[var(--alias-color-text-inverse)]",
                      "border border-[var(--alias-color-background-brand)]",
                    ],
                    // Hover (only when not selected/disabled)
                    !isSelected && !disabled && "hover:bg-[var(--alias-color-background-tertiary)]",
                    // Disabled
                    disabled && "cursor-not-allowed opacity-40"
                  )}
                >
                  {date.getDate()}
                </button>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

// ─── DatePicker ────────────────────────────────────────────────────────────────

export interface DatePickerProps {
  value?: Date
  onChange: (date: Date) => void
  placeholder?: string
  min?: Date
  max?: Date
  disabled?: boolean
  className?: string
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Select a date",
  min,
  max,
  disabled = false,
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  function handleSelect(date: Date) {
    onChange(date)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            // Match Input styling exactly
            "h-8 w-full min-w-0 rounded-[var(--base-radius-md)] border border-[var(--base-color-gray-300)]",
            "bg-[var(--base-color-white)] px-2.5 py-1 text-sm transition-colors outline-none",
            "flex items-center justify-between gap-2",
            "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
            disabled && "cursor-not-allowed bg-[var(--base-color-gray-100)] opacity-50 pointer-events-none",
            open && "border-[var(--alias-color-border-active)]",
            className
          )}
        >
          <span
            className={cn(
              "flex-1 text-left truncate",
              value
                ? "text-[var(--alias-color-text-primary)]"
                : "text-[var(--alias-color-text-disabled)]"
            )}
          >
            {value ? formatDate(value) : placeholder}
          </span>
          <CalendarIcon className="size-4 shrink-0 text-[var(--alias-color-icon-secondary)]" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-auto p-0"
        aria-label="Date picker"
        role="dialog"
      >
        <Calendar
          value={value}
          onChange={handleSelect}
          min={min}
          max={max}
        />
      </PopoverContent>
    </Popover>
  )
}
