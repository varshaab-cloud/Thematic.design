import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

type AlertSize = "sm" | "md" | "lg"

const AlertSizeContext = React.createContext<AlertSize>("md")

const alertPaddingSizeClasses: Record<AlertSize, string> = {
  sm: "p-[var(--alias-spacing-padding-sm)] gap-[var(--alias-spacing-inline-xs)]",
  md: "p-[var(--alias-spacing-padding-md)] gap-1.5",
  lg: "p-5 gap-2",
}

const alertIconSizeClasses: Record<AlertSize, string> = {
  sm: "*:[svg]:!size-3.5",
  md: "*:[svg]:!size-4",
  lg: "*:[svg]:!size-5",
}

const alertTitleSizeClasses: Record<AlertSize, string> = {
  sm: "text-[length:var(--alias-typography-caption1-font-size)]",
  md: "text-[length:var(--alias-typography-body-text2-font-size)]",
  lg: "text-[length:var(--alias-typography-body-text1-font-size)]",
}

const alertDescriptionSizeClasses: Record<AlertSize, string> = {
  sm: "text-[11px]",
  md: "text-[length:var(--alias-typography-caption1-font-size)]",
  lg: "text-[length:var(--alias-typography-body-text2-font-size)]",
}

const alertVariants = cva(
  "group/alert relative grid w-full rounded-[var(--component-alert-border-radius)] border text-left has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-3 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current",
  {
    variants: {
      variant: {
        // Neutral / informational (no strong semantic colour)
        default: "bg-[var(--component-alert-default-background)] text-[var(--component-alert-default-text)]",
        // Severity variants — all backed by alias tokens, no raw colour values
        // error: state where something has failed (form validation, API error, system failure)
        error:
          "bg-[var(--component-alert-error-background)] text-[var(--component-alert-error-text)] border-[var(--component-alert-error-border)] *:data-[slot=alert-description]:text-[var(--component-alert-error-description-color)] *:[svg]:text-current",
        // destructive: alias for error — kept for backward compatibility; prefer 'error' for state, 'destructive' for irreversible action confirmations
        destructive:
          "bg-[var(--component-alert-error-background)] text-[var(--component-alert-error-text)] border-[var(--component-alert-error-border)] *:data-[slot=alert-description]:text-[var(--component-alert-error-description-color)] *:[svg]:text-current",
        // warning: something requires attention but hasn't failed
        warning:
          "bg-[var(--component-alert-warning-background)] text-[var(--component-alert-warning-text)] border-[var(--component-alert-warning-border)] *:data-[slot=alert-description]:text-[var(--component-alert-warning-description-color)] *:[svg]:text-[var(--component-alert-warning-icon-color)]",
        // success: action completed successfully
        success:
          "bg-[var(--component-alert-success-background)] text-[var(--component-alert-success-text)] border-[var(--component-alert-success-border)] *:data-[slot=alert-description]:text-[var(--component-alert-success-description-color)] *:[svg]:text-current",
        // info: neutral informational message
        info:
          "bg-[var(--component-alert-info-background)] text-[var(--component-alert-info-text)] border-[var(--component-alert-info-border)] *:data-[slot=alert-description]:text-[var(--component-alert-info-description-color)] *:[svg]:text-current",
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
        "font-[number:var(--base-font-weight-medium)] group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-[var(--alias-color-text-primary)]",
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
        "text-balance text-[var(--component-alert-default-description-color)] md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-[var(--alias-color-text-primary)] [&_p:not(:last-child)]:mb-4",
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
