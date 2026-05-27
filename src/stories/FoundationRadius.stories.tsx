import type { Meta, StoryObj } from "@storybook/react"
import React from "react"

const meta: Meta = {
  title: "Foundation/Corner Radius",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { page: null },
  },
}

export default meta
type Story = StoryObj

// ─── Radius data ──────────────────────────────────────────────────────────────

const radiusTokens = [
  { name: "--base-radius-xs", suffix: "radius-xs", value: "2px", px: 2 },
  { name: "--base-radius-sm", suffix: "radius-sm", value: "4px", px: 4 },
  { name: "--base-radius-md", suffix: "radius-md", value: "6px", px: 6 },
  { name: "--base-radius-lg", suffix: "radius-lg", value: "8px", px: 8 },
  { name: "--base-radius-xl", suffix: "radius-xl", value: "10px", px: 10 },
  { name: "--base-radius-xxl", suffix: "radius-xxl", value: "14px", px: 14 },
]

// ─── Page component ───────────────────────────────────────────────────────────

function FoundationRadiusPage() {
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
        Foundation · Corner Radius
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
        From sharp to round
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
        Six steps from 2px to 14px, plus a full-pill token for tags and badges. Components
        reference these through <code style={{ fontSize: 13, background: "#f5f5f3", padding: "1px 5px", borderRadius: 3 }}>var(--base-radius-*)</code> or
        the component-level override token.
      </p>

      {/* Radius grid */}
      <div
        style={{
          display: "flex",
          gap: 40,
          flexWrap: "wrap",
          alignItems: "flex-end",
          marginBottom: 56,
        }}
      >
        {radiusTokens.map((token) => (
          <div
            key={token.name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 100,
                height: 100,
                border: "2px solid #1c21dc",
                borderRadius: token.px,
                background: "transparent",
                flexShrink: 0,
              }}
            />
            <div style={{ textAlign: "center" }}>
              <span
                style={{
                  fontSize: 12,
                  color: "#888",
                  display: "block",
                  marginBottom: 2,
                }}
              >
                {token.suffix}
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#222",
                  fontFamily: "monospace",
                  display: "block",
                }}
              >
                {token.value}
              </span>
            </div>
          </div>
        ))}

        {/* Full pill */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              border: "2px solid #1c21dc",
              borderRadius: 9999,
              background: "transparent",
              flexShrink: 0,
            }}
          />
          <div style={{ textAlign: "center" }}>
            <span
              style={{
                fontSize: 12,
                color: "#888",
                display: "block",
                marginBottom: 2,
              }}
            >
              radius-full
            </span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#222",
                fontFamily: "monospace",
                display: "block",
              }}
            >
              9999px
            </span>
          </div>
        </div>
      </div>

      {/* Token reference table */}
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#aaa",
          marginBottom: 16,
        }}
      >
        Token reference
      </div>

      {/* Column headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 120px 100px",
          padding: "0 0 8px",
          borderBottom: "1px solid #eee",
          gap: 16,
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#aaa" }}>Token</span>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#aaa" }}>Value</span>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#aaa" }}>Preview</span>
      </div>

      {[...radiusTokens, { name: "--base-radius-full", suffix: "radius-full", value: "9999px", px: 9999 }].map((token, i) => (
        <div
          key={token.name}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 120px 100px",
            alignItems: "center",
            padding: "10px 0",
            borderBottom: "1px solid #eee",
            gap: 16,
          }}
        >
          <span style={{ fontFamily: "monospace", fontSize: 13, color: "#222" }}>
            {token.name}
          </span>
          <span style={{ fontFamily: "monospace", fontSize: 12, color: "#888" }}>
            {token.value}
          </span>
          <div
            style={{
              width: 32,
              height: 32,
              border: "2px solid #1c21dc",
              borderRadius: token.px,
              background: "transparent",
            }}
          />
        </div>
      ))}
    </div>
  )
}

export const Default: Story = {
  name: "Corner radius",
  render: () => <FoundationRadiusPage />,
}
