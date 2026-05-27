import type { Meta, StoryObj } from "@storybook/react"
import React from "react"

const meta: Meta = {
  title: "Foundation/Typography",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { page: null },
  },
}

export default meta
type Story = StoryObj

// ─── Type scale data ──────────────────────────────────────────────────────────

function remToPx(rem: string): number {
  return parseFloat(rem) * 16
}

const typeStyles = [
  {
    name: "Heading 1",
    token: "--alias-typography-heading1",
    fontSize: "3rem",
    fontWeight: "700",
    lineHeight: "1.5rem",
    sample: "Aa Bb Cc — The quick brown fox jumps over the lazy dog",
  },
  {
    name: "Heading 2",
    token: "--alias-typography-heading2",
    fontSize: "2.625rem",
    fontWeight: "700",
    lineHeight: "1.5rem",
    sample: "Aa Bb Cc — The quick brown fox jumps over the lazy dog",
  },
  {
    name: "Heading 3",
    token: "--alias-typography-heading3",
    fontSize: "2.25rem",
    fontWeight: "700",
    lineHeight: "1.5rem",
    sample: "Aa Bb Cc — The quick brown fox jumps over the lazy dog",
  },
  {
    name: "Heading 4",
    token: "--alias-typography-heading4",
    fontSize: "2rem",
    fontWeight: "700",
    lineHeight: "1.5rem",
    sample: "Aa Bb Cc — The quick brown fox jumps over the lazy dog",
  },
  {
    name: "Heading 5",
    token: "--alias-typography-heading5",
    fontSize: "1.875rem",
    fontWeight: "700",
    lineHeight: "1.5rem",
    sample: "Aa Bb Cc — The quick brown fox jumps over the lazy dog",
  },
  {
    name: "Heading 6",
    token: "--alias-typography-heading6",
    fontSize: "1.875rem",
    fontWeight: "600",
    lineHeight: "1.5rem",
    sample: "Aa Bb Cc — The quick brown fox jumps over the lazy dog",
  },
  {
    name: "Subheading 1",
    token: "--alias-typography-subheading1",
    fontSize: "1rem",
    fontWeight: "400",
    lineHeight: "1.5rem",
    sample: "Aa Bb Cc — The quick brown fox jumps over the lazy dog",
  },
  {
    name: "Subheading 2",
    token: "--alias-typography-subheading2",
    fontSize: "0.875rem",
    fontWeight: "500",
    lineHeight: "1.5rem",
    sample: "Aa Bb Cc — The quick brown fox jumps over the lazy dog",
  },
  {
    name: "Body Text 1",
    token: "--alias-typography-body-text1",
    fontSize: "1rem",
    fontWeight: "400",
    lineHeight: "1.5rem",
    sample: "Aa Bb Cc — The quick brown fox jumps over the lazy dog",
  },
  {
    name: "Body Text 2",
    token: "--alias-typography-body-text2",
    fontSize: "0.875rem",
    fontWeight: "400",
    lineHeight: "1.5rem",
    sample: "Aa Bb Cc — The quick brown fox jumps over the lazy dog",
  },
  {
    name: "Body Text 3",
    token: "--alias-typography-body-text3",
    fontSize: "0.75rem",
    fontWeight: "400",
    lineHeight: "1.5rem",
    sample: "Aa Bb Cc — The quick brown fox jumps over the lazy dog",
  },
  {
    name: "Button",
    token: "--alias-typography-button",
    fontSize: "0.875rem",
    fontWeight: "500",
    lineHeight: "1.25rem",
    sample: "Save changes · Cancel · Submit form",
  },
  {
    name: "Caption 1",
    token: "--alias-typography-caption1",
    fontSize: "0.75rem",
    fontWeight: "400",
    lineHeight: "1.25rem",
    sample: "Last updated 3 hours ago · Required field · 12 items",
  },
  {
    name: "Caption 2",
    token: "--alias-typography-caption2",
    fontSize: "0.625rem",
    fontWeight: "400",
    lineHeight: "1.25rem",
    sample: "Tooltip label text · Helper annotation · Tiny note",
  },
]

// ─── Line height bar ──────────────────────────────────────────────────────────

function LineHeightBar({ fontSizePx, lineHeightPx }: { fontSizePx: number; lineHeightPx: number }) {
  const barWidth = 180
  const fillWidth = Math.min((fontSizePx / lineHeightPx) * barWidth, barWidth)

  return (
    <div
      style={{
        width: barWidth,
        height: 6,
        background: "#eee",
        borderRadius: 3,
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: fillWidth,
          height: "100%",
          background: "#1c21dc",
          borderRadius: 3,
        }}
      />
    </div>
  )
}

// ─── Spec pill ────────────────────────────────────────────────────────────────

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 80 }}>
      <span
        style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          color: "#aaa",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 12,
          fontWeight: 500,
          color: "#333",
          fontFamily: "monospace",
        }}
      >
        {value}
      </span>
    </div>
  )
}

// ─── Page component ───────────────────────────────────────────────────────────

function FoundationTypographyPage() {
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
        Foundation · Typography
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
        Open Sans, all the way down
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
        Every type style in the system uses Open Sans. Reference tokens via{" "}
        <code style={{ fontSize: 13, background: "#f5f5f3", padding: "1px 5px", borderRadius: 3 }}>
          --alias-typography-&#123;name&#125;-font-size
        </code>{" "}
        and its siblings. The bar shows font-size as a proportion of line-height.
      </p>

      {/* Type styles */}
      <div>
        {typeStyles.map((style, i) => {
          const fsPx = remToPx(style.fontSize)
          const lhPx = remToPx(style.lineHeight)

          return (
            <div
              key={style.name}
              style={{
                borderTop: i === 0 ? "1px solid #eee" : "none",
                borderBottom: "1px solid #eee",
                padding: "28px 0 24px",
              }}
            >
              {/* Style name */}
              <div style={{ marginBottom: 14 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "#aaa",
                  }}
                >
                  {style.name}
                </span>
              </div>

              {/* Specimen text */}
              <div
                style={{
                  fontSize: style.fontSize,
                  fontWeight: Number(style.fontWeight),
                  lineHeight: 1.2,
                  color: "#111",
                  marginBottom: 16,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {style.sample}
              </div>

              {/* Line height bar */}
              <div style={{ marginBottom: 16 }}>
                <LineHeightBar fontSizePx={fsPx} lineHeightPx={lhPx} />
              </div>

              {/* Specs row */}
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                <SpecItem label="Font" value="Open Sans" />
                <SpecItem label="Weight" value={style.fontWeight} />
                <SpecItem label="Font Size" value={style.fontSize} />
                <SpecItem label="Line Height" value={style.lineHeight} />
                <SpecItem label="Letter Spacing" value="normal" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const Default: Story = {
  name: "Type scale",
  render: () => <FoundationTypographyPage />,
}
