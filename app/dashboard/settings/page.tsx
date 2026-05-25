"use client"

import React, { useState } from "react"
import {
  Building2,
  Users,
  CreditCard,
  Plug,
  ShieldCheck,
  Bell,
  Upload,
  AlertTriangle,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

// ─── Sub-nav sections ─────────────────────────────────────────────────────────

type Section = "General" | "Members" | "Billing" | "Integrations" | "Security" | "Notifications"

const SECTIONS: { label: Section; icon: React.ReactNode }[] = [
  { label: "General",       icon: <Building2 className="size-3.5" /> },
  { label: "Members",       icon: <Users className="size-3.5" /> },
  { label: "Billing",       icon: <CreditCard className="size-3.5" /> },
  { label: "Integrations",  icon: <Plug className="size-3.5" /> },
  { label: "Security",      icon: <ShieldCheck className="size-3.5" /> },
  { label: "Notifications", icon: <Bell className="size-3.5" /> },
]

// ─── Shared sub-components ────────────────────────────────────────────────────

function SectionHeading({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-5">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
    </div>
  )
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-sm font-medium text-foreground">{children}</label>
  )
}

function ToggleRow({
  label,
  description,
  defaultChecked = true,
}: {
  label: string
  description: string
  defaultChecked?: boolean
}) {
  const [checked, setChecked] = useState(defaultChecked)
  return (
    <div className="flex items-start justify-between gap-6">
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={setChecked} className="mt-0.5 shrink-0" />
    </div>
  )
}

// ─── General panel ────────────────────────────────────────────────────────────

function GeneralPanel() {
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="flex flex-col gap-8">

      {/* Workspace identity */}
      <div>
        <SectionHeading
          title="Workspace identity"
          description="Your workspace name and URL appear across Thematic and in shared links."
        />
        <div className="flex flex-col gap-4">

          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-[var(--base-color-gray-75)] border border-[var(--base-color-gray-200)] flex items-center justify-center shrink-0">
              <div className="w-8 h-8 rounded-lg bg-[var(--base-color-blue-800)] flex items-center justify-center">
                <span className="text-white text-[11px] font-bold">T</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Button variant="outline" size="sm">
                <Upload className="size-3.5" />
                Upload logo
              </Button>
              <p className="text-[11px] text-muted-foreground">PNG, JPG or SVG · max 1 MB · 512×512 px</p>
            </div>
          </div>

          <Input
            label="Workspace name"
            defaultValue="Acme Design System"
            helperText="This is your team's display name."
          />
          <Input
            label="Workspace URL"
            defaultValue="acme"
            helperText="thematic.design/acme — cannot be changed after setup."
          />
          <div className="flex flex-col gap-1.5">
            <FieldLabel>Description</FieldLabel>
            <Textarea
              placeholder="What is this workspace for?"
              defaultValue="Our enterprise design system for all product teams."
              rows={3}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">Shown on your public workspace page.</p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Preferences */}
      <div>
        <SectionHeading
          title="Preferences"
          description="Localisation and display settings applied across your workspace."
        />
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <FieldLabel>Timezone</FieldLabel>
              <Select defaultValue="utc_plus5_30">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC+0 — London</SelectItem>
                  <SelectItem value="utc_plus5_30">UTC+5:30 — Mumbai</SelectItem>
                  <SelectItem value="utc_minus5">UTC−5 — New York</SelectItem>
                  <SelectItem value="utc_plus9">UTC+9 — Tokyo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <FieldLabel>Language</FieldLabel>
              <Select defaultValue="en">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="ja">日本語</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <FieldLabel>Date format</FieldLabel>
            <RadioGroup defaultValue="dmy" className="flex gap-5">
              {[
                { value: "mdy", label: "MM/DD/YYYY" },
                { value: "dmy", label: "DD/MM/YYYY" },
                { value: "ymd", label: "YYYY-MM-DD" },
              ].map(opt => (
                <div key={opt.value} className="flex items-center gap-2">
                  <RadioGroupItem value={opt.value} id={`df-${opt.value}`} />
                  <label htmlFor={`df-${opt.value}`} className="text-sm text-foreground cursor-pointer">
                    {opt.label}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>

      <Separator />

      {/* Danger zone */}
      <div>
        <SectionHeading
          title="Danger zone"
          description="These actions are permanent and cannot be reversed."
        />
        <div className="rounded-xl border border-[var(--base-color-error-300)]/40 bg-[var(--base-color-error-200)]/20 p-4">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="size-4 text-[var(--base-color-error-300)] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[var(--base-color-error-300)]">Delete this workspace</p>
              <p className="text-xs text-[var(--base-color-error-300)]/80 mt-0.5">
                All members, projects, tokens, and data will be permanently deleted. This cannot be undone.
              </p>
            </div>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <AlertTriangle className="size-3.5" />
                Delete workspace
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete workspace?</AlertDialogTitle>
                <AlertDialogDescription>
                  All data — members, projects, design tokens, and billing — will be permanently erased.
                  Type your workspace name to confirm.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <Input placeholder="acme" className="mt-2" />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-white hover:bg-destructive/90">
                  Delete permanently
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Save bar */}
      <div className="flex items-center justify-end gap-3 pt-2 pb-6">
        {saved && (
          <span className="flex items-center gap-1.5 text-xs text-[var(--base-color-green-800)] font-medium">
            <Check className="size-3.5" />
            Saved
          </span>
        )}
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave}>Save changes</Button>
      </div>

    </div>
  )
}

// ─── Notifications panel ──────────────────────────────────────────────────────

function NotificationsPanel() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <SectionHeading
          title="Email notifications"
          description="Control which emails Thematic sends to your inbox."
        />
        <div className="flex flex-col gap-5">
          <ToggleRow label="Team activity digest"   description="Daily summary of workspace activity sent each morning." defaultChecked />
          <Separator />
          <ToggleRow label="New member joins"        description="Notify me when someone accepts an invitation."         defaultChecked />
          <Separator />
          <ToggleRow label="Project status changes"  description="Get notified when a project moves to a new status."    defaultChecked={false} />
          <Separator />
          <ToggleRow label="Billing & invoices"      description="Receipts, payment failures, and subscription changes." defaultChecked />
          <Separator />
          <ToggleRow label="Product updates"         description="New features and release notes from Thematic."         defaultChecked={false} />
        </div>
      </div>

      <Separator />

      <div>
        <SectionHeading
          title="In-app notifications"
          description="Banners and badges shown inside Thematic."
        />
        <div className="flex flex-col gap-5">
          <ToggleRow label="Mentions"       description="When someone @mentions you in a comment or thread." defaultChecked />
          <Separator />
          <ToggleRow label="Assigned to me" description="Tasks or reviews assigned directly to you."         defaultChecked />
          <Separator />
          <ToggleRow label="Comments"       description="Replies on threads you've participated in."          defaultChecked={false} />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2 pb-6">
        <Button variant="outline">Cancel</Button>
        <Button>Save preferences</Button>
      </div>
    </div>
  )
}

// ─── Members panel (quick overview) ──────────────────────────────────────────

function MembersPanel() {
  const members = [
    { initials: "VS", name: "Varsha S.",    email: "varsha@thematic.io",  role: "Admin",  color: "#C4C5F4", you: true },
    { initials: "PS", name: "Priya Sharma", email: "priya@acme.io",       role: "Admin",  color: "#DCFCE7" },
    { initials: "JL", name: "James Lee",    email: "james@acme.io",       role: "Member", color: "#FEF9C3" },
    { initials: "TN", name: "Tom Nguyen",   email: "tom@acme.io",         role: "Viewer", color: "#E0E7FF" },
  ]
  return (
    <div className="flex flex-col gap-5">
      <SectionHeading
        title="Workspace members"
        description="People with access to this workspace."
      />
      <Alert>
        <AlertDescription>
          To invite new members or change roles, go to the <strong>Team</strong> page.
        </AlertDescription>
      </Alert>
      <div className="rounded-xl border border-[var(--base-color-gray-200)] overflow-hidden bg-white">
        {members.map((m, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-4 py-3 border-b border-[var(--base-color-gray-200)] last:border-0"
          >
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className="text-[10px] font-semibold" style={{ backgroundColor: m.color }}>
                {m.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-medium text-foreground">{m.name}</p>
                {m.you && <Badge variant="info" size="sm">You</Badge>}
              </div>
              <p className="text-[11px] text-muted-foreground">{m.email}</p>
            </div>
            <Badge variant="outline" size="sm">{m.role}</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Placeholder panel ────────────────────────────────────────────────────────

function PlaceholderPanel({ section }: { section: Section }) {
  const icons: Record<Section, React.ReactNode> = {
    General:       <Building2 className="size-5" />,
    Members:       <Users className="size-5" />,
    Billing:       <CreditCard className="size-5" />,
    Integrations:  <Plug className="size-5" />,
    Security:      <ShieldCheck className="size-5" />,
    Notifications: <Bell className="size-5" />,
  }
  return (
    <div className="flex flex-col items-center justify-center gap-3 h-72 text-center">
      <div className="w-12 h-12 rounded-2xl bg-[var(--base-color-gray-75)] border border-[var(--base-color-gray-200)] flex items-center justify-center text-muted-foreground">
        {icons[section]}
      </div>
      <p className="text-sm font-medium text-muted-foreground">{section} settings</p>
      <p className="text-xs text-muted-foreground max-w-48">
        Connect your data source or configure {section.toLowerCase()} options here.
      </p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [active, setActive] = useState<Section>("General")

  return (
    <>
      {/* Header */}
      <header className="h-14 shrink-0 border-b border-[var(--base-color-gray-200)] bg-white flex items-center px-6">
        <div>
          <p className="text-sm font-semibold text-foreground">Settings</p>
          <p className="text-[11px] text-muted-foreground">Workspace configuration and preferences</p>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* Settings sub-nav */}
        <nav className="w-48 shrink-0 border-r border-[var(--base-color-gray-200)] bg-[var(--base-color-gray-75)] p-3 flex flex-col gap-0.5 overflow-y-auto">
          {SECTIONS.map(s => {
            const isActive = s.label === active
            return (
              <button
                key={s.label}
                onClick={() => setActive(s.label)}
                className={[
                  "flex items-center gap-2 h-8 px-2.5 rounded-md text-xs transition-colors w-full text-left",
                  isActive
                    ? "bg-[var(--base-color-blue-100)] text-[var(--base-color-blue-800)] font-medium"
                    : "text-muted-foreground hover:bg-[var(--base-color-gray-200)] hover:text-foreground",
                ].join(" ")}
              >
                <span className={isActive ? "text-[var(--base-color-blue-800)]" : "text-[var(--base-color-gray-500)]"}>
                  {s.icon}
                </span>
                {s.label}
                {s.label === "Billing" && (
                  <Badge variant="warning" size="sm" className="ml-auto">Pro</Badge>
                )}
              </button>
            )
          })}
        </nav>

        {/* Panel content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl px-10 pt-8">
            {active === "General"       && <GeneralPanel />}
            {active === "Notifications" && <NotificationsPanel />}
            {active === "Members"       && <MembersPanel />}
            {!["General", "Notifications", "Members"].includes(active) && (
              <PlaceholderPanel section={active} />
            )}
          </div>
        </div>

      </div>
    </>
  )
}
