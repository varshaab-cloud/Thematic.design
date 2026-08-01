"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// ─── Bubble shell ──────────────────────────────────────────────────────────

const bubbleVariants = cva(
  "relative w-fit rounded-[var(--component-message-dimension-radius)] px-[var(--component-message-dimension-padding)] py-[var(--alias-spacing-padding-sm)] text-[length:var(--alias-typography-body-text2-font-size)] leading-[var(--alias-typography-body-text2-line-height)] border",
  {
    variants: {
      variant: {
        user:      "ml-auto bg-[var(--component-message-user-color-bg)] text-[var(--component-message-user-color-text)] border-[var(--component-message-user-color-border)]",
        assistant: "bg-[var(--component-message-assistant-color-bg)] text-[var(--component-message-assistant-color-text)] border-[var(--component-message-assistant-color-border)]",
        system:    "mx-auto bg-[var(--component-message-system-color-bg)] text-[var(--component-message-system-color-text)] border-[var(--component-message-system-color-border)] text-center text-[length:var(--alias-typography-body-text3-font-size)] italic",
      },
    },
    defaultVariants: { variant: "assistant" },
  }
)

// ─── Streaming cursor ───────────────────────────────────────────────────────

function StreamingCursor() {
  return (
    <span
      aria-hidden="true"
      className="ml-0.5 inline-block h-[1em] w-0.5 translate-y-[2px] animate-[blink_1s_step-end_infinite] rounded-sm bg-[var(--component-message-streaming-color-cursor)]"
    />
  )
}

// ─── Props ──────────────────────────────────────────────────────────────────

export interface MessageBubbleProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof bubbleVariants> {
  /** Turn author display name */
  name?: string
  /** Avatar image src (assistant / user) */
  avatarSrc?: string
  /** Avatar fallback initials */
  avatarFallback?: string
  /** Whether the assistant is actively streaming this message */
  isStreaming?: boolean
  /** Whether the message failed to send / generate */
  isError?: boolean
  /** Whether the message has been edited by the user */
  isEdited?: boolean
  /** Timestamp label (e.g. "2:34 PM") */
  timestamp?: string
  /** Live region ID for accessibility — should match outer aria-live container */
  liveRegionId?: string
}

// ─── Component ──────────────────────────────────────────────────────────────

function MessageBubble({
  variant = "assistant",
  name,
  avatarSrc,
  avatarFallback,
  isStreaming = false,
  isError = false,
  isEdited = false,
  timestamp,
  liveRegionId,
  className,
  children,
  ...props
}: MessageBubbleProps) {
  const isUser      = variant === "user"
  const isAssistant = variant === "assistant"
  const isSystem    = variant === "system"

  if (isSystem) {
    return (
      <div
        role="status"
        className={cn("w-full flex justify-center px-4", className)}
        {...props}
      >
        <span className={cn(bubbleVariants({ variant }))}>
          {children}
        </span>
      </div>
    )
  }

  return (
    <div
      data-slot="message-bubble"
      data-variant={variant}
      className={cn(
        "flex w-full gap-[var(--alias-spacing-inline-sm)]",
        isUser ? "flex-row-reverse" : "flex-row",
        className
      )}
      {...props}
    >
      {/* Avatar */}
      {(isAssistant || isUser) && (
        <Avatar className="mt-1 size-8 shrink-0">
          {avatarSrc && <AvatarImage src={avatarSrc} alt={name ?? variant} />}
          <AvatarFallback className="text-[length:var(--alias-typography-caption2-font-size)] font-semibold">
            {avatarFallback ?? (isAssistant ? "AI" : "You")}
          </AvatarFallback>
        </Avatar>
      )}

      {/* Bubble + meta */}
      <div
        className={cn(
          "flex max-w-[var(--component-message-dimension-max-width)] flex-col gap-[var(--alias-spacing-inline-xs)]",
          isUser ? "items-end" : "items-start"
        )}
      >
        {/* Name row */}
        {name && (
          <span className="text-[length:var(--alias-typography-body-text3-font-size)] text-[var(--alias-color-text-subtle)] font-medium">
            {name}
          </span>
        )}

        {/* Bubble */}
        <div
          id={liveRegionId}
          className={cn(
            bubbleVariants({ variant }),
            isError && "border-[var(--alias-color-border-error)] bg-[var(--alias-color-feedback-error-bg)] text-[var(--alias-color-feedback-error-fg)]"
          )}
        >
          {isError ? (
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {children ?? "Something went wrong. Please try again."}
            </span>
          ) : (
            <>
              {children}
              {isStreaming && <StreamingCursor />}
            </>
          )}
        </div>

        {/* Footer: timestamp + edited badge */}
        {(timestamp || isEdited) && (
          <div className="flex items-center gap-1.5">
            {isEdited && (
              <span className="text-[length:var(--alias-typography-body-text3-font-size)] text-[var(--alias-color-text-subtle)] italic">
                edited
              </span>
            )}
            {timestamp && (
              <time className="text-[length:var(--alias-typography-body-text3-font-size)] text-[var(--alias-color-text-subtle)]">
                {timestamp}
              </time>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export { MessageBubble, bubbleVariants }
