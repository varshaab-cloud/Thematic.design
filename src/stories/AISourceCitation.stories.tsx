import type { Meta, StoryObj } from "@storybook/react"
import { CitationMarker, SourceList } from "../../components/ui/source-citation"
import type { Citation } from "../../components/ui/source-citation"

const SAMPLE_CITATIONS: Citation[] = [
  {
    index: 1,
    title: "Thematic Design System — Token Architecture",
    url: "https://thematic-design.vercel.app/?path=/docs/foundation-tokens--docs",
    excerpt: "A three-tier token hierarchy: base → alias → component.",
  },
  {
    index: 2,
    title: "WAI-ARIA Authoring Practices — Live Regions",
    url: "https://www.w3.org/WAI/ARIA/apg/practices/live-region/",
    excerpt: "Guidance on aria-live, aria-atomic, and debouncing announcements.",
  },
  {
    index: 3,
    title: "Storybook 10 Release Notes",
    excerpt: "No public URL — internal document.",
  },
]

const meta: Meta = {
  title: "AI / Conversation/SourceCitation",
  parameters: { layout: "padded" },
}

export default meta
type Story = StoryObj

export const InlineMarkers: Story = {
  name: "Inline citation markers",
  render: () => (
    <p className="text-sm max-w-lg leading-relaxed">
      The token system uses a three-tier hierarchy{" "}
      <CitationMarker index={1} title={SAMPLE_CITATIONS[0].title} excerpt={SAMPLE_CITATIONS[0].excerpt} />{" "}
      and accessibility best-practice recommends debouncing live-region announcements{" "}
      <CitationMarker index={2} title={SAMPLE_CITATIONS[1].title} excerpt={SAMPLE_CITATIONS[1].excerpt} />.
    </p>
  ),
}

export const SourceListFull: Story = {
  name: "Source list",
  render: () => <SourceList citations={SAMPLE_CITATIONS} />,
}

export const InlineWithList: Story = {
  name: "Inline markers + source list",
  render: () => (
    <div className="max-w-lg">
      <p className="text-sm leading-relaxed">
        The three-tier token hierarchy{" "}
        <CitationMarker index={1} title={SAMPLE_CITATIONS[0].title} excerpt={SAMPLE_CITATIONS[0].excerpt} />{" "}
        ensures design decisions stay traceable from brand intent to rendered pixels.
        For AI interfaces, aria-live regions{" "}
        <CitationMarker index={2} title={SAMPLE_CITATIONS[1].title} excerpt={SAMPLE_CITATIONS[1].excerpt} />{" "}
        must be carefully debounced to avoid overwhelming screen-reader users.
      </p>
      <SourceList citations={SAMPLE_CITATIONS.slice(0, 2)} />
    </div>
  ),
}

export const NoUrl: Story = {
  name: "Source without URL",
  render: () => <SourceList citations={[SAMPLE_CITATIONS[2]]} heading="Internal references" />,
}
