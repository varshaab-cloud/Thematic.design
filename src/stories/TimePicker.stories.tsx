import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TimePicker } from "@/components/ui/time-picker"

const meta: Meta = {
  title: "Forms and input/TimePicker",
  tags: ["!autodocs"],
  parameters: { layout: "centered" },
}
export default meta
type Story = StoryObj

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <div style={{ width: 200 }}>
      <TimePicker placeholder="Select time" />
    </div>
  ),
}

// ─── Controlled ───────────────────────────────────────────────────────────────

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>("09:30")

    return (
      <div className="flex flex-col gap-4" style={{ width: 200 }}>
        <TimePicker value={value} onChange={setValue} placeholder="Select time" />
        <div className="rounded-[var(--base-radius-md)] border border-[var(--base-color-gray-200)] bg-[var(--alias-color-background-secondary)] px-3 py-2 text-sm text-muted-foreground">
          {value
            ? <span>Value: <span className="font-medium text-foreground">{value}</span></span>
            : "No time selected"}
        </div>
      </div>
    )
  },
}

// ─── TwentyFourHour ───────────────────────────────────────────────────────────

export const TwentyFourHour: Story = {
  name: "24-hour format",
  render: () => {
    const [value, setValue] = useState<string | undefined>("14:00")

    return (
      <div className="flex flex-col gap-4" style={{ width: 200 }}>
        <TimePicker
          value={value}
          onChange={setValue}
          use12Hour={false}
          placeholder="Select time"
        />
        <div className="rounded-[var(--base-radius-md)] border border-[var(--base-color-gray-200)] bg-[var(--alias-color-background-secondary)] px-3 py-2 text-sm text-muted-foreground">
          {value
            ? <span>Value: <span className="font-medium text-foreground">{value}</span></span>
            : "No time selected"}
        </div>
      </div>
    )
  },
}

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 200 }}>
      <TimePicker value="10:30" disabled />
    </div>
  ),
}
