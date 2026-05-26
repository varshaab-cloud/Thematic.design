"use client"

import * as React from "react"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface TagInputProps {
  value: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
  disabled?: boolean
  maxTags?: number
  className?: string
}

function TagInput({
  value,
  onChange,
  placeholder = "Add tags…",
  disabled = false,
  maxTags,
  className,
}: TagInputProps) {
  const [inputValue, setInputValue] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)
  const isAtMax = maxTags !== undefined && value.length >= maxTags

  const addTag = (raw: string) => {
    const tag = raw.trim()
    if (!tag) return
    if (value.includes(tag)) {
      setInputValue("")
      return
    }
    if (maxTags !== undefined && value.length >= maxTags) return
    onChange([...value, tag])
    setInputValue("")
  }

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag(inputValue)
    } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    // Treat comma as a tag separator
    if (raw.endsWith(",")) {
      addTag(raw.slice(0, -1))
    } else {
      setInputValue(raw)
    }
  }

  const handleContainerClick = () => {
    inputRef.current?.focus()
  }

  return (
    <div
      role="group"
      onClick={handleContainerClick}
      className={cn(
        "flex min-h-8 w-full flex-wrap items-center gap-1 rounded-[var(--component-input-border-radius)] border border-[var(--component-input-border)] bg-[var(--component-input-background)] px-2.5 py-1 text-sm transition-colors",
        "focus-within:border-[var(--component-input-border-focus)] focus-within:ring-3 focus-within:ring-[var(--alias-color-border-active)]/20",
        disabled && "cursor-not-allowed opacity-50 bg-[var(--component-input-background-disabled)]",
        className
      )}
    >
      {value.map((tag, index) => (
        <span
          key={index}
          role="listitem"
          className="inline-flex items-center gap-1 rounded-full bg-[var(--alias-color-background-tertiary)] px-2 py-0.5 text-xs text-[var(--alias-color-text-secondary)]"
          style={{ fontSize: "12px" }}
        >
          {tag}
          {!disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                removeTag(index)
              }}
              aria-label={`Remove ${tag}`}
              className="flex items-center text-[var(--alias-color-text-tertiary)] hover:text-[var(--alias-color-text-primary)] transition-colors"
            >
              <XIcon style={{ width: "12px", height: "12px" }} />
            </button>
          )}
        </span>
      ))}

      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled || isAtMax}
        placeholder={value.length === 0 ? placeholder : isAtMax ? `Max ${maxTags} tags reached` : ""}
        aria-label={placeholder}
        className={cn(
          "min-w-20 flex-1 bg-transparent text-sm text-[var(--component-input-text)] outline-none placeholder:text-[var(--component-input-text-placeholder)]",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
      />
    </div>
  )
}

export { TagInput }
