"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

// ◆ design-lead
// Combobox — searchable single or multi-select built on Popover + Command.
// Taste profile: white bg, gray-200 border trigger, blue-800 for selected checkmarks,
// gray-100 hover on items. Labels medium weight. Clear button on selection.

export interface ComboboxOption {
  value: string
  label: string
  description?: string
}

export interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  label?: string
  helperText?: string
  errorMessage?: string
  required?: boolean
  disabled?: boolean
  fullWidth?: boolean
  className?: string
}

function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select an option…",
  searchPlaceholder = "Search…",
  emptyText = "No results found.",
  label,
  helperText,
  errorMessage,
  required,
  disabled,
  fullWidth = true,
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const hasError = !!errorMessage
  const selected = options.find((o) => o.value === value)

  return (
    <div className={cn("flex flex-col gap-1", fullWidth ? "w-full" : "w-auto", className)}>
      {label && (
        <label className="text-sm font-medium text-[var(--alias-color-text-primary)]">
          {label}
          {required && <span className="text-[var(--alias-color-feedback-error-fg)] ml-1">*</span>}
        </label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            role="combobox"
            aria-expanded={open}
            aria-invalid={hasError || undefined}
            disabled={disabled}
            className={cn(
              "flex h-8 w-full items-center justify-between gap-1.5 rounded-[var(--base-radius-md)]",
              "border border-[var(--base-color-gray-300)] bg-[var(--base-color-white)]",
              "px-2.5 text-sm transition-colors outline-none",
              "hover:border-[var(--base-color-gray-400)]",
              "focus-visible:border-[var(--alias-color-border-active)] focus-visible:ring-3 focus-visible:ring-[var(--alias-color-border-active)]/50",
              "disabled:pointer-events-none disabled:opacity-50 disabled:bg-[var(--base-color-gray-100)]",
              hasError && "border-[var(--alias-color-border-error)] ring-3 ring-[var(--alias-color-feedback-error-fg)]/20",
              !selected && "text-[var(--alias-color-text-subtle)]"
            )}
          >
            <span className="truncate">
              {selected ? selected.label : placeholder}
            </span>
            <div className="flex items-center gap-1 shrink-0">
              {selected && !disabled && (
                <span
                  role="button"
                  tabIndex={0}
                  aria-label="Clear selection"
                  onClick={(e) => {
                    e.stopPropagation()
                    onValueChange?.("")
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.stopPropagation()
                      onValueChange?.("")
                    }
                  }}
                  className="text-[var(--alias-color-text-subtle)] hover:text-[var(--alias-color-text-primary)] transition-colors cursor-pointer"
                >
                  <X className="size-3.5" />
                </span>
              )}
              <ChevronsUpDown className="size-3.5 text-[var(--alias-color-text-subtle)]" />
            </div>
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => {
                      onValueChange?.(option.value === value ? "" : option.value)
                      setOpen(false)
                    }}
                  >
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                      <span className="truncate">{option.label}</span>
                      {option.description && (
                        <span className="text-xs text-[var(--alias-color-text-subtle)] truncate">
                          {option.description}
                        </span>
                      )}
                    </div>
                    <Check
                      className={cn(
                        "size-4 shrink-0 text-[var(--base-color-blue-800)]",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {hasError && <p className="text-xs text-[var(--alias-color-feedback-error-fg)]">{errorMessage}</p>}
      {helperText && !hasError && <p className="text-xs text-[var(--alias-color-text-subtle)]">{helperText}</p>}
    </div>
  )
}

export { Combobox }
