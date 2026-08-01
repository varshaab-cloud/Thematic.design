"use client"

import React, { useState } from "react"
import { Pencil, Trash2, ChevronsUpDown, Plus, MapPin, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Branch {
  id: number
  location: string
  subLocations: string[]
}

// ─── Add Branch Modal ─────────────────────────────────────────────────────────

function AddBranchModal({ onSave }: { onSave: (b: Omit<Branch, "id">) => void }) {
  const [open, setOpen]                   = useState(false)
  const [locations, setLocations]         = useState(["Pune HQ", "Bengaluru Office"])
  const [selectedLoc, setSelectedLoc]     = useState("")
  const [showNewLoc, setShowNewLoc]       = useState(false)
  const [newLocValue, setNewLocValue]     = useState("")
  const [subLocInput, setSubLocInput]     = useState("")
  const [subLocations, setSubLocations]   = useState<string[]>([])

  const locSelected = !!selectedLoc

  function reset() {
    setSelectedLoc("")
    setShowNewLoc(false)
    setNewLocValue("")
    setSubLocInput("")
    setSubLocations([])
  }

  function handleOpenChange(val: boolean) {
    setOpen(val)
    if (!val) reset()
  }

  function saveNewLocation() {
    const val = newLocValue.trim()
    if (!val) return
    setLocations(prev => [...prev, val])
    setSelectedLoc(val)
    setNewLocValue("")
    setShowNewLoc(false)
    setSubLocations([])
  }

  function addSubLocation() {
    const val = subLocInput.trim()
    if (!val || !locSelected) return
    setSubLocations(prev => [...prev, val])
    setSubLocInput("")
  }

  function removeFromIndex(index: number) {
    setSubLocations(prev => prev.slice(0, index))
  }

  function handleSave() {
    if (!selectedLoc) return
    onSave({ location: selectedLoc, subLocations })
    handleOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <Plus className="size-3.5" />
          Add Branch
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-center text-base">Add branch</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">

          {/* Location dropdown */}
          <div>
            <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1.5">
              Location
            </label>
            <Select value={selectedLoc} onValueChange={v => { setSelectedLoc(v); setSubLocations([]) }}>
              <SelectTrigger className="w-full h-9 text-sm">
                <SelectValue placeholder="— Select location —" />
              </SelectTrigger>
              <SelectContent>
                {locations.map(l => (
                  <SelectItem key={l} value={l}>{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* + Add location link */}
            <div className="flex justify-end mt-1">
              <button
                onClick={() => setShowNewLoc(v => !v)}
                className="text-xs text-[var(--alias-color-text-brand)] hover:underline"
              >
                + Add location
              </button>
            </div>

            {/* Inline new location form */}
            {showNewLoc && (
              <div className="mt-2 p-3 rounded-lg bg-[var(--alias-color-background-secondary)] border border-[var(--alias-color-border-subtle)]">
                <label className="block text-xs text-[var(--alias-color-text-subtle)] mb-1.5">
                  New location name
                </label>
                <div className="flex gap-2">
                  <Input
                    value={newLocValue}
                    onChange={e => setNewLocValue(e.target.value)}
                    placeholder="e.g. Mumbai North"
                    className="h-8 text-xs flex-1"
                    onKeyDown={e => e.key === "Enter" && saveNewLocation()}
                    autoFocus
                  />
                  <Button size="sm" onClick={saveNewLocation}>Save</Button>
                  <Button size="sm" variant="ghost" onClick={() => setShowNewLoc(false)}>
                    <X className="size-3.5" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-[var(--alias-color-border-subtle)]" />

          {/* Add sub location */}
          <div>
            <label className={`block text-xs mb-1.5 ${locSelected ? "text-[var(--alias-color-text-secondary)]" : "text-[var(--alias-color-text-disabled)]"}`}>
              Add sub location
            </label>
            <div className="flex gap-2">
              <Input
                value={subLocInput}
                onChange={e => setSubLocInput(e.target.value)}
                placeholder={locSelected ? "e.g. Gate A, Block 1, Tower 3…" : "Select a location first"}
                disabled={!locSelected}
                className="h-8 text-xs flex-1"
                onKeyDown={e => e.key === "Enter" && addSubLocation()}
              />
              <Button size="sm" variant="outline" disabled={!locSelected} onClick={addSubLocation}>
                + Add
              </Button>
            </div>
            {!locSelected && (
              <p className="text-[10px] text-[var(--alias-color-text-subtle)] mt-1">
                Select a location to enable sub locations
              </p>
            )}
          </div>

          {/* Nested tree */}
          {subLocations.length > 0 && (
            <div className="flex flex-col gap-1.5">
              {/* Root location */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--alias-color-background-secondary)] border border-[var(--alias-color-border-default)]">
                <MapPin className="size-3.5 text-[var(--alias-color-text-subtle)] shrink-0" />
                <span className="text-xs font-medium text-[var(--alias-color-text-primary)] flex-1">{selectedLoc}</span>
                <span className="text-[10px] text-[var(--alias-color-text-subtle)]">location</span>
              </div>

              {/* Sub locations — each indented deeper */}
              {subLocations.map((label, i) => (
                <div
                  key={i}
                  style={{ marginLeft: `${(i + 1) * 16}px` }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--alias-color-background-secondary)] border border-[var(--alias-color-border-default)]"
                >
                  <span className="text-[10px] text-[var(--alias-color-text-subtle)] shrink-0">↳</span>
                  <span className="text-xs text-[var(--alias-color-text-primary)] flex-1">{label}</span>
                  <button
                    onClick={() => removeFromIndex(i)}
                    className="text-[var(--alias-color-text-subtle)] hover:text-[var(--alias-color-feedback-error-fg)] transition-colors"
                    aria-label="Remove"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex gap-2 pt-1">
            <Button className="flex-1" onClick={handleSave} disabled={!selectedLoc}>
              Save
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

export default function BranchesPage() {
  const [branches, setBranches] = useState<Branch[]>([
    { id: 1, location: "EcoWorld",     subLocations: ["Bellandur", "Gate B"] },
    { id: 2, location: "Building 6&7", subLocations: ["test"] },
  ])
  const [search, setSearch] = useState("")

  function addBranch(b: Omit<Branch, "id">) {
    setBranches(prev => [...prev, { id: Date.now(), ...b }])
  }

  function removeBranch(id: number) {
    setBranches(prev => prev.filter(b => b.id !== id))
  }

  const filtered = branches.filter(b =>
    b.location.toLowerCase().includes(search.toLowerCase()) ||
    b.subLocations.some(s => s.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-[var(--alias-color-text-primary)]">Branches</h1>
          <AddBranchModal onSave={addBranch} />
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
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--alias-color-text-secondary)] w-1/3">
                  <button className="flex items-center gap-1 hover:text-[var(--alias-color-text-primary)] transition-colors">
                    Name <ChevronsUpDown className="size-3 text-[var(--alias-color-text-subtle)]" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--alias-color-text-secondary)]">
                  <button className="flex items-center gap-1 hover:text-[var(--alias-color-text-primary)] transition-colors">
                    Sub Locations <ChevronsUpDown className="size-3 text-[var(--alias-color-text-subtle)]" />
                  </button>
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--alias-color-text-secondary)] w-28">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((branch, i) => (
                <tr
                  key={branch.id}
                  className={`hover:bg-[var(--alias-color-background-secondary)] transition-colors ${i < filtered.length - 1 ? "border-b border-[var(--alias-color-border-subtle)]" : ""}`}
                >
                  <td className="px-4 py-3 font-medium text-[var(--alias-color-text-primary)]">
                    {branch.location}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      {branch.subLocations.map((s, j) => (
                        <span
                          key={j}
                          className="inline-flex items-center text-[10px] px-2 py-0.5 rounded-full bg-[var(--alias-color-background-tertiary)] text-[var(--alias-color-text-secondary)] border border-[var(--alias-color-border-subtle)]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 rounded-md bg-[var(--base-color-blue-100)] text-[var(--base-color-blue-800)] hover:bg-[var(--base-color-blue-200)] transition-colors">
                        <Pencil className="size-3.5" />
                      </button>
                      <button
                        onClick={() => removeBranch(branch.id)}
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

      </div>
    </div>
  )
}
