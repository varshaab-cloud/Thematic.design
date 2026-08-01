"use client"

import React, { useState } from "react"
import { Pencil, Trash2, ChevronsUpDown, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Employee {
  id: number
  empId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  gender: string
  department: string
  designation: string
  branch: string
  shift: string
  doj: string
  active: boolean
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DEPARTMENTS = [
  "Property Management", "Security", "STP", "Technical",
  "Housekeeping", "Waste Management", "Horticulture",
  "Parking Management", "Valetez",
]

const DESIGNATIONS = [
  "Sr.HK Janitor", "Janitor", "Gardener", "Garden Supervisor",
  "Field Staff", "Supervisor", "Security Guard", "Technician",
]

const BRANCHES = ["EcoWorld", "Building 6&7", "Bellandur", "Gate B"]

const SHIFTS = ["General", "Morning", "Evening", "Night"]

const INITIAL: Employee[] = [
  { id: 1,  empId: "43911", firstName: "Nandu",        lastName: "",        email: "", phone: "", gender: "Male",   department: "Housekeeping",     designation: "Sr.HK Janitor",    branch: "EcoWorld",    shift: "General", doj: "2022-01-10", active: true },
  { id: 2,  empId: "43912", firstName: "Babanna",      lastName: "",        email: "", phone: "", gender: "Male",   department: "Housekeeping",     designation: "Janitor",          branch: "EcoWorld",    shift: "General", doj: "2022-03-15", active: true },
  { id: 3,  empId: "43913", firstName: "Bharamappa",   lastName: "",        email: "", phone: "", gender: "Male",   department: "Housekeeping",     designation: "Janitor",          branch: "EcoWorld",    shift: "Morning", doj: "2021-11-01", active: true },
  { id: 4,  empId: "43914", firstName: "Tabita",       lastName: "Nag",     email: "", phone: "", gender: "Female", department: "Housekeeping",     designation: "Sr.HK Janitor",    branch: "EcoWorld",    shift: "General", doj: "2023-02-20", active: true },
  { id: 5,  empId: "43915", firstName: "Hanumantha",   lastName: "",        email: "", phone: "", gender: "Male",   department: "Horticulture",     designation: "Gardener",         branch: "EcoWorld",    shift: "General", doj: "2020-06-05", active: true },
  { id: 6,  empId: "43916", firstName: "Puttaraj",     lastName: "",        email: "", phone: "", gender: "Male",   department: "Horticulture",     designation: "Garden Supervisor",branch: "EcoWorld",    shift: "General", doj: "2019-09-12", active: true },
  { id: 7,  empId: "43917", firstName: "Sushila",      lastName: "",        email: "", phone: "", gender: "Female", department: "Horticulture",     designation: "Gardener",         branch: "EcoWorld",    shift: "Morning", doj: "2021-04-18", active: true },
  { id: 8,  empId: "43918", firstName: "Mallikarjun",  lastName: "",        email: "", phone: "", gender: "Male",   department: "Waste Management", designation: "Field Staff",      branch: "EcoWorld",    shift: "General", doj: "2022-07-30", active: true },
  { id: 9,  empId: "43919", firstName: "Maneendra",    lastName: "",        email: "", phone: "", gender: "Male",   department: "Waste Management", designation: "Supervisor",       branch: "EcoWorld",    shift: "General", doj: "2020-11-22", active: true },
]

// ─── Add Employee Modal ───────────────────────────────────────────────────────

function AddEmployeeModal({ onSave }: { onSave: (e: Omit<Employee, "id">) => void }) {
  const [open, setOpen] = useState(false)

  const blank = {
    empId: "", firstName: "", lastName: "", email: "", phone: "",
    gender: "", department: "", designation: "", branch: "", shift: "",
    doj: "", active: true,
  }
  const [form, setForm] = useState(blank)

  function reset() { setForm(blank) }

  function handleOpenChange(val: boolean) {
    setOpen(val)
    if (!val) reset()
  }

  function set<K extends keyof typeof blank>(key: K, value: typeof blank[K]) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  function handleSave() {
    if (!form.empId || !form.firstName || !form.department) return
    onSave(form)
    handleOpenChange(false)
  }

  const canSave = form.empId.trim() && form.firstName.trim() && form.department

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <Plus className="size-3.5" />
          Add Employee
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg" showCloseButton={false}>
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-base">Add Employee</DialogTitle>
          <button
            onClick={() => handleOpenChange(false)}
            className="p-1 rounded-md text-[var(--alias-color-text-subtle)] hover:text-[var(--alias-color-text-primary)] hover:bg-[var(--alias-color-background-secondary)] transition-colors"
          >
            <X className="size-4" />
          </button>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-1">

          {/* Row: Employee ID */}
          <div>
            <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1">
              Employee ID <span className="text-[var(--alias-color-feedback-error-fg)]">*</span>
            </label>
            <Input
              value={form.empId}
              onChange={e => set("empId", e.target.value)}
              placeholder="e.g. 43911"
              className="h-9 text-sm"
            />
          </div>

          {/* Row: First + Last Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1">
                First Name <span className="text-[var(--alias-color-feedback-error-fg)]">*</span>
              </label>
              <Input
                value={form.firstName}
                onChange={e => set("firstName", e.target.value)}
                placeholder="First name"
                className="h-9 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1">
                Last Name
              </label>
              <Input
                value={form.lastName}
                onChange={e => set("lastName", e.target.value)}
                placeholder="Last name"
                className="h-9 text-sm"
              />
            </div>
          </div>

          {/* Row: Email + Phone */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1">Email</label>
              <Input
                type="email"
                value={form.email}
                onChange={e => set("email", e.target.value)}
                placeholder="email@example.com"
                className="h-9 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1">Phone</label>
              <Input
                type="tel"
                value={form.phone}
                onChange={e => set("phone", e.target.value)}
                placeholder="10-digit number"
                className="h-9 text-sm"
              />
            </div>
          </div>

          {/* Row: Gender + Date of Joining */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1">Gender</label>
              <Select value={form.gender} onValueChange={v => set("gender", v)}>
                <SelectTrigger className="h-9 text-sm w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1">Date of Joining</label>
              <Input
                type="date"
                value={form.doj}
                onChange={e => set("doj", e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          </div>

          {/* Row: Department + Designation */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1">
                Department <span className="text-[var(--alias-color-feedback-error-fg)]">*</span>
              </label>
              <Select value={form.department} onValueChange={v => set("department", v)}>
                <SelectTrigger className="h-9 text-sm w-full">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1">Designation</label>
              <Select value={form.designation} onValueChange={v => set("designation", v)}>
                <SelectTrigger className="h-9 text-sm w-full">
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>
                <SelectContent>
                  {DESIGNATIONS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row: Branch + Shift */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1">Branch</label>
              <Select value={form.branch} onValueChange={v => set("branch", v)}>
                <SelectTrigger className="h-9 text-sm w-full">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  {BRANCHES.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1">Shift</label>
              <Select value={form.shift} onValueChange={v => set("shift", v)}>
                <SelectTrigger className="h-9 text-sm w-full">
                  <SelectValue placeholder="Select shift" />
                </SelectTrigger>
                <SelectContent>
                  {SHIFTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active checkbox */}
          <div className="flex items-center gap-2">
            <input
              id="active-check"
              type="checkbox"
              checked={form.active}
              onChange={e => set("active", e.target.checked)}
              className="size-4 rounded border-[var(--alias-color-border-default)] accent-[var(--alias-color-text-brand)]"
            />
            <label htmlFor="active-check" className="text-sm text-[var(--alias-color-text-secondary)] cursor-pointer">
              Active
            </label>
          </div>

          {/* Footer */}
          <div className="flex gap-2 pt-1">
            <Button className="flex-1" onClick={handleSave} disabled={!canSave}>
              Add
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(INITIAL)
  const [search, setSearch]       = useState("")
  const [deptFilter, setDeptFilter] = useState("all")
  const [branchFilter, setBranchFilter] = useState("all")

  const activeCount   = employees.filter(e => e.active).length
  const inactiveCount = employees.filter(e => !e.active).length

  function addEmployee(e: Omit<Employee, "id">) {
    setEmployees(prev => [...prev, { id: Date.now(), ...e }])
  }

  function removeEmployee(id: number) {
    setEmployees(prev => prev.filter(e => e.id !== id))
  }

  const filtered = employees.filter(e => {
    if (!e.active) return false
    if (deptFilter !== "all" && e.department !== deptFilter) return false
    if (branchFilter !== "all" && e.branch !== branchFilter) return false
    const q = search.toLowerCase()
    return (
      e.empId.toLowerCase().includes(q) ||
      `${e.firstName} ${e.lastName}`.toLowerCase().includes(q) ||
      e.department.toLowerCase().includes(q) ||
      e.designation.toLowerCase().includes(q) ||
      e.branch.toLowerCase().includes(q)
    )
  })

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6">

        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-[var(--alias-color-text-primary)]">Employees</h1>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-3 mb-3">
          <Select value={deptFilter} onValueChange={setDeptFilter}>
            <SelectTrigger className="h-9 text-sm w-48">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {DEPARTMENTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>

          <Select value={branchFilter} onValueChange={setBranchFilter}>
            <SelectTrigger className="h-9 text-sm w-44">
              <SelectValue placeholder="All Branches" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              {BRANCHES.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
            </SelectContent>
          </Select>

          <div className="ml-auto flex items-center gap-1.5 text-xs text-[var(--alias-color-text-secondary)]">
            <span className="text-[var(--alias-color-feedback-success-fg)] font-medium">Active: {activeCount}</span>
            <span className="text-[var(--alias-color-text-subtle)]">|</span>
            <span className="text-[var(--alias-color-text-subtle)]">Inactive: {inactiveCount}</span>
          </div>
        </div>

        {/* Search + Add above table */}
        <div className="flex items-center gap-3 mb-3">
          <Input
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-9 text-sm w-72"
          />
          <AddEmployeeModal onSave={addEmployee} />
        </div>

        {/* Table */}
        <div className="border border-[var(--alias-color-border-default)] rounded-xl bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--alias-color-background-secondary)] border-b border-[var(--alias-color-border-subtle)]">
                {[
                  { label: "Employee ID", width: "w-28" },
                  { label: "Name",        width: "w-1/5" },
                  { label: "Department",  width: "w-1/5" },
                  { label: "Designation", width: "w-1/5" },
                  { label: "Branch",      width: "w-28"  },
                  { label: "Shift",       width: "w-24"  },
                ].map(col => (
                  <th key={col.label} className={`px-4 py-3 text-left text-xs font-semibold text-[var(--alias-color-text-secondary)] ${col.width}`}>
                    <button className="flex items-center gap-1 hover:text-[var(--alias-color-text-primary)] transition-colors">
                      {col.label}
                      <ChevronsUpDown className="size-3 text-[var(--alias-color-text-subtle)]" />
                    </button>
                  </th>
                ))}
                <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--alias-color-text-secondary)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp, i) => (
                <tr
                  key={emp.id}
                  className={`hover:bg-[var(--alias-color-background-secondary)] transition-colors ${i < filtered.length - 1 ? "border-b border-[var(--alias-color-border-subtle)]" : ""}`}
                >
                  <td className="px-4 py-3 text-[var(--alias-color-text-secondary)] font-mono text-xs">
                    {emp.empId}
                  </td>
                  <td className="px-4 py-3 font-medium text-[var(--alias-color-text-primary)]">
                    {emp.firstName}{emp.lastName ? ` ${emp.lastName}` : ""}
                  </td>
                  <td className="px-4 py-3 text-[var(--alias-color-text-secondary)]">
                    {emp.department}
                  </td>
                  <td className="px-4 py-3 text-[var(--alias-color-text-secondary)]">
                    {emp.designation}
                  </td>
                  <td className="px-4 py-3 text-[var(--alias-color-text-secondary)]">
                    {emp.branch}
                  </td>
                  <td className="px-4 py-3 text-[var(--alias-color-text-secondary)]">
                    {emp.shift}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 rounded-md bg-[var(--base-color-blue-100)] text-[var(--base-color-blue-800)] hover:bg-[var(--base-color-blue-200)] transition-colors">
                        <Pencil className="size-3.5" />
                      </button>
                      <button
                        onClick={() => removeEmployee(emp.id)}
                        className="p-1.5 rounded-md bg-[var(--alias-color-feedback-error-bg)] text-[var(--alias-color-feedback-error-fg)] hover:bg-[var(--base-color-feedback-error-200)] transition-colors"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-sm text-[var(--alias-color-text-subtle)]">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
