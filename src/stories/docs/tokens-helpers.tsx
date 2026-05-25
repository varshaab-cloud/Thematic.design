import React from "react"

export const CodeBlock = ({ lines }: { lines: string[] }) => (
  <div style={{ background: "var(--base-color-gray-75, #F5F5F3)", border: "1px solid var(--base-color-gray-200, #E3E3E0)", borderRadius: 8, padding: "16px 18px", fontFamily: "monospace", fontSize: 12, lineHeight: 1.8, whiteSpace: "pre" }}>
    {lines.join("\n")}
  </div>
)
