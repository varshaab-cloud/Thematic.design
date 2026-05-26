"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type RowSelectionState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  Settings2,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

// ─── Types ──────────────────────────────────────────────────────────────────

export interface DataTableProps<TData, TValue> {
  /** Column definitions — use columnHelper or plain ColumnDef array */
  columns: ColumnDef<TData, TValue>[]
  /** Row data */
  data: TData[]
  /** Show a global search input above the table */
  searchable?: boolean
  /** Placeholder for the search input */
  searchPlaceholder?: string
  /** Column id to search against (defaults to all string columns) */
  globalFilterColumn?: string
  /** Enable row checkboxes */
  selectable?: boolean
  /** Called with selected row objects whenever selection changes */
  onSelectionChange?: (rows: TData[]) => void
  /** Rows per page options */
  pageSizeOptions?: number[]
  /** Default page size */
  defaultPageSize?: number
  /** Show column visibility toggle */
  columnToggle?: boolean
  /** Replace table body when data is empty */
  emptyState?: React.ReactNode
  /** Show skeleton loading rows instead of real data */
  isLoading?: boolean
  /** Number of skeleton rows to show during loading */
  skeletonRows?: number
  className?: string
}

// ─── Sort Icon ───────────────────────────────────────────────────────────────

function SortIcon({ sorted }: { sorted: false | "asc" | "desc" }) {
  if (sorted === "asc")  return <ChevronUp  className="size-3.5 shrink-0 text-[var(--alias-color-text-primary)]" />
  if (sorted === "desc") return <ChevronDown className="size-3.5 shrink-0 text-[var(--alias-color-text-primary)]" />
  return <ChevronsUpDown className="size-3.5 shrink-0 text-[var(--alias-color-text-subtle)]/50" />
}

// ─── Skeleton Row ────────────────────────────────────────────────────────────

function SkeletonRow({ colCount }: { colCount: number }) {
  return (
    <tr className="border-b border-[var(--alias-color-border-default)]">
      {Array.from({ length: colCount }).map((_, i) => (
        <td key={i} className="px-3 py-2.5">
          <div
            className="h-4 rounded-md bg-[var(--alias-color-background-tertiary)] animate-pulse"
            style={{ width: `${60 + ((i * 37) % 30)}%` }}
          />
        </td>
      ))}
    </tr>
  )
}

// ─── Empty State ─────────────────────────────────────────────────────────────

function DefaultEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
      <div className="flex size-10 items-center justify-center rounded-full bg-[var(--alias-color-background-tertiary)]">
        <Search className="size-5 text-[var(--alias-color-text-subtle)]" />
      </div>
      <p className="text-sm font-medium text-[var(--alias-color-text-primary)]">No results</p>
      <p className="text-xs text-[var(--alias-color-text-subtle)]">
        Try adjusting your search or filters.
      </p>
    </div>
  )
}

// ─── Column Visibility Popover ────────────────────────────────────────────────

function ColumnToggle<TData>({
  table,
}: {
  table: ReturnType<typeof useReactTable<TData>>
}) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handle)
    return () => document.removeEventListener("mousedown", handle)
  }, [])

  return (
    <div ref={ref} className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <Settings2 className="size-3.5" />
        Columns
      </Button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-44 rounded-lg border border-[var(--alias-color-border-default)] bg-[var(--alias-color-background-primary)] p-1 shadow-[var(--base-shadow-04)]">
          {table
            .getAllColumns()
            .filter(col => col.getCanHide())
            .map(col => (
              <label
                key={col.id}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-xs hover:bg-[var(--base-color-gray-100)]"
              >
                <input
                  type="checkbox"
                  className="size-3 accent-primary"
                  checked={col.getIsVisible()}
                  onChange={col.getToggleVisibilityHandler()}
                />
                <span className="truncate text-[var(--alias-color-text-primary)] capitalize">
                  {typeof col.columnDef.header === "string"
                    ? col.columnDef.header
                    : col.id}
                </span>
              </label>
            ))}
        </div>
      )}
    </div>
  )
}

// ─── Main DataTable ───────────────────────────────────────────────────────────

export function DataTable<TData, TValue>({
  columns,
  data,
  searchable = true,
  searchPlaceholder = "Search…",
  selectable = false,
  onSelectionChange,
  pageSizeOptions = [10, 25, 50, 100],
  defaultPageSize = 10,
  columnToggle = false,
  emptyState,
  isLoading = false,
  skeletonRows = 8,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting]               = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters]   = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection]     = React.useState<RowSelectionState>({})
  const [globalFilter, setGlobalFilter]     = React.useState("")

  // Inject a selection column when selectable=true
  const allColumns: ColumnDef<TData, TValue>[] = React.useMemo(() => {
    if (!selectable) return columns
    const selectionCol: ColumnDef<TData, TValue> = {
      id: "__select__",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() ? "indeterminate" : false)
          }
          onCheckedChange={v => table.toggleAllPageRowsSelected(!!v)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={v => row.toggleSelected(!!v)}
          aria-label="Select row"
          onClick={e => e.stopPropagation()}
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 40,
    }
    return [selectionCol, ...columns]
  }, [columns, selectable])

  const table = useReactTable({
    data,
    columns: allColumns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    enableRowSelection: selectable,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: defaultPageSize },
    },
  })

  // Notify parent of selection changes
  React.useEffect(() => {
    if (!onSelectionChange) return
    const selected = table
      .getSelectedRowModel()
      .rows.map(r => r.original)
    onSelectionChange(selected)
  }, [rowSelection, onSelectionChange, table])

  const selectedCount = table.getSelectedRowModel().rows.length
  const totalRows = table.getFilteredRowModel().rows.length
  const { pageIndex, pageSize } = table.getState().pagination
  const pageCount = table.getPageCount()

  return (
    <div className={cn("flex flex-col gap-3", className)}>

      {/* ── Toolbar ── */}
      {(searchable || columnToggle || (selectable && selectedCount > 0)) && (
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-1 items-center gap-2">
            {/* Global search */}
            {searchable && (
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[var(--alias-color-text-subtle)] pointer-events-none" />
                <input
                  value={globalFilter}
                  onChange={e => setGlobalFilter(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="h-8 w-full rounded-lg border border-[var(--alias-color-border-default)] bg-transparent pl-8 pr-8 text-sm outline-none transition-colors placeholder:text-[var(--alias-color-text-subtle)] focus-visible:border-[var(--alias-color-border-active)] focus-visible:ring-3 focus-visible:ring-[var(--alias-color-border-active)]/50"
                />
                {globalFilter && (
                  <button
                    onClick={() => setGlobalFilter("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--alias-color-text-subtle)] hover:text-[var(--alias-color-text-primary)]"
                    aria-label="Clear search"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>
            )}

            {/* Selection badge */}
            {selectable && selectedCount > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--base-color-blue-800)]/20 bg-[var(--base-color-blue-100)] px-2.5 py-0.5 text-xs font-medium text-[var(--base-color-blue-800)]">
                {selectedCount} selected
                <button
                  onClick={() => table.resetRowSelection()}
                  className="hover:text-[var(--alias-color-text-primary)]"
                  aria-label="Clear selection"
                >
                  <X className="size-3" />
                </button>
              </span>
            )}
          </div>

          {/* Column toggle */}
          {columnToggle && <ColumnToggle table={table} />}
        </div>
      )}

      {/* ── Table ── */}
      <div className="overflow-hidden rounded-[var(--base-radius-md)] border border-[var(--alias-color-border-default)] bg-[var(--alias-color-background-primary)] shadow-[var(--base-shadow-02)]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Head */}
            <thead>
              {table.getHeaderGroups().map(hg => (
                <tr key={hg.id} className="border-b border-[var(--alias-color-border-default)] bg-[var(--base-color-gray-75)]">
                  {hg.headers.map(header => {
                    const canSort = header.column.getCanSort()
                    const sorted  = header.column.getIsSorted()
                    return (
                      <th
                        key={header.id}
                        scope="col"
                        style={{ width: header.column.columnDef.size }}
                        className={cn(
                          "px-3 py-2.5 text-left text-xs font-medium text-[var(--alias-color-text-subtle)] select-none",
                          canSort && "cursor-pointer hover:text-[var(--alias-color-text-primary)] transition-colors"
                        )}
                        onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                        aria-sort={
                          sorted === "asc"
                            ? "ascending"
                            : sorted === "desc"
                            ? "descending"
                            : undefined
                        }
                      >
                        {header.isPlaceholder ? null : (
                          <div className="flex items-center gap-1.5">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {canSort && <SortIcon sorted={sorted} />}
                          </div>
                        )}
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-[var(--alias-color-border-default)]">
              {isLoading ? (
                Array.from({ length: skeletonRows }).map((_, i) => (
                  <SkeletonRow key={i} colCount={allColumns.length} />
                ))
              ) : table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={allColumns.length}>
                    {emptyState ?? <DefaultEmptyState />}
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map(row => (
                  <tr
                    key={row.id}
                    data-selected={row.getIsSelected() || undefined}
                    className="transition-colors hover:bg-[var(--base-color-gray-75)] data-[selected]:bg-[var(--base-color-blue-100)]/60"
                  >
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="px-3 py-2.5 text-[var(--alias-color-text-primary)]">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Pagination ── */}
      <div className="flex items-center justify-between gap-4 text-xs text-[var(--alias-color-text-subtle)]">
        {/* Row count */}
        <span>
          {selectable && selectedCount > 0
            ? `${selectedCount} of ${totalRows} row${totalRows !== 1 ? "s" : ""} selected`
            : `${totalRows} row${totalRows !== 1 ? "s" : ""}`}
        </span>

        <div className="flex items-center gap-3">
          {/* Page size selector */}
          <div className="flex items-center gap-1.5">
            <span>Rows per page</span>
            <select
              value={pageSize}
              onChange={e => table.setPageSize(Number(e.target.value))}
              className="h-7 rounded-md border border-[var(--alias-color-border-default)] bg-transparent px-1.5 text-xs text-[var(--alias-color-text-primary)] outline-none focus:border-[var(--alias-color-border-active)] focus:ring-2 focus:ring-[var(--alias-color-border-active)]/50"
            >
              {pageSizeOptions.map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Page indicator */}
          <span className="tabular-nums">
            Page {pageIndex + 1} of {pageCount || 1}
          </span>

          {/* Nav buttons */}
          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              aria-label="First page"
            >
              <ChevronsLeft />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label="Previous page"
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              aria-label="Next page"
            >
              <ChevronRight />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => table.setPageIndex(pageCount - 1)}
              disabled={!table.getCanNextPage()}
              aria-label="Last page"
            >
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
