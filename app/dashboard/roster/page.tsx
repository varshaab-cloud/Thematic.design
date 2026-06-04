"use client"

import React, { useState, useMemo } from "react"
import { FileSpreadsheet, FileText, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

// ─── Types ────────────────────────────────────────────────────────────────────

type DayStatus = "W" | "WO" | "CO"

interface Employee {
  id:        string
  name:      string
  dept:      string
  weekoffDay: number   // 0=Sun, 1=Mon, ... 6=Sat
}

type RosterData = Record<string, Record<number, DayStatus>>  // empId → dayNum → status

// ─── Constants ────────────────────────────────────────────────────────────────

const DAY_ABBR = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

const DEPT_LIST = [
  "All Departments",
  "Property Management", "Security", "STP", "Technical",
  "Housekeeping", "Waste Management", "Horticulture",
  "Parking Management", "Valetez",
]

const MONTH_OPTIONS = [
  { label: "Last Month",  offset: -1 },
  { label: "This Month",  offset: 0  },
  { label: "Next Month",  offset: 1  },
]

const EMPLOYEES: Employee[] = [
  // Housekeeping
  { id: "42448", name: "Nandu",       dept: "Housekeeping", weekoffDay: 0 },
  { id: "43911", name: "Babanna",     dept: "Housekeeping", weekoffDay: 1 },
  { id: "42375", name: "Bharamappa",  dept: "Housekeeping", weekoffDay: 1 },
  { id: "45294", name: "Tabita Nag",  dept: "Housekeeping", weekoffDay: 0 },
  { id: "42382", name: "Songita Dao", dept: "Housekeeping", weekoffDay: 3 },
  { id: "42325", name: "Harish",      dept: "Housekeeping", weekoffDay: 3 },
  { id: "47773", name: "Mariyanna",   dept: "Housekeeping", weekoffDay: 3 },
  { id: "49117", name: "Sujita Mili", dept: "Housekeeping", weekoffDay: 3 },
  { id: "50133", name: "Shantamma",   dept: "Housekeeping", weekoffDay: 3 },
  { id: "52086", name: "Rita Doley",  dept: "Housekeeping", weekoffDay: 1 },
  { id: "52102", name: "Kamrul Islam",dept: "Housekeeping", weekoffDay: 0 },
  { id: "52431", name: "Abdul Kashir",dept: "Housekeeping", weekoffDay: 2 },
  { id: "52615", name: "Suresh",      dept: "Housekeeping", weekoffDay: 0 },
  { id: "49537", name: "Sujam Uddin", dept: "Housekeeping", weekoffDay: 3 },
  { id: "42350", name: "Pampati",     dept: "Housekeeping", weekoffDay: 2 },
  { id: "53823", name: "Sangamesh",   dept: "Housekeeping", weekoffDay: 1 },
  // Horticulture
  { id: "43915", name: "Hanumantha",  dept: "Horticulture", weekoffDay: 0 },
  { id: "43916", name: "Puttaraj",    dept: "Horticulture", weekoffDay: 0 },
  { id: "43917", name: "Sushila",     dept: "Horticulture", weekoffDay: 1 },
  // Waste Management
  { id: "43918", name: "Mallikarjun", dept: "Waste Management", weekoffDay: 0 },
  { id: "43919", name: "Maneendra",   dept: "Waste Management", weekoffDay: 0 },
  // Security
  { id: "55001", name: "Ravi Kumar",  dept: "Security", weekoffDay: 2 },
  { id: "55002", name: "Prasad",      dept: "Security", weekoffDay: 5 },
  { id: "55003", name: "Sunil",       dept: "Security", weekoffDay: 0 },
  // Technical
  { id: "60001", name: "Arun Mehta",  dept: "Technical", weekoffDay: 0 },
  { id: "60002", name: "Deepak",      dept: "Technical", weekoffDay: 0 },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getMonthDays(year: number, month: number) {
  // Returns array of { day, dayOfWeek } for each day in the month
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  return Array.from({ length: daysInMonth }, (_, i) => {
    const d = new Date(year, month, i + 1)
    return { day: i + 1, dow: d.getDay() }
  })
}

function getYearMonth(offset: number): { year: number; month: number } {
  const now = new Date()
  const d = new Date(now.getFullYear(), now.getMonth() + offset, 1)
  return { year: d.getFullYear(), month: d.getMonth() }
}

function fmtRange(year: number, month: number, daysInMonth: number) {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  return `01 ${months[month]} ${year} – ${String(daysInMonth).padStart(2,"0")} ${months[month]} ${year}`
}

function generateRoster(employees: Employee[], days: { day: number; dow: number }[]): RosterData {
  const data: RosterData = {}
  for (const emp of employees) {
    data[emp.id] = {}
    for (const { day, dow } of days) {
      data[emp.id][day] = dow === emp.weekoffDay ? "WO" : "W"
    }
  }
  return data
}

// ─── Cell ─────────────────────────────────────────────────────────────────────

const CELL_STYLES: Record<DayStatus, string> = {
  W:  "bg-[var(--alias-color-feedback-success-bg)]  text-[var(--alias-color-feedback-success-fg)]",
  WO: "bg-[var(--alias-color-feedback-error-bg)]    text-[var(--alias-color-feedback-error-fg)]",
  CO: "bg-[var(--alias-color-feedback-warning-bg)]  text-[var(--alias-color-feedback-warning-fg)]",
}

const CYCLE: Record<DayStatus, DayStatus> = { W: "WO", WO: "CO", CO: "W" }

function RosterCell({
  status, onClick,
}: {
  status: DayStatus
  onClick: () => void
}) {
  return (
    <td className="p-0 border-r border-[var(--alias-color-border-subtle)] last:border-r-0">
      <button
        onClick={onClick}
        className={`w-9 h-9 flex items-center justify-center text-[10px] font-semibold transition-opacity hover:opacity-80 w-full ${CELL_STYLES[status]}`}
      >
        {status}
      </button>
    </td>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RosterPage() {
  const [deptFilter,   setDeptFilter]   = useState("Housekeeping")
  const [monthOffset,  setMonthOffset]  = useState(-1)  // Last Month default
  const [changes,      setChanges]      = useState(0)
  const [customDate,   setCustomDate]   = useState("")

  const { year, month } = useMemo(() => getYearMonth(monthOffset), [monthOffset])
  const days            = useMemo(() => getMonthDays(year, month), [year, month])

  const visibleEmps = useMemo(() =>
    deptFilter === "All Departments"
      ? EMPLOYEES
      : EMPLOYEES.filter(e => e.dept === deptFilter),
    [deptFilter]
  )

  const [roster, setRoster] = useState<RosterData>(() =>
    generateRoster(EMPLOYEES, getMonthDays(getYearMonth(-1).year, getYearMonth(-1).month))
  )

  // Re-generate when month changes (keep existing overrides would need merging, here we reset)
  const [lastMonth, setLastMonth] = useState(monthOffset)
  if (lastMonth !== monthOffset) {
    setLastMonth(monthOffset)
    setRoster(generateRoster(EMPLOYEES, days))
    setChanges(0)
  }

  function toggleCell(empId: string, day: number) {
    setRoster(prev => {
      const cur = prev[empId]?.[day] ?? "W"
      return {
        ...prev,
        [empId]: { ...prev[empId], [day]: CYCLE[cur] },
      }
    })
    setChanges(c => c + 1)
  }

  // Group visible employees by dept
  const grouped = useMemo(() => {
    const map = new Map<string, Employee[]>()
    for (const emp of visibleEmps) {
      if (!map.has(emp.dept)) map.set(emp.dept, [])
      map.get(emp.dept)!.push(emp)
    }
    return map
  }, [visibleEmps])

  const daysInMonth = days.length

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* ── Top header bar (matches attendance page) ── */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[var(--alias-color-border-default)] bg-white shrink-0 gap-3 flex-wrap">
        <h1 className="text-base font-semibold text-[var(--alias-color-text-primary)]">Roster</h1>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Department */}
          <Select value={deptFilter} onValueChange={setDeptFilter}>
            <SelectTrigger className="h-8 text-xs w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DEPT_LIST.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>

          {/* Month preset */}
          <Select value={String(monthOffset)} onValueChange={v => { setMonthOffset(Number(v)); setCustomDate("") }}>
            <SelectTrigger className="h-8 text-xs w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MONTH_OPTIONS.map(o => (
                <SelectItem key={o.offset} value={String(o.offset)}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Custom date */}
          <input
            type="date"
            value={customDate}
            onChange={e => setCustomDate(e.target.value)}
            title="Custom start date"
            className="h-8 text-xs px-2 rounded-md border border-[var(--alias-color-border-default)] bg-white text-[var(--alias-color-text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--alias-color-border-active)]"
          />

          <div className="w-px h-5 bg-[var(--alias-color-border-default)]" />

          <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs">
            <FileSpreadsheet className="size-3.5 text-[var(--alias-color-feedback-success-fg)]" />
            Excel
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs">
            <FileText className="size-3.5 text-[var(--alias-color-feedback-error-fg)]" />
            PDF
          </Button>

          <div className="w-px h-5 bg-[var(--alias-color-border-default)]" />

          <Button
            size="sm"
            className="gap-1.5 h-8 text-xs"
            disabled={changes === 0}
            onClick={() => setChanges(0)}
          >
            <Save className="size-3.5" />
            Save Changes ({changes})
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">

        {/* Legend */}
        <div className="flex items-center gap-5 mb-4">
          {[
            { label: "W – Working", color: "bg-[var(--alias-color-feedback-success-bg)]", text: "text-[var(--alias-color-feedback-success-fg)]" },
            { label: "WO – Week Off", color: "bg-[var(--alias-color-feedback-error-bg)]", text: "text-[var(--alias-color-feedback-error-fg)]" },
            { label: "CO – Comp Off", color: "bg-[var(--alias-color-feedback-warning-bg)]", text: "text-[var(--alias-color-feedback-warning-fg)]" },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <span className={`size-3.5 rounded-sm ${l.color} ${l.text} flex items-center justify-center text-[8px] font-bold`} />
              <span className="text-xs text-[var(--alias-color-text-secondary)]">{l.label}</span>
            </div>
          ))}
        </div>

        {/* Roster table */}
        <div className="border border-[var(--alias-color-border-default)] rounded-xl bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="border-collapse" style={{ minWidth: "max-content" }}>

              {/* Header */}
              <thead>
                <tr className="bg-[var(--alias-color-background-secondary)] border-b border-[var(--alias-color-border-subtle)]">
                  {/* Sticky employee col header */}
                  <th className="sticky left-0 z-20 bg-[var(--alias-color-background-secondary)] px-4 py-2.5 text-left text-xs font-semibold text-[var(--alias-color-text-secondary)] border-r border-[var(--alias-color-border-subtle)]"
                    style={{ minWidth: 180 }}>
                    Employee
                  </th>
                  {/* Day headers */}
                  {days.map(({ day, dow }) => (
                    <th
                      key={day}
                      className={`text-center text-[10px] font-semibold border-r border-[var(--alias-color-border-subtle)] last:border-r-0 w-9 ${
                        dow === 0 ? "bg-[var(--alias-color-feedback-error-bg)] text-[var(--alias-color-feedback-error-fg)]"
                                  : "text-[var(--alias-color-text-secondary)]"
                      }`}
                    >
                      <div className="py-1 leading-tight">
                        <div>{String(day).padStart(2, "0")}</div>
                        <div className="text-[9px] font-normal opacity-70">{DAY_ABBR[dow]}</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body — grouped by dept */}
              <tbody>
                {[...grouped.entries()].map(([dept, emps]) => (
                  <React.Fragment key={dept}>
                    {/* Dept section header */}
                    <tr className="border-b border-[var(--alias-color-border-subtle)]">
                      <td
                        colSpan={days.length + 1}
                        className="sticky left-0 px-4 py-2 text-xs font-semibold text-[var(--alias-color-text-brand)] bg-[var(--alias-color-background-secondary)]"
                      >
                        {dept}{" "}
                        <span className="font-normal text-[var(--alias-color-text-subtle)]">
                          ({emps.length} employee{emps.length !== 1 ? "s" : ""})
                        </span>
                      </td>
                    </tr>

                    {/* Employee rows */}
                    {emps.map((emp, ei) => (
                      <tr
                        key={emp.id}
                        className={`border-b border-[var(--alias-color-border-subtle)] last:border-b-0 hover:bg-[var(--alias-color-background-secondary)] transition-colors`}
                      >
                        {/* Sticky name cell */}
                        <td
                          className="sticky left-0 z-10 bg-white px-4 py-0 text-xs font-medium text-[var(--alias-color-text-primary)] border-r border-[var(--alias-color-border-subtle)] whitespace-nowrap"
                          style={{ minWidth: 180, height: 36 }}
                        >
                          {emp.id} – {emp.name}
                        </td>

                        {/* Day cells */}
                        {days.map(({ day }) => {
                          const status = roster[emp.id]?.[day] ?? "W"
                          return (
                            <RosterCell
                              key={day}
                              status={status}
                              onClick={() => toggleCell(emp.id, day)}
                            />
                          )
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}
