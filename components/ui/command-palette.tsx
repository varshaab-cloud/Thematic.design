"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

export type CommandItem = {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
  shortcut?: string
  onSelect: () => void
  group: string
}

export interface CommandPaletteProps {
  items: CommandItem[]
  open: boolean
  onOpenChange: (open: boolean) => void
  placeholder?: string
}

export function CommandPalette({
  items,
  open,
  onOpenChange,
  placeholder = "Search…",
}: CommandPaletteProps) {
  const [query, setQuery] = React.useState("")
  const [activeIndex, setActiveIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const listRef = React.useRef<HTMLDivElement>(null)

  // Filter items based on query
  const filtered = React.useMemo(() => {
    if (!query.trim()) return items
    const q = query.toLowerCase()
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q)
    )
  }, [items, query])

  // Group filtered items
  const grouped = React.useMemo(() => {
    const groups: Record<string, CommandItem[]> = {}
    for (const item of filtered) {
      if (!groups[item.group]) groups[item.group] = []
      groups[item.group].push(item)
    }
    return groups
  }, [filtered])

  // Flat list for keyboard navigation
  const flatItems = React.useMemo(() => filtered, [filtered])

  // Reset state when opening
  React.useEffect(() => {
    if (open) {
      setQuery("")
      setActiveIndex(0)
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  // Reset active index when filtered list changes
  React.useEffect(() => {
    setActiveIndex(0)
  }, [query])

  // Scroll active item into view
  React.useEffect(() => {
    if (!listRef.current) return
    const activeEl = listRef.current.querySelector("[data-active='true']") as HTMLElement | null
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" })
    }
  }, [activeIndex])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, flatItems.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      const item = flatItems[activeIndex]
      if (item) {
        item.onSelect()
        onOpenChange(false)
      }
    } else if (e.key === "Escape") {
      onOpenChange(false)
    }
  }

  if (!open) return null

  let flatIndex = 0

  return (
    <>
      {/* Semi-transparent backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/20"
        onClick={() => onOpenChange(false)}
      />

      {/* Panel positioned near the top */}
      <div
        role="dialog"
        aria-label="Command palette"
        aria-modal="true"
        className={cn(
          "fixed left-1/2 z-50 w-full max-w-xl -translate-x-1/2",
          "focus:outline-none"
        )}
        style={{ top: "80px" }}
        onKeyDown={handleKeyDown}
      >
          <div
            className={cn(
              "bg-[var(--component-command-palette-panel-bg)] border border-[var(--component-command-palette-border)]",
              "rounded-[var(--base-radius-lg)] shadow-xl",
              "max-h-[400px] overflow-hidden flex flex-col"
            )}
          >
            {/* Search input */}
            <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-[var(--component-command-palette-border)]">
              <Search
                className="shrink-0 text-[var(--component-command-palette-badge-text)]"
                style={{ width: 16, height: 16 }}
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className={cn(
                  "flex-1 bg-transparent text-[length:var(--alias-typography-body-text2-font-size)] text-[var(--component-command-palette-input-text)]",
                  "placeholder:text-[var(--component-command-palette-input-placeholder)]",
                  "outline-none border-none focus:ring-0"
                )}
                aria-autocomplete="list"
                autoComplete="off"
              />
              <kbd
                className={cn(
                  "hidden sm:inline-flex items-center gap-0.5 shrink-0",
                  "text-[10px] text-[var(--component-command-palette-badge-text)]",
                  "border border-[var(--component-command-palette-badge-bg)] rounded px-1 py-0.5"
                )}
              >
                Esc
              </kbd>
            </div>

            {/* Results */}
            <div
              ref={listRef}
              role="listbox"
              className="overflow-y-auto flex-1 p-1.5"
            >
              {flatItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-1.5 py-10 text-center">
                  <Search
                    className="text-[var(--alias-color-border-default)]"
                    style={{ width: 24, height: 24 }}
                  />
                  <p className="text-[length:var(--alias-typography-body-text2-font-size)] text-[var(--alias-color-text-subtle)]">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-[length:var(--alias-typography-caption1-font-size)] text-[var(--component-command-palette-badge-text)]">
                    Try a different search term.
                  </p>
                </div>
              ) : (
                Object.entries(grouped).map(([group, groupItems]) => (
                  <div key={group}>
                    {/* Group label */}
                    <p
                      className={cn(
                        "px-[var(--alias-spacing-padding-xs)] py-1 text-[10px] font-[number:var(--base-font-weight-semibold)] tracking-wider uppercase",
                        "text-[var(--component-command-palette-badge-text)]"
                      )}
                    >
                      {group}
                    </p>

                    {/* Items */}
                    {groupItems.map((item) => {
                      const currentIndex = flatIndex++
                      const isActive = currentIndex === activeIndex

                      return (
                        <button
                          key={item.id}
                          role="option"
                          aria-selected={isActive}
                          data-active={isActive}
                          className={cn(
                            "w-full flex items-center gap-2.5 px-[var(--alias-spacing-padding-xs)] py-[var(--alias-spacing-padding-xs)] rounded-[var(--base-radius-sm)]",
                            "text-left text-[length:var(--alias-typography-body-text2-font-size)] [transition:var(--alias-motion-transition-normal)]",
                            isActive
                              ? "bg-[var(--component-command-palette-item-selected-bg)] text-[var(--component-command-palette-item-selected-text)]"
                              : "text-[var(--component-command-palette-item-text)] hover:bg-[var(--component-command-palette-item-hover-bg)]"
                          )}
                          onMouseEnter={() => setActiveIndex(currentIndex)}
                          onClick={() => {
                            item.onSelect()
                            onOpenChange(false)
                          }}
                        >
                          {item.icon && (
                            <span
                              className={cn(
                                "shrink-0 flex items-center justify-center",
                                isActive
                                  ? "text-[var(--alias-color-border-active)]"
                                  : "text-[var(--component-command-palette-badge-text)]"
                              )}
                              style={{ width: 16, height: 16 }}
                            >
                              {item.icon}
                            </span>
                          )}
                          <span className="flex-1 min-w-0">
                            <span className="block font-[number:var(--base-font-weight-medium)] truncate">
                              {item.label}
                            </span>
                            {item.description && (
                              <span
                                className={cn(
                                  "block text-[length:var(--alias-typography-caption1-font-size)] truncate",
                                  isActive
                                    ? "text-[var(--alias-color-border-active)]"
                                    : "text-[var(--component-command-palette-badge-text)]"
                                )}
                              >
                                {item.description}
                              </span>
                            )}
                          </span>
                          {item.shortcut && (
                            <kbd
                              className={cn(
                                "shrink-0 text-[10px] border rounded px-1 py-0.5",
                                isActive
                                  ? "border-[var(--alias-color-background-hover)] text-[var(--alias-color-border-active)]"
                                  : "border-[var(--component-command-palette-badge-bg)] text-[var(--component-command-palette-badge-text)]"
                              )}
                            >
                              {item.shortcut}
                            </kbd>
                          )}
                        </button>
                      )
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer hint */}
            <div
              className={cn(
                "flex items-center gap-3 px-3 py-2 border-t border-[var(--component-command-palette-border)]",
                "text-[10px] text-[var(--component-command-palette-badge-text)]"
              )}
            >
              <span className="flex items-center gap-1">
                <kbd className="border border-[var(--component-command-palette-badge-bg)] rounded px-1">↑</kbd>
                <kbd className="border border-[var(--component-command-palette-badge-bg)] rounded px-1">↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="border border-[var(--component-command-palette-badge-bg)] rounded px-1">↵</kbd>
                select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="border border-[var(--component-command-palette-badge-bg)] rounded px-1">Esc</kbd>
                close
              </span>
            </div>
          </div>
      </div>
    </>
  )
}
