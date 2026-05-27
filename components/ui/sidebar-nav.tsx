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
        "flex flex-col h-full border-r border-[var(--base-color-gray-200)]",
        "bg-[var(--base-color-gray-75)]",
        collapsed ? "w-14" : "w-56",
        "transition-all duration-200 shrink-0",
        className
      )}
    >
      {/* Logo / Wordmark */}
      {logo && (
        <div className={cn(
          "flex items-center h-14 border-b border-[var(--base-color-gray-200)] shrink-0",
          collapsed ? "justify-center px-0" : "px-4"
        )}>
          {logo}
        </div>
      )}

      {/* Nav sections */}
      <nav className="flex-1 overflow-y-auto py-3 flex flex-col gap-4">
        {sections.map((section, si) => (
          <div key={si} className="flex flex-col gap-0.5 px-2">
            {section.title && !collapsed && (
              <p className="px-2 pb-1 text-[10px] font-medium uppercase tracking-widest text-[var(--alias-color-text-subtle)]">
                {section.title}
              </p>
            )}
            {section.items.map((item, ii) => (
              <button
                key={ii}
                onClick={item.onClick}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-[var(--base-radius-md)] px-2 h-8 text-sm transition-colors w-full text-left",
                  "text-[var(--base-color-gray-700)] hover:bg-[var(--base-color-gray-200)] hover:text-[var(--alias-color-text-primary)]",
                  item.active && "bg-[var(--base-color-blue-100)] text-[var(--base-color-blue-800)] font-medium hover:bg-[var(--base-color-blue-100)]",
                  collapsed && "justify-center px-0"
                )}
              >
                <span className={cn(
                  "shrink-0 [&_svg]:size-4",
                  item.active ? "text-[var(--base-color-blue-800)]" : "text-[var(--base-color-gray-500)]"
                )}>
                  {item.icon}
                </span>
                {!collapsed && (
                  <>
                    <span className="truncate flex-1">{item.label}</span>
                    {item.badge !== undefined && (
                      <span className={cn(
                        "ml-auto text-[10px] font-medium tabular-nums rounded-full px-1.5 py-0.5",
                        item.active
                          ? "bg-[var(--base-color-blue-800)] text-white"
                          : "bg-[var(--base-color-gray-200)] text-[var(--alias-color-text-subtle)]"
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
          "border-t border-[var(--base-color-gray-200)] p-3 shrink-0",
          collapsed && "flex justify-center"
        )}>
          {footer}
        </div>
      )}
    </aside>
  )
}

export { SidebarNav }
