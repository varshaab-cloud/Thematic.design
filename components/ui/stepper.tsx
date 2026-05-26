"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StepperStep {
  id: string
  label: string
  description?: string
}

export interface StepperProps {
  steps: StepperStep[]
  currentStep: number
  completedSteps?: number[]
  orientation?: "horizontal" | "vertical"
  className?: string
}

export interface StepperContentProps {
  step: number
  currentStep: number
  children: React.ReactNode
}

export interface StepperActionsProps {
  currentStep: number
  totalSteps: number
  onBack: () => void
  onNext: () => void
  onSubmit: () => void
  nextLabel?: string
  submitLabel?: string
  backLabel?: string
  isLoading?: boolean
}

// ─── Step state helpers ───────────────────────────────────────────────────────

type StepState = "completed" | "current" | "upcoming"

function getStepState(
  index: number,
  currentStep: number,
  completedSteps?: number[]
): StepState {
  if (completedSteps?.includes(index)) return "completed"
  if (index === currentStep) return "current"
  if (index < currentStep) return "completed"
  return "upcoming"
}

// ─── Step circle ──────────────────────────────────────────────────────────────

interface StepCircleProps {
  index: number
  state: StepState
  label: string
}

function StepCircle({ index, state, label }: StepCircleProps) {
  const ariaLabel =
    state === "completed"
      ? `${label}, completed`
      : state === "current"
      ? `Step ${index + 1}, ${label}, current`
      : `Step ${index + 1}, ${label}`

  return (
    <div
      role="listitem"
      aria-current={state === "current" ? "step" : undefined}
      aria-label={ariaLabel}
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all",
        state === "completed" && [
          "bg-[var(--alias-color-background-brand)] text-[var(--alias-color-text-inverse)]",
        ],
        state === "current" && [
          "border-2 border-[var(--alias-color-border-active)] bg-[var(--alias-color-background-primary)]",
          "text-[var(--alias-color-text-brand)]",
        ],
        state === "upcoming" && [
          "border border-[var(--alias-color-border-default)] bg-[var(--alias-color-background-secondary)]",
          "text-[var(--alias-color-text-disabled)]",
        ]
      )}
    >
      {state === "completed" ? (
        <Check className="size-4" aria-hidden="true" />
      ) : (
        <span>{index + 1}</span>
      )}
    </div>
  )
}

// ─── Stepper ──────────────────────────────────────────────────────────────────

export function Stepper({
  steps,
  currentStep,
  completedSteps,
  orientation = "horizontal",
  className,
}: StepperProps) {
  if (orientation === "vertical") {
    return (
      <div
        role="list"
        aria-label="Progress"
        className={cn("flex flex-col", className)}
      >
        {steps.map((step, index) => {
          const state = getStepState(index, currentStep, completedSteps)
          const isLast = index === steps.length - 1

          return (
            <div key={step.id} className="flex gap-4">
              {/* Left column: circle + connector */}
              <div className="flex flex-col items-center">
                <StepCircle index={index} state={state} label={step.label} />
                {!isLast && (
                  <div
                    aria-hidden="true"
                    className={cn(
                      "mt-1 w-px flex-1",
                      state === "completed"
                        ? "bg-[var(--alias-color-border-active)]"
                        : "bg-[var(--alias-color-border-default)]"
                    )}
                    style={{ minHeight: 24 }}
                  />
                )}
              </div>

              {/* Right column: label + description */}
              <div className={cn("pb-6 pt-0.5", isLast && "pb-0")}>
                <p
                  className={cn(
                    "text-sm font-medium leading-tight",
                    state === "current"
                      ? "text-[var(--alias-color-text-primary)]"
                      : state === "completed"
                      ? "text-[var(--alias-color-text-secondary)]"
                      : "text-[var(--alias-color-text-disabled)]"
                  )}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p className="mt-0.5 text-xs text-[var(--alias-color-text-disabled)]">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // Horizontal layout
  return (
    <div
      role="list"
      aria-label="Progress"
      className={cn("flex w-full items-start", className)}
    >
      {steps.map((step, index) => {
        const state = getStepState(index, currentStep, completedSteps)
        const isLast = index === steps.length - 1

        return (
          <React.Fragment key={step.id}>
            {/* Step item */}
            <div className="flex flex-col items-center">
              <StepCircle index={index} state={state} label={step.label} />
              <p
                className={cn(
                  "mt-2 max-w-[80px] text-center text-xs font-medium leading-tight",
                  state === "current"
                    ? "text-[var(--alias-color-text-primary)]"
                    : state === "completed"
                    ? "text-[var(--alias-color-text-secondary)]"
                    : "text-[var(--alias-color-text-disabled)]"
                )}
              >
                {step.label}
              </p>
            </div>

            {/* Connector line between steps */}
            {!isLast && (
              <div
                aria-hidden="true"
                className="mt-4 flex-1 self-start px-2"
              >
                <div
                  className={cn(
                    "h-px w-full",
                    state === "completed"
                      ? "border-t-2 border-solid border-[var(--alias-color-border-active)]"
                      : "border-t-2 border-dashed border-[var(--alias-color-border-default)]"
                  )}
                />
              </div>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

// ─── StepperContent ───────────────────────────────────────────────────────────

export function StepperContent({
  step,
  currentStep,
  children,
}: StepperContentProps) {
  if (step !== currentStep) return null
  return <>{children}</>
}

// ─── StepperActions ───────────────────────────────────────────────────────────

export function StepperActions({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onSubmit,
  nextLabel = "Next",
  submitLabel = "Submit",
  backLabel = "Back",
  isLoading = false,
}: StepperActionsProps) {
  const isFirst = currentStep === 0
  const isLast = currentStep === totalSteps - 1

  // Compute next step label for aria
  const nextStepNumber = currentStep + 2 // 1-based next
  const ariaNextLabel = isLast
    ? "Submit form"
    : `Continue to step ${nextStepNumber}`

  return (
    <nav
      aria-label="Step navigation"
      className="flex items-center justify-between gap-3 pt-4"
    >
      <Button
        variant="ghost"
        aria-label="Go to previous step"
        onClick={onBack}
        disabled={isFirst || isLoading}
        className={cn(isFirst && "invisible")}
      >
        {backLabel}
      </Button>

      {isLast ? (
        <Button
          variant="default"
          aria-label={ariaNextLabel}
          onClick={onSubmit}
          isLoading={isLoading}
        >
          {submitLabel}
        </Button>
      ) : (
        <Button
          variant="default"
          aria-label={ariaNextLabel}
          onClick={onNext}
          isLoading={isLoading}
        >
          {nextLabel}
        </Button>
      )}
    </nav>
  )
}
