"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { BookOpen, Search, ChevronRight, Star } from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface PromptTemplate {
  id: string
  title: string
  description?: string
  content: string
  /** Category for grouping */
  category?: string
  /** Pinned templates shown at the top */
  pinned?: boolean
}

export interface PromptTemplatesProps {
  templates: PromptTemplate[]
  /** Called when a template is selected — passes the full content string */
  onSelect?: (template: PromptTemplate) => void
  /** Controlled open state */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Trigger label */
  triggerLabel?: string
  disabled?: boolean
}

// ─── Template item ────────────────────────────────────────────────────────────

function TemplateItem({
  template,
  onSelect,
}: {
  template: PromptTemplate
  onSelect?: (t: PromptTemplate) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(template)}
      className="group flex w-full items-start gap-[var(--alias-spacing-inline-sm)] rounded-[var(--component-prompttemplate-dimension-radius)] px-2 py-1.5 text-left [transition:var(--alias-motion-transition-normal)] hover:bg-[var(--component-prompttemplate-color-bg-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--alias-color-border-active)]"
    >
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1 text-[length:var(--alias-typography-body-text2-font-size)] font-medium text-[var(--component-prompttemplate-color-text)] truncate">
          {template.pinned && (
            <Star className="size-3 shrink-0 text-[var(--alias-color-icon-brand)] fill-current" aria-label="Pinned" />
          )}
          {template.title}
        </p>
        {template.description && (
          <p className="mt-0.5 line-clamp-2 text-[length:var(--alias-typography-body-text3-font-size)] text-[var(--component-prompttemplate-color-text-subtle)]">
            {template.description}
          </p>
        )}
      </div>
      <ChevronRight className="mt-0.5 size-3.5 shrink-0 text-[var(--alias-color-icon-secondary)] opacity-0 group-hover:opacity-100" aria-hidden="true" />
    </button>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

function PromptTemplates({
  templates,
  onSelect,
  open: controlledOpen,
  onOpenChange,
  triggerLabel = "Templates",
  disabled = false,
}: PromptTemplatesProps) {
  const [query, setQuery] = React.useState("")

  const filtered = React.useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return templates
    return templates.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q) ||
        t.content.toLowerCase().includes(q)
    )
  }, [templates, query])

  // Group by category
  const pinned     = filtered.filter((t) => t.pinned)
  const unpinned   = filtered.filter((t) => !t.pinned)
  const categories = [...new Set(unpinned.map((t) => t.category ?? "Other"))]

  function handleSelect(t: PromptTemplate) {
    onSelect?.(t)
    onOpenChange?.(false)
  }

  return (
    <Popover open={controlledOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={disabled}
          aria-label="Open prompt templates"
          className="gap-1 text-[var(--component-prompttemplate-color-chip-text)] border border-[var(--component-prompttemplate-color-chip-border)] bg-[var(--component-prompttemplate-color-chip-bg)] hover:bg-[var(--alias-color-background-tertiary)]"
        >
          <BookOpen className="size-3.5" aria-hidden="true" />
          {triggerLabel}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={6}
        className="w-[var(--component-prompttemplate-dimension-panel-width)] p-0"
        aria-label="Prompt templates"
      >
        {/* Search */}
        <div className="border-b border-[var(--alias-color-border-subtle)] px-2 py-1.5">
          <div className="flex items-center gap-1.5 rounded-[var(--alias-radius-sm)] border border-[var(--alias-color-border-default)] bg-[var(--alias-color-background-primary)] px-2 py-1">
            <Search className="size-3.5 shrink-0 text-[var(--alias-color-icon-secondary)]" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search templates…"
              aria-label="Search templates"
              className="flex-1 bg-transparent text-[length:var(--alias-typography-body-text3-font-size)] text-[var(--alias-color-text-primary)] outline-none placeholder:text-[var(--alias-color-text-subtle)]"
            />
          </div>
        </div>

        {/* List */}
        <div
          role="listbox"
          aria-label="Prompt templates"
          className="max-h-80 overflow-y-auto p-1.5 flex flex-col gap-0"
        >
          {filtered.length === 0 && (
            <p className="px-2 py-4 text-center text-[length:var(--alias-typography-body-text3-font-size)] text-[var(--alias-color-text-subtle)]">
              No templates match "{query}"
            </p>
          )}

          {/* Pinned */}
          {pinned.length > 0 && (
            <div>
              <p className="px-2 pb-0.5 pt-1 text-[length:var(--alias-typography-caption2-font-size)] font-semibold uppercase tracking-wide text-[var(--alias-color-text-subtle)]">
                Pinned
              </p>
              {pinned.map((t) => (
                <TemplateItem key={t.id} template={t} onSelect={handleSelect} />
              ))}
            </div>
          )}

          {/* Categorised */}
          {categories.map((cat) => {
            const items = unpinned.filter((t) => (t.category ?? "Other") === cat)
            if (!items.length) return null
            return (
              <div key={cat}>
                {categories.length > 1 && (
                  <p className="px-2 pb-0.5 pt-2 text-[length:var(--alias-typography-caption2-font-size)] font-semibold uppercase tracking-wide text-[var(--alias-color-text-subtle)]">
                    {cat}
                  </p>
                )}
                {items.map((t) => (
                  <TemplateItem key={t.id} template={t} onSelect={handleSelect} />
                ))}
              </div>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { PromptTemplates }
