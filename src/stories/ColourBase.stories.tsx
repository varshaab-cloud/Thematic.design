import type { Meta, StoryObj } from "@storybook/react"
import React from "react"

const meta: Meta = {
  title: "Foundation/Colours/Base",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { page: null },
  },
}

export default meta
type Story = StoryObj

// ─── Palette data ─────────────────────────────────────────────────────────────

const palettes = [
  {
    name: "Neutral",
    description: "Black and white — absolute extremes",
    swatches: [
      { stop: "Black", value: "#000000" },
      { stop: "White", value: "#ffffff" },
    ],
  },
  {
    name: "Gray",
    description: "Neutral scale — backgrounds, borders, disabled states",
    swatches: [
      { stop: "75", value: "#f5f5f3" },
      { stop: "100", value: "#eeeeec" },
      { stop: "200", value: "#e3e3e0" },
      { stop: "300", value: "#d5d5d5" },
      { stop: "400", value: "#b1b1b1" },
      { stop: "500", value: "#909090" },
      { stop: "600", value: "#6d6d6d" },
      { stop: "700", value: "#464646" },
      { stop: "900", value: "#222222" },
    ],
  },
  {
    name: "Blue",
    description: "Brand primary — anchors actions, links and active states",
    swatches: [
      { stop: "100", value: "#c4c5f4" },
      { stop: "200", value: "#aaacf0" },
      { stop: "300", value: "#9194eb" },
      { stop: "400", value: "#6e71e6" },
      { stop: "600", value: "#1c21dc" },
      { stop: "700", value: "#171cbe" },
      { stop: "800", value: "#1518a6" },
      { stop: "900", value: "#111487" },
    ],
  },
  {
    name: "Red",
    description: "Destructive actions, critical errors",
    swatches: [
      { stop: "100", value: "#ffe2e2" },
      { stop: "200", value: "#ffb9bb" },
      { stop: "300", value: "#ff999c" },
      { stop: "400", value: "#f55658" },
      { stop: "600", value: "#d21a26" },
      { stop: "700", value: "#ab121b" },
      { stop: "800", value: "#81070d" },
      { stop: "900", value: "#640204" },
    ],
  },
  {
    name: "Green",
    description: "Success states, positive confirmations",
    swatches: [
      { stop: "100", value: "#dcfce7" },
      { stop: "200", value: "#bbf7d0" },
      { stop: "300", value: "#86efac" },
      { stop: "400", value: "#4ade80" },
      { stop: "600", value: "#16a34a" },
      { stop: "700", value: "#15803d" },
      { stop: "800", value: "#166534" },
      { stop: "900", value: "#14532d" },
    ],
  },
  {
    name: "Info",
    description: "Informational — help, hints and ambient signals",
    swatches: [
      { stop: "600", value: "#e0f2fe" },
      { stop: "700", value: "#0369a1" },
    ],
  },
  {
    name: "Success",
    description: "Success feedback — positive outcomes",
    swatches: [
      { stop: "800", value: "#dcfce7" },
      { stop: "900", value: "#16a34a" },
    ],
  },
  {
    name: "Error",
    description: "Error states — system failures",
    swatches: [
      { stop: "200", value: "#ffe9e5" },
      { stop: "300", value: "#ff4e2a" },
    ],
  },
  {
    name: "Warning",
    description: "Warning states — requires attention",
    swatches: [
      { stop: "50", value: "#fffade" },
      { stop: "100", value: "#f7d307" },
    ],
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function needsDarkText(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.55
}

// ─── Page component ───────────────────────────────────────────────────────────

function ColourBasePage() {
  return (
    <div
      style={{
        background: "#ffffff",
        minHeight: "100vh",
        padding: "48px",
        fontFamily: "'Open Sans', sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* Breadcrumb */}
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#888",
          margin: 0,
          fontWeight: 500,
        }}
      >
        Colours · Base
      </p>

      {/* Heading */}
      <h1
        style={{
          fontSize: 36,
          fontWeight: 700,
          color: "#111",
          margin: "6px 0 12px",
          lineHeight: 1.15,
        }}
      >
        Base colour palette
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 14,
          color: "#555",
          maxWidth: 600,
          lineHeight: 1.6,
          margin: "0 0 40px",
        }}
      >
        Raw colour primitives that underpin every alias and component token. Never reference these
        directly in product code — always go through an alias or component token.
      </p>

      {/* Palette groups */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {palettes.map((palette, i) => (
          <div
            key={palette.name}
            style={{
              borderTop: i === 0 ? "1px solid #eee" : "none",
              borderBottom: "1px solid #eee",
              padding: "28px 0",
            }}
          >
            {/* Group header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 16,
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 500, color: "#111" }}>
                {palette.name}
              </span>
              <span style={{ fontSize: 13, color: "#888" }}>
                {palette.description}
              </span>
            </div>

            {/* Swatches */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {palette.swatches.map(({ stop, value }) => (
                <div
                  key={stop}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "var(--base-radius-sm, 4px)",
                      background: value,
                      border: "1px solid rgba(0,0,0,0.06)",
                      flexShrink: 0,
                    }}
                    title={value}
                  />
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: "#333",
                      textAlign: "center",
                    }}
                  >
                    {stop}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: "#888",
                      fontFamily: "monospace",
                      textAlign: "center",
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Default: Story = {
  name: "Base palette",
  render: () => <ColourBasePage />,
}
