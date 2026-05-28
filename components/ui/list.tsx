import * as React from "react"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/* List                                                                 */
/* ------------------------------------------------------------------ */

function List({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="list"
      className={cn("flex flex-col divide-y divide-[var(--component-list-item-border)]", className)}
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
        "flex items-center gap-[var(--alias-spacing-inline-md)] px-[var(--alias-spacing-padding-sm)] py-2.5 text-[length:var(--alias-typography-body-text2-font-size)]",
        interactive &&
          "cursor-pointer [transition:var(--alias-motion-transition-normal)] hover:bg-[var(--component-list-item-hover-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--alias-color-border-active)]/50",
        selected && "bg-[var(--component-list-item-selected-bg)]/8 text-[var(--component-list-item-selected-text)]",
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
      className={cn("truncate font-[number:var(--base-font-weight-medium)] text-[var(--component-list-item-text)]", className)}
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
      className={cn("truncate text-[length:var(--alias-typography-caption1-font-size)] text-[var(--component-list-description-text)] mt-0.5", className)}
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
      className={cn("ml-auto shrink-0 flex items-center gap-[var(--alias-spacing-inline-sm)]", className)}
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
      className={cn("h-px bg-[var(--component-list-item-border)]", className)}
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
