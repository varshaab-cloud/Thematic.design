"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Copy, RefreshCw, Pencil, ThumbsUp, ThumbsDown, Check } from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface MessageActionsProps extends React.ComponentProps<"div"> {
  /** Called when copy action is triggered */
  onCopy?: () => void
  /** Called when regenerate action is triggered */
  onRegenerate?: () => void
  /** Called when edit action is triggered */
  onEdit?: () => void
  /** Called when thumbs-up feedback is triggered */
  onThumbsUp?: () => void
  /** Called when thumbs-down feedback is triggered */
  onThumbsDown?: () => void
  /** Whether copy was just triggered (shows checkmark briefly) */
  isCopied?: boolean
  /** Hide the edit action (user messages only) */
  showEdit?: boolean
  /** Hide regenerate (user messages don't regenerate) */
  showRegenerate?: boolean
}

// ─── Component ───────────────────────────────────────────────────────────────

function MessageActions({
  onCopy,
  onRegenerate,
  onEdit,
  onThumbsUp,
  onThumbsDown,
  isCopied = false,
  showEdit = false,
  showRegenerate = true,
  className,
  ...props
}: MessageActionsProps) {
  const actions: { icon: React.ReactNode; label: string; onClick?: () => void; show: boolean }[] = [
    {
      icon: isCopied
        ? <Check className="size-3.5" />
        : <Copy className="size-3.5" />,
      label: isCopied ? "Copied!" : "Copy message",
      onClick: onCopy,
      show: true,
    },
    {
      icon: <RefreshCw className="size-3.5" />,
      label: "Regenerate response",
      onClick: onRegenerate,
      show: showRegenerate,
    },
    {
      icon: <Pencil className="size-3.5" />,
      label: "Edit message",
      onClick: onEdit,
      show: showEdit,
    },
    {
      icon: <ThumbsUp className="size-3.5" />,
      label: "Good response",
      onClick: onThumbsUp,
      show: true,
    },
    {
      icon: <ThumbsDown className="size-3.5" />,
      label: "Bad response",
      onClick: onThumbsDown,
      show: true,
    },
  ]

  return (
    <div
      data-slot="message-actions"
      role="toolbar"
      aria-label="Message actions"
      className={cn(
        "flex items-center gap-0.5 rounded-[var(--alias-radius-md)] border border-[var(--component-messageactions-color-border)] bg-[var(--alias-color-background-primary)] p-0.5",
        className
      )}
      {...props}
    >
      {actions
        .filter((a) => a.show)
        .map((action) => (
          <Tooltip key={action.label}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={action.onClick}
                aria-label={action.label}
                className="hover:bg-[var(--component-messageactions-color-bg-hover)]"
              >
                {action.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              {action.label}
            </TooltipContent>
          </Tooltip>
        ))}
    </div>
  )
}

export { MessageActions }
