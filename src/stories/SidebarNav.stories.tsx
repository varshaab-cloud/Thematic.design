"use client"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import React, { useState } from "react"
import {
  LayoutDashboard,
  Users,
  BarChart2,
  Settings,
  FileText,
  Inbox,
  Bell,
  HelpCircle,
  LogOut,
  ShieldCheck,
  Plug,
  CreditCard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { SidebarNav } from "@/components/ui/sidebar-nav"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const meta: Meta<typeof SidebarNav> = {
  title: "Thematic/Components/SidebarNav",
  component: SidebarNav,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
}
export default meta
type Story = StoryObj<typeof SidebarNav>

// ─── Shared nav data ──────────────────────────────────────────────────────────

const mainSections = [
  {
    items: [
      { label: "Dashboard", icon: <LayoutDashboard />, active: true },
      { label: "Inbox", icon: <Inbox />, badge: 4 },
      { label: "Reports", icon: <BarChart2 /> },
      { label: "Documents", icon: <FileText /> },
    ],
  },
  {
    title: "Manage",
    items: [
      { label: "Team", icon: <Users />, badge: 12 },
      { label: "Notifications", icon: <Bell /> },
      { label: "Permissions", icon: <ShieldCheck /> },
    ],
  },
  {
    title: "Settings",
    items: [
      { label: "Integrations", icon: <Plug /> },
      { label: "Billing", icon: <CreditCard /> },
      { label: "Preferences", icon: <Settings /> },
    ],
  },
]

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-6 h-6 rounded-md bg-[var(--base-color-blue-800)] flex items-center justify-center">
      <span className="text-white text-[10px] font-bold leading-none">T</span>
    </div>
    <span className="text-sm font-semibold text-foreground tracking-tight">Thematic</span>
  </div>
)

const UserFooter = ({ collapsed }: { collapsed?: boolean }) => (
  <div className={`flex items-center gap-2.5 ${collapsed ? "justify-center" : ""}`}>
    <Avatar className="h-7 w-7 shrink-0">
      <AvatarFallback className="text-[10px] bg-[var(--base-color-blue-100)] text-[var(--base-color-blue-800)] font-semibold">
        VS
      </AvatarFallback>
    </Avatar>
    {!collapsed && (
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-foreground truncate">Varsha S.</p>
        <p className="text-[10px] text-muted-foreground truncate">varsha@thematic.io</p>
      </div>
    )}
    {!collapsed && (
      <button className="shrink-0 text-muted-foreground hover:text-foreground transition-colors" title="Sign out">
        <LogOut className="size-3.5" />
      </button>
    )}
  </div>
)

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: "Expanded",
  render: () => (
    <div className="h-[600px] flex">
      <SidebarNav
        logo={<Logo />}
        sections={mainSections}
        footer={<UserFooter />}
      />
      <div className="flex-1 bg-[var(--base-color-gray-75)] flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Main content area</p>
      </div>
    </div>
  ),
}

export const Collapsed: Story = {
  name: "Collapsed (Icon Rail)",
  render: () => (
    <div className="h-[600px] flex">
      <SidebarNav
        logo={
          <div className="w-6 h-6 rounded-md bg-[var(--base-color-blue-800)] flex items-center justify-center">
            <span className="text-white text-[10px] font-bold leading-none">T</span>
          </div>
        }
        sections={mainSections}
        collapsed
        footer={<UserFooter collapsed />}
      />
      <div className="flex-1 bg-[var(--base-color-gray-75)] flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Main content area</p>
      </div>
    </div>
  ),
}

export const Collapsible: Story = {
  name: "Toggle (Expandable)",
  render: () => {
    const [collapsed, setCollapsed] = useState(false)
    return (
      <div className="h-[600px] flex relative">
        <SidebarNav
          logo={collapsed
            ? <div className="w-6 h-6 rounded-md bg-[var(--base-color-blue-800)] flex items-center justify-center">
                <span className="text-white text-[10px] font-bold leading-none">T</span>
              </div>
            : <Logo />
          }
          sections={mainSections}
          collapsed={collapsed}
          footer={<UserFooter collapsed={collapsed} />}
          className="relative"
        />
        {/* Toggle button */}
        <button
          onClick={() => setCollapsed(c => !c)}
          className={[
            "absolute top-[54px] z-10 flex items-center justify-center",
            "w-5 h-5 rounded-full border border-[var(--base-color-gray-200)]",
            "bg-white shadow-sm text-muted-foreground hover:text-foreground transition-all",
            collapsed ? "left-[46px]" : "left-[212px]",
          ].join(" ")}
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? <ChevronRight className="size-3" /> : <ChevronLeft className="size-3" />}
        </button>
        <div className="flex-1 bg-[var(--base-color-gray-75)] flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Click the arrow to toggle</p>
        </div>
      </div>
    )
  },
}

export const WithActiveStates: Story = {
  name: "Interactive (Active State)",
  render: () => {
    const [activeItem, setActiveItem] = useState("Dashboard")
    const allLabels = mainSections.flatMap(s => s.items.map(i => i.label))

    const sections = mainSections.map(section => ({
      ...section,
      items: section.items.map(item => ({
        ...item,
        active: item.label === activeItem,
        onClick: () => setActiveItem(item.label),
      })),
    }))

    return (
      <div className="h-[600px] flex">
        <SidebarNav
          logo={<Logo />}
          sections={sections}
          footer={<UserFooter />}
        />
        <div className="flex-1 bg-[var(--base-color-gray-75)] flex flex-col items-center justify-center gap-2">
          <p className="text-sm font-medium text-foreground">{activeItem}</p>
          <p className="text-xs text-muted-foreground">Click any nav item to activate</p>
        </div>
      </div>
    )
  },
}

export const MinimalNoSections: Story = {
  name: "Minimal (No Section Titles)",
  render: () => (
    <div className="h-[600px] flex">
      <SidebarNav
        logo={<Logo />}
        sections={[
          {
            items: [
              { label: "Overview", icon: <LayoutDashboard />, active: true },
              { label: "Analytics", icon: <BarChart2 /> },
              { label: "Users", icon: <Users />, badge: 3 },
              { label: "Settings", icon: <Settings /> },
              { label: "Help", icon: <HelpCircle /> },
            ],
          },
        ]}
        footer={<UserFooter />}
      />
      <div className="flex-1 bg-[var(--base-color-gray-75)]" />
    </div>
  ),
}
