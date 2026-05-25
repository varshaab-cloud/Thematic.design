import type { Meta, StoryObj } from "@storybook/react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"

const meta: Meta<typeof Table> = {
  title: "Data display/Table",
  component: Table,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Table>

export const Default: Story = {
  render: () => (
    <div className="rounded-md border max-w-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Varsha Bhide</TableCell>
            <TableCell>Designer</TableCell>
            <TableCell><Badge>Active</Badge></TableCell>
            <TableCell><Button size="sm" variant="ghost">Edit</Button></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Sumant N</TableCell>
            <TableCell>Developer</TableCell>
            <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
            <TableCell><Button size="sm" variant="ghost">Edit</Button></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">John Doe</TableCell>
            <TableCell>Manager</TableCell>
            <TableCell><Badge variant="destructive">Inactive</Badge></TableCell>
            <TableCell><Button size="sm" variant="ghost">Edit</Button></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
}

export const SimpleTable: Story = {
  render: () => (
    <div className="rounded-md border max-w-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Token</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-mono text-sm">--primary</TableCell>
            <TableCell>#1518A6</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-sm">--background</TableCell>
            <TableCell>#FFFFFF</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-sm">--foreground</TableCell>
            <TableCell>#000000</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
}
