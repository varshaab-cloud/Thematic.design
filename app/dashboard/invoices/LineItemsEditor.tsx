"use client"

import * as React from "react"
import { Plus, Trash2, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { InputBase } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// ─── LineItemsEditor ──────────────────────────────────────────────────────────
// Snowflake: the editable line-item grid for the invoice capture flow. Tied to
// this one page — the columns, the tax-inclusive amount maths and the
// per-row exception messages are invoice-specific, so it does not belong in the
// library or in recipes.

export interface LineItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  taxRate: number
  /** 0–1 extraction confidence for the row, or null when nothing was read. */
  confidence: number | null
}

export interface LineItemIssue {
  id: string
  field: "description" | "quantity" | "unitPrice"
  message: string
}

export function lineNet(item: LineItem): number {
  return item.quantity * item.unitPrice
}

export function lineTax(item: LineItem): number {
  return lineNet(item) * (item.taxRate / 100)
}

export function lineTotal(item: LineItem): number {
  return lineNet(item) + lineTax(item)
}

export function totalsFor(items: LineItem[]) {
  const net = items.reduce((sum, i) => sum + lineNet(i), 0)
  const tax = items.reduce((sum, i) => sum + lineTax(i), 0)
  return { net, tax, gross: net + tax }
}

export function lineItemIssues(items: LineItem[]): LineItemIssue[] {
  const issues: LineItemIssue[] = []
  items.forEach((item) => {
    if (!item.description.trim()) {
      issues.push({ id: item.id, field: "description", message: "Description is missing" })
    }
    if (!(item.quantity > 0)) {
      issues.push({ id: item.id, field: "quantity", message: "Quantity must be greater than zero" })
    }
    if (!(item.unitPrice > 0)) {
      issues.push({ id: item.id, field: "unitPrice", message: "Unit price was not captured" })
    }
  })
  return issues
}

export interface LineItemsEditorProps {
  items: LineItem[]
  onChange: (items: LineItem[]) => void
  /** Show per-row validation once the user has tried to advance. */
  showErrors?: boolean
  formatMoney: (value: number) => string
}

export function LineItemsEditor({
  items,
  onChange,
  showErrors = false,
  formatMoney,
}: LineItemsEditorProps) {
  const issues = lineItemIssues(items)
  const totals = totalsFor(items)

  function update(id: string, patch: Partial<LineItem>) {
    onChange(items.map((i) => (i.id === id ? { ...i, ...patch } : i)))
  }

  function addRow() {
    onChange([
      ...items,
      {
        id: `manual-${items.length + 1}-${items.reduce((n, i) => n + i.id.length, 0)}`,
        description: "",
        quantity: 1,
        unitPrice: 0,
        taxRate: 18,
        confidence: null,
      },
    ])
  }

  function issueFor(id: string, field: LineItemIssue["field"]) {
    return showErrors ? issues.find((x) => x.id === id && x.field === field) : undefined
  }

  function numberValue(raw: string): number {
    const parsed = Number.parseFloat(raw)
    return Number.isFinite(parsed) ? parsed : 0
  }

  return (
    <div
      data-tier="snowflake"
      data-component="LineItemsEditor"
      className="flex flex-col gap-[var(--alias-spacing-stack-sm)]"
    >
      <div className="overflow-hidden rounded-[var(--alias-radius-lg)] border border-[var(--alias-color-border-default)]">
        <Table>
          <caption className="sr-only">
            Invoice line items — description, quantity, unit price, tax rate and amount
          </caption>
          <TableHeader>
            <TableRow className="bg-[var(--alias-color-background-secondary)]">
              <TableHead scope="col">Description</TableHead>
              <TableHead scope="col" className="w-20 text-right">Qty</TableHead>
              <TableHead scope="col" className="w-32 text-right">Unit price</TableHead>
              <TableHead scope="col" className="w-24 text-right">Tax %</TableHead>
              <TableHead scope="col" className="w-32 text-right">Amount</TableHead>
              <TableHead scope="col" className="w-12" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.map((item, index) => {
              const descIssue = issueFor(item.id, "description")
              const qtyIssue = issueFor(item.id, "quantity")
              const priceIssue = issueFor(item.id, "unitPrice")
              const rowHasIssue = !!(descIssue || qtyIssue || priceIssue)

              return (
                <TableRow
                  key={item.id}
                  className={rowHasIssue ? "bg-[var(--alias-color-feedback-error-bg)]" : undefined}
                >
                  <TableCell>
                    <div className="flex flex-col gap-[var(--alias-spacing-inline-xs)]">
                      <div className="flex items-center gap-[var(--alias-spacing-inline-xs)]">
                        <InputBase
                          id={`line-${item.id}-description`}
                          aria-label={`Line ${index + 1} description`}
                          aria-invalid={descIssue ? true : undefined}
                          aria-describedby={descIssue ? `line-${item.id}-description-error` : undefined}
                          value={item.description}
                          onChange={(e) => update(item.id, { description: e.target.value })}
                          placeholder="What was supplied"
                          className={
                            descIssue
                              ? "border-[var(--component-input-field-color-stroke-error)]"
                              : undefined
                          }
                        />
                        {item.confidence === null && (
                          <Badge variant="warning" size="sm">Manual</Badge>
                        )}
                      </div>
                      {descIssue && (
                        <p
                          id={`line-${item.id}-description-error`}
                          className="text-[length:var(--alias-typography-caption1-font-size)] text-[var(--alias-color-feedback-error-fg)]"
                        >
                          {descIssue.message}
                        </p>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="text-right align-top">
                    <InputBase
                      id={`line-${item.id}-quantity`}
                      type="number"
                      min={0}
                      aria-label={`Line ${index + 1} quantity`}
                      aria-invalid={qtyIssue ? true : undefined}
                      value={item.quantity}
                      onChange={(e) => update(item.id, { quantity: numberValue(e.target.value) })}
                      className={`text-right ${qtyIssue ? "border-[var(--component-input-field-color-stroke-error)]" : ""}`}
                    />
                  </TableCell>

                  <TableCell className="text-right align-top">
                    <div className="flex flex-col gap-[var(--alias-spacing-inline-xs)]">
                      <InputBase
                        id={`line-${item.id}-unit-price`}
                        type="number"
                        min={0}
                        step={0.01}
                        aria-label={`Line ${index + 1} unit price`}
                        aria-invalid={priceIssue ? true : undefined}
                        aria-describedby={priceIssue ? `line-${item.id}-unit-price-error` : undefined}
                        value={item.unitPrice}
                        onChange={(e) => update(item.id, { unitPrice: numberValue(e.target.value) })}
                        className={`text-right ${priceIssue ? "border-[var(--component-input-field-color-stroke-error)]" : ""}`}
                      />
                      {priceIssue && (
                        <p
                          id={`line-${item.id}-unit-price-error`}
                          className="text-[length:var(--alias-typography-caption1-font-size)] text-[var(--alias-color-feedback-error-fg)]"
                        >
                          {priceIssue.message}
                        </p>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="text-right align-top">
                    <InputBase
                      id={`line-${item.id}-tax-rate`}
                      type="number"
                      min={0}
                      max={100}
                      aria-label={`Line ${index + 1} tax rate percent`}
                      value={item.taxRate}
                      onChange={(e) => update(item.id, { taxRate: numberValue(e.target.value) })}
                      className="text-right"
                    />
                  </TableCell>

                  <TableCell className="text-right align-top tabular-nums text-[var(--alias-color-text-primary)]">
                    <span className="inline-flex h-8 items-center">{formatMoney(lineTotal(item))}</span>
                  </TableCell>

                  <TableCell className="align-top">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Remove line ${index + 1}${item.description ? `, ${item.description}` : ""}`}
                      onClick={() => onChange(items.filter((i) => i.id !== item.id))}
                      disabled={items.length === 1}
                    >
                      <Trash2 className="text-[var(--alias-color-text-subtle)]" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className="text-right text-[var(--alias-color-text-secondary)]">
                Subtotal
              </TableCell>
              <TableCell className="text-right tabular-nums">{formatMoney(totals.net)}</TableCell>
              <TableCell />
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} className="text-right text-[var(--alias-color-text-secondary)]">
                Tax
              </TableCell>
              <TableCell className="text-right tabular-nums">{formatMoney(totals.tax)}</TableCell>
              <TableCell />
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-right font-[number:var(--alias-typography-weight-semibold)] text-[var(--alias-color-text-primary)]"
              >
                Total
              </TableCell>
              <TableCell className="text-right font-[number:var(--alias-typography-weight-semibold)] tabular-nums text-[var(--alias-color-text-primary)]">
                {formatMoney(totals.gross)}
              </TableCell>
              <TableCell />
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <div className="flex items-center justify-between gap-[var(--alias-spacing-inline-md)]">
        <Button variant="outline" size="sm" onClick={addRow}>
          <Plus />
          Add line
        </Button>

        {showErrors && issues.length > 0 && (
          <p className="flex items-center gap-[var(--alias-spacing-inline-xs)] text-[length:var(--alias-typography-caption1-font-size)] text-[var(--alias-color-feedback-error-fg)]">
            <AlertCircle className="size-3.5" aria-hidden="true" />
            {issues.length} line {issues.length === 1 ? "field needs" : "fields need"} attention
          </p>
        )}
      </div>
    </div>
  )
}
