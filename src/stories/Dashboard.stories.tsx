"use client"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import React from "react"

// ─── Shared placeholder primitives ───────────────────────────────────────────

const tokens = {
  bg:        "#F5F5F3",
  white:     "#FFFFFF",
  border:    "#E3E3E0",
  muted:     "#B1B1B1",
  subtle:    "#EEEEEC",
  blue:      "#1518A6",
  blueLight: "#C4C5F4",
  label:     "#909090",
}

// A labeled placeholder block
function Block({
  label,
  height = 40,
  accent = false,
  faint = false,
  flex,
  minWidth,
  style,
}: {
  label: string
  height?: number | string
  accent?: boolean
  faint?: boolean
  flex?: number | string
  minWidth?: number
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        height,
        flex,
        minWidth,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        border: `1.5px dashed ${accent ? tokens.blue : tokens.border}`,
        backgroundColor: accent ? tokens.blueLight + "30" : faint ? tokens.bg : tokens.white,
        ...style,
      }}
    >
      <span style={{
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: accent ? tokens.blue : tokens.label,
        fontFamily: "var(--font-sans, 'Outfit', sans-serif)",
      }}>
        {label}
      </span>
    </div>
  )
}

// Sidebar placeholder
function SidebarPlaceholder({ items }: { items: string[] }) {
  return (
    <aside style={{
      width: 220,
      height: "100%",
      borderRight: `1px solid ${tokens.border}`,
      backgroundColor: tokens.bg,
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{
        height: 56,
        borderBottom: `1px solid ${tokens.border}`,
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        gap: 10,
      }}>
        <div style={{
          width: 24, height: 24,
          borderRadius: 6,
          backgroundColor: tokens.blue,
        }} />
        <div style={{ height: 10, width: 80, borderRadius: 4, backgroundColor: tokens.border }} />
      </div>

      {/* Nav items */}
      <div style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 3 }}>
        {items.map((item, i) => (
          <div key={i} style={{
            height: 32,
            borderRadius: 6,
            backgroundColor: i === 0 ? tokens.blueLight + "50" : "transparent",
            border: i === 0 ? `1px solid ${tokens.blueLight}` : "none",
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
            gap: 8,
          }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: i === 0 ? tokens.blue : tokens.muted, flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: i === 0 ? tokens.blue : tokens.label, fontFamily: "var(--font-sans)", fontWeight: i === 0 ? 600 : 400 }}>
              {item}
            </span>
          </div>
        ))}
      </div>

      {/* User footer */}
      <div style={{
        height: 56,
        borderTop: `1px solid ${tokens.border}`,
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
        gap: 8,
      }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: tokens.blueLight, flexShrink: 0 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ width: 72, height: 8, borderRadius: 4, backgroundColor: tokens.border }} />
          <div style={{ width: 48, height: 6, borderRadius: 4, backgroundColor: tokens.subtle }} />
        </div>
      </div>
    </aside>
  )
}

// Top header bar
function HeaderBar({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header style={{
      height: 56,
      borderBottom: `1px solid ${tokens.border}`,
      backgroundColor: tokens.white,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px",
      flexShrink: 0,
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#222", fontFamily: "var(--font-sans)" }}>{title}</span>
        <span style={{ fontSize: 11, color: tokens.label, fontFamily: "var(--font-sans)" }}>{subtitle}</span>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${tokens.border}`, backgroundColor: tokens.white }} />
        <div style={{ width: 80, height: 32, borderRadius: 8, border: `1px solid ${tokens.border}`, backgroundColor: tokens.white }} />
        <div style={{ width: 110, height: 32, borderRadius: 8, backgroundColor: tokens.blue }} />
      </div>
    </header>
  )
}

// Region label — floats above a section
function RegionLabel({ children }: { children: string }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 8,
    }}>
      <span style={{
        fontSize: 9,
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: tokens.muted,
        fontFamily: "var(--font-sans)",
      }}>
        {children}
      </span>
      <div style={{ flex: 1, height: 1, backgroundColor: tokens.subtle }} />
    </div>
  )
}

// Shell wrapper
function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      width: "100%",
      height: "100vh",
      backgroundColor: tokens.bg,
      fontFamily: "var(--font-sans, 'Outfit', sans-serif)",
      display: "flex",
      overflow: "hidden",
    }}>
      {children}
    </div>
  )
}

// ─── Layout 1: Overview / Dashboard ──────────────────────────────────────────

function OverviewLayout() {
  return (
    <Shell>
      <SidebarPlaceholder items={["Overview", "Analytics", "Team", "Projects", "Settings"]} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <HeaderBar title="Overview" subtitle="Workspace activity at a glance" />
        <main style={{ flex: 1, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>

          <div>
            <RegionLabel>Metric cards · 4 across</RegionLabel>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
              <Block label="Metric — primary" height={88} accent />
              <Block label="Metric" height={88} />
              <Block label="Metric" height={88} />
              <Block label="Metric" height={88} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12 }}>
            <div>
              <RegionLabel>Chart — line / bar · main insight</RegionLabel>
              <Block label="Chart · activity over time" height={220} />
            </div>
            <div>
              <RegionLabel>Chart — donut · breakdown</RegionLabel>
              <Block label="Chart · category split" height={220} />
            </div>
          </div>

          <div>
            <RegionLabel>Recent activity · list</RegionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {["Activity item", "Activity item", "Activity item", "Activity item"].map((_, i) => (
                <Block key={i} label={`Activity item ${i + 1}`} height={40} faint />
              ))}
            </div>
          </div>

        </main>
      </div>
    </Shell>
  )
}

// ─── Layout 2: Data listing ───────────────────────────────────────────────────

function DataListingLayout() {
  return (
    <Shell>
      <SidebarPlaceholder items={["Overview", "Team", "Projects", "Reports", "Settings"]} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <HeaderBar title="Team members" subtitle="Manage access and roles" />
        <main style={{ flex: 1, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>

          <div>
            <RegionLabel>Filter / search toolbar</RegionLabel>
            <div style={{ display: "flex", gap: 8 }}>
              <Block label="Search input" height={32} flex={1} />
              <Block label="Filter" height={32} style={{ width: 80 }} />
              <Block label="Sort" height={32} style={{ width: 80 }} />
              <Block label="Column toggle" height={32} style={{ width: 120 }} />
            </div>
          </div>

          <div>
            <RegionLabel>Data table</RegionLabel>
            {/* Table header */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 48px",
              gap: 8,
              padding: "8px 12px",
              borderRadius: "8px 8px 0 0",
              border: `1px solid ${tokens.border}`,
              backgroundColor: tokens.subtle,
              borderBottom: "none",
            }}>
              {["Member", "Role", "Status", "Last active", "Projects", ""].map((col, i) => (
                <span key={i} style={{ fontSize: 10, fontWeight: 600, color: tokens.label, fontFamily: "var(--font-sans)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{col}</span>
              ))}
            </div>
            {/* Table rows */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 48px",
                gap: 8,
                padding: "10px 12px",
                border: `1px solid ${tokens.border}`,
                borderTop: "none",
                backgroundColor: tokens.white,
                borderRadius: i === 7 ? "0 0 8px 8px" : 0,
                alignItems: "center",
              }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: tokens.subtle, flexShrink: 0 }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <div style={{ width: 100, height: 8, borderRadius: 4, backgroundColor: tokens.border }} />
                    <div style={{ width: 72, height: 6, borderRadius: 4, backgroundColor: tokens.subtle }} />
                  </div>
                </div>
                <div style={{ width: 56, height: 8, borderRadius: 4, backgroundColor: tokens.subtle }} />
                <div style={{ width: 52, height: 18, borderRadius: 20, backgroundColor: i % 3 === 0 ? "#DCFCE7" : i % 3 === 1 ? "#FFFADE" : tokens.subtle }} />
                <div style={{ width: 64, height: 8, borderRadius: 4, backgroundColor: tokens.subtle }} />
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ flex: 1, height: 4, borderRadius: 4, backgroundColor: tokens.subtle, overflow: "hidden" }}>
                    <div style={{ width: `${30 + (i * 17) % 60}%`, height: "100%", backgroundColor: tokens.blue, borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: 10, color: tokens.label, fontFamily: "var(--font-sans)" }}>{3 + (i * 3) % 12}</span>
                </div>
                <div style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${tokens.border}`, backgroundColor: tokens.white }} />
              </div>
            ))}
            {/* Pagination */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0" }}>
              <div style={{ width: 80, height: 8, borderRadius: 4, backgroundColor: tokens.subtle }} />
              <div style={{ display: "flex", gap: 4 }}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${tokens.border}`, backgroundColor: i === 2 ? tokens.blue : tokens.white }} />
                ))}
              </div>
            </div>
          </div>

        </main>
      </div>
    </Shell>
  )
}

// ─── Layout 3: Detail / profile ──────────────────────────────────────────────

function DetailLayout() {
  return (
    <Shell>
      <SidebarPlaceholder items={["Overview", "Team", "Projects", "Reports", "Settings"]} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <HeaderBar title="Priya Sharma · Profile" subtitle="Member since Jan 2024" />
        <main style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16, height: "100%" }}>

            {/* Main column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <RegionLabel>Profile overview</RegionLabel>
                <Block label="Avatar · Name · Role · Status" height={80} />
              </div>
              <div>
                <RegionLabel>Activity feed</RegionLabel>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Block key={i} label={`Activity event ${i + 1}`} height={44} faint />
                  ))}
                </div>
              </div>
              <div>
                <RegionLabel>Projects · table · compact</RegionLabel>
                <Block label="Projects data table" height={180} />
              </div>
            </div>

            {/* Side panel */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <RegionLabel>Quick stats</RegionLabel>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {["Projects active", "Tasks completed", "Last login", "Role"].map((stat, i) => (
                    <div key={i} style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 12px",
                      borderRadius: 8,
                      border: `1px solid ${tokens.border}`,
                      backgroundColor: tokens.white,
                    }}>
                      <span style={{ fontSize: 11, color: tokens.label, fontFamily: "var(--font-sans)" }}>{stat}</span>
                      <div style={{ width: 48, height: 8, borderRadius: 4, backgroundColor: tokens.subtle }} />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <RegionLabel>Permissions</RegionLabel>
                <Block label="Role & access controls" height={120} />
              </div>
              <div>
                <RegionLabel>Danger zone</RegionLabel>
                <Block label="Remove · Suspend · Transfer" height={80} style={{ borderColor: "#FFB9BB" }} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </Shell>
  )
}

// ─── Layout 4: Settings ───────────────────────────────────────────────────────

function SettingsLayout() {
  return (
    <Shell>
      <SidebarPlaceholder items={["Overview", "Team", "Projects", "Reports", "Settings"]} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <HeaderBar title="Settings" subtitle="Workspace configuration" />
        <main style={{ flex: 1, overflowY: "auto", display: "flex", overflow: "hidden" }}>

          {/* Settings sub-nav */}
          <div style={{
            width: 180,
            borderRight: `1px solid ${tokens.border}`,
            backgroundColor: tokens.bg,
            padding: "16px 8px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            flexShrink: 0,
          }}>
            {["General", "Members", "Billing", "Integrations", "Security", "Notifications"].map((item, i) => (
              <div key={i} style={{
                height: 30,
                borderRadius: 6,
                backgroundColor: i === 0 ? tokens.subtle : "transparent",
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
              }}>
                <span style={{ fontSize: 11, color: i === 0 ? "#222" : tokens.label, fontFamily: "var(--font-sans)", fontWeight: i === 0 ? 500 : 400 }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Settings form area */}
          <div style={{ flex: 1, overflowY: "auto", padding: 32, display: "flex", flexDirection: "column", gap: 32, maxWidth: 640 }}>
            <div>
              <RegionLabel>Workspace identity</RegionLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Block label="Workspace name · text input" height={36} />
                <Block label="Workspace URL · text input" height={36} />
                <Block label="Logo upload · file input" height={72} />
              </div>
            </div>
            <div>
              <RegionLabel>Preferences</RegionLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Block label="Timezone · combobox" height={36} />
                <Block label="Default language · select" height={36} />
                <Block label="Date format · radio group" height={72} />
              </div>
            </div>
            <div>
              <RegionLabel>Form actions</RegionLabel>
              <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                <Block label="Cancel · outline button" height={32} style={{ width: 100 }} />
                <Block label="Save changes · primary button" height={32} accent style={{ width: 140 }} />
              </div>
            </div>
          </div>

        </main>
      </div>
    </Shell>
  )
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Pages/Dashboard",
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
  },
}
export default meta
type Story = StoryObj

export const Overview: Story = {
  name: "1 · Overview",
  render: () => <OverviewLayout />,
}

export const DataListing: Story = {
  name: "2 · Data listing",
  render: () => <DataListingLayout />,
}

export const DetailView: Story = {
  name: "3 · Detail / Profile",
  render: () => <DetailLayout />,
}

export const SettingsPage: Story = {
  name: "4 · Settings",
  render: () => <SettingsLayout />,
}
