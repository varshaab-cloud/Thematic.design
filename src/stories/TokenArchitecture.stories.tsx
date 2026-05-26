import type { Meta, StoryObj } from "@storybook/react"
import React from "react"

const meta: Meta = {
  title: "Thematic design system/Foundation/Design Tokens/Token Architecture",
  parameters: {
    layout: "fullscreen",
    docs: { page: null },
  },
}

export default meta
type Story = StoryObj

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

function TokenArchitecturePage() {
  return (
    <div style={{ padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
      <div style={{ marginBottom: "1.75rem" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 0.5rem" }}>Token Architecture</h1>
        <p style={{ fontSize: 14, color: "var(--muted-foreground)", margin: 0, maxWidth: 680, lineHeight: 1.6 }}>
          Tokens follow a three-tier model. Each tier has a clear role — base tokens are never used directly in
          components; always reach for an alias or component token instead.
        </p>
      </div>

      {/* Three-tier diagram */}
      <div style={{ display: "flex", gap: 0, marginBottom: "2.5rem", alignItems: "stretch" }}>
        {[
          {
            tier: "01",
            label: "Base",
            color: "#f0f0ff",
            border: "#c4c5f4",
            text: "#111487",
            description: "Raw primitive values. The source of truth for every value in the system — colors, sizes, weights, radii.",
            examples: ["--base-color-blue-800", "--base-font-size-300", "--base-spacing-4", "--base-radius-md"],
            rule: "Never reference in product code.",
          },
          {
            tier: "02",
            label: "Alias",
            color: "#f0fff4",
            border: "#86efac",
            text: "#166534",
            description: "Semantic mappings from base. Named by purpose, not by value — so they survive theme changes.",
            examples: ["--alias-color-text-primary", "--alias-color-background-brand", "--alias-color-feedback-error-fg", "--alias-spacing-padding-md"],
            rule: "Use in layout, typography, and generic UI.",
          },
          {
            tier: "03",
            label: "Component",
            color: "#fffbeb",
            border: "#fcd34d",
            text: "#92400e",
            description: "Component-scoped overrides. Only set when a component needs a value that deviates from alias defaults.",
            examples: ["--component-button-primary-background", "--component-input-border-focus", "--component-card-shadow", "--component-badge-success-text"],
            rule: "Use only within that component's styles.",
          },
        ].map((tier, i, arr) => (
          <div
            key={tier.label}
            style={{
              flex: 1,
              background: tier.color,
              border: `1px solid ${tier.border}`,
              borderRadius: i === 0 ? "12px 0 0 12px" : i === arr.length - 1 ? "0 12px 12px 0" : 0,
              padding: "1.25rem 1.25rem 1.5rem",
              borderLeft: i > 0 ? "none" : undefined,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: tier.text,
                background: "rgba(0,0,0,0.07)",
                borderRadius: 4,
                padding: "2px 7px",
              }}>{tier.tier}</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: tier.text }}>{tier.label}</span>
            </div>
            <p style={{ fontSize: 13, color: tier.text, lineHeight: 1.5, marginBottom: 14 }}>{tier.description}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 14 }}>
              {tier.examples.map(ex => (
                <code key={ex} style={{
                  fontSize: 11,
                  background: "rgba(0,0,0,0.07)",
                  borderRadius: 4,
                  padding: "2px 6px",
                  color: tier.text,
                  display: "block",
                }}>{ex}</code>
              ))}
            </div>
            <p style={{
              fontSize: 11,
              fontWeight: 600,
              color: tier.text,
              borderTop: `1px solid ${tier.border}`,
              paddingTop: 10,
              margin: 0,
            }}>→ {tier.rule}</p>
          </div>
        ))}
      </div>

      {/* Flow label */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "2.5rem" }}>
        <div style={{ flex: 1, height: 1, background: "hsl(var(--border))" }} />
        <span style={{ fontSize: 12, color: "var(--muted-foreground)", whiteSpace: "nowrap" }}>
          Base values flow into Alias → Alias values flow into Component tokens
        </span>
        <div style={{ flex: 1, height: 1, background: "hsl(var(--border))" }} />
      </div>

      {/* Naming convention */}
      <SectionLabel style={{ marginTop: 0 }}>Naming convention</SectionLabel>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid hsl(var(--border))" }}>
            <th style={thStyle}>Tier</th>
            <th style={thStyle}>Pattern</th>
            <th style={thStyle}>Example</th>
          </tr>
        </thead>
        <tbody>
          {[
            { tier: "Base", pattern: "--base-{category}-{name}-{stop}", example: "--base-color-blue-800" },
            { tier: "Base", pattern: "--base-{category}-{name}", example: "--base-spacing-4" },
            { tier: "Alias", pattern: "--alias-{category}-{role}-{variant}", example: "--alias-color-text-primary" },
            { tier: "Alias", pattern: "--alias-{category}-{role}-{size}", example: "--alias-spacing-padding-md" },
            { tier: "Component", pattern: "--component-{name}-{variant}-{property}", example: "--component-button-primary-background" },
            { tier: "Component", pattern: "--component-{name}-{property}", example: "--component-card-border-radius" },
          ].map((row, i) => (
            <tr key={i} style={{ borderBottom: "1px solid hsl(var(--border))" }}>
              <td style={tdStyle}>{row.tier}</td>
              <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: 12, color: "var(--muted-foreground)" }}>{row.pattern}</td>
              <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: 12 }}>{row.example}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* When to use each tier */}
      <SectionLabel>When to use each tier</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {[
          {
            title: "Use alias tokens for…",
            color: "#dcfce7",
            border: "#86efac",
            textColor: "#166534",
            items: [
              "Page backgrounds and surfaces",
              "Body and heading text colour",
              "Icon colours",
              "Generic border colours",
              "Layout spacing and padding",
            ],
          },
          {
            title: "Use component tokens for…",
            color: "#e0f2fe",
            border: "#7dd3fc",
            textColor: "#075985",
            items: [
              "Hover and active state overrides",
              "Focus ring colours on specific inputs",
              "Component-specific border radii",
              "Shadow values unique to a component",
              "Any value that differs from the alias default",
            ],
          },
          {
            title: "Use base tokens for…",
            color: "#fffade",
            border: "#fcd34d",
            textColor: "#92400e",
            items: [
              "Defining alias token values (in tokens.css only)",
              "Design tool references (Figma variables)",
              "Nothing else — do not use in product code",
            ],
          },
          {
            title: "Never do this",
            color: "#ffe9e5",
            border: "#fca5a5",
            textColor: "#991b1b",
            items: [
              "Hardcode hex values in component styles",
              "Reference --base-* tokens in component CSS",
              "Create component tokens for values already in alias",
              "Skip a tier (base → component directly)",
            ],
          },
        ].map((card) => (
          <div
            key={card.title}
            style={{
              background: card.color,
              border: `1px solid ${card.border}`,
              borderRadius: 10,
              padding: "1rem 1.125rem",
            }}
          >
            <p style={{ fontSize: 13, fontWeight: 700, color: card.textColor, marginBottom: 10 }}>{card.title}</p>
            <ul style={{ paddingLeft: 16, margin: 0, display: "flex", flexDirection: "column", gap: 4 }}>
              {card.items.map(item => (
                <li key={item} style={{ fontSize: 12, color: card.textColor, lineHeight: 1.5 }}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Default: Story = {
  name: "Token Architecture",
  render: () => <TokenArchitecturePage />,
}
