"use client"

import React, { useState } from "react"
import {
  Shield, Building2, Zap, Wrench, Wind, Recycle, Leaf, Car, Store,
  FileSpreadsheet, FileText, ClipboardList, Search, ChevronsUpDown,
  X, ChevronLeft, ChevronRight, AlertTriangle,
} from "lucide-react"
import { Button }   from "@/components/ui/button"
import { Input }    from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge }    from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

// ─── Types & data ─────────────────────────────────────────────────────────────

type Status = "Present" | "Absent" | "Late" | "On Leave" | "Half-day"
type Shift  = "Morning" | "Afternoon" | "Night"


interface Employee {
  id: string; name: string; empId: string; dept: string
  shift: Shift; status: Status
  checkIn: string; checkOut: string; hours: string
  subLocation: string   // e.g. "Sector 2 / Tower 3"
}

const DEPARTMENTS = [
  { name: "Security",      icon: Shield,    count: 142 },
  { name: "Property Mgmt", icon: Building2, count: 284 },
  { name: "STP",           icon: Zap,       count: 98  },
  { name: "Technical",     icon: Wrench,    count: 210 },
  { name: "Housekeeping",  icon: Wind,      count: 312 },
  { name: "Waste Mgmt",    icon: Recycle,   count: 87  },
  { name: "Horticulture",  icon: Leaf,      count: 64  },
  { name: "Parking Mgmt",  icon: Car,       count: 22  },
  { name: "Vendors",       icon: Store,     count: 18  },
]

const EMPLOYEES: Record<string, Employee[]> = {
  "Security": [
    { id:"1", name:"Amit Sharma",    empId:"EMP-00128", dept:"Security Dept", shift:"Morning",   status:"Present",  checkIn:"07:58 AM", checkOut:"04:12 PM", hours:"8h 14m", subLocation:"Sector 1 / Tower A" },
    { id:"2", name:"Priya Nair",     empId:"EMP-00128", dept:"Security Dept", shift:"Morning",   status:"Absent",   checkIn:"–",        checkOut:"–",        hours:"–",      subLocation:"Sector 1 / Tower B" },
    { id:"3", name:"Rajesh Verma",   empId:"EMP-00089", dept:"Security Dept", shift:"Afternoon", status:"Late",     checkIn:"09:34 AM", checkOut:"06:02 PM", hours:"8h 28m", subLocation:"Sector 2 / Tower 3" },
    { id:"4", name:"Meena Krishnan", empId:"EMP-00334", dept:"Security Dept", shift:"Morning",   status:"On Leave", checkIn:"–",        checkOut:"–",        hours:"–",      subLocation:"Sector 2 / Tower 4" },
    { id:"5", name:"Sunil Patil",    empId:"EMP-00447", dept:"Security Dept", shift:"Night",     status:"Half-day", checkIn:"08:02 AM", checkOut:"12:00 PM", hours:"3h 58m", subLocation:"Sector 2 / Tower 3" },
    { id:"6", name:"Fatima Sheikh",  empId:"EMP-00512", dept:"Security Dept", shift:"Morning",   status:"Present",  checkIn:"08:01 AM", checkOut:"04:15 PM", hours:"8h 14m", subLocation:"Sector 1 / Tower A" },
    { id:"7", name:"Kiran Reddy",    empId:"EMP-00198", dept:"Security Dept", shift:"Night",     status:"Absent",   checkIn:"–",        checkOut:"–",        hours:"–",      subLocation:"Clubhouse" },
  ],
  "Property Mgmt": [
    { id:"1", name:"Vincent Kumar",  empId:"EMP-00544", dept:"Property Mgmt", shift:"Morning",   status:"Absent",   checkIn:"–",        checkOut:"–",        hours:"–",      subLocation:"Sector 1 / Tower B" },
    { id:"2", name:"Malathesha L",   empId:"EMP-00554", dept:"Property Mgmt", shift:"Morning",   status:"Absent",   checkIn:"–",        checkOut:"–",        hours:"–",      subLocation:"Sector 2 / Tower 3" },
    { id:"3", name:"Praveen Vc",     empId:"EMP-00458", dept:"Property Mgmt", shift:"Afternoon", status:"Present",  checkIn:"01:00 PM", checkOut:"09:00 PM", hours:"8h 00m", subLocation:"Sector 2 / Tower 4" },
  ],
}

const LAST_7_DAYS = [
  { day: 15, code: "P" },
  { day: 16, code: "P" },
  { day: 17, code: "L" },
  { day: 18, code: "P" },
  { day: 19, code: "W" },
  { day: 20, code: "W" },
  { day: 21, code: "A", today: true },
]

const ACTIVITY_LOG = [
  { time: "Apr 21 · 7:10 AM", text: <>System marked as <strong>Absent</strong> — no check-in by 08:30 AM (shift start + 30 min grace)</> },
  { time: "Apr 21 · 9:02 AM", text: <>Manager Suresh Patil opened record for review</> },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function statusVariant(s: Status): "success"|"error"|"warning"|"secondary" {
  if (s === "Present")  return "success"
  if (s === "Absent")   return "error"
  if (s === "Late" || s === "On Leave" || s === "Half-day") return "warning"
  return "secondary"
}

function dayColor(code: string) {
  if (code === "P") return "bg-[var(--alias-color-feedback-success-fg)] text-white"
  if (code === "L") return "bg-[var(--semantic-color-warning-400)] text-white"
  if (code === "W") return "bg-[var(--alias-color-background-tertiary)] text-[var(--alias-color-text-secondary)] border border-[var(--alias-color-border-default)]"
  if (code === "A") return "bg-[var(--alias-color-feedback-error-fg)] text-white"
  return "bg-[var(--alias-color-background-tertiary)] text-[var(--alias-color-text-subtle)]"
}

function initials(name: string) {
  return name.split(" ").map(p => p[0]).join("").slice(0, 2).toUpperCase()
}


// ─── Edit Drawer ──────────────────────────────────────────────────────────────

function EditDrawer({
  employee, index, total,
  onClose, onPrev, onNext,
}: {
  employee: Employee; index: number; total: number
  onClose: () => void; onPrev: () => void; onNext: () => void
}) {
  const [markAs, setMarkAs]   = useState(employee.status)
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [reason, setReason]   = useState("")

  return (
    <div className="w-[420px] shrink-0 border-l border-[var(--alias-color-border-default)] bg-white flex flex-col h-full overflow-hidden">

      {/* Header */}
      <div className="flex items-start gap-3 px-4 py-3 border-b border-[var(--alias-color-border-subtle)] shrink-0">
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarFallback className="text-sm font-semibold bg-[var(--semantic-color-warning-200)] text-[var(--semantic-color-warning-800)]">
            {initials(employee.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[var(--alias-color-text-primary)]">{employee.name}</p>
          <p className="text-xs text-[var(--alias-color-text-subtle)] mt-0.5">
            {employee.empId} · {employee.dept} · {employee.shift} Shift
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex items-center gap-1 text-xs text-[var(--alias-color-text-subtle)] hover:text-[var(--alias-color-text-primary)] border border-[var(--alias-color-border-default)] rounded-md px-2 py-1 transition-colors shrink-0"
        >
          <X className="size-3" /> Close
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">

        {/* Kiosk info */}
        <div className="border-b border-[var(--alias-color-border-subtle)]">
          {[
            { label: "Kiosk check-in",  value: "No record", error: true },
            { label: "Kiosk check-out", value: "No record", error: true },
            { label: "Total hours",     value: "–",         error: false },
            { label: "Source device",   value: "Kiosk-03 · Pune HQ · Gate B", error: false },
          ].map(row => (
            <div key={row.label} className="flex items-center justify-between px-4 py-2 border-b border-[var(--alias-color-border-subtle)] last:border-0">
              <span className="text-xs text-[var(--alias-color-text-secondary)]">{row.label}</span>
              <span className={`text-xs font-medium ${row.error ? "text-[var(--alias-color-feedback-error-fg)]" : "text-[var(--alias-color-text-primary)]"}`}>
                {row.value}
              </span>
            </div>
          ))}
          <div className="flex items-center justify-between px-4 py-2">
            <span className="text-xs text-[var(--alias-color-text-secondary)]">Proxy check</span>
            <span className="flex items-center gap-1 text-xs font-medium text-[var(--alias-color-feedback-warning-fg)]">
              <AlertTriangle className="size-3" /> Not verified
            </span>
          </div>
        </div>

        {/* Last 7 days */}
        <div className="px-4 py-4 border-b border-[var(--alias-color-border-subtle)]">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--alias-color-text-subtle)] mb-3">Last 7 Days</p>
          <div className="flex items-end gap-3 mb-2">
            {LAST_7_DAYS.map(d => (
              <div key={d.day} className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${dayColor(d.code)} ${d.today ? "ring-2 ring-offset-1 ring-[var(--alias-color-feedback-error-fg)]" : ""}`}>
                  {d.code}
                </div>
                <span className={`text-[10px] tabular-nums ${d.today ? "text-[var(--alias-color-feedback-error-fg)] font-semibold" : "text-[var(--alias-color-text-subtle)]"}`}>
                  {d.day}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[var(--alias-color-text-subtle)] mt-2">
            P = Present &nbsp;·&nbsp; A = Absent &nbsp;·&nbsp; L = Late &nbsp;·&nbsp; W = Week-off
          </p>
        </div>

        {/* Mark As */}
        <div className="px-4 py-4 border-b border-[var(--alias-color-border-subtle)]">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--alias-color-text-subtle)] mb-2">Mark As</p>
          <Select value={markAs} onValueChange={(v) => setMarkAs(v as Status)}>
            <SelectTrigger className="w-full h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Present">Present</SelectItem>
              <SelectItem value="Absent">Absent</SelectItem>
              <SelectItem value="Late">Late</SelectItem>
              <SelectItem value="On Leave">On Leave</SelectItem>
              <SelectItem value="Half-day">Half-day</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Check-in / Check-out */}
        <div className="px-4 py-4 border-b border-[var(--alias-color-border-subtle)]">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--alias-color-text-subtle)] mb-2">Check-In Time</p>
              <Input
                type="time"
                value={checkIn}
                onChange={e => setCheckIn(e.target.value)}
                className="h-9 text-sm"
                placeholder="--:-- --"
              />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--alias-color-text-subtle)] mb-2">Check-Out Time</p>
              <Input
                type="time"
                value={checkOut}
                onChange={e => setCheckOut(e.target.value)}
                className="h-9 text-sm"
                placeholder="--:-- --"
              />
            </div>
          </div>
        </div>

        {/* Reason */}
        <div className="px-4 py-4 border-b border-[var(--alias-color-border-subtle)]">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--alias-color-text-subtle)] mb-2">
            Reason <span className="text-[var(--alias-color-feedback-error-fg)]">*</span>
            <span className="normal-case font-normal ml-1">(required when changing status or time)</span>
          </p>
          <Textarea
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder="e.g. Employee called in sick. Confirmed via WhatsApp at 8:45 AM."
            className="text-sm min-h-[80px] resize-none"
          />
        </div>

        {/* Activity log */}
        <div className="px-4 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--alias-color-text-subtle)] mb-3">Activity Log</p>
          <div className="border border-[var(--alias-color-border-default)] rounded-lg overflow-hidden">
            {ACTIVITY_LOG.map((entry, i) => (
              <div
                key={i}
                className={`flex gap-3 px-3 py-2.5 text-xs ${i < ACTIVITY_LOG.length - 1 ? "border-b border-[var(--alias-color-border-subtle)]" : ""}`}
              >
                <span className="text-[var(--alias-color-text-subtle)] shrink-0 tabular-nums">{entry.time}</span>
                <span className="text-[var(--alias-color-text-secondary)]">{entry.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[var(--alias-color-border-default)] px-4 py-3 flex items-center gap-2 shrink-0 bg-white">
        <Button
          size="sm"
          className="bg-[var(--alias-color-feedback-success-fg)] text-white border-[var(--alias-color-feedback-success-fg)] hover:bg-[var(--semantic-color-success-700)]"
        >
          Save &amp; Approve
        </Button>
        <Button
          size="sm"
          className="bg-[var(--semantic-color-warning-600)] text-white border-[var(--semantic-color-warning-600)] hover:bg-[var(--semantic-color-warning-700)]"
        >
          Save changes
        </Button>
        <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
        <div className="ml-auto flex items-center gap-1">
          <Button variant="outline" size="sm" onClick={onPrev} disabled={index === 0}>
            <ChevronLeft className="size-3.5" /> Prev
          </Button>
          <span className="text-xs text-[var(--alias-color-text-subtle)] px-1 tabular-nums">{index + 1}/{total}</span>
          <Button variant="outline" size="sm" onClick={onNext} disabled={index === total - 1}>
            Next <ChevronRight className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AttendancePage() {
  const [selectedDept, setSelectedDept]   = useState("Security")
  const [search, setSearch]               = useState("")
  const [editIndex, setEditIndex]         = useState<number | null>(null)

  const employees = EMPLOYEES[selectedDept] ?? []
  const dept      = DEPARTMENTS.find(d => d.name === selectedDept)
  const filtered  = employees.filter(e =>
    `${e.name} ${e.empId}`.toLowerCase().includes(search.toLowerCase())
  )

  const present = employees.filter(e => e.status === "Present").length
  const absent  = employees.filter(e => e.status === "Absent").length
  const leave   = employees.filter(e => e.status === "On Leave").length

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* ── Top header bar ── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--alias-color-border-default)] bg-white shrink-0">
        <h1 className="text-base font-semibold text-[var(--alias-color-text-primary)]">Attendance</h1>
        <div className="flex items-center gap-2">
          <Select defaultValue="ecoworld">
            <SelectTrigger className="h-8 w-32 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ecoworld">EcoWorld</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="h-8 w-28 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Shifts</SelectItem>
              <SelectItem value="morning">Morning</SelectItem>
              <SelectItem value="afternoon">Afternoon</SelectItem>
              <SelectItem value="night">Night</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="today">
            <SelectTrigger className="h-8 w-24 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
            </SelectContent>
          </Select>
          <div className="w-px h-5 bg-[var(--alias-color-border-default)]" />
          <Button variant="outline" size="sm" className="gap-1.5">
            <FileSpreadsheet className="size-3.5 text-[var(--alias-color-feedback-success-fg)]" />
            Excel
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <FileText className="size-3.5 text-[var(--alias-color-feedback-error-fg)]" />
            PDF
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <ClipboardList className="size-3.5 text-[var(--alias-color-text-brand)]" />
            Vendor Report
          </Button>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left: Department list */}
        <div className="w-52 shrink-0 border-r border-[var(--alias-color-border-default)] bg-[var(--alias-color-background-secondary)] overflow-y-auto flex flex-col">
          <p className="px-4 pt-4 pb-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--alias-color-text-subtle)]">
            Departments
          </p>
          {DEPARTMENTS.map(d => {
            const Icon   = d.icon
            const active = d.name === selectedDept
            return (
              <button
                key={d.name}
                onClick={() => { setSelectedDept(d.name); setSearch(""); setEditIndex(null) }}
                className={`relative flex items-center gap-2.5 px-4 py-2.5 text-left transition-colors w-full border-l-2
                  ${active
                    ? "bg-white text-[var(--alias-color-text-primary)] font-medium border-[var(--alias-color-border-active)]"
                    : "text-[var(--alias-color-text-secondary)] hover:bg-[var(--alias-color-background-tertiary)] border-transparent"
                  }`}
              >
                <Icon className="size-4 shrink-0 text-[var(--alias-color-text-subtle)]" />
                <span className="flex-1 text-sm truncate">{d.name}</span>
                <span className="text-xs text-[var(--alias-color-text-subtle)] tabular-nums">{d.count}</span>
              </button>
            )
          })}
        </div>

        {/* Right: Employee table + drawer */}
        <div className="flex-1 overflow-hidden flex">

          {/* Table area */}
          <div className="flex-1 overflow-hidden flex flex-col">

            {/* Stat tiles */}
            <div className="grid grid-cols-4 gap-px bg-[var(--alias-color-border-subtle)] border-b border-[var(--alias-color-border-subtle)] shrink-0">
              <div className="bg-white px-6 py-3 text-center">
                <p className="text-[10px] text-[var(--alias-color-text-subtle)] mb-0.5">Total</p>
                <p className="text-xl font-bold text-[var(--alias-color-text-primary)]">{dept?.count ?? employees.length}</p>
              </div>
              <div className="bg-[var(--alias-color-feedback-success-bg)] px-6 py-3 text-center">
                <p className="text-[10px] text-[var(--alias-color-feedback-success-fg)] mb-0.5">Present</p>
                <p className="text-xl font-bold text-[var(--alias-color-feedback-success-fg)]">{present}</p>
              </div>
              <div className="bg-[var(--alias-color-feedback-error-bg)] px-6 py-3 text-center">
                <p className="text-[10px] text-[var(--alias-color-feedback-error-fg)] mb-0.5">Absent</p>
                <p className="text-xl font-bold text-[var(--alias-color-feedback-error-fg)]">{absent}</p>
              </div>
              <div className="bg-[var(--alias-color-feedback-warning-bg)] px-6 py-3 text-center">
                <p className="text-[10px] text-[var(--alias-color-feedback-warning-fg)] mb-0.5">Leave</p>
                <p className="text-xl font-bold text-[var(--alias-color-feedback-warning-fg)]">{leave}</p>
              </div>
            </div>

            {/* Table toolbar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--alias-color-border-subtle)] bg-white shrink-0">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-semibold text-[var(--alias-color-text-primary)]">{selectedDept} Department</h2>
                <span className="text-xs text-[var(--alias-color-text-subtle)]">{dept?.count} employees</span>
              </div>
              <div className="relative w-52">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[var(--alias-color-text-subtle)]" />
                <Input
                  placeholder="Search employee..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-8 h-8 text-xs"
                />
              </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-[var(--alias-color-background-secondary)] border-b border-[var(--alias-color-border-subtle)]">
                    {["Name & ID","Sub Location","Shift","Status","Check-In","Check-Out","Hours","Action"].map((col, i) => (
                      <th key={col} className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-[var(--alias-color-text-subtle)]">
                        {i < 7 ? (
                          <button className="flex items-center gap-1 hover:text-[var(--alias-color-text-primary)] transition-colors">
                            {col} <ChevronsUpDown className="size-3" />
                          </button>
                        ) : col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((emp, i) => (
                    <tr
                      key={emp.id}
                      className={`transition-colors border-b border-[var(--alias-color-border-subtle)] last:border-0
                        ${editIndex === i
                          ? "bg-[var(--alias-color-background-secondary)]"
                          : "hover:bg-[var(--alias-color-background-secondary)]"}`}
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium text-[var(--alias-color-text-primary)]">{emp.name}</p>
                        <p className="text-xs text-[var(--alias-color-text-subtle)]">{emp.empId}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-xs text-[var(--alias-color-text-secondary)]">
                          {emp.subLocation.split(" / ").map((part, i, arr) => (
                            <span key={i}>
                              {part}
                              {i < arr.length - 1 && (
                                <span className="mx-1 text-[var(--alias-color-text-subtle)]">/</span>
                              )}
                            </span>
                          ))}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" size="sm">{emp.shift}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={statusVariant(emp.status)} size="sm">{emp.status}</Badge>
                      </td>
                      <td className="px-4 py-3 text-[var(--alias-color-text-secondary)] tabular-nums">{emp.checkIn}</td>
                      <td className="px-4 py-3 text-[var(--alias-color-text-secondary)] tabular-nums">{emp.checkOut}</td>
                      <td className="px-4 py-3 text-[var(--alias-color-text-secondary)] tabular-nums">{emp.hours}</td>
                      <td className="px-4 py-3">
                        <Button
                          variant="outline" size="sm"
                          onClick={() => setEditIndex(editIndex === i ? null : i)}
                        >
                          {editIndex === i ? "Close" : "Edit"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Edit drawer — slides in from right */}
          {editIndex !== null && filtered[editIndex] && (
            <EditDrawer
              employee={filtered[editIndex]}
              index={editIndex}
              total={filtered.length}
              onClose={() => setEditIndex(null)}
              onPrev={() => setEditIndex(i => Math.max(0, (i ?? 1) - 1))}
              onNext={() => setEditIndex(i => Math.min(filtered.length - 1, (i ?? 0) + 1))}
            />
          )}
        </div>
      </div>
    </div>
  )
}
