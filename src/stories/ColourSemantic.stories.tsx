import type { Meta, StoryObj } from "@storybook/react"
import React from "react"

const meta: Meta = {
  title: "Foundation/Colours/Semantic",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { page: null },
  },
}

export default meta
type Story = StoryObj

// ─── Base tokens lookup ───────────────────────────────────────────────────────

const baseTokens: Record<string, string> = {
  "--base-color-black": "#000000",
  "--base-color-white": "#ffffff",
  "--base-color-gray-75": "#f5f5f3",
  "--base-color-gray-100": "#eeeeec",
  "--base-color-gray-200": "#e3e3e0",
  "--base-color-gray-300": "#d5d5d5",
  "--base-color-gray-400": "#b1b1b1",
  "--base-color-gray-500": "#909090",
  "--base-color-gray-600": "#6d6d6d",
  "--base-color-gray-700": "#464646",
  "--base-color-gray-900": "#222222",
  "--base-color-blue-100": "#c4c5f4",
  "--base-color-blue-200": "#aaacf0",
  "--base-color-blue-300": "#9194eb",
  "--base-color-blue-400": "#6e71e6",
  "--base-color-blue-600": "#1c21dc",
  "--base-color-blue-700": "#171cbe",
  "--base-color-blue-800": "#1518a6",
  "--base-color-blue-900": "#111487",
  "--base-color-red-100": "#ffe2e2",
  "--base-color-red-200": "#ffb9bb",
  "--base-color-red-300": "#ff999c",
  "--base-color-red-400": "#f55658",
  "--base-color-red-600": "#d21a26",
  "--base-color-red-700": "#ab121b",
  "--base-color-red-800": "#81070d",
  "--base-color-red-900": "#640204",
  "--base-color-green-100": "#dcfce7",
  "--base-color-green-200": "#bbf7d0",
  "--base-color-green-300": "#86efac",
  "--base-color-green-400": "#4ade80",
  "--base-color-green-600": "#16a34a",
  "--base-color-green-700": "#15803d",
  "--base-color-green-800": "#166534",
  "--base-color-green-900": "#14532d",
  "--base-color-success-800": "#dcfce7",
  "--base-color-success-900": "#16a34a",
  "--base-color-info-600": "#e0f2fe",
  "--base-color-info-700": "#0369a1",
  "--base-color-error-200": "#ffe9e5",
  "--base-color-error-300": "#ff4e2a",
  "--base-color-warning-50": "#fffade",
  "--base-color-warning-100": "#f7d307",
}

function resolveToken(value: string): { resolved: string; baseRef: string | null } {
  const varMatch = value.match(/^var\((--[^)]+)\)$/)
  if (varMatch) {
    const varName = varMatch[1]
    const resolved = baseTokens[varName] || value
    return { resolved, baseRef: varName }
  }
  return { resolved: value, baseRef: null }
}

// ─── Alias colour tokens ──────────────────────────────────────────────────────

type TokenRow = {
  name: string
  rawValue: string
  resolved: string
  baseRef: string | null
}

function makeRow(name: string, rawValue: string): TokenRow {
  const { resolved, baseRef } = resolveToken(rawValue)
  return { name, rawValue, resolved, baseRef }
}

const tokenGroups: { label: string; category: string; tokens: TokenRow[] }[] = [
  {
    label: "Text",
    category: "text",
    tokens: [
      makeRow("--alias-color-text-primary", "#000000"),
      makeRow("--alias-color-text-secondary", "#222222"),
      makeRow("--alias-color-text-tertiary", "#464646"),
      makeRow("--alias-color-text-subtle", "var(--base-color-gray-600)"),
      makeRow("--alias-color-text-disabled", "#909090"),
      makeRow("--alias-color-text-inverse", "#ffffff"),
      makeRow("--alias-color-text-brand", "#111487"),
    ],
  },
  {
    label: "Background",
    category: "background",
    tokens: [
      makeRow("--alias-color-background-primary", "#ffffff"),
      makeRow("--alias-color-background-secondary", "#f5f5f3"),
      makeRow("--alias-color-background-tertiary", "#eeeeec"),
      makeRow("--alias-color-background-brand", "#1518a6"),
      makeRow("--alias-color-background-brand-dark", "#111487"),
      makeRow("--alias-color-background-hover", "var(--base-color-blue-100)"),
    ],
  },
  {
    label: "Border",
    category: "border",
    tokens: [
      makeRow("--alias-color-border-default", "#d5d5d5"),
      makeRow("--alias-color-border-active", "#1c21dc"),
      makeRow("--alias-color-border-disabled", "#b1b1b1"),
      makeRow("--alias-color-border-brand", "var(--base-color-blue-800)"),
      makeRow("--alias-color-border-success", "#16a34a"),
      makeRow("--alias-color-border-info", "#0369a1"),
      makeRow("--alias-color-border-error", "var(--base-color-error-300)"),
      makeRow("--alias-color-border-warning", "#f7d307"),
    ],
  },
  {
    label: "Icon",
    category: "icon",
    tokens: [
      makeRow("--alias-color-icon-primary", "#222222"),
      makeRow("--alias-color-icon-secondary", "#464646"),
      makeRow("--alias-color-icon-disabled", "#b1b1b1"),
      makeRow("--alias-color-icon-brand", "#171cbe"),
    ],
  },
  {
    label: "Feedback",
    category: "feedback",
    tokens: [
      makeRow("--alias-color-feedback-success-fg", "#166534"),
      makeRow("--alias-color-feedback-success-bg", "#dcfce7"),
      makeRow("--alias-color-feedback-info-fg", "#0369a1"),
      makeRow("--alias-color-feedback-info-bg", "#e0f2fe"),
      makeRow("--alias-color-feedback-error-fg", "var(--base-color-red-700)"),
      makeRow("--alias-color-feedback-error-bg", "#ffe9e5"),
      makeRow("--alias-color-feedback-warning-fg", "var(--base-color-gray-900)"),
      makeRow("--alias-color-feedback-warning-bg", "#fffade"),
    ],
  },
]

// ─── Page component ───────────────────────────────────────────────────────────

function ColourSemanticPage() {
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
        Colours · Semantic
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
        Meaning-bearing tokens
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
        Semantic tokens bind raw base shades to roles like "primary text" or "error border". Use
        these in product code — never reference base colour tokens directly.
      </p>

      {/* Column headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 120px",
          padding: "0 0 8px",
          borderBottom: "1px solid #eee",
          marginBottom: 0,
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#aaa" }}>
          Token
        </span>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#aaa", textAlign: "right" }}>
          Value
        </span>
      </div>

      {/* Token groups */}
      {tokenGroups.map((group, gi) => (
        <div key={group.label} style={{ marginTop: gi === 0 ? 0 : 0 }}>
          {/* Group label row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "18px 0 10px",
              borderBottom: "1px solid #eee",
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>
              {group.label}
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#1c21dc",
                background: "#eef0fd",
                borderRadius: 10,
                padding: "1px 7px",
                lineHeight: 1.6,
              }}
            >
              {group.tokens.length}
            </span>
          </div>

          {/* Token rows */}
          {group.tokens.map((token) => (
            <div
              key={token.name}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 120px",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              {/* Left: swatch + name + base ref */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 4,
                    background: token.resolved,
                    border: "1px solid rgba(0,0,0,0.08)",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 13,
                      color: "#222",
                      display: "block",
                    }}
                  >
                    {token.name}
                  </span>
                  {token.baseRef && (
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: 12,
                        color: "#888",
                        display: "block",
                        marginTop: 2,
                      }}
                    >
                      → {token.baseRef}
                    </span>
                  )}
                </div>
              </div>

              {/* Right: hex value */}
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  color: "#888",
                  textAlign: "right",
                }}
              >
                {token.resolved}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export const Default: Story = {
  name: "Semantic tokens",
  render: () => <ColourSemanticPage />,
}
