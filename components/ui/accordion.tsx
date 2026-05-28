"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

type AccordionSize = "sm" | "md" | "lg"

const AccordionSizeContext = React.createContext<AccordionSize>("md")

const accordionTriggerSizeClasses: Record<AccordionSize, string> = {
  sm: "py-[var(--alias-spacing-padding-xs)] px-[var(--alias-spacing-padding-sm)] text-[length:var(--alias-typography-caption1-font-size)]",
  md: "py-[var(--alias-spacing-padding-md)] px-[var(--alias-spacing-padding-md)] text-[length:var(--alias-typography-body-text2-font-size)]",
  lg: "py-[var(--alias-spacing-padding-lg)] px-5 text-[length:var(--alias-typography-body-text1-font-size)]",
}

const accordionContentSizeClasses: Record<AccordionSize, string> = {
  sm: "pb-[var(--alias-spacing-padding-xs)] px-[var(--alias-spacing-padding-sm)] pt-0 text-[length:var(--alias-typography-caption1-font-size)]",
  md: "pb-[var(--alias-spacing-padding-md)] px-[var(--alias-spacing-padding-md)] pt-0 text-[length:var(--alias-typography-body-text2-font-size)]",
  lg: "pb-[var(--alias-spacing-padding-lg)] px-5 pt-0 text-[length:var(--alias-typography-body-text1-font-size)]",
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
          "group/accordion-trigger relative flex flex-1 items-start justify-between rounded-[var(--component-accordion-border-radius)] border border-transparent text-left font-[number:var(--base-font-weight-medium)] [transition:var(--alias-motion-transition-normal)] outline-none hover:underline focus-visible:border-[var(--alias-color-border-active)] focus-visible:ring-3 focus-visible:ring-[var(--alias-color-border-active)]/50 focus-visible:after:border-[var(--alias-color-border-active)] disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:text-[var(--component-accordion-trigger-icon-color)]",
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
      className="overflow-hidden text-[length:var(--alias-typography-body-text2-font-size)] data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--radix-accordion-content-height) [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-[var(--component-accordion-content-text)] [&_p:not(:last-child)]:mb-4",
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
