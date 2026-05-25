import type { Meta, StoryObj } from "@storybook/react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardAction, MetricCard } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Users, DollarSign, TrendingUp, ShoppingCart, Activity } from "lucide-react"

const meta: Meta<typeof Card> = {
  title: "Thematic/Components/Card",
  component: Card,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Card>

// Base card
export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Card body content using your Thematic token system.</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button size="sm">Action</Button>
        <Button size="sm" variant="outline">Cancel</Button>
      </CardFooter>
    </Card>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>Manage your team</CardDescription>
        <CardAction>
          <Button size="sm" variant="outline">Invite</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">3 members active</p>
      </CardContent>
    </Card>
  ),
}

export const SmallCard: Story = {
  render: () => (
    <Card size="sm" className="w-72">
      <CardHeader>
        <CardTitle>Compact Card</CardTitle>
        <CardDescription>Smaller padding variant.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Used in dense layouts and sidebars.</p>
      </CardContent>
    </Card>
  ),
}

export const StatusCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Deployment Status</CardTitle>
        <CardDescription>Last deployed 2 minutes ago</CardDescription>
        <CardAction>
          <Badge variant="success" dot>Live</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <Badge variant="success">Production</Badge>
        <Badge variant="info">Staging</Badge>
        <Badge variant="warning">Preview</Badge>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">v2.4.1 — all systems operational</p>
      </CardFooter>
    </Card>
  ),
}

// Metric cards
export const MetricDefault: Story = {
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

export const MetricBrand: Story = {
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

export const MetricDown: Story = {
  render: () => (
    <MetricCard
      label="Churn Rate"
      value="3.2%"
      trend="down"
      trendValue="-0.4%"
      trendLabel="vs last month"
      icon={<Activity />}
      className="w-56"
    />
  ),
}

export const MetricDashboard: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[480px]">
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

export const MetricVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[480px]">
      <MetricCard label="Default" value="1,234" trend="up" trendValue="+5%" trendLabel="variant" />
      <MetricCard label="Brand" value="1,234" trend="up" trendValue="+5%" trendLabel="variant" variant="brand" />
      <MetricCard label="Success" value="1,234" trend="up" trendValue="+5%" trendLabel="variant" variant="success" />
      <MetricCard label="Warning" value="1,234" trend="down" trendValue="-2%" trendLabel="variant" variant="warning" />
    </div>
  ),
}
