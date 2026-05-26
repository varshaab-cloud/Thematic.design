import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SearchX, FolderOpen, Inbox, AlertCircle } from "lucide-react"
import { EmptyState } from "../../components/ui/empty-state"
import { Button } from "../../components/ui/button"

// ─── EmptyState stories ───────────────────────────────────────────────────────
// All sizes demonstrated. Icons use --alias-color-icon-secondary by default.
// Override icon colour inline when semantic meaning requires it (e.g. error red).

const meta: Meta<typeof EmptyState> = {
  title: "Data display/Empty state",
  component: EmptyState,
}

export default meta
type Story = StoryObj<typeof EmptyState>

// ─── States — all three sizes side by side ────────────────────────────────────

export const States: Story = {
  name: "States",
  render: () => (
    <div className="flex flex-row items-start justify-center gap-10 flex-wrap p-8">
      <div className="flex flex-col items-center gap-3">
        <span
          style={{
            fontSize: "11px",
            fontWeight: 500,
            color: "var(--alias-color-text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          sm
        </span>
        <EmptyState
          size="sm"
          icon={<FolderOpen style={{ width: "32px", height: "32px" }} />}
          heading="No documents"
          description="Upload a document to get started."
        />
      </div>

      <div className="flex flex-col items-center gap-3">
        <span
          style={{
            fontSize: "11px",
            fontWeight: 500,
            color: "var(--alias-color-text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          md
        </span>
        <EmptyState
          size="md"
          icon={<SearchX style={{ width: "48px", height: "48px" }} />}
          heading="No results found"
          description="Try adjusting your search or filters to find what you're looking for."
        />
      </div>

      <div className="flex flex-col items-center gap-3">
        <span
          style={{
            fontSize: "11px",
            fontWeight: 500,
            color: "var(--alias-color-text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          lg
        </span>
        <EmptyState
          size="lg"
          icon={<Inbox style={{ width: "64px", height: "64px" }} />}
          heading="Your inbox is empty"
          description="Messages from your team will appear here."
        />
      </div>
    </div>
  ),
}

// ─── Default — search returns no results ─────────────────────────────────────

export const Default: Story = {
  render: () => (
    <div className="flex items-center justify-center p-12">
      <EmptyState
        size="md"
        icon={<SearchX style={{ width: "48px", height: "48px" }} />}
        heading="No results found"
        description="Try adjusting your search or filters to find what you're looking for."
        action={<Button variant="outline">Clear filters</Button>}
      />
    </div>
  ),
}

// ─── SmallInline — used inside cards and panels ───────────────────────────────

export const SmallInline: Story = {
  name: "SmallInline",
  render: () => (
    <div className="flex items-center justify-center p-8">
      <EmptyState
        size="sm"
        icon={<FolderOpen style={{ width: "32px", height: "32px" }} />}
        heading="No documents"
        description="Upload a document to get started."
        action={<Button size="sm">Upload</Button>}
      />
    </div>
  ),
}

// ─── LargeFullPage — top-level page with no content ──────────────────────────

export const LargeFullPage: Story = {
  name: "LargeFullPage",
  render: () => (
    <div className="flex items-center justify-center p-16">
      <EmptyState
        size="lg"
        icon={<Inbox style={{ width: "64px", height: "64px" }} />}
        heading="Your inbox is empty"
        description="Messages from your team will appear here."
        action={<Button>Invite teammates</Button>}
      />
    </div>
  ),
}

// ─── NoIcon — when no visual metaphor fits ────────────────────────────────────

export const NoIcon: Story = {
  name: "NoIcon",
  render: () => (
    <div className="flex items-center justify-center p-12">
      <EmptyState
        size="md"
        heading="Nothing here yet"
        description="Create your first project to get started."
      />
    </div>
  ),
}

// ─── NoAction — informational only, no recovery path needed ──────────────────

export const NoAction: Story = {
  name: "NoAction",
  render: () => (
    <div className="flex items-center justify-center p-12">
      <EmptyState
        size="md"
        icon={<Inbox style={{ width: "48px", height: "48px" }} />}
        heading="Your inbox is empty"
        description="Messages from your team will appear here."
      />
    </div>
  ),
}

// ─── WithError — data failed to load, user can retry ─────────────────────────

export const WithError: Story = {
  name: "WithError",
  render: () => (
    <div className="flex items-center justify-center p-12">
      <EmptyState
        size="md"
        icon={
          <AlertCircle
            style={{
              width: "48px",
              height: "48px",
              color: "var(--alias-color-feedback-error-fg)",
            }}
          />
        }
        heading="Something went wrong"
        description="We couldn't load your data. Please try again."
        action={<Button>Retry</Button>}
      />
    </div>
  ),
}
