"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { FileText, Image as ImageIcon, X, AlertCircle } from "lucide-react"

// ─── Variants ────────────────────────────────────────────────────────────────

const attachmentVariants = cva(
  "group relative flex items-center gap-[var(--alias-spacing-inline-sm)] rounded-[var(--component-attachment-dimension-radius)] border p-2",
  {
    variants: {
      state: {
        uploading: "border-[var(--component-attachment-color-border)] bg-[var(--component-attachment-color-bg)]",
        ready:     "border-[var(--component-attachment-color-border)] bg-[var(--component-attachment-color-bg)]",
        error:     "border-[var(--alias-color-border-error)] bg-[var(--component-attachment-color-error-bg)]",
        "too-large": "border-[var(--alias-color-border-error)] bg-[var(--component-attachment-color-error-bg)]",
      },
    },
    defaultVariants: { state: "ready" },
  }
)

// ─── Props ───────────────────────────────────────────────────────────────────

export interface AttachmentPreviewProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof attachmentVariants> {
  /** File name */
  name: string
  /** File type hint */
  fileType?: "image" | "pdf" | "doc" | "spreadsheet" | "other"
  /** File size display string (e.g. "1.2 MB") */
  size?: string
  /** Thumbnail URL for images */
  previewUrl?: string
  /** Upload progress 0–100 */
  progress?: number
  /** Error message */
  errorMessage?: string
  /** Called when the remove button is clicked */
  onRemove?: () => void
}

// ─── Component ───────────────────────────────────────────────────────────────

function AttachmentPreview({
  name,
  fileType = "other",
  size,
  previewUrl,
  progress = 100,
  errorMessage,
  onRemove,
  state,
  className,
  ...props
}: AttachmentPreviewProps) {
  const isUploading = state === "uploading" || (progress < 100 && !errorMessage && state !== "error")
  const isError     = state === "error" || state === "too-large" || !!errorMessage

  // Resolved state
  const resolvedState = isError
    ? (state === "too-large" ? "too-large" : "error")
    : isUploading
    ? "uploading"
    : "ready"

  const thumbSize = "var(--component-attachment-dimension-thumb-size)"

  return (
    <div
      data-slot="attachment-preview"
      className={cn(attachmentVariants({ state: resolvedState as "uploading" | "ready" | "error" | "too-large" }), className)}
      aria-label={`${name}${isUploading ? ", uploading" : isError ? `, error: ${errorMessage}` : ", ready"}`}
      {...props}
    >
      {/* Thumbnail or icon */}
      <div
        className="relative shrink-0 overflow-hidden rounded-[var(--alias-radius-sm)]"
        style={{ width: thumbSize, height: thumbSize }}
        aria-hidden="true"
      >
        {isError ? (
          <div className="flex h-full w-full items-center justify-center bg-[var(--component-attachment-color-error-bg)]">
            <AlertCircle className="size-5 text-[var(--component-attachment-color-error-text)]" />
          </div>
        ) : fileType === "image" && previewUrl ? (
          <img src={previewUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[var(--alias-color-background-tertiary)]">
            {fileType === "image" ? (
              <ImageIcon className="size-5 text-[var(--alias-color-icon-secondary)]" />
            ) : (
              <FileText className="size-5 text-[var(--alias-color-icon-secondary)]" />
            )}
          </div>
        )}

        {/* Upload progress overlay */}
        {isUploading && (
          <div
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Uploading ${name}`}
            className="absolute inset-0 flex items-end"
          >
            <div
              className="h-0.5 bg-[var(--component-attachment-color-progress)] transition-[width]"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Text info */}
      <div className="flex min-w-0 flex-col">
        <span
          className={cn(
            "max-w-[140px] truncate text-[length:var(--alias-typography-body-text3-font-size)] font-medium",
            isError
              ? "text-[var(--component-attachment-color-error-text)]"
              : "text-[var(--component-attachment-color-text)]"
          )}
        >
          {name}
        </span>
        <span className="text-[length:10px] text-[var(--component-attachment-color-text-secondary)]">
          {isError
            ? (errorMessage ?? "Upload failed")
            : isUploading
            ? `${progress}%`
            : size ?? ""}
        </span>
      </div>

      {/* Remove button */}
      {onRemove && (
        <button
          type="button"
          aria-label={`Remove ${name}`}
          onClick={onRemove}
          className="ml-auto rounded-[var(--alias-radius-sm)] p-0.5 hover:bg-[var(--alias-color-background-tertiary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--alias-color-border-active)]"
        >
          <X className="size-3.5 text-[var(--alias-color-icon-secondary)]" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

export { AttachmentPreview }
