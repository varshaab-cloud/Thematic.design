import React from "react"

export const Chip = ({
  token,
  hex,
  name,
  usage,
  border,
}: {
  token: string
  hex: string
  name: string
  usage?: string
  border?: boolean
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--base-color-gray-200, #E3E3E0)" }}>
    <div style={{ width: 36, height: 36, borderRadius: 6, flexShrink: 0, background: "var(--base-color-" + token + ", " + hex + ")", border: border ? "1px solid var(--base-color-gray-200, #E3E3E0)" : "none" }} />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--base-color-gray-900, #222)" }}>{name}</div>
      <div style={{ fontSize: 11, fontFamily: "monospace", color: "var(--base-color-gray-500, #909090)" }}>--base-color-{token} · {hex}</div>
    </div>
    {usage && <div style={{ fontSize: 12, color: "var(--base-color-gray-500, #909090)", textAlign: "right", maxWidth: 200, lineHeight: 1.4 }}>{usage}</div>}
  </div>
)

export const SwatchGrid = ({ swatches }: { swatches: { token: string; hex: string; name: string; border?: boolean }[] }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: 8, marginBottom: 32 }}>
    {swatches.map(s => (
      <div key={s.token}>
        <div style={{ height: 56, borderRadius: 8, background: "var(--base-color-" + s.token + ", " + s.hex + ")", border: s.border ? "1px solid var(--base-color-gray-200)" : "none", marginBottom: 6 }} />
        <div style={{ fontSize: 11, fontWeight: 500, color: "var(--base-color-gray-700, #464646)" }}>{s.name}</div>
        <div style={{ fontSize: 10, fontFamily: "monospace", color: "var(--base-color-gray-500, #909090)" }}>{s.hex}</div>
      </div>
    ))}
  </div>
)

export const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--base-color-gray-500, #909090)", margin: "32px 0 12px" }}>{children}</div>
)
