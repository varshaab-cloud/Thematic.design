import React from "react"

export const TypeRow = ({
  name,
  weight,
  size,
  lineHeight,
  token,
  sample,
}: {
  name: string
  weight: string
  size: string
  lineHeight: string
  token: string
  sample: string
}) => (
  <div style={{ display: "grid", gridTemplateColumns: "160px 100px 1fr", alignItems: "center", gap: 16, padding: "14px 0", borderBottom: "1px solid var(--base-color-gray-200, #E3E3E0)" }}>
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--base-color-gray-900, #222)" }}>{name}</div>
      <div style={{ fontSize: 10, fontFamily: "monospace", color: "var(--base-color-blue-800, #1518A6)", marginTop: 2 }}>{token}</div>
    </div>
    <div style={{ fontSize: 11, color: "var(--base-color-gray-500, #909090)", lineHeight: 1.4 }}>
      <div>{weight}</div>
      <div>{size} / {lineHeight}</div>
    </div>
    <div style={{ fontFamily: "var(--font-sans, 'Outfit', sans-serif)", fontSize: size, fontWeight: parseInt(weight), lineHeight, color: "var(--base-color-gray-900, #222)", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
      {sample}
    </div>
  </div>
)
