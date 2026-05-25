import type { Meta, StoryObj } from "@storybook/react"
import { SelectField, SelectItem, SelectGroup, SelectLabel, SelectSeparator } from "../../components/ui/select"

const meta: Meta<typeof SelectField> = {
  title: "Forms and input/Select",
  component: SelectField,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "Label above the select" },
    placeholder: { control: "text", description: "Placeholder text" },
    helperText: { control: "text", description: "Helper text below" },
    errorMessage: { control: "text", description: "Error message — also triggers error state" },
    successMessage: { control: "text", description: "Success message — also triggers success state" },
    required: { control: "boolean", description: "Shows required indicator" },
    disabled: { control: "boolean", description: "Disables the select" },
    size: {
      control: "select",
      options: ["sm", "default"],
      description: "Size of the select trigger",
    },
  },
}

export default meta
type Story = StoryObj<typeof SelectField>

export const Default: Story = {
  render: () => (
    <SelectField placeholder="Select an option" className="w-56">
      <SelectItem value="option1">Option 1</SelectItem>
      <SelectItem value="option2">Option 2</SelectItem>
      <SelectItem value="option3">Option 3</SelectItem>
    </SelectField>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <SelectField label="Country" placeholder="Select a country" className="w-56">
      <SelectItem value="us">United States</SelectItem>
      <SelectItem value="uk">United Kingdom</SelectItem>
      <SelectItem value="in">India</SelectItem>
      <SelectItem value="au">Australia</SelectItem>
    </SelectField>
  ),
}

export const Required: Story = {
  render: () => (
    <SelectField label="Role" placeholder="Select a role" required helperText="Please select your role" className="w-56">
      <SelectItem value="designer">Designer</SelectItem>
      <SelectItem value="developer">Developer</SelectItem>
      <SelectItem value="manager">Manager</SelectItem>
    </SelectField>
  ),
}

export const ErrorState: Story = {
  render: () => (
    <SelectField label="Department" placeholder="Select department" errorMessage="Please select a department to continue" className="w-56">
      <SelectItem value="design">Design</SelectItem>
      <SelectItem value="engineering">Engineering</SelectItem>
      <SelectItem value="product">Product</SelectItem>
    </SelectField>
  ),
}

export const SuccessState: Story = {
  render: () => (
    <SelectField label="Plan" placeholder="Select plan" successMessage="Great choice!" className="w-56">
      <SelectItem value="starter">Starter</SelectItem>
      <SelectItem value="pro">Pro</SelectItem>
      <SelectItem value="enterprise">Enterprise</SelectItem>
    </SelectField>
  ),
}

export const Disabled: Story = {
  render: () => (
    <SelectField label="Region" placeholder="Not available" disabled helperText="Region is locked for your account" className="w-56">
      <SelectItem value="us">United States</SelectItem>
    </SelectField>
  ),
}

export const WithGroups: Story = {
  render: () => (
    <SelectField label="Team member" placeholder="Select a member" className="w-56">
      <SelectGroup>
        <SelectLabel>Design</SelectLabel>
        <SelectItem value="varsha">Varsha Bhide</SelectItem>
        <SelectItem value="priya">Priya S</SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>Engineering</SelectLabel>
        <SelectItem value="sumant">Sumant N</SelectItem>
        <SelectItem value="raj">Raj K</SelectItem>
      </SelectGroup>
    </SelectField>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-56">
      <SelectField label="Small" placeholder="Small select" size="sm">
        <SelectItem value="a">Option A</SelectItem>
        <SelectItem value="b">Option B</SelectItem>
      </SelectField>
      <SelectField label="Default" placeholder="Default select" size="default">
        <SelectItem value="a">Option A</SelectItem>
        <SelectItem value="b">Option B</SelectItem>
      </SelectField>
    </div>
  ),
}

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <SelectField label="Default" placeholder="Select an option">
        <SelectItem value="a">Option A</SelectItem>
        <SelectItem value="b">Option B</SelectItem>
      </SelectField>
      <SelectField label="Required" placeholder="Required field" required helperText="This field is required">
        <SelectItem value="a">Option A</SelectItem>
      </SelectField>
      <SelectField label="Error" placeholder="Select option" errorMessage="This field is required">
        <SelectItem value="a">Option A</SelectItem>
      </SelectField>
      <SelectField label="Success" placeholder="Select option" successMessage="Looks good!">
        <SelectItem value="a">Option A</SelectItem>
      </SelectField>
      <SelectField label="Disabled" placeholder="Cannot select" disabled helperText="Not available">
        <SelectItem value="a">Option A</SelectItem>
      </SelectField>
    </div>
  ),
}
