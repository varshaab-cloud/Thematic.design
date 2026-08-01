"use client"

import React, { useState } from "react"
import { Pencil, Trash2, ChevronsUpDown, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Vendor {
  id: number
  name: string
  department: string
  contactPerson: string
  phone: string
  email: string
  address: string
  active: boolean
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DEPARTMENTS = [
  "Property Management", "Security", "STP", "Technical",
  "Housekeeping", "Waste Management", "Horticulture",
  "Parking Management", "Valetez",
]

const INITIAL: Vendor[] = [
  { id: 1, name: "JLL",                    department: "Property Management", contactPerson: "Aravinth", phone: "9880297101", email: "shwetha.supervisor.id@safehalo.in", address: "", active: true },
  { id: 2, name: "Amazing Blooms",         department: "Horticulture",        contactPerson: "Denita",   phone: "9845157355", email: "amazingbloomsrd@yahoo.in",          address: "", active: true },
  { id: 3, name: "247FSPL",                department: "Housekeeping",        contactPerson: "",         phone: "",           email: "",                                  address: "", active: true },
  { id: 4, name: "Saahas Waste Management",department: "Waste Management",    contactPerson: "",         phone: "",           email: "",                                  address: "", active: true },
]

function blank(): Omit<Vendor, "id"> {
  return { name: "", department: "", contactPerson: "", phone: "", email: "", address: "", active: true }
}

// ─── Vendor Modal ─────────────────────────────────────────────────────────────

function VendorModal({
  mode, initial, open, onClose, onSave,
}: {
  mode: "add" | "edit"
  initial: Omit<Vendor, "id">
  open: boolean
  onClose: () => void
  onSave: (v: Omit<Vendor, "id">) => void
}) {
  const [form, setForm] = useState<Omit<Vendor, "id">>(initial)

  React.useEffect(() => { setForm(initial) }, [open])

  function set<K extends keyof Omit<Vendor, "id">>(key: K, val: any) {
    setForm(p => ({ ...p, [key]: val }))
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
            {mode === "add" ? "Add Vendor" : "Edit Vendor"}
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
              Vendor Name <span className="text-[var(--alias-color-feedback-error-fg)]">*</span>
            </label>
            <Input
              value={form.name}
              onChange={e => set("name", e.target.value)}
              placeholder="e.g. JLL"
              className="h-9 text-sm"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1.5">
              Department
            </label>
            <Select value={form.department} onValueChange={v => set("department", v)}>
              <SelectTrigger className="h-9 text-sm w-full">
                <SelectValue placeholder="— None —" />
              </SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1.5">
              Contact Person
            </label>
            <Input
              value={form.contactPerson}
              onChange={e => set("contactPerson", e.target.value)}
              placeholder="Full name"
              className="h-9 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1.5">Phone</label>
              <Input
                type="tel"
                value={form.phone}
                onChange={e => set("phone", e.target.value)}
                placeholder="10-digit number"
                className="h-9 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1.5">Email</label>
              <Input
                type="email"
                value={form.email}
                onChange={e => set("email", e.target.value)}
                placeholder="vendor@example.com"
                className="h-9 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1.5">Address</label>
            <textarea
              value={form.address}
              onChange={e => set("address", e.target.value)}
              rows={3}
              className="w-full rounded-md border border-[var(--alias-color-border-default)] bg-white px-3 py-2 text-sm text-[var(--alias-color-text-primary)] placeholder:text-[var(--alias-color-text-subtle)] resize-none focus:outline-none focus:ring-1 focus:ring-[var(--alias-color-border-active)]"
              placeholder="Optional address"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="vendor-active"
              type="checkbox"
              checked={form.active}
              onChange={e => set("active", e.target.checked)}
              className="size-4 rounded accent-[var(--alias-color-text-brand)]"
            />
            <label htmlFor="vendor-active" className="text-sm text-[var(--alias-color-text-secondary)] cursor-pointer">
              Active
            </label>
          </div>

          <div className="flex gap-2 pt-1">
            <Button className="flex-1" onClick={handleSave} disabled={!form.name.trim()}>
              {mode === "add" ? "Add" : "Update"}
            </Button>
            <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>(INITIAL)
  const [search, setSearch]   = useState("")
  const [modal, setModal]     = useState<{
    open: boolean; mode: "add" | "edit"; data: Omit<Vendor, "id">; editId?: number
  }>({ open: false, mode: "add", data: blank() })

  function openAdd() { setModal({ open: true, mode: "add", data: blank() }) }
  function openEdit(v: Vendor) {
    const { id, ...rest } = v
    setModal({ open: true, mode: "edit", data: rest, editId: id })
  }
  function closeModal() { setModal(p => ({ ...p, open: false })) }

  function saveVendor(v: Omit<Vendor, "id">) {
    if (modal.mode === "add") {
      setVendors(prev => [...prev, { id: Date.now(), ...v }])
    } else {
      setVendors(prev => prev.map(x => x.id === modal.editId ? { id: x.id, ...v } : x))
    }
  }

  const filtered = vendors.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.department.toLowerCase().includes(search.toLowerCase()) ||
    v.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
    v.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6">

        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-[var(--alias-color-text-primary)]">Vendors</h1>
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
            Add Vendor
          </Button>
        </div>

        {/* Table */}
        <div className="border border-[var(--alias-color-border-default)] rounded-xl bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--alias-color-background-secondary)] border-b border-[var(--alias-color-border-subtle)]">
                {[
                  { label: "Name",           width: "w-36"  },
                  { label: "Department",     width: "w-36"  },
                  { label: "Contact Person", width: "w-28"  },
                  { label: "Phone",          width: "w-32"  },
                  { label: "Email",          width: ""      },
                  { label: "Active",         width: "w-20"  },
                ].map(col => (
                  <th key={col.label} className={`px-4 py-3 text-left text-xs font-semibold text-[var(--alias-color-text-secondary)] ${col.width}`}>
                    <button className="flex items-center gap-1 hover:text-[var(--alias-color-text-primary)] transition-colors">
                      {col.label} <ChevronsUpDown className="size-3 text-[var(--alias-color-text-subtle)]" />
                    </button>
                  </th>
                ))}
                <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--alias-color-text-secondary)] w-24">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((vendor, i) => (
                <tr
                  key={vendor.id}
                  className={`hover:bg-[var(--alias-color-background-secondary)] transition-colors ${i < filtered.length - 1 ? "border-b border-[var(--alias-color-border-subtle)]" : ""}`}
                >
                  <td className="px-4 py-3 font-medium text-[var(--alias-color-text-primary)]">{vendor.name}</td>
                  <td className="px-4 py-3 text-[var(--alias-color-text-secondary)]">{vendor.department || <span className="text-[var(--alias-color-text-subtle)]">—</span>}</td>
                  <td className="px-4 py-3 text-[var(--alias-color-text-secondary)]">
                    {vendor.contactPerson || <span className="text-[var(--alias-color-text-subtle)]">—</span>}
                  </td>
                  <td className="px-4 py-3 text-[var(--alias-color-text-secondary)]">
                    {vendor.phone || <span className="text-[var(--alias-color-text-subtle)]">—</span>}
                  </td>
                  <td className="px-4 py-3 text-[var(--alias-color-text-secondary)]">
                    {vendor.email || <span className="text-[var(--alias-color-text-subtle)]">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium ${vendor.active ? "text-[var(--alias-color-feedback-success-fg)]" : "text-[var(--alias-color-text-subtle)]"}`}>
                      {vendor.active ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(vendor)}
                        className="p-1.5 rounded-md bg-[var(--base-color-blue-100)] text-[var(--base-color-blue-800)] hover:bg-[var(--base-color-blue-200)] transition-colors"
                      >
                        <Pencil className="size-3.5" />
                      </button>
                      <button
                        onClick={() => setVendors(prev => prev.filter(v => v.id !== vendor.id))}
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
                    No vendors found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      <VendorModal
        mode={modal.mode}
        initial={modal.data}
        open={modal.open}
        onClose={closeModal}
        onSave={saveVendor}
      />
    </div>
  )
}
