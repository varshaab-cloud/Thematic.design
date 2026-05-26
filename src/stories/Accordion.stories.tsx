import type { Meta, StoryObj } from "@storybook/react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion"

const meta: Meta<typeof Accordion> = {
  title: "Data display/Accordion",
  component: Accordion,
}

export default meta
type Story = StoryObj<typeof Accordion>

export const Single: Story = {
  render: () => (
    <Accordion type="single" collapsible className="max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is a design token?</AccordionTrigger>
        <AccordionContent>Design tokens are named values that represent design decisions like colors, spacing, and typography.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What is Radix UI?</AccordionTrigger>
        <AccordionContent>Radix UI provides unstyled, accessible component primitives for building high-quality design systems.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What is Style Dictionary?</AccordionTrigger>
        <AccordionContent>Style Dictionary transforms token JSON files into CSS variables, JS constants, and other platform formats.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>Section One</AccordionTrigger>
        <AccordionContent>Multiple accordion allows several items to be open at once.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section Two</AccordionTrigger>
        <AccordionContent>This section can be open at the same time as others.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Section Three</AccordionTrigger>
        <AccordionContent>Useful for FAQs and expandable settings panels.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8 max-w-lg">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">sm</p>
        <Accordion type="single" collapsible size="sm">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is a design token?</AccordionTrigger>
            <AccordionContent>Design tokens are named values that represent design decisions like colors, spacing, and typography.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What is Radix UI?</AccordionTrigger>
            <AccordionContent>Radix UI provides unstyled, accessible component primitives for building high-quality design systems.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">md</p>
        <Accordion type="single" collapsible size="md">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is a design token?</AccordionTrigger>
            <AccordionContent>Design tokens are named values that represent design decisions like colors, spacing, and typography.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What is Radix UI?</AccordionTrigger>
            <AccordionContent>Radix UI provides unstyled, accessible component primitives for building high-quality design systems.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">lg</p>
        <Accordion type="single" collapsible size="lg">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is a design token?</AccordionTrigger>
            <AccordionContent>Design tokens are named values that represent design decisions like colors, spacing, and typography.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What is Radix UI?</AccordionTrigger>
            <AccordionContent>Radix UI provides unstyled, accessible component primitives for building high-quality design systems.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
}
