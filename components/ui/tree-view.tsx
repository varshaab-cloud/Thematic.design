"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export type TreeNodeData = {
  id: string
  label: string
  icon?: React.ReactNode
  children?: TreeNodeData[]
  badge?: string | number
}

type TreeViewProps = {
  data: TreeNodeData[]
  onSelect?: (node: TreeNodeData) => void
  defaultExpanded?: string[]
  defaultSelected?: string
  className?: string
}

type TreeViewContextValue = {
  selectedId: string | undefined
  setSelectedId: (id: string) => void
  expandedIds: Set<string>
  toggleExpanded: (id: string) => void
  onSelect?: (node: TreeNodeData) => void
}

const TreeViewContext = React.createContext<TreeViewContextValue>({
  selectedId: undefined,
  setSelectedId: () => {},
  expandedIds: new Set(),
  toggleExpanded: () => {},
})

function TreeView({
  data,
  onSelect,
  defaultExpanded = [],
  defaultSelected,
  className,
}: TreeViewProps) {
  const [selectedId, setSelectedId] = React.useState<string | undefined>(defaultSelected)
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(
    () => new Set(defaultExpanded)
  )

  const handleSelect = React.useCallback(
    (id: string) => {
      setSelectedId(id)
    },
    []
  )

  const toggleExpanded = React.useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  return (
    <TreeViewContext.Provider
      value={{ selectedId, setSelectedId: handleSelect, expandedIds, toggleExpanded, onSelect }}
    >
      <ul
        role="tree"
        className={cn("flex flex-col gap-px text-sm", className)}
        data-slot="tree-view"
      >
        {data.map((node) => (
          <TreeNode key={node.id} node={node} depth={0} />
        ))}
      </ul>
    </TreeViewContext.Provider>
  )
}

type TreeNodeProps = {
  node: TreeNodeData
  depth: number
}

function TreeNode({ node, depth }: TreeNodeProps) {
  const { selectedId, setSelectedId, expandedIds, toggleExpanded, onSelect } =
    React.useContext(TreeViewContext)

  const isSelected = selectedId === node.id
  const isExpanded = expandedIds.has(node.id)
  const hasChildren = Array.isArray(node.children) && node.children.length > 0

  function handleLabelClick(e: React.MouseEvent) {
    e.stopPropagation()
    setSelectedId(node.id)
    onSelect?.(node)
  }

  function handleChevronClick(e: React.MouseEvent) {
    e.stopPropagation()
    if (hasChildren) {
      toggleExpanded(node.id)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setSelectedId(node.id)
      onSelect?.(node)
    }
    if (e.key === "ArrowRight" && hasChildren && !isExpanded) {
      toggleExpanded(node.id)
    }
    if (e.key === "ArrowLeft" && hasChildren && isExpanded) {
      toggleExpanded(node.id)
    }
  }

  return (
    <li role="treeitem" aria-selected={isSelected} aria-expanded={hasChildren ? isExpanded : undefined} data-slot="tree-node">
      <div
        className={cn(
          "flex items-center gap-1 rounded-[var(--base-radius-sm)] px-1 py-1 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--base-color-blue-500)]",
          isSelected
            ? "bg-[color-mix(in_srgb,var(--base-color-blue-800)_10%,transparent)] text-[var(--base-color-blue-900)]"
            : "hover:bg-[var(--alias-color-background-hover)]"
        )}
        style={{ paddingLeft: `${depth * 16 + 4}px` }}
        tabIndex={0}
        onClick={handleLabelClick}
        onKeyDown={handleKeyDown}
        data-slot="tree-node-row"
      >
        {/* Chevron or spacer */}
        <span
          className={cn(
            "flex size-4 shrink-0 items-center justify-center transition-transform duration-150",
            hasChildren ? "cursor-pointer" : "pointer-events-none opacity-0"
          )}
          onClick={handleChevronClick}
          aria-hidden="true"
        >
          {hasChildren && (
            <ChevronRight
              className={cn(
                "size-3.5 transition-transform duration-150",
                isExpanded && "rotate-90"
              )}
            />
          )}
        </span>

        {/* Icon */}
        {node.icon && (
          <span className="flex size-4 shrink-0 items-center justify-center text-[var(--alias-color-text-subtle)] [&_svg]:size-4">
            {node.icon}
          </span>
        )}

        {/* Label */}
        <span className="flex-1 truncate">{node.label}</span>

        {/* Badge */}
        {node.badge !== undefined && (
          <span
            className="ml-auto flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--base-color-gray-200)] px-1 text-[10px] font-medium tabular-nums text-[var(--alias-color-text-subtle)]"
            data-slot="tree-node-badge"
          >
            {node.badge}
          </span>
        )}
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <ul role="group" className="flex flex-col gap-px">
          {node.children!.map((child) => (
            <TreeNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  )
}

export { TreeView }
