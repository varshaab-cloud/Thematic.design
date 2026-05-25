"use client"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import React from "react"
import { z } from "zod"
import { toast } from "sonner"
import { Form, FormField, FormItem, FormLabel, FormSection, FormRow, FormActions, useForm, zodResolver } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Combobox } from "@/components/ui/combobox"
import { Slider } from "@/components/ui/slider"
import { Toaster } from "@/components/ui/sonner"

const meta: Meta = {
  title: "Forms and input/Form",
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster position="bottom-right" />
      </>
    ),
  ],
}
export default meta
type Story = StoryObj

// ─── Invite member form ───────────────────────────────────────────────────────

const inviteSchema = z.object({
  name:  z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  role:  z.string().min(1, "Please select a role"),
  message: z.string().max(280, "Message must be under 280 characters").optional(),
  notify: z.boolean().default(true),
})

function InviteForm() {
  const form = useForm({ resolver: zodResolver(inviteSchema), defaultValues: { notify: true }, mode: "onBlur" })

  const onSubmit = form.handleSubmit((data) => {
    toast.success(`Invite sent to ${data.email}`)
    form.reset()
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="w-full max-w-lg flex flex-col gap-5">
        <FormSection
          title="Invite team member"
          description="They'll receive an email to join your workspace."
        >
          <FormRow>
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <Input
                    label="Full name"
                    required
                    errorMessage={fieldState.error?.message}
                    placeholder="Priya Sharma"
                    {...field}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <Input
                    label="Email address"
                    type="email"
                    required
                    errorMessage={fieldState.error?.message}
                    placeholder="priya@acme.io"
                    {...field}
                  />
                </FormItem>
              )}
            />
          </FormRow>

          <FormField
            control={form.control}
            name="role"
            render={({ field, fieldState }) => (
              <FormItem>
                <Combobox
                  label="Role"
                  required
                  options={[
                    { value: "designer", label: "Designer" },
                    { value: "engineer", label: "Engineer" },
                    { value: "pm", label: "Product Manager" },
                    { value: "analyst", label: "Data Analyst" },
                  ]}
                  value={field.value}
                  onValueChange={field.onChange}
                  errorMessage={fieldState.error?.message}
                  helperText="Determines what they can access."
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field, fieldState }) => (
              <FormItem>
                <Textarea
                  label="Personal message"
                  placeholder="Add a personal note to the invitation…"
                  maxChars={280}
                  errorMessage={fieldState.error?.message}
                  helperText="Optional. Shown in the invitation email."
                  {...field}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notify"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-3 rounded-lg border border-[var(--base-color-gray-200)] bg-[var(--base-color-gray-100)] px-3 py-2.5">
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="notify-switch"
                  />
                  <div>
                    <label htmlFor="notify-switch" className="text-sm font-medium text-foreground cursor-pointer">
                      Send email notification
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Notify me when they accept the invitation.
                    </p>
                  </div>
                </div>
              </FormItem>
            )}
          />
        </FormSection>

        <FormActions>
          <Button variant="outline" type="button" onClick={() => form.reset()}>
            Cancel
          </Button>
          <Button type="submit" isLoading={form.formState.isSubmitting}>
            Send invite
          </Button>
        </FormActions>
      </form>
    </Form>
  )
}

export const InviteMember: Story = {
  name: "Invite Member Form",
  render: () => <InviteForm />,
}

// ─── Profile settings form ────────────────────────────────────────────────────

const profileSchema = z.object({
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
  bio: z.string().max(160, "Bio must be under 160 characters").optional(),
  theme: z.enum(["system", "light", "dark"]),
  density: z.number().min(1).max(3),
  marketing: z.boolean().default(false),
  updates: z.boolean().default(true),
})

function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { theme: "system" as const, density: 2, marketing: false, updates: true },
    mode: "onBlur",
  })

  const onSubmit = form.handleSubmit(() => {
    toast.success("Profile updated successfully.")
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="w-full max-w-lg flex flex-col gap-6">

        <FormSection title="Profile" description="Visible to other members of your workspace.">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field, fieldState }) => (
              <FormItem>
                <Input
                  label="Display name"
                  required
                  errorMessage={fieldState.error?.message}
                  {...field}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field, fieldState }) => (
              <FormItem>
                <Textarea
                  label="Bio"
                  maxChars={160}
                  helperText="Brief description shown on your profile."
                  errorMessage={fieldState.error?.message}
                  rows={2}
                  {...field}
                />
              </FormItem>
            )}
          />
        </FormSection>

        <FormSection title="Appearance" description="Customise how the interface looks for you.">
          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Theme</FormLabel>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex-row gap-4"
                >
                  <RadioGroupItem value="system" label="System" />
                  <RadioGroupItem value="light" label="Light" />
                  <RadioGroupItem value="dark" label="Dark" />
                </RadioGroup>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="density"
            render={({ field }) => (
              <FormItem>
                <Slider
                  label="Information density"
                  min={1}
                  max={3}
                  step={1}
                  showValue
                  formatValue={(v) => ["", "Comfortable", "Compact", "Dense"][v]}
                  helperText="Controls spacing and row height across lists and tables."
                  value={[field.value]}
                  onValueChange={([v]) => field.onChange(v)}
                />
              </FormItem>
            )}
          />
        </FormSection>

        <FormSection title="Notifications" description="Choose what you want to be notified about.">
          {[
            { name: "updates" as const, label: "Product updates", description: "New features and improvements." },
            { name: "marketing" as const, label: "Tips & resources", description: "Guides, webinars, and best practices." },
          ].map(({ name, label, description }) => (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <Checkbox
                      checked={field.value as boolean}
                      onCheckedChange={field.onChange}
                      className="mt-0.5"
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground">{description}</p>
                    </div>
                  </label>
                </FormItem>
              )}
            />
          ))}
        </FormSection>

        <FormActions>
          <Button variant="outline" type="button" onClick={() => form.reset()}>
            Discard changes
          </Button>
          <Button type="submit" isLoading={form.formState.isSubmitting}>
            Save changes
          </Button>
        </FormActions>
      </form>
    </Form>
  )
}

export const ProfileSettings: Story = {
  name: "Profile Settings Form",
  render: () => <ProfileForm />,
}
