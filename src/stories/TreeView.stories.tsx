import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TreeView, type TreeNodeData } from "@/components/ui/tree-view"
import { Folder, FolderOpen, File, FileText, Package, FileCode } from "lucide-react"

const meta: Meta = {
  title: "Data display/TreeView",
  tags: ["!autodocs"],
  parameters: { layout: "centered" },
}
export default meta
type Story = StoryObj

// ─── Default ──────────────────────────────────────────────────────────────────

const fileSystemData: TreeNodeData[] = [
  {
    id: "project",
    label: "Project",
    children: [
      {
        id: "src",
        label: "src",
        children: [
          {
            id: "components",
            label: "components",
            children: [
              { id: "button", label: "Button.tsx" },
              { id: "input", label: "Input.tsx" },
              { id: "card", label: "Card.tsx" },
            ],
          },
          {
            id: "stories",
            label: "stories",
            children: [
              { id: "button-story", label: "Button.stories.tsx" },
              { id: "input-story", label: "Input.stories.tsx" },
            ],
          },
        ],
      },
      {
        id: "public",
        label: "public",
        children: [
          { id: "favicon", label: "favicon.ico" },
          { id: "logo", label: "logo.svg" },
        ],
      },
      { id: "package-json", label: "package.json" },
      { id: "tsconfig", label: "tsconfig.json" },
    ],
  },
]

export const Default: Story = {
  render: () => (
    <div className="w-64 rounded-[var(--base-radius-md)] border border-[var(--base-color-gray-200)] bg-[var(--alias-color-background-primary)] p-2">
      <TreeView
        data={fileSystemData}
        defaultExpanded={["project", "src"]}
        defaultSelected="src"
      />
    </div>
  ),
}

// ─── WithIcons ────────────────────────────────────────────────────────────────

const fileSystemWithIcons: TreeNodeData[] = [
  {
    id: "project",
    label: "Project",
    icon: <Folder />,
    children: [
      {
        id: "src",
        label: "src",
        icon: <Folder />,
        children: [
          {
            id: "components",
            label: "components",
            icon: <Folder />,
            children: [
              { id: "button", label: "Button.tsx", icon: <FileCode /> },
              { id: "input", label: "Input.tsx", icon: <FileCode /> },
            ],
          },
          {
            id: "stories",
            label: "stories",
            icon: <Folder />,
            children: [
              { id: "button-story", label: "Button.stories.tsx", icon: <FileCode /> },
            ],
          },
        ],
      },
      {
        id: "public",
        label: "public",
        icon: <Folder />,
        children: [
          { id: "favicon", label: "favicon.ico", icon: <File /> },
        ],
      },
      { id: "package-json", label: "package.json", icon: <FileText /> },
    ],
  },
]

export const WithIcons: Story = {
  render: () => (
    <div className="w-64 rounded-[var(--base-radius-md)] border border-[var(--base-color-gray-200)] bg-[var(--alias-color-background-primary)] p-2">
      <TreeView
        data={fileSystemWithIcons}
        defaultExpanded={["project", "src"]}
      />
    </div>
  ),
}

// ─── WithBadges ───────────────────────────────────────────────────────────────

const badgeData: TreeNodeData[] = [
  {
    id: "inbox",
    label: "Inbox",
    icon: <Folder />,
    badge: 12,
    children: [
      { id: "unread", label: "Unread", badge: 5 },
      { id: "flagged", label: "Flagged", badge: 3 },
      { id: "all-mail", label: "All mail" },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    icon: <Package />,
    badge: 4,
    children: [
      { id: "active", label: "Active", badge: 2 },
      { id: "archived", label: "Archived" },
      { id: "drafts", label: "Drafts", badge: 2 },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: <FileText />,
  },
]

export const WithBadges: Story = {
  render: () => (
    <div className="w-64 rounded-[var(--base-radius-md)] border border-[var(--base-color-gray-200)] bg-[var(--alias-color-background-primary)] p-2">
      <TreeView
        data={badgeData}
        defaultExpanded={["inbox", "projects"]}
      />
    </div>
  ),
}

// ─── Controlled ───────────────────────────────────────────────────────────────

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState<TreeNodeData | null>(null)

    return (
      <div className="flex flex-col gap-4" style={{ width: 280 }}>
        <div className="rounded-[var(--base-radius-md)] border border-[var(--base-color-gray-200)] bg-[var(--alias-color-background-primary)] p-2">
          <TreeView
            data={fileSystemWithIcons}
            defaultExpanded={["project", "src"]}
            onSelect={setSelected}
          />
        </div>
        <div className="rounded-[var(--base-radius-md)] border border-[var(--base-color-gray-200)] bg-[var(--alias-color-background-secondary)] px-3 py-2 text-sm text-muted-foreground">
          {selected
            ? <span>Selected: <span className="font-medium text-foreground">{selected.label}</span></span>
            : "Click a node to select it"}
        </div>
      </div>
    )
  },
}
