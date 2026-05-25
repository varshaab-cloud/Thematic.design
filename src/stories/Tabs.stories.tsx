import type { Meta, StoryObj } from "@storybook/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

const meta: Meta<typeof Tabs> = {
  title: "Navigation/Tabs",
  component: Tabs,
}

export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="max-w-lg">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card>
          <CardHeader><CardTitle>Overview</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">Overview content goes here.</p></CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="analytics">
        <Card>
          <CardHeader><CardTitle>Analytics</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">Analytics content goes here.</p></CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings">
        <Card>
          <CardHeader><CardTitle>Settings</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">Settings content goes here.</p></CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
}

export const SimpleTabs: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="max-w-md">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        <TabsTrigger value="tab4" disabled>Disabled</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1"><p className="text-sm text-muted-foreground pt-2">Content for Tab 1</p></TabsContent>
      <TabsContent value="tab2"><p className="text-sm text-muted-foreground pt-2">Content for Tab 2</p></TabsContent>
      <TabsContent value="tab3"><p className="text-sm text-muted-foreground pt-2">Content for Tab 3</p></TabsContent>
    </Tabs>
  ),
}
