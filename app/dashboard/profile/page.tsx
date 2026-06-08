"use client"

import React, { useState } from "react"
import { User, Lock, Pencil, X, Check, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

// ─── Types ────────────────────────────────────────────────────────────────────

type Section = "Profile" | "Security"

const SECTIONS: { label: Section; icon: React.ReactNode }[] = [
  { label: "Profile",  icon: <User className="size-3.5" /> },
  { label: "Security", icon: <Lock className="size-3.5" /> },
]

interface ProfileData {
  firstName: string
  lastName:  string
  email:     string
  phone:     string
  gender:    string
  username:  string
  role:      string
  branch:    string
}

// ─── Read-only field ─────────────────────────────────────────────────────────

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-[var(--alias-color-text-subtle)] mb-0.5">{label}</p>
      <p className="text-sm text-[var(--alias-color-text-primary)] font-medium">
        {value || <span className="text-[var(--alias-color-text-subtle)] font-normal">—</span>}
      </p>
    </div>
  )
}

// ─── Profile Panel ────────────────────────────────────────────────────────────

function ProfilePanel() {
  const [profile, setProfile] = useState<ProfileData>({
    firstName: "Shwetha",
    lastName:  "Manager",
    email:     "shwetha.manager@safehalo.in",
    phone:     "",
    gender:    "",
    username:  "shwetha_manager",
    role:      "Manager",
    branch:    "Brookfield",
  })

  const [editing, setEditing] = useState(false)
  const [draft, setDraft]     = useState<ProfileData>(profile)
  const [saved, setSaved]     = useState(false)

  function startEdit() { setDraft(profile); setEditing(true) }
  function cancelEdit() { setEditing(false) }
  function saveProfile() {
    setProfile(draft)
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function set<K extends keyof ProfileData>(key: K, val: string) {
    setDraft(p => ({ ...p, [key]: val }))
  }

  const initials = `${profile.firstName[0] ?? ""}${profile.lastName[0] ?? ""}`.toUpperCase()

  return (
    <div className="flex flex-col gap-8">

      {/* Avatar + identity */}
      <div className="flex items-center gap-4">
        <div className="size-14 rounded-full bg-[var(--alias-color-feedback-warning-bg)] text-[var(--alias-color-feedback-warning-fg)] flex items-center justify-center text-lg font-semibold shrink-0">
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--alias-color-text-primary)]">
            {profile.firstName} {profile.lastName}
          </p>
          <p className="text-xs text-[var(--alias-color-text-secondary)] mt-0.5">
            {profile.role} — <span className="text-[var(--alias-color-text-subtle)]">@{profile.username}</span>
          </p>
          <p className="text-xs text-[var(--alias-color-text-subtle)]">{profile.branch}</p>
        </div>
      </div>

      <Separator />

      {/* Personal info */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-sm font-semibold text-[var(--alias-color-text-primary)]">Personal Information</p>
            <p className="text-xs text-[var(--alias-color-text-subtle)] mt-0.5">Update your name, contact details and display preferences.</p>
          </div>
          {!editing ? (
            <button
              onClick={startEdit}
              className="flex items-center gap-1.5 text-xs text-[var(--alias-color-text-brand)] hover:underline"
            >
              <Pencil className="size-3" /> Edit
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={cancelEdit}
                className="flex items-center gap-1 text-xs text-[var(--alias-color-text-subtle)] hover:text-[var(--alias-color-text-primary)] transition-colors"
              >
                <X className="size-3" /> Cancel
              </button>
              <Button size="sm" className="h-7 text-xs gap-1" onClick={saveProfile}>
                <Check className="size-3" /> Save
              </Button>
            </div>
          )}
        </div>

        {!editing ? (
          <div className="grid grid-cols-2 gap-x-10 gap-y-5">
            <Field label="First Name" value={profile.firstName} />
            <Field label="Last Name"  value={profile.lastName}  />
            <Field label="Email"      value={profile.email}     />
            <Field label="Phone"      value={profile.phone}     />
            <Field label="Gender"     value={profile.gender}    />
            <Field label="Username"   value={`@${profile.username}`} />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1.5">First Name</label>
                <Input value={draft.firstName} onChange={e => set("firstName", e.target.value)} className="h-9 text-sm" />
              </div>
              <div>
                <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1.5">Last Name</label>
                <Input value={draft.lastName} onChange={e => set("lastName", e.target.value)} className="h-9 text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1.5">Email</label>
              <Input type="email" value={draft.email} onChange={e => set("email", e.target.value)} className="h-9 text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1.5">Phone</label>
                <Input type="tel" value={draft.phone} onChange={e => set("phone", e.target.value)} placeholder="10-digit number" className="h-9 text-sm" />
              </div>
              <div>
                <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1.5">Gender</label>
                <Select value={draft.gender} onValueChange={v => set("gender", v)}>
                  <SelectTrigger className="h-9 text-sm w-full">
                    <SelectValue placeholder="— Select —" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>

      {saved && (
        <p className="flex items-center gap-1.5 text-xs text-[var(--alias-color-feedback-success-fg)] font-medium -mt-4">
          <Check className="size-3.5" /> Profile saved
        </p>
      )}

    </div>
  )
}

// ─── Security Panel ───────────────────────────────────────────────────────────

function SecurityPanel() {
  const [currentPw,  setCurrentPw]  = useState("")
  const [newPw,      setNewPw]      = useState("")
  const [confirmPw,  setConfirmPw]  = useState("")
  const [showCur,    setShowCur]    = useState(false)
  const [showNew,    setShowNew]    = useState(false)
  const [showConf,   setShowConf]   = useState(false)
  const [pwSaved,    setPwSaved]    = useState(false)

  const pwValid = newPw.length >= 6 && newPw === confirmPw

  function handleUpdate() {
    if (!currentPw || !pwValid) return
    setCurrentPw(""); setNewPw(""); setConfirmPw("")
    setPwSaved(true)
    setTimeout(() => setPwSaved(false), 3000)
  }

  function PasswordInput({
    label, value, onChange, show, onToggle, placeholder,
  }: {
    label: string; value: string; onChange: (v: string) => void
    show: boolean; onToggle: () => void; placeholder?: string
  }) {
    return (
      <div>
        <label className="block text-xs text-[var(--alias-color-text-secondary)] mb-1.5">{label}</label>
        <div className="relative">
          <Input
            type={show ? "text" : "password"}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            className="h-9 text-sm pr-10"
          />
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--alias-color-text-subtle)] hover:text-[var(--alias-color-text-secondary)] transition-colors"
          >
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-sm font-semibold text-[var(--alias-color-text-primary)]">Change Password</p>
        <p className="text-xs text-[var(--alias-color-text-subtle)] mt-0.5">
          Choose something strong and don't reuse passwords from other sites.
        </p>
      </div>

      <Separator />

      <div className="flex flex-col gap-4 max-w-sm">
        <PasswordInput
          label="Current Password"
          value={currentPw} onChange={setCurrentPw}
          show={showCur} onToggle={() => setShowCur(v => !v)}
          placeholder="Enter current password"
        />
        <PasswordInput
          label="New Password"
          value={newPw} onChange={setNewPw}
          show={showNew} onToggle={() => setShowNew(v => !v)}
          placeholder="Min. 6 characters"
        />
        <div>
          <PasswordInput
            label="Confirm New Password"
            value={confirmPw} onChange={setConfirmPw}
            show={showConf} onToggle={() => setShowConf(v => !v)}
            placeholder="Repeat new password"
          />
          {confirmPw && newPw !== confirmPw && (
            <p className="text-[11px] text-[var(--alias-color-feedback-error-fg)] mt-1">Passwords do not match</p>
          )}
        </div>

        <div className="flex items-center gap-3 pt-1">
          <Button onClick={handleUpdate} disabled={!currentPw || !pwValid}>
            Update Password
          </Button>
          {pwSaved && (
            <span className="flex items-center gap-1 text-xs text-[var(--alias-color-feedback-success-fg)] font-medium">
              <Check className="size-3.5" /> Password updated
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const [active, setActive] = useState<Section>("Profile")

  return (
    <>
      {/* Header */}
      <header className="h-14 shrink-0 border-b border-[var(--alias-color-border-subtle)] bg-white flex items-center px-6">
        <div>
          <p className="text-sm font-semibold text-[var(--alias-color-text-primary)]">Account</p>
          <p className="text-[11px] text-[var(--alias-color-text-subtle)]">Manage your profile and security settings</p>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* Sub-nav */}
        <nav className="w-44 shrink-0 border-r border-[var(--alias-color-border-subtle)] bg-[var(--alias-color-background-secondary)] p-3 flex flex-col gap-0.5 overflow-y-auto">
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
                    : "text-[var(--alias-color-text-secondary)] hover:bg-[var(--alias-color-background-tertiary)] hover:text-[var(--alias-color-text-primary)]",
                ].join(" ")}
              >
                <span className={isActive ? "text-[var(--base-color-blue-800)]" : "text-[var(--alias-color-text-subtle)]"}>
                  {s.icon}
                </span>
                {s.label}
              </button>
            )
          })}
        </nav>

        {/* Panel */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-xl px-10 pt-8 pb-16">
            {active === "Profile"  && <ProfilePanel />}
            {active === "Security" && <SecurityPanel />}
          </div>
        </div>

      </div>
    </>
  )
}
