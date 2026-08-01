"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ExternalLink } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Citation {
  /** Reference number shown inline and in the list */
  index: number
  /** Source title */
  title: string
  /** Source URL */
  url?: string
  /** Short excerpt or description */
  excerpt?: string
}

// ─── CitationMarker — inline [1] chip ────────────────────────────────────────

export interface CitationMarkerProps extends React.ComponentProps<"a"> {
  index: number
  title: string
  excerpt?: string
  /** If provided, renders as an anchor */
  href?: string
}

function CitationMarker({
  index,
  title,
  excerpt,
  href,
  className,
  ...props
}: CitationMarkerProps) {
  const content = (
    <span
      className={cn(
        "inline-flex h-[1.1em] min-w-[1.1em] cursor-default items-center justify-center rounded-[var(--component-citation-dimension-radius)] bg-[var(--component-citation-color-marker-bg)] px-0.5 text-[length:var(--alias-typography-caption2-font-size)] font-semibold leading-none text-[var(--component-citation-color-marker-text)] align-middle",
        className
      )}
      aria-label={`Source ${index}: ${title}`}
    >
      {index}
    </span>
  )

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
            {content}
          </a>
        ) : (
          <span role="note" {...props}>{content}</span>
        )}
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-[240px] text-xs">
        <p className="font-medium">{title}</p>
        {excerpt && <p className="mt-1 text-[var(--alias-color-text-subtle)]">{excerpt}</p>}
      </TooltipContent>
    </Tooltip>
  )
}

// ─── SourceList — full list of citations rendered below the message ───────────

export interface SourceListProps extends React.ComponentProps<"ol"> {
  citations: Citation[]
  /** Heading label */
  heading?: string
}

function SourceList({
  citations,
  heading = "Sources",
  className,
  ...props
}: SourceListProps) {
  if (!citations.length) return null

  return (
    <div className="mt-[var(--alias-spacing-stack-sm)]">
      <p className="mb-1 text-[length:var(--alias-typography-body-text3-font-size)] font-medium text-[var(--alias-color-text-subtle)]">
        {heading}
      </p>
      <ol
        className={cn(
          "flex flex-col gap-[var(--alias-spacing-stack-xs)] rounded-[var(--alias-radius-md)] border border-[var(--component-citation-color-source-border)] bg-[var(--component-citation-color-source-bg)] px-3 py-2",
          className
        )}
        aria-label={heading}
        {...props}
      >
        {citations.map((c) => (
          <li key={c.index} className="flex items-start gap-[var(--alias-spacing-inline-sm)]">
            {/* Index chip */}
            <span
              className="mt-0.5 shrink-0 inline-flex h-[1.1em] min-w-[1.1em] items-center justify-center rounded-[var(--component-citation-dimension-radius)] bg-[var(--component-citation-color-marker-bg)] px-0.5 text-[length:var(--alias-typography-caption2-font-size)] font-semibold leading-none text-[var(--component-citation-color-marker-text)]"
              aria-hidden="true"
            >
              {c.index}
            </span>

            <div className="min-w-0 flex flex-col gap-0.5">
              {c.url ? (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 truncate text-[length:var(--alias-typography-body-text3-font-size)] text-[var(--alias-color-text-brand)] underline-offset-2 hover:underline"
                >
                  <span className="truncate">{c.title}</span>
                  <ExternalLink className="size-3 shrink-0" aria-label="Opens in new tab" />
                </a>
              ) : (
                <span className="truncate text-[length:var(--alias-typography-body-text3-font-size)] text-[var(--alias-color-text-primary)]">
                  {c.title}
                </span>
              )}
              {c.excerpt && (
                <p className="text-[length:10px] text-[var(--alias-color-text-subtle)] line-clamp-2">
                  {c.excerpt}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export { CitationMarker, SourceList }
