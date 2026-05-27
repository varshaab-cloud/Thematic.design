import type { Meta, StoryObj } from "@storybook/react"
import React from "react"

const meta: Meta = {
  title: "Thematic design system/Foundation/Grid & Layout",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { page: null },
  },
}

export default meta
type Story = StoryObj

// ─── Shared styles ───────────────────────────────────────────────────────────

const PAGE: React.CSSProperties = {
  background: '#fff',
  padding: '48px 56px',
  maxWidth: 1100,
  margin: '0 auto',
  fontFamily: "'Open Sans', system-ui, sans-serif",
}
const BREADCRUMB: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#999',
  marginBottom: 8,
}
const PAGE_TITLE: React.CSSProperties = {
  fontSize: 40,
  fontWeight: 700,
  color: '#0a0a0a',
  margin: '0 0 12px',
  lineHeight: 1.1,
}
const PAGE_SUB: React.CSSProperties = {
  fontSize: 15,
  color: '#666',
  lineHeight: 1.6,
  maxWidth: 520,
  marginBottom: 48,
  marginTop: 0,
}
const SECTION_TITLE: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 700,
  color: '#111',
  margin: '0 0 6px',
}
const SECTION_DESC: React.CSSProperties = {
  fontSize: 13,
  color: '#666',
  margin: '0 0 20px',
  lineHeight: 1.6,
}
const DIVIDER: React.CSSProperties = {
  height: 1,
  background: '#f0f0f0',
  margin: '40px 0',
  border: 'none',
}
const TH: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: '#999',
  textAlign: 'left',
  padding: '8px 12px',
  borderBottom: '1px solid #eee',
}
const TD: React.CSSProperties = {
  padding: '10px 12px',
  fontSize: 13,
  color: '#1a1a1a',
  borderBottom: '1px solid #f5f5f5',
}

// ─── Token data ──────────────────────────────────────────────────────────────

const breakpoints = [
  { name: "xs",  px: 0,    label: "xs",  device: "Mobile (portrait)" },
  { name: "sm",  px: 640,  label: "sm",  device: "Large mobile" },
  { name: "md",  px: 768,  label: "md",  device: "Tablet" },
  { name: "lg",  px: 1024, label: "lg",  device: "Small desktop" },
  { name: "xl",  px: 1280, label: "xl",  device: "Desktop" },
  { name: "2xl", px: 1536, label: "2xl", device: "Wide screen" },
]

const containerWidths = [
  { name: "sm",   maxWidth: "640px",  desc: "Small — matches sm breakpoint" },
  { name: "md",   maxWidth: "768px",  desc: "Medium — matches md breakpoint" },
  { name: "lg",   maxWidth: "1024px", desc: "Large — matches lg breakpoint" },
  { name: "xl",   maxWidth: "1280px", desc: "XL — default content max-width" },
  { name: "2xl",  maxWidth: "1536px", desc: "2XL — wide content max-width" },
  { name: "full", maxWidth: "100%",   desc: "Full — edge-to-edge" },
]

const layoutSplits = [
  { label: "Full width",      columns: [12],       colors: ["#c4c5f4"] },
  { label: "Halves (6+6)",    columns: [6, 6],     colors: ["#9194eb", "#c4c5f4"] },
  { label: "Thirds (4+4+4)",  columns: [4, 4, 4],  colors: ["#6e71e6", "#9194eb", "#c4c5f4"] },
  { label: "Sidebar (3+9)",   columns: [3, 9],     colors: ["#6e71e6", "#c4c5f4"] },
  { label: "Quarter (4+8)",   columns: [4, 8],     colors: ["#9194eb", "#c4c5f4"] },
]

const layoutTokens = [
  { name: "--alias-spacing-section-md", value: "2rem",  usage: "Section spacing" },
  { name: "--alias-spacing-section-lg", value: "3rem",  usage: "Large section spacing" },
  { name: "--alias-spacing-page-md",    value: "4rem",  usage: "Page level spacing" },
  { name: "--alias-spacing-page-lg",    value: "5rem",  usage: "Hero / layout spacing" },
]

const usageRules = [
  {
    heading: "Default content width is 1280px (xl)",
    body: "Use container-xl as the standard page wrapper. Only go wider (container-2xl) for data-dense interfaces like dashboards or data tables that genuinely need the extra space.",
  },
  {
    heading: "12-column grid for all page layouts",
    body: "Never use arbitrary pixel widths for layout columns. Map every layout region to column spans — even a 2-column layout should sit on a 6+6 or 4+8 grid rather than two fixed-width divs.",
  },
  {
    heading: "Gutters: 24px desktop, 16px mobile",
    body: "Column gaps are 24px (1.5rem) at md and above, 16px (1rem) at xs/sm. Use CSS grid gap or Tailwind gap-4 / gap-6 respectively. Never pad individual columns to fake gutters.",
  },
  {
    heading: "Mobile-first, always",
    body: "Write base styles for the smallest viewport, then override at larger breakpoints with sm:, md:, lg:, xl:, 2xl: prefixes. Never design desktop-first and subtract styles for mobile — the cascade fights you.",
  },
]

// ─── Breakpoint ruler ────────────────────────────────────────────────────────

function BreakpointRuler() {
  const maxPx = 1536
  const trackWidth = 820

  return (
    <div style={{ overflowX: "auto", paddingBottom: "1rem" }}>
      <div style={{ position: "relative", height: 40, minWidth: trackWidth, marginBottom: 56 }}>
        {/* Background bar */}
        <div style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          height: 6,
          background: "#f0f0f0",
          borderRadius: 3,
        }} />

        {breakpoints.map((bp, i) => {
          const leftPx = (bp.px / maxPx) * trackWidth
          return (
            <div
              key={bp.name}
              style={{
                position: "absolute",
                left: leftPx,
                top: 0,
                transform: i === 0 ? "none" : "translateX(-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: i === 0 ? "flex-start" : "center",
              }}
            >
              <div style={{ width: 2, height: 40, background: "#1518a6", borderRadius: 1 }} />
              <div style={{ marginTop: 6, textAlign: i === 0 ? "left" : "center", minWidth: 60 }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#1518a6", lineHeight: 1 }}>
                  {bp.label}
                </p>
                <p style={{ margin: "2px 0 0", fontSize: 11, color: "#888" }}>
                  {bp.px === 0 ? "0px" : `${bp.px}px`}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={TH}>Name</th>
            <th style={TH}>Min-width</th>
            <th style={TH}>Tailwind prefix</th>
            <th style={TH}>Typical context</th>
          </tr>
        </thead>
        <tbody>
          {breakpoints.map((bp) => (
            <tr key={bp.name}>
              <td style={{ ...TD, fontWeight: 600 }}>{bp.label}</td>
              <td style={{ ...TD, fontFamily: "monospace" }}>{bp.px === 0 ? "0px (default)" : `${bp.px}px`}</td>
              <td style={{ ...TD, fontFamily: "monospace", color: "#666" }}>
                {bp.px === 0 ? "(base)" : `${bp.name}:`}
              </td>
              <td style={{ ...TD, color: "#666" }}>{bp.device}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── 12-column grid ──────────────────────────────────────────────────────────

function TwelveColumnGrid() {
  return (
    <div>
      {/* Column number labels */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 4, marginBottom: 8 }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} style={{ textAlign: "center", fontSize: 11, color: "#888", fontWeight: 600 }}>
            {i + 1}
          </div>
        ))}
      </div>

      {/* Full 12 columns */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 4, marginBottom: 24 }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            style={{
              height: 48,
              borderRadius: 4,
              background: "#c4c5f4",
              border: "1px solid #9194eb",
            }}
          />
        ))}
      </div>

      {/* Common layout splits */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {layoutSplits.map((split) => (
          <div key={split.label}>
            <p style={{ fontSize: 12, fontWeight: 600, margin: "0 0 5px", color: "#444" }}>
              {split.label}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 4 }}>
              {split.columns.map((span, idx) => (
                <div
                  key={idx}
                  style={{
                    gridColumn: `span ${span}`,
                    height: 36,
                    borderRadius: 4,
                    background: split.colors[idx] ?? "#c4c5f4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 600,
                    color: span <= 3 ? "#ffffff" : "#111487",
                  }}
                >
                  {span}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 12, color: "#888", marginTop: 12 }}>
        Gutter: 24px (1.5rem) on desktop · 16px (1rem) on mobile
      </p>
    </div>
  )
}

// ─── Container widths ────────────────────────────────────────────────────────

function ContainerWidths() {
  const visualMax = 860
  const widthColors = ["#f0f0ff", "#e3e3f8", "#c4c5f4", "#aaacf0", "#9194eb", "#6e71e6"]
  const textColors  = ["#1a1a1a", "#1a1a1a", "#111487", "#111487", "#ffffff", "#ffffff"]

  return (
    <div style={{ overflowX: "auto" }}>
      <div style={{ minWidth: visualMax, marginBottom: 24 }}>
        {containerWidths.slice().reverse().map((cw, i) => {
          const isFull = cw.name === "full"
          const widthPx = isFull ? visualMax : Math.round((parseInt(cw.maxWidth) / 1536) * visualMax)
          const colorIdx = containerWidths.length - 1 - i
          return (
            <div
              key={cw.name}
              style={{
                width: widthPx,
                margin: "0 auto 4px",
                background: widthColors[colorIdx] ?? "#c4c5f4",
                borderRadius: 6,
                padding: "10px 16px",
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid rgba(0,0,0,0.07)",
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 700, color: textColors[colorIdx] }}>
                container-{cw.name}
              </span>
              <span style={{ fontSize: 12, color: textColors[colorIdx], opacity: 0.8, fontFamily: "monospace" }}>
                {cw.maxWidth}
              </span>
            </div>
          )
        })}
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={TH}>Variant</th>
            <th style={TH}>Max-width</th>
            <th style={TH}>Description</th>
          </tr>
        </thead>
        <tbody>
          {containerWidths.map((cw) => (
            <tr key={cw.name}>
              <td style={{ ...TD, fontFamily: "monospace", fontWeight: 600 }}>container-{cw.name}</td>
              <td style={{ ...TD, fontFamily: "monospace" }}>{cw.maxWidth}</td>
              <td style={{ ...TD, color: "#666" }}>{cw.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Main page ───────────────────────────────────────────────────────────────

function GridLayoutPage() {
  return (
    <div style={PAGE}>
      <div style={BREADCRUMB}>Foundation</div>
      <h1 style={PAGE_TITLE}>Grid &amp; Layout</h1>
      <p style={PAGE_SUB}>
        Breakpoints, 12-column grid, container widths, and layout spacing tokens.
        All page layouts in Thematic follow the 12-column grid — never use ad-hoc pixel widths.
      </p>

      {/* Breakpoints */}
      <h2 style={SECTION_TITLE}>Breakpoints</h2>
      <p style={SECTION_DESC}>
        Six breakpoints cover the full device range. Design mobile-first: base styles apply at
        xs (0px and up), then progressive enhancements are added at each larger breakpoint.
      </p>
      <BreakpointRuler />

      <hr style={DIVIDER} />

      {/* 12-column grid */}
      <h2 style={SECTION_TITLE}>12-column grid</h2>
      <p style={SECTION_DESC}>
        All page and section layouts use a 12-column grid. Common splits are shown below. Columns
        are equal-width with 24px gutters on desktop and 16px on mobile.
      </p>
      <TwelveColumnGrid />

      <hr style={DIVIDER} />

      {/* Container widths */}
      <h2 style={SECTION_TITLE}>Max-width containers</h2>
      <p style={SECTION_DESC}>
        Named containers restrict content width at each breakpoint. Boxes below are scaled
        proportionally. The default content container is <code style={{ fontFamily: 'monospace', fontSize: 13, background: '#f5f5f5', padding: '1px 5px', borderRadius: 3 }}>container-xl</code> (1280px).
      </p>
      <ContainerWidths />

      <hr style={DIVIDER} />

      {/* Layout spacing tokens */}
      <h2 style={SECTION_TITLE}>Layout spacing tokens</h2>
      <p style={SECTION_DESC}>
        Use these alias tokens for vertical rhythm between sections and pages. Reference them via
        CSS custom properties — never hardcode pixel values in layout code.
      </p>

      <div style={{ marginBottom: 24 }}>
        {layoutTokens.map((t) => {
          const barWidthPx = parseFloat(t.value) * 16 * 1.5 // rem → px rough visual
          return (
            <div
              key={t.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "10px 0",
                borderBottom: "1px solid #f5f5f5",
              }}
            >
              <div style={{ width: 260, flexShrink: 0 }}>
                <p style={{ margin: "0 0 2px", fontSize: 12, fontFamily: "monospace", color: "#555" }}>
                  {t.name}
                </p>
                <p style={{ margin: 0, fontSize: 11, color: "#888" }}>{t.usage}</p>
              </div>
              <div
                style={{
                  height: 20,
                  width: barWidthPx,
                  background: "#e0e1fc",
                  borderRadius: 3,
                  flexShrink: 0,
                  minWidth: 16,
                  border: "1px solid #c1c3f9",
                }}
              />
              <span style={{ fontSize: 12, color: "#555", fontFamily: "monospace" }}>
                {t.value}
              </span>
            </div>
          )
        })}
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 40 }}>
        <thead>
          <tr>
            <th style={TH}>Token</th>
            <th style={TH}>Value</th>
            <th style={TH}>Usage</th>
          </tr>
        </thead>
        <tbody>
          {layoutTokens.map((t) => (
            <tr key={t.name}>
              <td style={{ ...TD, fontFamily: "monospace", color: "#555", fontSize: 12 }}>{t.name}</td>
              <td style={{ ...TD, fontFamily: "monospace" }}>{t.value}</td>
              <td style={{ ...TD, color: "#666" }}>{t.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr style={DIVIDER} />

      {/* Usage rules */}
      <h2 style={SECTION_TITLE}>Usage rules</h2>
      <p style={SECTION_DESC}>
        Follow these rules to keep layouts consistent and responsive across all Thematic products.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {usageRules.map(({ heading, body }) => (
          <div
            key={heading}
            style={{
              padding: "14px 18px",
              borderRadius: 8,
              border: "1px solid #eeeeee",
              background: "#fafafa",
            }}
          >
            <p style={{ fontSize: 13, fontWeight: 600, margin: "0 0 4px", color: "#111" }}>
              {heading}
            </p>
            <p style={{ fontSize: 13, color: "#555", margin: 0, lineHeight: 1.6 }}>
              {body}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Default: Story = {
  name: "Grid & Layout",
  render: () => <GridLayoutPage />,
}
