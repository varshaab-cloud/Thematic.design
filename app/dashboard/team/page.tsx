"use client"

import React, { useState } from "react"
import { createColumnHelper } from "@tanstack/react-table"
import {
  MoreHorizontal,
  Plus,
  Mail,
  UserMinus,
  Trash2,
  ShieldCheck,
  Download,
} from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

// ─── Types & data ─────────────────────────────────────────────────────────────

type Role   = "Admin" | "Member" | "Viewer"
type Status = "Active" | "Invited" | "Suspended"

interface Member {
  id:         number
  initials:   string
  name:       string
  email:      string
  role:       Role
  status:     Status
  lastActive: string
  projects:   number
  avatarColor: string
}

const MEMBERS: Member[] = [
  { id:  1, initials: "PS", name: "Priya Sharma",  email: "priya@acme.io",   role: "Admin",   status: "Active",    lastActive: "Just now",  projects: 8,  avatarColor: "#C4C5F4" },
  { id:  2, initials: "JL", name: "James Lee",     email: "james@acme.io",   role: "Member",  status: "Active",    lastActive: "2h ago",    projects: 5,  avatarColor: "#DCFCE7" },
  { id:  3, initials: "MK", name: "Mia Kaur",      email: "mia@acme.io",     role: "Member",  status: "Invited",   lastActive: "—",         projects: 0,  avatarColor: "#FEF9C3" },
  { id:  4, initials: "TN", name: "Tom Nguyen",    email: "tom@acme.io",     role: "Viewer",  status: "Active",    lastActive: "1d ago",    projects: 3,  avatarColor: "#E0E7FF" },
  { id:  5, initials: "AR", name: "Ana Reyes",     email: "ana@acme.io",     role: "Member",  status: "Suspended", lastActive: "5d ago",    projects: 2,  avatarColor: "#FCE7F3" },
  { id:  6, initials: "BW", name: "Ben Walsh",     email: "ben@acme.io",     role: "Member",  status: "Active",    lastActive: "3h ago",    projects: 6,  avatarColor: "#FEE2E2" },
  { id:  7, initials: "CZ", name: "Chen Zhang",    email: "chen@acme.io",    role: "Admin",   status: "Active",    lastActive: "30m ago",   projects: 11, avatarColor: "#D1FAE5" },
  { id:  8, initials: "DO", name: "Diana Okafor",  email: "diana@acme.io",   role: "Viewer",  status: "Invited",   lastActive: "—",         projects: 0,  avatarColor: "#E0E7FF" },
  { id:  9, initials: "EF", name: "Ethan Fox",     email: "ethan@acme.io",   role: "Member",  status: "Active",    lastActive: "6h ago",    projects: 4,  avatarColor: "#FEF3C7" },
  { id: 10, initials: "FG", name: "Fatima Gani",   email: "fatima@acme.io",  role: "Member",  status: "Active",    lastActive: "2d ago",    projects: 7,  avatarColor: "#F0FDF4" },
  { id: 11, initials: "GH", name: "George Hill",   email: "george@acme.io",  role: "Viewer",  status: "Active",    lastActive: "4h ago",    projects: 2,  avatarColor: "#FDF4FF" },
  { id: 12, initials: "HI", name: "Hana Ito",      email: "hana@acme.io",    role: "Member",  status: "Invited",   lastActive: "—",         projects: 0,  avatarColor: "#FFF7ED" },
]

const statusVariant: Record<Status, "success" | "warning" | "error"> = {
  Active:    "success",
  Invited:   "warning",
  Suspended: "error",
}

// ─── Column definitions ───────────────────────────────────────────────────────

const col = createColumnHelper<Member>()

function buildColumns(onRemove: (m: Member) => void) {
  return [
    col.accessor("name", {
      header: "Member",
      size: 260,
      cell: ({ row }) => {
        const m = row.original
        return (
          <div className="flex items-center gap-2.5">
            <Avatar className="h-7 w-7 shrink-0">
              <AvatarFallback
                className="text-[10px] font-semibold text-foreground"
                style={{ backgroundColor: m.avatarColor }}
              >
                {m.initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground truncate">{m.name}</p>
              <p className="text-[11px] text-muted-foreground truncate">{m.email}</p>
            </div>
          </div>
        )
      },
    }),

    col.accessor("role", {
      header: "Role",
      size: 100,
      cell: ({ getValue }) => (
        <span className="text-xs text-muted-foreground">{getValue()}</span>
      ),
    }),

    col.accessor("status", {
      header: "Status",
      size: 110,
      cell: ({ getValue }) => {
        const s = getValue()
        return <Badge variant={statusVariant[s]} dot size="sm">{s}</Badge>
      },
    }),

    col.accessor("lastActive", {
      header: "Last active",
      size: 120,
      cell: ({ getValue }) => (
        <span className="text-xs text-muted-foreground">{getValue()}</span>
      ),
    }),

    col.accessor("projects", {
      header: "Projects",
      size: 120,
      cell: ({ getValue }) => {
        const n = getValue()
        const pct = Math.min(100, (n / 12) * 100)
        return (
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full bg-[var(--base-color-gray-200)] overflow-hidden">
              <div
                className="h-full rounded-full bg-[var(--base-color-blue-800)] transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-[11px] text-muted-foreground tabular-nums w-3">{n}</span>
          </div>
        )
      },
    }),

    col.display({
      id: "actions",
      size: 52,
      cell: ({ row }) => {
        const m = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" onClick={e => e.stopPropagation()}>
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem>
                <Mail className="size-3.5" />
                Send email
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ShieldCheck className="size-3.5" />
                Change role
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => onRemove(m)}
              >
                <Trash2 className="size-3.5" />
                Remove member
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    }),
  ]
}

// ─── Invite dialog ────────────────────────────────────────────────────────────

function InviteDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Invite team members</DialogTitle>
          <DialogDescription>
            Enter email addresses to send invitations. Separate multiple addresses with commas.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 pt-2">
          <Input
            label="Email addresses"
            type="email"
            placeholder="colleague@company.com, another@company.com"
          />
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-foreground">Role</label>
            <Select defaultValue="member">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin — full access</SelectItem>
                <SelectItem value="member">Member — can edit</SelectItem>
                <SelectItem value="viewer">Viewer — read only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={onClose}>Send invites</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TeamPage() {
  const [inviteOpen, setInviteOpen] = useState(false)
  const [removing, setRemoving]     = useState<Member | null>(null)
  const [selected, setSelected]     = useState<Member[]>([])
  const [data, setData]             = useState(MEMBERS)

  const columns = buildColumns((m) => setRemoving(m))

  function confirmRemove() {
    if (removing) setData(d => d.filter(m => m.id !== removing.id))
    setRemoving(null)
  }

  return (
    <>
      {/* Header */}
      <header className="h-14 shrink-0 border-b border-[var(--base-color-gray-200)] bg-white flex items-center justify-between px-6">
        <div>
          <p className="text-sm font-semibold text-foreground">Team members</p>
          <p className="text-[11px] text-muted-foreground">
            Manage access and roles · {data.length} members
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selected.length > 0 && (
            <>
              <Button variant="outline" size="sm">
                <UserMinus className="size-3.5" />
                Remove ({selected.length})
              </Button>
              <Button variant="outline" size="sm">
                <ShieldCheck className="size-3.5" />
                Change role
              </Button>
            </>
          )}
          <Button variant="outline" size="sm">
            <Download className="size-3.5" />
            Export
          </Button>
          <Button size="sm" onClick={() => setInviteOpen(true)}>
            <Plus className="size-3.5" />
            Invite member
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6">

        {/* Role filter pills */}
        <div className="flex items-center gap-2 mb-4">
          {(["All", "Admin", "Member", "Viewer"] as const).map((role, i) => (
            <button
              key={role}
              className={[
                "h-7 px-3 rounded-full text-xs font-medium transition-colors border",
                i === 0
                  ? "bg-[var(--base-color-blue-800)] text-white border-transparent"
                  : "bg-white text-muted-foreground border-[var(--base-color-gray-200)] hover:border-[var(--base-color-gray-500)]",
              ].join(" ")}
            >
              {role}
            </button>
          ))}
        </div>

        <DataTable
          columns={columns}
          data={data}
          searchable
          searchPlaceholder="Search by name or email…"
          selectable
          columnToggle
          onSelectionChange={setSelected}
          defaultPageSize={10}
        />
      </main>

      {/* Invite dialog */}
      <InviteDialog open={inviteOpen} onClose={() => setInviteOpen(false)} />

      {/* Remove confirmation dialog */}
      <Dialog open={!!removing} onOpenChange={() => setRemoving(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Remove {removing?.name}?</DialogTitle>
            <DialogDescription>
              They'll lose access to the workspace immediately. This can't be undone.
            </DialogDescription>
          </DialogHeader>
          <Alert variant="destructive" className="mt-1">
            <AlertDescription>
              Any projects they own will need to be reassigned.
            </AlertDescription>
          </Alert>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setRemoving(null)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmRemove}>Remove member</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
