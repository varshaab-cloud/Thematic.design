import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { MetricCard } from "@/components/ui/card"
import { DollarSign, Users, ShoppingCart, TrendingUp, Activity, ArrowUpRight, BarChart2, Percent } from "lucide-react"

const meta: Meta<typeof MetricCard> = {
  title: "Data display/MetricCard",
  component: MetricCard,
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof MetricCard>

// ─── All variants side by side ────────────────────────────────────────────────

export const Variants: Story = {
  name: "Variants",
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[480px]">
      <MetricCard
        label="Default"
        value="1,234"
        trend="up"
        trendValue="+5.2%"
        trendLabel="vs last month"
        icon={<BarChart2 />}
      />
      <MetricCard
        label="Brand"
        value="1,234"
        trend="up"
        trendValue="+5.2%"
        trendLabel="vs last month"
        icon={<BarChart2 />}
        variant="brand"
      />
      <MetricCard
        label="Success"
        value="1,234"
        trend="up"
        trendValue="+5.2%"
        trendLabel="vs last month"
        icon={<BarChart2 />}
        variant="success"
      />
      <MetricCard
        label="Warning"
        value="1,234"
        trend="down"
        trendValue="-2.1%"
        trendLabel="vs last month"
        icon={<BarChart2 />}
        variant="warning"
      />
    </div>
  ),
}

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <MetricCard
      label="Total Revenue"
      value="$48,295"
      trend="up"
      trendValue="+12.5%"
      trendLabel="vs last month"
      icon={<DollarSign />}
      className="w-56"
    />
  ),
}

// ─── Brand ────────────────────────────────────────────────────────────────────

export const Brand: Story = {
  render: () => (
    <MetricCard
      label="Active Users"
      value="12,430"
      trend="up"
      trendValue="+8.2%"
      trendLabel="vs last week"
      icon={<Users />}
      variant="brand"
      className="w-56"
    />
  ),
}

// ─── Trend directions ─────────────────────────────────────────────────────────

export const TrendDirections: Story = {
  name: "Trend directions",
  render: () => (
    <div className="flex flex-col gap-4 w-56">
      <MetricCard
        label="Revenue"
        value="$48,295"
        trend="up"
        trendValue="+12.5%"
        trendLabel="vs last month"
        icon={<DollarSign />}
      />
      <MetricCard
        label="Churn Rate"
        value="3.2%"
        trend="down"
        trendValue="-0.4%"
        trendLabel="vs last month"
        icon={<Activity />}
      />
      <MetricCard
        label="Conversion"
        value="4.8%"
        trend="neutral"
        trendValue="0%"
        trendLabel="no change"
        icon={<Percent />}
      />
    </div>
  ),
}

// ─── Without icon ─────────────────────────────────────────────────────────────

export const WithoutIcon: Story = {
  name: "Without icon",
  render: () => (
    <div className="flex gap-4">
      <MetricCard
        label="Page Views"
        value="94,210"
        trend="up"
        trendValue="+3.1%"
        trendLabel="vs last week"
        className="w-48"
      />
      <MetricCard
        label="Bounce Rate"
        value="38.4%"
        trend="down"
        trendValue="-1.2%"
        trendLabel="vs last week"
        className="w-48"
      />
    </div>
  ),
}

// ─── Small size ───────────────────────────────────────────────────────────────

export const Small: Story = {
  name: "Small size",
  render: () => (
    <div className="grid grid-cols-2 gap-3 w-[400px]">
      <MetricCard
        label="Revenue"
        value="$48.3k"
        trend="up"
        trendValue="+12.5%"
        trendLabel="vs last month"
        icon={<DollarSign />}
        size="sm"
      />
      <MetricCard
        label="Active Users"
        value="12,430"
        trend="up"
        trendValue="+8.2%"
        trendLabel="vs last week"
        icon={<Users />}
        variant="brand"
        size="sm"
      />
      <MetricCard
        label="Orders"
        value="1,284"
        trend="neutral"
        trendValue="0%"
        trendLabel="no change"
        icon={<ShoppingCart />}
        size="sm"
      />
      <MetricCard
        label="Growth"
        value="24.8%"
        trend="up"
        trendValue="+4.1%"
        trendLabel="vs last quarter"
        icon={<TrendingUp />}
        variant="success"
        size="sm"
      />
    </div>
  ),
}

// ─── Dashboard grid ───────────────────────────────────────────────────────────

export const Dashboard: Story = {
  name: "Dashboard grid",
  render: () => (
    <div className="grid grid-cols-4 gap-4 w-[800px]">
      <MetricCard
        label="Total Revenue"
        value="$48,295"
        trend="up"
        trendValue="+12.5%"
        trendLabel="vs last month"
        icon={<DollarSign />}
      />
      <MetricCard
        label="Active Users"
        value="12,430"
        trend="up"
        trendValue="+8.2%"
        trendLabel="vs last week"
        icon={<Users />}
        variant="brand"
      />
      <MetricCard
        label="Orders"
        value="1,284"
        trend="neutral"
        trendValue="0%"
        trendLabel="no change"
        icon={<ShoppingCart />}
      />
      <MetricCard
        label="Growth"
        value="24.8%"
        trend="up"
        trendValue="+4.1%"
        trendLabel="vs last quarter"
        icon={<TrendingUp />}
        variant="success"
      />
    </div>
  ),
}

// ─── Error variant ────────────────────────────────────────────────────────────

export const ErrorVariant: Story = {
  name: "Error variant",
  render: () => (
    <MetricCard
      label="Failed Payments"
      value="42"
      trend="up"
      trendValue="+18"
      trendLabel="vs last week"
      icon={<ArrowUpRight />}
      variant="error"
      className="w-56"
    />
  ),
}
