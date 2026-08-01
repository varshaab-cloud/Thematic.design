"use client"

import React, { useState, useRef, useEffect } from "react"
import { Pencil, Trash2, ChevronsUpDown, Plus, X, Check, FileSpreadsheet, FileText, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Leave {
  id: number
  empId: string
  empName: string
  type: string
  from: string
  to: string
  reason: string
  status: "Pending" | "Approved" | "Rejected"
}

interface AttChange {
  id: number
  empId: string
  empName: string
  date: string
  type: string
  checkIn: string
  checkOut: string
  reason: string
  requestedBy: string
  status: "Pending" | "Approved" | "Rejected"
}

interface Holiday {
  id: number
  name: string
  date: string
  type: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const EMPLOYEES = [
  { id: "544897", name: "Vincent" },
  { id: "55558",  name: "Hiren Malo" },
  { id: "458236", name: "Praveen Vc" },
  { id: "43911",  name: "Nandu" },
  { id: "43912",  name: "Babanna" },
  { id: "43913",  name: "Bharamappa" },
  { id: "43914",  name: "Tabita Nag" },
  { id: "43915",  name: "Hanumantha" },
  { id: "43916",  name: "Puttaraj" },
  { id: "43917",  name: "Sushila" },
  { id: "43918",  name: "Mallikarjun" },
  { id: "43919",  name: "Maneendra" },
]

const LEAVE_TYPES  = ["Casual", "Sick", "Comp Off", "Annual", "Other"]
const LEAVE_STATUS = ["Pending", "Approved", "Rejected"]

const GOVT_HOLIDAYS_2026: Holiday[] = [
  { id: 1,  name: "New Year's Day",       date: "2026-01-01", type: "Public Holiday" },
  { id: 2,  name: "Makar Sankranti",      date: "2026-01-14", type: "Public Holiday" },
  { id: 3,  name: "Republic Day",         date: "2026-01-26", type: "National Holiday" },
  { id: 4,  name: "Maha Shivratri",       date: "2026-02-26", type: "Public Holiday" },
  { id: 5,  name: "Holi",                 date: "2026-03-14", type: "Public Holiday" },
  { id: 6,  name: "Gudi Padwa",           date: "2026-03-30", type: "Public Holiday" },
  { id: 7,  name: "Eid ul-Fitr",          date: "2026-03-31", type: "Public Holiday" },
  { id: 8,  name: "Ram Navami",           date: "2026-04-06", type: "Public Holiday" },
  { id: 9,  name: "Ambedkar Jayanti",     date: "2026-04-14", type: "National Holiday" },
  { id: 10, name: "Good Friday",          date: "2026-04-18", type: "Public Holiday" },
  { id: 11, name: "Maharashtra Day",      date: "2026-05-01", type: "Public Holiday" },
  { id: 12, name: "Eid ul-Adha",          date: "2026-06-07", type: "Public Holiday" },
  { id: 13, name: "Independence Day",     date: "2026-08-15", type: "National Holiday" },
  { id: 14, name: "Janmashtami",          date: "2026-08-16", type: "Public Holiday" },
  { id: 15, name: "Ganesh Chaturthi",     date: "2026-08-27", type: "Public Holiday" },
  { id: 16, name: "Gandhi Jayanti",       date: "2026-10-02", type: "National Holiday" },
  { id: 17, name: "Dussehra",             date: "2026-10-20", type: "Public Holiday" },
  { id: 18, name: "Diwali",              date: "2026-11-08", type: "Public Holiday" },
  { id: 19, name: "Guru Nanak Jayanti",   date: "2026-11-24", type: "Public Holiday" },
  { id: 20, name: "Christmas",            date: "2026-12-25", type: "Public Holiday" },
]

// ─── Sample data ──────────────────────────────────────────────────────────────

const INIT_LEAVES: Leave[] = [
  { id: 1, empId: "544897", empName: "Vincent",    type: "Other",   from: "2026-04-06", to: "2026-04-06", reason: "Sick",    status: "Approved" },
  { id: 2, empId: "55558",  empName: "Hiren Malo", type: "Casual",  from: "2026-04-01", to: "2026-04-01", reason: "test",    status: "Pending"  },
  { id: 3, empId: "544897", empName: "Vincent",    type: "Comp Off",from: "2026-04-01", to: "2026-04-01", reason: "",        status: "Approved" },
]

const INIT_ATT_CHANGES: AttChange[] = [
  { id: 1, empId: "458236", empName: "Praveen Vc", date: "2026-04-01", type: "Attendance", checkIn: "10:00", checkOut: "18:00", reason: "Test", requestedBy: "Shwetha Supervisor", status: "Pending" },
]

// ─── Employee Search Input ────────────────────────────────────────────────────

function EmployeeSearch({
  value, onChange,
}: {
  value: string
  onChange: (val: string) => void
}) {
  const [query, setQuery]     = useState(value)
  const [open, setOpen]       = useState(false)
  const ref                   = useRef<HTMLDivElement>(null)

  useEffect(() => { setQuery(value) }, [value])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const suggestions = EMPLOYEES.filter(e =>
    `${e.id} ${e.name}`.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 8)

  function select(e: typeof EMPLOYEES[0]) {
    const label = `${e.id} - ${e.name}`
    setQuery(label)
    onChange(label)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <Input
        value={query}
        onChange={ev => { setQuery(ev.target.value); onChange(ev.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        placeholder="Search employee..."
        className="h-9 text-sm"
      />
      {open && suggestions.length > 0 && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-[var(--alias-color-border-default)] rounded-lg shadow-sm overflow-hidden">
          {suggestions.map(e => (
            <button
              key={e.id}
              onMouseDown={() => select(e)}
              className="w-full text-left px-3 py-2 text-sm text-[var(--alias-color-text-primary)] hover:bg-[var(--alias-color-background-secondary)] transition-colors"
            >
              <span className="font-mono text-xs text-[var(--alias-color-text-subtle)] mr-2">{e.id}</span>
              {e.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Leave Modal ──────────────────────────────────────────────────────────────

function LeaveModal({
  mode, initial, open, onClose, onSave,
}: {
  mode: "add" | "edit"
  initial: Omit<Leave, "id">
  open: boolean
  onClose: () => void
  onSave: (l: Omit<Leave, "id">) => void
}) {
  const blank: Omit<Leave, "id"> = { empId: "", empName: "", type: "Casual", from: "", to: "", reason: "", status: "Pending" }
  const [form, setForm] = useState<Omit<Leave, "id">>(initial)

  useEffect(() => { setForm(initial) }, [open])

  function set<K extends keyof Omit<Leave, "id">>(key: K, val: any) {
    setForm(p => ({ ...p, [key]: val }))
  }

  function handleEmpChange(val: string) {
    const match = EMPLOYEES.find(e => `${e.id} - ${e.name}` === val)
    setForm(p => ({ ...p, empId: match?.id ?? "", empName: match?.name ?? val }))
  }

  function handleSave() {
    if (!form.empName || !form.type || !form.from) return
    onSave(form)
    onClose()
  }

  const empLabel = form.empId ? `${form.empId} - ${form.empName}` : form.empName

  return (
    <Dialog open={open} onOpenChange={v => { if (!v) onClose() }}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-base">{mode === "add" ? "Add Leave" : "Edit Leave"}</DialogTitle>
          <button onClick={onClose} className="p-1 rounded-md text-[var(--alias-color-text-subtle)] hover:bg-[var(--alias-color-background-secondary)] transition-colors">
            <X className="size-4" />
          </button>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-1">
          <div>
            <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1.5">
              Employee <span className="text-[var(--alias-color-feedback-error-fg)]">*</span>
            </label>
            <EmployeeSearch value={empLabel} onChange={handleEmpChange} />
          </div>

          <div>
            <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1.5">Leave Type</label>
            <Select value={form.type} onValueChange={v => set("type", v)}>
              <SelectTrigger className="h-9 text-sm w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                {LEAVE_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1.5">
                Start Date <span className="text-[var(--alias-color-feedback-error-fg)]">*</span>
              </label>
              <Input type="date" value={form.from} onChange={e => set("from", e.target.value)} className="h-9 text-sm" />
            </div>
            <div>
              <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1.5">End Date</label>
              <Input type="date" value={form.to} onChange={e => set("to", e.target.value)} className="h-9 text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1.5">Reason</label>
            <textarea
              value={form.reason}
              onChange={e => set("reason", e.target.value)}
              rows={3}
              className="w-full rounded-md border border-[var(--alias-color-border-default)] bg-white px-3 py-2 text-sm text-[var(--alias-color-text-primary)] placeholder:text-[var(--alias-color-text-subtle)] resize-none focus:outline-none focus:ring-1 focus:ring-[var(--alias-color-border-active)]"
              placeholder="Optional reason"
            />
          </div>

          <div>
            <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1.5">Status</label>
            <Select value={form.status} onValueChange={v => set("status", v as Leave["status"])}>
              <SelectTrigger className="h-9 text-sm w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                {LEAVE_STATUS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-1">
            <Button className="flex-1" onClick={handleSave} disabled={!form.empName || !form.from}>
              {mode === "add" ? "Add" : "Update"}
            </Button>
            <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ─── Holidays Modal ───────────────────────────────────────────────────────────

function HolidaysModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [holidays, setHolidays]   = useState<Holiday[]>(GOVT_HOLIDAYS_2026)
  const [adding, setAdding]       = useState(false)
  const [newName, setNewName]     = useState("")
  const [newDate, setNewDate]     = useState("")
  const [newType, setNewType]     = useState("Public Holiday")

  function addHoliday() {
    if (!newName.trim() || !newDate) return
    setHolidays(prev => [...prev, { id: Date.now(), name: newName.trim(), date: newDate, type: newType }])
    setNewName(""); setNewDate(""); setNewType("Public Holiday"); setAdding(false)
  }

  function fmt(dateStr: string) {
    const d = new Date(dateStr)
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
  }

  const sorted = [...holidays].sort((a, b) => a.date.localeCompare(b.date))

  return (
    <Dialog open={open} onOpenChange={v => { if (!v) { onClose(); setAdding(false) } }}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] flex flex-col" showCloseButton={false}>
        <DialogHeader className="flex flex-row items-center justify-between shrink-0">
          <DialogTitle className="text-base">Holidays 2026</DialogTitle>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="gap-1.5 h-8 text-xs" onClick={() => setAdding(v => !v)}>
              <Plus className="size-3" />
              Add Holiday
            </Button>
            <button onClick={() => { onClose(); setAdding(false) }} className="p-1 rounded-md text-[var(--alias-color-text-subtle)] hover:bg-[var(--alias-color-background-secondary)] transition-colors">
              <X className="size-4" />
            </button>
          </div>
        </DialogHeader>

        {/* Inline add form */}
        {adding && (
          <div className="shrink-0 border border-[var(--alias-color-border-subtle)] rounded-lg p-3 bg-[var(--alias-color-background-secondary)] flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1">Holiday Name</label>
                <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. State Holiday" className="h-8 text-xs" autoFocus />
              </div>
              <div>
                <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1">Date</label>
                <Input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="h-8 text-xs" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1">Type</label>
              <Select value={newType} onValueChange={setNewType}>
                <SelectTrigger className="h-8 text-xs w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Public Holiday">Public Holiday</SelectItem>
                  <SelectItem value="National Holiday">National Holiday</SelectItem>
                  <SelectItem value="Optional Holiday">Optional Holiday</SelectItem>
                  <SelectItem value="Restricted Holiday">Restricted Holiday</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="flex-1 h-8 text-xs" onClick={addHoliday} disabled={!newName.trim() || !newDate}>Add</Button>
              <Button size="sm" variant="outline" className="flex-1 h-8 text-xs" onClick={() => setAdding(false)}>Cancel</Button>
            </div>
          </div>
        )}

        {/* Holiday list */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-[var(--alias-color-background-secondary)]">
              <tr className="border-b border-[var(--alias-color-border-subtle)]">
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-[var(--alias-color-text-secondary)]">Holiday</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-[var(--alias-color-text-secondary)] w-32">Date</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-[var(--alias-color-text-secondary)]">Type</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((h, i) => (
                <tr key={h.id} className={`hover:bg-[var(--alias-color-background-secondary)] ${i < sorted.length - 1 ? "border-b border-[var(--alias-color-border-subtle)]" : ""}`}>
                  <td className="px-4 py-2.5 font-medium text-[var(--alias-color-text-primary)]">{h.name}</td>
                  <td className="px-4 py-2.5 text-[var(--alias-color-text-secondary)] text-xs">{fmt(h.date)}</td>
                  <td className="px-4 py-2.5">
                    <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      h.type === "National Holiday"
                        ? "bg-[var(--alias-color-feedback-error-bg)] text-[var(--alias-color-feedback-error-fg)]"
                        : "bg-[var(--alias-color-background-tertiary)] text-[var(--alias-color-text-secondary)]"
                    }`}>
                      {h.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  if (status === "Approved") return <span className="text-xs font-medium text-[var(--alias-color-feedback-success-fg)]">Approved</span>
  if (status === "Rejected") return <span className="text-xs font-medium text-[var(--alias-color-feedback-error-fg)]">Rejected</span>
  return <span className="text-xs font-medium text-[var(--alias-color-feedback-warning-fg)]">Pending</span>
}

function fmtDate(d: string) {
  if (!d) return ""
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
}

// ─── Leaves Tab ───────────────────────────────────────────────────────────────

function LeavesTab() {
  const [leaves, setLeaves]         = useState<Leave[]>(INIT_LEAVES)
  const [pendingSearch, setPending] = useState("")
  const [allSearch, setAll]         = useState("")
  const [modal, setModal]           = useState<{ open: boolean; mode: "add"|"edit"; data: Omit<Leave,"id">; editId?: number }>({
    open: false, mode: "add",
    data: { empId:"", empName:"", type:"Casual", from:"", to:"", reason:"", status:"Pending" },
  })

  const pending = leaves.filter(l => l.status === "Pending")
  const filteredPending = pending.filter(l =>
    `${l.empId} ${l.empName}`.toLowerCase().includes(pendingSearch.toLowerCase())
  )
  const filteredAll = leaves.filter(l =>
    `${l.empId} ${l.empName}`.toLowerCase().includes(allSearch.toLowerCase())
  )

  function openAdd() {
    setModal({ open:true, mode:"add", data:{ empId:"", empName:"", type:"Casual", from:"", to:"", reason:"", status:"Pending" } })
  }
  function openEdit(l: Leave) {
    const { id, ...rest } = l
    setModal({ open:true, mode:"edit", data:rest, editId:id })
  }
  function closeModal() { setModal(p => ({ ...p, open:false })) }

  function saveLeave(l: Omit<Leave,"id">) {
    if (modal.mode === "add") setLeaves(prev => [...prev, { id:Date.now(), ...l }])
    else setLeaves(prev => prev.map(x => x.id === modal.editId ? { id:x.id, ...l } : x))
  }

  function approve(id: number) { setLeaves(prev => prev.map(l => l.id===id ? {...l, status:"Approved"} : l)) }
  function reject(id: number)  { setLeaves(prev => prev.map(l => l.id===id ? {...l, status:"Rejected"} : l)) }

  return (
    <div className="flex flex-col gap-6">
      {/* Search + Add */}
      <div className="flex items-center gap-3">
        <Button size="sm" className="gap-1.5 ml-auto" onClick={openAdd}>
          <Plus className="size-3.5" />Add Leave
        </Button>
      </div>

      {/* Pending Approvals */}
      <div>
        <h2 className="text-sm font-semibold text-[var(--alias-color-text-brand)] mb-2">
          Pending Approvals ({filteredPending.length})
        </h2>
        <div className="mb-2 w-64">
          <Input placeholder="Search..." value={pendingSearch} onChange={e => setPending(e.target.value)} className="h-9 text-sm" />
        </div>
        <div className="border border-[var(--alias-color-border-default)] rounded-xl bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--alias-color-background-secondary)] border-b border-[var(--alias-color-border-subtle)]">
                {["Employee","Type","From","To","Reason"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[var(--alias-color-text-secondary)]">
                    <button className="flex items-center gap-1 hover:text-[var(--alias-color-text-primary)] transition-colors">
                      {h} <ChevronsUpDown className="size-3 text-[var(--alias-color-text-subtle)]" />
                    </button>
                  </th>
                ))}
                <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--alias-color-text-secondary)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPending.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-6 text-center text-sm text-[var(--alias-color-text-subtle)]">No pending approvals</td></tr>
              ) : filteredPending.map((l, i) => (
                <tr key={l.id} className={`hover:bg-[var(--alias-color-background-secondary)] transition-colors ${i < filteredPending.length-1 ? "border-b border-[var(--alias-color-border-subtle)]" : ""}`}>
                  <td className="px-4 py-3 font-medium text-[var(--alias-color-text-primary)]">{l.empId} — {l.empName}</td>
                  <td className="px-4 py-3 text-[var(--alias-color-text-secondary)]">{l.type}</td>
                  <td className="px-4 py-3 text-[var(--alias-color-text-secondary)]">{fmtDate(l.from)}</td>
                  <td className="px-4 py-3 text-[var(--alias-color-text-secondary)]">{fmtDate(l.to)}</td>
                  <td className="px-4 py-3 text-[var(--alias-color-text-secondary)]">{l.reason}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => approve(l.id)} className="p-1.5 rounded-md bg-[var(--alias-color-feedback-success-bg)] text-[var(--alias-color-feedback-success-fg)] hover:bg-[var(--base-color-feedback-success-200)] transition-colors">
                        <Check className="size-3.5" />
                      </button>
                      <button onClick={() => reject(l.id)} className="p-1.5 rounded-md bg-[var(--alias-color-feedback-error-bg)] text-[var(--alias-color-feedback-error-fg)] hover:bg-[var(--base-color-feedback-error-200)] transition-colors">
                        <X className="size-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* All Leaves */}
      <div>
        <h2 className="text-sm font-semibold text-[var(--alias-color-text-primary)] mb-2">All Leaves</h2>
        <div className="mb-2 w-64">
          <Input placeholder="Search..." value={allSearch} onChange={e => setAll(e.target.value)} className="h-9 text-sm" />
        </div>
        <div className="border border-[var(--alias-color-border-default)] rounded-xl bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--alias-color-background-secondary)] border-b border-[var(--alias-color-border-subtle)]">
                {["Employee","Type","From","To","Status"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[var(--alias-color-text-secondary)]">
                    <button className="flex items-center gap-1 hover:text-[var(--alias-color-text-primary)] transition-colors">
                      {h} <ChevronsUpDown className="size-3 text-[var(--alias-color-text-subtle)]" />
                    </button>
                  </th>
                ))}
                <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--alias-color-text-secondary)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAll.map((l, i) => (
                <tr key={l.id} className={`hover:bg-[var(--alias-color-background-secondary)] transition-colors ${i < filteredAll.length-1 ? "border-b border-[var(--alias-color-border-subtle)]" : ""}`}>
                  <td className="px-4 py-3 font-medium text-[var(--alias-color-text-primary)]">{l.empId} — {l.empName}</td>
                  <td className="px-4 py-3 text-[var(--alias-color-text-secondary)]">{l.type}</td>
                  <td className="px-4 py-3 text-[var(--alias-color-text-secondary)]">{fmtDate(l.from)}</td>
                  <td className="px-4 py-3 text-[var(--alias-color-text-secondary)]">{fmtDate(l.to)}</td>
                  <td className="px-4 py-3"><StatusBadge status={l.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(l)} className="p-1.5 rounded-md bg-[var(--base-color-blue-100)] text-[var(--base-color-blue-800)] hover:bg-[var(--base-color-blue-200)] transition-colors">
                        <Pencil className="size-3.5" />
                      </button>
                      <button onClick={() => setLeaves(prev => prev.filter(x => x.id !== l.id))} className="p-1.5 rounded-md bg-[var(--alias-color-feedback-error-bg)] text-[var(--alias-color-feedback-error-fg)] hover:bg-[var(--base-color-feedback-error-200)] transition-colors">
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <LeaveModal mode={modal.mode} initial={modal.data} open={modal.open} onClose={closeModal} onSave={saveLeave} />
    </div>
  )
}

// ─── Attendance Changes Tab ───────────────────────────────────────────────────

function AttChangesTab() {
  const [changes, setChanges]     = useState<AttChange[]>(INIT_ATT_CHANGES)
  const [pendingSearch, setPending] = useState("")
  const [historyPeriod, setPeriod]  = useState("Today")

  const pending = changes.filter(c => c.status === "Pending")
  const filteredPending = pending.filter(c =>
    `${c.empId} ${c.empName}`.toLowerCase().includes(pendingSearch.toLowerCase())
  )

  function approve(id: number) { setChanges(prev => prev.map(c => c.id===id ? {...c, status:"Approved"} : c)) }
  function reject(id: number)  { setChanges(prev => prev.map(c => c.id===id ? {...c, status:"Rejected"} : c)) }

  const today = new Date().toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" })

  return (
    <div className="flex flex-col gap-6">
      {/* Export buttons */}
      <div className="flex items-center gap-2 justify-end">
        <Button size="sm" variant="outline" className="gap-1.5 h-8 text-xs">
          <FileSpreadsheet className="size-3.5 text-[var(--alias-color-feedback-success-fg)]" />
          Excel
        </Button>
        <Button size="sm" variant="outline" className="gap-1.5 h-8 text-xs">
          <FileText className="size-3.5 text-[var(--alias-color-feedback-error-fg)]" />
          PDF
        </Button>
      </div>

      {/* Pending Requests */}
      <div>
        <h2 className="text-sm font-semibold text-[var(--alias-color-text-brand)] mb-2">Pending Requests</h2>
        <div className="mb-2 w-64">
          <Input placeholder="Search..." value={pendingSearch} onChange={e => setPending(e.target.value)} className="h-9 text-sm" />
        </div>
        <div className="border border-[var(--alias-color-border-default)] rounded-xl bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--alias-color-background-secondary)] border-b border-[var(--alias-color-border-subtle)]">
                {["Employee","Date","Type","Check In","Check Out","Reason","Requested By"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[var(--alias-color-text-secondary)]">
                    <button className="flex items-center gap-1 hover:text-[var(--alias-color-text-primary)] transition-colors">
                      {h} <ChevronsUpDown className="size-3 text-[var(--alias-color-text-subtle)]" />
                    </button>
                  </th>
                ))}
                <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--alias-color-text-secondary)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPending.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-6 text-center text-sm text-[var(--alias-color-text-subtle)]">No pending requests</td></tr>
              ) : filteredPending.map((c, i) => (
                <tr key={c.id} className={`hover:bg-[var(--alias-color-background-secondary)] transition-colors ${i < filteredPending.length-1 ? "border-b border-[var(--alias-color-border-subtle)]" : ""}`}>
                  <td className="px-4 py-3 font-medium text-[var(--alias-color-text-primary)] whitespace-nowrap">{c.empId} — {c.empName}</td>
                  <td className="px-4 py-3 text-[var(--alias-color-text-secondary)] whitespace-nowrap">{fmtDate(c.date)}</td>
                  <td className="px-4 py-3 text-[var(--alias-color-text-secondary)]">{c.type}</td>
                  <td className="px-4 py-3 text-[var(--alias-color-text-secondary)]">{c.checkIn}</td>
                  <td className="px-4 py-3 text-[var(--alias-color-text-secondary)]">{c.checkOut}</td>
                  <td className="px-4 py-3 text-[var(--alias-color-text-secondary)]">{c.reason}</td>
                  <td className="px-4 py-3 text-[var(--alias-color-text-secondary)]">{c.requestedBy}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => approve(c.id)} className="p-1.5 rounded-md bg-[var(--alias-color-feedback-success-bg)] text-[var(--alias-color-feedback-success-fg)] hover:bg-[var(--base-color-feedback-success-200)] transition-colors">
                        <Check className="size-3.5" />
                      </button>
                      <button onClick={() => reject(c.id)} className="p-1.5 rounded-md bg-[var(--alias-color-feedback-error-bg)] text-[var(--alias-color-feedback-error-fg)] hover:bg-[var(--base-color-feedback-error-200)] transition-colors">
                        <X className="size-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* History */}
      <div>
        <h2 className="text-sm font-semibold text-[var(--alias-color-text-primary)] mb-2">History</h2>
        <div className="border border-[var(--alias-color-border-default)] rounded-xl bg-white px-4 py-3 flex items-center gap-3 mb-2">
          <span className="text-sm text-[var(--alias-color-text-secondary)]">Period:</span>
          <Select value={historyPeriod} onValueChange={setPeriod}>
            <SelectTrigger className="h-8 text-sm w-36"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Today","This Week","This Month","Last Month","Custom"].map(p =>
                <SelectItem key={p} value={p}>{p}</SelectItem>
              )}
            </SelectContent>
          </Select>
          <span className="ml-auto text-xs text-[var(--alias-color-text-subtle)]">{today}</span>
        </div>
        <div className="border border-[var(--alias-color-border-default)] rounded-xl bg-white px-4 py-8 text-center">
          <p className="text-sm text-[var(--alias-color-text-subtle)]">No history for this period.</p>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LeavesPage() {
  const [tab, setTab]             = useState<"leaves"|"att-changes">("leaves")
  const [holidaysOpen, setHols]   = useState(false)

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-[var(--alias-color-text-primary)]">Leaves &amp; Attendance</h1>
          <Button size="sm" variant="outline" className="gap-1.5" onClick={() => setHols(true)}>
            <CalendarDays className="size-3.5" />
            Holidays
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[var(--alias-color-border-subtle)] mb-5">
          {([
            { key: "leaves",      label: "Leaves" },
            { key: "att-changes", label: "Attendance Changes" },
          ] as const).map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                tab === t.key
                  ? "border-[var(--alias-color-border-active)] text-[var(--alias-color-text-brand)]"
                  : "border-transparent text-[var(--alias-color-text-secondary)] hover:text-[var(--alias-color-text-primary)]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "leaves"      && <LeavesTab />}
        {tab === "att-changes" && <AttChangesTab />}

      </div>

      <HolidaysModal open={holidaysOpen} onClose={() => setHols(false)} />
    </div>
  )
}
