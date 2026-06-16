"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Variation {
  id: string
  label?: string
  content: React.ReactNode
}

export interface ResultVariationsProps extends React.ComponentProps<"div"> {
  variations: Variation[]
  /** Called when the user chooses a variation */
  onSelect?: (id: string) => void
  /** ID of the currently selected variation */
  selectedId?: string
  /** Layout: tabs (top) or carousel (prev/next arrows) */
  layout?: "tabs" | "carousel"
}

// ─── Tabs layout ──────────────────────────────────────────────────────────────

function TabsLayout({
  variations,
  activeIdx,
  onTab,
  selectedId,
  onSelect,
}: {
  variations: Variation[]
  activeIdx: number
  onTab: (i: number) => void
  selectedId?: string
  onSelect?: (id: string) => void
}) {
  const active = variations[activeIdx]

  return (
    <div className="flex flex-col rounded-[var(--component-resultvariation-dimension-radius)] border border-[var(--component-resultvariation-color-border)] bg-[var(--component-resultvariation-color-bg)] overflow-hidden">
      {/* Tab bar */}
      <div
        role="tablist"
        aria-label="Response variations"
        className="flex items-center border-b border-[var(--component-resultvariation-color-tab-border)] bg-[var(--component-resultvariation-color-tab-bg)] px-1 pt-1 gap-0.5"
      >
        {variations.map((v, i) => {
          const isActive   = i === activeIdx
          const isSelected = v.id === selectedId
          return (
            <button
              key={v.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`variation-panel-${v.id}`}
              id={`variation-tab-${v.id}`}
              onClick={() => onTab(i)}
              className={cn(
                "relative flex items-center gap-1 rounded-t-[var(--component-resultvariation-dimension-tab-radius)] px-3 py-1.5 text-[length:var(--alias-typography-body-text3-font-size)] [transition:var(--alias-motion-transition-normal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--alias-color-border-active)]",
                isActive
                  ? "bg-[var(--component-resultvariation-color-tab-active)] text-[var(--component-resultvariation-color-tab-active-text)] font-medium shadow-sm"
                  : "text-[var(--component-resultvariation-color-tab-text)] hover:bg-[var(--alias-color-background-tertiary)]"
              )}
            >
              {isSelected && (
                <Check className="size-3 text-[var(--alias-color-feedback-success-fg)]" aria-label="Selected" />
              )}
              {v.label ?? `Variation ${i + 1}`}
            </button>
          )
        })}
      </div>

      {/* Panel */}
      <div
        id={`variation-panel-${active.id}`}
        role="tabpanel"
        aria-labelledby={`variation-tab-${active.id}`}
        tabIndex={0}
        className="p-[var(--alias-spacing-padding-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--alias-color-border-active)]"
      >
        {active.content}
      </div>

      {/* Footer */}
      <VariationFooter
        variation={active}
        isSelected={active.id === selectedId}
        onSelect={onSelect}
      />
    </div>
  )
}

// ─── Carousel layout ──────────────────────────────────────────────────────────

function CarouselLayout({
  variations,
  activeIdx,
  onTab,
  selectedId,
  onSelect,
}: {
  variations: Variation[]
  activeIdx: number
  onTab: (i: number) => void
  selectedId?: string
  onSelect?: (id: string) => void
}) {
  const active = variations[activeIdx]
  const total  = variations.length

  return (
    <div className="flex flex-col rounded-[var(--component-resultvariation-dimension-radius)] border border-[var(--component-resultvariation-color-border)] bg-[var(--component-resultvariation-color-bg)] overflow-hidden">
      {/* Nav header */}
      <div className="flex items-center justify-between border-b border-[var(--component-resultvariation-color-tab-border)] bg-[var(--component-resultvariation-color-tab-bg)] px-[var(--alias-spacing-padding-sm)] py-1">
        <button
          type="button"
          aria-label="Previous variation"
          disabled={activeIdx === 0}
          onClick={() => onTab(activeIdx - 1)}
          className="rounded-[var(--alias-radius-sm)] p-0.5 hover:bg-[var(--alias-color-background-tertiary)] disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--alias-color-border-active)]"
        >
          <ChevronLeft className="size-4 text-[var(--alias-color-icon-secondary)]" aria-hidden="true" />
        </button>

        <span className="text-[length:var(--alias-typography-body-text3-font-size)] text-[var(--alias-color-text-subtle)]">
          {active.label ?? `Variation ${activeIdx + 1}`}
          <span className="ml-1 text-[var(--alias-color-text-subtle)] opacity-60">of {total}</span>
        </span>

        <button
          type="button"
          aria-label="Next variation"
          disabled={activeIdx === total - 1}
          onClick={() => onTab(activeIdx + 1)}
          className="rounded-[var(--alias-radius-sm)] p-0.5 hover:bg-[var(--alias-color-background-tertiary)] disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--alias-color-border-active)]"
        >
          <ChevronRight className="size-4 text-[var(--alias-color-icon-secondary)]" aria-hidden="true" />
        </button>
      </div>

      {/* Content */}
      <div
        aria-label={active.label ?? `Variation ${activeIdx + 1}`}
        aria-live="polite"
        aria-atomic="true"
        className="p-[var(--alias-spacing-padding-md)]"
      >
        {active.content}
      </div>

      {/* Footer */}
      <VariationFooter
        variation={active}
        isSelected={active.id === selectedId}
        onSelect={onSelect}
      />
    </div>
  )
}

// ─── Shared footer ────────────────────────────────────────────────────────────

function VariationFooter({
  variation,
  isSelected,
  onSelect,
}: {
  variation: Variation
  isSelected: boolean
  onSelect?: (id: string) => void
}) {
  return (
    <div className="flex items-center justify-end border-t border-[var(--component-resultvariation-color-tab-border)] px-[var(--alias-spacing-padding-sm)] py-1.5">
      {isSelected ? (
        <span className="flex items-center gap-1 text-[length:var(--alias-typography-body-text3-font-size)] text-[var(--alias-color-feedback-success-fg)]">
          <Check className="size-3" aria-hidden="true" /> Using this variation
        </span>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSelect?.(variation.id)}
          aria-label={`Use ${variation.label ?? "this variation"}`}
        >
          Use this
        </Button>
      )}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

function ResultVariations({
  variations,
  onSelect,
  selectedId,
  layout = "tabs",
  className,
  ...props
}: ResultVariationsProps) {
  const [activeIdx, setActiveIdx] = React.useState(0)

  if (!variations.length) return null

  const sharedProps = { variations, activeIdx, onTab: setActiveIdx, selectedId, onSelect }

  return (
    <div data-slot="result-variations" className={cn("w-full", className)} {...props}>
      {layout === "tabs"
        ? <TabsLayout {...sharedProps} />
        : <CarouselLayout {...sharedProps} />
      }
    </div>
  )
}

export { ResultVariations }
