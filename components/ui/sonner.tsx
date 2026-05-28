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
          "--normal-bg":     "var(--component-sonner-background)",
          "--normal-text":   "var(--component-sonner-title-color)",
          "--normal-border": "var(--component-sonner-border)",
          "--border-radius": "var(--component-sonner-border-radius)",
          "--font-family":   "var(--base-font-family-primary)",
          "--success-bg":    "var(--component-sonner-success-bg)",
          "--success-border":"var(--component-sonner-success-border)",
          "--error-bg":      "var(--component-sonner-error-bg)",
          "--error-border":  "var(--component-sonner-error-border)",
          "--warning-bg":    "var(--component-sonner-warning-bg)",
          "--warning-border":"var(--component-sonner-warning-border)",
          "--info-bg":       "var(--component-sonner-info-bg)",
          "--info-border":   "var(--component-sonner-info-border)",
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
