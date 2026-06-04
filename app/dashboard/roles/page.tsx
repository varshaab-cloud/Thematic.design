"use client"

import React, { useState } from "react"
import { ChevronsUpDown, Pencil, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Access {
  readAttendance:    boolean
  editAttendance:    boolean
  approveAttendance: boolean
  readParking:       boolean
  editParking:       boolean
  approveParking:    boolean
}

interface UserRole {
  id:          number
  username:    string
  name:        string
  role:        string
  branches:    string[]    // empty = All
  departments: string[]    // empty = All
  access:      Access
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ALL_BRANCHES = ["EcoWorld", "Building 6&7"]

const ALL_DEPARTMENTS = [
  "Property Management", "Security", "STP", "Technical",
  "Housekeeping", "Waste Management", "Horticulture",
  "Parking Management", "Valetez",
]

const ACCESS_OPTIONS: { key: keyof Access; label: string }[] = [
  { key: "readAttendance",    label: "Read Attendance"    },
  { key: "editAttendance",    label: "Edit Attendance"    },
  { key: "approveAttendance", label: "Approve Attendance" },
  { key: "readParking",       label: "Read Parking"       },
  { key: "editParking",       label: "Edit Parking"       },
  { key: "approveParking",    label: "Approve Parking"    },
]

const INITIAL: UserRole[] = [
  {
    id: 1,
    username: "shwetha_manager",
    name: "Shwetha Manager",
    role: "Manager",
    branches: [],
    departments: [],
    access: { readAttendance: true, editAttendance: true, approveAttendance: false, readParking: true, editParking: true, approveParking: false },
  },
  {
    id: 2,
    username: "shwetha_supervisor",
    name: "Shwetha Supervisor",
    role: "Supervisor",
    branches: ["EcoWorld"],
    departments: ["Property Management", "Horticulture", "STP", "Waste Management", "Parking Management", "Technical", "Housekeeping", "Security"],
    access: { readAttendance: true, editAttendance: true, approveAttendance: false, readParking: false, editParking: false, approveParking: false },
  },
]

// ─── Access Badges ────────────────────────────────────────────────────────────

function AccessBadges({ access }: { access: Access }) {
  const attBadges = [
    access.readAttendance    && { letter: "R", title: "Read Attendance",    color: "bg-[var(--alias-color-feedback-success-bg)] text-[var(--alias-color-feedback-success-fg)]" },
    access.editAttendance    && { letter: "E", title: "Edit Attendance",    color: "bg-[var(--base-color-blue-100)] text-[var(--base-color-blue-800)]" },
    access.approveAttendance && { letter: "A", title: "Approve Attendance", color: "bg-[var(--alias-color-feedback-warning-bg)] text-[var(--alias-color-feedback-warning-fg)]" },
  ].filter(Boolean) as { letter: string; title: string; color: string }[]

  const pkBadges = [
    access.readParking    && { letter: "R", title: "Read Parking",    color: "bg-[var(--alias-color-feedback-success-bg)] text-[var(--alias-color-feedback-success-fg)]" },
    access.editParking    && { letter: "E", title: "Edit Parking",    color: "bg-[var(--base-color-blue-100)] text-[var(--base-color-blue-800)]" },
    access.approveParking && { letter: "A", title: "Approve Parking", color: "bg-[var(--alias-color-feedback-warning-bg)] text-[var(--alias-color-feedback-warning-fg)]" },
  ].filter(Boolean) as { letter: string; title: string; color: string }[]

  return (
    <div className="flex flex-col gap-1.5">
      {attBadges.length > 0 && (
        <div className="flex items-center gap-1">
          {attBadges.map((b, i) => (
            <span key={i} title={b.title} className={`size-5 rounded flex items-center justify-center text-[10px] font-semibold ${b.color}`}>
              {b.letter}
            </span>
          ))}
          <span className="text-[10px] text-[var(--alias-color-text-subtle)] ml-0.5">Att</span>
        </div>
      )}
      {pkBadges.length > 0 && (
        <div className="flex items-center gap-1">
          {pkBadges.map((b, i) => (
            <span key={i} title={b.title} className={`size-5 rounded flex items-center justify-center text-[10px] font-semibold ${b.color}`}>
              {b.letter}
            </span>
          ))}
          <span className="text-[10px] text-[var(--alias-color-text-subtle)] ml-0.5">Pk</span>
        </div>
      )}
    </div>
  )
}

// ─── Edit Modal ───────────────────────────────────────────────────────────────

function EditModal({
  user, open, onClose, onSave,
}: {
  user: UserRole | null
  open: boolean
  onClose: () => void
  onSave: (updated: UserRole) => void
}) {
  const [branches,    setBranches]    = useState<string[]>([])
  const [departments, setDepartments] = useState<string[]>([])
  const [access,      setAccess]      = useState<Access>({
    readAttendance: false, editAttendance: false, approveAttendance: false,
    readParking: false, editParking: false, approveParking: false,
  })

  React.useEffect(() => {
    if (user) {
      setBranches(user.branches)
      setDepartments(user.departments)
      setAccess(user.access)
    }
  }, [user, open])

  function toggleBranch(b: string) {
    setBranches(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b])
  }
  function toggleDept(d: string) {
    setDepartments(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d])
  }
  function toggleAccess(key: keyof Access) {
    setAccess(prev => ({ ...prev, [key]: !prev[key] }))
  }

  function handleSave() {
    if (!user) return
    onSave({ ...user, branches, departments, access })
    onClose()
  }

  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={v => { if (!v) onClose() }}>
      <DialogContent className="sm:max-w-md max-h-[85vh] flex flex-col" showCloseButton={false}>
        <DialogHeader className="flex flex-row items-center justify-between shrink-0">
          <DialogTitle className="text-base">Edit Role Assignments</DialogTitle>
          <button onClick={onClose} className="p-1 rounded-md text-[var(--alias-color-text-subtle)] hover:bg-[var(--alias-color-background-secondary)] transition-colors">
            <X className="size-4" />
          </button>
        </DialogHeader>

        <p className="text-xs text-[var(--alias-color-text-secondary)] -mt-1 shrink-0">
          <span className="font-semibold text-[var(--alias-color-text-primary)]">{user.username}</span>
          {" "}({user.name}) — {user.role}
        </p>

        <div className="flex-1 overflow-y-auto flex flex-col gap-5 mt-2 pr-1">

          {/* Branches */}
          <div>
            <label className="block text-xs font-semibold text-[var(--alias-color-text-primary)] mb-2">Branches</label>
            <div className="border border-[var(--alias-color-border-subtle)] rounded-lg overflow-hidden">
              {ALL_BRANCHES.map(b => (
                <label key={b} className="flex items-center gap-2.5 px-3 py-2.5 hover:bg-[var(--alias-color-background-secondary)] cursor-pointer border-b border-[var(--alias-color-border-subtle)] last:border-0">
                  <input
                    type="checkbox"
                    checked={branches.includes(b)}
                    onChange={() => toggleBranch(b)}
                    className="size-4 rounded accent-[var(--alias-color-text-brand)]"
                  />
                  <span className="text-sm text-[var(--alias-color-text-primary)]">{b}</span>
                </label>
              ))}
            </div>
            <p className="text-[11px] text-[var(--alias-color-text-subtle)] mt-1">
              Leave empty to grant access to all branches.
            </p>
          </div>

          {/* Access */}
          <div>
            <label className="block text-xs font-semibold text-[var(--alias-color-text-primary)] mb-2">Access</label>
            <div className="border border-[var(--alias-color-border-subtle)] rounded-lg overflow-hidden">
              {ACCESS_OPTIONS.map(opt => (
                <label key={opt.key} className="flex items-center gap-2.5 px-3 py-2.5 hover:bg-[var(--alias-color-background-secondary)] cursor-pointer border-b border-[var(--alias-color-border-subtle)] last:border-0">
                  <input
                    type="checkbox"
                    checked={access[opt.key]}
                    onChange={() => toggleAccess(opt.key)}
                    className="size-4 rounded accent-[var(--alias-color-text-brand)]"
                  />
                  <span className="text-sm text-[var(--alias-color-text-primary)]">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Departments */}
          <div>
            <label className="block text-xs font-semibold text-[var(--alias-color-text-primary)] mb-2">Departments</label>
            <div className="border border-[var(--alias-color-border-subtle)] rounded-lg overflow-hidden max-h-52 overflow-y-auto">
              {ALL_DEPARTMENTS.map(d => (
                <label key={d} className="flex items-center gap-2.5 px-3 py-2.5 hover:bg-[var(--alias-color-background-secondary)] cursor-pointer border-b border-[var(--alias-color-border-subtle)] last:border-0">
                  <input
                    type="checkbox"
                    checked={departments.includes(d)}
                    onChange={() => toggleDept(d)}
                    className="size-4 rounded accent-[var(--alias-color-text-brand)]"
                  />
                  <span className="text-sm text-[var(--alias-color-text-primary)]">{d}</span>
                </label>
              ))}
            </div>
            <p className="text-[11px] text-[var(--alias-color-text-subtle)] mt-1">
              Leave empty to grant access to all departments.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="flex gap-2 pt-3 shrink-0 border-t border-[var(--alias-color-border-subtle)]">
          <Button className="flex-1" onClick={handleSave}>Update</Button>
          <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RolesPage() {
  const [users, setUsers]   = useState<UserRole[]>(INITIAL)
  const [search, setSearch] = useState("")
  const [editing, setEditing] = useState<UserRole | null>(null)

  const filtered = users.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  )

  function saveUser(updated: UserRole) {
    setUsers(prev => prev.map(u => u.id === updated.id ? updated : u))
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6">

        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-[var(--alias-color-text-primary)]">Roles &amp; Assignments</h1>
        </div>

        {/* Search */}
        <div className="mb-3 w-72">
          <Input
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-9 text-sm"
          />
        </div>

        {/* Table */}
        <div className="border border-[var(--alias-color-border-default)] rounded-xl bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--alias-color-background-secondary)] border-b border-[var(--alias-color-border-subtle)]">
                {[
                  { label: "Username",    width: "w-40"  },
                  { label: "Name",        width: "w-36"  },
                  { label: "Role",        width: "w-28"  },
                  { label: "Branches",    width: "w-24"  },
                  { label: "Departments", width: ""      },
                  { label: "Access",      width: "w-28"  },
                ].map(col => (
                  <th key={col.label} className={`px-4 py-3 text-left text-xs font-semibold text-[var(--alias-color-text-secondary)] ${col.width}`}>
                    <button className="flex items-center gap-1 hover:text-[var(--alias-color-text-primary)] transition-colors">
                      {col.label} <ChevronsUpDown className="size-3 text-[var(--alias-color-text-subtle)]" />
                    </button>
                  </th>
                ))}
                <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--alias-color-text-secondary)] w-20">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => (
                <tr
                  key={user.id}
                  className={`hover:bg-[var(--alias-color-background-secondary)] transition-colors ${i < filtered.length - 1 ? "border-b border-[var(--alias-color-border-subtle)]" : ""}`}
                >
                  <td className="px-4 py-3 font-mono text-xs text-[var(--alias-color-text-secondary)]">
                    {user.username}
                  </td>
                  <td className="px-4 py-3 font-medium text-[var(--alias-color-text-primary)]">
                    {user.name}
                  </td>
                  <td className="px-4 py-3 text-[var(--alias-color-text-secondary)]">
                    {user.role}
                  </td>
                  <td className="px-4 py-3 text-[var(--alias-color-text-secondary)]">
                    {user.branches.length === 0 ? (
                      <span className="text-[var(--alias-color-text-subtle)]">All</span>
                    ) : user.branches.join(", ")}
                  </td>
                  <td className="px-4 py-3 text-[var(--alias-color-text-secondary)] text-xs leading-relaxed">
                    {user.departments.length === 0 ? (
                      <span className="text-[var(--alias-color-text-subtle)]">All</span>
                    ) : user.departments.join(", ")}
                  </td>
                  <td className="px-4 py-3">
                    <AccessBadges access={user.access} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => setEditing(user)}
                        className="p-1.5 rounded-md bg-[var(--base-color-blue-100)] text-[var(--base-color-blue-800)] hover:bg-[var(--base-color-blue-200)] transition-colors"
                      >
                        <Pencil className="size-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      <EditModal
        user={editing}
        open={!!editing}
        onClose={() => setEditing(null)}
        onSave={saveUser}
      />
    </div>
  )
}
