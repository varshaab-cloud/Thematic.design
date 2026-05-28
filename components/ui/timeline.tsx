import * as React from "react"
import { cn } from "@/lib/utils"

// ─── Timeline ─────────────────────────────────────────────────────────────────

type TimelineProps = React.ComponentProps<"ol"> & {
  compact?: boolean
}

function Timeline({ className, compact, children, ...props }: TimelineProps) {
  return (
    <ol
      data-slot="timeline"
      data-compact={compact || undefined}
      className={cn("flex flex-col", className)}
      {...props}
    >
      {children}
    </ol>
  )
}

// ─── TimelineItem ─────────────────────────────────────────────────────────────

type TimelineItemProps = React.ComponentProps<"li"> & {
  last?: boolean
}

function TimelineItem({ className, last, children, ...props }: TimelineItemProps) {
  return (
    <li
      data-slot="timeline-item"
      data-last={last || undefined}
      className={cn("relative flex gap-[var(--alias-spacing-stack-md)]", className)}
      {...props}
    >
      {children}
    </li>
  )
}

// ─── TimelineIcon ─────────────────────────────────────────────────────────────

type TimelineIconVariant = "default" | "success" | "error" | "warning" | "info"

type TimelineIconProps = React.ComponentProps<"div"> & {
  variant?: TimelineIconVariant
  icon?: React.ReactNode
  last?: boolean
}

const iconVariantStyles: Record<TimelineIconVariant, string> = {
  default: "bg-[var(--component-timeline-node-bg)] text-[var(--component-timeline-node-icon-color)]",
  success: "bg-[var(--component-timeline-success-node-bg)] text-[var(--component-timeline-success-node-icon-color)]",
  error:   "bg-[var(--component-timeline-error-node-bg)] text-[var(--component-timeline-error-node-icon-color)]",
  warning: "bg-[var(--component-timeline-warning-node-bg)] text-[var(--component-timeline-warning-node-icon-color)]",
  info:    "bg-[var(--component-timeline-info-node-bg)] text-[var(--component-timeline-info-node-icon-color)]",
}

function TimelineIcon({
  className,
  variant = "default",
  icon,
  last,
  ...props
}: TimelineIconProps) {
  return (
    <div
      data-slot="timeline-icon"
      className={cn("relative flex shrink-0 flex-col items-center", className)}
      {...props}
    >
      <div
        className={cn(
          "relative z-10 flex size-8 items-center justify-center rounded-[var(--component-timeline-node-border-radius)] text-[length:var(--alias-typography-body-text2-font-size)] [&_svg]:size-4 [&_svg]:shrink-0",
          iconVariantStyles[variant]
        )}
      >
        {icon ?? (
          <span className="size-2 rounded-full bg-current opacity-60" />
        )}
      </div>
      {!last && (
        <div className="mt-1 w-px flex-1 bg-[var(--component-timeline-connector-color)]" />
      )}
    </div>
  )
}

// ─── TimelineContent ──────────────────────────────────────────────────────────

function TimelineContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-content"
      className={cn("flex flex-1 flex-col gap-0.5 pb-6", className)}
      {...props}
    />
  )
}

// ─── TimelineTitle ────────────────────────────────────────────────────────────

function TimelineTitle({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="timeline-title"
      className={cn("text-[length:var(--alias-typography-body-text2-font-size)] font-[number:var(--base-font-weight-medium)] leading-none text-[var(--component-timeline-title-text)]", className)}
      {...props}
    />
  )
}

// ─── TimelineDescription ─────────────────────────────────────────────────────

function TimelineDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="timeline-description"
      className={cn("text-[length:var(--alias-typography-body-text2-font-size)] text-[var(--component-timeline-description-text)]", className)}
      {...props}
    />
  )
}

// ─── TimelineTime ─────────────────────────────────────────────────────────────

function TimelineTime({ className, ...props }: React.ComponentProps<"time">) {
  return (
    <time
      data-slot="timeline-time"
      className={cn("text-[length:var(--alias-typography-caption1-font-size)] text-[var(--component-timeline-timestamp-text)]", className)}
      {...props}
    />
  )
}

export {
  Timeline,
  TimelineItem,
  TimelineIcon,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
}
