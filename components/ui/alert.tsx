import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

type AlertSize = "sm" | "md" | "lg"

const AlertSizeContext = React.createContext<AlertSize>("md")

const alertPaddingSizeClasses: Record<AlertSize, string> = {
  sm: "p-3 gap-1",
  md: "p-4 gap-1.5",
  lg: "p-5 gap-2",
}

const alertIconSizeClasses: Record<AlertSize, string> = {
  sm: "*:[svg]:!size-3.5",
  md: "*:[svg]:!size-4",
  lg: "*:[svg]:!size-5",
}

const alertTitleSizeClasses: Record<AlertSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
}

const alertDescriptionSizeClasses: Record<AlertSize, string> = {
  sm: "text-[11px]",
  md: "text-xs",
  lg: "text-sm",
}

const alertVariants = cva(
  "group/alert relative grid w-full rounded-[var(--base-radius-md)] border text-left has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-3 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current",
  {
    variants: {
      variant: {
        // Neutral / informational (no strong semantic colour)
        default: "bg-card text-card-foreground",
        // Severity variants — all backed by alias tokens, no raw colour values
        // error: state where something has failed (form validation, API error, system failure)
        error:
          "bg-[var(--alias-color-feedback-error-bg)] text-[var(--alias-color-feedback-error-fg)] border-[var(--alias-color-border-error)] *:data-[slot=alert-description]:text-[var(--alias-color-feedback-error-fg)]/80 *:[svg]:text-current",
        // destructive: alias for error — kept for backward compatibility; prefer 'error' for state, 'destructive' for irreversible action confirmations
        destructive:
          "bg-[var(--alias-color-feedback-error-bg)] text-[var(--alias-color-feedback-error-fg)] border-[var(--alias-color-border-error)] *:data-[slot=alert-description]:text-[var(--alias-color-feedback-error-fg)]/80 *:[svg]:text-current",
        // warning: something requires attention but hasn't failed
        warning:
          "bg-[var(--alias-color-feedback-warning-bg)] text-[var(--base-color-gray-900)] border-[var(--alias-color-border-warning)] *:data-[slot=alert-description]:text-[var(--base-color-gray-700)] *:[svg]:text-[var(--alias-color-feedback-warning-fg)]",
        // success: action completed successfully
        success:
          "bg-[var(--alias-color-feedback-success-bg)] text-[var(--alias-color-feedback-success-fg)] border-[var(--alias-color-border-success)] *:data-[slot=alert-description]:text-[var(--alias-color-feedback-success-fg)]/80 *:[svg]:text-current",
        // info: neutral informational message
        info:
          "bg-[var(--alias-color-feedback-info-bg)] text-[var(--alias-color-feedback-info-fg)] border-[var(--alias-color-border-info)] *:data-[slot=alert-description]:text-[var(--alias-color-feedback-info-fg)]/80 *:[svg]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  size = "md",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants> & { size?: AlertSize }) {
  return (
    <AlertSizeContext.Provider value={size}>
      <div
        data-slot="alert"
        role="alert"
        className={cn(alertVariants({ variant }), alertPaddingSizeClasses[size], alertIconSizeClasses[size], className)}
        {...props}
      />
    </AlertSizeContext.Provider>
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  const size = React.useContext(AlertSizeContext)
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        alertTitleSizeClasses[size],
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const size = React.useContext(AlertSizeContext)
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
        alertDescriptionSizeClasses[size],
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2 right-2", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
