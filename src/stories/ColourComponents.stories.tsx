import type { Meta, StoryObj } from "@storybook/react"
import React from "react"

const meta: Meta = {
  title: "Foundation/Colours/Components",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { page: null },
  },
}

export default meta
type Story = StoryObj

// ─── Helpers ──────────────────────────────────────────────────────────────────

const baseTokens: Record<string, string> = {
  "--base-radius-md": "6px",
  "--base-radius-xxl": "14px",
}

function resolveValue(value: string): string {
  const varMatch = value.match(/^var\((--[^)]+)\)$/)
  if (varMatch) {
    const varName = varMatch[1]
    return baseTokens[varName] || value
  }
  return value
}

function isColorValue(value: string): boolean {
  const v = value.trim()
  if (v === "rgba(0, 0, 0, 0)" || v === "transparent") return false
  if (v.startsWith("#")) return true
  if (v.startsWith("rgb")) return true
  return false
}

// ─── Component token groups ───────────────────────────────────────────────────

type TokenEntry = {
  name: string
  rawValue: string
}

const componentGroups: { label: string; tokens: TokenEntry[] }[] = [
  {
    label: "Button",
    tokens: [
      { name: "--component-button-primary-background", rawValue: "#1518a6" },
      { name: "--component-button-primary-background-hover", rawValue: "#171cbe" },
      { name: "--component-button-primary-background-active", rawValue: "#111487" },
      { name: "--component-button-primary-background-disabled", rawValue: "#e3e3e0" },
      { name: "--component-button-primary-text", rawValue: "#ffffff" },
      { name: "--component-button-primary-text-disabled", rawValue: "#909090" },
      { name: "--component-button-primary-border", rawValue: "rgba(0, 0, 0, 0)" },
      { name: "--component-button-primary-border-radius", rawValue: "var(--base-radius-md)" },
      { name: "--component-button-primary-padding-x", rawValue: "1.5rem" },
      { name: "--component-button-primary-padding-y", rawValue: "0.75rem" },
      { name: "--component-button-primary-font-size", rawValue: "0.875rem" },
      { name: "--component-button-primary-font-weight", rawValue: "500" },
      { name: "--component-button-secondary-background", rawValue: "rgba(0, 0, 0, 0)" },
      { name: "--component-button-secondary-background-hover", rawValue: "#c4c5f4" },
      { name: "--component-button-secondary-background-active", rawValue: "#aaacf0" },
      { name: "--component-button-secondary-background-disabled", rawValue: "rgba(0, 0, 0, 0)" },
      { name: "--component-button-secondary-text", rawValue: "#111487" },
      { name: "--component-button-secondary-text-disabled", rawValue: "#909090" },
      { name: "--component-button-secondary-border", rawValue: "#1c21dc" },
      { name: "--component-button-secondary-border-radius", rawValue: "var(--base-radius-md)" },
      { name: "--component-button-secondary-padding-x", rawValue: "1.5rem" },
      { name: "--component-button-secondary-padding-y", rawValue: "0.75rem" },
      { name: "--component-button-secondary-font-size", rawValue: "0.875rem" },
      { name: "--component-button-secondary-font-weight", rawValue: "500" },
      { name: "--component-button-ghost-background", rawValue: "rgba(0, 0, 0, 0)" },
      { name: "--component-button-ghost-background-hover", rawValue: "#eeeeec" },
      { name: "--component-button-ghost-text", rawValue: "#111487" },
      { name: "--component-button-ghost-text-disabled", rawValue: "#909090" },
      { name: "--component-button-ghost-border", rawValue: "rgba(0, 0, 0, 0)" },
      { name: "--component-button-ghost-border-radius", rawValue: "var(--base-radius-md)" },
      { name: "--component-button-ghost-padding-x", rawValue: "1.5rem" },
      { name: "--component-button-ghost-padding-y", rawValue: "0.75rem" },
      { name: "--component-button-ghost-font-size", rawValue: "0.875rem" },
      { name: "--component-button-ghost-font-weight", rawValue: "500" },
      { name: "--component-button-destructive-background", rawValue: "#ff4e2a" },
      { name: "--component-button-destructive-background-hover", rawValue: "#d21a26" },
      { name: "--component-button-destructive-text", rawValue: "#ffffff" },
      { name: "--component-button-destructive-border", rawValue: "rgba(0, 0, 0, 0)" },
      { name: "--component-button-destructive-border-radius", rawValue: "var(--base-radius-md)" },
      { name: "--component-button-destructive-padding-x", rawValue: "1.5rem" },
      { name: "--component-button-destructive-padding-y", rawValue: "0.75rem" },
      { name: "--component-button-destructive-font-size", rawValue: "0.875rem" },
      { name: "--component-button-destructive-font-weight", rawValue: "500" },
    ],
  },
  {
    label: "Input",
    tokens: [
      { name: "--component-input-background", rawValue: "#ffffff" },
      { name: "--component-input-background-disabled", rawValue: "#eeeeec" },
      { name: "--component-input-border", rawValue: "#d5d5d5" },
      { name: "--component-input-border-focus", rawValue: "#1c21dc" },
      { name: "--component-input-border-error", rawValue: "#ff4e2a" },
      { name: "--component-input-border-disabled", rawValue: "#b1b1b1" },
      { name: "--component-input-text", rawValue: "#000000" },
      { name: "--component-input-text-placeholder", rawValue: "#909090" },
      { name: "--component-input-text-disabled", rawValue: "#909090" },
      { name: "--component-input-border-radius", rawValue: "var(--base-radius-md)" },
      { name: "--component-input-padding-x", rawValue: "1rem" },
      { name: "--component-input-padding-y", rawValue: "0.75rem" },
      { name: "--component-input-font-size", rawValue: "0.875rem" },
    ],
  },
  {
    label: "Card",
    tokens: [
      { name: "--component-card-background", rawValue: "#ffffff" },
      { name: "--component-card-border", rawValue: "#d5d5d5" },
      { name: "--component-card-border-radius", rawValue: "var(--base-radius-md)" },
      { name: "--component-card-shadow", rawValue: "0px 1px 3px 0px rgba(0,0,0,0.06), 0px 4px 16px 0px rgba(0,0,0,0.05)" },
      { name: "--component-card-padding", rawValue: "1.5rem" },
      { name: "--component-card-title-color", rawValue: "#000000" },
      { name: "--component-card-body-color", rawValue: "#222222" },
    ],
  },
  {
    label: "Badge",
    tokens: [
      { name: "--component-badge-success-background", rawValue: "#dcfce7" },
      { name: "--component-badge-success-text", rawValue: "#16a34a" },
      { name: "--component-badge-success-border-radius", rawValue: "var(--base-radius-xxl)" },
      { name: "--component-badge-info-background", rawValue: "#e0f2fe" },
      { name: "--component-badge-info-text", rawValue: "#0369a1" },
      { name: "--component-badge-info-border-radius", rawValue: "var(--base-radius-xxl)" },
      { name: "--component-badge-error-background", rawValue: "#ffe9e5" },
      { name: "--component-badge-error-text", rawValue: "#ff4e2a" },
      { name: "--component-badge-error-border-radius", rawValue: "var(--base-radius-xxl)" },
      { name: "--component-badge-warning-background", rawValue: "#fffade" },
      { name: "--component-badge-warning-text", rawValue: "#f7d307" },
      { name: "--component-badge-warning-border-radius", rawValue: "var(--base-radius-xxl)" },
    ],
  },
]

// ─── Page component ───────────────────────────────────────────────────────────

function ColourComponentsPage() {
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
        Colours · Components
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
        Slot-level overrides per component
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
        Component tokens narrow semantic colours down to specific visual slots — a button's
        background, an input's focus ring, a badge's text. Non-colour tokens (radius, padding,
        font-size) are shown with a dash instead of a swatch.
      </p>

      {/* Column headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 160px",
          padding: "0 0 8px",
          borderBottom: "1px solid #eee",
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#aaa" }}>
          Token
        </span>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#aaa", textAlign: "right" }}>
          Value
        </span>
      </div>

      {/* Groups */}
      {componentGroups.map((group, gi) => (
        <div key={group.label}>
          {/* Group label */}
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
          {group.tokens.map((token) => {
            const resolvedVal = resolveValue(token.rawValue)
            const hasColor = isColorValue(resolvedVal)

            return (
              <div
                key={token.name}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 160px",
                  alignItems: "center",
                  padding: "9px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                {/* Left: swatch / dash + name */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {hasColor ? (
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 4,
                        background: resolvedVal,
                        border: "1px solid rgba(0,0,0,0.08)",
                        flexShrink: 0,
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: "#ccc",
                        fontSize: 16,
                        fontWeight: 400,
                      }}
                    >
                      —
                    </div>
                  )}
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 13,
                      color: "#222",
                    }}
                  >
                    {token.name}
                  </span>
                </div>

                {/* Right: value */}
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 12,
                    color: "#888",
                    textAlign: "right",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={resolvedVal}
                >
                  {resolvedVal}
                </span>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export const Default: Story = {
  name: "Component tokens",
  render: () => <ColourComponentsPage />,
}
