"use client"

import * as React from "react"
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui"
import { Search, Bell, ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── AppHeader ────────────────────────────────────────────────────────────────

export interface AppHeaderProps {
  children: React.ReactNode
  sticky?: boolean
  bordered?: boolean
  className?: string
}

export function AppHeader({
  children,
  sticky = false,
  bordered = true,
  className,
}: AppHeaderProps) {
  return (
    <header
      data-slot="app-header"
      className={cn(
        "flex items-center w-full bg-[var(--component-app-header-background)] px-[var(--alias-spacing-padding-md)] gap-[var(--alias-spacing-inline-md)]",
        sticky && "sticky top-0 z-50",
        bordered && "border-b border-[var(--component-app-header-border-bottom)]",
        className
      )}
      style={{ height: 56 }}
    >
      {children}
    </header>
  )
}

// ─── AppHeaderLogo ────────────────────────────────────────────────────────────

export interface AppHeaderLogoProps {
  name: string
  src?: string
  className?: string
}

export function AppHeaderLogo({ name, src, className }: AppHeaderLogoProps) {
  return (
    <div
      data-slot="app-header-logo"
      className={cn("flex items-center gap-[var(--alias-spacing-inline-sm)] shrink-0", className)}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          className="w-7 h-7 rounded-[var(--base-radius-md)] object-contain"
        />
      ) : (
        <div
          className={cn(
            "w-7 h-7 rounded-[var(--base-radius-md)] flex items-center justify-center",
            "bg-[var(--component-app-header-logo-bg)] text-[var(--component-app-header-logo-text)]",
            "text-[length:var(--alias-typography-caption1-font-size)] font-[number:var(--base-font-weight-bold)] leading-none select-none"
          )}
        >
          T
        </div>
      )}
      <span className="text-[length:var(--alias-typography-body-text2-font-size)] font-[number:var(--base-font-weight-semibold)] text-[var(--component-app-header-nav-item-text-hover)] tracking-tight">
        {name}
      </span>
    </div>
  )
}

// ─── AppHeaderNav ─────────────────────────────────────────────────────────────

export function AppHeaderNav({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <nav
      data-slot="app-header-nav"
      className={cn("flex items-center gap-0.5 h-full", className)}
    >
      {children}
    </nav>
  )
}

// ─── AppHeaderNavItem ─────────────────────────────────────────────────────────

export interface AppHeaderNavItemProps {
  children: React.ReactNode
  href?: string
  active?: boolean
  onClick?: () => void
  className?: string
}

export function AppHeaderNavItem({
  children,
  href,
  active = false,
  onClick,
  className,
}: AppHeaderNavItemProps) {
  const sharedClass = cn(
    "relative flex items-center h-full px-[var(--alias-spacing-padding-sm)] text-[length:var(--alias-typography-body-text2-font-size)] font-[number:var(--base-font-weight-medium)] [transition:var(--alias-motion-transition-normal)]",
    "outline-none focus-visible:ring-2 focus-visible:ring-[var(--component-app-header-search-border-focus)]",
    active
      ? "text-[var(--component-app-header-nav-item-text-active)]"
      : "text-[var(--component-app-header-nav-item-text)] hover:text-[var(--component-app-header-nav-item-text-hover)]",
    className
  )

  const inner = (
    <>
      {children}
      {active && (
        <span
          className="absolute bottom-0 left-3 right-3 h-0.5 rounded-t-full bg-[var(--component-app-header-nav-item-active-indicator)]"
          aria-hidden
        />
      )}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        data-slot="app-header-nav-item"
        aria-current={active ? "page" : undefined}
        className={sharedClass}
      >
        {inner}
      </a>
    )
  }

  return (
    <button
      type="button"
      data-slot="app-header-nav-item"
      aria-current={active ? "page" : undefined}
      onClick={onClick}
      className={sharedClass}
    >
      {inner}
    </button>
  )
}

// ─── AppHeaderSearch ──────────────────────────────────────────────────────────

export interface AppHeaderSearchProps {
  placeholder?: string
  onSearchClick?: () => void
  className?: string
}

export function AppHeaderSearch({
  placeholder = "Search…",
  onSearchClick,
  className,
}: AppHeaderSearchProps) {
  if (onSearchClick) {
    return (
      <button
        type="button"
        data-slot="app-header-search"
        onClick={onSearchClick}
        className={cn(
          "flex items-center gap-[var(--alias-spacing-inline-sm)] h-8 px-[var(--alias-spacing-padding-sm)] rounded-[var(--base-radius-md)]",
          "border border-[var(--component-app-header-border-bottom)] bg-[var(--component-app-header-search-bg)]",
          "text-[length:var(--alias-typography-body-text2-font-size)] text-[var(--component-app-header-search-placeholder)]",
          "hover:border-[var(--alias-color-border-default)] hover:bg-[var(--component-app-header-background)] [transition:var(--alias-motion-transition-normal)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--component-app-header-search-border-focus)]",
          className
        )}
      >
        <Search style={{ width: 14, height: 14 }} />
        <span className="text-[length:var(--alias-typography-body-text2-font-size)]">{placeholder}</span>
        <kbd className="ml-1 hidden sm:inline-flex items-center text-[10px] border border-[var(--component-app-header-border-bottom)] rounded px-1 leading-4">
          ⌘K
        </kbd>
      </button>
    )
  }

  return (
    <div
      data-slot="app-header-search"
      className={cn(
        "flex items-center gap-[var(--alias-spacing-inline-sm)] h-8 px-[var(--alias-spacing-padding-sm)] rounded-[var(--base-radius-md)]",
        "border border-[var(--component-app-header-border-bottom)] bg-[var(--component-app-header-search-bg)]",
        "focus-within:border-[var(--component-app-header-search-border-focus)] focus-within:bg-[var(--component-app-header-background)] focus-within:ring-2 focus-within:ring-[var(--alias-color-background-hover)]",
        "[transition:var(--alias-motion-transition-normal)]",
        className
      )}
    >
      <Search
        className="shrink-0 text-[var(--component-app-header-search-placeholder)]"
        style={{ width: 14, height: 14 }}
      />
      <input
        type="text"
        placeholder={placeholder}
        className={cn(
          "flex-1 bg-transparent text-[length:var(--alias-typography-body-text2-font-size)] text-[var(--component-app-header-search-text)]",
          "placeholder:text-[var(--component-app-header-search-placeholder)]",
          "outline-none border-none focus:ring-0 min-w-0 w-32"
        )}
      />
    </div>
  )
}

// ─── AppHeaderActions ─────────────────────────────────────────────────────────

export function AppHeaderActions({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      data-slot="app-header-actions"
      className={cn("flex items-center gap-[var(--alias-spacing-inline-xs)] ml-auto shrink-0", className)}
    >
      {children}
    </div>
  )
}

// ─── AppHeaderNotifications ───────────────────────────────────────────────────

export interface AppHeaderNotificationsProps {
  count?: number
  onClick?: () => void
  className?: string
}

export function AppHeaderNotifications({
  count = 0,
  onClick,
  className,
}: AppHeaderNotificationsProps) {
  return (
    <button
      type="button"
      data-slot="app-header-notifications"
      onClick={onClick}
      aria-label={count > 0 ? `${count} notifications` : "Notifications"}
      className={cn(
        "relative flex items-center justify-center w-8 h-8 rounded-[var(--base-radius-md)]",
        "text-[var(--component-app-header-nav-item-text)] hover:text-[var(--component-app-header-nav-item-text-hover)]",
        "hover:bg-[var(--alias-color-background-tertiary)] [transition:var(--alias-motion-transition-normal)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--component-app-header-search-border-focus)]",
        className
      )}
    >
      <Bell style={{ width: 18, height: 18 }} />
      {count > 0 && (
        <span
          className={cn(
            "absolute top-1 right-1 flex items-center justify-center",
            "min-w-[16px] h-4 px-1 rounded-full",
            "bg-[var(--component-app-header-notification-badge-bg)] text-[var(--component-app-header-notification-badge-text)] text-[9px] font-[number:var(--base-font-weight-semibold)] leading-none",
            "select-none pointer-events-none"
          )}
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  )
}

// ─── AppHeaderUser ────────────────────────────────────────────────────────────

export interface AppHeaderUserProps {
  name: string
  email?: string
  className?: string
  onProfile?: () => void
  onSettings?: () => void
  onSignOut?: () => void
}

export function AppHeaderUser({
  name,
  email,
  className,
  onProfile,
  onSettings,
  onSignOut,
}: AppHeaderUserProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        <button
          type="button"
          data-slot="app-header-user"
          aria-label={`User menu for ${name}`}
          className={cn(
            "flex items-center gap-[var(--alias-spacing-inline-sm)] h-8 px-[var(--alias-spacing-padding-xs)] rounded-[var(--base-radius-md)]",
            "text-[length:var(--alias-typography-body-text2-font-size)] text-[var(--alias-color-text-tertiary)]",
            "hover:bg-[var(--alias-color-background-tertiary)] [transition:var(--alias-motion-transition-normal)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--component-app-header-search-border-focus)]",
            className
          )}
        >
          {/* Avatar */}
          <span
            className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center shrink-0",
              "bg-[var(--component-app-header-avatar-bg)] text-[var(--component-app-header-avatar-text)]",
              "text-[10px] font-[number:var(--base-font-weight-semibold)] select-none"
            )}
          >
            {initials}
          </span>
          <span className="hidden sm:block font-[number:var(--base-font-weight-medium)] truncate max-w-[120px]">
            {name}
          </span>
          <ChevronDown
            className="text-[var(--component-app-header-search-placeholder)]"
            style={{ width: 14, height: 14 }}
          />
        </button>
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align="end"
          sideOffset={6}
          className={cn(
            "z-50 min-w-[180px] rounded-[var(--base-radius-md)]",
            "border border-[var(--component-app-header-border-bottom)] bg-[var(--alias-color-background-primary)]",
            "shadow-[var(--base-shadow-04)] p-[var(--alias-spacing-inline-xs)]",
            "text-[length:var(--alias-typography-body-text2-font-size)] text-[var(--alias-color-text-secondary)]",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            "duration-100 origin-top-right"
          )}
        >
          {/* User info */}
          <div className="px-2 py-1.5 mb-1 border-b border-[var(--alias-color-background-tertiary)]">
            <p className="font-[number:var(--base-font-weight-medium)] text-[var(--alias-color-text-secondary)] truncate">{name}</p>
            {email && (
              <p className="text-[length:var(--alias-typography-caption1-font-size)] text-[var(--component-app-header-search-placeholder)] truncate">{email}</p>
            )}
          </div>

          <DropdownMenuPrimitive.Item
            onSelect={onProfile}
            className={cn(
              "flex items-center gap-[var(--alias-spacing-inline-sm)] px-[var(--alias-spacing-padding-xs)] py-1.5 rounded-[var(--base-radius-sm)]",
              "cursor-pointer outline-none",
              "hover:bg-[var(--alias-color-background-tertiary)] focus:bg-[var(--alias-color-background-tertiary)]",
              "text-[var(--alias-color-text-tertiary)] [transition:var(--alias-motion-transition-normal)]"
            )}
          >
            Profile
          </DropdownMenuPrimitive.Item>

          <DropdownMenuPrimitive.Item
            onSelect={onSettings}
            className={cn(
              "flex items-center gap-[var(--alias-spacing-inline-sm)] px-[var(--alias-spacing-padding-xs)] py-1.5 rounded-[var(--base-radius-sm)]",
              "cursor-pointer outline-none",
              "hover:bg-[var(--alias-color-background-tertiary)] focus:bg-[var(--alias-color-background-tertiary)]",
              "text-[var(--alias-color-text-tertiary)] [transition:var(--alias-motion-transition-normal)]"
            )}
          >
            Settings
          </DropdownMenuPrimitive.Item>

          <DropdownMenuPrimitive.Separator className="my-1 h-px bg-[var(--component-app-header-border-bottom)]" />

          <DropdownMenuPrimitive.Item
            onSelect={onSignOut}
            className={cn(
              "flex items-center gap-[var(--alias-spacing-inline-sm)] px-[var(--alias-spacing-padding-xs)] py-1.5 rounded-[var(--base-radius-sm)]",
              "cursor-pointer outline-none",
              "hover:bg-[var(--alias-color-background-tertiary)] focus:bg-[var(--alias-color-background-tertiary)]",
              "text-[var(--alias-color-text-tertiary)] [transition:var(--alias-motion-transition-normal)]"
            )}
          >
            Sign out
          </DropdownMenuPrimitive.Item>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
}
