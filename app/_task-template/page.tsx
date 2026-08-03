"use client"

import React from "react"

// ─── Task: <name> ─────────────────────────────────────────────────────────────
// Copy this folder to app/<task-name>/ — it becomes /<task-name> on deploy.
// Rules: compose from components/ui/, tokens only (var(--…)), read the
// component's .mdx before using it. `npm run verify` before commit.

export default function TaskPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[var(--alias-color-text-primary)]">
            Task title
          </h1>
          <p className="text-sm text-[var(--alias-color-text-secondary)] mt-1">
            Replace this with the page built for the task.
          </p>
        </div>
      </div>
    </div>
  )
}
