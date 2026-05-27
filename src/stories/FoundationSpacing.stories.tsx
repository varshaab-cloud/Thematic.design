import type { Meta, StoryObj } from "@storybook/react"
import React from "react"

const meta: Meta = {
  title: "Foundation/Spacing",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { page: null },
  },
}

export default meta
type Story = StoryObj

// ─── Spacing data ─────────────────────────────────────────────────────────────

const baseSpacingTokens = [
  { name: "--base-spacing-1", value: "0.25rem", px: 4 },
  { name: "--base-spacing-2", value: "0.5rem", px: 8 },
  { name: "--base-spacing-3", value: "0.75rem", px: 12 },
  { name: "--base-spacing-4", value: "1rem", px: 16 },
  { name: "--base-spacing-5", value: "1.5rem", px: 24 },
  { name: "--base-spacing-6", value: "2rem", px: 32 },
  { name: "--base-spacing-7", value: "2.5rem", px: 40 },
  { name: "--base-spacing-8", value: "3rem", px: 48 },
  { name: "--base-spacing-9", value: "4rem", px: 64 },
  { name: "--base-spacing-10", value: "5rem", px: 80 },
]

const aliasSpacingTokens = [
  { name: "--alias-spacing-inline-xs", value: "0.25rem", description: "Tight inline spacing" },
  { name: "--alias-spacing-inline-sm", value: "0.5rem", description: "Small inline spacing" },
  { name: "--alias-spacing-inline-md", value: "0.75rem", description: "Medium inline spacing" },
  { name: "--alias-spacing-stack-xs", value: "0.5rem", description: "Tight stack spacing" },
  { name: "--alias-spacing-stack-sm", value: "0.75rem", description: "Small stack spacing" },
  { name: "--alias-spacing-stack-md", value: "1rem", description: "Default stack spacing" },
  { name: "--alias-spacing-stack-lg", value: "1.5rem", description: "Large stack spacing" },
  { name: "--alias-spacing-padding-xs", value: "0.5rem", description: "XS component padding" },
  { name: "--alias-spacing-padding-sm", value: "0.75rem", description: "SM component padding" },
  { name: "--alias-spacing-padding-md", value: "1rem", description: "MD component padding" },
  { name: "--alias-spacing-padding-lg", value: "1.5rem", description: "LG component padding" },
  { name: "--alias-spacing-section-md", value: "2rem", description: "Section spacing" },
  { name: "--alias-spacing-section-lg", value: "3rem", description: "Large section spacing" },
  { name: "--alias-spacing-page-md", value: "4rem", description: "Page level spacing" },
  { name: "--alias-spacing-page-lg", value: "5rem", description: "Hero/layout spacing" },
]

const MAX_BAR_WIDTH = 320

// ─── Page component ───────────────────────────────────────────────────────────

function FoundationSpacingPage() {
  const maxPx = Math.max(...baseSpacingTokens.map((t) => t.px))

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
        Foundation · Spacing
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
        The spacing scale
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
        A 4px base grid yields 10 steps from 4px to 80px. Alias tokens then map these
        steps to named roles — inline gaps, stack gaps, component padding, and page-level sections.
      </p>

      {/* Base spacing scale */}
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#aaa",
          marginBottom: 20,
        }}
      >
        Base scale
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {baseSpacingTokens.map((token, i) => {
          const barWidth = (token.px / maxPx) * MAX_BAR_WIDTH

          return (
            <div
              key={token.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                padding: "12px 0",
                borderTop: i === 0 ? "1px solid #eee" : "none",
                borderBottom: "1px solid #eee",
              }}
            >
              {/* Token name + value */}
              <div style={{ width: 220, flexShrink: 0 }}>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 13,
                    color: "#222",
                    display: "block",
                    marginBottom: 2,
                  }}
                >
                  {token.name}
                </span>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 11,
                    color: "#888",
                  }}
                >
                  {token.value}
                </span>
              </div>

              {/* Bar */}
              <div
                style={{
                  width: barWidth,
                  height: 20,
                  background: "#1c21dc",
                  borderRadius: 3,
                  flexShrink: 0,
                  minWidth: 4,
                }}
              />

              {/* px label */}
              <span
                style={{
                  fontSize: 12,
                  color: "#888",
                  fontFamily: "monospace",
                  whiteSpace: "nowrap",
                }}
              >
                {token.px}px
              </span>
            </div>
          )
        })}
      </div>

      {/* Alias spacing tokens */}
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#aaa",
          marginTop: 48,
          marginBottom: 20,
        }}
      >
        Alias tokens
      </div>

      {/* Column headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "280px 100px 1fr",
          padding: "0 0 8px",
          borderBottom: "1px solid #eee",
          gap: 16,
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#aaa" }}>Token</span>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#aaa" }}>Value</span>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#aaa" }}>Role</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {aliasSpacingTokens.map((token, i) => (
          <div
            key={token.name}
            style={{
              display: "grid",
              gridTemplateColumns: "280px 100px 1fr",
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
            <span style={{ fontSize: 13, color: "#555" }}>
              {token.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Default: Story = {
  name: "Spacing scale",
  render: () => <FoundationSpacingPage />,
}
