"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// ◆ design-lead
// Sidebar navigation — the architectural spine of the dashboard.
// Taste profile: gray-75 background, no border on the right (space does the separating),
// active items get blue-800 text + blue-100 background, icons from Lucide only.
// Compact density — each nav item is h-8, section labels are xs/medium/muted.

export interface NavItem {
  label: string
  icon: React.ReactNode
  href?: string
  badge?: string | number
  active?: boolean
  onClick?: () => void
}

export interface NavSection {
  title?: string
  items: NavItem[]
}

export interface SidebarNavProps {
  logo?: React.ReactNode
  sections: NavSection[]
  footer?: React.ReactNode
  collapsed?: boolean
  className?: string
}

function SidebarNav({
  logo,
  sections,
  footer,
  collapsed = false,
  className,
}: SidebarNavProps) {
  return (
    <aside
      data-slot="sidebar-nav"
      className={cn(
        "flex flex-col h-full border-r border-[var(--component-nav-sidebar-color-stroke)]",
        "bg-[var(--component-nav-sidebar-color-bg)]",
        collapsed ? "w-14" : "w-56",
        "[transition:var(--alias-motion-transition-slow)] shrink-0",
        className
      )}
    >
      {/* Logo / Wordmark */}
      {logo && (
        <div className={cn(
          "flex items-center h-14 border-b border-[var(--component-nav-sidebar-color-stroke)] shrink-0",
          collapsed ? "justify-center px-0" : "px-[var(--alias-spacing-padding-md)]"
        )}>
          {logo}
        </div>
      )}

      {/* Nav sections */}
      <nav className="flex-1 overflow-y-auto py-[var(--alias-spacing-padding-sm)] flex flex-col gap-[var(--alias-spacing-stack-md)]">
        {sections.map((section, si) => (
          <div key={si} className="flex flex-col gap-0.5 px-[var(--alias-spacing-padding-xs)]">
            {section.title && !collapsed && (
              <p className="px-[var(--alias-spacing-padding-xs)] pb-1 text-[10px] font-[number:var(--base-font-weight-medium)] uppercase tracking-widest text-[var(--alias-color-text-subtle)]">
                {section.title}
              </p>
            )}
            {section.items.map((item, ii) => (
              <button
                key={ii}
                onClick={item.onClick}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-[var(--base-radius-md)] px-[var(--alias-spacing-padding-xs)] h-8 text-[length:var(--alias-typography-button-font-size)] [transition:var(--alias-motion-transition-normal)] w-full text-left",
                  "text-[var(--component-nav-sidebar-color-item-text-default)] hover:bg-[var(--component-nav-sidebar-color-item-bg-hover)] hover:text-[var(--component-nav-sidebar-color-item-text-hover)]",
                  item.active && "bg-[var(--component-nav-sidebar-color-item-bg-active)] text-[var(--component-nav-sidebar-color-item-text-active)] font-[number:var(--alias-typography-button-font-weight)] hover:bg-[var(--component-nav-sidebar-color-item-bg-active)]",
                  collapsed && "justify-center px-0"
                )}
              >
                <span className={cn(
                  "shrink-0 [&_svg]:size-4",
                  item.active ? "text-[var(--component-nav-sidebar-color-item-icon-active)]" : "text-[var(--component-nav-sidebar-color-item-icon-default)]"
                )}>
                  {item.icon}
                </span>
                {!collapsed && (
                  <>
                    <span className="truncate flex-1">{item.label}</span>
                    {item.badge !== undefined && (
                      <span className={cn(
                        "ml-auto text-[10px] font-[number:var(--base-font-weight-medium)] tabular-nums rounded-full px-1.5 py-0.5",
                        item.active
                          ? "bg-[var(--component-feedback-badge-brand-color-bg)] text-white"
                          : "bg-[var(--component-feedback-badge-neutral-color-bg)] text-[var(--alias-color-text-subtle)]"
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer slot */}
      {footer && (
        <div className={cn(
          "border-t border-[var(--component-nav-sidebar-color-stroke)] p-[var(--alias-spacing-padding-sm)] shrink-0",
          collapsed && "flex justify-center"
        )}>
          {footer}
        </div>
      )}
    </aside>
  )
}

export { SidebarNav }
