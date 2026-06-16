"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Send,
  Square,
  Paperclip,
  Mic,
  MicOff,
  X,
  FileText,
  Image as ImageIcon,
  AlertCircle,
} from "lucide-react"

// ─── Attachment chip (used inside the composer) ──────────────────────────────

export interface AttachmentChip {
  id: string
  name: string
  type: "image" | "file"
  /** 0–100 upload progress; 100 = ready */
  progress?: number
  /** Error message if upload failed */
  error?: string
  /** Thumbnail URL for images */
  previewUrl?: string
}

interface AttachmentRowProps {
  attachments: AttachmentChip[]
  onRemove: (id: string) => void
}

function AttachmentRow({ attachments, onRemove }: AttachmentRowProps) {
  if (!attachments.length) return null

  return (
    <div
      className="flex flex-wrap gap-[var(--component-composer-dimension-gap)] px-[var(--component-composer-dimension-padding)] pt-[var(--component-composer-dimension-padding)]"
      aria-label="Attached files"
    >
      {attachments.map((a) => {
        const isError    = !!a.error
        const isUploading = (a.progress ?? 100) < 100 && !isError

        return (
          <div
            key={a.id}
            className={cn(
              "relative flex items-center gap-1.5 rounded-[var(--component-attachment-dimension-radius)] border px-2 py-1 text-[length:var(--alias-typography-body-text3-font-size)]",
              isError
                ? "border-[var(--alias-color-border-error)] bg-[var(--component-attachment-color-error-bg)] text-[var(--component-attachment-color-error-text)]"
                : "border-[var(--component-attachment-color-border)] bg-[var(--component-attachment-color-bg)] text-[var(--component-attachment-color-text)]"
            )}
          >
            {/* Icon */}
            {isError ? (
              <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
            ) : a.type === "image" ? (
              a.previewUrl
                ? <img src={a.previewUrl} alt="" className="size-4 rounded-sm object-cover shrink-0" />
                : <ImageIcon className="size-3.5 shrink-0" aria-hidden="true" />
            ) : (
              <FileText className="size-3.5 shrink-0" aria-hidden="true" />
            )}

            {/* Name */}
            <span className="max-w-[120px] truncate">
              {isError ? a.error : a.name}
            </span>

            {/* Progress bar overlay */}
            {isUploading && (
              <span
                role="progressbar"
                aria-valuenow={a.progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Uploading ${a.name}`}
                className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden rounded-b-[var(--component-attachment-dimension-radius)]"
              >
                <span
                  className="block h-full bg-[var(--component-attachment-color-progress)] transition-[width]"
                  style={{ width: `${a.progress}%` }}
                />
              </span>
            )}

            {/* Remove */}
            <button
              type="button"
              aria-label={`Remove ${a.name}`}
              onClick={() => onRemove(a.id)}
              className="ml-0.5 rounded-sm hover:bg-[var(--alias-color-background-tertiary)] p-px"
            >
              <X className="size-3" aria-hidden="true" />
            </button>
          </div>
        )
      })}
    </div>
  )
}

// ─── ChatInput (Composer) ─────────────────────────────────────────────────────

export interface ChatInputProps extends Omit<React.ComponentProps<"div">, "onSubmit"> {
  /** Current text value */
  value?: string
  /** Called whenever the textarea value changes */
  onValueChange?: (value: string) => void
  /** Called when the user submits the message */
  onSubmit?: (value: string, attachments: AttachmentChip[]) => void
  /** Called when the user presses Stop during streaming */
  onStop?: () => void
  /** Whether the assistant is currently streaming (flips Send→Stop) */
  isStreaming?: boolean
  /** Disables the whole composer */
  disabled?: boolean
  /** Whether character limit has been exceeded */
  isOverLimit?: boolean
  /** Validation error message */
  errorMessage?: string
  /** Textarea placeholder */
  placeholder?: string
  /** Max character count */
  maxChars?: number
  /** Controlled attachments */
  attachments?: AttachmentChip[]
  /** Called when a file is attached */
  onAttach?: (files: FileList) => void
  /** Called when an attachment is removed */
  onRemoveAttachment?: (id: string) => void
  /** Whether mic recording is active */
  isRecording?: boolean
  /** Called when mic button is toggled */
  onMicToggle?: () => void
  /** Whether voice is supported (shows mic button) */
  showVoice?: boolean
  /** Whether file attachment is supported (shows attach button) */
  showAttach?: boolean
  /** Content to render in the toolbar (e.g. ModelSelector) */
  toolbarSlot?: React.ReactNode
}

function ChatInput({
  value: controlledValue,
  onValueChange,
  onSubmit,
  onStop,
  isStreaming = false,
  disabled = false,
  isOverLimit = false,
  errorMessage,
  placeholder = "Message…",
  maxChars,
  attachments = [],
  onAttach,
  onRemoveAttachment,
  isRecording = false,
  onMicToggle,
  showVoice = false,
  showAttach = true,
  toolbarSlot,
  className,
  ...props
}: ChatInputProps) {
  const [internalValue, setInternalValue] = React.useState("")
  const textareaRef  = React.useRef<HTMLTextAreaElement>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const isControlled = controlledValue !== undefined
  const text         = isControlled ? controlledValue : internalValue
  const isEmpty      = !text.trim() && !attachments.length
  const hasError     = !!errorMessage || isOverLimit
  const canSend      = !isEmpty && !disabled && !isOverLimit

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const v = e.target.value
    if (!isControlled) setInternalValue(v)
    onValueChange?.(v)
    // Auto-resize
    const el = textareaRef.current
    if (el) {
      el.style.height = "auto"
      el.style.height = `${Math.min(el.scrollHeight, 200)}px`
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (canSend) submit()
    }
  }

  function submit() {
    if (!canSend) return
    onSubmit?.(text, attachments)
    if (!isControlled) setInternalValue("")
    // Reset height
    if (textareaRef.current) textareaRef.current.style.height = "auto"
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length) {
      onAttach?.(e.target.files)
      e.target.value = ""
    }
  }

  const hasAttachments = attachments.length > 0

  return (
    <div
      data-slot="chat-input"
      className={cn(
        "w-full rounded-[var(--component-composer-dimension-radius)] border bg-[var(--component-composer-color-bg)] [transition:var(--alias-motion-transition-normal)]",
        hasError
          ? "border-[var(--component-composer-color-border-error)]"
          : "border-[var(--component-composer-color-border)] focus-within:border-[var(--component-composer-color-border-focus)] focus-within:ring-3 focus-within:ring-[var(--component-composer-color-border-focus)]/20",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      {...props}
    >
      {/* Attachment chips row */}
      {hasAttachments && onRemoveAttachment && (
        <AttachmentRow attachments={attachments} onRemove={onRemoveAttachment} />
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,.pdf,.doc,.docx,.txt,.csv,.xls,.xlsx"
        className="sr-only"
        aria-hidden="true"
        onChange={handleFileChange}
        tabIndex={-1}
      />

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled || isStreaming}
        placeholder={placeholder}
        maxLength={maxChars}
        rows={1}
        aria-label="Message input"
        aria-multiline="true"
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? "composer-error" : undefined}
        className={cn(
          "block w-full resize-none bg-transparent px-[var(--component-composer-dimension-padding)] pt-[var(--component-composer-dimension-padding)] pb-2 text-[length:var(--alias-typography-body-text2-font-size)] text-[var(--component-composer-color-text)] outline-none placeholder:text-[var(--component-composer-color-placeholder)] disabled:cursor-not-allowed",
          "min-h-[40px] max-h-[200px]"
        )}
        style={{ lineHeight: "1.5" }}
      />

      {/* Toolbar row */}
      <div
        className={cn(
          "flex items-center justify-between gap-[var(--component-composer-dimension-gap)] px-[var(--component-composer-dimension-padding)] pb-[var(--component-composer-dimension-padding)]",
        )}
      >
        {/* Left: attach + mic + custom slot */}
        <div className="flex items-center gap-0.5">
          {showAttach && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Attach file or image"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={disabled}
                >
                  <Paperclip className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">Attach</TooltipContent>
            </Tooltip>
          )}

          {showVoice && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={isRecording ? "Stop recording" : "Start voice input"}
                  aria-pressed={isRecording}
                  onClick={onMicToggle}
                  disabled={disabled && !isRecording}
                  className={cn(
                    isRecording && "bg-[var(--component-voice-color-bg-recording)] text-[var(--component-voice-color-recording)] hover:bg-[var(--component-voice-color-bg-recording)]"
                  )}
                >
                  {isRecording ? <MicOff className="size-4" /> : <Mic className="size-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                {isRecording ? "Stop recording" : "Voice input"}
              </TooltipContent>
            </Tooltip>
          )}

          {toolbarSlot}
        </div>

        {/* Right: char count + send/stop */}
        <div className="flex items-center gap-[var(--component-composer-dimension-gap)]">
          {maxChars && (
            <span
              aria-live="polite"
              aria-atomic="true"
              className={cn(
                "text-[length:var(--alias-typography-body-text3-font-size)] tabular-nums",
                isOverLimit
                  ? "text-[var(--alias-color-feedback-error-fg)] font-medium"
                  : "text-[var(--alias-color-text-subtle)]"
              )}
            >
              {text.length}/{maxChars}
            </span>
          )}

          {isStreaming ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon-sm"
                  aria-label="Stop generating"
                  onClick={onStop}
                >
                  <Square className="size-3.5 fill-current" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">Stop generating</TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="default"
                  size="icon-sm"
                  aria-label="Send message"
                  disabled={!canSend}
                  onClick={submit}
                >
                  <Send className="size-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">Send (Enter)</TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>

      {/* Error message */}
      {hasError && errorMessage && (
        <p
          id="composer-error"
          role="alert"
          className="px-[var(--component-composer-dimension-padding)] pb-2 text-[length:var(--alias-typography-body-text3-font-size)] text-[var(--alias-color-feedback-error-fg)]"
        >
          {errorMessage}
        </p>
      )}
    </div>
  )
}

export { ChatInput }
