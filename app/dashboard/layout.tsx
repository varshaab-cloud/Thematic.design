"use client"

import React from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  BarChart2,
  Settings,
  FileText,
  Inbox,
  Bell,
  LogOut,
  Plug,
  CreditCard,
  ShieldCheck,
} from "lucide-react"
import { SidebarNav } from "@/components/ui/sidebar-nav"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// ─── Nav structure ────────────────────────────────────────────────────────────

const NAV = [
  {
    items: [
      { label: "Overview",  icon: <LayoutDashboard />, href: "/dashboard" },
      { label: "Inbox",     icon: <Inbox />,           href: "/dashboard/inbox",  badge: 4 },
      { label: "Reports",   icon: <BarChart2 />,        href: "/dashboard/reports" },
      { label: "Documents", icon: <FileText />,         href: "/dashboard/documents" },
    ],
  },
  {
    title: "Manage",
    items: [
      { label: "Team",          icon: <Users />,       href: "/dashboard/team",          badge: 12 },
      { label: "Notifications", icon: <Bell />,        href: "/dashboard/notifications" },
    ],
  },
  {
    title: "Settings",
    items: [
      { label: "Integrations", icon: <Plug />,        href: "/dashboard/settings" },
      { label: "Billing",      icon: <CreditCard />,  href: "/dashboard/settings" },
      { label: "Security",     icon: <ShieldCheck />, href: "/dashboard/settings" },
      { label: "Settings",     icon: <Settings />,    href: "/dashboard/settings" },
    ],
  },
]

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-md bg-[var(--base-color-blue-800)] flex items-center justify-center shrink-0">
        <span className="text-white text-[10px] font-bold leading-none">T</span>
      </div>
      <span className="text-sm font-semibold text-foreground tracking-tight">Thematic</span>
    </div>
  )
}

// ─── User footer ──────────────────────────────────────────────────────────────

function UserFooter() {
  return (
    <div className="flex items-center gap-2.5 w-full">
      <Avatar className="h-7 w-7 shrink-0">
        <AvatarFallback className="text-[10px] bg-[var(--base-color-blue-100)] text-[var(--base-color-blue-800)] font-semibold">
          VS
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-foreground truncate">Varsha S.</p>
        <p className="text-[10px] text-muted-foreground truncate">varsha@thematic.io</p>
      </div>
      <button
        className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
        title="Sign out"
      >
        <LogOut className="size-3.5" />
      </button>
    </div>
  )
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router   = useRouter()

  const sections = NAV.map(section => ({
    ...section,
    items: section.items.map(item => ({
      ...item,
      active:  item.href === pathname,
      onClick: () => router.push(item.href),
    })),
  }))

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--base-color-gray-75)]">
      <SidebarNav logo={<Logo />} sections={sections} footer={<UserFooter />} />
      <div className="flex flex-col flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  )
}
