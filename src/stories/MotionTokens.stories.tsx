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
    desc: "Constant speed",
  },
  {
    name: "--base-easing-ease-in",
    value: "cubic-bezier(0.4, 0, 1, 1)",
    cssValue: "cubic-bezier(0.4, 0, 1, 1)",
    label: "Ease In",
    desc: "Slow start, fast end",
  },
  {
    name: "--base-easing-ease-out",
    value: "cubic-bezier(0, 0, 0.2, 1)",
    cssValue: "cubic-bezier(0, 0, 0.2, 1)",
    label: "Ease Out",
    desc: "Fast start, slow end",
  },
  {
    name: "--base-easing-ease-in-out",
    value: "cubic-bezier(0.4, 0, 0.2, 1)",
    cssValue: "cubic-bezier(0.4, 0, 0.2, 1)",
    label: "Ease In-Out",
    desc: "Symmetrical curve",
  },
  {
    name: "--base-easing-spring",
    value: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    cssValue: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    label: "Spring",
    desc: "Elastic overshoot",
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

const usageRules = [
  {
    heading: "Default to normal (200ms ease-out)",
    body: "Use --alias-motion-transition-normal as the baseline for all interactive state changes: button hover backgrounds, input focus rings, tooltip appear/disappear. It is fast enough to feel responsive without feeling jarring.",
  },
  {
    heading: "Reserve spring for delight, never layout",
    body: "Spring easing is designed for micro-interactions — a button press confirmation, a checkbox checking, a toggle switching. Never apply spring to layout shifts, page transitions, or elements that move large distances. The overshoot reads as a bug at scale.",
  },
  {
    heading: "Always respect prefers-reduced-motion",
    body: "Wrap any transition that moves, scales, or fades an element in a @media (prefers-reduced-motion: reduce) check. At minimum, set the duration to 0ms. Never animate anything that could trigger vestibular disorders without this safeguard.",
  },
  {
    heading: "Focus rings are non-negotiable",
    body: "Every interactive element must display a visible focus ring when keyboard-focused. Always use box-shadow: var(--alias-focus-ring-shadow) with outline: none on :focus-visible. The double-ring pattern (white gap + brand ring) works on both light and dark backgrounds.",
  },
]

// ─── Duration row with interactive bar ──────────────────────────────────────

const DurationRow: React.FC<{ token: typeof durationTokens[number] }> = ({ token }) => {
  const [active, setActive] = useState(false)

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "12px 0",
        borderBottom: "1px solid #f5f5f5",
      }}
    >
      <div style={{ width: 240, flexShrink: 0 }}>
        <p style={{ margin: "0 0 2px", fontSize: 12, fontFamily: "monospace", color: "#555" }}>
          {token.name}
        </p>
        <p style={{ margin: 0, fontSize: 11, color: "#888" }}>
          {token.label} · {token.value}
        </p>
      </div>

      <div
        style={{
          flex: 1,
          height: 8,
          background: "#f0f0f0",
          borderRadius: 4,
          overflow: "hidden",
          cursor: "pointer",
        }}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        title="Hover to preview duration"
      >
        <div
          style={{
            height: "100%",
            background: "#1c21dc",
            borderRadius: 4,
            width: active ? "100%" : "0%",
            transition: token.ms === 0
              ? "none"
              : `width ${token.ms}ms cubic-bezier(0, 0, 0.2, 1)`,
          }}
        />
      </div>

      <span style={{ fontSize: 12, color: "#888", width: 44, textAlign: "right", flexShrink: 0, fontFamily: "monospace" }}>
        {token.value}
      </span>
    </div>
  )
}

// ─── Easing row with animated dot ────────────────────────────────────────────

const EasingRow: React.FC<{ token: typeof easingTokens[number] }> = ({ token }) => {
  const [active, setActive] = useState(false)

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "12px 0",
        borderBottom: "1px solid #f5f5f5",
      }}
    >
      <div style={{ width: 240, flexShrink: 0 }}>
        <p style={{ margin: "0 0 2px", fontSize: 12, fontFamily: "monospace", color: "#555" }}>
          {token.name}
        </p>
        <p style={{ margin: 0, fontSize: 11, color: "#888" }}>{token.desc}</p>
      </div>

      <div
        style={{
          flex: 1,
          height: 24,
          background: "#f0f0f0",
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

      <span style={{ fontSize: 11, color: "#888", width: 260, flexShrink: 0, fontFamily: "monospace" }}>
        {token.value}
      </span>
    </div>
  )
}

// ─── Main page ───────────────────────────────────────────────────────────────

function MotionFocusPage() {
  return (
    <div style={PAGE}>
      <div style={BREADCRUMB}>Foundation</div>
      <h1 style={PAGE_TITLE}>Motion &amp; Focus</h1>
      <p style={PAGE_SUB}>
        Duration, easing, and focus ring tokens for consistent interactive behaviour across Thematic.
        Hover the bars and tracks below to feel each token in action.
      </p>

      {/* Duration scale */}
      <h2 style={SECTION_TITLE}>Duration scale</h2>
      <p style={SECTION_DESC}>
        Hover each bar to preview the animation speed. Always use the alias transition tokens in
        product code — they pair duration + easing together as a single value.
      </p>
      <div style={{ borderTop: "1px solid #f5f5f5" }}>
        {durationTokens.map((t) => (
          <DurationRow key={t.name} token={t} />
        ))}
      </div>

      <hr style={DIVIDER} />

      {/* Easing curves */}
      <h2 style={SECTION_TITLE}>Easing curves</h2>
      <p style={SECTION_DESC}>
        Hover the track to see the dot travel using each easing function. All dots use 400ms so
        differences are visible — in production these pair with their matching duration token.
      </p>
      <div style={{ borderTop: "1px solid #f5f5f5" }}>
        {easingTokens.map((t) => (
          <EasingRow key={t.name} token={t} />
        ))}
      </div>

      <hr style={DIVIDER} />

      {/* Alias transitions */}
      <h2 style={SECTION_TITLE}>Alias transitions</h2>
      <p style={SECTION_DESC}>
        These are the tokens to reference in component code. Each bundles duration + easing for a
        specific interaction context.
      </p>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 8 }}>
        <thead>
          <tr>
            <th style={TH}>Token</th>
            <th style={TH}>Value</th>
            <th style={TH}>Intended use</th>
          </tr>
        </thead>
        <tbody>
          {aliasTransitionTokens.map((t) => (
            <tr key={t.name}>
              <td style={{ ...TD, fontFamily: "monospace", color: "#555", fontSize: 12 }}>{t.name}</td>
              <td style={{ ...TD, fontFamily: "monospace", fontSize: 12 }}>{t.value}</td>
              <td style={{ ...TD, color: "#666" }}>{t.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr style={DIVIDER} />

      {/* Focus ring */}
      <h2 style={SECTION_TITLE}>Focus ring</h2>
      <p style={SECTION_DESC}>
        The focus ring uses a double-ring shadow: a 2px white gap, then a 4px brand-blue outer ring.
        Apply <code style={{ fontFamily: 'monospace', fontSize: 12, background: '#f5f5f5', padding: '1px 5px', borderRadius: 3 }}>box-shadow: var(--alias-focus-ring-shadow)</code> and{" "}
        <code style={{ fontFamily: 'monospace', fontSize: 12, background: '#f5f5f5', padding: '1px 5px', borderRadius: 3 }}>outline: none</code> on{" "}
        <code style={{ fontFamily: 'monospace', fontSize: 12, background: '#f5f5f5', padding: '1px 5px', borderRadius: 3 }}>:focus-visible</code>.
      </p>

      {/* Focus ring previews */}
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 28 }}>
        {/* Button */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ padding: 20, background: "#f5f5f5", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", minWidth: 140, minHeight: 80 }}>
            <button
              style={{
                padding: "10px 20px",
                borderRadius: 8,
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
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#444" }}>Button</span>
        </div>

        {/* Input */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ padding: 20, background: "#f5f5f5", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", minWidth: 140, minHeight: 80 }}>
            <div
              style={{
                width: 160,
                height: 40,
                borderRadius: 8,
                border: "1px solid #1c21dc",
                background: "#ffffff",
                boxShadow: "0 0 0 2px #ffffff, 0 0 0 4px #6e71e6",
                display: "flex",
                alignItems: "center",
                padding: "0 12px",
              }}
            >
              <span style={{ fontSize: 13, color: "#aaa" }}>Email address</span>
            </div>
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#444" }}>Input</span>
        </div>

        {/* Checkbox */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ padding: 20, background: "#f5f5f5", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", minWidth: 80, minHeight: 80 }}>
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
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#444" }}>Checkbox</span>
        </div>

        {/* Badge */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ padding: 20, background: "#f5f5f5", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", minWidth: 120, minHeight: 80 }}>
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
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#444" }}>Badge</span>
        </div>
      </div>

      {/* Focus ring tokens table */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 8 }}>
        <thead>
          <tr>
            <th style={TH}>Token</th>
            <th style={TH}>Value</th>
          </tr>
        </thead>
        <tbody>
          {focusRingTokens.map((t) => (
            <tr key={t.name}>
              <td style={{ ...TD, fontFamily: "monospace", color: "#555", fontSize: 12 }}>{t.name}</td>
              <td style={{ ...TD, fontFamily: "monospace", fontSize: 12 }}>{t.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr style={DIVIDER} />

      {/* Usage principles */}
      <h2 style={SECTION_TITLE}>Usage principles</h2>
      <p style={SECTION_DESC}>
        Four rules that keep motion purposeful and accessible in every Thematic product.
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
  name: "Motion & Focus",
  render: () => <MotionFocusPage />,
}
