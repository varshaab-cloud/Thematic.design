import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuShortcut,
} from "@/components/ui/context-menu"
import { FileText, FolderOpen, Copy, Pencil, Trash2, FolderInput, Inbox, Archive } from "lucide-react"

const meta: Meta = {
  title: "Overlays/ContextMenu",
  tags: ["!autodocs"],
  parameters: { layout: "centered" },
}
export default meta
type Story = StoryObj

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          className="flex h-36 w-64 cursor-context-menu flex-col items-center justify-center gap-2 rounded-[var(--base-radius-md)] border border-dashed border-[var(--base-color-gray-300)] bg-[var(--alias-color-background-secondary)] text-sm text-muted-foreground select-none"
        >
          <FileText className="size-6 text-[var(--base-color-gray-400)]" />
          <span>Right-click for options</span>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>File</ContextMenuLabel>
        <ContextMenuItem>
          <FolderOpen /> Open
        </ContextMenuItem>
        <ContextMenuItem>
          <Pencil /> Rename
          <ContextMenuShortcut>F2</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Copy /> Duplicate
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <FolderInput /> Move to
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <Trash2 /> Delete
          <ContextMenuShortcut>⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

// ─── WithSubmenus ─────────────────────────────────────────────────────────────

export const WithSubmenus: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          className="flex h-36 w-64 cursor-context-menu flex-col items-center justify-center gap-2 rounded-[var(--base-radius-md)] border border-dashed border-[var(--base-color-gray-300)] bg-[var(--alias-color-background-secondary)] text-sm text-muted-foreground select-none"
        >
          <FileText className="size-6 text-[var(--base-color-gray-400)]" />
          <span>Right-click for options</span>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>File</ContextMenuLabel>
        <ContextMenuItem>
          <FolderOpen /> Open
        </ContextMenuItem>
        <ContextMenuItem>
          <Pencil /> Rename
          <ContextMenuShortcut>F2</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Copy /> Duplicate
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <FolderInput /> Move to
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuLabel>Folders</ContextMenuLabel>
            <ContextMenuItem>
              <Inbox /> Inbox
            </ContextMenuItem>
            <ContextMenuItem>
              <Archive /> Archive
            </ContextMenuItem>
            <ContextMenuItem>
              <FolderOpen /> Projects
            </ContextMenuItem>
            <ContextMenuItem>
              <FolderOpen /> Shared
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <Trash2 /> Delete
          <ContextMenuShortcut>⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

// ─── WithCheckboxAndRadio ─────────────────────────────────────────────────────

export const WithCheckboxAndRadio: Story = {
  render: () => {
    const [showHidden, setShowHidden] = useState(false)
    const [showExtensions, setShowExtensions] = useState(true)
    const [viewMode, setViewMode] = useState("grid")

    return (
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div
            className="flex h-36 w-64 cursor-context-menu flex-col items-center justify-center gap-2 rounded-[var(--base-radius-md)] border border-dashed border-[var(--base-color-gray-300)] bg-[var(--alias-color-background-secondary)] text-sm text-muted-foreground select-none"
          >
            <FileText className="size-6 text-[var(--base-color-gray-400)]" />
            <span>Right-click for view options</span>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>View options</ContextMenuLabel>
          <ContextMenuCheckboxItem checked={showHidden} onCheckedChange={setShowHidden}>
            Show hidden files
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem checked={showExtensions} onCheckedChange={setShowExtensions}>
            Show file extensions
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuLabel>View mode</ContextMenuLabel>
          <ContextMenuRadioGroup value={viewMode} onValueChange={setViewMode}>
            <ContextMenuRadioItem value="grid">Grid</ContextMenuRadioItem>
            <ContextMenuRadioItem value="list">List</ContextMenuRadioItem>
            <ContextMenuRadioItem value="columns">Columns</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    )
  },
}
