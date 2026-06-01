import * as React from "react"
import { Info, AlertTriangle, XCircle, CheckCircle2, X } from "lucide-react"

import { cn } from "@/lib/utils"

type SystemBannerVariant = "info" | "warning" | "error" | "success"

const variantConfig: Record<
  SystemBannerVariant,
  {
    bg: string
    fg: string
    Icon: React.ElementType
    role: "status" | "alert"
  }
> = {
  info: {
    bg: "bg-[var(--component-system-banner-info-color-bg)]",
    fg: "text-[var(--component-system-banner-info-color-text)]",
    Icon: Info,
    role: "status",
  },
  warning: {
    bg: "bg-[var(--component-system-banner-warning-color-bg)]",
    fg: "text-[var(--component-system-banner-warning-color-text)]",
    Icon: AlertTriangle,
    role: "alert",
  },
  error: {
    bg: "bg-[var(--component-system-banner-error-color-bg)]",
    fg: "text-[var(--component-system-banner-error-color-text)]",
    Icon: XCircle,
    role: "alert",
  },
  success: {
    bg: "bg-[var(--component-system-banner-success-color-bg)]",
    fg: "text-[var(--component-system-banner-success-color-text)]",
    Icon: CheckCircle2,
    role: "status",
  },
}

export interface SystemBannerProps {
  variant?: SystemBannerVariant
  children: React.ReactNode
  action?: React.ReactNode
  onDismiss?: () => void
  className?: string
}

function SystemBanner({
  variant = "info",
  children,
  action,
  onDismiss,
  className,
}: SystemBannerProps) {
  const { bg, fg, Icon, role } = variantConfig[variant]

  return (
    <div
      data-slot="system-banner"
      data-variant={variant}
      role={role}
      className={cn(
        "flex w-full items-center gap-[var(--alias-spacing-inline-md)] px-[var(--alias-spacing-padding-lg)] py-[var(--alias-spacing-padding-sm)] text-[length:var(--alias-typography-body-text2-font-size)]",
        bg,
        fg,
        className
      )}
    >
      <Icon
        aria-hidden="true"
        className="h-4 w-4 shrink-0"
      />

      <span className="flex-1">{children}</span>

      {action && (
        <span className="shrink-0">{action}</span>
      )}

      {onDismiss && (
        <button
          type="button"
          aria-label="Dismiss banner"
          onClick={onDismiss}
          className={cn(
            "shrink-0 rounded p-0.5 [transition:var(--alias-motion-transition-fade)] hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
            fg
          )}
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export { SystemBanner }
