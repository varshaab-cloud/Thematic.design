"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg":     "var(--component-feedback-toast-info-color-bg)",
          "--normal-text":   "var(--component-feedback-toast-info-color-text)",
          "--normal-border": "var(--component-feedback-toast-info-color-stroke)",
          "--border-radius": "var(--component-feedback-toast-shared-dimension-radius)",
          "--font-family":   "var(--base-font-family-primary)",
          "--success-bg":    "var(--component-feedback-toast-success-color-bg)",
          "--success-border":"var(--component-feedback-toast-success-color-stroke)",
          "--error-bg":      "var(--component-feedback-toast-error-color-bg)",
          "--error-border":  "var(--component-feedback-toast-error-color-stroke)",
          "--warning-bg":    "var(--component-feedback-toast-warning-color-bg)",
          "--warning-border":"var(--component-feedback-toast-warning-color-stroke)",
          "--info-bg":       "var(--component-feedback-toast-info-color-bg)",
          "--info-border":   "var(--component-feedback-toast-info-color-stroke)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
