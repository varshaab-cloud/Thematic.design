"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"
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

  let flatIndex = 0

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Semi-transparent backdrop */}
        <DialogPrimitive.Overlay
          className="fixed inset-0 z-50 bg-black/20"
          onClick={() => onOpenChange(false)}
        />

        {/* Panel positioned near the top */}
        <DialogPrimitive.Content
          aria-label="Command palette"
          className={cn(
            "fixed left-1/2 z-50 w-full max-w-xl -translate-x-1/2",
            "focus:outline-none"
          )}
          style={{ top: "80px" }}
          onKeyDown={handleKeyDown}
        >
          <div
            className={cn(
              "bg-white border border-[var(--base-color-gray-200)]",
              "rounded-[var(--base-radius-lg)] shadow-xl",
              "max-h-[400px] overflow-hidden flex flex-col"
            )}
          >
            {/* Search input */}
            <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-[var(--base-color-gray-200)]">
              <Search
                className="shrink-0 text-[var(--base-color-gray-400)]"
                style={{ width: 16, height: 16 }}
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className={cn(
                  "flex-1 bg-transparent text-sm text-[var(--base-color-gray-900)]",
                  "placeholder:text-[var(--base-color-gray-400)]",
                  "outline-none border-none focus:ring-0"
                )}
                aria-autocomplete="list"
                autoComplete="off"
              />
              <kbd
                className={cn(
                  "hidden sm:inline-flex items-center gap-0.5 shrink-0",
                  "text-[10px] text-[var(--base-color-gray-400)]",
                  "border border-[var(--base-color-gray-200)] rounded px-1 py-0.5"
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
                    className="text-[var(--base-color-gray-300)]"
                    style={{ width: 24, height: 24 }}
                  />
                  <p className="text-sm text-[var(--base-color-gray-500)]">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-xs text-[var(--base-color-gray-400)]">
                    Try a different search term.
                  </p>
                </div>
              ) : (
                Object.entries(grouped).map(([group, groupItems]) => (
                  <div key={group}>
                    {/* Group label */}
                    <p
                      className={cn(
                        "px-2 py-1 text-[10px] font-semibold tracking-wider uppercase",
                        "text-[var(--base-color-gray-400)]"
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
                            "w-full flex items-center gap-2.5 px-2 py-2 rounded-[var(--base-radius-sm)]",
                            "text-left text-sm transition-colors",
                            isActive
                              ? "bg-[var(--base-color-blue-50)] text-[var(--base-color-blue-800)]"
                              : "text-[var(--base-color-gray-900)] hover:bg-[var(--base-color-gray-100)]"
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
                                  ? "text-[var(--base-color-blue-600)]"
                                  : "text-[var(--base-color-gray-400)]"
                              )}
                              style={{ width: 16, height: 16 }}
                            >
                              {item.icon}
                            </span>
                          )}
                          <span className="flex-1 min-w-0">
                            <span className="block font-medium truncate">
                              {item.label}
                            </span>
                            {item.description && (
                              <span
                                className={cn(
                                  "block text-xs truncate",
                                  isActive
                                    ? "text-[var(--base-color-blue-600)]"
                                    : "text-[var(--base-color-gray-400)]"
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
                                  ? "border-[var(--base-color-blue-200)] text-[var(--base-color-blue-600)]"
                                  : "border-[var(--base-color-gray-200)] text-[var(--base-color-gray-400)]"
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
                "flex items-center gap-3 px-3 py-2 border-t border-[var(--base-color-gray-200)]",
                "text-[10px] text-[var(--base-color-gray-400)]"
              )}
            >
              <span className="flex items-center gap-1">
                <kbd className="border border-[var(--base-color-gray-200)] rounded px-1">↑</kbd>
                <kbd className="border border-[var(--base-color-gray-200)] rounded px-1">↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="border border-[var(--base-color-gray-200)] rounded px-1">↵</kbd>
                select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="border border-[var(--base-color-gray-200)] rounded px-1">Esc</kbd>
                close
              </span>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
