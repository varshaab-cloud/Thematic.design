"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight, Brain } from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ThoughtStep {
  id: string
  content: string
  /** Whether this step is still being streamed in */
  isStreaming?: boolean
}

export interface StreamOfThoughtProps extends React.ComponentProps<"div"> {
  /** Individual reasoning steps */
  steps: ThoughtStep[]
  /** Whether the model is still producing thought steps */
  isStreaming?: boolean
  /** Whether the panel starts expanded */
  defaultExpanded?: boolean
  /** Controlled expand state */
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  /** Label for the toggle button */
  label?: string
}

// ─── Component ───────────────────────────────────────────────────────────────

function StreamOfThought({
  steps,
  isStreaming = false,
  defaultExpanded = false,
  expanded: controlledExpanded,
  onExpandedChange,
  label = "Thinking",
  className,
  ...props
}: StreamOfThoughtProps) {
  const [internalExpanded, setInternalExpanded] = React.useState(defaultExpanded)
  const isControlled = controlledExpanded !== undefined
  const isExpanded   = isControlled ? controlledExpanded : internalExpanded

  function toggle() {
    const next = !isExpanded
    if (!isControlled) setInternalExpanded(next)
    onExpandedChange?.(next)
  }

  const stepCount = steps.length

  return (
    <div
      data-slot="stream-of-thought"
      className={cn(
        "w-full rounded-[var(--component-streamofthought-dimension-radius)] border border-[var(--component-streamofthought-color-border)] bg-[var(--component-streamofthought-color-bg)] overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Header / toggle */}
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls="stream-of-thought-content"
        onClick={toggle}
        className="flex w-full items-center gap-[var(--alias-spacing-inline-sm)] px-[var(--component-streamofthought-dimension-padding)] py-[var(--alias-spacing-padding-xs)] hover:bg-[var(--alias-color-background-tertiary)] [transition:var(--alias-motion-transition-normal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--alias-color-border-active)] focus-visible:ring-inset"
      >
        {/* Brain icon with optional pulse */}
        <Brain
          className={cn(
            "size-4 shrink-0 text-[var(--component-streamofthought-color-step-dot)]",
            isStreaming && "animate-pulse"
          )}
          aria-hidden="true"
        />

        <span className="flex-1 text-left text-[length:var(--alias-typography-body-text2-font-size)] font-medium text-[var(--component-streamofthought-color-text)]">
          {label}
          {isStreaming && (
            <span className="ml-1 text-[var(--component-streamofthought-color-text-subtle)] font-normal">
              …
            </span>
          )}
        </span>

        {/* Step count */}
        {stepCount > 0 && (
          <span className="text-[length:var(--alias-typography-body-text3-font-size)] text-[var(--component-streamofthought-color-text-subtle)]">
            {stepCount} {stepCount === 1 ? "step" : "steps"}
          </span>
        )}

        {/* Chevron */}
        {isExpanded
          ? <ChevronDown className="size-4 shrink-0 text-[var(--alias-color-icon-secondary)]" aria-hidden="true" />
          : <ChevronRight className="size-4 shrink-0 text-[var(--alias-color-icon-secondary)]" aria-hidden="true" />
        }
      </button>

      {/* Steps */}
      {isExpanded && (
        <div
          id="stream-of-thought-content"
          role="log"
          aria-label="Reasoning steps"
          aria-live="polite"
          aria-atomic="false"
          className="border-t border-[var(--component-streamofthought-color-border)] px-[var(--component-streamofthought-dimension-padding)] py-[var(--alias-spacing-padding-xs)]"
        >
          {steps.length === 0 && isStreaming ? (
            <p className="text-[length:var(--alias-typography-body-text3-font-size)] text-[var(--component-streamofthought-color-text-subtle)] italic">
              Starting to reason…
            </p>
          ) : (
            <ol className="relative flex flex-col gap-0">
              {steps.map((step, idx) => {
                const isLast      = idx === steps.length - 1
                const isActive    = isLast && isStreaming
                return (
                  <li key={step.id} className="relative flex gap-[var(--alias-spacing-inline-sm)] pb-3 last:pb-0">
                    {/* Vertical line */}
                    {!isLast && (
                      <span
                        aria-hidden="true"
                        className="absolute left-[3px] top-[14px] bottom-0 w-px bg-[var(--component-streamofthought-color-step-line)]"
                      />
                    )}

                    {/* Dot */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "relative mt-1 shrink-0 rounded-full",
                        "size-[var(--component-streamofthought-dimension-dot-size)]",
                        isActive
                          ? "bg-[var(--component-streamofthought-color-step-dot)] animate-pulse"
                          : "bg-[var(--component-streamofthought-color-step-dot-done)]"
                      )}
                    />

                    {/* Content */}
                    <p className={cn(
                      "flex-1 text-[length:var(--alias-typography-body-text3-font-size)] leading-relaxed",
                      "text-[var(--component-streamofthought-color-text)]",
                      isActive && "text-[var(--component-streamofthought-color-text-subtle)]"
                    )}>
                      {step.content}
                      {isActive && step.isStreaming && (
                        <span
                          aria-hidden="true"
                          className="ml-0.5 inline-block h-[0.8em] w-0.5 translate-y-[1px] animate-[blink_1s_step-end_infinite] bg-[var(--component-streamofthought-color-step-dot)]"
                        />
                      )}
                    </p>
                  </li>
                )
              })}
            </ol>
          )}
        </div>
      )}
    </div>
  )
}

export { StreamOfThought }
