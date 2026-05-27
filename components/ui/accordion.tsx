"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

type AccordionSize = "sm" | "md" | "lg"

const AccordionSizeContext = React.createContext<AccordionSize>("md")

const accordionTriggerSizeClasses: Record<AccordionSize, string> = {
  sm: "py-2 px-3 text-xs",
  md: "py-4 px-4 text-sm",
  lg: "py-6 px-5 text-base",
}

const accordionContentSizeClasses: Record<AccordionSize, string> = {
  sm: "pb-2 px-3 pt-0 text-xs",
  md: "pb-4 px-4 pt-0 text-sm",
  lg: "pb-6 px-5 pt-0 text-base",
}

const accordionIconSizeClasses: Record<AccordionSize, string> = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
}

function Accordion({
  className,
  size = "md",
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root> & { size?: AccordionSize }) {
  return (
    <AccordionSizeContext.Provider value={size}>
      <AccordionPrimitive.Root
        data-slot="accordion"
        className={cn("flex w-full flex-col", className)}
        {...props}
      />
    </AccordionSizeContext.Provider>
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("not-last:border-b", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  const size = React.useContext(AccordionSizeContext)
  const iconClass = accordionIconSizeClasses[size]
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-start justify-between rounded-[var(--base-radius-lg)] border border-transparent text-left font-medium transition-all outline-none hover:underline focus-visible:border-[var(--alias-color-border-active)] focus-visible:ring-3 focus-visible:ring-[var(--alias-color-border-active)]/50 focus-visible:after:border-[var(--alias-color-border-active)] disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:text-[var(--alias-color-text-subtle)]",
          accordionTriggerSizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon data-slot="accordion-trigger-icon" className={cn("pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden", iconClass)} />
        <ChevronUpIcon data-slot="accordion-trigger-icon" className={cn("pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline", iconClass)} />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  const size = React.useContext(AccordionSizeContext)
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--radix-accordion-content-height) [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-[var(--alias-color-text-primary)] [&_p:not(:last-child)]:mb-4",
          accordionContentSizeClasses[size],
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
