"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Tabs as TabsPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-[var(--alias-spacing-stack-xs)] data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-[var(--component-tabs-list-border-radius)] p-[3px] text-[var(--alias-color-text-subtle)] group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-[var(--component-tabs-list-bg)]",
        line: "gap-[var(--alias-spacing-inline-xs)] bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-[var(--component-tabs-trigger-border-radius)] border border-transparent px-1.5 py-0.5 text-[length:var(--alias-typography-button-font-size)] font-[number:var(--alias-typography-button-font-weight)] whitespace-nowrap text-[var(--component-tabs-trigger-text)]/60 [transition:var(--alias-motion-transition-normal)] group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-[var(--component-tabs-trigger-text)] focus-visible:border-[var(--component-tabs-trigger-border-active)] focus-visible:ring-[3px] focus-visible:ring-[var(--component-tabs-trigger-border-active)]/50 focus-visible:outline-1 focus-visible:outline-[var(--component-tabs-trigger-border-active)] disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 dark:text-[var(--alias-color-text-subtle)] dark:hover:text-[var(--component-tabs-trigger-text)] group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "data-active:bg-[var(--component-tabs-trigger-bg-active)] data-active:text-[var(--component-tabs-trigger-text-active)] dark:data-active:border-[var(--alias-color-border-default)] dark:data-active:bg-[var(--alias-color-border-default)]/30 dark:data-active:text-[var(--component-tabs-trigger-text-active)]",
        "after:absolute after:bg-[var(--component-tabs-line-indicator-color)] after:opacity-0 after:[transition:var(--alias-motion-transition-fade)] group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 text-[length:var(--alias-typography-body-text2-font-size)] text-[var(--component-tabs-content-text)] outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
