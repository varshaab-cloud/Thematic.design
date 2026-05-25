import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Alert, AlertDescription, AlertTitle, AlertAction } from "../../components/ui/alert"
import { AlertCircle, Info as InfoIcon, CheckCircle2, AlertTriangle, X } from "lucide-react"
import { Button } from "../../components/ui/button"

// ─── Alert stories ────────────────────────────────────────────────────────────
// All variants use alias tokens — no raw colour values anywhere.
// Copy follows the three-part rule: diagnose / explain / recover.

const meta: Meta<typeof Alert> = {
  title: "Messaging/Alert",
  component: Alert,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error", "destructive", "warning", "success", "info"],
      description:
        "Semantic variant. Use `error` for failure states, `destructive` for irreversible-action warnings, `warning` for caution states, `success` for confirmations, `info` for neutral context.",
    },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Variants: Story = {
  name: "Variants",
  render: () => (
    <div className="flex flex-col gap-3 max-w-lg">
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Maintenance scheduled</AlertTitle>
        <AlertDescription>
          Thematic will be unavailable on Sunday 1 June from 02:00–04:00 UTC for a planned infrastructure upgrade.
        </AlertDescription>
      </Alert>
      <Alert variant="info">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Workspace URL can't be changed after setup</AlertTitle>
        <AlertDescription>
          Choose a URL that reflects your team or company name. It's permanent and will appear in all shared links.
        </AlertDescription>
      </Alert>
      <Alert variant="success">
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>Workspace settings saved</AlertTitle>
        <AlertDescription>
          Your changes are live. Team members will see the updated settings the next time they sign in.
        </AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Removing a member can't be undone</AlertTitle>
        <AlertDescription>
          They'll lose access to all 12 projects immediately. Download their activity log first if you need a record.
        </AlertDescription>
      </Alert>
      <Alert variant="error">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Changes couldn't be saved</AlertTitle>
        <AlertDescription>
          The workspace settings failed to update because of a connection issue. Check your connection and try again.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>This will permanently delete your workspace</AlertTitle>
        <AlertDescription>
          All projects, members, and data will be removed and cannot be recovered. This action cannot be undone.
        </AlertDescription>
      </Alert>
    </div>
  ),
}

// ─── Error — something has failed ────────────────────────────────────────────
// Use when: API error, form submission failed, connection lost.
// Copy rule: diagnose → explain → recover.

export const Error: Story = {
  render: () => (
    <Alert variant="error" className="max-w-lg">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Changes couldn't be saved</AlertTitle>
      <AlertDescription>
        The workspace settings failed to update because of a connection issue.
        Check your connection and try again, or contact support if the problem
        continues.
      </AlertDescription>
    </Alert>
  ),
}

// ─── Warning — attention required, hasn't failed ─────────────────────────────
// Use when: action has significant consequences, quota is approaching, config is unusual.
// Copy rule: state what will happen → what the user should know → optional resolution.

export const Warning: Story = {
  render: () => (
    <Alert variant="warning" className="max-w-lg">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Removing a member can't be undone</AlertTitle>
      <AlertDescription>
        They'll lose access to all 12 projects immediately. Download their
        activity log first if you need a record before removing them.
      </AlertDescription>
    </Alert>
  ),
}

// ─── Success — action completed ───────────────────────────────────────────────
// Use when: save confirmed, invite sent, export ready.
// Copy rule: confirm what happened → set expectations (what's next or where to look).

export const Success: Story = {
  render: () => (
    <Alert variant="success" className="max-w-lg">
      <CheckCircle2 className="h-4 w-4" />
      <AlertTitle>Workspace settings saved</AlertTitle>
      <AlertDescription>
        Your changes are live. Team members will see the updated settings the
        next time they sign in.
      </AlertDescription>
    </Alert>
  ),
}

// ─── Info — neutral context ───────────────────────────────────────────────────
// Use when: feature explanation, non-urgent notice, onboarding hint.

export const Info: Story = {
  render: () => (
    <Alert variant="info" className="max-w-lg">
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Workspace URL can't be changed after setup</AlertTitle>
      <AlertDescription>
        Choose a URL that reflects your team or company name. It's permanent
        and will appear in all shared links.
      </AlertDescription>
    </Alert>
  ),
}

// ─── Default — neutral, no strong semantic colour ─────────────────────────────

export const Default: Story = {
  render: () => (
    <Alert className="max-w-lg">
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Maintenance scheduled</AlertTitle>
      <AlertDescription>
        Thematic will be unavailable on Sunday 1 June from 02:00–04:00 UTC for
        a planned infrastructure upgrade.
      </AlertDescription>
    </Alert>
  ),
}

// ─── Destructive — irreversible-action warning ────────────────────────────────

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="max-w-lg">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>This will permanently delete your workspace</AlertTitle>
      <AlertDescription>
        All projects, members, and data will be removed and cannot be recovered.
        This action cannot be undone.
      </AlertDescription>
    </Alert>
  ),
}

// ─── With dismiss action ──────────────────────────────────────────────────────

export const WithAction: Story = {
  name: "With dismiss action",
  render: () => (
    <Alert variant="warning" className="max-w-lg">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Your trial ends in 3 days</AlertTitle>
      <AlertDescription>
        Add a payment method to keep access to your projects and team members
        after the trial expires.
      </AlertDescription>
      <AlertAction>
        <Button variant="ghost" size="icon-sm" aria-label="Dismiss">
          <X className="h-4 w-4" />
        </Button>
      </AlertAction>
    </Alert>
  ),
}

// ─── All variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-lg">
      <Alert variant="info">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>
          Workspace URL can't be changed after setup.
        </AlertDescription>
      </Alert>
      <Alert variant="success">
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Workspace settings saved. Changes are live.
        </AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Removing a member can't be undone.
        </AlertDescription>
      </Alert>
      <Alert variant="error">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Changes couldn't be saved — check your connection and try again.
        </AlertDescription>
      </Alert>
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>
          Maintenance scheduled for Sunday 1 June, 02:00–04:00 UTC.
        </AlertDescription>
      </Alert>
    </div>
  ),
}
