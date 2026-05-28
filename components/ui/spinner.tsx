import * as React from "react"
import { cn } from "@/lib/utils"

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
} as const

export interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "brand"
  label?: string
}

function Spinner({
  size = "md",
  variant = "default",
  label = "Loading",
  className,
  ...props
}: SpinnerProps) {
  const px = sizeMap[size]
  const r = (px / 2) * 0.75
  const circumference = 2 * Math.PI * r
  const dashArray = `${circumference * 0.75} ${circumference * 0.25}`

  return (
    <svg
      data-slot="spinner"
      data-size={size}
      data-variant={variant}
      width={px}
      height={px}
      viewBox={`0 0 ${px} ${px}`}
      fill="none"
      role="status"
      aria-label={label}
      className={cn("animate-spin", className)}
      style={{ ["--spinner-duration" as string]: "0.75s" }}
      {...props}
    >
      <style>{`
        @keyframes spinner-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        [data-slot="spinner"] {
          animation: spinner-spin 0.75s linear infinite;
          transform-origin: center;
        }
      `}</style>
      {/* Track */}
      <circle
        cx={px / 2}
        cy={px / 2}
        r={r}
        strokeWidth={px * 0.1}
        stroke={
          variant === "brand"
            ? "var(--component-spinner-brand-color)"
            : "var(--component-spinner-track-color)"
        }
        opacity={0.3}
      />
      {/* Arc */}
      <circle
        cx={px / 2}
        cy={px / 2}
        r={r}
        strokeWidth={px * 0.1}
        stroke={
          variant === "brand"
            ? "var(--component-spinner-brand-color)"
            : "var(--component-spinner-color)"
        }
        strokeLinecap="round"
        strokeDasharray={dashArray}
        strokeDashoffset={0}
        transform={`rotate(-90 ${px / 2} ${px / 2})`}
      />
      <span className="sr-only">{label}</span>
    </svg>
  )
}

export { Spinner }
