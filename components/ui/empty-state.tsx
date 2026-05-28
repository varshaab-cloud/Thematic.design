import * as React from "react"
import { cn } from "@/lib/utils"

// ─── EmptyState ───────────────────────────────────────────────────────────────
// Fills the space where content would normally appear.
// Use sm inside cards/panels, md in tables/list views, lg for full-page states.

export interface EmptyStateProps {
  /** Optional icon element — any ReactNode, including a LucideIcon */
  icon?: React.ReactNode
  /** Short statement of the current state — not a question */
  heading: string
  /** One-sentence answer to "what now?" */
  description?: string
  /** Optional CTA — typically a Button */
  action?: React.ReactNode
  /** Visual size. Defaults to "md". */
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeConfig = {
  sm: {
    wrapper: "max-w-[280px]",
    iconSize: "32px",
    headingStyle: { fontSize: "14px", fontWeight: 600 } as React.CSSProperties,
    descriptionStyle: { fontSize: "13px" } as React.CSSProperties,
    gap: "gap-[var(--alias-spacing-stack-xs)]",
  },
  md: {
    wrapper: "max-w-[360px]",
    iconSize: "48px",
    headingStyle: { fontSize: "16px", fontWeight: 600 } as React.CSSProperties,
    descriptionStyle: { fontSize: "14px" } as React.CSSProperties,
    gap: "gap-[var(--alias-spacing-stack-sm)]",
  },
  lg: {
    wrapper: "max-w-[480px]",
    iconSize: "64px",
    headingStyle: { fontSize: "20px", fontWeight: 600 } as React.CSSProperties,
    descriptionStyle: { fontSize: "15px" } as React.CSSProperties,
    gap: "gap-[var(--alias-spacing-stack-md)]",
  },
}

export function EmptyState({
  icon,
  heading,
  description,
  action,
  size = "md",
  className,
}: EmptyStateProps) {
  const config = sizeConfig[size]

  return (
    <div
      data-slot="empty-state"
      data-size={size}
      className={cn(
        "flex flex-col items-center justify-center text-center w-full",
        config.gap,
        config.wrapper,
        className
      )}
    >
      {icon && (
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            width: config.iconSize,
            height: config.iconSize,
            color: "var(--component-empty-state-icon-color)",
          }}
          aria-hidden="true"
        >
          {icon}
        </div>
      )}

      <div className="flex flex-col items-center gap-1.5">
        <p
          style={{
            ...config.headingStyle,
            color: "var(--component-empty-state-title-color)",
            lineHeight: "1.4",
          }}
        >
          {heading}
        </p>

        {description && (
          <p
            style={{
              ...config.descriptionStyle,
              color: "var(--component-empty-state-description-color)",
              lineHeight: "1.5",
            }}
          >
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="flex items-center justify-center">
          {action}
        </div>
      )}
    </div>
  )
}
