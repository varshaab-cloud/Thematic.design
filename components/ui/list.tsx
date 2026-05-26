import * as React from "react"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/* List                                                                 */
/* ------------------------------------------------------------------ */

function List({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="list"
      className={cn("flex flex-col divide-y divide-[var(--alias-color-border-default)]", className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/* ListItem                                                             */
/* ------------------------------------------------------------------ */

export interface ListItemProps extends React.ComponentProps<"li"> {
  interactive?: boolean
  selected?: boolean
  disabled?: boolean
}

function ListItem({
  interactive = false,
  selected = false,
  disabled = false,
  className,
  ...props
}: ListItemProps) {
  return (
    <li
      data-slot="list-item"
      aria-selected={selected || undefined}
      aria-disabled={disabled || undefined}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 text-sm",
        interactive &&
          "cursor-pointer transition-colors hover:bg-[var(--base-color-gray-50)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--alias-color-border-active)]/50",
        selected && "bg-[var(--base-color-blue-800)]/8 text-[var(--base-color-blue-800)]",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      tabIndex={interactive && !disabled ? 0 : undefined}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/* ListItemAvatar                                                       */
/* ------------------------------------------------------------------ */

function ListItemAvatar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="list-item-avatar"
      className={cn("shrink-0", className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/* ListItemContent                                                      */
/* ------------------------------------------------------------------ */

function ListItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="list-item-content"
      className={cn("min-w-0 flex-1", className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/* ListItemTitle                                                        */
/* ------------------------------------------------------------------ */

function ListItemTitle({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="list-item-title"
      className={cn("truncate font-medium text-[var(--alias-color-text-primary)]", className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/* ListItemDescription                                                  */
/* ------------------------------------------------------------------ */

function ListItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="list-item-description"
      className={cn("truncate text-xs text-[var(--alias-color-text-subtle)] mt-0.5", className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/* ListItemAction                                                       */
/* ------------------------------------------------------------------ */

function ListItemAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="list-item-action"
      className={cn("ml-auto shrink-0 flex items-center gap-2", className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/* ListDivider                                                          */
/* ------------------------------------------------------------------ */

function ListDivider({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="list-divider"
      role="separator"
      className={cn("h-px bg-[var(--alias-color-border-default)]", className)}
      {...props}
    />
  )
}

export {
  List,
  ListItem,
  ListItemAvatar,
  ListItemContent,
  ListItemTitle,
  ListItemDescription,
  ListItemAction,
  ListDivider,
}
