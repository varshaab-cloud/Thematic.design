import React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  Timeline,
  TimelineItem,
  TimelineIcon,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
} from "@/components/ui/timeline"
import {
  Upload,
  MessageCircle,
  RefreshCw,
  PlusCircle,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Circle,
} from "lucide-react"

const meta: Meta = {
  title: "Data display/Timeline",
  tags: ["!autodocs"],
  parameters: { layout: "centered" },
}
export default meta
type Story = StoryObj

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Timeline>
        <TimelineItem>
          <TimelineIcon />
          <TimelineContent>
            <TimelineTitle>File uploaded</TimelineTitle>
            <TimelineDescription>design-handoff-v3.fig was uploaded to the project.</TimelineDescription>
            <TimelineTime>2 minutes ago</TimelineTime>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineIcon />
          <TimelineContent>
            <TimelineTitle>Comment added</TimelineTitle>
            <TimelineDescription>Priya left a comment on the Button component spec.</TimelineDescription>
            <TimelineTime>14 minutes ago</TimelineTime>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineIcon />
          <TimelineContent>
            <TimelineTitle>Status changed</TimelineTitle>
            <TimelineDescription>Sprint 12 moved from In Progress to Review.</TimelineDescription>
            <TimelineTime>1 hour ago</TimelineTime>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem last>
          <TimelineIcon last />
          <TimelineContent className="pb-0">
            <TimelineTitle>Item created</TimelineTitle>
            <TimelineDescription>New milestone "Design tokens v2" was created.</TimelineDescription>
            <TimelineTime>3 hours ago</TimelineTime>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  ),
}

// ─── WithIcons ────────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Timeline>
        <TimelineItem>
          <TimelineIcon icon={<Upload />} />
          <TimelineContent>
            <TimelineTitle>File uploaded</TimelineTitle>
            <TimelineDescription>design-handoff-v3.fig was uploaded.</TimelineDescription>
            <TimelineTime>2 minutes ago</TimelineTime>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineIcon icon={<MessageCircle />} />
          <TimelineContent>
            <TimelineTitle>Comment added</TimelineTitle>
            <TimelineDescription>Priya left a comment on the Button spec.</TimelineDescription>
            <TimelineTime>14 minutes ago</TimelineTime>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineIcon icon={<RefreshCw />} />
          <TimelineContent>
            <TimelineTitle>Status changed</TimelineTitle>
            <TimelineDescription>Sprint 12 moved to Review.</TimelineDescription>
            <TimelineTime>1 hour ago</TimelineTime>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem last>
          <TimelineIcon icon={<PlusCircle />} last />
          <TimelineContent className="pb-0">
            <TimelineTitle>Item created</TimelineTitle>
            <TimelineDescription>Milestone "Design tokens v2" was created.</TimelineDescription>
            <TimelineTime>3 hours ago</TimelineTime>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  ),
}

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Timeline>
        <TimelineItem>
          <TimelineIcon variant="default" icon={<Circle />} />
          <TimelineContent>
            <TimelineTitle>Default</TimelineTitle>
            <TimelineDescription>Neutral event with no special status.</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineIcon variant="success" icon={<CheckCircle2 />} />
          <TimelineContent>
            <TimelineTitle>Success</TimelineTitle>
            <TimelineDescription>Deployment completed successfully.</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineIcon variant="error" icon={<XCircle />} />
          <TimelineContent>
            <TimelineTitle>Error</TimelineTitle>
            <TimelineDescription>Build failed with 3 errors.</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineIcon variant="warning" icon={<AlertTriangle />} />
          <TimelineContent>
            <TimelineTitle>Warning</TimelineTitle>
            <TimelineDescription>API rate limit approaching threshold.</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem last>
          <TimelineIcon variant="info" icon={<Info />} last />
          <TimelineContent className="pb-0">
            <TimelineTitle>Info</TimelineTitle>
            <TimelineDescription>Scheduled maintenance window starts in 2 hours.</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  ),
}

// ─── Compact ──────────────────────────────────────────────────────────────────

export const Compact: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Timeline compact>
        <TimelineItem>
          <TimelineIcon variant="success" />
          <TimelineContent className="pb-3">
            <div className="flex items-baseline justify-between gap-2">
              <TimelineTitle>Record created</TimelineTitle>
              <TimelineTime className="shrink-0">09:41</TimelineTime>
            </div>
            <TimelineDescription>by Priya Sharma</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineIcon variant="default" />
          <TimelineContent className="pb-3">
            <div className="flex items-baseline justify-between gap-2">
              <TimelineTitle>Field updated</TimelineTitle>
              <TimelineTime className="shrink-0">09:55</TimelineTime>
            </div>
            <TimelineDescription>Status changed to "In Review"</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineIcon variant="info" />
          <TimelineContent className="pb-3">
            <div className="flex items-baseline justify-between gap-2">
              <TimelineTitle>Comment added</TimelineTitle>
              <TimelineTime className="shrink-0">10:12</TimelineTime>
            </div>
            <TimelineDescription>by Rohan Mehta</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem last>
          <TimelineIcon variant="success" last />
          <TimelineContent className="pb-0">
            <div className="flex items-baseline justify-between gap-2">
              <TimelineTitle>Approved</TimelineTitle>
              <TimelineTime className="shrink-0">11:30</TimelineTime>
            </div>
            <TimelineDescription>by Varsha Singh</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  ),
}
