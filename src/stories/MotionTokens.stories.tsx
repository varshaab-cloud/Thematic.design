import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"

const meta: Meta = {
  title: "Thematic design system/Foundation/Motion & Focus",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { page: null },
  },
}

export default meta
type Story = StoryObj

// ─── Token data ──────────────────────────────────────────────────────────────

const durationTokens = [
  { name: "--base-duration-instant", value: "0ms",   ms: 0,   label: "Instant" },
  { name: "--base-duration-fast",    value: "100ms",  ms: 100, label: "Fast" },
  { name: "--base-duration-normal",  value: "200ms",  ms: 200, label: "Normal" },
  { name: "--base-duration-slow",    value: "300ms",  ms: 300, label: "Slow" },
  { name: "--base-duration-slower",  value: "500ms",  ms: 500, label: "Slower" },
]

const easingTokens = [
  {
    name: "--base-easing-linear",
    value: "linear",
    cssValue: "linear",
    label: "Linear",
  },
  {
    name: "--base-easing-ease-in",
    value: "cubic-bezier(0.4, 0, 1, 1)",
    cssValue: "cubic-bezier(0.4, 0, 1, 1)",
    label: "Ease In",
  },
  {
    name: "--base-easing-ease-out",
    value: "cubic-bezier(0, 0, 0.2, 1)",
    cssValue: "cubic-bezier(0, 0, 0.2, 1)",
    label: "Ease Out",
  },
  {
    name: "--base-easing-ease-in-out",
    value: "cubic-bezier(0.4, 0, 0.2, 1)",
    cssValue: "cubic-bezier(0.4, 0, 0.2, 1)",
    label: "Ease In-Out",
  },
  {
    name: "--base-easing-spring",
    value: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    cssValue: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    label: "Spring",
  },
]

const aliasTransitionTokens = [
  {
    name: "--alias-motion-transition-fast",
    value: "100ms cubic-bezier(0, 0, 0.2, 1)",
    usage: "Button hover, input focus ring",
  },
  {
    name: "--alias-motion-transition-normal",
    value: "200ms cubic-bezier(0, 0, 0.2, 1)",
    usage: "Dropdown open/close, tooltip appear",
  },
  {
    name: "--alias-motion-transition-slow",
    value: "300ms cubic-bezier(0, 0, 0.2, 1)",
    usage: "Page transitions, large layout changes",
  },
  {
    name: "--alias-motion-transition-spring",
    value: "300ms cubic-bezier(0.34, 1.56, 0.64, 1)",
    usage: "Bouncy micro-interactions (button press, checkbox check)",
  },
  {
    name: "--alias-motion-transition-fade",
    value: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
    usage: "Modal/popover fade, overlay appear",
  },
]

const focusRingTokens = [
  { name: "--alias-focus-ring-color",  value: "#6e71e6" },
  { name: "--alias-focus-ring-offset", value: "2px" },
  { name: "--alias-focus-ring-width",  value: "2px" },
  { name: "--alias-focus-ring-style",  value: "2px solid #6e71e6" },
  { name: "--alias-focus-ring-shadow", value: "0 0 0 2px #ffffff, 0 0 0 4px #6e71e6" },
]

const focusPreviewElements = [
  {
    label: "Button",
    element: (
      <button
        style={{
          padding: "10px 20px",
          borderRadius: 12,
          border: "1px solid #d5d5d5",
          background: "#1518a6",
          color: "#ffffff",
          fontSize: 14,
          fontWeight: 500,
          cursor: "pointer",
          outline: "none",
          boxShadow: "0 0 0 2px #ffffff, 0 0 0 4px #6e71e6",
        }}
      >
        Save changes
      </button>
    ),
  },
  {
    label: "Input",
    element: (
      <div
        style={{
          width: 160,
          height: 40,
          borderRadius: 12,
          border: "1px solid #1c21dc",
          background: "#ffffff",
          boxShadow: "0 0 0 2px #ffffff, 0 0 0 4px #6e71e6",
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
        }}
      >
        <span style={{ fontSize: 13, color: "#909090" }}>Email address</span>
      </div>
    ),
  },
  {
    label: "Checkbox",
    element: (
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 4,
          border: "2px solid #1518a6",
          background: "#1518a6",
          boxShadow: "0 0 0 2px #ffffff, 0 0 0 4px #6e71e6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
          <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
  },
  {
    label: "Badge / Pill",
    element: (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "4px 12px",
          borderRadius: 9999,
          background: "#c4c5f4",
          color: "#111487",
          fontSize: 12,
          fontWeight: 500,
          boxShadow: "0 0 0 2px #ffffff, 0 0 0 4px #6e71e6",
        }}
      >
        Design
      </span>
    ),
  },
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

// ─── Duration row with animated bar ─────────────────────────────────────────

const DurationRow: React.FC<{ token: typeof durationTokens[number] }> = ({ token }) => {
  const [active, setActive] = useState(false)

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "10px 0",
        borderBottom: "1px solid hsl(var(--border))",
      }}
    >
      {/* Token name */}
      <div style={{ width: 240, flexShrink: 0 }}>
        <p style={{ margin: "0 0 2px", fontSize: 12, fontFamily: "monospace", color: "var(--muted-foreground)" }}>
          {token.name}
        </p>
        <p style={{ margin: 0, fontSize: 11, color: "var(--muted-foreground)" }}>
          {token.label} — {token.value}
        </p>
      </div>

      {/* Animated bar */}
      <div
        style={{ flex: 1, height: 8, background: "hsl(var(--muted))", borderRadius: 4, overflow: "hidden", cursor: "pointer" }}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        title="Hover to preview duration"
      >
        <div
          style={{
            height: "100%",
            background: "var(--data-viz-cat-1, #1c21dc)",
            borderRadius: 4,
            width: active ? "100%" : "0%",
            transition: token.ms === 0
              ? "none"
              : `width ${token.ms}ms cubic-bezier(0, 0, 0.2, 1)`,
          }}
        />
      </div>

      <span style={{ fontSize: 12, color: "var(--muted-foreground)", width: 36, textAlign: "right", flexShrink: 0 }}>
        {token.value}
      </span>
    </div>
  )
}

// ─── Easing dot preview ──────────────────────────────────────────────────────

const EasingRow: React.FC<{ token: typeof easingTokens[number] }> = ({ token }) => {
  const [active, setActive] = useState(false)

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "10px 0",
        borderBottom: "1px solid hsl(var(--border))",
      }}
    >
      {/* Token name */}
      <div style={{ width: 240, flexShrink: 0 }}>
        <p style={{ margin: "0 0 2px", fontSize: 12, fontFamily: "monospace", color: "var(--muted-foreground)" }}>
          {token.name}
        </p>
        <p style={{ margin: 0, fontSize: 11, color: "var(--muted-foreground)" }}>{token.label}</p>
      </div>

      {/* Track with dot */}
      <div
        style={{
          flex: 1,
          height: 24,
          background: "hsl(var(--muted))",
          borderRadius: 12,
          position: "relative",
          cursor: "pointer",
          overflow: "hidden",
        }}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        title="Hover to preview easing"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: active ? "calc(100% - 20px)" : "4px",
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "#1518a6",
            transition: `left 400ms ${token.cssValue}`,
          }}
        />
      </div>

      {/* Value */}
      <span style={{ fontSize: 11, color: "var(--muted-foreground)", width: 220, flexShrink: 0, fontFamily: "monospace" }}>
        {token.value}
      </span>
    </div>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────

function MotionFocusPage() {
  return (
    <div style={{ padding: "2rem", maxWidth: 960, margin: "0 auto" }}>

      {/* Page header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 0.5rem" }}>Motion & Focus</h1>
        <p style={{ fontSize: 14, color: "var(--muted-foreground)", margin: 0, lineHeight: 1.6 }}>
          Duration, easing, and focus ring tokens for consistent interactive behaviour across Thematic.
          Hover the bars and tracks below to feel each token in action.
        </p>
      </div>

      {/* ── Duration scale ──────────────────────────────────────────────────── */}
      <Divider />
      <SectionTitle>Duration scale</SectionTitle>
      <SectionDesc>
        Hover each bar to preview the animation speed. Always use the alias transition tokens in product
        code — they pair duration + easing together as a single value.
      </SectionDesc>

      <div style={{ borderTop: "1px solid hsl(var(--border))" }}>
        {durationTokens.map((t) => (
          <DurationRow key={t.name} token={t} />
        ))}
      </div>

      {/* ── Easing curves ───────────────────────────────────────────────────── */}
      <Divider />
      <SectionTitle>Easing curves</SectionTitle>
      <SectionDesc>
        Hover the track to see the dot travel across using each easing function. All dots use 400ms
        so differences are visible — in production these are paired with their matching duration token.
      </SectionDesc>

      <div style={{ borderTop: "1px solid hsl(var(--border))" }}>
        {easingTokens.map((t) => (
          <EasingRow key={t.name} token={t} />
        ))}
      </div>

      {/* ── Alias transitions ────────────────────────────────────────────────── */}
      <Divider />
      <SectionTitle>Alias transitions</SectionTitle>
      <SectionDesc>
        These are the tokens to reference in component code. Each bundles duration + easing for a
        specific interaction context.
      </SectionDesc>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid hsl(var(--border))" }}>
            <th style={thStyle}>Token</th>
            <th style={thStyle}>Value</th>
            <th style={thStyle}>Intended use</th>
          </tr>
        </thead>
        <tbody>
          {aliasTransitionTokens.map((t) => (
            <tr key={t.name}>
              <td style={{ ...tdStyle, fontFamily: "monospace", color: "var(--muted-foreground)", fontSize: 12 }}>
                {t.name}
              </td>
              <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: 12 }}>{t.value}</td>
              <td style={{ ...tdStyle, color: "var(--muted-foreground)" }}>{t.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Focus ring previews ──────────────────────────────────────────────── */}
      <Divider />
      <SectionTitle>Focus ring</SectionTitle>
      <SectionDesc>
        The focus ring uses a double-ring shadow: a 2px white gap, then a 4px brand-blue outer ring.
        Apply <code>box-shadow: var(--alias-focus-ring-shadow)</code> and{" "}
        <code>outline: none</code> on <code>:focus-visible</code>.
      </SectionDesc>

      <div style={{ display: "flex", gap: 32, flexWrap: "wrap", marginBottom: "2rem" }}>
        {focusPreviewElements.map(({ label, element }) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ padding: 16, background: "hsl(var(--muted))", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", minWidth: 120, minHeight: 72 }}>
              {element}
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: "hsl(var(--foreground))" }}>{label}</span>
          </div>
        ))}
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid hsl(var(--border))" }}>
            <th style={thStyle}>Token</th>
            <th style={thStyle}>Value</th>
          </tr>
        </thead>
        <tbody>
          {focusRingTokens.map((t) => (
            <tr key={t.name}>
              <td style={{ ...tdStyle, fontFamily: "monospace", color: "var(--muted-foreground)", fontSize: 12 }}>
                {t.name}
              </td>
              <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: 12 }}>{t.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Usage principles ─────────────────────────────────────────────────── */}
      <Divider />
      <SectionTitle>Usage principles</SectionTitle>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
        {[
          {
            heading: "Default to normal (200ms ease-out)",
            body: "Use --alias-motion-transition-normal as the baseline for all interactive state changes: button hover backgrounds, input focus rings, tooltip appear/disappear. It is fast enough to feel responsive without feeling jarring.",
          },
          {
            heading: "Reserve spring for delight, never layout",
            body: "Spring easing (cubic-bezier(0.34, 1.56, 0.64, 1)) is designed for micro-interactions — a button press confirmation, a checkbox checking, a toggle switching. Never apply spring to layout shifts, page transitions, or elements that move large distances. The overshoot reads as a bug at scale.",
          },
          {
            heading: "Always respect prefers-reduced-motion",
            body: "Wrap any transition that moves, scales, or fades an element in a @media (prefers-reduced-motion: reduce) check. At minimum, set the duration to 0ms (--base-duration-instant). Never animate anything that could trigger vestibular disorders without this safeguard.",
          },
          {
            heading: "Focus rings are non-negotiable",
            body: "Every interactive element must display a visible focus ring when keyboard-focused. Always use box-shadow: var(--alias-focus-ring-shadow) with outline: none on :focus-visible. Never remove the outline without replacing it. The double-ring pattern (white gap + brand ring) works on both light and dark backgrounds.",
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
  name: "Motion & Focus",
  render: () => <MotionFocusPage />,
}
