import type { Preview } from "@storybook/nextjs-vite"
import React from "react"
import "../app/globals.css"
import { TooltipProvider } from "@/components/ui/tooltip"

const preview: Preview = {
  parameters: {
    docs: {
      toc: {
        headingSelector: "h2",
        title: "Contents",
      },
    },
    layout: "centered",
    options: {
      storySort: {
        order: [
          'Thematic Design System', ['Introduction', 'Foundation', ['Overview', 'Colour', 'Data Visualisation', 'Typography', 'Spacing', 'Shape', 'Elevation', 'Grid & Layout', 'Motion & Focus', '*'], '*'],
          'Thematic design system', ['Introduction', 'Foundation', ['Overview', 'Colour', 'Data Visualisation', 'Typography', 'Spacing', 'Shape', 'Elevation', 'Grid & Layout', 'Motion & Focus', '*'], '*'],
          'Data display',
          'Messaging',
          'Imagery',
          'Forms and input',
          'Overlays',
          'Navigation',
          'Loading',
          'Pages',
          'Wireframes',
          '*',
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    backgrounds: {
      default: "warm",
      values: [
        { name: "warm", value: "#F5F5F3" },    // gray-75 — taste profile default
        { name: "white", value: "#FFFFFF" },   // pure white — for card isolation
        { name: "dark", value: "#222222" },    // gray-900 — dark mode
        { name: "surface", value: "#EEEEEC" }, // gray-100 — secondary surface
      ],
    },
  },
  decorators: [
    (Story, context) => {
      const isAtom = context.title?.includes("Atoms")
      const isPage = context.title?.includes("Pages")
      return (
        <TooltipProvider>
          <div className={isPage ? "" : isAtom ? "p-4" : "p-8 min-w-[320px]"}>
            <Story />
          </div>
        </TooltipProvider>
      )
    },
  ],
}

export default preview
