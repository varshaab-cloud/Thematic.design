import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "../../components/ui/input"
import { Search, Mail, Eye, EyeOff, Lock, User } from "lucide-react"

const meta: Meta<typeof Input> = {
  title: "Forms and input/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "Label above the input" },
    placeholder: { control: "text", description: "Placeholder text" },
    helperText: { control: "text", description: "Helper text below the input" },
    errorMessage: { control: "text", description: "Error message — also triggers error state" },
    successMessage: { control: "text", description: "Success message — also triggers success state" },
    disabled: { control: "boolean", description: "Disables the input" },
    required: { control: "boolean", description: "Shows required indicator" },
    inputSize: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the input",
    },
    maxChars: { control: "number", description: "Max character count — shows counter" },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const States: Story = {
  name: "States",
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      {[
        { label: "Default",  props: { label: "Email address", placeholder: "you@example.com" } },
        { label: "Disabled", props: { label: "Email address", placeholder: "you@example.com", disabled: true, helperText: "This field is locked" } },
        { label: "Error",    props: { label: "Email address", defaultValue: "notanemail", errorMessage: "Invalid email address" } },
        { label: "Success",  props: { label: "Username",      defaultValue: "varsha_bhide", successMessage: "Username is available!" } },
      ].map(({ label, props }) => (
        <div key={label} className="flex flex-col items-start gap-2 w-52">
          <Input {...props} />
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  ),
}

export const Default: Story = {
  args: { placeholder: "Enter text..." },
}

export const WithLabel: Story = {
  args: {
    label: "Email address",
    placeholder: "you@example.com",
  },
}

export const Required: Story = {
  args: {
    label: "Full name",
    placeholder: "Enter your name",
    required: true,
    helperText: "This field is required",
  },
}

export const WithHelperText: Story = {
  args: {
    label: "Username",
    placeholder: "Choose a username",
    helperText: "Must be 3–20 characters, letters and numbers only",
  },
}

export const ErrorState: Story = {
  args: {
    label: "Email address",
    placeholder: "you@example.com",
    defaultValue: "notanemail",
    errorMessage: "Please enter a valid email address",
  },
}

export const SuccessState: Story = {
  args: {
    label: "Username",
    placeholder: "Choose a username",
    defaultValue: "varsha_bhide",
    successMessage: "Username is available!",
  },
}

export const Disabled: Story = {
  args: {
    label: "Email address",
    placeholder: "you@example.com",
    disabled: true,
    helperText: "This field cannot be edited",
  },
}

export const WithPrefixIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Search components...",
    prefixIcon: <Search />,
  },
}

export const WithSuffixIcon: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    suffixIcon: <Eye />,
  },
}

export const WithBothIcons: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    prefixIcon: <Mail />,
    suffixIcon: <User />,
  },
}

export const WithCharacterCount: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself...",
    maxChars: 100,
    helperText: "Keep it short and sweet",
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      <Input inputSize="sm" placeholder="Small input" label="Small" />
      <Input inputSize="md" placeholder="Medium input" label="Medium" />
      <Input inputSize="lg" placeholder="Large input" label="Large" />
    </div>
  ),
}

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input label="Default" placeholder="Default state" />
      <Input label="With icon" placeholder="Search..." prefixIcon={<Search />} />
      <Input label="Required" placeholder="Required field" required helperText="This field is required" />
      <Input label="Error" placeholder="Enter email" defaultValue="notanemail" errorMessage="Invalid email address" />
      <Input label="Success" placeholder="Username" defaultValue="varsha_bhide" successMessage="Username is available!" />
      <Input label="Disabled" placeholder="Cannot edit" disabled helperText="Read only" />
      <Input label="With counter" placeholder="Write something..." maxChars={80} />
      <Input label="Password" type="password" placeholder="Enter password" prefixIcon={<Lock />} suffixIcon={<Eye />} />
    </div>
  ),
}
