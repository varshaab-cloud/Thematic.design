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
  Building2,
  CreditCard,
  Plug,
  ShieldCheck,
  Upload,
  Trash2,
  AlertTriangle,
} from "lucide-react"
import { SidebarNav } from "@/components/ui/sidebar-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// ─── Design tokens ────────────────────────────────────────────────────────────

const t = {
  bg:     "#F5F5F3",
  white:  "#FFFFFF",
  border: "#E3E3E0",
  muted:  "#B1B1B1",
  subtle: "#EEEEEC",
  blue:   "#1518A6",
  label:  "#909090",
  text:   "#222222",
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const navSections = [
  {
    items: [
      { label: "Overview",  icon: <LayoutDashboard /> },
      { label: "Inbox",     icon: <Inbox />,    badge: 4 },
      { label: "Reports",   icon: <BarChart2 /> },
      { label: "Documents", icon: <FileText />  },
    ],
  },
  {
    title: "Manage",
    items: [
      { label: "Team",          icon: <Users /> },
      { label: "Notifications", icon: <Bell />  },
    ],
  },
  {
    title: "Settings",
    items: [{ label: "Settings", icon: <Settings />, active: true }],
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
    <div>
      <p style={{ fontSize: 12, fontWeight: 500, color: t.text, fontFamily: "var(--font-sans)", margin: 0 }}>Varsha S.</p>
      <p style={{ fontSize: 10, color: t.label, fontFamily: "var(--font-sans)", margin: 0 }}>varsha@thematic.io</p>
    </div>
  </div>
)

// ─── Reusable form section wrapper ────────────────────────────────────────────

function FormSection({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <p style={{ fontSize: 13, fontWeight: 600, color: t.text, fontFamily: "var(--font-sans)", margin: "0 0 2px" }}>{title}</p>
        {description && (
          <p style={{ fontSize: 12, color: t.label, fontFamily: "var(--font-sans)", margin: 0 }}>{description}</p>
        )}
      </div>
      {children}
    </div>
  )
}

// ─── Settings sub-nav items ───────────────────────────────────────────────────

const settingsSections = [
  { label: "General",       icon: <Building2 className="size-3.5" /> },
  { label: "Members",       icon: <Users className="size-3.5" /> },
  { label: "Billing",       icon: <CreditCard className="size-3.5" /> },
  { label: "Integrations",  icon: <Plug className="size-3.5" /> },
  { label: "Security",      icon: <ShieldCheck className="size-3.5" /> },
  { label: "Notifications", icon: <Bell className="size-3.5" /> },
]

// ─── Notification toggle row ──────────────────────────────────────────────────

function NotifRow({ label, desc, defaultChecked = true }: { label: string; desc: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked)
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
      <div>
        <p style={{ fontSize: 12, fontWeight: 500, color: t.text, fontFamily: "var(--font-sans)", margin: "0 0 2px" }}>{label}</p>
        <p style={{ fontSize: 11, color: t.label, fontFamily: "var(--font-sans)", margin: 0 }}>{desc}</p>
      </div>
      <Switch checked={checked} onCheckedChange={setChecked} />
    </div>
  )
}

// ─── General settings panel ───────────────────────────────────────────────────

function GeneralPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

      <FormSection
        title="Workspace identity"
        description="Basic information shown to your team and on public pages."
      >
        {/* Logo upload */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 14,
            backgroundColor: t.subtle,
            border: `1px solid ${t.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, backgroundColor: t.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>T</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <Button variant="outline" size="sm">
              <Upload className="size-3.5" />
              Upload logo
            </Button>
            <p style={{ fontSize: 11, color: t.label, fontFamily: "var(--font-sans)", margin: 0 }}>PNG, JPG or SVG · max 1 MB · 512×512px</p>
          </div>
        </div>

        <Input
          label="Workspace name"
          defaultValue="Acme Design System"
          helperText="Your team's display name across Thematic."
        />
        <Input
          label="Workspace URL"
          defaultValue="acme"
          helperText="thematic.design/acme — cannot be changed after setup."
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: t.text, fontFamily: "var(--font-sans)" }}>Description</label>
          <Textarea placeholder="Tell your team what this workspace is for…" rows={3} className="resize-none" />
        </div>
      </FormSection>

      <Separator />

      <FormSection
        title="Preferences"
        description="Localisation and display settings for your workspace."
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: t.text, fontFamily: "var(--font-sans)" }}>Timezone</label>
            <Select defaultValue="utc_plus5_30">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc">UTC+0 — London</SelectItem>
                <SelectItem value="utc_plus5_30">UTC+5:30 — Mumbai</SelectItem>
                <SelectItem value="utc_minus5">UTC-5 — New York</SelectItem>
                <SelectItem value="utc_plus9">UTC+9 — Tokyo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: t.text, fontFamily: "var(--font-sans)" }}>Language</label>
            <Select defaultValue="en">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: t.text, fontFamily: "var(--font-sans)" }}>Date format</label>
          <RadioGroup defaultValue="mdy" style={{ display: "flex", gap: 20 }}>
            {[
              { value: "mdy",  label: "MM/DD/YYYY" },
              { value: "dmy",  label: "DD/MM/YYYY" },
              { value: "ymd",  label: "YYYY-MM-DD" },
            ].map(opt => (
              <div key={opt.value} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <RadioGroupItem value={opt.value} id={`date-${opt.value}`} />
                <label htmlFor={`date-${opt.value}`} style={{ fontSize: 12, color: t.text, fontFamily: "var(--font-sans)", cursor: "pointer" }}>
                  {opt.label}
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </FormSection>

      <Separator />

      <FormSection
        title="Danger zone"
        description="Permanent actions that cannot be undone."
      >
        <div style={{
          borderRadius: 10,
          border: "1px solid #FCA5A5",
          backgroundColor: "#FFF5F5",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <AlertTriangle className="size-4 shrink-0 mt-0.5" style={{ color: "#DC2626" }} />
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#DC2626", fontFamily: "var(--font-sans)", margin: "0 0 2px" }}>Delete this workspace</p>
              <p style={{ fontSize: 11, color: "#991B1B", fontFamily: "var(--font-sans)", margin: 0 }}>
                All data — members, projects, and tokens — will be permanently erased. This cannot be undone.
              </p>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="destructive" size="sm">
              <Trash2 className="size-3.5" />
              Delete workspace
            </Button>
          </div>
        </div>
      </FormSection>

      {/* Save/Cancel */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, paddingBottom: 16 }}>
        <Button variant="outline">Cancel</Button>
        <Button>Save changes</Button>
      </div>

    </div>
  )
}

// ─── Notifications panel ──────────────────────────────────────────────────────

function NotificationsPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

      <FormSection
        title="Email notifications"
        description="Control which emails Thematic sends to your inbox."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <NotifRow label="Team activity digest"    desc="Daily summary of workspace activity sent each morning." defaultChecked={true} />
          <Separator />
          <NotifRow label="New member joins"        desc="Notify me when someone accepts an invitation." defaultChecked={true} />
          <Separator />
          <NotifRow label="Project status changes"  desc="Get notified when a project moves to a new status." defaultChecked={false} />
          <Separator />
          <NotifRow label="Billing & invoices"      desc="Receipts, payment failures and subscription changes." defaultChecked={true} />
          <Separator />
          <NotifRow label="Product updates"         desc="New features and release announcements from Thematic." defaultChecked={false} />
        </div>
      </FormSection>

      <Separator />

      <FormSection
        title="In-app notifications"
        description="Banners and badges shown inside Thematic."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <NotifRow label="Mentions"          desc="When someone @mentions you in a comment or thread." defaultChecked={true} />
          <Separator />
          <NotifRow label="Assigned to me"    desc="Tasks or reviews assigned directly to you."          defaultChecked={true} />
          <Separator />
          <NotifRow label="Comments"          desc="Replies on threads you've participated in."           defaultChecked={false} />
        </div>
      </FormSection>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, paddingBottom: 16 }}>
        <Button variant="outline">Cancel</Button>
        <Button>Save preferences</Button>
      </div>

    </div>
  )
}

// ─── Settings shell ───────────────────────────────────────────────────────────

function SettingsScreen({ activeSection = "General" }: { activeSection?: string }) {
  const [section, setSection] = useState(activeSection)

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", overflow: "hidden", fontFamily: "var(--font-sans, 'Outfit', sans-serif)", backgroundColor: t.bg }}>

      <SidebarNav logo={<Logo />} sections={navSections} footer={<UserFooter />} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Header */}
        <header style={{ height: 56, borderBottom: `1px solid ${t.border}`, backgroundColor: t.white, display: "flex", alignItems: "center", padding: "0 24px", flexShrink: 0 }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: t.text, margin: 0 }}>Settings</p>
            <p style={{ fontSize: 11, color: t.label, margin: 0 }}>Workspace configuration and preferences</p>
          </div>
        </header>

        <div style={{ flex: 1, overflow: "hidden", display: "flex" }}>

          {/* Settings sub-nav */}
          <nav style={{
            width: 200,
            borderRight: `1px solid ${t.border}`,
            backgroundColor: t.bg,
            padding: "16px 8px",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}>
            {settingsSections.map(item => {
              const isActive = item.label === section
              return (
                <button
                  key={item.label}
                  onClick={() => setSection(item.label)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    height: 32,
                    borderRadius: 6,
                    padding: "0 10px",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: isActive ? t.subtle : "transparent",
                    fontFamily: "var(--font-sans)",
                    fontSize: 12,
                    fontWeight: isActive ? 500 : 400,
                    color: isActive ? t.text : t.label,
                    textAlign: "left" as const,
                    width: "100%",
                  }}
                >
                  <span style={{ color: isActive ? t.blue : t.label }}>{item.icon}</span>
                  {item.label}
                  {item.label === "Billing" && (
                    <Badge variant="warning" size="sm" style={{ marginLeft: "auto" }}>Pro</Badge>
                  )}
                </button>
              )
            })}
          </nav>

          {/* Settings content */}
          <div style={{ flex: 1, overflowY: "auto", padding: "32px 40px", maxWidth: 720 }}>
            {section === "General" && <GeneralPanel />}
            {section === "Notifications" && <NotificationsPanel />}
            {!["General", "Notifications"].includes(section) && (
              <div style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                color: t.label,
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  backgroundColor: t.subtle,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {settingsSections.find(s => s.label === section)?.icon ?? <Settings className="size-5" />}
                </div>
                <p style={{ fontSize: 13, fontWeight: 500, color: t.muted, fontFamily: "var(--font-sans)", margin: 0 }}>
                  {section} settings
                </p>
                <p style={{ fontSize: 12, color: t.label, fontFamily: "var(--font-sans)", margin: 0 }}>
                  Content for this section goes here.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Wireframes/Settings",
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
  },
}
export default meta
type Story = StoryObj

export const General: Story = {
  name: "Settings — General",
  render: () => <SettingsScreen activeSection="General" />,
}

export const Notifications: Story = {
  name: "Settings — Notifications",
  render: () => <SettingsScreen activeSection="Notifications" />,
}
