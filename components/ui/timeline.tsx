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
      className={cn("relative flex gap-4", className)}
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
  default: "bg-[var(--base-color-gray-200)] text-[var(--base-color-gray-600)]",
  success: "bg-[var(--alias-color-feedback-success-bg)] text-[var(--alias-color-feedback-success-fg)]",
  error:   "bg-[var(--alias-color-feedback-error-bg)] text-[var(--alias-color-feedback-error-fg)]",
  warning: "bg-[var(--alias-color-feedback-warning-bg)] text-[var(--alias-color-feedback-warning-fg)]",
  info:    "bg-[var(--base-color-blue-100)] text-[var(--base-color-blue-800)]",
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
          "relative z-10 flex size-8 items-center justify-center rounded-full text-sm [&_svg]:size-4 [&_svg]:shrink-0",
          iconVariantStyles[variant]
        )}
      >
        {icon ?? (
          <span className="size-2 rounded-full bg-current opacity-60" />
        )}
      </div>
      {!last && (
        <div className="mt-1 w-px flex-1 bg-[var(--base-color-gray-200)]" />
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
      className={cn("text-sm font-medium leading-none text-[var(--alias-color-text-primary)]", className)}
      {...props}
    />
  )
}

// ─── TimelineDescription ─────────────────────────────────────────────────────

function TimelineDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="timeline-description"
      className={cn("text-sm text-[var(--alias-color-text-subtle)]", className)}
      {...props}
    />
  )
}

// ─── TimelineTime ─────────────────────────────────────────────────────────────

function TimelineTime({ className, ...props }: React.ComponentProps<"time">) {
  return (
    <time
      data-slot="timeline-time"
      className={cn("text-xs text-[var(--alias-color-text-subtle)]", className)}
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
