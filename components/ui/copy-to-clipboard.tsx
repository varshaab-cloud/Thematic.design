"use client"

import * as React from "react"
import { Copy, Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

type CopyState = "idle" | "copied" | "error"

export interface CopyToClipboardProps {
  value: string
  children?: React.ReactNode
  timeout?: number
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeClasses = {
  sm: "size-6 [&_svg]:size-3",
  md: "size-7 [&_svg]:size-3.5",
  lg: "size-8 [&_svg]:size-4",
}

function CopyToClipboard({
  value,
  children,
  timeout = 2000,
  size = "md",
  className,
}: CopyToClipboardProps) {
  const [state, setState] = React.useState<CopyState>("idle")
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleCopy = React.useCallback(async () => {
    if (state !== "idle") return
    try {
      await navigator.clipboard.writeText(value)
      setState("copied")
    } catch {
      setState("error")
    }
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setState("idle"), timeout)
  }, [value, timeout, state])

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const icon =
    state === "copied" ? (
      <Check />
    ) : state === "error" ? (
      <X />
    ) : (
      <Copy />
    )

  const ariaLabel =
    state === "copied" ? "Copied" : state === "error" ? "Failed to copy" : "Copy to clipboard"

  const button = (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={ariaLabel}
      data-slot="copy-button"
      data-state={state}
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--component-copy-to-clipboard-border-radius)] [transition:var(--alias-motion-transition-normal)] outline-none",
        "focus-visible:ring-2 focus-visible:ring-[var(--alias-color-border-active)]/50",
        state === "idle" &&
          "text-[var(--component-copy-to-clipboard-icon-color)] hover:text-[var(--alias-color-text-primary)] hover:bg-[var(--component-copy-to-clipboard-hover-bg)]",
        state === "copied" &&
          "text-[var(--component-copy-to-clipboard-success-color)] bg-[var(--component-copy-to-clipboard-success-bg)]",
        state === "error" &&
          "text-[var(--component-copy-to-clipboard-error-color)] bg-[var(--component-copy-to-clipboard-error-bg)]",
        sizeClasses[size],
        !children && className
      )}
    >
      {icon}
      {state === "copied" && (
        <span className="ml-1 text-[length:var(--alias-typography-caption1-font-size)] font-[number:var(--base-font-weight-medium)]">Copied</span>
      )}
    </button>
  )

  if (!children) return button

  return (
    <div
      data-slot="copy-to-clipboard"
      className={cn("relative inline-flex items-center", className)}
    >
      {children}
      {button}
    </div>
  )
}

export { CopyToClipboard }
