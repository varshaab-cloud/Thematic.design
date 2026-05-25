import * as React from "react"
import { cn } from "@/lib/utils"

// Base input element
function InputBase({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-[var(--base-radius-md)] border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

// Size variants
const sizeClasses = {
  sm: "h-7 text-xs px-2",
  md: "h-8 text-sm px-2.5",
  lg: "h-10 text-base px-3",
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
    <div className={cn("flex flex-col gap-1", fullWidth ? "w-full" : "w-auto")}>
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      {/* Input wrapper for icons */}
      <div className="relative flex items-center">
        {prefixIcon && (
          <div className="absolute left-2.5 flex items-center text-muted-foreground [&_svg]:size-4">
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
            "w-full min-w-0 rounded-[var(--base-radius-md)] border border-[var(--base-color-gray-300)] bg-[var(--base-color-white)] py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[var(--base-color-gray-100)] disabled:opacity-50 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80",
            sizeClasses[inputSize],
            prefixIcon && "pl-8",
            suffixIcon && "pr-8",
            hasError && "border-destructive ring-3 ring-destructive/20 focus-visible:border-destructive",
            hasSuccess && "border-[var(--base-color-success-900)] ring-3 ring-[var(--base-color-success-800)]/30 focus-visible:border-[var(--base-color-success-900)]",
            className
          )}
          {...props}
        />

        {suffixIcon && (
          <div className="absolute right-2.5 flex items-center text-muted-foreground [&_svg]:size-4">
            {suffixIcon}
          </div>
        )}
      </div>

      {/* Bottom row — helper/error/success + char count */}
      <div className="flex items-center justify-between">
        <div>
          {hasError && (
            <p className="text-xs text-destructive">{errorMessage}</p>
          )}
          {hasSuccess && !hasError && (
            <p className="text-xs text-[var(--base-color-green-800)]">{successMessage}</p>
          )}
          {helperText && !hasError && !hasSuccess && (
            <p className="text-xs text-muted-foreground">{helperText}</p>
          )}
        </div>
        {maxChars && (
          <p className={cn(
            "text-xs tabular-nums",
            currentValue.length >= maxChars ? "text-destructive" : "text-muted-foreground"
          )}>
            {currentValue.length}/{maxChars}
          </p>
        )}
      </div>
    </div>
  )
}

export { Input, InputBase }
