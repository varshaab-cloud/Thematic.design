"use client"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import React, { useState, useEffect } from "react"
import {
  LayoutDashboard,
  Settings,
  Users,
  Plus,
  UserPlus,
  FileText,
  FolderOpen,
  Search,
} from "lucide-react"
import { CommandPalette, CommandItem } from "../../components/ui/command-palette"

const meta: Meta<typeof CommandPalette> = {
  title: "Navigation/CommandPalette",
  component: CommandPalette,
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof CommandPalette>

// ─── Shared items ─────────────────────────────────────────────────────────────

const sampleItems: CommandItem[] = [
  // Pages
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Overview and key metrics",
    icon: <LayoutDashboard />,
    shortcut: "⌘D",
    group: "Pages",
    onSelect: () => {},
  },
  {
    id: "settings",
    label: "Settings",
    description: "Account and workspace settings",
    icon: <Settings />,
    shortcut: "⌘,",
    group: "Pages",
    onSelect: () => {},
  },
  {
    id: "users",
    label: "Users",
    description: "Manage team members",
    icon: <Users />,
    group: "Pages",
    onSelect: () => {},
  },
  // Actions
  {
    id: "new-project",
    label: "New Project",
    description: "Create a new project",
    icon: <Plus />,
    shortcut: "⌘N",
    group: "Actions",
    onSelect: () => {},
  },
  {
    id: "invite-member",
    label: "Invite Member",
    description: "Add a teammate to your workspace",
    icon: <UserPlus />,
    group: "Actions",
    onSelect: () => {},
  },
  // Recent
  {
    id: "recent-1",
    label: "Q4 2024 Roadmap.pdf",
    description: "Edited 2 hours ago",
    icon: <FileText />,
    group: "Recent",
    onSelect: () => {},
  },
  {
    id: "recent-2",
    label: "Design system audit.fig",
    description: "Edited yesterday",
    icon: <FolderOpen />,
    group: "Recent",
    onSelect: () => {},
  },
  {
    id: "recent-3",
    label: "Sprint 12 planning notes.docx",
    description: "Edited 3 days ago",
    icon: <FileText />,
    group: "Recent",
    onSelect: () => {},
  },
]

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <div className="min-h-screen bg-[var(--base-color-gray-100)] relative">
        <div className="p-6 text-sm text-[var(--base-color-gray-500)]">
          Page content behind the palette
        </div>
        <CommandPalette
          open={open}
          onOpenChange={setOpen}
          items={sampleItems}
          placeholder="Search pages, actions, files…"
        />
      </div>
    )
  },
}

// ─── WithTrigger ──────────────────────────────────────────────────────────────

export const WithTrigger: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
      function onKeyDown(e: KeyboardEvent) {
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
          e.preventDefault()
          setOpen((o) => !o)
        }
      }
      window.addEventListener("keydown", onKeyDown)
      return () => window.removeEventListener("keydown", onKeyDown)
    }, [])

    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-4 bg-[var(--base-color-gray-100)]">
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-[var(--base-radius-md)] border border-[var(--base-color-gray-200)] bg-white text-sm text-[var(--base-color-gray-700)] shadow-sm hover:bg-[var(--base-color-gray-50)] transition-colors"
          >
            <Search style={{ width: 14, height: 14 }} />
            Search…
            <kbd className="ml-2 text-[10px] border border-[var(--base-color-gray-200)] rounded px-1 py-0.5 text-[var(--base-color-gray-400)]">⌘K</kbd>
          </button>
          <p className="text-xs text-[var(--base-color-gray-400)]">
            Click the button above or press <kbd className="border border-[var(--base-color-gray-200)] rounded px-1">⌘K</kbd> to open the command palette.
          </p>
        </div>

        <CommandPalette
          open={open}
          onOpenChange={setOpen}
          items={sampleItems}
          placeholder="Search pages, actions, files…"
        />
      </div>
    )
  },
}

// ─── Empty ────────────────────────────────────────────────────────────────────

export const Empty: Story = {
  render: () => {
    const [open, setOpen] = useState(true)

    // Items filtered to empty by pre-seeding the search — we achieve this by
    // passing items with no match for a query we know won't match.
    // We use a wrapper that shows with an initial search state.
    const noItems: CommandItem[] = []

    return (
      <div className="min-h-screen bg-[var(--base-color-gray-100)] relative">
        <div className="p-6 text-sm text-[var(--base-color-gray-500)]">
          Empty state — no results found
        </div>
        <CommandPalette
          open={open}
          onOpenChange={setOpen}
          items={noItems}
          placeholder="Type to search… (no results)"
        />
      </div>
    )
  },
}
