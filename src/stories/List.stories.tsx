import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { ChevronRight } from "lucide-react"
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemContent,
  ListItemTitle,
  ListItemDescription,
  ListItemAction,
  ListDivider,
} from "../../components/ui/list"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"

const meta: Meta<typeof List> = {
  title: "Data display/List",
  component: List,
  tags: ["!autodocs"],
}

export default meta
type Story = StoryObj<typeof List>

const people = [
  { name: "Alice Martin",   email: "alice@example.com",   initials: "AM", status: "success" as const, statusLabel: "Active" },
  { name: "Bob Chen",       email: "bob@example.com",     initials: "BC", status: "info"    as const, statusLabel: "Pending" },
  { name: "Carol Williams", email: "carol@example.com",   initials: "CW", status: "warning" as const, statusLabel: "Expiring" },
  { name: "David Kim",      email: "david@example.com",   initials: "DK", status: "error"   as const, statusLabel: "Suspended" },
  { name: "Eva Rossi",      email: "eva@example.com",     initials: "ER", status: "success" as const, statusLabel: "Active" },
]

export const Default: Story = {
  render: () => (
    <div className="max-w-sm rounded-[var(--base-radius-md)] border border-border overflow-hidden">
      <List>
        {people.map((p) => (
          <ListItem key={p.email}>
            <ListItemContent>
              <ListItemTitle>{p.name}</ListItemTitle>
            </ListItemContent>
          </ListItem>
        ))}
      </List>
    </div>
  ),
}

export const WithAvatars: Story = {
  name: "With avatars",
  render: () => (
    <div className="max-w-sm rounded-[var(--base-radius-md)] border border-border overflow-hidden">
      <List>
        {people.map((p) => (
          <ListItem key={p.email}>
            <ListItemAvatar>
              <Avatar size="sm">
                <AvatarImage src="" />
                <AvatarFallback>{p.initials}</AvatarFallback>
              </Avatar>
            </ListItemAvatar>
            <ListItemContent>
              <ListItemTitle>{p.name}</ListItemTitle>
              <ListItemDescription>{p.email}</ListItemDescription>
            </ListItemContent>
          </ListItem>
        ))}
      </List>
    </div>
  ),
}

export const WithActions: Story = {
  name: "With actions",
  render: () => (
    <div className="max-w-sm rounded-[var(--base-radius-md)] border border-border overflow-hidden">
      <List>
        {people.map((p) => (
          <ListItem key={p.email}>
            <ListItemContent>
              <ListItemTitle>{p.name}</ListItemTitle>
              <ListItemDescription>{p.email}</ListItemDescription>
            </ListItemContent>
            <ListItemAction>
              <Badge variant={p.status} size="sm">{p.statusLabel}</Badge>
            </ListItemAction>
          </ListItem>
        ))}
      </List>
    </div>
  ),
}

export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null)
    return (
      <div className="max-w-sm rounded-[var(--base-radius-md)] border border-border overflow-hidden">
        <List>
          {people.map((p) => (
            <ListItem
              key={p.email}
              interactive
              selected={selected === p.email}
              onClick={() => setSelected(p.email)}
            >
              <ListItemContent>
                <ListItemTitle>{p.name}</ListItemTitle>
                <ListItemDescription>{p.email}</ListItemDescription>
              </ListItemContent>
            </ListItem>
          ))}
        </List>
      </div>
    )
  },
}

export const Mixed: Story = {
  render: () => (
    <div className="max-w-sm rounded-[var(--base-radius-md)] border border-border overflow-hidden">
      <List>
        {people.map((p, i) => (
          <React.Fragment key={p.email}>
            <ListItem interactive>
              <ListItemAvatar>
                <Avatar size="sm">
                  <AvatarImage src="" />
                  <AvatarFallback>{p.initials}</AvatarFallback>
                </Avatar>
              </ListItemAvatar>
              <ListItemContent>
                <ListItemTitle>{p.name}</ListItemTitle>
                <ListItemDescription>{p.email}</ListItemDescription>
              </ListItemContent>
              <ListItemAction>
                <ChevronRight className="size-4 text-[var(--base-color-gray-400)]" />
              </ListItemAction>
            </ListItem>
            {i === 1 && <ListDivider />}
          </React.Fragment>
        ))}
      </List>
    </div>
  ),
}
