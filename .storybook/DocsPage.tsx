import React from "react"
import {
  Title,
  Subtitle,
  Primary,
  Controls,
  Description,
  Stories,
} from "@storybook/addon-docs/blocks"

export function DocsPage() {
  return (
    <>
      <Title />
      <Subtitle />
      <Primary />
      <Controls />
      <Description of="meta" />
      <Stories />
    </>
  )
}
