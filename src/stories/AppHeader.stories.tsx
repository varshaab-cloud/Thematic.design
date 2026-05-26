"use client"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import React, { useState } from "react"
import {
  AppHeader,
  AppHeaderLogo,
  AppHeaderNav,
  AppHeaderNavItem,
  AppHeaderSearch,
  AppHeaderActions,
  AppHeaderNotifications,
  AppHeaderUser,
} from "../../components/ui/app-header"

const meta: Meta<typeof AppHeader> = {
  title: "Navigation/AppHeader",
  component: AppHeader,
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof AppHeader>

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-[var(--base-color-gray-75)]">
      <AppHeader bordered>
        <AppHeaderLogo name="Thematic" />
        <AppHeaderNav>
          <AppHeaderNavItem>Dashboard</AppHeaderNavItem>
          <AppHeaderNavItem>Projects</AppHeaderNavItem>
          <AppHeaderNavItem>Team</AppHeaderNavItem>
          <AppHeaderNavItem>Reports</AppHeaderNavItem>
        </AppHeaderNav>
        <AppHeaderSearch placeholder="Search…" />
        <AppHeaderActions>
          <AppHeaderNotifications count={3} />
          <AppHeaderUser
            name="John Doe"
            email="john@thematic.io"
          />
        </AppHeaderActions>
      </AppHeader>
      <div className="p-8">
        <p className="text-sm text-[var(--base-color-gray-500)]">Page content</p>
      </div>
    </div>
  ),
}

// ─── Minimal ──────────────────────────────────────────────────────────────────

export const Minimal: Story = {
  render: () => (
    <div className="min-h-screen bg-[var(--base-color-gray-75)]">
      <AppHeader bordered>
        <AppHeaderLogo name="Thematic" />
        <AppHeaderActions>
          <AppHeaderUser
            name="Alex Kim"
            email="alex@thematic.io"
          />
        </AppHeaderActions>
      </AppHeader>
      <div className="p-8">
        <p className="text-sm text-[var(--base-color-gray-500)]">Minimal header — logo and user only</p>
      </div>
    </div>
  ),
}

// ─── WithActiveNav ────────────────────────────────────────────────────────────

export const WithActiveNav: Story = {
  render: () => {
    const [active, setActive] = useState("Dashboard")
    const navItems = ["Dashboard", "Projects", "Team", "Reports"]

    return (
      <div className="min-h-screen bg-[var(--base-color-gray-75)]">
        <AppHeader bordered>
          <AppHeaderLogo name="Thematic" />
          <AppHeaderNav>
            {navItems.map((item) => (
              <AppHeaderNavItem
                key={item}
                active={active === item}
                onClick={() => setActive(item)}
              >
                {item}
              </AppHeaderNavItem>
            ))}
          </AppHeaderNav>
          <AppHeaderSearch placeholder="Search…" />
          <AppHeaderActions>
            <AppHeaderNotifications count={3} />
            <AppHeaderUser
              name="John Doe"
              email="john@thematic.io"
            />
          </AppHeaderActions>
        </AppHeader>
        <div className="p-8">
          <p className="text-sm text-[var(--base-color-gray-900)] font-medium">{active}</p>
          <p className="text-xs text-[var(--base-color-gray-400)] mt-1">Click nav items to switch the active state</p>
        </div>
      </div>
    )
  },
}
