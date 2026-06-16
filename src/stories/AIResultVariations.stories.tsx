import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { ResultVariations } from "../../components/ui/result-variations"
import type { Variation } from "../../components/ui/result-variations"

const VARIATIONS: Variation[] = [
  {
    id: "a",
    label: "Concise",
    content: (
      <p className="text-sm leading-relaxed">
        Q3 revenue grew 12% YoY to $4.2B, beating estimates by 3%. Operating margin expanded
        200bps to 18%. Management raised full-year guidance to $16.8B (prev. $16.4B).
      </p>
    ),
  },
  {
    id: "b",
    label: "Detailed",
    content: (
      <div className="text-sm leading-relaxed space-y-2">
        <p>
          Third-quarter revenue came in at $4.2 billion, a 12% increase year-over-year and
          3% above the analyst consensus of $4.08B. The beat was driven primarily by enterprise
          segment growth (+18%) and improved net revenue retention (112%, up from 108%).
        </p>
        <p>
          Operating margin expanded by 200 basis points to 18%, reflecting both revenue leverage
          and cost discipline. R&amp;D spend as a percentage of revenue declined from 22% to 19%.
        </p>
        <p>
          Full-year guidance was raised to $16.8B (from $16.4B), implying Q4 revenue of approximately
          $4.7B — a 15% YoY growth rate.
        </p>
      </div>
    ),
  },
  {
    id: "c",
    label: "Executive bullet points",
    content: (
      <ul className="text-sm space-y-1.5 list-none">
        {[
          "Revenue: $4.2B (+12% YoY, +3% vs consensus)",
          "Operating margin: 18% (+200bps)",
          "Net revenue retention: 112% (prev. 108%)",
          "FY guidance raised: $16.8B (from $16.4B)",
          "Q4 implied growth: ~15% YoY",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--alias-color-background-brand)]" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    ),
  },
]

const meta: Meta<typeof ResultVariations> = {
  title: "AI / Conversation/ResultVariations",
  component: ResultVariations,
  parameters: { layout: "padded" },
  argTypes: {
    layout: { control: "select", options: ["tabs", "carousel"] },
  },
}

export default meta
type Story = StoryObj<typeof ResultVariations>

export const Tabs: Story = {
  name: "Tabs layout",
  render: () => {
    const [selected, setSelected] = React.useState<string | undefined>()
    return (
      <div className="max-w-2xl">
        <ResultVariations
          variations={VARIATIONS}
          selectedId={selected}
          onSelect={setSelected}
          layout="tabs"
        />
      </div>
    )
  },
}

export const Carousel: Story = {
  name: "Carousel layout",
  render: () => {
    const [selected, setSelected] = React.useState<string | undefined>()
    return (
      <div className="max-w-2xl">
        <ResultVariations
          variations={VARIATIONS}
          selectedId={selected}
          onSelect={setSelected}
          layout="carousel"
        />
      </div>
    )
  },
}

export const WithSelection: Story = {
  name: "With pre-selected variation",
  render: () => (
    <div className="max-w-2xl">
      <ResultVariations
        variations={VARIATIONS}
        selectedId="b"
        onSelect={() => {}}
        layout="tabs"
      />
    </div>
  ),
}

export const TwoVariations: Story = {
  name: "Two variations (A / B)",
  render: () => {
    const [selected, setSelected] = React.useState<string | undefined>()
    return (
      <div className="max-w-2xl">
        <ResultVariations
          variations={[VARIATIONS[0], VARIATIONS[1]]}
          selectedId={selected}
          onSelect={setSelected}
        />
      </div>
    )
  },
}

export const Playground: Story = {
  args: {
    layout: "tabs",
  },
  render: (args) => {
    const [selected, setSelected] = React.useState<string | undefined>()
    return (
      <div className="max-w-2xl">
        <ResultVariations
          {...args}
          variations={VARIATIONS}
          selectedId={selected}
          onSelect={setSelected}
        />
      </div>
    )
  },
}
