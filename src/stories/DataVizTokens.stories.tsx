import type { Meta, StoryObj } from "@storybook/react"
import React from "react"

const meta: Meta = {
  title: "Thematic design system/Foundation/Data Visualisation",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { page: null },
  },
}

export default meta
type Story = StoryObj

// ─── Token data ─────────────────────────────────────────────────────────────

const categoricalSwatches = [
  { token: "--data-viz-cat-1", value: "#1c21dc", label: "cat-1" },
  { token: "--data-viz-cat-2", value: "#16a34a", label: "cat-2" },
  { token: "--data-viz-cat-3", value: "#ff4e2a", label: "cat-3" },
  { token: "--data-viz-cat-4", value: "#9194eb", label: "cat-4" },
  { token: "--data-viz-cat-5", value: "#f7d307", label: "cat-5" },
  { token: "--data-viz-cat-6", value: "#0369a1", label: "cat-6" },
  { token: "--data-viz-cat-7", value: "#464646", label: "cat-7" },
  { token: "--data-viz-cat-8", value: "#86efac", label: "cat-8" },
]

const sequentialSwatches = [
  { token: "--data-viz-seq-1", value: "#c4c5f4", label: "seq-1" },
  { token: "--data-viz-seq-2", value: "#9194eb", label: "seq-2" },
  { token: "--data-viz-seq-3", value: "#6e71e6", label: "seq-3" },
  { token: "--data-viz-seq-4", value: "#1c21dc", label: "seq-4" },
  { token: "--data-viz-seq-5", value: "#1518a6", label: "seq-5" },
  { token: "--data-viz-seq-6", value: "#111487", label: "seq-6" },
]

const divergingSwatches = [
  { token: "--data-viz-div-neg-strong", value: "#d21a26", label: "neg-strong" },
  { token: "--data-viz-div-neg-mid", value: "#ff999c", label: "neg-mid" },
  { token: "--data-viz-div-neutral", value: "#e3e3e0", label: "neutral" },
  { token: "--data-viz-div-pos-mid", value: "#86efac", label: "pos-mid" },
  { token: "--data-viz-div-pos-strong", value: "#16a34a", label: "pos-strong" },
]

const structuralRows = [
  { token: "--data-viz-axis-color", value: "#d5d5d5", usage: "Axis lines", swatch: true },
  { token: "--data-viz-grid-color", value: "#eeeeec", usage: "Grid lines", swatch: true },
  { token: "--data-viz-label-color", value: "#6d6d6d", usage: "Axis labels and tick marks", swatch: true },
  { token: "--data-viz-label-font-size", value: "0.75rem", usage: "Axis label size", swatch: false },
  { token: "--data-viz-tooltip-background", value: "#222222", usage: "Tooltip background", swatch: true },
  { token: "--data-viz-tooltip-text", value: "#ffffff", usage: "Tooltip text", swatch: true },
  { token: "--data-viz-focus-ring", value: "#1c21dc", usage: "Highlighted bar/point on hover or keyboard focus", swatch: true },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

const SectionLabel: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <p style={{
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "var(--muted-foreground)",
    margin: "2rem 0 0.75rem",
    ...style,
  }}>{children}</p>
)

const thStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: "var(--muted-foreground)",
  textAlign: "left",
  padding: "8px 10px",
}

const tdStyle: React.CSSProperties = {
  padding: "8px 10px",
  color: "hsl(var(--foreground))",
}

interface SwatchRowProps {
  swatches: { token: string; value: string; label: string }[]
  caption: string
}

const SwatchRow: React.FC<SwatchRowProps> = ({ swatches, caption }) => (
  <div>
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {swatches.map(({ token, value, label }) => (
        <div key={token} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              background: value,
              border: "1px solid rgba(0,0,0,0.08)",
              flexShrink: 0,
            }}
            title={value}
          />
          <span style={{ fontSize: 10, color: "var(--muted-foreground)", fontFamily: "monospace", textAlign: "center" }}>
            {token}
          </span>
          <span style={{ fontSize: 10, color: "var(--muted-foreground)", fontFamily: "monospace" }}>{value}</span>
        </div>
      ))}
    </div>
    <p style={{ fontSize: 12, color: "var(--muted-foreground)", margin: "0.75rem 0 0", lineHeight: 1.6 }}>{caption}</p>
  </div>
)

// ─── Main component ──────────────────────────────────────────────────────────

function DataVizTokensPage() {
  return (
    <div style={{ padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 0.5rem" }}>Data Visualisation Tokens</h1>
        <p style={{ fontSize: 14, color: "var(--muted-foreground)", margin: 0 }}>
          Tokens for charts, graphs, and data-dense surfaces. Three palettes cover every chart type:{" "}
          <strong>categorical</strong> for multi-series comparisons,{" "}
          <strong>sequential</strong> for magnitude, and{" "}
          <strong>diverging</strong> for values around a midpoint.
          Structural tokens cover axes, grids, labels, and tooltips.
        </p>
      </div>

      {/* 1. Categorical palette */}
      <SectionLabel style={{ marginTop: 0 }}>Categorical palette</SectionLabel>
      <SwatchRow
        swatches={categoricalSwatches}
        caption="Use for distinct data series in bar charts, line charts, and pie charts. Assign colours in order — cat-1 for the first series, cat-2 for the second."
      />

      {/* 2. Sequential ramp */}
      <SectionLabel>Sequential ramp</SectionLabel>
      <SwatchRow
        swatches={sequentialSwatches}
        caption="Use for single-variable heatmaps and choropleth maps where intensity represents magnitude."
      />

      {/* 3. Diverging scale */}
      <SectionLabel>Diverging scale</SectionLabel>
      <SwatchRow
        swatches={divergingSwatches}
        caption="Use when data has a meaningful midpoint — growth vs decline, sentiment, above/below target."
      />

      {/* 4. Chart structural tokens */}
      <SectionLabel>Chart structural tokens</SectionLabel>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr style={{ borderBottom: "0.5px solid hsl(var(--border))" }}>
            <th style={thStyle}>Token</th>
            <th style={thStyle}>Value</th>
            <th style={thStyle}>Usage</th>
          </tr>
        </thead>
        <tbody>
          {structuralRows.map((row) => (
            <tr key={row.token} style={{ borderBottom: "0.5px solid hsl(var(--border))" }}>
              <td style={{ ...tdStyle, fontFamily: "monospace", color: "var(--muted-foreground)" }}>{row.token}</td>
              <td style={{ ...tdStyle }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {row.swatch && (
                    <span style={{
                      display: "inline-block",
                      width: 16,
                      height: 16,
                      borderRadius: 3,
                      background: row.value,
                      border: "1px solid rgba(0,0,0,0.08)",
                      flexShrink: 0,
                    }} />
                  )}
                  <span style={{ fontFamily: "monospace" }}>{row.value}</span>
                </div>
              </td>
              <td style={{ ...tdStyle, color: "var(--muted-foreground)" }}>{row.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 5. Usage rules */}
      <SectionLabel>Usage rules</SectionLabel>
      <div style={{ fontSize: 14, lineHeight: 1.7, color: "hsl(var(--foreground))", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <p style={{ margin: 0 }}>
          Always apply the categorical palette in order, starting from <code style={{ fontSize: 12 }}>--data-viz-cat-1</code> for the first data series and proceeding sequentially. Never skip positions or reorder colours to match brand preferences — the sequence is designed so adjacent colours remain distinguishable, and breaking the order degrades that property.
        </p>
        <p style={{ margin: 0 }}>
          Do not use alias feedback colours (<code style={{ fontSize: 12 }}>--alias-color-feedback-success-fg</code>, <code style={{ fontSize: 12 }}>--alias-color-feedback-error-fg</code>, and related tokens) inside charts. Those tokens carry semantic meaning — success, error, warning — and will be misread as status indicators rather than data values. Use only the <code style={{ fontSize: 12 }}>--data-viz-*</code> palette for charted data.
        </p>
        <p style={{ margin: 0 }}>
          Ensure every colour in a chart can be distinguished without relying on colour alone. Pair colour with a secondary differentiator such as line dash pattern, fill texture, or data point shape. This is required to meet WCAG 1.4.1 (use of colour) and to remain legible in monochrome print or for users with colour-vision deficiencies.
        </p>
        <p style={{ margin: 0 }}>
          Tooltips must always use <code style={{ fontSize: 12 }}>--data-viz-tooltip-background</code> (<code style={{ fontSize: 12 }}>#222222</code>) with <code style={{ fontSize: 12 }}>--data-viz-tooltip-text</code> (<code style={{ fontSize: 12 }}>#ffffff</code>). This dark-on-white pairing meets the 4.5:1 contrast ratio required for small text and ensures tooltips remain readable across all chart background colours.
        </p>
      </div>
    </div>
  )
}

export const Default: Story = {
  name: "Data Visualisation Tokens",
  render: () => <DataVizTokensPage />,
}
