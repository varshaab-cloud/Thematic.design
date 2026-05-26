import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"
import { NumberInput } from "../../components/ui/number-input"

// ─── NumberInput stories ──────────────────────────────────────────────────────
// Numeric stepper — for bounded ranges where small adjustments are common.

const meta: Meta<typeof NumberInput> = {
  title: "Forms and input/Number input",
  component: NumberInput,
}

export default meta
type Story = StoryObj<typeof NumberInput>

// ─── States — all variants in a column ───────────────────────────────────────

export const States: Story = {
  name: "States",
  render: () => {
    const [defaultVal, setDefaultVal] = useState(1)
    const [atMinVal] = useState(0)
    const [atMaxVal] = useState(10)

    return (
      <div className="flex flex-col gap-6 max-w-xs">
        <div className="flex flex-col gap-2">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Default</p>
          <NumberInput value={defaultVal} onChange={setDefaultVal} min={0} max={10} />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Disabled</p>
          <NumberInput value={5} onChange={() => {}} min={0} max={10} disabled />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">At min</p>
          <NumberInput value={atMinVal} onChange={() => {}} min={0} max={10} />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">At max</p>
          <NumberInput value={atMaxVal} onChange={() => {}} min={0} max={10} />
        </div>
      </div>
    )
  },
}

// ─── Default — interactive value 1, min 0, max 10 ────────────────────────────

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(1)
    return <NumberInput value={value} onChange={setValue} min={0} max={10} />
  },
}

// ─── With limits — shows disabled buttons at bounds ──────────────────────────

export const WithLimits: Story = {
  render: () => {
    const [value, setValue] = useState(5)
    return <NumberInput value={value} onChange={setValue} min={1} max={10} />
  },
}

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: () => (
    <NumberInput value={5} onChange={() => {}} min={0} max={10} disabled />
  ),
}

// ─── Large step ───────────────────────────────────────────────────────────────

export const LargeStep: Story = {
  render: () => {
    const [value, setValue] = useState(50)
    return <NumberInput value={value} onChange={setValue} min={0} max={100} step={5} />
  },
}
