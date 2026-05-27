import type { Meta, StoryObj } from "@storybook/react"
import React from "react"

const meta: Meta = {
  title: "Foundation/Shadows",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { page: null },
  },
}

export default meta
type Story = StoryObj

// ─── Shadow data ──────────────────────────────────────────────────────────────

const shadowTokens = [
  {
    name: "--base-shadow-01",
    value: "0px 1px 2px 0px rgba(0,0,0,0.05)",
    usage: "Subtle lift — cards at rest, low-emphasis containers",
  },
  {
    name: "--base-shadow-02",
    value: "0px 1px 3px 0px rgba(0,0,0,0.06), 0px 4px 16px 0px rgba(0,0,0,0.05)",
    usage: "Cards, dropdowns, floating labels",
  },
  {
    name: "--base-shadow-03",
    value: "0px 2px 4px 0px rgba(0,0,0,0.07), 0px 6px 20px 0px rgba(0,0,0,0.06)",
    usage: "Popovers, tooltips, date pickers",
  },
  {
    name: "--base-shadow-04",
    value: "0px 4px 6px 0px rgba(0,0,0,0.07), 0px 10px 30px 0px rgba(0,0,0,0.08)",
    usage: "Drawers, side panels, fly-out menus",
  },
  {
    name: "--base-shadow-05",
    value: "0px 8px 16px 0px rgba(0,0,0,0.10), 0px 20px 48px 0px rgba(0,0,0,0.10)",
    usage: "Modals, dialogs, full-screen overlays",
  },
]

// ─── Page component ───────────────────────────────────────────────────────────

function FoundationShadowsPage() {
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
        Foundation · Shadows
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
        Elevation layers
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
        Five levels of elevation from a near-invisible lift to a full modal presence. Each level
        uses a two-layer shadow — a tight contact shadow and a diffuse ambient glow — for natural depth.
      </p>

      {/* Shadow rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {shadowTokens.map((token, i) => (
          <div
            key={token.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 32,
              padding: "32px 0",
              borderTop: i === 0 ? "1px solid #eee" : "none",
              borderBottom: "1px solid #eee",
            }}
          >
            {/* Shadow box preview */}
            <div
              style={{
                width: 120,
                height: 72,
                background: "#ffffff",
                boxShadow: token.value,
                borderRadius: 6,
                flexShrink: 0,
                border: "1px solid rgba(0,0,0,0.04)",
              }}
            />

            {/* Details */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#222",
                  display: "block",
                  marginBottom: 4,
                }}
              >
                {token.name}
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: "#555",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                {token.usage}
              </span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  color: "#aaa",
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                title={token.value}
              >
                {token.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Default: Story = {
  name: "Elevation layers",
  render: () => <FoundationShadowsPage />,
}
