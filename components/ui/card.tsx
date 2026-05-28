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
        "group/card flex flex-col gap-[var(--alias-spacing-stack-md)] overflow-hidden rounded-[var(--component-card-border-radius)] bg-[var(--component-card-background)] py-[var(--alias-spacing-padding-md)] text-[length:var(--alias-typography-body-text2-font-size)] text-[var(--component-card-body-color)] border border-[var(--component-card-border)] shadow-[var(--component-card-shadow)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0",
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
        "group/card-header @container/card-header grid auto-rows-min items-start gap-[var(--alias-spacing-inline-xs)] rounded-t-[var(--component-card-border-radius)] px-[var(--alias-spacing-padding-md)] group-data-[size=sm]/card:px-[var(--alias-spacing-padding-sm)] has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",
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
        "text-[length:var(--alias-typography-body-text1-font-size)] leading-snug font-[number:var(--base-font-weight-semibold)] text-[var(--component-card-title-color)] group-data-[size=sm]/card:text-[length:var(--alias-typography-body-text2-font-size)]",
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
      className={cn("text-[length:var(--alias-typography-body-text2-font-size)] text-[var(--component-card-body-color)]", className)}
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
      className={cn("px-[var(--alias-spacing-padding-md)] group-data-[size=sm]/card:px-[var(--alias-spacing-padding-sm)]", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-[var(--component-card-border-radius)] border-t bg-[var(--alias-color-background-tertiary)]/50 px-[var(--alias-spacing-padding-md)] py-[var(--alias-spacing-padding-sm)] group-data-[size=sm]/card:px-[var(--alias-spacing-padding-sm)] group-data-[size=sm]/card:py-2.5",
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
  default: "bg-[var(--component-card-background)] ring-[var(--alias-color-text-primary)]/10",
  brand:   "bg-[var(--alias-color-background-brand)] text-[var(--alias-color-text-inverse)] ring-[var(--alias-color-icon-brand)]",
  success: "bg-[var(--alias-color-feedback-success-bg)] text-[var(--alias-color-feedback-success-fg)] ring-[var(--alias-color-feedback-success-fg)]/20",
  warning: "bg-[var(--alias-color-feedback-warning-bg)] text-[var(--alias-color-feedback-warning-fg)] ring-[var(--alias-color-feedback-warning-fg)]/20",
  error:   "bg-[var(--alias-color-feedback-error-bg)] text-[var(--alias-color-feedback-error-fg)] ring-[var(--alias-color-feedback-error-fg)]/20",
}

const trendConfig = {
  up:      { icon: TrendingUp,   color: "text-[var(--semantic-color-success-800)]" },
  down:    { icon: TrendingDown, color: "text-[var(--semantic-color-error-600)]" },
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
        "group/card flex flex-col gap-[var(--alias-spacing-stack-sm)] overflow-hidden rounded-[var(--base-radius-xl)] py-[var(--alias-spacing-padding-md)] px-[var(--alias-spacing-padding-md)] ring-1 text-[length:var(--alias-typography-body-text2-font-size)]",
        size === "sm" ? "gap-[var(--alias-spacing-stack-xs)] py-[var(--alias-spacing-padding-sm)] px-[var(--alias-spacing-padding-sm)]" : "gap-[var(--alias-spacing-stack-sm)] py-[var(--alias-spacing-padding-md)] px-[var(--alias-spacing-padding-md)]",
        metricVariants[variant],
        className
      )}
    >
      {/* Top row — label + icon */}
      <div className="flex items-center justify-between">
        <p className={cn(
          "text-[length:var(--alias-typography-caption1-font-size)] font-[number:var(--base-font-weight-medium)] uppercase tracking-wide",
          isBrand ? "text-white/70" : "text-[var(--alias-color-text-subtle)]"
        )}>
          {label}
        </p>
        {icon && (
          <div className={cn(
            "flex items-center justify-center rounded-[var(--base-radius-md)] p-1.5 [&_svg]:size-4",
            isBrand ? "bg-white/10 text-white" : "bg-[var(--alias-color-background-tertiary)] text-[var(--alias-color-text-subtle)]"
          )}>
            {icon}
          </div>
        )}
      </div>

      {/* Value */}
      <p className={cn(
        "font-[number:var(--base-font-weight-bold)] leading-none",
        size === "sm" ? "text-2xl" : "text-3xl",
        isBrand ? "text-white" : "text-[var(--alias-color-text-primary)]"
      )}>
        {value}
      </p>

      {/* Trend */}
      {(trend || trendValue) && (
        <div className="flex items-center gap-[var(--alias-spacing-inline-xs)]">
          {TrendIcon && (
            <TrendIcon className={cn("size-3.5 shrink-0", isBrand ? "text-white/70" : trendColor)} />
          )}
          {trendValue && (
            <span className={cn(
              "text-[length:var(--alias-typography-caption1-font-size)] font-[number:var(--base-font-weight-medium)]",
              isBrand ? "text-white/90" : trendColor
            )}>
              {trendValue}
            </span>
          )}
          {trendLabel && (
            <span className={cn(
              "text-[length:var(--alias-typography-caption1-font-size)]",
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
