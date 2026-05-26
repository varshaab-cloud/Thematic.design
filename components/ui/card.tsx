import * as React from "react"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-4 overflow-hidden rounded-[var(--base-radius-md)] bg-[var(--alias-color-background-primary)] py-4 text-sm text-[var(--alias-color-text-primary)] border border-[var(--base-color-gray-200)] shadow-[var(--base-shadow-02)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-[var(--base-radius-md)] px-4 group-data-[size=sm]/card:px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-base leading-snug font-semibold group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-[var(--alias-color-text-subtle)]", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4 group-data-[size=sm]/card:px-3", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-[var(--base-radius-md)] border-t bg-[var(--alias-color-background-tertiary)]/50 px-4 py-3 group-data-[size=sm]/card:px-3 group-data-[size=sm]/card:py-2.5",
        className
      )}
      {...props}
    />
  )
}

// MetricCard — dashboard stat card with value, label, trend and optional icon
export interface MetricCardProps {
  label: string
  value: string | number
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  trendLabel?: string
  icon?: React.ReactNode
  variant?: "default" | "brand" | "success" | "warning" | "error"
  size?: "default" | "sm"
  className?: string
}

const metricVariants: Record<string, string> = {
  default: "bg-[var(--alias-color-background-primary)] ring-[var(--alias-color-text-primary)]/10",
  brand:   "bg-[var(--base-color-blue-800)] text-white ring-[var(--base-color-blue-700)]",
  success: "bg-[var(--base-color-success-800)] ring-[var(--base-color-success-900)]/20",
  warning: "bg-[var(--base-color-warning-50)] ring-[var(--base-color-warning-100)]/40",
  error:   "bg-[var(--base-color-error-200)] ring-[var(--base-color-error-300)]/20",
}

const trendConfig = {
  up:      { icon: TrendingUp,   color: "text-[var(--base-color-green-800)]" },
  down:    { icon: TrendingDown, color: "text-[var(--base-color-error-300)]" },
  neutral: { icon: Minus,        color: "text-[var(--alias-color-text-subtle)]" },
}

function MetricCard({
  label,
  value,
  trend,
  trendValue,
  trendLabel,
  icon,
  variant = "default",
  size = "default",
  className,
}: MetricCardProps) {
  const TrendIcon = trend ? trendConfig[trend].icon : null
  const trendColor = trend ? trendConfig[trend].color : ""
  const isBrand = variant === "brand"

  return (
    <div
      data-slot="metric-card"
      className={cn(
        "group/card flex flex-col gap-3 overflow-hidden rounded-xl py-4 px-4 ring-1 text-sm",
        size === "sm" ? "gap-2 py-3 px-3" : "gap-3 py-4 px-4",
        metricVariants[variant],
        className
      )}
    >
      {/* Top row — label + icon */}
      <div className="flex items-center justify-between">
        <p className={cn(
          "text-xs font-medium uppercase tracking-wide",
          isBrand ? "text-white/70" : "text-[var(--alias-color-text-subtle)]"
        )}>
          {label}
        </p>
        {icon && (
          <div className={cn(
            "flex items-center justify-center rounded-md p-1.5 [&_svg]:size-4",
            isBrand ? "bg-white/10 text-white" : "bg-[var(--alias-color-background-tertiary)] text-[var(--alias-color-text-subtle)]"
          )}>
            {icon}
          </div>
        )}
      </div>

      {/* Value */}
      <p className={cn(
        "font-bold leading-none",
        size === "sm" ? "text-2xl" : "text-3xl",
        isBrand ? "text-white" : "text-[var(--alias-color-text-primary)]"
      )}>
        {value}
      </p>

      {/* Trend */}
      {(trend || trendValue) && (
        <div className="flex items-center gap-1">
          {TrendIcon && (
            <TrendIcon className={cn("size-3.5 shrink-0", isBrand ? "text-white/70" : trendColor)} />
          )}
          {trendValue && (
            <span className={cn(
              "text-xs font-medium",
              isBrand ? "text-white/90" : trendColor
            )}>
              {trendValue}
            </span>
          )}
          {trendLabel && (
            <span className={cn(
              "text-xs",
              isBrand ? "text-white/60" : "text-[var(--alias-color-text-subtle)]"
            )}>
              {trendLabel}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  MetricCard,
}
