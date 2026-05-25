"use client"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import React from "react"
import {
  LayoutDashboard,
  BarChart2,
  Users,
  Settings,
  FileText,
  Inbox,
  Bell,
  TrendingUp,
  ArrowUpRight,
  Plus,
  Filter,
  Download,
} from "lucide-react"
import { SidebarNav } from "@/components/ui/sidebar-nav"
import { MetricCard } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

// ─── Design tokens (inline fallbacks) ────────────────────────────────────────

const t = {
  bg:      "#F5F5F3",
  white:   "#FFFFFF",
  border:  "#E3E3E0",
  muted:   "#B1B1B1",
  subtle:  "#EEEEEC",
  blue:    "#1518A6",
  label:   "#909090",
  text:    "#222222",
}

// ─── Shared placeholder block ─────────────────────────────────────────────────

function Block({
  label,
  height = 40,
  accent = false,
  style,
}: {
  label: string
  height?: number | string
  accent?: boolean
  style?: React.CSSProperties
}) {
  return (
    <div style={{
      height,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      border: `1.5px dashed ${accent ? t.blue : t.border}`,
      backgroundColor: accent ? "#C4C5F430" : t.subtle,
      ...style,
    }}>
      <span style={{
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase" as const,
        color: accent ? t.blue : t.label,
        fontFamily: "var(--font-sans, 'Outfit', sans-serif)",
      }}>
        {label}
      </span>
    </div>
  )
}

// ─── Sidebar data ─────────────────────────────────────────────────────────────

const navSections = [
  {
    items: [
      { label: "Overview",  icon: <LayoutDashboard />, active: true },
      { label: "Inbox",     icon: <Inbox />,    badge: 4 },
      { label: "Reports",   icon: <BarChart2 /> },
      { label: "Documents", icon: <FileText />  },
    ],
  },
  {
    title: "Manage",
    items: [
      { label: "Team",          icon: <Users />,    badge: 12 },
      { label: "Notifications", icon: <Bell />      },
    ],
  },
  {
    title: "Settings",
    items: [
      { label: "Settings", icon: <Settings /> },
    ],
  },
]

const Logo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <div style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: t.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>T</span>
    </div>
    <span style={{ fontSize: 13, fontWeight: 600, color: t.text, fontFamily: "var(--font-sans)" }}>Thematic</span>
  </div>
)

const UserFooter = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <Avatar className="h-7 w-7 shrink-0">
      <AvatarFallback className="text-[10px] bg-[var(--base-color-blue-100)] text-[var(--base-color-blue-800)] font-semibold">VS</AvatarFallback>
    </Avatar>
    <div style={{ flex: 1, minWidth: 0 }}>
      <p style={{ fontSize: 12, fontWeight: 500, color: t.text, fontFamily: "var(--font-sans)", margin: 0 }}>Varsha S.</p>
      <p style={{ fontSize: 10, color: t.label, fontFamily: "var(--font-sans)", margin: 0 }}>varsha@thematic.io</p>
    </div>
  </div>
)

// ─── Activity feed items ──────────────────────────────────────────────────────

const activityItems = [
  { initials: "PS", name: "Priya Sharma",  action: "completed sprint review",        time: "2m ago",  color: "#C4C5F4" },
  { initials: "JL", name: "James Lee",     action: "merged pull request #42",         time: "18m ago", color: "#DCFCE7" },
  { initials: "MK", name: "Mia Kaur",      action: "created a new design token set",  time: "1h ago",  color: "#FEF9C3" },
  { initials: "TN", name: "Tom Nguyen",    action: "updated workspace settings",      time: "3h ago",  color: "#E0E7FF" },
  { initials: "AR", name: "Ana Reyes",     action: "invited 2 new members",           time: "5h ago",  color: "#FCE7F3" },
]

// ─── Dashboard screen ─────────────────────────────────────────────────────────

function DashboardScreen() {
  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", overflow: "hidden", fontFamily: "var(--font-sans, 'Outfit', sans-serif)", backgroundColor: t.bg }}>

      {/* Sidebar */}
      <SidebarNav
        logo={<Logo />}
        sections={navSections}
        footer={<UserFooter />}
      />

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Top bar */}
        <header style={{ height: 56, borderBottom: `1px solid ${t.border}`, backgroundColor: t.white, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", flexShrink: 0 }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: t.text, margin: 0 }}>Overview</p>
            <p style={{ fontSize: 11, color: t.label, margin: 0 }}>Workspace activity at a glance</p>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Button variant="outline" size="sm">
              <Filter className="size-3.5" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="size-3.5" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="size-3.5" />
              New report
            </Button>
          </div>
        </header>

        {/* Scrollable content */}
        <main style={{ flex: 1, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>

          {/* KPI metric cards */}
          <section>
            <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: t.muted, fontFamily: "var(--font-sans)", marginBottom: 10 }}>
              KEY METRICS
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              <MetricCard
                label="Monthly active users"
                value="12,840"
                trend="up"
                trendValue="+8.2%"
                trendLabel="vs last month"
                icon={<Users />}
                variant="brand"
              />
              <MetricCard
                label="Projects completed"
                value="284"
                trend="up"
                trendValue="+12"
                trendLabel="this week"
                icon={<FileText />}
              />
              <MetricCard
                label="Avg. response time"
                value="1.4s"
                trend="down"
                trendValue="-0.3s"
                trendLabel="improvement"
                icon={<TrendingUp />}
                variant="success"
              />
              <MetricCard
                label="Open issues"
                value="37"
                trend="neutral"
                trendValue="No change"
                icon={<Bell />}
                variant="warning"
              />
            </div>
          </section>

          {/* Charts row */}
          <section style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
            <div style={{ backgroundColor: t.white, borderRadius: 12, border: `1px solid ${t.border}`, padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: t.text, margin: 0 }}>Activity over time</p>
                  <p style={{ fontSize: 11, color: t.label, margin: 0 }}>Daily active users — last 30 days</p>
                </div>
                <Tabs defaultValue="30d">
                  <TabsList>
                    <TabsTrigger value="7d">7d</TabsTrigger>
                    <TabsTrigger value="30d">30d</TabsTrigger>
                    <TabsTrigger value="90d">90d</TabsTrigger>
                  </TabsList>
                  <TabsContent value="7d" />
                  <TabsContent value="30d" />
                  <TabsContent value="90d" />
                </Tabs>
              </div>
              <Block label="Line chart — activity over time" height={200} accent />
            </div>

            <div style={{ backgroundColor: t.white, borderRadius: 12, border: `1px solid ${t.border}`, padding: 20 }}>
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: t.text, margin: 0 }}>Category split</p>
                <p style={{ fontSize: 11, color: t.label, margin: 0 }}>Usage by feature area</p>
              </div>
              <Block label="Donut chart — category breakdown" height={200} />
            </div>
          </section>

          {/* Activity feed */}
          <section>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: t.muted, fontFamily: "var(--font-sans)", margin: 0 }}>
                RECENT ACTIVITY
              </p>
              <Button variant="ghost" size="xs">
                View all
                <ArrowUpRight className="size-3" />
              </Button>
            </div>

            <div style={{ backgroundColor: t.white, borderRadius: 12, border: `1px solid ${t.border}`, overflow: "hidden" }}>
              {activityItems.map((item, i) => (
                <React.Fragment key={i}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px" }}>
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback style={{ backgroundColor: item.color, fontSize: 10, fontWeight: 600 }}>
                        {item.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: 12, fontWeight: 500, color: t.text, fontFamily: "var(--font-sans)" }}>
                        {item.name}
                      </span>
                      <span style={{ fontSize: 12, color: t.label, fontFamily: "var(--font-sans)" }}>
                        {" "}{item.action}
                      </span>
                    </div>
                    <span style={{ fontSize: 11, color: t.label, fontFamily: "var(--font-sans)", flexShrink: 0 }}>
                      {item.time}
                    </span>
                  </div>
                  {i < activityItems.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  )
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Wireframes/Dashboard",
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
  },
}
export default meta
type Story = StoryObj

export const Default: Story = {
  name: "Dashboard — Overview",
  render: () => <DashboardScreen />,
}
