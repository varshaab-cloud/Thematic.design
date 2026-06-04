"use client"

import React, { useState } from "react"
import { ChevronDown, ChevronRight, GitFork } from "lucide-react"
import { MetricCard } from "@/components/ui/card"

// ─── Data ─────────────────────────────────────────────────────────────────────

const departments = [
  { name: "Property Management", total: 24,   present: 0, absent: 24,   leave: 0 },
  { name: "Security",            total: 64,   present: 0, absent: 64,   leave: 0 },
  { name: "STP",                 total: 8,    present: 0, absent: 8,    leave: 0 },
  { name: "Technical",           total: 33,   present: 0, absent: 33,   leave: 0 },
  { name: "Housekeeping",        total: 41,   present: 0, absent: 41,   leave: 0 },
  { name: "Waste Management",    total: 6,    present: 0, absent: 6,    leave: 0 },
  { name: "Horticulture",        total: 10,   present: 0, absent: 10,   leave: 0 },
  { name: "Parking Management",  total: 22,   present: 0, absent: 22,   leave: 0 },
  { name: "Valetez",             total: 18,   present: 0, absent: 18,   leave: 0 },
  { name: "Unassigned",          total: 1951, present: 0, absent: 1951, leave: 0, muted: true },
]

const orgTotal   = departments.reduce((s, d) => s + d.total,   0)
const orgPresent = departments.reduce((s, d) => s + d.present, 0)
const orgAbsent  = departments.reduce((s, d) => s + d.absent,  0)
const orgLeave   = departments.reduce((s, d) => s + d.leave,   0)

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [orgExpanded, setOrgExpanded] = useState(true)

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-8">

        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[var(--alias-color-text-primary)]">Dashboard</h1>
          <p className="text-sm text-[var(--alias-color-text-secondary)] mt-1">
            Welcome,{" "}
            <span className="font-semibold text-[var(--alias-color-text-primary)]">Shwetha Manager</span>
            {" "}— Tuesday, 02 Jun 2026
          </p>
        </div>

        {/* ── Pending tiles ── */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <MetricCard label="Pending Leaves"      value={1} variant="brand" />
          <MetricCard label="Pending Att. Changes" value={1} variant="brand" />
        </div>

        {/* ── Org section ── */}
        <div className="border border-[var(--alias-color-border-default)] rounded-xl bg-white overflow-hidden">

          {/* Org header row */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--alias-color-border-subtle)]">
            <button
              onClick={() => setOrgExpanded(v => !v)}
              className="flex items-center gap-2 text-sm font-semibold text-[var(--alias-color-text-primary)] hover:text-[var(--alias-color-text-brand)] transition-colors"
            >
              {orgExpanded
                ? <ChevronDown className="size-4 text-[var(--alias-color-text-subtle)]" />
                : <ChevronRight className="size-4 text-[var(--alias-color-text-subtle)]" />
              }
              <GitFork className="size-4 text-[var(--alias-color-text-subtle)] rotate-180" />
              EcoWorld
              <span className="text-[var(--alias-color-text-subtle)] font-normal">({orgTotal})</span>
            </button>
            <div className="flex items-center gap-4 text-xs text-[var(--alias-color-text-subtle)]">
              <span>P: <span className="text-[var(--alias-color-feedback-success-fg)] font-medium">{orgPresent}</span></span>
              <span>A: <span className="text-[var(--alias-color-feedback-error-fg)] font-medium">{orgAbsent}</span></span>
              <span>L: <span className="text-[var(--alias-color-text-secondary)] font-medium">{orgLeave}</span></span>
            </div>
          </div>

          {orgExpanded && (
            <>
              {/* ── Stat tiles ── */}
              <div className="grid grid-cols-4 gap-px bg-[var(--alias-color-border-subtle)] border-b border-[var(--alias-color-border-subtle)]">
                <div className="bg-white px-6 py-4 text-center">
                  <p className="text-xs text-[var(--alias-color-text-subtle)] mb-1">Total</p>
                  <p className="text-2xl font-bold text-[var(--alias-color-text-primary)]">{orgTotal}</p>
                </div>
                <div className="bg-[var(--alias-color-feedback-success-bg)] px-6 py-4 text-center">
                  <p className="text-xs text-[var(--alias-color-feedback-success-fg)] mb-1">Present</p>
                  <p className="text-2xl font-bold text-[var(--alias-color-feedback-success-fg)]">{orgPresent}</p>
                </div>
                <div className="bg-[var(--alias-color-feedback-error-bg)] px-6 py-4 text-center">
                  <p className="text-xs text-[var(--alias-color-feedback-error-fg)] mb-1">Absent</p>
                  <p className="text-2xl font-bold text-[var(--alias-color-feedback-error-fg)]">{orgAbsent}</p>
                </div>
                <div className="bg-[var(--alias-color-feedback-warning-bg)] px-6 py-4 text-center">
                  <p className="text-xs text-[var(--alias-color-feedback-warning-fg)] mb-1">Leave</p>
                  <p className="text-2xl font-bold text-[var(--alias-color-feedback-warning-fg)]">{orgLeave}</p>
                </div>
              </div>

              {/* ── Department table ── */}
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--alias-color-background-secondary)] border-b border-[var(--alias-color-border-subtle)]">
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-[var(--alias-color-text-secondary)] w-1/2">Department</th>
                    <th className="px-4 py-2.5 text-right text-xs font-semibold text-[var(--alias-color-text-secondary)]">Total</th>
                    <th className="px-4 py-2.5 text-right text-xs font-semibold text-[var(--alias-color-feedback-success-fg)]">Present</th>
                    <th className="px-4 py-2.5 text-right text-xs font-semibold text-[var(--alias-color-feedback-error-fg)]">Absent</th>
                    <th className="px-4 py-2.5 text-right text-xs font-semibold text-[var(--alias-color-feedback-warning-fg)]">Leave</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((dept) => (
                    <tr
                      key={dept.name}
                      className="border-b border-[var(--alias-color-border-subtle)] hover:bg-[var(--alias-color-background-secondary)] transition-colors last:border-0"
                    >
                      <td className={`px-4 py-2.5 font-medium ${dept.muted ? "text-[var(--alias-color-text-subtle)]" : "text-[var(--alias-color-text-primary)]"}`}>
                        {dept.name}
                      </td>
                      <td className="px-4 py-2.5 text-right text-[var(--alias-color-text-secondary)]">{dept.total}</td>
                      <td className="px-4 py-2.5 text-right text-[var(--alias-color-feedback-success-fg)]">{dept.present}</td>
                      <td className={`px-4 py-2.5 text-right font-medium ${dept.absent > 0 ? "text-[var(--alias-color-feedback-error-fg)]" : "text-[var(--alias-color-text-subtle)]"}`}>
                        {dept.absent}
                      </td>
                      <td className="px-4 py-2.5 text-right text-[var(--alias-color-text-subtle)]">{dept.leave}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>

      </div>
    </div>
  )
}
