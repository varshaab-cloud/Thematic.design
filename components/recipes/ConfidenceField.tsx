"use client"

import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// ─── ConfidenceField ──────────────────────────────────────────────────────────
// Recipe: a labelled form field that also reports how confident an automated
// extraction (OCR / document AI) is about the value sitting in it.
//
// The field owns the label, the confidence badge and the error / helper line.
// The control itself is passed in as `children` so the recipe stays agnostic to
// which primitive is used — InputBase, Select, DatePicker, Textarea all work.
//
// Describedby convention: the error line renders as `<id>-error`, the helper
// line as `<id>-helper`. Wire the control's `aria-describedby` to whichever is
// currently rendered — the recipe cannot do it for an arbitrary child.

export type ConfidenceStatus = "high" | "review" | "low" | "missing" | "edited"

export interface ConfidenceFieldProps {
  /** Id of the control this field wraps — the label points at it. */
  id: string
  label: string
  required?: boolean
  /** 0–1 extraction confidence. `null` / `undefined` means nothing was found. */
  confidence?: number | null
  /** True once a human has changed the extracted value. */
  edited?: boolean
  errorMessage?: string
  helperText?: string
  children: React.ReactNode
  className?: string
}

export function confidenceStatus(
  confidence: number | null | undefined,
  edited?: boolean
): ConfidenceStatus {
  if (edited) return "edited"
  if (confidence === null || confidence === undefined) return "missing"
  if (confidence >= 0.9) return "high"
  if (confidence >= 0.7) return "review"
  return "low"
}

const STATUS_BADGE: Record<
  ConfidenceStatus,
  { variant: "success" | "warning" | "error" | "info"; label: string }
> = {
  high:    { variant: "success", label: "High"      },
  review:  { variant: "warning", label: "Check"     },
  low:     { variant: "error",   label: "Low"       },
  missing: { variant: "error",   label: "Not found" },
  edited:  { variant: "info",    label: "Edited"    },
}

export function ConfidenceField({
  id,
  label,
  required,
  confidence,
  edited,
  errorMessage,
  helperText,
  children,
  className,
}: ConfidenceFieldProps) {
  const status = confidenceStatus(confidence, edited)
  const badge = STATUS_BADGE[status]
  const showPercent =
    status !== "missing" && status !== "edited" && typeof confidence === "number"

  return (
    <div
      data-tier="recipe"
      data-component="ConfidenceField"
      className={cn("flex flex-col gap-[var(--alias-spacing-stack-xs)]", className)}
    >
      <div className="flex items-center justify-between gap-[var(--alias-spacing-inline-xs)]">
        <label
          htmlFor={id}
          className="text-[length:var(--alias-typography-body-text2-font-size)] font-[number:var(--alias-typography-weight-medium)] text-[var(--alias-color-text-primary)]"
        >
          {label}
          {required && (
            <span className="ml-1 text-[var(--alias-color-feedback-error-fg)]">*</span>
          )}
        </label>

        <Badge variant={badge.variant} size="sm" dot>
          <span className="sr-only">Extraction confidence: </span>
          {badge.label}
          {showPercent && <> {Math.round((confidence as number) * 100)}%</>}
        </Badge>
      </div>

      {children}

      {errorMessage ? (
        <p
          id={`${id}-error`}
          className="text-[length:var(--alias-typography-caption1-font-size)] text-[var(--alias-color-feedback-error-fg)]"
        >
          {errorMessage}
        </p>
      ) : helperText ? (
        <p
          id={`${id}-helper`}
          className="text-[length:var(--alias-typography-caption1-font-size)] text-[var(--alias-color-text-subtle)]"
        >
          {helperText}
        </p>
      ) : null}
    </div>
  )
}
