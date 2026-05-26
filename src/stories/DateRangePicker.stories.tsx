"use client"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import React, { useState } from "react"
import { DateRangePicker, DateRange, DateRangePreset } from "../../components/ui/date-range-picker"

const meta: Meta<typeof DateRangePicker> = {
  title: "Forms and input/DateRangePicker",
  component: DateRangePicker,
  tags: ["!autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof DateRangePicker>

// ─── Preset helpers ───────────────────────────────────────────────────────────

function today() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

function daysAgo(n: number): Date {
  const d = today()
  d.setDate(d.getDate() - n)
  return d
}

function startOfMonth(): Date {
  const d = today()
  d.setDate(1)
  return d
}

function startOfQuarter(): Date {
  const d = today()
  const month = d.getMonth()
  const quarterStart = Math.floor(month / 3) * 3
  d.setMonth(quarterStart, 1)
  return d
}

const defaultPresets: DateRangePreset[] = [
  { label: "Last 7 days", range: { from: daysAgo(6), to: today() } },
  { label: "Last 30 days", range: { from: daysAgo(29), to: today() } },
  { label: "This month", range: { from: startOfMonth(), to: today() } },
  { label: "This quarter", range: { from: startOfQuarter(), to: today() } },
]

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-3 p-6 min-h-[340px]">
      <label className="text-sm font-medium text-[var(--base-color-gray-900)]">
        Date range
      </label>
      <DateRangePicker placeholder="Select date range" />
    </div>
  ),
}

// ─── Controlled ───────────────────────────────────────────────────────────────

export const Controlled: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange>({ from: null, to: null })

    const label = (() => {
      if (range.from && range.to) {
        const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        return `${fmt(range.from)} – ${fmt(range.to)}`
      }
      if (range.from) return "Select end date…"
      return "No range selected"
    })()

    return (
      <div className="flex flex-col items-start gap-4 p-6 min-h-[340px]">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--base-color-gray-900)]">
            Billing period
          </label>
          <DateRangePicker value={range} onChange={setRange} />
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-[var(--base-radius-md)] bg-[var(--base-color-gray-100)] border border-[var(--base-color-gray-200)]">
          <span className="text-xs text-[var(--base-color-gray-500)]">Selected:</span>
          <span className="text-xs font-medium text-[var(--base-color-gray-900)]">{label}</span>
        </div>
      </div>
    )
  },
}

// ─── WithPresets ──────────────────────────────────────────────────────────────

export const WithPresets: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-3 p-6 min-h-[340px]">
      <label className="text-sm font-medium text-[var(--base-color-gray-900)]">
        Report date range
      </label>
      <DateRangePicker
        placeholder="Select date range"
        presets={defaultPresets}
      />
      <p className="text-xs text-[var(--base-color-gray-400)]">
        Choose from common presets or pick custom dates on the calendar.
      </p>
    </div>
  ),
}

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-3 p-6">
      <label className="text-sm font-medium text-[var(--base-color-gray-400)]">
        Date range (disabled)
      </label>
      <DateRangePicker
        disabled
        value={{ from: daysAgo(6), to: today() }}
      />
      <p className="text-xs text-[var(--base-color-gray-400)]">
        The picker is read-only when <code>disabled</code> is set.
      </p>
    </div>
  ),
}
