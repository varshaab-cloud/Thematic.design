import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"

const meta: Meta = {
  title: "Foundation/Design Tokens",
  parameters: {
    layout: "fullscreen",
    docs: { page: null },
  },
}

export default meta
type Story = StoryObj

// ─── Token data ─────────────────────────────────────────────────────────────

const baseColors = {
  Gray: [
    { stop: "75", value: "#f5f5f3" },
    { stop: "100", value: "#eeeeec" },
    { stop: "200", value: "#e3e3e0" },
    { stop: "300", value: "#d5d5d5" },
    { stop: "400", value: "#b1b1b1" },
    { stop: "500", value: "#909090" },
    { stop: "600", value: "#6d6d6d" },
    { stop: "700", value: "#464646" },
    { stop: "900", value: "#222222" },
  ],
  Blue: [
    { stop: "100", value: "#c4c5f4" },
    { stop: "200", value: "#aaacf0" },
    { stop: "300", value: "#9194eb" },
    { stop: "400", value: "#6e71e6" },
    { stop: "600", value: "#1c21dc" },
    { stop: "700", value: "#171cbe" },
    { stop: "800", value: "#1518a6" },
    { stop: "900", value: "#111487" },
  ],
  Red: [
    { stop: "100", value: "#ffe2e2" },
    { stop: "200", value: "#ffb9bb" },
    { stop: "300", value: "#ff999c" },
    { stop: "400", value: "#f55658" },
    { stop: "600", value: "#d21a26" },
    { stop: "700", value: "#ab121b" },
    { stop: "800", value: "#81070d" },
    { stop: "900", value: "#640204" },
  ],
  Green: [
    { stop: "100", value: "#dcfce7" },
    { stop: "200", value: "#bbf7d0" },
    { stop: "300", value: "#86efac" },
    { stop: "400", value: "#4ade80" },
    { stop: "600", value: "#16a34a" },
    { stop: "700", value: "#15803d" },
    { stop: "800", value: "#166534" },
    { stop: "900", value: "#14532d" },
  ],
}

const aliasTextTokens = [
  { name: "--alias-color-text-primary", value: "#000000", description: "Primary text" },
  { name: "--alias-color-text-secondary", value: "#222222", description: "Secondary text, icons" },
  { name: "--alias-color-text-tertiary", value: "#464646", description: "Tertiary text, icons" },
  { name: "--alias-color-text-disabled", value: "#909090", description: "Disabled text" },
  { name: "--alias-color-text-inverse", value: "#ffffff", description: "Text on dark backgrounds" },
  { name: "--alias-color-text-brand", value: "#111487", description: "Brand text, semantic text" },
]

const aliasBackgroundTokens = [
  { name: "--alias-color-background-primary", value: "#ffffff", description: "Primary page background" },
  { name: "--alias-color-background-secondary", value: "#f5f5f3", description: "Secondary background" },
  { name: "--alias-color-background-tertiary", value: "#eeeeec", description: "Component background layers" },
  { name: "--alias-color-background-brand", value: "#1518a6", description: "Brand background" },
  { name: "--alias-color-background-brand-dark", value: "#111487", description: "Dark brand background" },
]

const aliasBorderTokens = [
  { name: "--alias-color-border-default", value: "#d5d5d5", description: "Default border" },
  { name: "--alias-color-border-active", value: "#1c21dc", description: "Active/focused border" },
  { name: "--alias-color-border-disabled", value: "#b1b1b1", description: "Disabled field border" },
  { name: "--alias-color-border-success", value: "#16a34a", description: "Success border" },
  { name: "--alias-color-border-info", value: "#0369a1", description: "Info border" },
  { name: "--alias-color-border-error", value: "#ff4e2a", description: "Error border" },
  { name: "--alias-color-border-warning", value: "#f7d307", description: "Warning border" },
]

const aliasFeedbackTokens = [
  { name: "--alias-color-feedback-success-bg", value: "#dcfce7", description: "Success background" },
  { name: "--alias-color-feedback-success-fg", value: "#16a34a", description: "Success foreground" },
  { name: "--alias-color-feedback-info-bg", value: "#e0f2fe", description: "Info background" },
  { name: "--alias-color-feedback-info-fg", value: "#0369a1", description: "Info foreground" },
  { name: "--alias-color-feedback-error-bg", value: "#ffe9e5", description: "Error background" },
  { name: "--alias-color-feedback-error-fg", value: "#ff4e2a", description: "Error foreground" },
  { name: "--alias-color-feedback-warning-bg", value: "#fffade", description: "Warning background" },
  { name: "--alias-color-feedback-warning-fg", value: "#f7d307", description: "Warning foreground" },
]

const typographyTokens = [
  { name: "Heading 1", token: "alias-typography-heading1", size: "3rem", weight: "700", sample: "The quick brown fox" },
  { name: "Heading 2", token: "alias-typography-heading2", size: "2.625rem", weight: "700", sample: "The quick brown fox" },
  { name: "Heading 3", token: "alias-typography-heading3", size: "2.25rem", weight: "700", sample: "The quick brown fox" },
  { name: "Heading 4", token: "alias-typography-heading4", size: "2rem", weight: "700", sample: "The quick brown fox jumps" },
  { name: "Heading 5", token: "alias-typography-heading5", size: "1.875rem", weight: "700", sample: "The quick brown fox jumps" },
  { name: "Heading 6", token: "alias-typography-heading6", size: "1.875rem", weight: "600", sample: "The quick brown fox jumps" },
  { name: "Subheading 1", token: "alias-typography-subheading1", size: "1rem", weight: "400", sample: "The quick brown fox jumps over the lazy dog" },
  { name: "Subheading 2", token: "alias-typography-subheading2", size: "0.875rem", weight: "500", sample: "The quick brown fox jumps over the lazy dog" },
  { name: "Body text 1", token: "alias-typography-body-text1", size: "1rem", weight: "400", sample: "The quick brown fox jumps over the lazy dog" },
  { name: "Body text 2", token: "alias-typography-body-text2", size: "0.875rem", weight: "400", sample: "The quick brown fox jumps over the lazy dog" },
  { name: "Body text 3", token: "alias-typography-body-text3", size: "0.75rem", weight: "400", sample: "The quick brown fox jumps over the lazy dog" },
  { name: "Button", token: "alias-typography-button", size: "0.875rem", weight: "500", sample: "Save changes" },
  { name: "Caption 1", token: "alias-typography-caption1", size: "0.75rem", weight: "400", sample: "Last updated 3 hours ago" },
  { name: "Caption 2", token: "alias-typography-caption2", size: "0.625rem", weight: "400", sample: "Tooltip label text" },
]

const spacingTokens = [
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

const radiusTokens = [
  { name: "--base-radius-xs", label: "xs", value: "4px", px: 4 },
  { name: "--base-radius-sm", label: "sm", value: "8px", px: 8 },
  { name: "--base-radius-md", label: "md", value: "12px", px: 12 },
  { name: "--base-radius-lg", label: "lg", value: "14px", px: 14 },
  { name: "--base-radius-xl", label: "xl", value: "16px", px: 16 },
  { name: "--base-radius-xxl", label: "xxl", value: "20px", px: 20 },
]

const shadowTokens = [
  { name: "--base-shadow-01", value: "0px 1px 2px 0px rgba(0,0,0,0.05)", usage: "Subtle lift — cards at rest" },
  { name: "--base-shadow-02", value: "0px 1px 3px 0px rgba(0,0,0,0.06), 0px 4px 16px 0px rgba(0,0,0,0.05)", usage: "Cards, dropdowns" },
  { name: "--base-shadow-03", value: "0px 2px 4px 0px rgba(0,0,0,0.07), 0px 6px 20px 0px rgba(0,0,0,0.06)", usage: "Popovers, tooltips" },
  { name: "--base-shadow-04", value: "0px 4px 6px 0px rgba(0,0,0,0.07), 0px 10px 30px 0px rgba(0,0,0,0.08)", usage: "Drawers, side panels" },
  { name: "--base-shadow-05", value: "0px 8px 16px 0px rgba(0,0,0,0.10), 0px 20px 48px 0px rgba(0,0,0,0.10)", usage: "Modals, dialogs" },
]

const componentTokenGroups = [
  {
    label: "Button — Primary",
    tokens: [
      { name: "--component-button-primary-background", value: "#1518a6" },
      { name: "--component-button-primary-background-hover", value: "#171cbe" },
      { name: "--component-button-primary-background-active", value: "#111487" },
      { name: "--component-button-primary-background-disabled", value: "#e3e3e0" },
      { name: "--component-button-primary-text", value: "#ffffff" },
      { name: "--component-button-primary-text-disabled", value: "#909090" },
      { name: "--component-button-primary-border-radius", value: "12px", noSwatch: true },
      { name: "--component-button-primary-padding-x", value: "1.5rem", noSwatch: true },
      { name: "--component-button-primary-padding-y", value: "0.75rem", noSwatch: true },
      { name: "--component-button-primary-font-size", value: "0.875rem", noSwatch: true },
      { name: "--component-button-primary-font-weight", value: "500", noSwatch: true },
    ],
  },
  {
    label: "Button — Secondary",
    tokens: [
      { name: "--component-button-secondary-background", value: "transparent", noSwatch: true },
      { name: "--component-button-secondary-background-hover", value: "#c4c5f4" },
      { name: "--component-button-secondary-background-active", value: "#aaacf0" },
      { name: "--component-button-secondary-text", value: "#111487" },
      { name: "--component-button-secondary-text-disabled", value: "#909090" },
      { name: "--component-button-secondary-border", value: "#1c21dc" },
      { name: "--component-button-secondary-border-radius", value: "12px", noSwatch: true },
    ],
  },
  {
    label: "Button — Ghost",
    tokens: [
      { name: "--component-button-ghost-background-hover", value: "#eeeeec" },
      { name: "--component-button-ghost-text", value: "#111487" },
      { name: "--component-button-ghost-text-disabled", value: "#909090" },
      { name: "--component-button-ghost-border-radius", value: "12px", noSwatch: true },
    ],
  },
  {
    label: "Button — Destructive",
    tokens: [
      { name: "--component-button-destructive-background", value: "#ff4e2a" },
      { name: "--component-button-destructive-background-hover", value: "#d21a26" },
      { name: "--component-button-destructive-text", value: "#ffffff" },
      { name: "--component-button-destructive-border-radius", value: "12px", noSwatch: true },
    ],
  },
  {
    label: "Input",
    tokens: [
      { name: "--component-input-background", value: "#ffffff" },
      { name: "--component-input-background-disabled", value: "#eeeeec" },
      { name: "--component-input-border", value: "#d5d5d5" },
      { name: "--component-input-border-focus", value: "#1c21dc" },
      { name: "--component-input-border-error", value: "#ff4e2a" },
      { name: "--component-input-border-disabled", value: "#b1b1b1" },
      { name: "--component-input-text", value: "#000000" },
      { name: "--component-input-text-placeholder", value: "#909090" },
      { name: "--component-input-border-radius", value: "12px", noSwatch: true },
      { name: "--component-input-padding-x", value: "1rem", noSwatch: true },
      { name: "--component-input-padding-y", value: "0.75rem", noSwatch: true },
      { name: "--component-input-font-size", value: "0.875rem", noSwatch: true },
    ],
  },
  {
    label: "Card",
    tokens: [
      { name: "--component-card-background", value: "#ffffff" },
      { name: "--component-card-border", value: "#d5d5d5" },
      { name: "--component-card-border-radius", value: "12px", noSwatch: true },
      { name: "--component-card-shadow", value: "shadow-02", noSwatch: true },
      { name: "--component-card-padding", value: "1.5rem", noSwatch: true },
      { name: "--component-card-title-color", value: "#000000" },
      { name: "--component-card-body-color", value: "#222222" },
    ],
  },
  {
    label: "Badge",
    tokens: [
      { name: "--component-badge-success-background", value: "#dcfce7" },
      { name: "--component-badge-success-text", value: "#16a34a" },
      { name: "--component-badge-success-border-radius", value: "20px", noSwatch: true },
      { name: "--component-badge-info-background", value: "#e0f2fe" },
      { name: "--component-badge-info-text", value: "#0369a1" },
      { name: "--component-badge-error-background", value: "#ffe9e5" },
      { name: "--component-badge-error-text", value: "#ff4e2a" },
      { name: "--component-badge-warning-background", value: "#fffade" },
      { name: "--component-badge-warning-text", value: "#f7d307" },
    ],
  },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

const SectionLabel: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <p style={{
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "var(--muted-foreground)",
    margin: "1.5rem 0 0.75rem",
    ...style,
  }}>{children}</p>
)

const TokenTable: React.FC<{ rows: { name: string; value: string; description?: string; noSwatch?: boolean }[] }> = ({ rows }) => (
  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
    <thead>
      <tr style={{ borderBottom: "1px solid hsl(var(--border))" }}>
        <th style={thStyle}>Token</th>
        <th style={thStyle}>Value</th>
        <th style={thStyle}>Preview</th>
        {rows.some(r => r.description) && <th style={thStyle}>Description</th>}
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr key={row.name} style={{ borderBottom: "1px solid hsl(var(--border))" }}>
          <td style={{ ...tdStyle, fontFamily: "monospace", color: "var(--muted-foreground)" }}>{row.name}</td>
          <td style={{ ...tdStyle, fontFamily: "monospace" }}>{row.value}</td>
          <td style={tdStyle}>
            {!row.noSwatch && (
              <span style={{
                display: "inline-block",
                width: 20,
                height: 20,
                borderRadius: 4,
                background: row.value,
                border: "1px solid hsl(var(--border))",
                verticalAlign: "middle",
              }} />
            )}
          </td>
          {row.description !== undefined && <td style={{ ...tdStyle, color: "var(--muted-foreground)" }}>{row.description}</td>}
        </tr>
      ))}
    </tbody>
  </table>
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

// ─── Tabs ────────────────────────────────────────────────────────────────────

const tabs = ["Color", "Typography", "Spacing", "Radius", "Shadows", "Components"] as const
type Tab = typeof tabs[number]

// ─── Main component ──────────────────────────────────────────────────────────

function DesignTokensPage() {
  const [active, setActive] = useState<Tab>("Color")

  return (
    <div style={{ padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 0.5rem" }}>Design Tokens</h1>
        <p style={{ fontSize: 14, color: "var(--muted-foreground)", margin: 0 }}>
          A three-tier system: <strong>Base</strong> (raw primitives) →{" "}
          <strong>Alias</strong> (semantic mappings) →{" "}
          <strong>Component</strong> (component-specific overrides).
          Always reference alias or component tokens in product code — never base tokens directly.
        </p>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: 4, borderBottom: "1px solid hsl(var(--border))", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            style={{
              fontSize: 13,
              fontWeight: active === tab ? 600 : 400,
              padding: "8px 16px",
              border: "none",
              borderBottom: active === tab ? "2px solid hsl(var(--foreground))" : "2px solid transparent",
              background: "transparent",
              cursor: "pointer",
              color: active === tab ? "hsl(var(--foreground))" : "var(--muted-foreground)",
              transition: "color .15s",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Color ───────────────────────────────────────────────────────────── */}
      {active === "Color" && (
        <div>
          <SectionLabel style={{ marginTop: 0 }}>Base palette</SectionLabel>
          {Object.entries(baseColors).map(([palette, swatches]) => (
            <div key={palette} style={{ marginBottom: "1.5rem" }}>
              <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{palette}</p>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {swatches.map(({ stop, value }) => (
                  <div key={stop} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: 8,
                      background: value,
                      border: "1px solid rgba(0,0,0,0.08)",
                    }} title={value} />
                    <span style={{ fontSize: 10, color: "var(--muted-foreground)" }}>{stop}</span>
                    <span style={{ fontSize: 10, color: "var(--muted-foreground)", fontFamily: "monospace" }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <SectionLabel>Alias — Text</SectionLabel>
          <TokenTable rows={aliasTextTokens} />

          <SectionLabel>Alias — Background</SectionLabel>
          <TokenTable rows={aliasBackgroundTokens} />

          <SectionLabel>Alias — Border</SectionLabel>
          <TokenTable rows={aliasBorderTokens} />

          <SectionLabel>Alias — Feedback</SectionLabel>
          <TokenTable rows={aliasFeedbackTokens} />
        </div>
      )}

      {/* ── Typography ──────────────────────────────────────────────────────── */}
      {active === "Typography" && (
        <div>
          <SectionLabel style={{ marginTop: 0 }}>Type scale</SectionLabel>
          <p style={{ fontSize: 13, color: "var(--muted-foreground)", marginBottom: "1rem" }}>
            All type uses <code>Open Sans</code>. Reference tokens via{" "}
            <code>--alias-typography-&#123;name&#125;-font-size</code> etc.
          </p>
          <div style={{ borderTop: "1px solid hsl(var(--border))" }}>
            {typographyTokens.map((t) => (
              <div
                key={t.name}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 20,
                  padding: "12px 0",
                  borderBottom: "1px solid hsl(var(--border))",
                }}
              >
                <div style={{ width: 170, flexShrink: 0 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, margin: "0 0 2px" }}>{t.name}</p>
                  <p style={{ fontSize: 11, color: "var(--muted-foreground)", margin: 0, fontFamily: "monospace" }}>
                    {t.size} · {t.weight}
                  </p>
                </div>
                <span style={{ fontSize: t.size, fontWeight: Number(t.weight), lineHeight: 1.2 }}>
                  {t.sample}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Spacing ─────────────────────────────────────────────────────────── */}
      {active === "Spacing" && (
        <div>
          <SectionLabel style={{ marginTop: 0 }}>Base spacing scale</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {spacingTokens.map((t) => (
              <div key={t.name} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 200, flexShrink: 0 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, margin: "0 0 1px", fontFamily: "monospace" }}>{t.name}</p>
                  <p style={{ fontSize: 11, color: "var(--muted-foreground)", margin: 0 }}>{t.value} / {t.px}px</p>
                </div>
                <div style={{
                  height: 20,
                  width: t.px,
                  background: "hsl(var(--primary) / 0.25)",
                  borderRadius: 3,
                  flexShrink: 0,
                }} />
              </div>
            ))}
          </div>
          <SectionLabel>Alias spacing</SectionLabel>
          <TokenTable rows={aliasSpacingTokens} />
        </div>
      )}

      {/* ── Radius ──────────────────────────────────────────────────────────── */}
      {active === "Radius" && (
        <div>
          <SectionLabel style={{ marginTop: 0 }}>Border radius</SectionLabel>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: "2rem" }}>
            {radiusTokens.map((t) => (
              <div key={t.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 72,
                  height: 72,
                  background: "hsl(var(--muted))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: t.px,
                }} />
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 12, fontWeight: 600, margin: "0 0 2px" }}>{t.label}</p>
                  <p style={{ fontSize: 11, color: "var(--muted-foreground)", margin: 0, fontFamily: "monospace" }}>{t.value}</p>
                </div>
              </div>
            ))}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 72,
                height: 72,
                background: "hsl(var(--muted))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 9999,
              }} />
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: 12, fontWeight: 600, margin: "0 0 2px" }}>full</p>
                <p style={{ fontSize: 11, color: "var(--muted-foreground)", margin: 0, fontFamily: "monospace" }}>9999px</p>
              </div>
            </div>
          </div>
          <SectionLabel>Token reference</SectionLabel>
          <TokenTable rows={radiusTokens.map(t => ({ name: t.name, value: t.value, noSwatch: true }))} />
        </div>
      )}

      {/* ── Shadows ─────────────────────────────────────────────────────────── */}
      {active === "Shadows" && (
        <div>
          <SectionLabel style={{ marginTop: 0 }}>Shadow scale</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {shadowTokens.map((t) => (
              <div key={t.name} style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{
                  width: 96,
                  height: 64,
                  flexShrink: 0,
                  borderRadius: 8,
                  background: "hsl(var(--background))",
                  boxShadow: t.value,
                  border: "1px solid hsl(var(--border) / 0.5)",
                }} />
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, margin: "0 0 3px", fontFamily: "monospace" }}>{t.name}</p>
                  <p style={{ fontSize: 11, color: "var(--muted-foreground)", margin: "0 0 4px", fontFamily: "monospace" }}>{t.value}</p>
                  <p style={{ fontSize: 12, color: "var(--muted-foreground)", margin: 0 }}>{t.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Components ──────────────────────────────────────────────────────── */}
      {active === "Components" && (
        <div>
          {componentTokenGroups.map((group) => (
            <div key={group.label}>
              <SectionLabel>{group.label}</SectionLabel>
              <TokenTable rows={group.tokens} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export const Default: Story = {
  name: "All tokens",
  render: () => <DesignTokensPage />,
}
