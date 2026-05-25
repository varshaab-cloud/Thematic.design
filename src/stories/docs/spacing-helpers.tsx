import React from "react"

export const SpacingRow = ({
  px,
  rem,
  multiplier,
  token,
  cssVar,
}: {
  px: string
  rem: string
  multiplier: string
  token: string
  cssVar: string
}) => (
  <div style={{ display: "grid", gridTemplateColumns: "60px 80px 80px 140px 1fr", alignItems: "center", gap: 16, padding: "10px 0", borderBottom: "1px solid var(--base-color-gray-200, #E3E3E0)" }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--base-color-gray-900, #222)" }}>{px}</div>
    <div style={{ fontSize: 12, color: "var(--base-color-gray-500, #909090)" }}>{rem}</div>
    <div style={{ fontSize: 12, color: "var(--base-color-gray-500, #909090)" }}>{multiplier}</div>
    <div style={{ fontFamily: "monospace", fontSize: 11, color: "var(--base-color-blue-800, #1518A6)" }}>{cssVar}</div>
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ height: 12, width: px === "0px" ? 2 : Math.round((parseInt(px) / 80) * 120), background: "var(--base-color-blue-800, #1518A6)", borderRadius: 2, minWidth: px === "0px" ? 2 : 4 }} />
    </div>
  </div>
)
