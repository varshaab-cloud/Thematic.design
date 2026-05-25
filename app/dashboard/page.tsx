"use client"

/**
 * app/dashboard/page.tsx
 *
 * The Overview dashboard screen.
 * Accessible at: http://localhost:3000/dashboard
 *
 * This file only contains the RIGHT-HAND content.
 * The sidebar comes from app/dashboard/layout.tsx automatically.
 *
 * To customise this page:
 *   - Edit the `kpiCards` array to change the metric values
 *   - Replace the <ChartPlaceholder> blocks with a real chart library
 *   - Replace `activityFeed` data with real API data
 */

import React from "react"
import {
  Users,
  FileText,
  TrendingUp,
  Bell,
  Plus,
  Filter,
  Download,
  ArrowUpRight,
} from "lucide-react"
import { MetricCard } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// ─── KPI data ─────────────────────────────────────────────────────────────────
// Edit these values to show your real metrics.

const kpiCards = [
  {
    label:      "Monthly active users",
    value:      "12,840",
    trend:      "up"      as const,
    trendValue: "+8.2%",
    trendLabel: "vs last month",
    icon:       <Users />,
    variant:    "brand"   as const,
  },
  {
    label:      "Projects completed",
    value:      "284",
    trend:      "up"      as const,
    trendValue: "+12",
    trendLabel: "this week",
    icon:       <FileText />,
    variant:    "default" as const,
  },
  {
    label:      "Avg. response time",
    value:      "1.4s",
    trend:      "down"    as const,
    trendValue: "−0.3s",
    trendLabel: "improvement",
    icon:       <TrendingUp />,
    variant:    "success" as const,
  },
  {
    label:      "Open issues",
    value:      "37",
    trend:      "neutral" as const,
    trendValue: "No change",
    icon:       <Bell />,
    variant:    "warning" as const,
  },
]

// ─── Activity feed data ───────────────────────────────────────────────────────

const activityFeed = [
  { initials: "PS", name: "Priya Sharma",  action: "completed sprint review",       time: "2m ago",  color: "#C4C5F4" },
  { initials: "JL", name: "James Lee",     action: "merged pull request #42",        time: "18m ago", color: "#DCFCE7" },
  { initials: "MK", name: "Mia Kaur",      action: "created a new design token set", time: "1h ago",  color: "#FEF9C3" },
  { initials: "TN", name: "Tom Nguyen",    action: "updated workspace settings",     time: "3h ago",  color: "#E0E7FF" },
  { initials: "AR", name: "Ana Reyes",     action: "invited 2 new members",          time: "5h ago",  color: "#FCE7F3" },
]

// ─── Chart placeholder ────────────────────────────────────────────────────────
// Replace this with Recharts, Chart.js, etc. when you're ready.

function ChartPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-[var(--base-color-gray-200)] bg-[var(--base-color-gray-75)] h-[200px]">
      <span className="text-[10px] font-medium uppercase tracking-widest text-[var(--base-color-gray-500)]">
        {label}
      </span>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <>
      {/* ── Top header bar ── */}
      <header className="h-14 shrink-0 border-b border-[var(--base-color-gray-200)] bg-white flex items-center justify-between px-6">
        <div>
          <p className="text-sm font-semibold text-foreground">Overview</p>
          <p className="text-[11px] text-muted-foreground">Workspace activity at a glance</p>
        </div>
        <div className="flex items-center gap-2">
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

      {/* ── Scrollable content ── */}
      <main className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">

        {/* KPI cards */}
        <section>
          <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--base-color-gray-500)] mb-3">
            Key metrics
          </p>
          <div className="grid grid-cols-4 gap-3">
            {kpiCards.map((card) => (
              <MetricCard key={card.label} {...card} />
            ))}
          </div>
        </section>

        {/* Charts row */}
        <section className="grid grid-cols-[2fr_1fr] gap-4">

          {/* Main chart */}
          <div className="bg-white rounded-xl border border-[var(--base-color-gray-200)] p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Activity over time</p>
                <p className="text-[11px] text-muted-foreground">Daily active users — last 30 days</p>
              </div>
              {/* Time-range selector — swap TabsTrigger values to filter real data */}
              <Tabs defaultValue="30d">
                <TabsList>
                  <TabsTrigger value="7d">7d</TabsTrigger>
                  <TabsTrigger value="30d">30d</TabsTrigger>
                  <TabsTrigger value="90d">90d</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <ChartPlaceholder label="Line chart — swap in Recharts or Chart.js here" />
          </div>

          {/* Breakdown chart */}
          <div className="bg-white rounded-xl border border-[var(--base-color-gray-200)] p-5">
            <div className="mb-4">
              <p className="text-sm font-semibold text-foreground">Category split</p>
              <p className="text-[11px] text-muted-foreground">Usage by feature area</p>
            </div>
            <ChartPlaceholder label="Donut chart — swap in Recharts here" />
          </div>

        </section>

        {/* Activity feed */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--base-color-gray-500)]">
              Recent activity
            </p>
            <Button variant="ghost" size="xs">
              View all
              <ArrowUpRight className="size-3" />
            </Button>
          </div>

          <div className="bg-white rounded-xl border border-[var(--base-color-gray-200)] overflow-hidden">
            {activityFeed.map((item, i) => (
              <React.Fragment key={i}>
                <div className="flex items-center gap-3 px-4 py-3">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback
                      className="text-[10px] font-semibold"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.initials}
                    </AvatarFallback>
                  </Avatar>
                  <p className="flex-1 text-xs text-foreground">
                    <span className="font-medium">{item.name}</span>
                    {" "}{item.action}
                  </p>
                  <Badge variant="outline" size="sm">{item.time}</Badge>
                </div>
                {i < activityFeed.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
        </section>

      </main>
    </>
  )
}
