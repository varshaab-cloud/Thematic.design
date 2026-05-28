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
    <div className={cn("flex flex-col gap-[var(--alias-spacing-stack-xs)]", fullWidth ? "w-full" : "w-auto")}>

      {/* Label */}
      {label && (
        <label className="text-[length:var(--alias-typography-body-text2-font-size)] font-[number:var(--base-font-weight-medium)] text-[var(--alias-color-text-primary)]">
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
          "w-full min-w-0 rounded-[var(--component-textarea-border-radius)] border border-[var(--component-textarea-border)] bg-[var(--component-textarea-background)]",
          "px-2.5 py-[var(--alias-spacing-padding-xs)] text-[length:var(--alias-typography-body-text2-font-size)] text-[var(--component-textarea-text)] [transition:var(--alias-motion-transition-normal)] outline-none resize-y",
          "placeholder:text-[var(--component-textarea-placeholder)]",
          "focus-visible:border-[var(--component-textarea-border-focus)] focus-visible:ring-3 focus-visible:ring-[var(--component-textarea-border-focus)]/50",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[var(--component-textarea-background-disabled)] disabled:text-[var(--component-textarea-disabled-text)] disabled:opacity-50",
          "read-only:bg-[var(--component-textarea-background-disabled)] read-only:cursor-default",
          hasError && "border-[var(--component-textarea-border-error)] ring-3 ring-[var(--alias-color-feedback-error-fg)]/20 focus-visible:border-[var(--component-textarea-border-error)]",
          hasSuccess && !hasError && "border-[var(--component-textarea-border-success)] ring-3 ring-[var(--alias-color-feedback-success-border)]/30 focus-visible:border-[var(--component-textarea-border-success)]",
          autoResize && "resize-none overflow-hidden",
          className
        )}
        {...props}
      />

      {/* Bottom row — feedback + char count */}
      <div className="flex items-start justify-between gap-[var(--alias-spacing-inline-sm)]">
        <div>
          {hasError && (
            <p className="text-[length:var(--alias-typography-caption1-font-size)] text-[var(--alias-color-feedback-error-fg)]">{errorMessage}</p>
          )}
          {hasSuccess && !hasError && (
            <p className="text-[length:var(--alias-typography-caption1-font-size)] text-[var(--alias-color-feedback-success-fg)]">{successMessage}</p>
          )}
          {helperText && !hasError && !hasSuccess && (
            <p className="text-[length:var(--alias-typography-caption1-font-size)] text-[var(--alias-color-text-subtle)]">{helperText}</p>
          )}
        </div>
        {maxChars && (
          <p className={cn(
            "text-[length:var(--alias-typography-caption1-font-size)] tabular-nums shrink-0",
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
