import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { type ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Mail, Phone } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// ─── Sample data ──────────────────────────────────────────────────────────────

type User = {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive" | "pending"
  joined: string
  score: number
}

const sampleUsers: User[] = [
  { id: "1",  name: "Priya Sharma",    email: "priya@acme.io",    role: "Designer",    status: "active",   joined: "Jan 2024", score: 94 },
  { id: "2",  name: "Marcus Webb",     email: "marcus@acme.io",   role: "Engineer",    status: "active",   joined: "Mar 2024", score: 87 },
  { id: "3",  name: "Aisha Patel",     email: "aisha@acme.io",    role: "PM",          status: "pending",  joined: "Apr 2024", score: 72 },
  { id: "4",  name: "Leon Fischer",    email: "leon@acme.io",     role: "Engineer",    status: "inactive", joined: "Dec 2023", score: 61 },
  { id: "5",  name: "Sofia Reyes",     email: "sofia@acme.io",    role: "Designer",    status: "active",   joined: "Feb 2024", score: 98 },
  { id: "6",  name: "Tariq Hassan",    email: "tariq@acme.io",    role: "Engineer",    status: "active",   joined: "Jun 2024", score: 83 },
  { id: "7",  name: "Ji-woo Kim",      email: "jiwoo@acme.io",    role: "PM",          status: "active",   joined: "May 2024", score: 79 },
  { id: "8",  name: "Nina Okonkwo",    email: "nina@acme.io",     role: "Designer",    status: "pending",  joined: "Jul 2024", score: 66 },
  { id: "9",  name: "Rohan Mehta",     email: "rohan@acme.io",    role: "Engineer",    status: "active",   joined: "Aug 2024", score: 91 },
  { id: "10", name: "Clara Dubois",    email: "clara@acme.io",    role: "PM",          status: "inactive", joined: "Sep 2024", score: 55 },
  { id: "11", name: "Emeka Nwosu",     email: "emeka@acme.io",    role: "Engineer",    status: "active",   joined: "Oct 2024", score: 88 },
  { id: "12", name: "Yuki Tanaka",     email: "yuki@acme.io",     role: "Designer",    status: "active",   joined: "Nov 2024", score: 76 },
  { id: "13", name: "Fatima Al-Rashid",email: "fatima@acme.io",   role: "PM",          status: "active",   joined: "Jan 2025", score: 84 },
  { id: "14", name: "Diego Morales",   email: "diego@acme.io",    role: "Engineer",    status: "pending",  joined: "Feb 2025", score: 70 },
  { id: "15", name: "Amara Diallo",    email: "amara@acme.io",    role: "Designer",    status: "active",   joined: "Mar 2025", score: 95 },
]

const statusVariant: Record<User["status"], "success" | "warning" | "error"> = {
  active:   "success",
  pending:  "warning",
  inactive: "error",
}

const columns: ColumnDef<User, string>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-foreground">{row.getValue("name")}</p>
        <p className="text-xs text-muted-foreground">{row.original.email}</p>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<User["status"]>("status")
      return (
        <Badge variant={statusVariant[status]} dot size="sm">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "joined",
    header: "Joined",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("joined")}</span>
    ),
  },
  {
    accessorKey: "score",
    header: "Score",
    cell: ({ row }) => {
      const score = row.original.score
      return (
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[var(--base-color-gray-200)]">
            <div
              className="h-full rounded-full bg-[var(--base-color-blue-800)]"
              style={{ width: `${score}%` }}
            />
          </div>
          <span className="tabular-nums text-muted-foreground">{score}</span>
        </div>
      )
    },
  },
  {
    id: "actions",
    header: "",
    enableSorting: false,
    enableHiding: false,
    size: 48,
    cell: () => (
      <Button variant="ghost" size="icon-sm" aria-label="Row actions">
        <MoreHorizontal />
      </Button>
    ),
  },
]

// ─── Stories ──────────────────────────────────────────────────────────────────

const meta: Meta<typeof DataTable> = {
  title: "Thematic/Components/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
}
export default meta

type Story = StoryObj<typeof DataTable>

export const Default: Story = {
  name: "Default",
  render: () => (
    <DataTable
      columns={columns}
      data={sampleUsers}
      searchPlaceholder="Search users…"
    />
  ),
}

export const WithSelection: Story = {
  name: "With Row Selection",
  render: () => (
    <DataTable
      columns={columns}
      data={sampleUsers}
      selectable
      searchPlaceholder="Search users…"
      onSelectionChange={(rows) => console.log("Selected:", rows)}
    />
  ),
}

export const WithColumnToggle: Story = {
  name: "With Column Toggle",
  render: () => (
    <DataTable
      columns={columns}
      data={sampleUsers}
      selectable
      columnToggle
      searchPlaceholder="Search users…"
    />
  ),
}

export const LoadingState: Story = {
  name: "Loading Skeleton",
  render: () => (
    <DataTable
      columns={columns}
      data={[]}
      isLoading
      skeletonRows={8}
      searchPlaceholder="Search users…"
    />
  ),
}

export const EmptyState: Story = {
  name: "Empty State",
  render: () => (
    <DataTable
      columns={columns}
      data={[]}
      searchPlaceholder="Search users…"
    />
  ),
}

export const CustomEmptyState: Story = {
  name: "Custom Empty State",
  render: () => (
    <DataTable
      columns={columns}
      data={[]}
      searchPlaceholder="Search users…"
      emptyState={
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-[var(--base-color-blue-100)]">
            <Mail className="size-5 text-[var(--base-color-blue-800)]" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">No team members yet</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Invite your first team member to get started.
            </p>
          </div>
          <Button size="sm">Invite member</Button>
        </div>
      }
    />
  ),
}

export const SmallDataset: Story = {
  name: "Small Dataset (5 rows)",
  render: () => (
    <DataTable
      columns={columns}
      data={sampleUsers.slice(0, 5)}
      defaultPageSize={10}
      searchPlaceholder="Search users…"
    />
  ),
}
