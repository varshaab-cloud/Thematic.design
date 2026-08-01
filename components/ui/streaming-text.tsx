"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// ─── TypingIndicator — three animated dots ───────────────────────────────────

export interface TypingIndicatorProps extends React.ComponentProps<"div"> {
  /** Accessible label for screen readers */
  label?: string
}

function TypingIndicator({
  label = "Assistant is typing",
  className,
  ...props
}: TypingIndicatorProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        "flex items-center gap-[var(--alias-spacing-inline-xs)] rounded-[var(--component-message-dimension-radius)] bg-[var(--component-message-assistant-color-bg)] px-[var(--alias-spacing-padding-sm)] py-[var(--alias-spacing-padding-xs)] w-fit border border-[var(--component-message-assistant-color-border)]",
        className
      )}
      {...props}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{ animationDelay: `${i * 160}ms` }}
          className="block size-[var(--component-streaming-dimension-dot-size)] rounded-full bg-[var(--component-streaming-color-dot)] animate-[bounce_1s_ease-in-out_infinite] opacity-60"
        />
      ))}
    </div>
  )
}

// ─── StreamingText — wraps text with a blinking cursor while streaming ───────

export interface StreamingTextProps extends React.ComponentProps<"span"> {
  /** Whether the stream is actively in progress */
  isStreaming?: boolean
  /** Whether the stream was stopped before completing */
  isStopped?: boolean
  /** Accessible live region label */
  liveLabel?: string
}

function StreamingText({
  isStreaming = false,
  isStopped = false,
  liveLabel = "Assistant response",
  className,
  children,
  ...props
}: StreamingTextProps) {
  return (
    <span
      aria-label={liveLabel}
      aria-live="polite"
      aria-atomic="false"
      data-streaming={isStreaming ? "true" : undefined}
      data-stopped={isStopped ? "true" : undefined}
      className={cn("relative", className)}
      {...props}
    >
      {children}
      {isStreaming && (
        <span
          aria-hidden="true"
          className="ml-0.5 inline-block h-[1em] w-0.5 translate-y-[2px] animate-[blink_1s_step-end_infinite] rounded-sm bg-[var(--component-streaming-color-cursor)]"
        />
      )}
      {isStopped && (
        <span
          className="ml-1 inline-flex items-center gap-0.5 rounded bg-[var(--alias-color-background-tertiary)] px-1 py-0.5 text-[length:var(--alias-typography-caption2-font-size)] text-[var(--alias-color-text-subtle)]"
          aria-label="Generation stopped"
        >
          stopped
        </span>
      )}
    </span>
  )
}

export { TypingIndicator, StreamingText }
