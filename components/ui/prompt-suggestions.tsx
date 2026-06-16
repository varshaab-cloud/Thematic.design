"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Suggestion {
  id: string
  label: string
  /** Short description shown below the label */
  description?: string
  /** Optional icon */
  icon?: React.ReactNode
}

export interface PromptSuggestionsProps extends React.ComponentProps<"div"> {
  suggestions: Suggestion[]
  /** Called when a suggestion is selected */
  onSelect?: (suggestion: Suggestion) => void
  /** Heading above the suggestions */
  heading?: string
  /** Layout: wrap (default) or column */
  layout?: "wrap" | "column"
}

// ─── Component ───────────────────────────────────────────────────────────────

function PromptSuggestions({
  suggestions,
  onSelect,
  heading,
  layout = "wrap",
  className,
  ...props
}: PromptSuggestionsProps) {
  if (!suggestions.length) return null

  return (
    <div
      data-slot="prompt-suggestions"
      className={cn("flex flex-col gap-[var(--alias-spacing-stack-sm)]", className)}
      {...props}
    >
      {heading && (
        <p className="text-[length:var(--alias-typography-body-text2-font-size)] font-medium text-[var(--alias-color-text-secondary)]">
          {heading}
        </p>
      )}

      <div
        role="list"
        aria-label={heading ?? "Suggested prompts"}
        className={cn(
          layout === "column"
            ? "flex flex-col gap-[var(--alias-spacing-stack-xs)]"
            : "flex flex-wrap gap-[var(--alias-spacing-inline-sm)]"
        )}
      >
        {suggestions.map((s) => (
          <button
            key={s.id}
            type="button"
            role="listitem"
            onClick={() => onSelect?.(s)}
            className={cn(
              "group flex items-start gap-[var(--alias-spacing-inline-sm)] rounded-[var(--component-promptsuggestion-dimension-radius)] border border-[var(--component-promptsuggestion-color-border)] bg-[var(--component-promptsuggestion-color-bg)] px-[var(--alias-spacing-padding-sm)] py-[var(--alias-spacing-padding-xs)] text-left [transition:var(--alias-motion-transition-normal)]",
              "hover:bg-[var(--component-promptsuggestion-color-bg-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--alias-color-border-active)]",
              layout === "column" ? "w-full" : ""
            )}
          >
            {/* Icon */}
            {s.icon ? (
              <span className="mt-0.5 shrink-0 text-[var(--alias-color-icon-brand)]" aria-hidden="true">
                {s.icon}
              </span>
            ) : (
              <Sparkles
                className="mt-0.5 size-4 shrink-0 text-[var(--alias-color-icon-brand)]"
                aria-hidden="true"
              />
            )}

            <div className="min-w-0">
              <p className="text-[length:var(--alias-typography-body-text2-font-size)] font-medium text-[var(--component-promptsuggestion-color-text)]">
                {s.label}
              </p>
              {s.description && (
                <p className="mt-0.5 text-[length:var(--alias-typography-body-text3-font-size)] text-[var(--alias-color-text-subtle)]">
                  {s.description}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export { PromptSuggestions }
