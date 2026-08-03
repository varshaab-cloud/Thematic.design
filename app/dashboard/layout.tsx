"use client"

import React from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  Home,
  Clock,
  Landmark,
  Layers,
  Users,
  Award,
  CalendarClock,
  CalendarDays,
  Plane,
  ClipboardPen,
  CalendarHeart,
  Truck,
  Car,
  AlertCircle,
  Receipt,
  FileText,
  User,
  LogOut,
  Menu,
} from "lucide-react"
import { SidebarNav } from "@/components/ui/sidebar-nav"

// ─── Nav structure ────────────────────────────────────────────────────────────

const NAV = [
  {
    items: [
      { label: "Home", icon: <Home />, href: "/dashboard" },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Attendance",    icon: <Clock />,         href: "/dashboard/attendance" },
      { label: "Leaves & Att.", icon: <Plane />,         href: "/dashboard/leaves",  badge: 2 },
      { label: "Shifts",        icon: <CalendarClock />, href: "/dashboard/shifts" },
      { label: "Roster",        icon: <CalendarDays />,  href: "/dashboard/roster" },
    ],
  },
  {
    title: "Finance",
    items: [
      { label: "Invoices", icon: <FileText />, href: "/dashboard/invoices" },
    ],
  },
  {
    title: "Administration",
    items: [
      { label: "Employees",    icon: <Users />,    href: "/dashboard/employees" },
      { label: "Branches",     icon: <Landmark />, href: "/dashboard/branches" },
      { label: "Dept & Roles", icon: <Layers />,   href: "/dashboard/departments" },
      { label: "Vendors",      icon: <Truck />,    href: "/dashboard/vendors" },
    ],
  },
  {
    title: "Admin",
    collapsible: true,
    items: [
      { label: "Roles & Assignments", icon: <Award />, href: "/dashboard/roles" },
    ],
  },
  {
    title: "Parking",
    collapsible: true,
    items: [
      { label: "Parking",      icon: <Car />,         href: "/dashboard/parking" },
      { label: "Incidents",    icon: <AlertCircle />, href: "/dashboard/incidents" },
      { label: "Parking Fees", icon: <Receipt />,     href: "/dashboard/parking-fees" },
    ],
  },
]

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo() {
  return (
    <div className="flex items-center gap-2.5 w-full">
      <button className="text-[var(--alias-color-text-subtle)] hover:text-[var(--alias-color-text-primary)] transition-colors shrink-0">
        <Menu className="size-4" />
      </button>
      <span className="text-sm font-semibold text-[var(--alias-color-text-primary)] truncate">
        Safehalo Attendance
      </span>
    </div>
  )
}

// ─── User footer ──────────────────────────────────────────────────────────────

function UserFooter() {
  const router = useRouter()
  return (
    <div className="flex flex-col gap-0.5">
      <button
        onClick={() => router.push("/dashboard/profile")}
        className="flex items-center gap-2.5 px-2 h-8 rounded-md text-xs text-[var(--alias-color-text-secondary)] hover:bg-[var(--alias-color-background-tertiary)] hover:text-[var(--alias-color-text-primary)] transition-colors w-full text-left"
      >
        <User className="size-4 shrink-0" />
        <span>Profile</span>
      </button>
      <button
        onClick={() => router.push("/login")}
        className="flex items-center gap-2.5 px-2 h-8 rounded-md text-xs text-[var(--alias-color-feedback-error-fg)] hover:bg-[var(--alias-color-feedback-error-bg)] transition-colors w-full text-left"
      >
        <LogOut className="size-4 shrink-0" />
        <span>Logout</span>
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
      active:  pathname === item.href,
      onClick: () => router.push(item.href!),
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
