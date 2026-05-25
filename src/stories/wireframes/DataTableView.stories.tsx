"use client"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import React, { useState } from "react"
import {
  Search,
  Filter,
  SlidersHorizontal,
  Download,
  Plus,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Trash2,
  UserMinus,
  Mail,
  LayoutDashboard,
  Users,
  BarChart2,
  Settings,
  FileText,
  Inbox,
  Bell,
} from "lucide-react"
import { SidebarNav } from "@/components/ui/sidebar-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

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

// ─── Sample data ──────────────────────────────────────────────────────────────

const members = [
  { id: 1, initials: "PS", name: "Priya Sharma",   email: "priya@acme.io",   role: "Admin",   status: "Active",    lastActive: "Just now",  projects: 8,  color: "#C4C5F4" },
  { id: 2, initials: "JL", name: "James Lee",      email: "james@acme.io",   role: "Member",  status: "Active",    lastActive: "2h ago",    projects: 5,  color: "#DCFCE7" },
  { id: 3, initials: "MK", name: "Mia Kaur",       email: "mia@acme.io",     role: "Member",  status: "Invited",   lastActive: "—",         projects: 0,  color: "#FEF9C3" },
  { id: 4, initials: "TN", name: "Tom Nguyen",     email: "tom@acme.io",     role: "Viewer",  status: "Active",    lastActive: "1d ago",    projects: 3,  color: "#E0E7FF" },
  { id: 5, initials: "AR", name: "Ana Reyes",      email: "ana@acme.io",     role: "Member",  status: "Suspended", lastActive: "5d ago",    projects: 2,  color: "#FCE7F3" },
  { id: 6, initials: "BW", name: "Ben Walsh",      email: "ben@acme.io",     role: "Member",  status: "Active",    lastActive: "3h ago",    projects: 6,  color: "#FEE2E2" },
  { id: 7, initials: "CZ", name: "Chen Zhang",     email: "chen@acme.io",    role: "Admin",   status: "Active",    lastActive: "30m ago",   projects: 11, color: "#D1FAE5" },
  { id: 8, initials: "DO", name: "Diana Okafor",   email: "diana@acme.io",   role: "Viewer",  status: "Invited",   lastActive: "—",         projects: 0,  color: "#E0E7FF" },
]

const statusVariant: Record<string, "success" | "warning" | "error" | "outline"> = {
  Active:    "success",
  Invited:   "warning",
  Suspended: "error",
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
      { label: "Team",          icon: <Users />, active: true, badge: 8 },
      { label: "Notifications", icon: <Bell />  },
    ],
  },
  {
    title: "Settings",
    items: [{ label: "Settings", icon: <Settings /> }],
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

// ─── Data table screen ────────────────────────────────────────────────────────

function DataTableScreen() {
  const [selected, setSelected] = useState<number[]>([])
  const [search, setSearch] = useState("")

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase())
  )

  const allSelected = filtered.length > 0 && filtered.every(m => selected.includes(m.id))
  const someSelected = selected.length > 0 && !allSelected

  const toggleAll = () => {
    if (allSelected) setSelected([])
    else setSelected(filtered.map(m => m.id))
  }
  const toggleRow = (id: number) => {
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])
  }

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", overflow: "hidden", fontFamily: "var(--font-sans, 'Outfit', sans-serif)", backgroundColor: t.bg }}>

      <SidebarNav logo={<Logo />} sections={navSections} footer={<UserFooter />} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Header */}
        <header style={{ height: 56, borderBottom: `1px solid ${t.border}`, backgroundColor: t.white, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", flexShrink: 0 }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: t.text, margin: 0 }}>Team members</p>
            <p style={{ fontSize: 11, color: t.label, margin: 0 }}>Manage access and roles · {members.length} members</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="outline" size="sm">
              <Download className="size-3.5" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="size-3.5" />
              Invite member
            </Button>
          </div>
        </header>

        <main style={{ flex: 1, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Toolbar */}
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ flex: 1, maxWidth: 320 }}>
              <Input
                placeholder="Search members…"
                prefixIcon={<Search />}
                value={search}
                onChange={e => setSearch((e.target as HTMLInputElement).value)}
              />
            </div>

            <Button variant="outline" size="sm">
              <Filter className="size-3.5" />
              Filter
              <ChevronDown className="size-3 ml-0.5 opacity-60" />
            </Button>

            <Button variant="outline" size="sm">
              <SlidersHorizontal className="size-3.5" />
              Columns
            </Button>

            <div style={{ marginLeft: "auto" }}>
              <Select defaultValue="all">
                <SelectTrigger className="h-7 text-xs w-[120px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bulk action bar */}
          {selected.length > 0 && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 16px",
              borderRadius: 8,
              backgroundColor: "#EEF2FF",
              border: `1px solid #C7D2FE`,
            }}>
              <span style={{ fontSize: 12, color: t.blue, fontFamily: "var(--font-sans)", fontWeight: 500 }}>
                {selected.length} selected
              </span>
              <Separator orientation="vertical" style={{ height: 16 }} />
              <Button variant="ghost" size="xs">
                <Mail className="size-3.5" />
                Send email
              </Button>
              <Button variant="ghost" size="xs">
                <UserMinus className="size-3.5" />
                Change role
              </Button>
              <Button variant="ghost" size="xs" className="text-destructive hover:text-destructive">
                <Trash2 className="size-3.5" />
                Remove
              </Button>
            </div>
          )}

          {/* Table */}
          <div style={{ backgroundColor: t.white, borderRadius: 12, border: `1px solid ${t.border}`, overflow: "hidden" }}>

            {/* Column headers */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "40px 2fr 1fr 1fr 1fr 80px 48px",
              gap: 8,
              padding: "10px 16px",
              backgroundColor: t.subtle,
              borderBottom: `1px solid ${t.border}`,
              alignItems: "center",
            }}>
              <Checkbox
                checked={allSelected ? true : someSelected ? "indeterminate" : false}
                onCheckedChange={toggleAll}
              />
              {["Member", "Role", "Status", "Last active", "Projects", ""].map((col, i) => (
                <span key={i} style={{ fontSize: 10, fontWeight: 600, color: t.label, fontFamily: "var(--font-sans)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {col}
                </span>
              ))}
            </div>

            {/* Rows */}
            {filtered.map((member, i) => (
              <div
                key={member.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "40px 2fr 1fr 1fr 1fr 80px 48px",
                  gap: 8,
                  padding: "10px 16px",
                  borderBottom: i < filtered.length - 1 ? `1px solid ${t.border}` : "none",
                  alignItems: "center",
                  backgroundColor: selected.includes(member.id) ? "#F5F7FF" : t.white,
                  cursor: "pointer",
                }}
                onClick={() => toggleRow(member.id)}
              >
                <Checkbox
                  checked={selected.includes(member.id)}
                  onCheckedChange={() => toggleRow(member.id)}
                  onClick={e => e.stopPropagation()}
                />

                {/* Member cell */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar className="h-7 w-7 shrink-0">
                    <AvatarFallback style={{ backgroundColor: member.color, fontSize: 10, fontWeight: 600, color: t.text }}>
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 500, color: t.text, fontFamily: "var(--font-sans)", margin: 0 }}>{member.name}</p>
                    <p style={{ fontSize: 11, color: t.label, fontFamily: "var(--font-sans)", margin: 0 }}>{member.email}</p>
                  </div>
                </div>

                <span style={{ fontSize: 12, color: t.label, fontFamily: "var(--font-sans)" }}>{member.role}</span>

                <Badge variant={statusVariant[member.status]} dot size="sm">{member.status}</Badge>

                <span style={{ fontSize: 12, color: t.label, fontFamily: "var(--font-sans)" }}>{member.lastActive}</span>

                {/* Projects mini progress */}
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ flex: 1, height: 4, borderRadius: 4, backgroundColor: t.subtle, overflow: "hidden" }}>
                    <div style={{ width: `${Math.min(100, (member.projects / 12) * 100)}%`, height: "100%", backgroundColor: t.blue, borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: 11, color: t.label, fontFamily: "var(--font-sans)", minWidth: 12 }}>{member.projects}</span>
                </div>

                {/* Row actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
                    <Button variant="ghost" size="icon-sm">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem><Mail className="size-3.5" /> Send email</DropdownMenuItem>
                    <DropdownMenuItem>Change role</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                      <Trash2 className="size-3.5" /> Remove member
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, color: t.label, fontFamily: "var(--font-sans)" }}>
              Showing {filtered.length} of {members.length} members
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Select defaultValue="10">
                <SelectTrigger className="h-7 text-xs w-[80px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 / page</SelectItem>
                  <SelectItem value="25">25 / page</SelectItem>
                  <SelectItem value="50">50 / page</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon-sm" disabled>
                <ChevronLeft className="size-4" />
              </Button>
              {[1, 2, 3].map(p => (
                <Button key={p} variant={p === 1 ? "default" : "outline"} size="icon-sm">
                  {p}
                </Button>
              ))}
              <Button variant="outline" size="icon-sm">
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Wireframes/DataTableView",
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
  },
}
export default meta
type Story = StoryObj

export const Default: Story = {
  name: "Team Members — List View",
  render: () => <DataTableScreen />,
}
