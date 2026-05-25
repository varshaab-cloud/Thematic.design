import React from "react"

export const IconDemo = ({
  label,
  color,
  opacity,
  label2,
}: {
  label: string
  color: string
  opacity?: number
  label2?: string
}) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
    <div style={{ width: 40, height: 40, borderRadius: 8, background: "var(--base-color-gray-100, #EEEEEC)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity }}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    </div>
    <span style={{ fontSize: 10, color: "var(--base-color-gray-500, #909090)", textAlign: "center" }}>{label}</span>
    {label2 && <span style={{ fontSize: 9, color: "var(--base-color-gray-400)", textAlign: "center" }}>{label2}</span>}
  </div>
)
