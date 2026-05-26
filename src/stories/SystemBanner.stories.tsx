import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"
import { SystemBanner } from "../../components/ui/system-banner"

// ─── System banner stories ────────────────────────────────────────────────────
// Full-width page-level notification bar — session or account-scope events only.

const meta: Meta<typeof SystemBanner> = {
  title: "Messaging/System banner",
  component: SystemBanner,
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "warning", "error", "success"],
      description:
        "Semantic variant. Determines the background colour, icon, and ARIA live region urgency.",
    },
  },
}

export default meta
type Story = StoryObj<typeof SystemBanner>

// ─── States — all variants stacked ───────────────────────────────────────────

export const States: Story = {
  name: "States",
  render: () => (
    <div className="flex flex-col gap-0 w-full">
      <SystemBanner
        variant="info"
        action={
          <a href="#" className="underline underline-offset-2 hover:opacity-80 text-[var(--alias-color-feedback-info-fg)]">
            Learn more
          </a>
        }
      >
        We&apos;re performing scheduled maintenance on Sunday 2–4 AM UTC.
      </SystemBanner>
      <SystemBanner
        variant="warning"
        action={
          <a href="#" className="underline underline-offset-2 hover:opacity-80 text-[var(--base-color-gray-900)]">
            Upgrade now
          </a>
        }
      >
        Your trial ends in 3 days. Upgrade to keep access.
      </SystemBanner>
      <SystemBanner
        variant="error"
        action={
          <a href="#" className="underline underline-offset-2 hover:opacity-80 text-[var(--alias-color-feedback-error-fg)]">
            Status page
          </a>
        }
      >
        We&apos;re experiencing an issue with payment processing. Our team is investigating.
      </SystemBanner>
      <SystemBanner variant="success">
        You&apos;re on the latest version.
      </SystemBanner>
    </div>
  ),
}

// ─── Info — maintenance notice ────────────────────────────────────────────────

export const InfoBanner: Story = {
  name: "Info",
  render: () => (
    <SystemBanner
      variant="info"
      action={
        <a href="#" className="underline underline-offset-2 hover:opacity-80 text-[var(--alias-color-feedback-info-fg)]">
          Learn more
        </a>
      }
    >
      We&apos;re performing scheduled maintenance on Sunday 2–4 AM UTC.
    </SystemBanner>
  ),
}

// ─── Warning — trial expiry ───────────────────────────────────────────────────

export const Warning: Story = {
  render: () => (
    <SystemBanner
      variant="warning"
      action={
        <button
          type="button"
          className="rounded border border-[var(--base-color-gray-900)] px-3 py-0.5 text-xs font-medium text-[var(--base-color-gray-900)] hover:bg-black/5 transition-colors"
        >
          Upgrade now
        </button>
      }
    >
      Your trial ends in 3 days. Upgrade to keep access.
    </SystemBanner>
  ),
}

// ─── Error — service degradation, dismissible ────────────────────────────────

export const Error: Story = {
  render: () => {
    const [dismissed, setDismissed] = useState(false)
    if (dismissed) {
      return (
        <p className="text-sm text-muted-foreground italic">Banner dismissed.</p>
      )
    }
    return (
      <SystemBanner
        variant="error"
        action={
          <a href="#" className="underline underline-offset-2 hover:opacity-80 text-[var(--alias-color-feedback-error-fg)]">
            Status page
          </a>
        }
        onDismiss={() => setDismissed(true)}
      >
        We&apos;re experiencing an issue with payment processing. Our team is investigating.
      </SystemBanner>
    )
  },
}

// ─── Success — dismissible ────────────────────────────────────────────────────

export const Success: Story = {
  render: () => {
    const [dismissed, setDismissed] = useState(false)
    if (dismissed) {
      return (
        <p className="text-sm text-muted-foreground italic">Banner dismissed.</p>
      )
    }
    return (
      <SystemBanner variant="success" onDismiss={() => setDismissed(true)}>
        You&apos;re on the latest version.
      </SystemBanner>
    )
  },
}

// ─── Without dismiss ──────────────────────────────────────────────────────────

export const WithoutDismiss: Story = {
  render: () => (
    <SystemBanner
      variant="info"
      action={
        <a href="#" className="underline underline-offset-2 hover:opacity-80 text-[var(--alias-color-feedback-info-fg)]">
          Learn more
        </a>
      }
    >
      We&apos;re performing scheduled maintenance on Sunday 2–4 AM UTC.
    </SystemBanner>
  ),
}

// ─── Without action or dismiss ───────────────────────────────────────────────

export const WithoutAction: Story = {
  render: () => (
    <SystemBanner variant="warning">
      Your trial ends in 3 days. Upgrade to keep access.
    </SystemBanner>
  ),
}
