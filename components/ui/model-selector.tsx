"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Cpu } from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ModelOption {
  id: string
  /** Display name shown in the selector */
  name: string
  /** Optional short description / capability note */
  description?: string
  /** Whether this model is recommended */
  recommended?: boolean
}

export interface ModelSelectorProps {
  models: ModelOption[]
  value?: string
  onValueChange?: (value: string) => void
  /** Render as compact inline trigger (for toolbar use) */
  compact?: boolean
  disabled?: boolean
  className?: string
}

// ─── Component ───────────────────────────────────────────────────────────────

function ModelSelector({
  models,
  value,
  onValueChange,
  compact = false,
  disabled = false,
  className,
}: ModelSelectorProps) {
  const selected = models.find((m) => m.id === value) ?? models[0]

  return (
    <Select value={value ?? selected?.id} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger
        size={compact ? "sm" : "default"}
        aria-label="Select model"
        className={cn(
          compact
            ? "h-7 gap-1 border-[var(--alias-color-border-subtle)] bg-transparent text-[length:var(--alias-typography-body-text3-font-size)] text-[var(--alias-color-text-secondary)] hover:bg-[var(--alias-color-background-secondary)] [&_svg]:size-3"
            : "",
          className
        )}
      >
        <Cpu className={cn("shrink-0 text-[var(--alias-color-icon-secondary)]", compact ? "size-3" : "size-4")} aria-hidden="true" />
        <SelectValue placeholder="Select model" />
      </SelectTrigger>

      <SelectContent>
        {models.map((m) => (
          <SelectItem key={m.id} value={m.id}>
            <div className="flex flex-col gap-0.5">
              <span className="font-medium">
                {m.name}
                {m.recommended && (
                  <span className="ml-1.5 text-[length:var(--alias-typography-caption2-font-size)] font-normal text-[var(--alias-color-text-subtle)]">
                    recommended
                  </span>
                )}
              </span>
              {m.description && (
                <span className="text-[length:var(--alias-typography-body-text3-font-size)] text-[var(--alias-color-text-subtle)]">
                  {m.description}
                </span>
              )}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { ModelSelector }
