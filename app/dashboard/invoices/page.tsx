"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import {
  FileText,
  Inbox,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  ScanLine,
  ArrowRight,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, MetricCard } from "@/components/ui/card"
import { EmptyState } from "@/components/ui/empty-state"
import { FileUpload } from "@/components/ui/file-upload"
import { InputBase } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectField,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Stepper, StepperActions, StepperContent, type StepperStep } from "@/components/ui/stepper"
import { Textarea } from "@/components/ui/textarea"
import { ConfidenceField } from "@/components/recipes/ConfidenceField"
import {
  LineItemsEditor,
  lineItemIssues,
  totalsFor,
  type LineItem,
} from "./LineItemsEditor"

// ─── Steps ────────────────────────────────────────────────────────────────────

const STEPS: StepperStep[] = [
  { id: "upload",  label: "Upload"       },
  { id: "capture", label: "Invoice data" },
  { id: "lines",   label: "Line items"   },
  { id: "review",  label: "Review"       },
]

const STEP_UPLOAD = 0
const STEP_CAPTURE = 1
const STEP_LINES = 2
const STEP_REVIEW = 3

// ─── Captured-field model ─────────────────────────────────────────────────────

type FieldKey =
  | "invoiceNumber"
  | "invoiceDate"
  | "dueDate"
  | "vendorName"
  | "vendorGstin"
  | "poNumber"
  | "currency"
  | "paymentTerms"
  | "billTo"

interface CapturedField {
  value: string
  /** 0–1 extraction confidence, or null when the document AI found nothing. */
  confidence: number | null
  edited: boolean
}

type Capture = Record<FieldKey, CapturedField>

const FIELD_LABEL: Record<FieldKey, string> = {
  invoiceNumber: "Invoice number",
  invoiceDate:   "Invoice date",
  dueDate:       "Due date",
  vendorName:    "Vendor",
  vendorGstin:   "Vendor GSTIN",
  poNumber:      "PO number",
  currency:      "Currency",
  paymentTerms:  "Payment terms",
  billTo:        "Bill to",
}

const REQUIRED_FIELDS: FieldKey[] = [
  "invoiceNumber",
  "invoiceDate",
  "dueDate",
  "vendorName",
  "currency",
  "billTo",
]

function blankCapture(): Capture {
  return (Object.keys(FIELD_LABEL) as FieldKey[]).reduce((acc, key) => {
    acc[key] = { value: "", confidence: null, edited: false }
    return acc
  }, {} as Capture)
}

/**
 * Stand-in for a document-AI extraction result. Two fields come back empty and
 * two come back low-confidence on purpose — this page exists to show what the
 * reviewer does about exactly that.
 */
const EXTRACTED: Capture = {
  invoiceNumber: { value: "INV-2026-04417",              confidence: 0.98, edited: false },
  invoiceDate:   { value: "2026-07-18",                  confidence: 0.96, edited: false },
  dueDate:       { value: "",                            confidence: null, edited: false },
  vendorName:    { value: "Amazing Blooms",              confidence: 0.94, edited: false },
  vendorGstin:   { value: "29AABCU9603R1ZM",             confidence: 0.62, edited: false },
  poNumber:      { value: "",                            confidence: null, edited: false },
  currency:      { value: "INR",                         confidence: 0.99, edited: false },
  paymentTerms:  { value: "net-30",                      confidence: 0.71, edited: false },
  billTo:        { value: "Safehalo Facilities Pvt Ltd", confidence: 0.88, edited: false },
}

const EXTRACTED_LINES: LineItem[] = [
  { id: "l1", description: "Seasonal plant replacement — lobby and atrium", quantity: 24, unitPrice: 450,   taxRate: 18, confidence: 0.95 },
  { id: "l2", description: "Monthly garden maintenance — July 2026",        quantity: 1,  unitPrice: 18500, taxRate: 18, confidence: 0.93 },
  { id: "l3", description: "Drip irrigation repair — basement planters",    quantity: 1,  unitPrice: 0,     taxRate: 18, confidence: 0.44 },
]

/** Grand total printed on the document, used to reconcile against the lines. */
const DOCUMENT_TOTAL = { value: 36344, confidence: 0.97 }

const CURRENCIES = ["INR", "USD", "EUR", "GBP", "AED"]

const PAYMENT_TERMS = [
  { value: "due-on-receipt", label: "Due on receipt" },
  { value: "net-15",         label: "Net 15"         },
  { value: "net-30",         label: "Net 30"         },
  { value: "net-45",         label: "Net 45"         },
  { value: "net-60",         label: "Net 60"         },
]

const GL_CODES = [
  { value: "6410", label: "6410 · Grounds & landscaping" },
  { value: "6420", label: "6420 · Building maintenance"  },
  { value: "6430", label: "6430 · Housekeeping"          },
  { value: "6510", label: "6510 · Security services"     },
]

const COST_CENTRES = [
  { value: "blr-01", label: "BLR-01 · Whitefield campus" },
  { value: "blr-02", label: "BLR-02 · Koramangala"       },
  { value: "hyd-01", label: "HYD-01 · Gachibowli"        },
]

const APPROVERS = [
  { value: "r.iyer",   label: "Ramya Iyer · Facilities Head" },
  { value: "a.khan",   label: "Adil Khan · Finance Manager"  },
  { value: "s.nayak",  label: "Sunil Nayak · Controller"     },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fieldError(key: FieldKey, capture: Capture): string | undefined {
  const field = capture[key]
  const value = field.value.trim()

  if (REQUIRED_FIELDS.includes(key) && !value) {
    return field.confidence === null
      ? `${FIELD_LABEL[key]} was not found on the document — enter it to continue`
      : `${FIELD_LABEL[key]} is required`
  }

  if (key === "dueDate" && value && capture.invoiceDate.value) {
    if (value < capture.invoiceDate.value) {
      return "Due date cannot be earlier than the invoice date"
    }
  }

  if (key === "vendorGstin" && value && value.length !== 15) {
    return "GSTIN should be 15 characters — check it against the document"
  }

  return undefined
}

function captureErrors(capture: Capture): Array<{ key: FieldKey; message: string }> {
  return (Object.keys(FIELD_LABEL) as FieldKey[])
    .map((key) => ({ key, message: fieldError(key, capture) }))
    .filter((x): x is { key: FieldKey; message: string } => !!x.message)
}

/** Fields the model read but is not sure about, and a human hasn't confirmed yet. */
function lowConfidenceFields(capture: Capture): FieldKey[] {
  return (Object.keys(FIELD_LABEL) as FieldKey[]).filter((key) => {
    const f = capture[key]
    return !f.edited && f.confidence !== null && f.confidence < 0.9 && !!f.value.trim()
  })
}

interface Exception {
  id: string
  step: number
  title: string
  detail: string
  severity: "error" | "warning"
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InvoiceProcessingPage() {
  const [step, setStep] = useState(STEP_UPLOAD)
  const [status, setStatus] = useState<"idle" | "extracting" | "ready">("idle")
  const [progress, setProgress] = useState(0)
  const [fileName, setFileName] = useState("")

  const [capture, setCapture] = useState<Capture>(blankCapture)
  const [items, setItems] = useState<LineItem[]>([])
  const [approval, setApproval] = useState({ glCode: "", costCentre: "", approver: "", note: "" })

  const [showErrors, setShowErrors] = useState<Record<number, boolean>>({})
  const [submitted, setSubmitted] = useState(false)

  // ── Extraction (simulated) ──────────────────────────────────────────────────
  // Stands in for a document-AI round trip. Timers are held in refs so a
  // navigation mid-extraction doesn't leave them running against a dead tree.

  const tickRef = useRef<number | null>(null)
  const doneRef = useRef<number | null>(null)

  function clearTimers() {
    if (tickRef.current !== null) window.clearInterval(tickRef.current)
    if (doneRef.current !== null) window.clearTimeout(doneRef.current)
    tickRef.current = null
    doneRef.current = null
  }

  useEffect(() => clearTimers, [])

  function runExtraction(name: string) {
    clearTimers()
    setFileName(name)
    setStatus("extracting")
    setProgress(0)
    setSubmitted(false)
    setShowErrors({})

    tickRef.current = window.setInterval(() => {
      setProgress((p) => Math.min(p + 20, 100))
    }, 180)

    doneRef.current = window.setTimeout(() => {
      clearTimers()
      setProgress(100)
      setCapture(EXTRACTED)
      setItems(EXTRACTED_LINES)
      setStatus("ready")
      // The captured values came from a machine, not from the person reviewing
      // them, so anything already wrong is surfaced straight away rather than
      // waiting for them to trip over it. Routing choices on the review step
      // are theirs to make, so those stay quiet until they submit.
      setShowErrors({ [STEP_CAPTURE]: true, [STEP_LINES]: true })
    }, 1100)
  }

  function reset() {
    clearTimers()
    setStep(STEP_UPLOAD)
    setStatus("idle")
    setProgress(0)
    setFileName("")
    setCapture(blankCapture())
    setItems([])
    setApproval({ glCode: "", costCentre: "", approver: "", note: "" })
    setShowErrors({})
    setSubmitted(false)
  }

  // ── Derived state ───────────────────────────────────────────────────────────

  const money = useMemo(() => {
    const code = CURRENCIES.includes(capture.currency.value) ? capture.currency.value : "INR"
    const formatter = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: code,
      maximumFractionDigits: 2,
    })
    return (value: number) => formatter.format(value)
  }, [capture.currency.value])

  const totals = useMemo(() => totalsFor(items), [items])
  const lineIssues = useMemo(() => lineItemIssues(items), [items])
  const capErrors = useMemo(() => captureErrors(capture), [capture])
  const lowConfidence = useMemo(() => lowConfidenceFields(capture), [capture])

  const totalsGap = totals.gross - DOCUMENT_TOTAL.value
  const totalsMatch = Math.abs(totalsGap) < 1

  const exceptions: Exception[] = useMemo(() => {
    const list: Exception[] = []

    capErrors.forEach(({ key, message }) => {
      list.push({
        id: `field-${key}`,
        step: STEP_CAPTURE,
        title: FIELD_LABEL[key],
        detail: message,
        severity: "error",
      })
    })

    lineIssues.forEach((issue, index) => {
      list.push({
        id: `line-${issue.id}-${issue.field}-${index}`,
        step: STEP_LINES,
        title: `Line item ${items.findIndex((i) => i.id === issue.id) + 1}`,
        detail: issue.message,
        severity: "error",
      })
    })

    if (status === "ready" && items.length === 0) {
      list.push({
        id: "no-lines",
        step: STEP_LINES,
        title: "Line items",
        detail: "An invoice needs at least one line item",
        severity: "error",
      })
    }

    if (items.length > 0 && !totalsMatch) {
      list.push({
        id: "totals-mismatch",
        step: STEP_LINES,
        title: "Totals do not reconcile",
        detail: `Line items add up to ${money(totals.gross)}, the document says ${money(
          DOCUMENT_TOTAL.value
        )} — a gap of ${money(Math.abs(totalsGap))}`,
        severity: "error",
      })
    }

    if (!approval.glCode) {
      list.push({ id: "gl", step: STEP_REVIEW, title: "GL code", detail: "Pick a GL code before posting", severity: "error" })
    }
    if (!approval.costCentre) {
      list.push({ id: "cc", step: STEP_REVIEW, title: "Cost centre", detail: "Pick a cost centre before posting", severity: "error" })
    }
    if (!approval.approver) {
      list.push({ id: "approver", step: STEP_REVIEW, title: "Approver", detail: "Route the invoice to an approver", severity: "error" })
    }

    lowConfidence.forEach((key) => {
      list.push({
        id: `low-${key}`,
        step: STEP_CAPTURE,
        title: FIELD_LABEL[key],
        detail: `Read with ${Math.round((capture[key].confidence ?? 0) * 100)}% confidence — check it against the document`,
        severity: "warning",
      })
    })

    return list
  }, [capErrors, lineIssues, items, status, totalsMatch, totalsGap, totals.gross, approval, lowConfidence, capture, money])

  const blocking = exceptions.filter((e) => e.severity === "error")
  const advisories = exceptions.filter((e) => e.severity === "warning")
  /** Blockers that come from the document itself, not from the routing choices. */
  const dataBlocking = blocking.filter((e) => e.step !== STEP_REVIEW)

  // ── Field plumbing ──────────────────────────────────────────────────────────

  function setField(key: FieldKey, value: string) {
    setCapture((prev) => ({ ...prev, [key]: { ...prev[key], value, edited: true } }))
  }

  function errorFor(key: FieldKey, stepIndex: number) {
    return showErrors[stepIndex] ? fieldError(key, capture) : undefined
  }

  function describedBy(key: FieldKey, stepIndex: number) {
    return errorFor(key, stepIndex) ? `${key}-error` : undefined
  }

  // ── Navigation ──────────────────────────────────────────────────────────────

  /** Blockers that belong to a given step, so a step can be gated on its own data. */
  function blockersOn(target: number) {
    return blocking.filter((e) => e.step === target)
  }

  function goNext() {
    setShowErrors((prev) => ({ ...prev, [step]: true }))
    if (step === STEP_UPLOAD) {
      if (status !== "ready") return
    } else if (blockersOn(step).length > 0) {
      // Validate before advancing — otherwise the inline errors are never read.
      return
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0))
  }

  function goToStep(target: number) {
    setShowErrors((prev) => ({ ...prev, [target]: true }))
    setStep(target)
  }

  function handleSubmit() {
    setShowErrors({ [STEP_CAPTURE]: true, [STEP_LINES]: true, [STEP_REVIEW]: true })
    if (blocking.length > 0) return
    setSubmitted(true)
  }

  const capturedCount = (Object.keys(FIELD_LABEL) as FieldKey[]).filter(
    (k) => !!capture[k].value.trim()
  ).length
  const totalFields = Object.keys(FIELD_LABEL).length

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto flex max-w-5xl flex-col gap-[var(--alias-spacing-stack-lg)]">

          {/* Page header */}
          <div className="flex flex-wrap items-start justify-between gap-[var(--alias-spacing-inline-md)]">
            <div>
              <h1 className="text-2xl font-bold text-[var(--alias-color-text-primary)]">
                Invoice processing
              </h1>
              <p className="mt-1 text-sm text-[var(--alias-color-text-secondary)]">
                Capture an invoice, check what the extraction missed, and route it for approval.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={reset}>
              <RefreshCw />
              Start over
            </Button>
          </div>

          {/* Queue summary */}
          <div className="grid grid-cols-2 gap-[var(--alias-spacing-inline-md)] lg:grid-cols-4">
            <MetricCard
              label="In queue"
              value={14}
              icon={<Inbox aria-hidden="true" />}
              trend="up"
              trendValue="+3"
              trendLabel="since yesterday"
            />
            <MetricCard
              label="Awaiting review"
              value={3}
              variant="warning"
              icon={<AlertTriangle aria-hidden="true" />}
            />
            <MetricCard
              label="Approved today"
              value={27}
              variant="success"
              icon={<CheckCircle2 aria-hidden="true" />}
            />
            <MetricCard
              label="Exceptions on this invoice"
              value={status === "ready" ? dataBlocking.length : "—"}
              variant={status !== "ready" ? "default" : dataBlocking.length > 0 ? "error" : "success"}
              icon={<ScanLine aria-hidden="true" />}
            />
          </div>

          {submitted ? (
            /* ── Confirmation ────────────────────────────────────────────────── */
            <Card>
              <CardContent>
                <EmptyState
                  icon={<CheckCircle2 aria-hidden="true" />}
                  heading={`${capture.invoiceNumber.value} sent for approval`}
                  description={`${money(totals.gross)} routed to ${
                    APPROVERS.find((a) => a.value === approval.approver)?.label ?? "the approver"
                  }. You'll see it in the queue until they sign off.`}
                  action={
                    <Button onClick={reset}>
                      Process another invoice
                      <ArrowRight />
                    </Button>
                  }
                  size="md"
                />
              </CardContent>
            </Card>
          ) : (
            /* ── Wizard ──────────────────────────────────────────────────────── */
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="sr-only">Invoice capture</CardTitle>
                <Stepper steps={STEPS} currentStep={step} className="py-2" />
              </CardHeader>

              <CardContent className="flex flex-col gap-[var(--alias-spacing-stack-md)]">

                {/* ── Step 1 · Upload ──────────────────────────────────────── */}
                <StepperContent step={STEP_UPLOAD} currentStep={step}>
                  <div className="flex flex-col gap-[var(--alias-spacing-stack-md)]">
                    <div>
                      <h2 className="text-base font-semibold text-[var(--alias-color-text-primary)]">
                        Upload the invoice
                      </h2>
                      <p className="mt-1 text-sm text-[var(--alias-color-text-secondary)]">
                        PDF, PNG or JPG up to 10&nbsp;MB. Fields are read automatically — you check them on the next step.
                      </p>
                    </div>

                    {status === "idle" && (
                      <>
                        <FileUpload
                          accept=".pdf,.png,.jpg,.jpeg"
                          maxSizeMB={10}
                          onFilesSelected={(files) => runExtraction(files[0]?.name ?? "invoice.pdf")}
                        />
                        <div className="flex items-center gap-[var(--alias-spacing-inline-md)]">
                          <Separator className="flex-1" />
                          <span className="text-[length:var(--alias-typography-caption1-font-size)] text-[var(--alias-color-text-subtle)]">
                            or
                          </span>
                          <Separator className="flex-1" />
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => runExtraction("amazing-blooms-jul-2026.pdf")}
                          className="self-start"
                        >
                          <FileText />
                          Use a sample invoice
                        </Button>
                        {showErrors[STEP_UPLOAD] && (
                          <p className="text-[length:var(--alias-typography-caption1-font-size)] text-[var(--alias-color-feedback-error-fg)]">
                            Attach an invoice before continuing.
                          </p>
                        )}
                      </>
                    )}

                    {status === "extracting" && (
                      <div
                        className="flex flex-col gap-[var(--alias-spacing-stack-sm)] rounded-[var(--alias-radius-lg)] border border-[var(--alias-color-border-default)] p-[var(--alias-spacing-padding-md)]"
                        aria-busy="true"
                      >
                        <div className="flex items-center gap-[var(--alias-spacing-inline-xs)] text-sm text-[var(--alias-color-text-primary)]">
                          <ScanLine className="size-4 text-[var(--alias-color-icon-brand)]" aria-hidden="true" />
                          Reading {fileName}…
                        </div>
                        <Progress value={progress} aria-label="Invoice extraction progress" />
                      </div>
                    )}

                    {status === "ready" && (
                      <>
                        <div className="flex flex-wrap items-center justify-between gap-[var(--alias-spacing-inline-md)] rounded-[var(--alias-radius-lg)] border border-[var(--alias-color-border-default)] p-[var(--alias-spacing-padding-md)]">
                          <div className="flex items-center gap-[var(--alias-spacing-inline-sm)]">
                            <FileText className="size-5 text-[var(--alias-color-icon-secondary)]" aria-hidden="true" />
                            <div>
                              <p className="text-sm font-medium text-[var(--alias-color-text-primary)]">{fileName}</p>
                              <p className="text-[length:var(--alias-typography-caption1-font-size)] text-[var(--alias-color-text-subtle)]">
                                {capturedCount} of {totalFields} header fields captured · {items.length} line items
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-[var(--alias-spacing-inline-xs)]">
                            <Badge variant="success" dot>Extracted</Badge>
                            <Button variant="ghost" size="sm" onClick={reset}>Replace</Button>
                          </div>
                        </div>

                        <Alert variant={dataBlocking.length > 0 ? "warning" : "success"}>
                          {dataBlocking.length > 0 ? (
                            <AlertTriangle aria-hidden="true" />
                          ) : (
                            <CheckCircle2 aria-hidden="true" />
                          )}
                          <AlertTitle>
                            {dataBlocking.length > 0
                              ? `${dataBlocking.length} ${dataBlocking.length === 1 ? "item needs" : "items need"} your attention`
                              : "Everything was captured"}
                          </AlertTitle>
                          <AlertDescription>
                            {dataBlocking.length > 0
                              ? "Some fields came back empty or didn't reconcile. Work through the next steps and the review page will list anything still outstanding."
                              : "Step through the next screens to confirm the values before routing for approval."}
                          </AlertDescription>
                        </Alert>
                      </>
                    )}
                  </div>
                </StepperContent>

                {/* ── Step 2 · Invoice data ────────────────────────────────── */}
                <StepperContent step={STEP_CAPTURE} currentStep={step}>
                  <div className="flex flex-col gap-[var(--alias-spacing-stack-md)]">
                    <StepHeading
                      title="Check the invoice data"
                      description="Each field shows how confident the extraction is. Anything marked “Not found” has to be filled in by hand."
                      errorCount={showErrors[STEP_CAPTURE] ? capErrors.length : 0}
                    />

                    <div className="grid gap-[var(--alias-spacing-inline-md)] md:grid-cols-2">
                      <ConfidenceField
                        id="invoiceNumber"
                        label={FIELD_LABEL.invoiceNumber}
                        required
                        confidence={capture.invoiceNumber.confidence}
                        edited={capture.invoiceNumber.edited}
                        errorMessage={errorFor("invoiceNumber", STEP_CAPTURE)}
                      >
                        <InputBase
                          id="invoiceNumber"
                          value={capture.invoiceNumber.value}
                          onChange={(e) => setField("invoiceNumber", e.target.value)}
                          placeholder="INV-0000-00000"
                          aria-invalid={errorFor("invoiceNumber", STEP_CAPTURE) ? true : undefined}
                          aria-describedby={describedBy("invoiceNumber", STEP_CAPTURE)}
                        />
                      </ConfidenceField>

                      <ConfidenceField
                        id="vendorName"
                        label={FIELD_LABEL.vendorName}
                        required
                        confidence={capture.vendorName.confidence}
                        edited={capture.vendorName.edited}
                        errorMessage={errorFor("vendorName", STEP_CAPTURE)}
                      >
                        <InputBase
                          id="vendorName"
                          value={capture.vendorName.value}
                          onChange={(e) => setField("vendorName", e.target.value)}
                          placeholder="Registered supplier name"
                          aria-invalid={errorFor("vendorName", STEP_CAPTURE) ? true : undefined}
                          aria-describedby={describedBy("vendorName", STEP_CAPTURE)}
                        />
                      </ConfidenceField>

                      <ConfidenceField
                        id="invoiceDate"
                        label={FIELD_LABEL.invoiceDate}
                        required
                        confidence={capture.invoiceDate.confidence}
                        edited={capture.invoiceDate.edited}
                        errorMessage={errorFor("invoiceDate", STEP_CAPTURE)}
                      >
                        <InputBase
                          id="invoiceDate"
                          type="date"
                          value={capture.invoiceDate.value}
                          onChange={(e) => setField("invoiceDate", e.target.value)}
                          aria-invalid={errorFor("invoiceDate", STEP_CAPTURE) ? true : undefined}
                          aria-describedby={describedBy("invoiceDate", STEP_CAPTURE)}
                        />
                      </ConfidenceField>

                      <ConfidenceField
                        id="dueDate"
                        label={FIELD_LABEL.dueDate}
                        required
                        confidence={capture.dueDate.confidence}
                        edited={capture.dueDate.edited}
                        errorMessage={errorFor("dueDate", STEP_CAPTURE)}
                        helperText="Not printed on this invoice — derive it from the payment terms."
                      >
                        <InputBase
                          id="dueDate"
                          type="date"
                          value={capture.dueDate.value}
                          onChange={(e) => setField("dueDate", e.target.value)}
                          aria-invalid={errorFor("dueDate", STEP_CAPTURE) ? true : undefined}
                          aria-describedby={
                            describedBy("dueDate", STEP_CAPTURE) ?? "dueDate-helper"
                          }
                        />
                      </ConfidenceField>

                      <ConfidenceField
                        id="vendorGstin"
                        label={FIELD_LABEL.vendorGstin}
                        confidence={capture.vendorGstin.confidence}
                        edited={capture.vendorGstin.edited}
                        errorMessage={errorFor("vendorGstin", STEP_CAPTURE)}
                      >
                        <InputBase
                          id="vendorGstin"
                          value={capture.vendorGstin.value}
                          onChange={(e) => setField("vendorGstin", e.target.value)}
                          placeholder="15-character GSTIN"
                          aria-invalid={errorFor("vendorGstin", STEP_CAPTURE) ? true : undefined}
                          aria-describedby={describedBy("vendorGstin", STEP_CAPTURE)}
                        />
                      </ConfidenceField>

                      <ConfidenceField
                        id="poNumber"
                        label={FIELD_LABEL.poNumber}
                        confidence={capture.poNumber.confidence}
                        edited={capture.poNumber.edited}
                        helperText="Optional — leave blank for non-PO spend."
                      >
                        <InputBase
                          id="poNumber"
                          value={capture.poNumber.value}
                          onChange={(e) => setField("poNumber", e.target.value)}
                          placeholder="PO-0000"
                          aria-describedby="poNumber-helper"
                        />
                      </ConfidenceField>

                      <ConfidenceField
                        id="currency"
                        label={FIELD_LABEL.currency}
                        required
                        confidence={capture.currency.confidence}
                        edited={capture.currency.edited}
                        errorMessage={errorFor("currency", STEP_CAPTURE)}
                      >
                        <Select
                          value={capture.currency.value}
                          onValueChange={(v) => setField("currency", v)}
                        >
                          <SelectTrigger
                            id="currency"
                            className="w-full"
                            aria-invalid={errorFor("currency", STEP_CAPTURE) ? true : undefined}
                            aria-describedby={describedBy("currency", STEP_CAPTURE)}
                          >
                            <SelectValue placeholder="Select a currency" />
                          </SelectTrigger>
                          <SelectContent>
                            {CURRENCIES.map((c) => (
                              <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </ConfidenceField>

                      <ConfidenceField
                        id="paymentTerms"
                        label={FIELD_LABEL.paymentTerms}
                        confidence={capture.paymentTerms.confidence}
                        edited={capture.paymentTerms.edited}
                      >
                        <Select
                          value={capture.paymentTerms.value}
                          onValueChange={(v) => setField("paymentTerms", v)}
                        >
                          <SelectTrigger id="paymentTerms" className="w-full">
                            <SelectValue placeholder="Select terms" />
                          </SelectTrigger>
                          <SelectContent>
                            {PAYMENT_TERMS.map((t) => (
                              <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </ConfidenceField>

                      <ConfidenceField
                        id="billTo"
                        label={FIELD_LABEL.billTo}
                        required
                        confidence={capture.billTo.confidence}
                        edited={capture.billTo.edited}
                        errorMessage={errorFor("billTo", STEP_CAPTURE)}
                        className="md:col-span-2"
                      >
                        <InputBase
                          id="billTo"
                          value={capture.billTo.value}
                          onChange={(e) => setField("billTo", e.target.value)}
                          placeholder="Legal entity being billed"
                          aria-invalid={errorFor("billTo", STEP_CAPTURE) ? true : undefined}
                          aria-describedby={describedBy("billTo", STEP_CAPTURE)}
                        />
                      </ConfidenceField>
                    </div>
                  </div>
                </StepperContent>

                {/* ── Step 3 · Line items ──────────────────────────────────── */}
                <StepperContent step={STEP_LINES} currentStep={step}>
                  <div className="flex flex-col gap-[var(--alias-spacing-stack-md)]">
                    <StepHeading
                      title="Verify the line items"
                      description="Rows the extraction wasn't sure about are highlighted. Totals recalculate as you type."
                      errorCount={showErrors[STEP_LINES] ? lineIssues.length + (totalsMatch ? 0 : 1) : 0}
                    />

                    <LineItemsEditor
                      items={items}
                      onChange={setItems}
                      showErrors={!!showErrors[STEP_LINES]}
                      formatMoney={money}
                    />

                    <ReconciliationPanel
                      computed={totals.gross}
                      stated={DOCUMENT_TOTAL.value}
                      confidence={DOCUMENT_TOTAL.confidence}
                      matches={totalsMatch}
                      formatMoney={money}
                    />
                  </div>
                </StepperContent>

                {/* ── Step 4 · Review ──────────────────────────────────────── */}
                <StepperContent step={STEP_REVIEW} currentStep={step}>
                  <div className="flex flex-col gap-[var(--alias-spacing-stack-md)]">
                    <StepHeading
                      title="Review and route for approval"
                      description="Everything still outstanding is listed below. Clear the blockers, then send it on."
                      errorCount={showErrors[STEP_REVIEW] ? blocking.length : 0}
                    />

                    <div className="grid gap-[var(--alias-spacing-inline-md)] md:grid-cols-2">
                      <SummaryPanel
                        capture={capture}
                        total={totals.gross}
                        lineCount={items.length}
                        formatMoney={money}
                      />

                      <ExceptionsPanel
                        blocking={blocking}
                        advisories={advisories}
                        onJump={goToStep}
                      />
                    </div>

                    <Separator />

                    <div className="grid gap-[var(--alias-spacing-inline-md)] md:grid-cols-3">
                      <SelectField
                        label="GL code"
                        required
                        value={approval.glCode}
                        onValueChange={(v) => setApproval((p) => ({ ...p, glCode: v }))}
                        placeholder="Select a GL code"
                        errorMessage={
                          showErrors[STEP_REVIEW] && !approval.glCode ? "Pick a GL code" : undefined
                        }
                      >
                        {GL_CODES.map((g) => (
                          <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>
                        ))}
                      </SelectField>

                      <SelectField
                        label="Cost centre"
                        required
                        value={approval.costCentre}
                        onValueChange={(v) => setApproval((p) => ({ ...p, costCentre: v }))}
                        placeholder="Select a cost centre"
                        errorMessage={
                          showErrors[STEP_REVIEW] && !approval.costCentre ? "Pick a cost centre" : undefined
                        }
                      >
                        {COST_CENTRES.map((c) => (
                          <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                        ))}
                      </SelectField>

                      <SelectField
                        label="Approver"
                        required
                        value={approval.approver}
                        onValueChange={(v) => setApproval((p) => ({ ...p, approver: v }))}
                        placeholder="Route to"
                        errorMessage={
                          showErrors[STEP_REVIEW] && !approval.approver ? "Choose an approver" : undefined
                        }
                      >
                        {APPROVERS.map((a) => (
                          <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
                        ))}
                      </SelectField>
                    </div>

                    <Textarea
                      label="Note for the approver"
                      placeholder="Anything they should know before signing off"
                      helperText="Optional — shown alongside the invoice in their queue."
                      value={approval.note}
                      onChange={(e) => setApproval((p) => ({ ...p, note: e.target.value }))}
                      maxChars={280}
                    />
                  </div>
                </StepperContent>

                {step !== STEP_UPLOAD &&
                  showErrors[step] &&
                  (step === STEP_REVIEW ? blocking.length : blockersOn(step).length) > 0 && (
                    <p
                      role="status"
                      className="text-[length:var(--alias-typography-caption1-font-size)] text-[var(--alias-color-feedback-error-fg)]"
                    >
                      {step === STEP_REVIEW
                        ? `Clear the ${blocking.length} blocking ${
                            blocking.length === 1 ? "item" : "items"
                          } above before sending this for approval.`
                        : `Fix the highlighted ${
                            blockersOn(step).length === 1 ? "field" : "fields"
                          } to move on.`}
                    </p>
                  )}

                <StepperActions
                  currentStep={step}
                  totalSteps={STEPS.length}
                  onBack={goBack}
                  onNext={goNext}
                  onSubmit={handleSubmit}
                  nextLabel={step === STEP_UPLOAD ? "Review extracted data" : "Next"}
                  submitLabel="Send for approval"
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Step heading ─────────────────────────────────────────────────────────────

function StepHeading({
  title,
  description,
  errorCount,
}: {
  title: string
  description: string
  errorCount: number
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-[var(--alias-spacing-inline-md)]">
      <div>
        <h2 className="text-base font-semibold text-[var(--alias-color-text-primary)]">{title}</h2>
        <p className="mt-1 text-sm text-[var(--alias-color-text-secondary)]">{description}</p>
      </div>
      {errorCount > 0 && (
        <Badge variant="error" dot>
          {errorCount} {errorCount === 1 ? "field needs" : "fields need"} attention
        </Badge>
      )}
    </div>
  )
}

// ─── Reconciliation panel ─────────────────────────────────────────────────────

function ReconciliationPanel({
  computed,
  stated,
  confidence,
  matches,
  formatMoney,
}: {
  computed: number
  stated: number
  confidence: number
  matches: boolean
  formatMoney: (v: number) => string
}) {
  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-[var(--alias-spacing-inline-md)] rounded-[var(--alias-radius-lg)] border p-[var(--alias-spacing-padding-md)] ${
        matches
          ? "border-[var(--alias-color-border-success)] bg-[var(--alias-color-feedback-success-bg)]"
          : "border-[var(--alias-color-border-error)] bg-[var(--alias-color-feedback-error-bg)]"
      }`}
      role="status"
    >
      <div>
        <p className="text-sm font-medium text-[var(--alias-color-text-primary)]">
          {matches ? "Totals reconcile" : "Totals do not reconcile"}
        </p>
        <p className="mt-1 text-[length:var(--alias-typography-caption1-font-size)] text-[var(--alias-color-text-secondary)]">
          Document total {formatMoney(stated)} · read with {Math.round(confidence * 100)}% confidence
        </p>
      </div>
      <div className="text-right">
        <p className="text-[length:var(--alias-typography-caption1-font-size)] text-[var(--alias-color-text-secondary)]">
          Line items add up to
        </p>
        <p className="text-base font-semibold tabular-nums text-[var(--alias-color-text-primary)]">
          {formatMoney(computed)}
        </p>
      </div>
    </div>
  )
}

// ─── Summary panel ────────────────────────────────────────────────────────────

function SummaryPanel({
  capture,
  total,
  lineCount,
  formatMoney,
}: {
  capture: Capture
  total: number
  lineCount: number
  formatMoney: (v: number) => string
}) {
  const rows: Array<[string, string]> = [
    [FIELD_LABEL.vendorName, capture.vendorName.value || "—"],
    [FIELD_LABEL.invoiceNumber, capture.invoiceNumber.value || "—"],
    [FIELD_LABEL.invoiceDate, capture.invoiceDate.value || "—"],
    [FIELD_LABEL.dueDate, capture.dueDate.value || "—"],
    [FIELD_LABEL.poNumber, capture.poNumber.value || "—"],
    ["Line items", `${lineCount}`],
  ]

  return (
    <div className="flex flex-col gap-[var(--alias-spacing-stack-sm)] rounded-[var(--alias-radius-lg)] border border-[var(--alias-color-border-default)] p-[var(--alias-spacing-padding-md)]">
      <h3 className="text-sm font-semibold text-[var(--alias-color-text-primary)]">Invoice summary</h3>
      <dl className="flex flex-col gap-[var(--alias-spacing-inline-xs)]">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-baseline justify-between gap-[var(--alias-spacing-inline-md)]">
            <dt className="text-[length:var(--alias-typography-caption1-font-size)] text-[var(--alias-color-text-secondary)]">
              {label}
            </dt>
            <dd className="text-sm text-[var(--alias-color-text-primary)]">{value}</dd>
          </div>
        ))}
      </dl>
      <Separator />
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-[var(--alias-color-text-primary)]">Total payable</span>
        <span className="text-base font-semibold tabular-nums text-[var(--alias-color-text-primary)]">
          {formatMoney(total)}
        </span>
      </div>
    </div>
  )
}

// ─── Exceptions panel ─────────────────────────────────────────────────────────

function ExceptionsPanel({
  blocking,
  advisories,
  onJump,
}: {
  blocking: Exception[]
  advisories: Exception[]
  onJump: (step: number) => void
}) {
  if (blocking.length === 0 && advisories.length === 0) {
    return (
      <div className="flex flex-col gap-[var(--alias-spacing-stack-sm)] rounded-[var(--alias-radius-lg)] border border-[var(--alias-color-border-success)] bg-[var(--alias-color-feedback-success-bg)] p-[var(--alias-spacing-padding-md)]">
        <h3 className="flex items-center gap-[var(--alias-spacing-inline-xs)] text-sm font-semibold text-[var(--alias-color-feedback-success-fg)]">
          <CheckCircle2 className="size-4" aria-hidden="true" />
          Nothing outstanding
        </h3>
        <p className="text-[length:var(--alias-typography-caption1-font-size)] text-[var(--alias-color-text-secondary)]">
          Every required field is filled and the totals reconcile.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-[var(--alias-spacing-stack-sm)] rounded-[var(--alias-radius-lg)] border border-[var(--alias-color-border-default)] p-[var(--alias-spacing-padding-md)]">
      <h3 className="text-sm font-semibold text-[var(--alias-color-text-primary)]">
        Outstanding items
      </h3>

      <ul className="flex flex-col gap-[var(--alias-spacing-inline-xs)]" aria-live="polite">
        {[...blocking, ...advisories].map((item) => (
          <li
            key={item.id}
            className="flex items-start justify-between gap-[var(--alias-spacing-inline-sm)]"
          >
            <div className="flex items-start gap-[var(--alias-spacing-inline-xs)]">
              <Badge variant={item.severity === "error" ? "error" : "warning"} size="sm">
                {item.severity === "error" ? "Blocking" : "Check"}
              </Badge>
              <div>
                <p className="text-[length:var(--alias-typography-caption1-font-size)] font-medium text-[var(--alias-color-text-primary)]">
                  {item.title}
                </p>
                <p className="text-[length:var(--alias-typography-caption1-font-size)] text-[var(--alias-color-text-secondary)]">
                  {item.detail}
                </p>
              </div>
            </div>
            <Button
              variant="link"
              size="xs"
              onClick={() => onJump(item.step)}
              aria-label={`Fix ${item.title} on the ${STEPS[item.step].label} step`}
            >
              Fix
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
