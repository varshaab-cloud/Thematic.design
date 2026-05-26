import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"

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
  { label: "Full width",        columns: [12],    colors: ["#c4c5f4"] },
  { label: "Halves (6+6)",      columns: [6, 6],  colors: ["#9194eb", "#6e71e6"] },
  { label: "Thirds (4+4+4)",    columns: [4, 4, 4], colors: ["#aaacf0", "#9194eb", "#6e71e6"] },
  { label: "Sidebar (3+9)",     columns: [3, 9],  colors: ["#6e71e6", "#c4c5f4"] },
  { label: "Quarter (4+8)",     columns: [4, 8],  colors: ["#9194eb", "#c4c5f4"] },
]

const layoutTokens = [
  { name: "--alias-spacing-section-md", value: "2rem",  usage: "Section spacing" },
  { name: "--alias-spacing-section-lg", value: "3rem",  usage: "Large section spacing" },
  { name: "--alias-spacing-page-md",    value: "4rem",  usage: "Page level spacing" },
  { name: "--alias-spacing-page-lg",    value: "5rem",  usage: "Hero / layout spacing" },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 style={{
    fontSize: 18,
    fontWeight: 700,
    margin: "2.5rem 0 0.25rem",
    color: "hsl(var(--foreground))",
  }}>
    {children}
  </h2>
)

const SectionDesc: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p style={{
    fontSize: 13,
    color: "var(--muted-foreground)",
    margin: "0 0 1.25rem",
    lineHeight: 1.6,
  }}>
    {children}
  </p>
)

const Divider = () => (
  <hr style={{ border: "none", borderTop: "1px solid hsl(var(--border))", margin: "2rem 0 0" }} />
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
  padding: "10px 10px",
  fontSize: 13,
  color: "hsl(var(--foreground))",
  borderBottom: "1px solid hsl(var(--border))",
}

// ─── Breakpoint ruler ────────────────────────────────────────────────────────

function BreakpointRuler() {
  const maxPx = 1536
  const trackWidth = 820 // logical track width for visual positioning

  return (
    <div style={{ overflowX: "auto", paddingBottom: "1rem" }}>
      {/* Ruler track */}
      <div style={{ position: "relative", height: 40, minWidth: trackWidth, marginBottom: 56 }}>
        {/* Background bar */}
        <div style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          height: 6,
          background: "hsl(var(--muted))",
          borderRadius: 3,
        }} />

        {breakpoints.map((bp, i) => {
          const pct = (bp.px / maxPx) * 100
          const leftPx = (pct / 100) * trackWidth

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
              {/* Tick */}
              <div style={{ width: 2, height: 40, background: "#1518a6", borderRadius: 1 }} />

              {/* Label below */}
              <div style={{
                marginTop: 6,
                textAlign: i === 0 ? "left" : "center",
                minWidth: 60,
              }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#1518a6", lineHeight: 1 }}>
                  {bp.label}
                </p>
                <p style={{ margin: "2px 0 0", fontSize: 11, color: "var(--muted-foreground)" }}>
                  {bp.px === 0 ? "0px" : `${bp.px}px`}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Breakpoint table */}
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid hsl(var(--border))" }}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Min-width</th>
            <th style={thStyle}>Tailwind prefix</th>
            <th style={thStyle}>Typical context</th>
          </tr>
        </thead>
        <tbody>
          {breakpoints.map((bp) => (
            <tr key={bp.name}>
              <td style={{ ...tdStyle, fontWeight: 600 }}>{bp.label}</td>
              <td style={{ ...tdStyle, fontFamily: "monospace" }}>{bp.px === 0 ? "0px (default)" : `${bp.px}px`}</td>
              <td style={{ ...tdStyle, fontFamily: "monospace", color: "var(--muted-foreground)" }}>
                {bp.px === 0 ? "(base)" : `${bp.name}:`}
              </td>
              <td style={{ ...tdStyle, color: "var(--muted-foreground)" }}>{bp.device}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── 12-column grid visualiser ───────────────────────────────────────────────

function TwelveColumnGrid() {
  const [highlighted, setHighlighted] = useState<number[]>([])

  return (
    <div>
      {/* Column labels row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 4, marginBottom: 8 }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} style={{ textAlign: "center", fontSize: 11, color: "var(--muted-foreground)", fontWeight: 600 }}>
            {i + 1}
          </div>
        ))}
      </div>

      {/* Columns */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 4, marginBottom: "1.5rem" }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            style={{
              height: 48,
              borderRadius: 4,
              background: "#c4c5f4",
              border: "1px solid #9194eb",
              transition: "background 150ms ease-out",
            }}
          />
        ))}
      </div>

      {/* Layout splits */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {layoutSplits.map((split) => (
          <div key={split.label}>
            <p style={{ fontSize: 12, fontWeight: 600, margin: "0 0 6px", color: "hsl(var(--foreground))" }}>
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

      <p style={{ fontSize: 12, color: "var(--muted-foreground)", marginTop: "1rem" }}>
        Gutter: 24px (1.5rem) on desktop · 16px (1rem) on mobile
      </p>
    </div>
  )
}

// ─── Container widths ────────────────────────────────────────────────────────

function ContainerWidths() {
  // Render nested boxes, all scaled to fit within the 900px max
  const visualMax = 820
  const namedWidths = [640, 768, 1024, 1280, 1536]

  return (
    <div style={{ overflowX: "auto" }}>
      <div style={{ position: "relative", minWidth: visualMax, marginBottom: "1.5rem" }}>
        {containerWidths.slice().reverse().map((cw, i) => {
          const isFull = cw.name === "full"
          const widthPx = isFull ? visualMax : Math.round((parseInt(cw.maxWidth) / 1536) * visualMax)
          const reversedIndex = containerWidths.length - 1 - i
          const colors = ["#f0f0ff", "#e3e3f8", "#c4c5f4", "#aaacf0", "#9194eb", "#6e71e6"]
          const textColors = reversedIndex < 4 ? "#111487" : "#ffffff"

          return (
            <div
              key={cw.name}
              style={{
                width: widthPx,
                margin: "0 auto",
                background: colors[reversedIndex] ?? "#c4c5f4",
                borderRadius: 6,
                padding: "10px 16px",
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 4,
                border: "1px solid rgba(0,0,0,0.07)",
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 700, color: textColors }}>
                container-{cw.name}
              </span>
              <span style={{ fontSize: 12, color: textColors, opacity: 0.8, fontFamily: "monospace" }}>
                {cw.maxWidth}
              </span>
            </div>
          )
        })}
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid hsl(var(--border))" }}>
            <th style={thStyle}>Variant</th>
            <th style={thStyle}>Max-width</th>
            <th style={thStyle}>Description</th>
          </tr>
        </thead>
        <tbody>
          {containerWidths.map((cw) => (
            <tr key={cw.name}>
              <td style={{ ...tdStyle, fontFamily: "monospace", fontWeight: 600 }}>container-{cw.name}</td>
              <td style={{ ...tdStyle, fontFamily: "monospace" }}>{cw.maxWidth}</td>
              <td style={{ ...tdStyle, color: "var(--muted-foreground)" }}>{cw.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────

function GridLayoutPage() {
  return (
    <div style={{ padding: "2rem", maxWidth: 960, margin: "0 auto" }}>

      {/* Page header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 0.5rem" }}>Grid & Layout</h1>
        <p style={{ fontSize: 14, color: "var(--muted-foreground)", margin: 0, lineHeight: 1.6 }}>
          Breakpoints, column grid, container widths, and layout spacing tokens.
          All page layouts in Thematic follow the 12-column grid — never use ad-hoc pixel widths.
        </p>
      </div>

      {/* ── Breakpoints ─────────────────────────────────────────────────────── */}
      <Divider />
      <SectionTitle>Breakpoints</SectionTitle>
      <SectionDesc>
        Six breakpoints cover the full device range. Design mobile-first: the base styles apply to
        xs (0px and up), then progressive enhancements are added at each larger breakpoint.
      </SectionDesc>
      <BreakpointRuler />

      {/* ── 12-column grid ──────────────────────────────────────────────────── */}
      <Divider />
      <SectionTitle>12-column grid</SectionTitle>
      <SectionDesc>
        All page and section layouts use a 12-column grid. Common splits are shown below. Columns
        are equal-width with 24px gutters on desktop and 16px on mobile.
      </SectionDesc>
      <TwelveColumnGrid />

      {/* ── Max-width containers ─────────────────────────────────────────────── */}
      <Divider />
      <SectionTitle>Max-width containers</SectionTitle>
      <SectionDesc>
        Each named container restricts content width at a breakpoint. Boxes below are scaled
        proportionally to show relative widths. The default content container is{" "}
        <code>container-xl</code> (1280px).
      </SectionDesc>
      <ContainerWidths />

      {/* ── Layout tokens ────────────────────────────────────────────────────── */}
      <Divider />
      <SectionTitle>Layout spacing tokens</SectionTitle>
      <SectionDesc>
        Use these alias tokens for vertical rhythm between sections and pages. Reference them via
        CSS custom properties — never hardcode pixel values in layout code.
      </SectionDesc>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: "1.5rem" }}>
        {layoutTokens.map((t) => (
          <div
            key={t.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "10px 0",
              borderBottom: "1px solid hsl(var(--border))",
            }}
          >
            <div style={{ width: 260, flexShrink: 0 }}>
              <p style={{ margin: "0 0 2px", fontSize: 12, fontFamily: "monospace", color: "var(--muted-foreground)" }}>
                {t.name}
              </p>
              <p style={{ margin: 0, fontSize: 11, color: "var(--muted-foreground)" }}>{t.usage}</p>
            </div>
            {/* Visual bar */}
            <div
              style={{
                height: 20,
                width: `calc(${t.value} * 4)`,
                background: "hsl(var(--primary) / 0.2)",
                borderRadius: 3,
                flexShrink: 0,
                minWidth: 16,
              }}
            />
            <span style={{ fontSize: 12, color: "var(--muted-foreground)", fontFamily: "monospace" }}>
              {t.value}
            </span>
          </div>
        ))}
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginBottom: "2rem" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid hsl(var(--border))" }}>
            <th style={thStyle}>Token</th>
            <th style={thStyle}>Value</th>
            <th style={thStyle}>Usage</th>
          </tr>
        </thead>
        <tbody>
          {layoutTokens.map((t) => (
            <tr key={t.name}>
              <td style={{ ...tdStyle, fontFamily: "monospace", color: "var(--muted-foreground)", fontSize: 12 }}>
                {t.name}
              </td>
              <td style={{ ...tdStyle, fontFamily: "monospace" }}>{t.value}</td>
              <td style={{ ...tdStyle, color: "var(--muted-foreground)" }}>{t.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Usage rules ──────────────────────────────────────────────────────── */}
      <Divider />
      <SectionTitle>Usage rules</SectionTitle>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
        {[
          {
            heading: "Default content width is 1280px (xl)",
            body: "Use container-xl as the standard page wrapper. Only go wider (container-2xl) for data-dense interfaces like dashboards or data tables that genuinely need the extra space.",
          },
          {
            heading: "12-column grid for all page layouts",
            body: "Never use arbitrary pixel widths for layout columns. Map every layout region to column spans — even if a design uses a 2-column layout, it should sit on a 6+6 or 4+8 grid rather than two fixed-width divs.",
          },
          {
            heading: "Gutters: 24px desktop, 16px mobile",
            body: "Column gaps are 24px (1.5rem) at md and above, 16px (1rem) at xs/sm. Use CSS grid gap or Tailwind gap-4 / gap-6 respectively. Never pad individual columns to fake gutters.",
          },
          {
            heading: "Mobile-first, always",
            body: "Write base styles for the smallest viewport, then override at larger breakpoints with sm:, md:, lg:, xl:, 2xl: prefixes. Never design desktop-first and subtract styles for mobile — the cascade fights you.",
          },
        ].map(({ heading, body }) => (
          <div
            key={heading}
            style={{
              padding: "1rem 1.25rem",
              borderRadius: 8,
              border: "1px solid hsl(var(--border))",
              background: "hsl(var(--muted) / 0.4)",
            }}
          >
            <p style={{ fontSize: 13, fontWeight: 600, margin: "0 0 4px", color: "hsl(var(--foreground))" }}>
              {heading}
            </p>
            <p style={{ fontSize: 13, color: "var(--muted-foreground)", margin: 0, lineHeight: 1.6 }}>
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
