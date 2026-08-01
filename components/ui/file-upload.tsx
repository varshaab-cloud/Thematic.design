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
        "flex flex-col items-center justify-center gap-[var(--alias-spacing-stack-xs)] rounded-[var(--component-file-upload-dimension-radius)] border-2 border-dashed border-[var(--component-file-upload-color-dropzone-stroke-default)] bg-[var(--component-file-upload-color-dropzone-bg-default)] px-[var(--alias-spacing-padding-lg)] py-10 text-center [transition:var(--alias-motion-transition-normal)]",
        isDragOver && !disabled && "border-[var(--component-file-upload-color-dropzone-stroke-active)] bg-[var(--component-file-upload-color-dropzone-bg-hover)]",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:border-[var(--component-file-upload-color-dropzone-stroke-active)] hover:bg-[var(--component-file-upload-color-dropzone-bg-hover)]",
        className
      )}
    >
      <UploadCloudIcon
        className="text-[var(--component-file-upload-color-icon)]"
        style={{ width: "32px", height: "32px" }}
      />

      <div className="flex flex-col items-center gap-[var(--alias-spacing-inline-xs)]">
        <p className="text-[length:var(--alias-typography-body-text2-font-size)] font-[number:var(--alias-typography-weight-medium)] text-[var(--component-file-upload-color-label)]">
          Drop files here
        </p>
        <p className="text-[length:var(--alias-typography-caption1-font-size)] text-[var(--alias-color-text-tertiary)]">or</p>
        <button
          type="button"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation()
            inputRef.current?.click()
          }}
          className={cn(
            "rounded-[var(--component-button-secondary-dimension-radius)] border border-[var(--alias-color-border-default)] bg-[var(--alias-color-background-primary)] px-[var(--alias-spacing-padding-md)] py-1.5 text-[length:var(--alias-typography-button-font-size)] font-[number:var(--alias-typography-button-font-weight)] text-[var(--alias-color-text-primary)] [transition:var(--alias-motion-transition-normal)]",
            "hover:bg-[var(--alias-color-background-secondary)] hover:border-[var(--alias-color-text-primary)]",
            "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--alias-color-border-active)]/30",
            "disabled:cursor-not-allowed disabled:text-[var(--alias-color-text-disabled)] disabled:border-[var(--alias-color-border-default)]"
          )}
        >
          Browse files
        </button>
      </div>

      {constraintText && (
        <p className="text-[length:var(--alias-typography-caption1-font-size)] text-[var(--alias-color-text-tertiary)]">
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
