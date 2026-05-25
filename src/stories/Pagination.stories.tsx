import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Pagination } from "@/components/ui/pagination"

// ─── Controlled wrapper ───────────────────────────────────────────────────────

function PaginationDemo({
  initialPage = 1,
  initialPageSize = 10,
  total,
  pageSizeOptions,
  rowLabel,
}: {
  initialPage?: number
  initialPageSize?: number
  total: number
  pageSizeOptions?: number[]
  rowLabel?: string
}) {
  const [page, setPage] = React.useState(initialPage)
  const [pageSize, setPageSize] = React.useState(initialPageSize)

  return (
    <div className="space-y-3">
      <Pagination
        page={page}
        total={total}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        pageSizeOptions={pageSizeOptions}
        rowLabel={rowLabel}
      />
      <p className="text-xs text-muted-foreground">
        Page {page} of {Math.max(1, Math.ceil(total / pageSize))} · {pageSize} per page
      </p>
    </div>
  )
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Pagination> = {
  title: "Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
}
export default meta
type Story = StoryObj<typeof Pagination>

// ─── Stories ──────────────────────────────────────────────────────────────────

/** Default view: mid-range page, page size selector visible. */
export const Default: Story = {
  name: "Default",
  render: () => (
    <PaginationDemo
      total={142}
      initialPage={5}
      initialPageSize={10}
      pageSizeOptions={[10, 25, 50]}
      rowLabel="members"
    />
  ),
}

/** First page — Prev and First buttons are disabled, never hidden. */
export const FirstPage: Story = {
  name: "First Page",
  render: () => (
    <PaginationDemo
      total={142}
      initialPage={1}
      initialPageSize={10}
      pageSizeOptions={[10, 25, 50]}
      rowLabel="members"
    />
  ),
}

/** Last page — Next and Last buttons are disabled, never hidden. */
export const LastPage: Story = {
  name: "Last Page",
  render: () => (
    <PaginationDemo
      total={142}
      initialPage={15}
      initialPageSize={10}
      pageSizeOptions={[10, 25, 50]}
      rowLabel="members"
    />
  ),
}

/** Many pages — ellipsis markers collapse the middle of the range. */
export const ManyPages: Story = {
  name: "Many Pages (with ellipsis)",
  render: () => (
    <PaginationDemo
      total={500}
      initialPage={12}
      initialPageSize={10}
      pageSizeOptions={[10, 25, 50]}
      rowLabel="results"
    />
  ),
}

/** Small dataset — fewer pages than the ellipsis threshold; all page numbers shown. */
export const SmallDataset: Story = {
  name: "Small Dataset (≤7 pages)",
  render: () => (
    <PaginationDemo
      total={58}
      initialPage={3}
      initialPageSize={10}
      pageSizeOptions={[10, 25, 50]}
      rowLabel="rows"
    />
  ),
}

/** Single page — all navigation disabled. */
export const SinglePage: Story = {
  name: "Single Page",
  render: () => (
    <PaginationDemo
      total={8}
      initialPage={1}
      initialPageSize={10}
      pageSizeOptions={[10, 25, 50]}
      rowLabel="items"
    />
  ),
}

/** No page size selector — navigation only. */
export const NoPageSizeSelector: Story = {
  name: "No Page Size Selector",
  render: () => (
    <PaginationDemo
      total={142}
      initialPage={4}
      initialPageSize={10}
      rowLabel="members"
    />
  ),
}

/** Empty data — zero state for the row count label. */
export const Empty: Story = {
  name: "Empty (zero rows)",
  render: () => (
    <PaginationDemo
      total={0}
      initialPage={1}
      initialPageSize={10}
      pageSizeOptions={[10, 25, 50]}
      rowLabel="results"
    />
  ),
}

/** All page sizes — demonstrates the 25-per-page view. */
export const PageSize25: Story = {
  name: "Page Size 25",
  render: () => (
    <PaginationDemo
      total={142}
      initialPage={3}
      initialPageSize={25}
      pageSizeOptions={[10, 25, 50]}
      rowLabel="members"
    />
  ),
}
