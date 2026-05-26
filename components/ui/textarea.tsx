"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// ◆ design-lead
// Textarea for multi-line text input in enterprise forms.
// Same surface treatment as Input — white bg, gray-300 border, blue focus ring.
// Supports auto-resize, char count, label, helper, error, success states.
// Taste profile: precise and functional, warmth through restraint.

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  label?: string
  helperText?: string
  errorMessage?: string
  successMessage?: string
  required?: boolean
  fullWidth?: boolean
  maxChars?: number
  autoResize?: boolean
}

function Textarea({
  className,
  label,
  helperText,
  errorMessage,
  successMessage,
  required,
  fullWidth = true,
  maxChars,
  autoResize = false,
  rows = 3,
  value,
  onChange,
  ...props
}: TextareaProps) {
  const [internalValue, setInternalValue] = React.useState(
    (props.defaultValue as string) ?? ""
  )
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const isControlled = value !== undefined
  const currentValue = isControlled ? (value as string) : internalValue
  const hasError   = !!errorMessage
  const hasSuccess = !!successMessage

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) setInternalValue(e.target.value)
    onChange?.(e)
    if (autoResize && textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  return (
    <div className={cn("flex flex-col gap-1", fullWidth ? "w-full" : "w-auto")}>

      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-[var(--alias-color-text-primary)]">
          {label}
          {required && <span className="text-[var(--alias-color-feedback-error-fg)] ml-1">*</span>}
        </label>
      )}

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        data-slot="textarea"
        rows={rows}
        aria-invalid={hasError || undefined}
        value={isControlled ? value : internalValue}
        onChange={handleChange}
        maxLength={maxChars}
        className={cn(
          "w-full min-w-0 rounded-[var(--base-radius-md)] border border-[var(--base-color-gray-300)] bg-[var(--base-color-white)]",
          "px-2.5 py-2 text-sm text-[var(--alias-color-text-primary)] transition-colors outline-none resize-y",
          "placeholder:text-[var(--alias-color-text-subtle)]",
          "focus-visible:border-[var(--alias-color-border-active)] focus-visible:ring-3 focus-visible:ring-[var(--alias-color-border-active)]/50",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[var(--base-color-gray-100)] disabled:opacity-50",
          "read-only:bg-[var(--base-color-gray-100)] read-only:cursor-default",
          hasError && "border-[var(--alias-color-border-error)] ring-3 ring-[var(--alias-color-feedback-error-fg)]/20 focus-visible:border-[var(--alias-color-border-error)]",
          hasSuccess && !hasError && "border-[var(--base-color-success-900)] ring-3 ring-[var(--base-color-success-800)]/30 focus-visible:border-[var(--base-color-success-900)]",
          autoResize && "resize-none overflow-hidden",
          className
        )}
        {...props}
      />

      {/* Bottom row — feedback + char count */}
      <div className="flex items-start justify-between gap-2">
        <div>
          {hasError && (
            <p className="text-xs text-[var(--alias-color-feedback-error-fg)]">{errorMessage}</p>
          )}
          {hasSuccess && !hasError && (
            <p className="text-xs text-[var(--base-color-green-800)]">{successMessage}</p>
          )}
          {helperText && !hasError && !hasSuccess && (
            <p className="text-xs text-[var(--alias-color-text-subtle)]">{helperText}</p>
          )}
        </div>
        {maxChars && (
          <p className={cn(
            "text-xs tabular-nums shrink-0",
            currentValue.length >= maxChars ? "text-[var(--alias-color-feedback-error-fg)]" : "text-[var(--alias-color-text-subtle)]"
          )}>
            {currentValue.length}/{maxChars}
          </p>
        )}
      </div>
    </div>
  )
}

export { Textarea }
