import type { Meta, StoryObj } from "@storybook/react"
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert"
import { AlertCircle, Info as InfoIcon, CheckCircle, AlertTriangle } from "lucide-react"

const meta: Meta<typeof Alert> = {
  title: "Thematic/Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
      description: "Visual style of the alert",
    },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const InfoAlert: Story = {
  render: () => (
    <Alert className="max-w-lg">
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Info</AlertTitle>
      <AlertDescription>This is an informational message for the user.</AlertDescription>
    </Alert>
  ),
}

export const Error: Story = {
  render: () => (
    <Alert variant="destructive" className="max-w-lg">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Something went wrong. Please try again.</AlertDescription>
    </Alert>
  ),
}

export const Success: Story = {
  render: () => (
    <Alert className="max-w-lg border-green-500">
      <CheckCircle className="h-4 w-4 text-green-600" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>Your changes have been saved successfully.</AlertDescription>
    </Alert>
  ),
}

export const Warning: Story = {
  render: () => (
    <Alert className="max-w-lg border-yellow-500">
      <AlertTriangle className="h-4 w-4 text-yellow-600" />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>This action may have unintended consequences.</AlertDescription>
    </Alert>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-lg">
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>Informational alert.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Error alert.</AlertDescription>
      </Alert>
      <Alert className="border-green-500">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Success alert.</AlertDescription>
      </Alert>
      <Alert className="border-yellow-500">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Warning alert.</AlertDescription>
      </Alert>
    </div>
  ),
}
