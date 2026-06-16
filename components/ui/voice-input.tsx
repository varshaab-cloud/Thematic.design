"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Mic, MicOff, Loader2, AlertCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

// ─── States ──────────────────────────────────────────────────────────────────

type VoiceState = "idle" | "recording" | "processing" | "error" | "permission-denied"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center rounded-full border outline-none [transition:var(--alias-motion-transition-normal)] focus-visible:ring-3 focus-visible:ring-[var(--alias-color-border-active)]/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "size-8",
        md: "size-[var(--component-voice-dimension-size)]",
        lg: "size-12",
      },
    },
    defaultVariants: { size: "md" },
  }
)

// ─── WaveformRings — pulsing ring animation for recording state ───────────────

function WaveformRings() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full">
      {[0, 1].map((i) => (
        <span
          key={i}
          style={{ animationDelay: `${i * 400}ms` }}
          className="absolute inset-0 rounded-full border border-[var(--component-voice-color-recording)] animate-[ping_1.5s_ease-out_infinite] opacity-40"
        />
      ))}
    </span>
  )
}

// ─── Props ───────────────────────────────────────────────────────────────────

export interface VoiceInputProps
  extends Omit<React.ComponentProps<"button">, "onClick">,
    VariantProps<typeof buttonVariants> {
  /** Current recording state */
  state?: VoiceState
  /** Called when the button is clicked */
  onToggle?: () => void
}

// ─── Component ───────────────────────────────────────────────────────────────

function VoiceInput({
  state = "idle",
  onToggle,
  size,
  className,
  ...props
}: VoiceInputProps) {
  const isRecording = state === "recording"
  const isProcessing = state === "processing"
  const isError = state === "error" || state === "permission-denied"

  const labels: Record<VoiceState, string> = {
    idle:               "Start voice input",
    recording:          "Stop recording",
    processing:         "Processing audio…",
    error:              "Voice input error — click to retry",
    "permission-denied": "Microphone access denied",
  }

  const bgClass = isRecording
    ? "bg-[var(--component-voice-color-bg-recording)] border-[var(--alias-color-border-error)] text-[var(--component-voice-color-recording)]"
    : isError
    ? "bg-[var(--component-voice-color-bg-recording)] border-[var(--alias-color-border-error)] text-[var(--component-voice-color-recording)]"
    : "bg-[var(--component-voice-color-bg)] border-[var(--alias-color-border-default)] text-[var(--component-voice-color-idle)] hover:bg-[var(--alias-color-background-tertiary)]"

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={labels[state]}
          aria-pressed={isRecording}
          disabled={isProcessing || state === "permission-denied"}
          onClick={onToggle}
          className={cn(buttonVariants({ size }), bgClass, className)}
          {...props}
        >
          {isRecording && <WaveformRings />}

          {isProcessing ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : isError ? (
            <AlertCircle className="size-4" aria-hidden="true" />
          ) : isRecording ? (
            <MicOff className="size-4" aria-hidden="true" />
          ) : (
            <Mic className="size-4" aria-hidden="true" />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="text-xs">
        {labels[state]}
      </TooltipContent>
    </Tooltip>
  )
}

export { VoiceInput }
export type { VoiceState }
