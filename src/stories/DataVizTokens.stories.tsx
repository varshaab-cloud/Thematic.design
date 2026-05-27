import type { Meta, StoryObj } from "@storybook/react"
import React from "react"

const meta: Meta = {
  title: "Thematic design system/Foundation/Data Visualisation",
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen", docs: { page: null } },
}

export default meta
type Story = StoryObj

// ─── Shared styles ───────────────────────────────────────────────────────────

const PAGE: React.CSSProperties = {
  background: '#fff', padding: '48px 56px',
  maxWidth: 1100, margin: '0 auto',
  fontFamily: "'Open Sans', system-ui, sans-serif",
}
const BREADCRUMB: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
  textTransform: 'uppercase', color: '#999', marginBottom: 8,
}
const PAGE_TITLE: React.CSSProperties = {
  fontSize: 40, fontWeight: 700, color: '#0a0a0a',
  margin: '0 0 12px', lineHeight: 1.1,
}
const PAGE_SUB: React.CSSProperties = {
  fontSize: 15, color: '#666', lineHeight: 1.6,
  maxWidth: 560, marginBottom: 48, marginTop: 0,
}
const SECTION_TITLE: React.CSSProperties = {
  fontSize: 20, fontWeight: 700, color: '#111', margin: '0 0 6px',
}
const SECTION_DESC: React.CSSProperties = {
  fontSize: 13, color: '#666', margin: '0 0 20px', lineHeight: 1.6,
}
const DIVIDER: React.CSSProperties = {
  height: 1, background: '#f0f0f0', margin: '40px 0', border: 'none',
}
const TH: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, letterSpacing: '0.04em',
  textTransform: 'uppercase', color: '#999', textAlign: 'left',
  padding: '8px 12px', borderBottom: '1px solid #eee',
}
const TD: React.CSSProperties = {
  padding: '10px 12px', fontSize: 13, color: '#1a1a1a',
  borderBottom: '1px solid #f5f5f5',
}

// ─── Token data (values match tokens.css) ────────────────────────────────────

const CATEGORICAL = [
  { token: '--data-viz-cat-1', hex: '#1c21dc', label: 'Blue',   name: 'cat-1' },
  { token: '--data-viz-cat-2', hex: '#0d9488', label: 'Teal',   name: 'cat-2' },
  { token: '--data-viz-cat-3', hex: '#db2777', label: 'Rose',   name: 'cat-3' },
  { token: '--data-viz-cat-4', hex: '#f59e0b', label: 'Amber',  name: 'cat-4' },
  { token: '--data-viz-cat-5', hex: '#06b6d4', label: 'Cyan',   name: 'cat-5' },
  { token: '--data-viz-cat-6', hex: '#8b5cf6', label: 'Violet', name: 'cat-6' },
  { token: '--data-viz-cat-7', hex: '#65a30d', label: 'Lime',   name: 'cat-7' },
  { token: '--data-viz-cat-8', hex: '#475569', label: 'Slate',  name: 'cat-8' },
]

const SEQUENTIAL = [
  { token: '--data-viz-seq-1', hex: '#c4c5f4', name: 'seq-1' },
  { token: '--data-viz-seq-2', hex: '#9194eb', name: 'seq-2' },
  { token: '--data-viz-seq-3', hex: '#6e71e6', name: 'seq-3' },
  { token: '--data-viz-seq-4', hex: '#1c21dc', name: 'seq-4' },
  { token: '--data-viz-seq-5', hex: '#171cbe', name: 'seq-5' },
  { token: '--data-viz-seq-6', hex: '#111487', name: 'seq-6' },
]

const DIVERGING = [
  { token: '--data-viz-div-neg-strong', hex: '#dc2626', name: 'neg-strong' },
  { token: '--data-viz-div-neg-mid',    hex: '#fca5a5', name: 'neg-mid'    },
  { token: '--data-viz-div-neutral',    hex: '#e2e8f0', name: 'neutral'    },
  { token: '--data-viz-div-pos-mid',    hex: '#5eead4', name: 'pos-mid'    },
  { token: '--data-viz-div-pos-strong', hex: '#0d9488', name: 'pos-strong' },
]

const STRUCTURAL = [
  { token: '--data-viz-axis-colour',        hex: '#d5d5d5', value: '#d5d5d5', usage: 'Axis lines',                              isColor: true  },
  { token: '--data-viz-grid-colour',        hex: '#eeeeec', value: '#eeeeec', usage: 'Grid lines',                              isColor: true  },
  { token: '--data-viz-label-colour',       hex: '#6d6d6d', value: '#6d6d6d', usage: 'Axis labels and tick marks',              isColor: true  },
  { token: '--data-viz-label-font-size',    hex: '',        value: '0.75rem', usage: 'Axis label font size',                    isColor: false },
  { token: '--data-viz-label-font-weight',  hex: '',        value: '400',     usage: 'Axis label font weight',                  isColor: false },
  { token: '--data-viz-tooltip-background', hex: '#222222', value: '#222222', usage: 'Tooltip fill',                            isColor: true  },
  { token: '--data-viz-tooltip-text',       hex: '#ffffff', value: '#ffffff', usage: 'Tooltip text',                            isColor: true  },
  { token: '--data-viz-focus-ring',         hex: '#1c21dc', value: '#1c21dc', usage: 'Highlighted bar / point on focus/hover',  isColor: true  },
]

const USAGE_RULES = [
  {
    heading: 'Always assign categorical colours in order',
    body: 'Use cat-1 for the first series, cat-2 for the second, and so on. Never skip positions or reorder to match brand preferences — the sequence is designed so adjacent colours remain distinguishable.',
  },
  {
    heading: 'Never use feedback colours inside charts',
    body: 'Do not use --alias-color-feedback-success-fg, --alias-color-feedback-error-fg or similar tokens for charted data. Those tokens carry semantic meaning (success, error, warning) and will be misread as status indicators rather than data values.',
  },
  {
    heading: 'Pair colour with a secondary differentiator',
    body: 'Every colour in a chart must also differ by line dash pattern, fill texture, or data-point shape. This meets WCAG 1.4.1 (use of colour) and keeps charts legible in print and for users with colour-vision differences.',
  },
  {
    heading: 'Tooltips always use the structural tokens',
    body: '--data-viz-tooltip-background (#222222) with --data-viz-tooltip-text (#ffffff) meets 4.5:1 contrast for small text and remains readable across all chart background colours.',
  },
]

// ─── Swatch strip ─────────────────────────────────────────────────────────────

function SwatchStrip({ swatches }: { swatches: { token: string; hex: string; name: string; label?: string }[] }) {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {swatches.map((s) => {
        const isLight = isLightColor(s.hex)
        return (
          <div key={s.token} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{
              width: 80, height: 64, borderRadius: 8,
              background: s.hex,
              border: isLight ? '1px solid #e5e5e5' : 'none',
              display: 'flex', alignItems: 'flex-end', padding: '6px 8px',
              boxSizing: 'border-box',
            }}>
              {s.label && (
                <span style={{
                  fontSize: 10, fontWeight: 600,
                  color: isLight ? '#555' : '#ffffff',
                  opacity: 0.85,
                }}>{s.label}</span>
              )}
            </div>
            <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#888' }}>{s.name}</span>
            <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#bbb' }}>{s.hex}</span>
          </div>
        )
      })}
    </div>
  )
}

function isLightColor(hex: string): boolean {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 160
}

// ─── Main page ────────────────────────────────────────────────────────────────

function DataVizTokensPage() {
  return (
    <div style={PAGE}>
      <div style={BREADCRUMB}>Foundation</div>
      <h1 style={PAGE_TITLE}>Data Visualisation</h1>
      <p style={PAGE_SUB}>
        Three colour palettes for every chart type, plus structural tokens for axes, labels, and tooltips.
        All data visualisation work should exclusively use <code style={{ fontFamily: 'monospace', fontSize: 13, background: '#f5f5f5', padding: '1px 5px', borderRadius: 3 }}>--data-viz-*</code> tokens — never feedback or brand colours.
      </p>

      {/* Categorical */}
      <h2 style={SECTION_TITLE}>Categorical palette</h2>
      <p style={SECTION_DESC}>
        Eight perceptually distinct colours for multi-series charts — bar, line, pie. Assign in order starting at cat-1.
      </p>
      <SwatchStrip swatches={CATEGORICAL} />

      <hr style={DIVIDER} />

      {/* Sequential */}
      <h2 style={SECTION_TITLE}>Sequential ramp</h2>
      <p style={SECTION_DESC}>
        Single-hue ramp from light to dark. Use for heatmaps and choropleth maps where intensity represents magnitude.
      </p>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {SEQUENTIAL.map((s) => (
          <div key={s.token} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{
              height: 48, borderRadius: 6, background: s.hex,
              border: isLightColor(s.hex) ? '1px solid #e5e5e5' : 'none',
            }} />
            <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#888', textAlign: 'center' }}>{s.name}</span>
            <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#bbb', textAlign: 'center' }}>{s.hex}</span>
          </div>
        ))}
      </div>

      <hr style={DIVIDER} />

      {/* Diverging */}
      <h2 style={SECTION_TITLE}>Diverging scale</h2>
      <p style={SECTION_DESC}>
        Use when data has a meaningful midpoint — growth vs decline, sentiment, above/below target.
      </p>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {DIVERGING.map((s) => (
          <div key={s.token} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{
              height: 48, borderRadius: 6, background: s.hex,
              border: isLightColor(s.hex) ? '1px solid #e5e5e5' : 'none',
            }} />
            <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#888', textAlign: 'center' }}>{s.name}</span>
            <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#bbb', textAlign: 'center' }}>{s.hex}</span>
          </div>
        ))}
      </div>

      <hr style={DIVIDER} />

      {/* Structural tokens */}
      <h2 style={SECTION_TITLE}>Structural tokens</h2>
      <p style={SECTION_DESC}>
        Tokens for non-data elements: axes, grids, labels, and tooltips. These are fixed and do not change with brand.
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={TH}>Token</th>
            <th style={TH}>Value</th>
            <th style={TH}>Usage</th>
          </tr>
        </thead>
        <tbody>
          {STRUCTURAL.map((row) => (
            <tr key={row.token}>
              <td style={{ ...TD, fontFamily: 'monospace', color: '#555', fontSize: 12 }}>{row.token}</td>
              <td style={TD}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {row.isColor && (
                    <div style={{
                      width: 20, height: 20, borderRadius: 4, background: row.hex, flexShrink: 0,
                      border: isLightColor(row.hex) ? '1px solid #e5e5e5' : '1px solid rgba(0,0,0,0.07)',
                    }} />
                  )}
                  <span style={{ fontFamily: 'monospace', fontSize: 12 }}>{row.value}</span>
                </div>
              </td>
              <td style={{ ...TD, color: '#666' }}>{row.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr style={DIVIDER} />

      {/* Usage rules */}
      <h2 style={SECTION_TITLE}>Usage rules</h2>
      <p style={SECTION_DESC}>
        Four rules that keep charts consistent, accessible, and semantically correct.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {USAGE_RULES.map(({ heading, body }) => (
          <div key={heading} style={{
            padding: '14px 18px', borderRadius: 8,
            border: '1px solid #eeeeee', background: '#fafafa',
          }}>
            <p style={{ fontSize: 13, fontWeight: 600, margin: '0 0 4px', color: '#111' }}>{heading}</p>
            <p style={{ fontSize: 13, color: '#555', margin: 0, lineHeight: 1.6 }}>{body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Default: Story = {
  name: "Data Visualisation",
  render: () => <DataVizTokensPage />,
}
