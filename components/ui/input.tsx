import * as React from "react"
import { cn } from "@/lib/utils"

// Base input element
function InputBase({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-[var(--component-input-border-radius)] border border-[var(--component-input-border)] bg-[var(--component-input-background)] px-[var(--component-input-padding-x)] py-[var(--alias-spacing-inline-xs)] text-[length:var(--component-input-font-size)] text-[var(--component-input-text)] [transition:var(--alias-motion-transition-normal)] outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-[length:var(--alias-typography-body-text2-font-size)] file:font-[number:var(--base-font-weight-medium)] file:text-[var(--alias-color-text-primary)] placeholder:text-[var(--component-input-text-placeholder)] focus-visible:border-[var(--component-input-border-focus)] focus-visible:ring-3 focus-visible:ring-[var(--component-input-border-focus)]/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[var(--component-input-background-disabled)] disabled:text-[var(--component-input-text-disabled)] disabled:opacity-50 aria-invalid:border-[var(--component-input-border-error)] aria-invalid:ring-3 aria-invalid:ring-[var(--alias-color-feedback-error-fg)]/20 md:text-[length:var(--alias-typography-body-text2-font-size)] dark:bg-[var(--alias-color-border-default)]/30 dark:disabled:bg-[var(--alias-color-border-default)]/80 dark:aria-invalid:border-[var(--component-input-border-error)]/50 dark:aria-invalid:ring-[var(--alias-color-feedback-error-fg)]/40",
        className
      )}
      {...props}
    />
  )
}

// Size variants
const sizeClasses = {
  sm: "h-7 text-[length:var(--alias-typography-caption1-font-size)] px-[var(--alias-spacing-padding-xs)]",
  md: "h-8 text-[length:var(--alias-typography-body-text2-font-size)] px-2.5",
  lg: "h-10 text-[length:var(--alias-typography-body-text1-font-size)] px-[var(--alias-spacing-padding-sm)]",
}

// Full-featured Input wrapper
export interface InputProps extends React.ComponentProps<"input"> {
  label?: string
  helperText?: string
  errorMessage?: string
  successMessage?: string
  prefixIcon?: React.ReactNode
  suffixIcon?: React.ReactNode
  inputSize?: "sm" | "md" | "lg"
  maxChars?: number
  required?: boolean
  fullWidth?: boolean
}

function Input({
  className,
  label,
  helperText,
  errorMessage,
  successMessage,
  prefixIcon,
  suffixIcon,
  inputSize = "md",
  maxChars,
  required,
  fullWidth = true,
  type,
  value,
  onChange,
  ...props
}: InputProps) {
  const [internalValue, setInternalValue] = React.useState(
    (props.defaultValue as string) ?? ""
  )

  const isControlled = value !== undefined
  const currentValue = isControlled ? (value as string) : internalValue
  const hasError = !!errorMessage
  const hasSuccess = !!successMessage

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value)
    onChange?.(e)
  }

  return (
    <div className={cn("flex flex-col gap-[var(--alias-spacing-inline-xs)]", fullWidth ? "w-full" : "w-auto")}>
      {/* Label */}
      {label && (
        <label className="text-[length:var(--alias-typography-body-text2-font-size)] font-[number:var(--base-font-weight-medium)] text-[var(--alias-color-text-primary)]">
          {label}
          {required && <span className="text-[var(--alias-color-feedback-error-fg)] ml-1">*</span>}
        </label>
      )}

      {/* Input wrapper for icons */}
      <div className="relative flex items-center">
        {prefixIcon && (
          <div className="absolute left-2.5 flex items-center text-[var(--alias-color-text-subtle)] [&_svg]:size-4">
            {prefixIcon}
          </div>
        )}

        <input
          type={type}
          data-slot="input"
          aria-invalid={hasError || undefined}
          value={isControlled ? value : internalValue}
          onChange={handleChange}
          maxLength={maxChars}
          className={cn(
            "w-full min-w-0 rounded-[var(--component-input-border-radius)] border border-[var(--component-input-border)] bg-[var(--component-input-background)] py-[var(--component-input-padding-y)] text-[length:var(--component-input-font-size)] text-[var(--component-input-text)] [transition:var(--alias-motion-transition-normal)] outline-none placeholder:text-[var(--component-input-text-placeholder)] focus-visible:border-[var(--component-input-border-focus)] focus-visible:ring-3 focus-visible:ring-[var(--component-input-border-focus)]/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[var(--component-input-background-disabled)] disabled:text-[var(--component-input-text-disabled)] disabled:opacity-50 md:text-[length:var(--alias-typography-body-text2-font-size)] dark:bg-[var(--alias-color-border-default)]/30 dark:disabled:bg-[var(--alias-color-border-default)]/80",
            sizeClasses[inputSize],
            prefixIcon && "pl-8",
            suffixIcon && "pr-8",
            hasError && "border-[var(--component-input-border-error)] ring-3 ring-[var(--alias-color-feedback-error-fg)]/20 focus-visible:border-[var(--component-input-border-error)]",
            hasSuccess && "border-[var(--alias-color-border-success)] ring-3 ring-[var(--alias-color-feedback-success-border)]/30 focus-visible:border-[var(--alias-color-border-success)]",
            className
          )}
          {...props}
        />

        {suffixIcon && (
          <div className="absolute right-2.5 flex items-center text-[var(--alias-color-text-subtle)] [&_svg]:size-4">
            {suffixIcon}
          </div>
        )}
      </div>

      {/* Bottom row — helper/error/success + char count */}
      <div className="flex items-center justify-between">
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
            "text-[length:var(--alias-typography-caption1-font-size)] tabular-nums",
            currentValue.length >= maxChars ? "text-[var(--alias-color-feedback-error-fg)]" : "text-[var(--alias-color-text-subtle)]"
          )}>
            {currentValue.length}/{maxChars}
          </p>
        )}
      </div>
    </div>
  )
}

export { Input, InputBase }
