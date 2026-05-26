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
    bg: "bg-[var(--alias-color-feedback-info-bg)]",
    fg: "text-[var(--alias-color-feedback-info-fg)]",
    Icon: Info,
    role: "status",
  },
  warning: {
    bg: "bg-[var(--alias-color-feedback-warning-bg)]",
    fg: "text-[var(--base-color-gray-900)]",
    Icon: AlertTriangle,
    role: "alert",
  },
  error: {
    bg: "bg-[var(--alias-color-feedback-error-bg)]",
    fg: "text-[var(--alias-color-feedback-error-fg)]",
    Icon: XCircle,
    role: "alert",
  },
  success: {
    bg: "bg-[var(--alias-color-feedback-success-bg)]",
    fg: "text-[var(--alias-color-feedback-success-fg)]",
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
        "flex w-full items-center gap-3 px-6 py-3 text-sm",
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
            "shrink-0 rounded p-0.5 transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
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
