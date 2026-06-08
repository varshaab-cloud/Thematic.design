"use client"

import React, { useState } from "react"
import { Pencil, Trash2, ChevronsUpDown, Plus, X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useRouter } from "next/navigation"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Department {
  id: number
  name: string
  description: string
  fixedWeekoff: boolean
  weekoffDays: number
  weekoffDay1: string
  weekoffDay2: string
  shifts: string
  signatories: [string, string, string]
}

interface Role {
  id: number
  department: string
  name: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const INITIAL_DEPTS: Department[] = [
  { id: 1, name: "Property Management", description: "", fixedWeekoff: true,  weekoffDays: 1, weekoffDay1: "Sunday", weekoffDay2: "", shifts: "", signatories: ["Supervisor", "Manager", "Estate Manager"] },
  { id: 2, name: "Security",            description: "", fixedWeekoff: false, weekoffDays: 1, weekoffDay1: "", weekoffDay2: "", shifts: "", signatories: ["", "", ""] },
  { id: 3, name: "STP",                 description: "", fixedWeekoff: false, weekoffDays: 1, weekoffDay1: "", weekoffDay2: "", shifts: "", signatories: ["", "", ""] },
  { id: 4, name: "Technical",           description: "", fixedWeekoff: false, weekoffDays: 1, weekoffDay1: "", weekoffDay2: "", shifts: "", signatories: ["", "", ""] },
  { id: 5, name: "Housekeeping",        description: "", fixedWeekoff: false, weekoffDays: 1, weekoffDay1: "", weekoffDay2: "", shifts: "", signatories: ["", "", ""] },
  { id: 6, name: "Waste Management",    description: "", fixedWeekoff: true,  weekoffDays: 1, weekoffDay1: "Sunday", weekoffDay2: "", shifts: "", signatories: ["", "", ""] },
  { id: 7, name: "Horticulture",        description: "", fixedWeekoff: true,  weekoffDays: 1, weekoffDay1: "Sunday", weekoffDay2: "", shifts: "", signatories: ["", "", ""] },
  { id: 8, name: "Parking Management",  description: "Car Parking",              fixedWeekoff: false, weekoffDays: 1, weekoffDay1: "", weekoffDay2: "", shifts: "", signatories: ["", "", ""] },
  { id: 9, name: "Valetez",             description: "Valet Parking Management", fixedWeekoff: false, weekoffDays: 1, weekoffDay1: "", weekoffDay2: "", shifts: "", signatories: ["", "", ""] },
]

const INITIAL_ROLES: Role[] = [
  { id: 1,  department: "Horticulture",        name: "Gardener" },
  { id: 2,  department: "Horticulture",        name: "Garden Supervisor" },
  { id: 3,  department: "Security",            name: "VMS Operator" },
  { id: 4,  department: "Property Management", name: "Security Officer" },
  { id: 5,  department: "Technical",           name: "Building Maintenance Technician - Painter" },
  { id: 6,  department: "Technical",           name: "Sr. MEP Supervisor" },
  { id: 7,  department: "Technical",           name: "MEP Supervisor" },
  { id: 8,  department: "Technical",           name: "Multi Skill Technician" },
  { id: 9,  department: "Technical",           name: "Sr. Multi Skill Technician" },
  { id: 10, department: "Technical",           name: "Sr. Handyman" },
  { id: 11, department: "Technical",           name: "Handyman" },
  { id: 12, department: "Technical",           name: "Sr. HVAC Operator" },
  { id: 13, department: "Technical",           name: "HVAC Operator" },
  { id: 14, department: "Housekeeping",        name: "Sr. HK Janitor" },
  { id: 15, department: "Housekeeping",        name: "Janitor" },
  { id: 16, department: "Waste Management",    name: "Field Staff" },
  { id: 17, department: "Waste Management",    name: "Supervisor" },
]

function blankDept(): Omit<Department, "id"> {
  return { name: "", description: "", fixedWeekoff: false, weekoffDays: 1, weekoffDay1: "", weekoffDay2: "", shifts: "", signatories: ["", "", ""] }
}

// ─── Department Modal ─────────────────────────────────────────────────────────

function DepartmentModal({
  mode, initial, open, onClose, onSave,
}: {
  mode: "add" | "edit"
  initial: Omit<Department, "id">
  open: boolean
  onClose: () => void
  onSave: (d: Omit<Department, "id">) => void
}) {
  const router = useRouter()
  const [form, setForm] = useState<Omit<Department, "id">>(initial)

  React.useEffect(() => { setForm(initial) }, [open])

  function set<K extends keyof Omit<Department, "id">>(key: K, val: Omit<Department, "id">[K]) {
    setForm(prev => ({ ...prev, [key]: val }))
  }

  function setSignatory(i: number, val: string) {
    setForm(prev => {
      const s = [...prev.signatories] as [string, string, string]
      s[i] = val
      return { ...prev, signatories: s }
    })
  }

  function handleSave() {
    if (!form.name.trim()) return
    onSave(form)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={v => { if (!v) onClose() }}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-base">
            {mode === "add" ? "Add Department" : "Edit Department"}
          </DialogTitle>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[var(--alias-color-text-subtle)] hover:bg-[var(--alias-color-background-secondary)] transition-colors"
          >
            <X className="size-4" />
          </button>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-1">

          {/* Department Name */}
          <div>
            <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1.5">
              Department Name <span className="text-[var(--alias-color-feedback-error-fg)]">*</span>
            </label>
            <Input
              value={form.name}
              onChange={e => set("name", e.target.value)}
              placeholder="e.g. Engineering"
              className="h-9 text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1.5">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={e => set("description", e.target.value)}
              rows={3}
              className="w-full rounded-md border border-[var(--alias-color-border-default)] bg-white px-3 py-2 text-sm text-[var(--alias-color-text-primary)] placeholder:text-[var(--alias-color-text-subtle)] resize-none focus:outline-none focus:ring-1 focus:ring-[var(--alias-color-border-active)]"
              placeholder="Optional description"
            />
          </div>

          {/* Fixed Weekoff */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.fixedWeekoff}
                onChange={e => set("fixedWeekoff", e.target.checked)}
                className="size-4 rounded accent-[var(--alias-color-text-brand)]"
              />
              <span className="text-sm text-[var(--alias-color-text-primary)]">Fixed Weekoff</span>
            </label>

            {form.fixedWeekoff && (
              <div className="mt-3 flex flex-col gap-3 pl-1">
                <div>
                  <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1.5">
                    Number of Weekoff Days
                  </label>
                  <Select
                    value={String(form.weekoffDays)}
                    onValueChange={v => set("weekoffDays", Number(v))}
                  >
                    <SelectTrigger className="h-9 text-sm w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Day</SelectItem>
                      <SelectItem value="2">2 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1.5">
                    Weekoff Day 1
                  </label>
                  <Select value={form.weekoffDay1} onValueChange={v => set("weekoffDay1", v)}>
                    <SelectTrigger className="h-9 text-sm w-full">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {DAYS_OF_WEEK.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                {form.weekoffDays === 2 && (
                  <div>
                    <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1.5">
                      Weekoff Day 2
                    </label>
                    <Select value={form.weekoffDay2} onValueChange={v => set("weekoffDay2", v)}>
                      <SelectTrigger className="h-9 text-sm w-full">
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        {DAYS_OF_WEEK.filter(d => d !== form.weekoffDay1).map(d =>
                          <SelectItem key={d} value={d}>{d}</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Shifts */}
          <div>
            <p className="text-xs font-semibold text-[var(--alias-color-text-primary)] mb-1">
              Shifts <span className="text-[var(--alias-color-feedback-error-fg)]">*</span>
            </p>
            <p className="text-xs text-[var(--alias-color-text-secondary)]">
              No shifts available.{" "}
              <button
                onClick={() => { onClose(); router.push("/dashboard/shifts") }}
                className="text-[var(--alias-color-text-brand)] hover:underline inline-flex items-center gap-0.5"
              >
                Add one
                <ExternalLink className="size-2.5" />
              </button>
            </p>
          </div>

          {/* Vendor Report Signatories */}
          <div>
            <p className="text-xs font-semibold text-[var(--alias-color-text-primary)] mb-2">
              Vendor Report Signatories
            </p>
            <div className="flex flex-col gap-2 border border-[var(--alias-color-border-subtle)] rounded-lg p-3 bg-[var(--alias-color-background-secondary)]">
              {([0, 1, 2] as const).map(i => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs text-[var(--alias-color-text-subtle)] w-4 text-right shrink-0">{i + 1}.</span>
                  <Input
                    value={form.signatories[i]}
                    onChange={e => setSignatory(i, e.target.value)}
                    placeholder={["e.g. Supervisor", "e.g. Manager", "e.g. Estate Manager"][i]}
                    className="h-8 text-xs flex-1"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-2 pt-1">
            <Button className="flex-1" onClick={handleSave} disabled={!form.name.trim()}>
              {mode === "add" ? "Add" : "Update"}
            </Button>
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}

// ─── Role Modal ───────────────────────────────────────────────────────────────

function RoleModal({
  mode, initial, open, onClose, onSave, departments,
}: {
  mode: "add" | "edit"
  initial: Omit<Role, "id">
  open: boolean
  onClose: () => void
  onSave: (r: Omit<Role, "id">) => void
  departments: string[]
}) {
  const [form, setForm] = useState(initial)

  React.useEffect(() => { setForm(initial) }, [open])

  function handleSave() {
    if (!form.department || !form.name.trim()) return
    onSave(form)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={v => { if (!v) onClose() }}>
      <DialogContent className="sm:max-w-sm" showCloseButton={false}>
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-base">
            {mode === "add" ? "Add Role" : "Edit Role"}
          </DialogTitle>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[var(--alias-color-text-subtle)] hover:bg-[var(--alias-color-background-secondary)] transition-colors"
          >
            <X className="size-4" />
          </button>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-1">
          <div>
            <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1.5">
              Department <span className="text-[var(--alias-color-feedback-error-fg)]">*</span>
            </label>
            <Select value={form.department} onValueChange={v => setForm(p => ({ ...p, department: v }))}>
              <SelectTrigger className="h-9 text-sm w-full">
                <SelectValue placeholder="— Select —" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1.5">
              Role Name <span className="text-[var(--alias-color-feedback-error-fg)]">*</span>
            </label>
            <Input
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              placeholder="e.g. HVAC Operator"
              className="h-9 text-sm"
            />
          </div>

          <div className="flex gap-2 pt-1">
            <Button className="flex-1" onClick={handleSave} disabled={!form.department || !form.name.trim()}>
              {mode === "add" ? "Add" : "Update"}
            </Button>
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DepartmentsPage() {
  const [tab, setTab] = useState<"departments" | "roles">("departments")

  // ── Departments ──
  const [departments, setDepartments] = useState<Department[]>(INITIAL_DEPTS)
  const [deptSearch, setDeptSearch]   = useState("")
  const [deptModal, setDeptModal]     = useState<{
    open: boolean; mode: "add" | "edit"; data: Omit<Department, "id">; editId?: number
  }>({ open: false, mode: "add", data: blankDept() })

  function openAddDept() { setDeptModal({ open: true, mode: "add", data: blankDept() }) }
  function openEditDept(d: Department) {
    const { id, ...rest } = d
    setDeptModal({ open: true, mode: "edit", data: rest, editId: id })
  }
  function closeDeptModal() { setDeptModal(p => ({ ...p, open: false })) }
  function saveDept(d: Omit<Department, "id">) {
    if (deptModal.mode === "add") {
      setDepartments(prev => [...prev, { id: Date.now(), ...d }])
    } else {
      setDepartments(prev => prev.map(x => x.id === deptModal.editId ? { id: x.id, ...d } : x))
    }
  }

  const filteredDepts = departments.filter(d =>
    d.name.toLowerCase().includes(deptSearch.toLowerCase()) ||
    d.description.toLowerCase().includes(deptSearch.toLowerCase())
  )

  function weekoffLabel(d: Department) {
    if (!d.fixedWeekoff) return ""
    return [d.weekoffDay1, d.weekoffDay2].filter(Boolean).join(", ") || "Yes"
  }

  // ── Roles ──
  const [roles, setRoles]           = useState<Role[]>(INITIAL_ROLES)
  const [roleSearch, setRoleSearch] = useState("")
  const [roleModal, setRoleModal]   = useState<{
    open: boolean; mode: "add" | "edit"; data: Omit<Role, "id">; editId?: number
  }>({ open: false, mode: "add", data: { department: "", name: "" } })

  function openAddRole() { setRoleModal({ open: true, mode: "add", data: { department: "", name: "" } }) }
  function openEditRole(r: Role) {
    const { id, ...rest } = r
    setRoleModal({ open: true, mode: "edit", data: rest, editId: id })
  }
  function closeRoleModal() { setRoleModal(p => ({ ...p, open: false })) }
  function saveRole(r: Omit<Role, "id">) {
    if (roleModal.mode === "add") {
      setRoles(prev => [...prev, { id: Date.now(), ...r }])
    } else {
      setRoles(prev => prev.map(x => x.id === roleModal.editId ? { id: x.id, ...r } : x))
    }
  }

  const filteredRoles = roles.filter(r =>
    r.name.toLowerCase().includes(roleSearch.toLowerCase()) ||
    r.department.toLowerCase().includes(roleSearch.toLowerCase())
  )

  const deptNames = departments.map(d => d.name)

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6">

        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-[var(--alias-color-text-primary)]">Departments &amp; Roles</h1>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[var(--alias-color-border-subtle)] mb-4">
          {(["departments", "roles"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                tab === t
                  ? "border-[var(--alias-color-border-active)] text-[var(--alias-color-text-brand)]"
                  : "border-transparent text-[var(--alias-color-text-secondary)] hover:text-[var(--alias-color-text-primary)]"
              }`}
            >
              {t === "departments" ? "Departments" : "Roles"}
            </button>
          ))}
        </div>

        {/* ── Departments tab ── */}
        {tab === "departments" && (
          <>
            <div className="flex items-center gap-3 mb-3">
              <Input placeholder="Search..." value={deptSearch} onChange={e => setDeptSearch(e.target.value)} className="h-9 text-sm w-72" />
              <Button size="sm" className="gap-1.5 ml-auto" onClick={openAddDept}>
                <Plus className="size-3.5" />
                Add Department
              </Button>
            </div>
            <div className="border border-[var(--alias-color-border-default)] rounded-xl bg-white overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--alias-color-background-secondary)] border-b border-[var(--alias-color-border-subtle)]">
                    {[
                      { label: "Name",          width: "w-1/4" },
                      { label: "Description",   width: "w-1/3" },
                      { label: "Fixed Weekoff", width: "w-32"  },
                      { label: "Shifts",        width: "w-24"  },
                    ].map(col => (
                      <th key={col.label} className={`px-4 py-3 text-left text-xs font-semibold text-[var(--alias-color-text-secondary)] ${col.width}`}>
                        <button className="flex items-center gap-1 hover:text-[var(--alias-color-text-primary)] transition-colors">
                          {col.label} <ChevronsUpDown className="size-3 text-[var(--alias-color-text-subtle)]" />
                        </button>
                      </th>
                    ))}
                    <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--alias-color-text-secondary)]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDepts.map((dept, i) => (
                    <tr
                      key={dept.id}
                      className={`hover:bg-[var(--alias-color-background-secondary)] transition-colors ${i < filteredDepts.length - 1 ? "border-b border-[var(--alias-color-border-subtle)]" : ""}`}
                    >
                      <td className="px-4 py-3 font-medium text-[var(--alias-color-text-primary)]">{dept.name}</td>
                      <td className="px-4 py-3 text-[var(--alias-color-text-secondary)]">{dept.description}</td>
                      <td className="px-4 py-3 text-[var(--alias-color-text-secondary)]">{weekoffLabel(dept)}</td>
                      <td className="px-4 py-3 text-[var(--alias-color-text-subtle)]">—</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openEditDept(dept)} className="p-1.5 rounded-md bg-[var(--base-color-blue-100)] text-[var(--base-color-blue-800)] hover:bg-[var(--base-color-blue-200)] transition-colors">
                            <Pencil className="size-3.5" />
                          </button>
                          <button onClick={() => setDepartments(prev => prev.filter(d => d.id !== dept.id))} className="p-1.5 rounded-md bg-[var(--alias-color-feedback-error-bg)] text-[var(--alias-color-feedback-error-fg)] hover:bg-[var(--semantic-color-error-200)] transition-colors">
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── Roles tab ── */}
        {tab === "roles" && (
          <>
            <div className="flex items-center gap-3 mb-3">
              <Input placeholder="Search..." value={roleSearch} onChange={e => setRoleSearch(e.target.value)} className="h-9 text-sm w-72" />
              <Button size="sm" className="gap-1.5 ml-auto" onClick={openAddRole}>
                <Plus className="size-3.5" />
                Add Role
              </Button>
            </div>
            <div className="border border-[var(--alias-color-border-default)] rounded-xl bg-white overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--alias-color-background-secondary)] border-b border-[var(--alias-color-border-subtle)]">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--alias-color-text-secondary)] w-1/3">
                      <button className="flex items-center gap-1 hover:text-[var(--alias-color-text-primary)] transition-colors">
                        Department <ChevronsUpDown className="size-3 text-[var(--alias-color-text-subtle)]" />
                      </button>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--alias-color-text-secondary)]">
                      <button className="flex items-center gap-1 hover:text-[var(--alias-color-text-primary)] transition-colors">
                        Role <ChevronsUpDown className="size-3 text-[var(--alias-color-text-subtle)]" />
                      </button>
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--alias-color-text-secondary)] w-28">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRoles.map((role, i) => (
                    <tr
                      key={role.id}
                      className={`hover:bg-[var(--alias-color-background-secondary)] transition-colors ${i < filteredRoles.length - 1 ? "border-b border-[var(--alias-color-border-subtle)]" : ""}`}
                    >
                      <td className="px-4 py-3 text-[var(--alias-color-text-secondary)]">{role.department}</td>
                      <td className="px-4 py-3 font-medium text-[var(--alias-color-text-primary)]">{role.name}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openEditRole(role)} className="p-1.5 rounded-md bg-[var(--base-color-blue-100)] text-[var(--base-color-blue-800)] hover:bg-[var(--base-color-blue-200)] transition-colors">
                            <Pencil className="size-3.5" />
                          </button>
                          <button onClick={() => setRoles(prev => prev.filter(r => r.id !== role.id))} className="p-1.5 rounded-md bg-[var(--alias-color-feedback-error-bg)] text-[var(--alias-color-feedback-error-fg)] hover:bg-[var(--semantic-color-error-200)] transition-colors">
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

      </div>

      {/* Modals */}
      <DepartmentModal
        mode={deptModal.mode}
        initial={deptModal.data}
        open={deptModal.open}
        onClose={closeDeptModal}
        onSave={saveDept}
      />
      <RoleModal
        mode={roleModal.mode}
        initial={roleModal.data}
        open={roleModal.open}
        onClose={closeRoleModal}
        onSave={saveRole}
        departments={deptNames}
      />
    </div>
  )
}
