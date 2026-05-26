import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { DatePicker, Calendar } from "@/components/ui/date-picker"

const meta: Meta = {
  title: "Forms and input/Date picker",
  parameters: { layout: "centered" },
}
export default meta
type Story = StoryObj

// ─── States ───────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => {
    const [v1, setV1] = useState<Date | undefined>(undefined)
    const [v2, setV2] = useState<Date | undefined>(new Date(2026, 4, 25))
    const [v3, setV3] = useState<Date | undefined>(undefined)

    return (
      <div className="flex flex-col gap-6" style={{ width: 280 }}>
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-[var(--alias-color-text-disabled)] uppercase tracking-wide">
            Default (empty)
          </span>
          <DatePicker
            value={v1}
            onChange={setV1}
            placeholder="Select a date"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-[var(--alias-color-text-disabled)] uppercase tracking-wide">
            With value
          </span>
          <DatePicker
            value={v2}
            onChange={setV2}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-[var(--alias-color-text-disabled)] uppercase tracking-wide">
            Disabled
          </span>
          <DatePicker
            value={v3}
            onChange={setV3}
            placeholder="Select a date"
            disabled
          />
        </div>
      </div>
    )
  },
}

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<Date | undefined>(undefined)
    return (
      <div style={{ width: 280 }}>
        <DatePicker
          value={value}
          onChange={setValue}
          placeholder="Select a date"
        />
      </div>
    )
  },
}

// ─── WithValue ────────────────────────────────────────────────────────────────

export const WithValue: Story = {
  name: "With value",
  render: () => {
    const [value, setValue] = useState<Date | undefined>(new Date(2026, 4, 25))
    return (
      <div style={{ width: 280 }}>
        <DatePicker
          value={value}
          onChange={setValue}
        />
      </div>
    )
  },
}

// ─── WithMinMax ───────────────────────────────────────────────────────────────

export const WithMinMax: Story = {
  name: "With min / max",
  render: () => {
    const [value, setValue] = useState<Date | undefined>(undefined)
    const today = new Date()
    const maxDate = new Date()
    maxDate.setDate(today.getDate() + 90)

    return (
      <div className="flex flex-col gap-2" style={{ width: 280 }}>
        <p className="text-xs text-[var(--alias-color-text-disabled)]">
          Selectable range: today + 90 days
        </p>
        <DatePicker
          value={value}
          onChange={setValue}
          placeholder="Select a future date"
          min={today}
          max={maxDate}
        />
      </div>
    )
  },
}

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: () => {
    return (
      <div style={{ width: 280 }}>
        <DatePicker
          value={undefined}
          onChange={() => {}}
          placeholder="Select a date"
          disabled
        />
      </div>
    )
  },
}

// ─── CalendarOnly ─────────────────────────────────────────────────────────────

export const CalendarOnly: Story = {
  name: "Calendar only",
  render: () => {
    const [value, setValue] = useState<Date | undefined>(new Date(2026, 4, 25))
    return (
      <div
        className="rounded-[var(--base-radius-md)] border border-[var(--base-color-gray-200)] bg-[var(--alias-color-background-primary)] shadow-[var(--base-shadow-02)]"
        style={{ display: "inline-block" }}
      >
        <Calendar value={value} onChange={setValue} />
      </div>
    )
  },
}
