"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── PaginationButton ─────────────────────────────────────────────────────────
// Dedicated button for pagination controls — uses pagination tokens directly
// so that active, default, and disabled states are consistently token-driven.

function PaginationButton({
  active = false,
  className,
  disabled,
  children,
  ...props
}: React.ComponentProps<"button"> & { active?: boolean }) {
  return (
    <button
      disabled={disabled}
      className={cn(
        "inline-flex size-7 items-center justify-center select-none",
        "rounded-[var(--component-nav-pagination-dimension-radius)]",
        "border text-[length:var(--component-nav-pagination-typography-size)]",
        "[transition:var(--alias-motion-transition-normal)] outline-none",
        "focus-visible:ring-2 focus-visible:ring-[var(--alias-color-border-active)]/50",
        "[&_svg]:size-3.5 [&_svg]:shrink-0",
        active
          ? "border-[var(--component-nav-pagination-color-stroke-active)] bg-[var(--component-nav-pagination-color-bg-active)] text-[var(--component-nav-pagination-color-text-active)] font-[number:var(--base-font-weight-medium)]"
          : disabled
          ? "border-[var(--component-nav-pagination-color-stroke-default)] bg-transparent text-[var(--component-nav-pagination-color-text-disabled)] cursor-not-allowed"
          : "border-[var(--component-nav-pagination-color-stroke-default)] bg-transparent text-[var(--component-nav-pagination-color-text-default)] hover:bg-[var(--component-nav-pagination-color-bg-hover)] cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PaginationProps {
  /** Current page (1-indexed) */
  page: number
  /** Total number of rows across all pages */
  total: number
  /** Rows shown per page */
  pageSize: number
  /** Called when the user navigates to a different page */
  onPageChange: (page: number) => void
  /** Called when the user selects a different page size */
  onPageSizeChange?: (pageSize: number) => void
  /** Available page size options. Omit to hide the selector. */
  pageSizeOptions?: number[]
  /** Label for the row count ("members", "results", "rows", …) */
  rowLabel?: string
  className?: string
}

// ─── Page number calculation ──────────────────────────────────────────────────

/**
 * Returns the page numbers + "ellipsis" markers to render.
 * Always shows: first, last, current, and up to 1 neighbour on each side.
 * Gaps larger than 1 become an ellipsis marker ("…").
 *
 * Examples (current / total):
 *   1/10  → [1, 2, 3, …, 10]
 *   5/10  → [1, …, 4, 5, 6, …, 10]
 *   9/10  → [1, …, 8, 9, 10]
 */
function buildPageRange(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages = new Set<number>()
  // Always include first and last
  pages.add(1)
  pages.add(total)
  // Current + neighbours
  for (let i = current - 1; i <= current + 1; i++) {
    if (i >= 1 && i <= total) pages.add(i)
  }

  const sorted = Array.from(pages).sort((a, b) => a - b)
  const result: (number | "…")[] = []
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push("…")
    result.push(sorted[i])
  }
  return result
}

// ─── Pagination ───────────────────────────────────────────────────────────────

export function Pagination({
  page,
  total,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions,
  rowLabel = "rows",
  className,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const isFirst = page <= 1
  const isLast = page >= totalPages

  // Row count label: "Showing 11–20 of 142 members"
  const rangeStart = Math.min((page - 1) * pageSize + 1, total)
  const rangeEnd = Math.min(page * pageSize, total)

  const pageRange = buildPageRange(page, totalPages)

  return (
    <div
      data-slot="pagination"
      className={cn(
        "flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-[length:var(--alias-typography-body-text2-font-size)]",
        className
      )}
    >
      {/* ── Left: row count ── */}
      <p className="text-[var(--component-nav-pagination-color-text-default)] tabular-nums">
        {total === 0 ? (
          <>No {rowLabel}</>
        ) : (
          <>
            Showing{" "}
            <span className="font-[number:var(--base-font-weight-medium)] text-[var(--component-nav-pagination-color-text-default)]">
              {rangeStart}–{rangeEnd}
            </span>{" "}
            of{" "}
            <span className="font-[number:var(--base-font-weight-medium)] text-[var(--component-nav-pagination-color-text-default)]">{total}</span>{" "}
            {rowLabel}
          </>
        )}
      </p>

      {/* ── Right: page size + navigation ── */}
      <div className="flex items-center gap-[var(--alias-spacing-inline-sm)]">
        {/* Page size selector */}
        {pageSizeOptions && pageSizeOptions.length > 0 && onPageSizeChange && (
          <div className="flex items-center gap-1.5">
            <span className="text-[var(--component-nav-pagination-color-text-default)]">Rows per page</span>
            <select
              value={pageSize}
              onChange={e => {
                onPageSizeChange(Number(e.target.value))
                onPageChange(1)
              }}
              className={cn(
                "h-7 rounded-[var(--component-nav-pagination-dimension-radius)] border border-[var(--component-nav-pagination-color-stroke-default)] bg-[var(--component-nav-pagination-color-bg-default)] px-[var(--alias-spacing-padding-xs)] text-[length:var(--alias-typography-body-text2-font-size)]",
                "text-[var(--component-nav-pagination-color-text-default)] outline-none [transition:var(--alias-motion-transition-normal)]",
                "focus-visible:border-[var(--alias-color-border-active)] focus-visible:ring-3 focus-visible:ring-[var(--alias-color-border-active)]/50",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
            >
              {pageSizeOptions.map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        )}

        {/* First page */}
        <PaginationButton
          onClick={() => onPageChange(1)}
          disabled={isFirst}
          aria-label="First page"
        >
          <ChevronsLeft />
        </PaginationButton>

        {/* Prev page */}
        <PaginationButton
          onClick={() => onPageChange(page - 1)}
          disabled={isFirst}
          aria-label="Previous page"
        >
          <ChevronLeft />
        </PaginationButton>

        {/* Page number buttons */}
        <div className="flex items-center gap-0.5">
          {pageRange.map((item, idx) =>
            item === "…" ? (
              <span
                key={`ellipsis-${idx}`}
                className="flex size-7 items-center justify-center text-[var(--component-nav-pagination-color-text-disabled)]"
                aria-hidden
              >
                <MoreHorizontal className="size-3.5" />
              </span>
            ) : (
              <PaginationButton
                key={item}
                active={item === page}
                onClick={() => onPageChange(item)}
                aria-label={`Page ${item}`}
                aria-current={item === page ? "page" : undefined}
              >
                {item}
              </PaginationButton>
            )
          )}
        </div>

        {/* Next page */}
        <PaginationButton
          onClick={() => onPageChange(page + 1)}
          disabled={isLast}
          aria-label="Next page"
        >
          <ChevronRight />
        </PaginationButton>

        {/* Last page */}
        <PaginationButton
          onClick={() => onPageChange(totalPages)}
          disabled={isLast}
          aria-label="Last page"
        >
          <ChevronsRight />
        </PaginationButton>
      </div>
    </div>
  )
}
