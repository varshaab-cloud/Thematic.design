import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { FileUpload } from "../../components/ui/file-upload"

const meta: Meta<typeof FileUpload> = {
  title: "Forms and input/File upload",
  component: FileUpload,
}

export default meta
type Story = StoryObj<typeof FileUpload>

export const States: Story = {
  name: "States",
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col gap-2 w-72">
        <FileUpload onFilesSelected={(files) => console.log(files)} />
        <span className="text-xs text-muted-foreground">Default</span>
      </div>
      <div className="flex flex-col gap-2 w-72">
        <FileUpload
          onFilesSelected={(files) => console.log(files)}
          disabled
        />
        <span className="text-xs text-muted-foreground">Disabled</span>
      </div>
    </div>
  ),
}

export const Default: Story = {
  render: () => (
    <div className="w-72">
      <FileUpload onFilesSelected={(files) => console.log("Files selected:", files)} />
    </div>
  ),
}

export const ImageOnly: Story = {
  render: () => (
    <div className="w-72">
      <FileUpload
        onFilesSelected={(files) => console.log("Images selected:", files)}
        accept="image/*"
        maxSizeMB={5}
      />
    </div>
  ),
}

export const MultipleFiles: Story = {
  render: () => (
    <div className="w-72">
      <FileUpload
        onFilesSelected={(files) => console.log("Files selected:", files)}
        multiple
      />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="w-72">
      <FileUpload
        onFilesSelected={(files) => console.log(files)}
        disabled
      />
    </div>
  ),
}

export const WithSizeLimit: Story = {
  render: () => (
    <div className="w-72">
      <FileUpload
        onFilesSelected={(files) => console.log("Valid files:", files)}
        maxSizeMB={10}
        multiple
      />
    </div>
  ),
}
