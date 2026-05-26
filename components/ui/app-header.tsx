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
        "flex items-center w-full bg-white px-4 gap-3",
        sticky && "sticky top-0 z-50",
        bordered && "border-b border-[var(--base-color-gray-200)]",
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
      className={cn("flex items-center gap-2 shrink-0", className)}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          className="w-7 h-7 rounded-md object-contain"
        />
      ) : (
        <div
          className={cn(
            "w-7 h-7 rounded-md flex items-center justify-center",
            "bg-[var(--base-color-blue-800)] text-white",
            "text-xs font-bold leading-none select-none"
          )}
        >
          T
        </div>
      )}
      <span className="text-sm font-semibold text-[var(--base-color-gray-900)] tracking-tight">
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
    "relative flex items-center h-full px-3 text-sm font-medium transition-colors",
    "outline-none focus-visible:ring-2 focus-visible:ring-[var(--base-color-blue-400)]",
    active
      ? "text-[var(--base-color-blue-800)]"
      : "text-[var(--base-color-gray-600)] hover:text-[var(--base-color-gray-900)]",
    className
  )

  const inner = (
    <>
      {children}
      {active && (
        <span
          className="absolute bottom-0 left-3 right-3 h-0.5 rounded-t-full bg-[var(--base-color-blue-800)]"
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
          "flex items-center gap-2 h-8 px-3 rounded-[var(--base-radius-md)]",
          "border border-[var(--base-color-gray-200)] bg-[var(--base-color-gray-50)]",
          "text-sm text-[var(--base-color-gray-400)]",
          "hover:border-[var(--base-color-gray-300)] hover:bg-white transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--base-color-blue-400)]",
          className
        )}
      >
        <Search style={{ width: 14, height: 14 }} />
        <span className="text-sm">{placeholder}</span>
        <kbd className="ml-1 hidden sm:inline-flex items-center text-[10px] border border-[var(--base-color-gray-200)] rounded px-1 leading-4">
          ⌘K
        </kbd>
      </button>
    )
  }

  return (
    <div
      data-slot="app-header-search"
      className={cn(
        "flex items-center gap-2 h-8 px-3 rounded-[var(--base-radius-md)]",
        "border border-[var(--base-color-gray-200)] bg-[var(--base-color-gray-50)]",
        "focus-within:border-[var(--base-color-blue-400)] focus-within:bg-white focus-within:ring-2 focus-within:ring-[var(--base-color-blue-100)]",
        "transition-all",
        className
      )}
    >
      <Search
        className="shrink-0 text-[var(--base-color-gray-400)]"
        style={{ width: 14, height: 14 }}
      />
      <input
        type="text"
        placeholder={placeholder}
        className={cn(
          "flex-1 bg-transparent text-sm text-[var(--base-color-gray-900)]",
          "placeholder:text-[var(--base-color-gray-400)]",
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
      className={cn("flex items-center gap-1 ml-auto shrink-0", className)}
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
        "text-[var(--base-color-gray-600)] hover:text-[var(--base-color-gray-900)]",
        "hover:bg-[var(--base-color-gray-100)] transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--base-color-blue-400)]",
        className
      )}
    >
      <Bell style={{ width: 18, height: 18 }} />
      {count > 0 && (
        <span
          className={cn(
            "absolute top-1 right-1 flex items-center justify-center",
            "min-w-[16px] h-4 px-1 rounded-full",
            "bg-[var(--base-color-blue-800)] text-white text-[9px] font-semibold leading-none",
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
            "flex items-center gap-2 h-8 px-2 rounded-[var(--base-radius-md)]",
            "text-sm text-[var(--base-color-gray-700)]",
            "hover:bg-[var(--base-color-gray-100)] transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--base-color-blue-400)]",
            className
          )}
        >
          {/* Avatar */}
          <span
            className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center shrink-0",
              "bg-[var(--base-color-blue-100)] text-[var(--base-color-blue-800)]",
              "text-[10px] font-semibold select-none"
            )}
          >
            {initials}
          </span>
          <span className="hidden sm:block font-medium truncate max-w-[120px]">
            {name}
          </span>
          <ChevronDown
            className="text-[var(--base-color-gray-400)]"
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
            "border border-[var(--base-color-gray-200)] bg-white",
            "shadow-[var(--base-shadow-04)] p-1",
            "text-sm text-[var(--base-color-gray-900)]",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            "duration-100 origin-top-right"
          )}
        >
          {/* User info */}
          <div className="px-2 py-1.5 mb-1 border-b border-[var(--base-color-gray-100)]">
            <p className="font-medium text-[var(--base-color-gray-900)] truncate">{name}</p>
            {email && (
              <p className="text-xs text-[var(--base-color-gray-400)] truncate">{email}</p>
            )}
          </div>

          <DropdownMenuPrimitive.Item
            onSelect={onProfile}
            className={cn(
              "flex items-center gap-2 px-2 py-1.5 rounded-[var(--base-radius-sm)]",
              "cursor-pointer outline-none",
              "hover:bg-[var(--base-color-gray-100)] focus:bg-[var(--base-color-gray-100)]",
              "text-[var(--base-color-gray-700)] transition-colors"
            )}
          >
            Profile
          </DropdownMenuPrimitive.Item>

          <DropdownMenuPrimitive.Item
            onSelect={onSettings}
            className={cn(
              "flex items-center gap-2 px-2 py-1.5 rounded-[var(--base-radius-sm)]",
              "cursor-pointer outline-none",
              "hover:bg-[var(--base-color-gray-100)] focus:bg-[var(--base-color-gray-100)]",
              "text-[var(--base-color-gray-700)] transition-colors"
            )}
          >
            Settings
          </DropdownMenuPrimitive.Item>

          <DropdownMenuPrimitive.Separator className="my-1 h-px bg-[var(--base-color-gray-200)]" />

          <DropdownMenuPrimitive.Item
            onSelect={onSignOut}
            className={cn(
              "flex items-center gap-2 px-2 py-1.5 rounded-[var(--base-radius-sm)]",
              "cursor-pointer outline-none",
              "hover:bg-[var(--base-color-gray-100)] focus:bg-[var(--base-color-gray-100)]",
              "text-[var(--base-color-gray-700)] transition-colors"
            )}
          >
            Sign out
          </DropdownMenuPrimitive.Item>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
}
