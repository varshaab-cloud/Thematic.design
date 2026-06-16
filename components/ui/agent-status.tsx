"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2, Check, AlertCircle, ChevronDown, ChevronRight } from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

type AgentStatusState = "thinking" | "tool-running" | "done" | "error"

const containerVariants = cva(
  "flex w-fit flex-col rounded-[var(--component-agentstatus-dimension-radius)] border px-[var(--component-agentstatus-dimension-padding)] py-[var(--alias-spacing-padding-xs)]",
  {
    variants: {
      state: {
        thinking:    "border-[var(--component-agentstatus-color-border)] bg-[var(--component-agentstatus-color-bg)]",
        "tool-running": "border-[var(--component-agentstatus-color-border)] bg-[var(--component-agentstatus-color-bg)]",
        done:        "border-[var(--alias-color-border-success)] bg-[var(--alias-color-feedback-success-bg)]",
        error:       "border-[var(--alias-color-border-error)] bg-[var(--alias-color-feedback-error-bg)]",
      },
    },
    defaultVariants: { state: "thinking" },
  }
)

// ─── Props ───────────────────────────────────────────────────────────────────

export interface AgentStatusProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof containerVariants> {
  /** Current status (required for honest label) */
  state?: AgentStatusState
  /** Human-readable label — must be specific. E.g. "Searching the web", "Calling get_weather" */
  label: string
  /** Tool name or detail shown in expandable section */
  detail?: string
  /** Whether the detail panel is expandable */
  expandable?: boolean
}

// ─── Icon map ────────────────────────────────────────────────────────────────

function StatusIcon({ state }: { state: AgentStatusState }) {
  if (state === "done")
    return <Check className="size-4 text-[var(--alias-color-feedback-success-fg)]" aria-hidden="true" />
  if (state === "error")
    return <AlertCircle className="size-4 text-[var(--alias-color-feedback-error-fg)]" aria-hidden="true" />
  return (
    <Loader2
      className="size-4 animate-spin text-[var(--component-agentstatus-color-icon)]"
      aria-hidden="true"
    />
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

function AgentStatus({
  state = "thinking",
  label,
  detail,
  expandable = false,
  className,
  ...props
}: AgentStatusProps) {
  const [open, setOpen] = React.useState(false)

  const isActive = state === "thinking" || state === "tool-running"

  const textColor =
    state === "done"
      ? "text-[var(--alias-color-feedback-success-fg)]"
      : state === "error"
      ? "text-[var(--alias-color-feedback-error-fg)]"
      : "text-[var(--component-agentstatus-color-text)]"

  return (
    <div
      data-slot="agent-status"
      data-state={state}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={label}
      className={cn(containerVariants({ state }), "gap-[var(--alias-spacing-stack-xs)]", className)}
      {...props}
    >
      {/* Header row */}
      <div className="flex items-center gap-[var(--alias-spacing-inline-sm)]">
        <StatusIcon state={state} />

        <span className={cn("text-[length:var(--alias-typography-body-text2-font-size)] font-medium", textColor)}>
          {label}
        </span>

        {expandable && detail && (
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Hide details" : "Show details"}
            onClick={() => setOpen((o) => !o)}
            className="ml-auto rounded-[var(--alias-radius-sm)] p-0.5 hover:bg-[var(--alias-color-background-tertiary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--alias-color-border-active)]"
          >
            {open
              ? <ChevronDown className="size-3.5 text-[var(--alias-color-icon-secondary)]" aria-hidden="true" />
              : <ChevronRight className="size-3.5 text-[var(--alias-color-icon-secondary)]" aria-hidden="true" />
            }
          </button>
        )}
      </div>

      {/* Expandable detail */}
      {expandable && open && detail && (
        <div className="rounded-[var(--alias-radius-sm)] bg-[var(--component-agentstatus-color-detail-bg)] px-[var(--alias-spacing-padding-xs)] py-1.5">
          <pre className="whitespace-pre-wrap break-all text-[length:var(--alias-typography-body-text3-font-size)] text-[var(--alias-color-text-subtle)] font-mono">
            {detail}
          </pre>
        </div>
      )}
    </div>
  )
}

export { AgentStatus }
export type { AgentStatusState }
