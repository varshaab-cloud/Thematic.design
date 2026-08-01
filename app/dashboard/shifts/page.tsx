"use client"

import React, { useState } from "react"
import { Pencil, Trash2, Plus, X, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Shift {
  id: number
  name: string
  department: string
  startTime: string
  endTime: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DEPARTMENTS = [
  "All Departments",
  "Property Management", "Security", "STP", "Technical",
  "Housekeeping", "Waste Management", "Horticulture",
  "Parking Management", "Valetez",
]

// ─── Add / Edit Shift Modal ───────────────────────────────────────────────────

function ShiftModal({
  mode, initial, open, onClose, onSave,
}: {
  mode: "add" | "edit"
  initial: Omit<Shift, "id">
  open: boolean
  onClose: () => void
  onSave: (s: Omit<Shift, "id">) => void
}) {
  const blank = { name: "", department: "", startTime: "", endTime: "" }
  const [form, setForm] = useState<Omit<Shift, "id">>(initial)

  React.useEffect(() => { setForm(initial) }, [open])

  function set<K extends keyof Omit<Shift, "id">>(key: K, val: string) {
    setForm(prev => ({ ...prev, [key]: val }))
  }

  function handleSave() {
    if (!form.name.trim() || !form.department) return
    onSave(form)
    onClose()
  }

  const canSave = form.name.trim() && form.department

  return (
    <Dialog open={open} onOpenChange={v => { if (!v) onClose() }}>
      <DialogContent className="sm:max-w-sm" showCloseButton={false}>
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-base">
            {mode === "add" ? "Add Shift" : "Edit Shift"}
          </DialogTitle>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[var(--alias-color-text-subtle)] hover:bg-[var(--alias-color-background-secondary)] transition-colors"
          >
            <X className="size-4" />
          </button>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-1">

          {/* Shift Name */}
          <div>
            <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1.5">
              Shift Name <span className="text-[var(--alias-color-feedback-error-fg)]">*</span>
            </label>
            <Input
              value={form.name}
              onChange={e => set("name", e.target.value)}
              placeholder="e.g. General, Morning, Night"
              className="h-9 text-sm"
              autoFocus
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1.5">
              Department <span className="text-[var(--alias-color-feedback-error-fg)]">*</span>
            </label>
            <Select value={form.department} onValueChange={v => set("department", v)}>
              <SelectTrigger className="h-9 text-sm w-full">
                <SelectValue placeholder="— Select department —" />
              </SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Start Time */}
          <div>
            <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1.5">
              Start Time
            </label>
            <Input
              type="time"
              value={form.startTime}
              onChange={e => set("startTime", e.target.value)}
              className="h-9 text-sm"
            />
          </div>

          {/* End Time */}
          <div>
            <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1.5">
              End Time
            </label>
            <Input
              type="time"
              value={form.endTime}
              onChange={e => set("endTime", e.target.value)}
              className="h-9 text-sm"
            />
          </div>

          {/* Footer */}
          <div className="flex gap-2 pt-1">
            <Button className="flex-1" onClick={handleSave} disabled={!canSave}>
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

export default function ShiftsPage() {
  const [shifts, setShifts] = useState<Shift[]>([])
  const [search, setSearch] = useState("")
  const [modal, setModal]   = useState<{
    open: boolean; mode: "add" | "edit"; data: Omit<Shift, "id">; editId?: number
  }>({ open: false, mode: "add", data: { name: "", department: "", startTime: "", endTime: "" } })

  function openAdd() {
    setModal({ open: true, mode: "add", data: { name: "", department: "", startTime: "", endTime: "" } })
  }
  function openEdit(s: Shift) {
    const { id, ...rest } = s
    setModal({ open: true, mode: "edit", data: rest, editId: id })
  }
  function closeModal() { setModal(p => ({ ...p, open: false })) }

  function saveShift(s: Omit<Shift, "id">) {
    if (modal.mode === "add") {
      setShifts(prev => [...prev, { id: Date.now(), ...s }])
    } else {
      setShifts(prev => prev.map(x => x.id === modal.editId ? { id: x.id, ...s } : x))
    }
  }

  function removeShift(id: number) {
    setShifts(prev => prev.filter(s => s.id !== id))
  }

  const filtered = shifts.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.department.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6">

        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-[var(--alias-color-text-primary)]">Shifts</h1>
        </div>

        {/* Search + Add */}
        <div className="flex items-center gap-3 mb-3">
          <Input
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-9 text-sm w-72"
          />
          <Button size="sm" className="gap-1.5 ml-auto" onClick={openAdd}>
            <Plus className="size-3.5" />
            Add Shift
          </Button>
        </div>

        {/* Empty state / Table */}
        {filtered.length === 0 ? (
          <div className="border border-[var(--alias-color-border-default)] rounded-xl bg-white px-6 py-12 text-center">
            <Clock className="size-8 text-[var(--alias-color-text-subtle)] mx-auto mb-3" />
            <p className="text-sm text-[var(--alias-color-text-secondary)]">
              No shifts found.{" "}
              <button
                onClick={openAdd}
                className="text-[var(--alias-color-text-brand)] hover:underline"
              >
                Add one
              </button>
              .
            </p>
          </div>
        ) : (
          <div className="border border-[var(--alias-color-border-default)] rounded-xl bg-white overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--alias-color-background-secondary)] border-b border-[var(--alias-color-border-subtle)]">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--alias-color-text-secondary)] w-1/4">Shift Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--alias-color-text-secondary)] w-1/3">Department</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--alias-color-text-secondary)] w-28">Start Time</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--alias-color-text-secondary)] w-28">End Time</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--alias-color-text-secondary)]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((shift, i) => (
                  <tr
                    key={shift.id}
                    className={`hover:bg-[var(--alias-color-background-secondary)] transition-colors ${i < filtered.length - 1 ? "border-b border-[var(--alias-color-border-subtle)]" : ""}`}
                  >
                    <td className="px-4 py-3 font-medium text-[var(--alias-color-text-primary)]">{shift.name}</td>
                    <td className="px-4 py-3 text-[var(--alias-color-text-secondary)]">{shift.department}</td>
                    <td className="px-4 py-3 text-[var(--alias-color-text-secondary)]">
                      {shift.startTime ? shift.startTime : <span className="text-[var(--alias-color-text-subtle)]">—</span>}
                    </td>
                    <td className="px-4 py-3 text-[var(--alias-color-text-secondary)]">
                      {shift.endTime ? shift.endTime : <span className="text-[var(--alias-color-text-subtle)]">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(shift)}
                          className="p-1.5 rounded-md bg-[var(--base-color-blue-100)] text-[var(--base-color-blue-800)] hover:bg-[var(--base-color-blue-200)] transition-colors"
                        >
                          <Pencil className="size-3.5" />
                        </button>
                        <button
                          onClick={() => removeShift(shift.id)}
                          className="p-1.5 rounded-md bg-[var(--alias-color-feedback-error-bg)] text-[var(--alias-color-feedback-error-fg)] hover:bg-[var(--base-color-feedback-error-200)] transition-colors"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      <ShiftModal
        mode={modal.mode}
        initial={modal.data}
        open={modal.open}
        onClose={closeModal}
        onSave={saveShift}
      />
    </div>
  )
}
