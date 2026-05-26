"use client"

import * as React from "react"
import { UploadCloudIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface FileUploadProps {
  onFilesSelected: (files: File[]) => void
  accept?: string
  multiple?: boolean
  maxSizeMB?: number
  disabled?: boolean
  className?: string
}

function FileUpload({
  onFilesSelected,
  accept,
  multiple = false,
  maxSizeMB,
  disabled = false,
  className,
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const processFiles = (fileList: FileList | null) => {
    if (!fileList) return
    let files = Array.from(fileList)
    if (maxSizeMB !== undefined) {
      files = files.filter((f) => f.size <= maxSizeMB * 1024 * 1024)
    }
    if (files.length > 0) {
      onFilesSelected(files)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!disabled) setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
    if (disabled) return
    processFiles(e.dataTransfer.files)
  }

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === "Enter" || e.key === " ") && !disabled) {
      e.preventDefault()
      inputRef.current?.click()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files)
    // Reset so the same file can be selected again
    e.target.value = ""
  }

  const constraintParts: string[] = []
  if (accept) constraintParts.push(accept)
  if (maxSizeMB !== undefined) constraintParts.push(`up to ${maxSizeMB} MB`)
  const constraintText = constraintParts.join(" — ")

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label="Upload files — click or drag and drop"
      aria-disabled={disabled}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-[var(--base-radius-md)] border-2 border-dashed border-[var(--alias-color-border-default)] bg-[var(--alias-color-background-secondary)] px-6 py-10 text-center transition-colors",
        isDragOver && !disabled && "border-[var(--alias-color-border-active)] bg-[var(--alias-color-background-tertiary)]",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:border-[var(--alias-color-border-active)] hover:bg-[var(--alias-color-background-tertiary)]",
        className
      )}
    >
      <UploadCloudIcon
        className="text-[var(--alias-color-icon-secondary)]"
        style={{ width: "32px", height: "32px" }}
      />

      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-medium text-[var(--alias-color-text-primary)]">
          Drop files here
        </p>
        <p className="text-xs text-[var(--alias-color-text-tertiary)]">or</p>
        <button
          type="button"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation()
            inputRef.current?.click()
          }}
          className={cn(
            "rounded-[var(--component-button-secondary-border-radius)] border border-[var(--component-button-secondary-border)] bg-[var(--component-button-secondary-background)] px-4 py-1.5 text-sm font-medium text-[var(--component-button-secondary-text)] transition-colors",
            "hover:bg-[var(--component-button-secondary-background-hover)]",
            "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--alias-color-border-active)]/30",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:text-[var(--component-button-secondary-text-disabled)]"
          )}
        >
          Browse files
        </button>
      </div>

      {constraintText && (
        <p className="text-xs text-[var(--alias-color-text-tertiary)]">
          {constraintText}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        aria-hidden="true"
        tabIndex={-1}
        onChange={handleInputChange}
        className="sr-only"
      />
    </div>
  )
}

export { FileUpload }
