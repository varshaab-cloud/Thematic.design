import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { WrenchIcon } from "lucide-react"
import { Button } from "../../components/ui/button"

// ─── Error page templates ─────────────────────────────────────────────────────
// Full-viewport standalone page layouts. No SidebarNav.
// Built inline with divs, Tailwind classes, and token-based inline styles.

const meta: Meta = {
  title: "Pages/Error pages",
}

export default meta
type Story = StoryObj

// ─── Shared logo mark ─────────────────────────────────────────────────────────

function LogoMark() {
  return (
    <div
      style={{
        width: 24,
        height: 24,
        borderRadius: 6,
        background: "var(--base-color-blue-800)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span style={{ color: "white", fontWeight: 700, fontSize: 11, lineHeight: 1 }}>T</span>
    </div>
  )
}

// ─── 404 Not found ────────────────────────────────────────────────────────────

export const NotFound: Story = {
  name: "404 — Not found",
  render: () => (
    <div
      role="main"
      style={{
        minHeight: "100vh",
        background: "var(--alias-color-background-primary)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        fontFamily: "var(--base-font-family-primary)",
      }}
    >
      {/* Logo mark */}
      <div style={{ position: "absolute", top: 24, left: 24 }}>
        <LogoMark />
      </div>

      {/* Error number */}
      <p
        aria-hidden="true"
        style={{
          fontSize: 120,
          fontWeight: 700,
          lineHeight: 1,
          color: "var(--base-color-blue-100)",
          margin: "0 0 24px",
          letterSpacing: "-2px",
          userSelect: "none",
        }}
      >
        404
      </p>

      {/* Heading */}
      <h1
        style={{
          fontSize: 28,
          fontWeight: 700,
          lineHeight: 1.25,
          color: "var(--alias-color-text-primary)",
          margin: "0 0 12px",
          textAlign: "center",
        }}
      >
        Page not found
      </h1>

      {/* Description */}
      <p
        style={{
          fontSize: 15,
          lineHeight: 1.6,
          color: "var(--alias-color-text-tertiary)",
          maxWidth: 440,
          textAlign: "center",
          margin: "0 0 32px",
        }}
      >
        The page you're looking for doesn't exist or has been moved. Check the URL or go back to the dashboard.
      </p>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Button>Go to dashboard</Button>
        <Button variant="ghost">Go back</Button>
      </div>
    </div>
  ),
}

// ─── 500 Server error ─────────────────────────────────────────────────────────

export const ServerError: Story = {
  name: "500 — Server error",
  render: () => (
    <div
      role="main"
      style={{
        minHeight: "100vh",
        background: "var(--alias-color-background-primary)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        fontFamily: "var(--base-font-family-primary)",
      }}
    >
      {/* Logo mark */}
      <div style={{ position: "absolute", top: 24, left: 24 }}>
        <LogoMark />
      </div>

      {/* Error number */}
      <p
        aria-hidden="true"
        style={{
          fontSize: 120,
          fontWeight: 700,
          lineHeight: 1,
          color: "var(--base-color-red-100)",
          margin: "0 0 24px",
          letterSpacing: "-2px",
          userSelect: "none",
        }}
      >
        500
      </p>

      {/* Heading */}
      <h1
        style={{
          fontSize: 28,
          fontWeight: 700,
          lineHeight: 1.25,
          color: "var(--alias-color-text-primary)",
          margin: "0 0 12px",
          textAlign: "center",
        }}
      >
        Something went wrong
      </h1>

      {/* Description */}
      <p
        style={{
          fontSize: 15,
          lineHeight: 1.6,
          color: "var(--alias-color-text-tertiary)",
          maxWidth: 440,
          textAlign: "center",
          margin: "0 0 32px",
        }}
      >
        We're having trouble on our end. Our team has been notified and is working on a fix. Please try again in a few minutes.
      </p>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <Button>Try again</Button>
        <Button variant="ghost">Go to dashboard</Button>
      </div>

      {/* Support note */}
      <p
        style={{
          fontSize: 13,
          color: "var(--alias-color-text-tertiary)",
          margin: 0,
        }}
      >
        If the problem persists,{" "}
        <span
          style={{
            color: "var(--alias-color-text-brand)",
            cursor: "pointer",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
          }}
        >
          contact support
        </span>
      </p>
    </div>
  ),
}

// ─── Maintenance ──────────────────────────────────────────────────────────────

export const Maintenance: Story = {
  name: "Maintenance",
  render: () => (
    <div
      role="main"
      style={{
        minHeight: "100vh",
        background: "var(--alias-color-background-primary)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        fontFamily: "var(--base-font-family-primary)",
      }}
    >
      {/* Logo mark */}
      <div style={{ position: "absolute", top: 24, left: 24 }}>
        <LogoMark />
      </div>

      {/* Wrench icon */}
      <div
        aria-hidden="true"
        style={{
          width: 64,
          height: 64,
          color: "var(--alias-color-icon-secondary)",
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <WrenchIcon style={{ width: 64, height: 64 }} />
      </div>

      {/* Heading */}
      <h1
        style={{
          fontSize: 28,
          fontWeight: 700,
          lineHeight: 1.25,
          color: "var(--alias-color-text-primary)",
          margin: "0 0 12px",
          textAlign: "center",
        }}
      >
        Under maintenance
      </h1>

      {/* Description */}
      <p
        style={{
          fontSize: 15,
          lineHeight: 1.6,
          color: "var(--alias-color-text-tertiary)",
          maxWidth: 440,
          textAlign: "center",
          margin: "0 0 24px",
        }}
      >
        We're making some improvements. We'll be back shortly. Thank you for your patience.
      </p>

      {/* Time estimate */}
      <p
        style={{
          fontSize: 13,
          color: "var(--alias-color-text-tertiary)",
          margin: 0,
        }}
      >
        Expected back in ~2 hours
      </p>
    </div>
  ),
}
