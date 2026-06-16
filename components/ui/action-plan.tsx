"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Check, Loader2, AlertCircle, Clock } from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

export type PlanStepState = "pending" | "active" | "done" | "error" | "skipped"
export type PlanState     = "awaiting-confirmation" | "executing" | "done" | "cancelled" | "error"

export interface PlanStep {
  id: string
  label: string
  /** Optional detail shown below the label */
  description?: string
  state?: PlanStepState
}

export interface ActionPlanProps extends React.ComponentProps<"div"> {
  steps: PlanStep[]
  state?: PlanState
  /** Title shown above the step list */
  title?: string
  /** Called when user confirms the plan */
  onConfirm?: () => void
  /** Called when user cancels the plan */
  onCancel?: () => void
  /** Label for the confirm button */
  confirmLabel?: string
  /** Label for the cancel button */
  cancelLabel?: string
}

// ─── Step icon ────────────────────────────────────────────────────────────────

function StepIcon({ state }: { state: PlanStepState }) {
  const size = "size-[var(--component-actionplan-dimension-step-size)]"
  const base = cn("shrink-0 rounded-full flex items-center justify-center border-2", size)

  switch (state) {
    case "done":
      return (
        <span className={cn(base, "border-[var(--component-actionplan-color-step-done)] bg-[var(--component-actionplan-color-step-done)]")} aria-hidden="true">
          <Check className="size-3 text-white" />
        </span>
      )
    case "active":
      return (
        <span className={cn(base, "border-[var(--component-actionplan-color-step-active)] bg-transparent")} aria-hidden="true">
          <Loader2 className="size-3 animate-spin text-[var(--component-actionplan-color-step-active)]" />
        </span>
      )
    case "error":
      return (
        <span className={cn(base, "border-[var(--component-actionplan-color-step-error)] bg-[var(--component-actionplan-color-step-error)]")} aria-hidden="true">
          <AlertCircle className="size-3 text-white" />
        </span>
      )
    case "skipped":
      return (
        <span className={cn(base, "border-[var(--component-actionplan-color-step-pending)] bg-transparent opacity-40")} aria-hidden="true">
          <span className="size-1.5 rounded-full bg-[var(--component-actionplan-color-step-pending)]" />
        </span>
      )
    default: // pending
      return (
        <span className={cn(base, "border-[var(--component-actionplan-color-step-pending)] bg-transparent")} aria-hidden="true">
          <Clock className="size-3 text-[var(--component-actionplan-color-step-pending)]" />
        </span>
      )
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

function ActionPlan({
  steps,
  state = "awaiting-confirmation",
  title = "Here's what I'll do:",
  onConfirm,
  onCancel,
  confirmLabel = "Confirm & run",
  cancelLabel  = "Cancel",
  className,
  ...props
}: ActionPlanProps) {
  const isAwaitingConfirmation = state === "awaiting-confirmation"
  const isExecuting            = state === "executing"
  const isDone                 = state === "done"
  const isCancelled            = state === "cancelled"

  return (
    <div
      data-slot="action-plan"
      data-state={state}
      role={isAwaitingConfirmation ? "dialog" : "status"}
      aria-label={isAwaitingConfirmation ? "Action plan — confirm to proceed" : "Action plan"}
      aria-live="polite"
      className={cn(
        "w-full rounded-[var(--component-actionplan-dimension-radius)] border border-[var(--component-actionplan-color-border)] bg-[var(--component-actionplan-color-bg)] overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-[var(--alias-spacing-inline-sm)] border-b border-[var(--component-actionplan-color-border)] px-[var(--component-actionplan-dimension-padding)] py-[var(--alias-spacing-padding-xs)]">
        <p className="text-[length:var(--alias-typography-body-text2-font-size)] font-medium text-[var(--component-actionplan-color-text)]">
          {title}
        </p>
        {isCancelled && (
          <span className="text-[length:var(--alias-typography-body-text3-font-size)] text-[var(--alias-color-text-subtle)] italic">
            Cancelled
          </span>
        )}
        {isDone && (
          <span className="flex items-center gap-1 text-[length:var(--alias-typography-body-text3-font-size)] text-[var(--component-actionplan-color-step-done)]">
            <Check className="size-3" aria-hidden="true" /> Complete
          </span>
        )}
      </div>

      {/* Steps */}
      <ol
        aria-label="Plan steps"
        className="px-[var(--component-actionplan-dimension-padding)] py-[var(--alias-spacing-padding-sm)] flex flex-col"
      >
        {steps.map((step, idx) => {
          const stepState = step.state ?? "pending"
          const isLast    = idx === steps.length - 1

          return (
            <li
              key={step.id}
              className={cn(
                "relative flex items-start gap-[var(--alias-spacing-inline-sm)]",
                !isLast && "pb-4"
              )}
            >
              {/* Connector line */}
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="absolute left-[11px] top-[26px] bottom-0 w-px bg-[var(--component-actionplan-color-step-line)]"
                />
              )}

              <StepIcon state={stepState} />

              <div className="min-w-0 flex-1 pt-0.5">
                <p className={cn(
                  "text-[length:var(--alias-typography-body-text2-font-size)]",
                  stepState === "pending" || stepState === "skipped"
                    ? "text-[var(--component-actionplan-color-text-subtle)]"
                    : "text-[var(--component-actionplan-color-text)] font-medium"
                )}>
                  {step.label}
                </p>
                {step.description && (
                  <p className="mt-0.5 text-[length:var(--alias-typography-body-text3-font-size)] text-[var(--component-actionplan-color-text-subtle)]">
                    {step.description}
                  </p>
                )}
              </div>
            </li>
          )
        })}
      </ol>

      {/* Action buttons — only in awaiting-confirmation state */}
      {isAwaitingConfirmation && (
        <div className="flex items-center gap-[var(--alias-spacing-inline-sm)] border-t border-[var(--component-actionplan-color-border)] px-[var(--component-actionplan-dimension-padding)] py-[var(--alias-spacing-padding-xs)]">
          <Button
            variant="default"
            size="sm"
            onClick={onConfirm}
            aria-label={confirmLabel}
          >
            {confirmLabel}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            aria-label={cancelLabel}
          >
            {cancelLabel}
          </Button>
        </div>
      )}
    </div>
  )
}

export { ActionPlan }
