"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "radix-ui"
import { ChevronDownIcon, CheckIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface MultiSelectOption {
  value: string
  label: string
}

export interface MultiSelectProps {
  options: MultiSelectOption[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select options",
  disabled = false,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue))
    } else {
      onChange([...value, optionValue])
    }
  }

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange([])
  }

  const selectedLabels = value.map(
    (v) => options.find((o) => o.value === v)?.label ?? v
  )

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={disabled ? undefined : setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "flex h-8 w-full min-w-0 items-center justify-between gap-1.5 rounded-[var(--component-input-border-radius)] border border-[var(--component-input-border)] bg-[var(--component-input-background)] px-2.5 py-[var(--alias-spacing-inline-xs)] text-[length:var(--alias-typography-button-font-size)] [transition:var(--alias-motion-transition-normal)] outline-none",
            "focus-visible:border-[var(--component-input-border-focus)] focus-visible:ring-3 focus-visible:ring-[var(--alias-color-border-active)]/20",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--component-input-background-disabled)]",
            open && "border-[var(--component-input-border-focus)] ring-3 ring-[var(--alias-color-border-active)]/20",
            className
          )}
        >
          <span className="flex flex-1 flex-wrap items-center gap-[var(--alias-spacing-inline-xs)] overflow-hidden">
            {selectedLabels.length === 0 ? (
              <span className="text-[var(--component-input-text-placeholder)]">
                {placeholder}
              </span>
            ) : (
              selectedLabels.map((label, i) => (
                <span
                  key={value[i]}
                  className="inline-flex items-center rounded-[var(--component-multi-select-tag-border-radius)] bg-[var(--component-multi-select-tag-bg)] px-[var(--alias-spacing-padding-xs)] py-0.5 text-[length:var(--alias-typography-caption1-font-size)] text-[var(--component-multi-select-tag-text)]"
                >
                  {label}
                </span>
              ))
            )}
          </span>

          <span className="flex shrink-0 items-center gap-[var(--alias-spacing-inline-xs)]">
            {value.length > 0 && !disabled && (
              <span
                role="button"
                tabIndex={-1}
                onClick={clearAll}
                className="flex items-center rounded text-[var(--component-multi-select-tag-remove-color)] hover:text-[var(--alias-color-text-primary)] text-[length:var(--alias-typography-caption1-font-size)] px-0.5 cursor-pointer"
                aria-label="Clear all selections"
              >
                Clear
              </span>
            )}
            <ChevronDownIcon
              className={cn(
                "size-4 text-[var(--alias-color-text-subtle)] [transition:var(--alias-motion-transition-normal)]",
                open && "rotate-180"
              )}
            />
          </span>
        </button>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          className={cn(
            "z-50 min-w-[var(--radix-popover-trigger-width)] overflow-hidden rounded-[var(--base-radius-sm)] border border-[var(--alias-color-border-default)] bg-[var(--component-multi-select-dropdown-bg)] shadow-[var(--component-multi-select-dropdown-shadow)]",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
          )}
        >
          <ul
            role="listbox"
            aria-multiselectable="true"
            className="max-h-60 overflow-y-auto p-[var(--alias-spacing-inline-xs)]"
          >
            {options.map((option) => {
              const isSelected = value.includes(option.value)
              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => toggleOption(option.value)}
                  className={cn(
                    "flex cursor-pointer items-center gap-[var(--alias-spacing-inline-sm)] rounded-[var(--base-radius-md)] px-[var(--alias-spacing-padding-xs)] py-1.5 text-[length:var(--alias-typography-button-font-size)] text-[var(--alias-color-text-primary)] select-none",
                    "hover:bg-[var(--component-multi-select-option-hover-bg)]",
                    isSelected && "bg-[var(--component-multi-select-option-selected-bg)]"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-4 shrink-0 items-center justify-center rounded border border-[var(--alias-color-border-default)]",
                      isSelected && "border-[var(--alias-color-border-active)] bg-[var(--alias-color-border-active)]"
                    )}
                  >
                    {isSelected && (
                      <CheckIcon className="size-3 text-white" />
                    )}
                  </span>
                  {option.label}
                </li>
              )
            })}
          </ul>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

export { MultiSelect }
