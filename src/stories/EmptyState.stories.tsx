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

const SizeChip = ({ label }: { label: string }) => (
  <span
    style={{
      display: "inline-block",
      fontSize: "11px",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.07em",
      padding: "2px 10px",
      borderRadius: "20px",
      background: "var(--alias-color-feedback-info-bg)",
      color: "var(--alias-color-feedback-info-fg)",
    }}
  >
    {label}
  </span>
)

export const States: Story = {
  name: "States",
  render: () => (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "center", gap: 48, flexWrap: "wrap", padding: 40 }}>
      <div className="flex flex-col items-center gap-4">
        <SizeChip label="SM" />
        <EmptyState
          size="sm"
          icon={<FolderOpen style={{ width: "32px", height: "32px" }} />}
          heading="No documents"
          description="Upload a document to get started."
        />
      </div>

      <div style={{ width: 1, background: "var(--alias-color-border-default)", alignSelf: "stretch", flexShrink: 0 }} />

      <div className="flex flex-col items-center gap-4">
        <SizeChip label="MD" />
        <EmptyState
          size="md"
          icon={<SearchX style={{ width: "48px", height: "48px" }} />}
          heading="No results found"
          description="Try adjusting your search or filters to find what you're looking for."
        />
      </div>

      <div style={{ width: 1, background: "var(--alias-color-border-default)", alignSelf: "stretch", flexShrink: 0 }} />

      <div className="flex flex-col items-center gap-4">
        <SizeChip label="LG" />
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
