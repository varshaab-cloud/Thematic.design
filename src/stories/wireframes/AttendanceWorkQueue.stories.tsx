"use client"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import React, { useState } from "react"
import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  CalendarOff,
  Users,
  Building2,
  Layers,
  Star,
  User,
  LogOut,
  FileDown,
  Table2,
  Search,
  ChevronLeft,
  ChevronRight,
  CheckCheck,
  X,
  LayoutList,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react"
import { SidebarNav } from "@/components/ui/sidebar-nav"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

// ─── Design tokens (mirrors globals.css) ─────────────────────────────────────

const t = {
  bg:         "var(--base-color-gray-75)",
  white:      "var(--base-color-white)",
  border:     "var(--base-color-gray-300)",
  subtle:     "var(--base-color-gray-100)",
  muted:      "var(--base-color-gray-400)",
  label:      "var(--base-color-gray-500)",
  textSec:    "var(--base-color-gray-700)",
  text:       "var(--base-color-gray-900)",
  blue:       "var(--base-color-blue-800)",
  blueLight:  "var(--base-color-blue-100)",
  green:      "var(--base-color-green-800)",
  greenLight: "var(--base-color-success-800)",
  red:        "var(--base-color-error-300)",
  redLight:   "var(--base-color-error-200)",
  amber:      "var(--base-color-warning-100)",
  amberLight: "var(--base-color-warning-50)",
}

// ─── Status chip helper ───────────────────────────────────────────────────────

type AttendanceStatus =
  | "present" | "absent" | "late" | "half-day"
  | "on-leave" | "comp-off" | "holiday" | "week-off"
  | "no-check-in" | "no-check-out"

const STATUS_CONFIG: Record<AttendanceStatus, {
  label: string
  variant: "success" | "error" | "warning" | "info" | "outline"
  dot?: boolean
}> = {
  "present":      { label: "Present",        variant: "success", dot: true },
  "absent":       { label: "Absent",         variant: "error",   dot: true },
  "late":         { label: "Late",           variant: "warning", dot: true },
  "half-day":     { label: "Half-day",       variant: "warning", dot: true },
  "on-leave":     { label: "On Leave",       variant: "info",    dot: true },
  "comp-off":     { label: "Comp-off",       variant: "info",    dot: true },
  "holiday":      { label: "Holiday",        variant: "info",    dot: true },
  "week-off":     { label: "Week-off",       variant: "info",    dot: true },
  "no-check-in":  { label: "No check-in",   variant: "warning", dot: true },
  "no-check-out": { label: "No check-out",  variant: "warning", dot: true },
}

function StatusChip({ status }: { status: AttendanceStatus }) {
  const cfg = STATUS_CONFIG[status]
  return (
    <Badge variant={cfg.variant} dot={cfg.dot} size="sm">
      {cfg.label}
    </Badge>
  )
}

type RecordType = "exception" | "request"

function TypeBadge({ type }: { type: RecordType }) {
  return (
    <Badge variant={type === "exception" ? "warning" : "info"} size="sm">
      {type === "exception" ? "Exception" : "Request"}
    </Badge>
  )
}

// ─── Sample data ──────────────────────────────────────────────────────────────

interface QueueRow {
  id: number
  name: string
  empId: string
  shift: string
  status: AttendanceStatus
  checkIn: string
  checkOut: string
  hours: string
  type: RecordType
}

const QUEUE_ROWS: QueueRow[] = [
  { id: 1,  name: "Priya Nair",     empId: "EMP-00241", shift: "Morning",   status: "absent",       checkIn: "—",         checkOut: "—",         hours: "—",      type: "exception" },
  { id: 2,  name: "Rohit Das",      empId: "EMP-00310", shift: "Morning",   status: "absent",       checkIn: "—",         checkOut: "—",         hours: "—",      type: "exception" },
  { id: 3,  name: "Rajesh Verma",   empId: "EMP-00089", shift: "Afternoon", status: "late",         checkIn: "09:34 AM",  checkOut: "06:02 PM",  hours: "8h 28m", type: "exception" },
  { id: 4,  name: "Sunil Patil",    empId: "EMP-00447", shift: "Night",     status: "half-day",     checkIn: "08:02 AM",  checkOut: "12:00 PM",  hours: "3h 58m", type: "request"   },
  { id: 5,  name: "Fatima Sheikh",  empId: "EMP-00512", shift: "Morning",   status: "absent",       checkIn: "—",         checkOut: "—",         hours: "—",      type: "exception" },
  { id: 6,  name: "Kiran Desai",    empId: "EMP-00601", shift: "Afternoon", status: "no-check-out", checkIn: "01:05 PM",  checkOut: "—",         hours: "—",      type: "exception" },
  { id: 7,  name: "Meena Krishnan", empId: "EMP-00334", shift: "Morning",   status: "on-leave",     checkIn: "—",         checkOut: "—",         hours: "—",      type: "request"   },
  { id: 8,  name: "Arun Joshi",     empId: "EMP-00178", shift: "Morning",   status: "late",         checkIn: "09:15 AM",  checkOut: "04:30 PM",  hours: "7h 15m", type: "exception" },
  { id: 9,  name: "Deepa Rao",      empId: "EMP-00289", shift: "Night",     status: "absent",       checkIn: "—",         checkOut: "—",         hours: "—",      type: "exception" },
  { id: 10, name: "Vinod Kumar",    empId: "EMP-00423", shift: "Morning",   status: "no-check-in",  checkIn: "—",         checkOut: "04:45 PM",  hours: "—",      type: "exception" },
]

const DEPARTMENTS = [
  { name: "Security",      count: 12 },
  { name: "Property Mgmt", count: 8  },
  { name: "STP",           count: 3  },
  { name: "Technical",     count: 7  },
  { name: "Housekeeping",  count: 4  },
  { name: "Waste Mgmt",    count: 2  },
  { name: "Horticulture",  count: 1  },
  { name: "Custom",        count: 0  },
]

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  {
    items: [
      { label: "Dashboard",   icon: <LayoutDashboard /> },
      { label: "Work queue",  icon: <ClipboardList />, badge: 37 },
      { label: "Shifts",      icon: <Calendar />       },
      { label: "Leaves",      icon: <CalendarOff />,   badge: 8 },
    ],
  },
  {
    title: "People",
    items: [
      { label: "Employees",   icon: <Users /> },
    ],
  },
  {
    title: "Org Setup",
    items: [
      { label: "Branches",    icon: <Building2 /> },
      { label: "Departments", icon: <Layers />    },
      { label: "Holidays",    icon: <Star />      },
    ],
  },
  {
    title: "Me",
    items: [
      { label: "My profile",  icon: <User />    },
      { label: "Sign out",    icon: <LogOut />  },
    ],
  },
]

const Logo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <div style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: t.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ color: "#fff", fontSize: 10, fontWeight: 700, fontFamily: "var(--font-sans)" }}>A</span>
    </div>
    <span style={{ fontSize: 13, fontWeight: 600, color: t.text, fontFamily: "var(--font-sans)" }}>Attendance</span>
  </div>
)

const UserFooter = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <Avatar className="h-7 w-7 shrink-0">
      <AvatarFallback className="text-[10px] bg-[var(--base-color-blue-100)] text-[var(--base-color-blue-800)] font-semibold">PH</AvatarFallback>
    </Avatar>
    <div>
      <p style={{ fontSize: 12, fontWeight: 500, color: t.text, fontFamily: "var(--font-sans)", margin: 0 }}>Pune HQ</p>
      <p style={{ fontSize: 10, color: t.label, fontFamily: "var(--font-sans)", margin: 0 }}>All branches</p>
    </div>
  </div>
)

// ─── Shared sub-components ────────────────────────────────────────────────────

function Topbar({ onExportPdf, onExportExcel }: { onExportPdf?: () => void; onExportExcel?: () => void }) {
  return (
    <header style={{
      height: 56,
      borderBottom: `1px solid ${t.border}`,
      backgroundColor: t.white,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px",
      flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: t.text, margin: 0, fontFamily: "var(--font-sans)" }}>Work Queue</p>
        </div>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "3px 10px",
          border: `1px solid ${t.border}`,
          borderRadius: 20,
          fontSize: 11,
          color: t.textSec,
          backgroundColor: t.subtle,
          fontFamily: "var(--font-sans)",
        }}>
          <Building2 size={12} />
          Pune HQ · All branches
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <Button variant="outline" size="sm" onClick={onExportPdf}>
          <FileDown size={14} />
          PDF
        </Button>
        <Button variant="outline" size="sm" onClick={onExportExcel}>
          <Table2 size={14} />
          Excel
        </Button>
        <Button variant="ghost" size="icon-sm">
          <User size={16} />
        </Button>
      </div>
    </header>
  )
}

function FilterBar() {
  return (
    <div style={{
      display: "flex",
      gap: 12,
      padding: "12px 24px",
      borderBottom: `1px solid ${t.border}`,
      backgroundColor: t.white,
      alignItems: "flex-end",
      flexWrap: "wrap",
      flexShrink: 0,
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label style={{ fontSize: 11, fontWeight: 500, color: t.label, fontFamily: "var(--font-sans)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Date</label>
        <Input type="date" defaultValue="2026-04-21" className="h-8 text-sm w-[148px]" />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label style={{ fontSize: 11, fontWeight: 500, color: t.label, fontFamily: "var(--font-sans)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Shift</label>
        <Select defaultValue="all">
          <SelectTrigger className="h-8 text-sm w-[140px]">
            <SelectValue placeholder="All shifts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All shifts</SelectItem>
            <SelectItem value="morning">Morning</SelectItem>
            <SelectItem value="afternoon">Afternoon</SelectItem>
            <SelectItem value="night">Night</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label style={{ fontSize: 11, fontWeight: 500, color: t.label, fontFamily: "var(--font-sans)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Status</label>
        <Select defaultValue="all">
          <SelectTrigger className="h-8 text-sm w-[180px]">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="present">Present</SelectItem>
            <SelectItem value="absent">Absent</SelectItem>
            <SelectItem value="late">Late</SelectItem>
            <SelectItem value="half-day">Half-day</SelectItem>
            <SelectItem value="on-leave">On Leave</SelectItem>
            <SelectItem value="comp-off">Comp-off</SelectItem>
            <SelectItem value="holiday">Holiday</SelectItem>
            <SelectItem value="week-off">Week-off</SelectItem>
            <SelectItem value="no-check-in">No check-in</SelectItem>
            <SelectItem value="no-check-out">No check-out</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
        <Button size="sm">Apply</Button>
        <Button variant="outline" size="sm">Reset</Button>
      </div>
    </div>
  )
}

// ─── Department master panel ──────────────────────────────────────────────────

function DepartmentPanel({
  activeDept,
  onSelect,
}: {
  activeDept: string
  onSelect: (name: string) => void
}) {
  const total = DEPARTMENTS.reduce((s, d) => s + d.count, 0)
  return (
    <div style={{
      width: 220,
      borderRight: `1px solid ${t.border}`,
      backgroundColor: t.white,
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>
      <div style={{
        padding: "10px 14px",
        borderBottom: `1px solid ${t.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: t.subtle,
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: t.text, fontFamily: "var(--font-sans)" }}>Departments</span>
        <Badge variant="error" size="sm">{total} items</Badge>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {DEPARTMENTS.map((dept) => {
          const active = dept.name === activeDept
          return (
            <button
              key={dept.name}
              onClick={() => onSelect(dept.name)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 14px",
                borderBottom: `1px solid ${t.border}`,
                borderLeft: `3px solid ${active ? "var(--base-color-blue-800)" : "transparent"}`,
                backgroundColor: active ? "var(--base-color-blue-100)" : "transparent",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.15s",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 12, color: active ? t.blue : t.textSec, fontFamily: "var(--font-sans)", fontWeight: active ? 500 : 400 }}>
                {dept.name}
              </span>
              <Badge
                variant={dept.count > 0 ? "error" : "outline"}
                size="sm"
              >
                {dept.count}
              </Badge>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── 7-day strip ─────────────────────────────────────────────────────────────

type DayStatus = "present" | "absent" | "late" | "leave"

const DAY_COLORS: Record<DayStatus, { bg: string; border: string }> = {
  present: { bg: "var(--base-color-success-800)",  border: "var(--base-color-success-900)" },
  absent:  { bg: "var(--base-color-error-200)",    border: "var(--base-color-error-300)"   },
  late:    { bg: "var(--base-color-warning-50)",   border: "var(--base-color-warning-100)" },
  leave:   { bg: "var(--base-color-blue-100)",     border: "var(--base-color-blue-400)"    },
}

const WEEK: { day: string; status: DayStatus }[] = [
  { day: "Mon", status: "present" },
  { day: "Tue", status: "present" },
  { day: "Wed", status: "present" },
  { day: "Thu", status: "absent"  },
  { day: "Fri", status: "present" },
  { day: "Sat", status: "absent"  },
  { day: "Sun", status: "absent"  },
]

const STATUS_SYMBOL: Record<DayStatus, string> = {
  present: "✓",
  absent:  "✕",
  late:    "⏱",
  leave:   "✈",
}

function WeekStrip() {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {WEEK.map(({ day, status }) => {
        const colors = DAY_COLORS[status]
        return (
          <div
            key={day}
            style={{
              flex: 1,
              aspectRatio: "1",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: `1px solid ${colors.border}`,
              borderRadius: 6,
              backgroundColor: colors.bg,
              gap: 2,
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 600, color: t.text, fontFamily: "var(--font-sans)" }}>{day}</span>
            <span style={{ fontSize: 9, color: t.textSec, fontFamily: "var(--font-sans)" }}>{STATUS_SYMBOL[status]}</span>
          </div>
        )
      })}
    </div>
  )
}

// ─── Edit drawer ──────────────────────────────────────────────────────────────

const MARK_AS_OPTIONS = ["Present", "Absent", "On Leave", "Half-day", "Comp-off"]

interface EditDrawerProps {
  open: boolean
  onClose: () => void
  employee: { name: string; empId: string } | null
  bulkMode?: boolean
  bulkIndex?: number
  bulkTotal?: number
  onPrev?: () => void
  onNext?: () => void
}

function EditDrawer({
  open,
  onClose,
  employee,
  bulkMode = false,
  bulkIndex = 1,
  bulkTotal = 1,
  onPrev,
  onNext,
}: EditDrawerProps) {
  const [markAs, setMarkAs] = useState("On Leave")

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="w-[480px] sm:w-[520px] flex flex-col p-0 gap-0"
        showCloseButton={false}
      >
        {/* Header */}
        <SheetHeader className="px-5 py-4 border-b border-[var(--base-color-gray-300)] gap-1">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <SheetTitle className="text-sm font-semibold leading-tight">
                {employee?.name ?? "—"}
              </SheetTitle>
              <SheetDescription className="text-xs text-muted-foreground">
                {employee?.empId ?? "—"} · Manager Request
              </SheetDescription>
              {bulkMode && (
                <Badge variant="brand" size="sm" className="w-fit mt-1">
                  Bulk Review Mode — {bulkIndex} of {bulkTotal}
                </Badge>
              )}
              {!bulkMode && (
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                  <AlertTriangle size={12} style={{ color: "var(--base-color-warning-100)" }} />
                  <span style={{ fontSize: 11, color: "var(--base-color-gray-600)", fontFamily: "var(--font-sans)" }}>
                    Exception — System detected no check-in
                  </span>
                </div>
              )}
            </div>
            <Button variant="ghost" size="icon-sm" onClick={onClose}>
              <X size={16} />
            </Button>
          </div>
        </SheetHeader>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 16 }}>

          {/* System record */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 600, color: t.label, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--font-sans)", marginBottom: 6 }}>System Record</p>
            <div style={{
              padding: "10px 12px",
              border: `1px solid ${t.border}`,
              borderRadius: 8,
              backgroundColor: t.subtle,
              fontFamily: "var(--font-sans)",
              fontSize: 12,
              color: t.textSec,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: t.label }}>Date</span>
                <span style={{ fontWeight: 500 }}>2026-04-21</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: t.label }}>Shift</span>
                <span style={{ fontWeight: 500 }}>Morning</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: t.label }}>Expected hours</span>
                <span style={{ fontWeight: 500 }}>8h 00m</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: t.label }}>Detected</span>
                <Badge variant="warning" size="sm" dot>No check-in</Badge>
              </div>
            </div>
          </div>

          {/* 7-day strip */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 600, color: t.label, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--font-sans)", marginBottom: 6 }}>7-Day Pattern</p>
            <WeekStrip />
          </div>

          {/* Mark as */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 600, color: t.label, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--font-sans)", marginBottom: 6 }}>Mark as</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {MARK_AS_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setMarkAs(opt)}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 20,
                    border: `1px solid ${markAs === opt ? "var(--base-color-blue-800)" : t.border}`,
                    backgroundColor: markAs === opt ? "var(--base-color-blue-800)" : t.white,
                    color: markAs === opt ? "#fff" : t.textSec,
                    fontSize: 12,
                    fontFamily: "var(--font-sans)",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    fontWeight: markAs === opt ? 500 : 400,
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Reason */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 600, color: t.label, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--font-sans)", marginBottom: 6 }}>Reason (optional)</p>
            <Textarea placeholder="Explain the correction…" className="text-sm min-h-[72px]" />
          </div>

          {/* Upload */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 600, color: t.label, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--font-sans)", marginBottom: 6 }}>Supporting Document</p>
            <div style={{
              border: `1px dashed ${t.border}`,
              borderRadius: 8,
              padding: "14px 16px",
              textAlign: "center",
              cursor: "pointer",
              color: t.label,
              fontSize: 12,
              fontFamily: "var(--font-sans)",
              backgroundColor: t.subtle,
            }}>
              📎 Click to upload or drag & drop
            </div>
          </div>

          {/* Activity log */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 600, color: t.label, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--font-sans)", marginBottom: 6 }}>Activity Log</p>
            <div style={{ border: `1px solid ${t.border}`, borderRadius: 8, overflow: "hidden" }}>
              {[
                { time: "2026-04-21  10:45 AM", text: "System detected: No check-in recorded" },
                { time: "2026-04-21  11:20 AM", text: "Manager opened record for review" },
                { time: "2026-04-20  08:00 AM", text: "Shift started: Morning shift" },
              ].map((entry, i, arr) => (
                <div
                  key={i}
                  style={{
                    padding: "8px 12px",
                    borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : "none",
                    backgroundColor: t.white,
                  }}
                >
                  <p style={{ fontSize: 10, color: t.label, fontFamily: "var(--font-sans)", margin: 0, marginBottom: 2, letterSpacing: "0.03em" }}>{entry.time}</p>
                  <p style={{ fontSize: 12, color: t.textSec, fontFamily: "var(--font-sans)", margin: 0 }}>{entry.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <SheetFooter style={{ borderTop: `1px solid ${t.border}`, padding: "12px 20px", display: "flex", flexDirection: "row", alignItems: "center", gap: 8, marginTop: 0 }}>
          {bulkMode && (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Button variant="outline" size="sm" onClick={onPrev} disabled={bulkIndex <= 1}>
                <ChevronLeft size={14} />
                Prev
              </Button>
              <span style={{ fontSize: 11, color: t.label, fontFamily: "var(--font-sans)", minWidth: 36, textAlign: "center" }}>{bulkIndex} of {bulkTotal}</span>
              <Button variant="outline" size="sm" onClick={onNext} disabled={bulkIndex >= bulkTotal}>
                Next
                <ChevronRight size={14} />
              </Button>
            </div>
          )}
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            {bulkMode && <Button variant="outline" size="sm">Skip</Button>}
            {bulkMode
              ? <Button size="sm"><CheckCircle2 size={14} /> Save & Approve</Button>
              : (
                <>
                  <Button size="sm"><CheckCircle2 size={14} /> Approve</Button>
                  <Button variant="outline" size="sm">Save</Button>
                </>
              )
            }
            <Button variant="ghost" size="sm" onClick={onClose}>
              {bulkMode ? "Cancel bulk" : "Cancel"}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

// ─── Work Queue table ─────────────────────────────────────────────────────────

const COL_WIDTHS = "40px 1fr 100px 130px 100px 100px 80px 80px 70px"

function TableHeader({
  allChecked,
  someChecked,
  onToggleAll,
}: {
  allChecked: boolean
  someChecked: boolean
  onToggleAll: () => void
}) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: COL_WIDTHS,
      gap: 8,
      padding: "8px 16px",
      backgroundColor: t.subtle,
      borderBottom: `1px solid ${t.border}`,
      alignItems: "center",
      flexShrink: 0,
    }}>
      <Checkbox
        checked={allChecked ? true : someChecked ? "indeterminate" : false}
        onCheckedChange={onToggleAll}
      />
      {["Name & ID", "Shift", "Status", "Check-in", "Check-out", "Hours", "Type", "Action"].map((col) => (
        <span key={col} style={{
          fontSize: 10,
          fontWeight: 600,
          color: t.label,
          fontFamily: "var(--font-sans)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}>
          {col}
        </span>
      ))}
    </div>
  )
}

function TableRow({
  row,
  selected,
  onToggle,
  onEdit,
}: {
  row: QueueRow
  selected: boolean
  onToggle: () => void
  onEdit: () => void
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: COL_WIDTHS,
        gap: 8,
        padding: "8px 16px",
        borderBottom: `1px solid ${t.border}`,
        alignItems: "center",
        backgroundColor: selected ? "var(--base-color-blue-100)" : t.white,
        borderLeft: `3px solid ${selected ? "var(--base-color-blue-800)" : "transparent"}`,
        transition: "background 0.15s",
        cursor: "pointer",
      }}
      onClick={onToggle}
    >
      <Checkbox
        checked={selected}
        onCheckedChange={onToggle}
        onClick={(e) => e.stopPropagation()}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: t.text, fontFamily: "var(--font-sans)" }}>{row.name}</span>
        <span style={{ fontSize: 10, color: t.label, fontFamily: "var(--font-sans)", letterSpacing: "0.04em" }}>{row.empId}</span>
      </div>
      <span style={{ fontSize: 12, color: t.textSec, fontFamily: "var(--font-sans)" }}>{row.shift}</span>
      <StatusChip status={row.status} />
      <span style={{ fontSize: 12, color: t.textSec, fontFamily: "var(--font-sans)" }}>{row.checkIn}</span>
      <span style={{ fontSize: 12, color: t.textSec, fontFamily: "var(--font-sans)" }}>{row.checkOut}</span>
      <span style={{ fontSize: 12, fontWeight: 500, color: row.hours === "—" ? t.muted : t.text, fontFamily: "var(--font-sans)" }}>{row.hours}</span>
      <TypeBadge type={row.type} />
      <Button
        variant="outline"
        size="xs"
        onClick={(e) => { e.stopPropagation(); onEdit() }}
      >
        Edit
      </Button>
    </div>
  )
}

// ─── Bulk action bar ──────────────────────────────────────────────────────────

function BulkActionBar({
  count,
  onApproveAll,
  onReviewApprove,
  onClear,
}: {
  count: number
  onApproveAll: () => void
  onReviewApprove: () => void
  onClear: () => void
}) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "8px 16px",
      borderBottom: `1px solid var(--base-color-error-200)`,
      backgroundColor: "var(--base-color-error-200)",
      flexShrink: 0,
    }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: t.text, fontFamily: "var(--font-sans)" }}>
        {count} row{count !== 1 ? "s" : ""} selected
      </span>
      <Separator orientation="vertical" style={{ height: 16 }} />
      <Button size="xs" onClick={onApproveAll}>
        <CheckCheck size={12} />
        Approve all
      </Button>
      <Button variant="outline" size="xs" onClick={onReviewApprove}>
        <LayoutList size={12} />
        Review & approve
      </Button>
      <Button variant="ghost" size="xs" onClick={onClear}>
        <X size={12} />
        Clear selection
      </Button>
    </div>
  )
}

// ─── C1: Work Queue Main View ─────────────────────────────────────────────────

function WorkQueueMainView() {
  const [activeDept, setActiveDept]     = useState("Security")
  const [selected, setSelected]         = useState<number[]>([])
  const [drawerOpen, setDrawerOpen]     = useState(false)
  const [drawerEmployee, setDrawerEmployee] = useState<{ name: string; empId: string } | null>(null)
  const [modalOpen, setModalOpen]       = useState(false)
  const [approved, setApproved]         = useState<number[]>([])

  const rows = QUEUE_ROWS.filter((r) => !approved.includes(r.id))
  const allSelected = rows.length > 0 && rows.every((r) => selected.includes(r.id))
  const someSelected = selected.length > 0 && !allSelected

  const toggleAll = () => setSelected(allSelected ? [] : rows.map((r) => r.id))
  const toggleRow = (id: number) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  const openEdit = (row: QueueRow) => {
    setDrawerEmployee({ name: row.name, empId: row.empId })
    setDrawerOpen(true)
  }

  const confirmApprove = () => {
    setApproved((a) => [...a, ...selected])
    setSelected([])
    setModalOpen(false)
  }

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", overflow: "hidden", fontFamily: "var(--font-sans)", backgroundColor: t.bg }}>
      <SidebarNav
        logo={<Logo />}
        sections={NAV_SECTIONS.map((section, si) => ({
          ...section,
          items: section.items.map((item, ii) => ({
            ...item,
            active: si === 0 && ii === 1, // Work queue is active
          })),
        }))}
        footer={<UserFooter />}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Topbar />
        <FilterBar />

        {/* Master-detail */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          <DepartmentPanel activeDept={activeDept} onSelect={setActiveDept} />

          {/* Detail panel */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", backgroundColor: t.white }}>

            {/* Detail header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 16px",
              borderBottom: `1px solid ${t.border}`,
              flexShrink: 0,
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: t.text, fontFamily: "var(--font-sans)" }}>
                  {activeDept} Department — {rows.length} items need action
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Button variant="outline" size="xs"><FileDown size={12} /> PDF</Button>
                <Button variant="outline" size="xs"><Table2 size={12} /> Excel</Button>
                <div style={{ display: "flex", gap: 4 }}>
                  <Select defaultValue="name">
                    <SelectTrigger className="h-7 text-xs w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Search by: Name</SelectItem>
                      <SelectItem value="status">Search by: Status</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Search…" className="h-7 text-xs w-[160px]" prefixIcon={<Search />} />
                </div>
              </div>
            </div>

            {/* Bulk action bar (conditional) */}
            {selected.length > 0 && (
              <BulkActionBar
                count={selected.length}
                onApproveAll={() => setModalOpen(true)}
                onReviewApprove={() => {}}
                onClear={() => setSelected([])}
              />
            )}

            {/* Table */}
            <TableHeader
              allChecked={allSelected}
              someChecked={someSelected}
              onToggleAll={toggleAll}
            />
            <div style={{ flex: 1, overflowY: "auto" }}>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  row={row}
                  selected={selected.includes(row.id)}
                  onToggle={() => toggleRow(row.id)}
                  onEdit={() => openEdit(row)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 16px",
              borderTop: `1px solid ${t.border}`,
              flexShrink: 0,
              backgroundColor: t.white,
            }}>
              <span style={{ fontSize: 11, color: t.label, fontFamily: "var(--font-sans)" }}>
                Showing 1–{rows.length} of {rows.length} items
              </span>
              <div style={{ display: "flex", gap: 4 }}>
                <Button variant="outline" size="icon-xs" disabled><ChevronLeft size={12} /></Button>
                <Button size="icon-xs">1</Button>
                <Button variant="outline" size="icon-xs">2</Button>
                <Button variant="outline" size="icon-xs"><ChevronRight size={12} /></Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit drawer */}
      <EditDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        employee={drawerEmployee}
      />

      {/* Approve all confirmation modal */}
      <AlertDialog open={modalOpen} onOpenChange={setModalOpen}>
        <AlertDialogContent size="default">
          <AlertDialogHeader>
            <AlertDialogTitle>Approve {selected.length} attendance corrections?</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div>
                <p style={{ fontSize: 12, color: t.label, fontFamily: "var(--font-sans)", marginBottom: 8 }}>
                  The following {selected.length} records will be updated:
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                  {QUEUE_ROWS.filter((r) => selected.includes(r.id)).map((r) => (
                    <li key={r.id} style={{ fontSize: 12, fontFamily: "var(--font-sans)", color: t.textSec, paddingLeft: 12, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: t.muted }}>·</span>
                      <strong>{r.name}</strong> — marking as On Leave
                    </li>
                  ))}
                </ul>
                <div style={{
                  marginTop: 12,
                  padding: "8px 12px",
                  backgroundColor: t.subtle,
                  borderLeft: `3px solid var(--base-color-blue-800)`,
                  borderRadius: 4,
                  fontSize: 12,
                  fontFamily: "var(--font-sans)",
                  color: t.textSec,
                }}>
                  ⓘ This will update all {selected.length} records. This action can be reviewed in the Activity log.
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmApprove}>
              <CheckCircle2 size={14} />
              Confirm &amp; approve all
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

// ─── C2: Bulk Review Mode ─────────────────────────────────────────────────────

const BULK_ROWS = [QUEUE_ROWS[0], QUEUE_ROWS[4], QUEUE_ROWS[8]] // Priya, Fatima, Deepa

function BulkReviewView() {
  const [bulkIndex, setBulkIndex]     = useState(1)
  const [selected]                    = useState(BULK_ROWS.map((r) => r.id))
  const [drawerOpen, setDrawerOpen]   = useState(true)
  const [modalOpen, setModalOpen]     = useState(false)

  const currentEmployee = BULK_ROWS[bulkIndex - 1]

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", overflow: "hidden", fontFamily: "var(--font-sans)", backgroundColor: t.bg }}>
      <SidebarNav
        logo={<Logo />}
        sections={NAV_SECTIONS.map((section, si) => ({
          ...section,
          items: section.items.map((item, ii) => ({
            ...item,
            active: si === 0 && ii === 1,
          })),
        }))}
        footer={<UserFooter />}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Topbar />
        <FilterBar />

        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          <DepartmentPanel activeDept="Security" onSelect={() => {}} />

          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", backgroundColor: t.white, opacity: drawerOpen ? 0.4 : 1, transition: "opacity 0.2s" }}>
            <BulkActionBar
              count={selected.length}
              onApproveAll={() => setModalOpen(true)}
              onReviewApprove={() => setDrawerOpen(true)}
              onClear={() => {}}
            />
            <TableHeader allChecked someChecked={false} onToggleAll={() => {}} />
            <div style={{ flex: 1, overflowY: "auto" }}>
              {BULK_ROWS.map((row, i) => (
                <TableRow
                  key={row.id}
                  row={row}
                  selected
                  onToggle={() => {}}
                  onEdit={() => { setBulkIndex(i + 1); setDrawerOpen(true) }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <EditDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        employee={{ name: currentEmployee.name, empId: currentEmployee.empId }}
        bulkMode
        bulkIndex={bulkIndex}
        bulkTotal={BULK_ROWS.length}
        onPrev={() => setBulkIndex((i) => Math.max(1, i - 1))}
        onNext={() => setBulkIndex((i) => Math.min(BULK_ROWS.length, i + 1))}
      />

      <AlertDialog open={modalOpen} onOpenChange={setModalOpen}>
        <AlertDialogContent size="default">
          <AlertDialogHeader>
            <AlertDialogTitle>Approve {selected.length} attendance corrections?</AlertDialogTitle>
            <AlertDialogDescription>
              This will approve and update all {selected.length} selected records. This action can be reviewed in the Activity log.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => setModalOpen(false)}>
              <CheckCircle2 size={14} />
              Confirm &amp; approve all
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

// ─── C3: Single edit drawer view ──────────────────────────────────────────────

function SingleDrawerView() {
  const [drawerOpen, setDrawerOpen] = useState(true)

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", overflow: "hidden", fontFamily: "var(--font-sans)", backgroundColor: t.bg }}>
      <SidebarNav
        logo={<Logo />}
        sections={NAV_SECTIONS.map((section, si) => ({
          ...section,
          items: section.items.map((item, ii) => ({
            ...item,
            active: si === 0 && ii === 1,
          })),
        }))}
        footer={<UserFooter />}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", opacity: drawerOpen ? 0.35 : 1, transition: "opacity 0.2s" }}>
        <Topbar />
        <FilterBar />
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          <DepartmentPanel activeDept="Security" onSelect={() => {}} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", backgroundColor: t.white }}>
            <TableHeader allChecked={false} someChecked={false} onToggleAll={() => {}} />
            <div style={{ flex: 1, overflowY: "auto" }}>
              {QUEUE_ROWS.slice(0, 5).map((row, i) => (
                <TableRow
                  key={row.id}
                  row={row}
                  selected={i === 0}
                  onToggle={() => {}}
                  onEdit={() => setDrawerOpen(true)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <EditDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        employee={{ name: QUEUE_ROWS[0].name, empId: QUEUE_ROWS[0].empId }}
      />
    </div>
  )
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Wireframes/AttendanceWorkQueue",
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
  },
}
export default meta
type Story = StoryObj

export const WorkQueueMain: Story = {
  name: "C1 · Work Queue — Main View",
  render: () => <WorkQueueMainView />,
}

export const BulkApproveReview: Story = {
  name: "C2 · Bulk Approve — Review Mode",
  render: () => <BulkReviewView />,
}

export const EditDrawerSingle: Story = {
  name: "C3 · Edit Drawer — Single Record",
  render: () => <SingleDrawerView />,
}
