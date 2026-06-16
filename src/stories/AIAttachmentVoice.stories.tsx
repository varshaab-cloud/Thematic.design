import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { AttachmentPreview } from "../../components/ui/attachment-preview"
import { VoiceInput } from "../../components/ui/voice-input"
import type { VoiceState } from "../../components/ui/voice-input"

const meta: Meta = {
  title: "AI / Conversation/Multimodal",
  parameters: { layout: "padded" },
}

export default meta
type Story = StoryObj

// ─── AttachmentPreview ────────────────────────────────────────────────────────

export const AttachmentReady: Story = {
  name: "AttachmentPreview — ready",
  render: () => (
    <AttachmentPreview
      name="quarterly-report.pdf"
      fileType="pdf"
      size="2.4 MB"
      state="ready"
      onRemove={() => alert("Remove")}
    />
  ),
}

export const AttachmentUploading: Story = {
  name: "AttachmentPreview — uploading",
  render: () => (
    <AttachmentPreview
      name="screenshot.png"
      fileType="image"
      size="1.1 MB"
      state="uploading"
      progress={62}
      onRemove={() => alert("Remove")}
    />
  ),
}

export const AttachmentError: Story = {
  name: "AttachmentPreview — error",
  render: () => (
    <AttachmentPreview
      name="huge-archive.zip"
      fileType="other"
      state="too-large"
      errorMessage="File too large (max 25 MB)"
      onRemove={() => alert("Remove")}
    />
  ),
}

export const AttachmentAllStates: Story = {
  name: "AttachmentPreview — all states",
  render: () => (
    <div className="flex flex-wrap gap-3">
      <AttachmentPreview name="report.pdf" fileType="pdf" size="2.4 MB" state="ready" onRemove={() => {}} />
      <AttachmentPreview name="photo.jpg" fileType="image" size="800 KB" progress={40} onRemove={() => {}} />
      <AttachmentPreview name="data.xlsx" fileType="spreadsheet" state="ready" size="512 KB" onRemove={() => {}} />
      <AttachmentPreview name="giant.zip" fileType="other" state="too-large" errorMessage="File too large" onRemove={() => {}} />
    </div>
  ),
}

// ─── VoiceInput ───────────────────────────────────────────────────────────────

export const VoiceIdle: Story = {
  name: "VoiceInput — idle",
  render: () => <VoiceInput state="idle" onToggle={() => alert("Start recording")} />,
}

export const VoiceRecording: Story = {
  name: "VoiceInput — recording",
  render: () => <VoiceInput state="recording" onToggle={() => alert("Stop recording")} />,
}

export const VoiceProcessing: Story = {
  name: "VoiceInput — processing",
  render: () => <VoiceInput state="processing" />,
}

export const VoiceError: Story = {
  name: "VoiceInput — error",
  render: () => <VoiceInput state="error" onToggle={() => alert("Retry")} />,
}

export const VoicePermissionDenied: Story = {
  name: "VoiceInput — permission denied",
  render: () => <VoiceInput state="permission-denied" />,
}

export const VoiceAllStates: Story = {
  name: "VoiceInput — all states",
  render: () => {
    const states: VoiceState[] = ["idle", "recording", "processing", "error", "permission-denied"]
    return (
      <div className="flex flex-wrap items-center gap-6">
        {states.map((s) => (
          <div key={s} className="flex flex-col items-center gap-2">
            <VoiceInput state={s} />
            <span className="text-xs text-muted-foreground">{s}</span>
          </div>
        ))}
      </div>
    )
  },
}
