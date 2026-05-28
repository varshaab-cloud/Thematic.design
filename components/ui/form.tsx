"use client"

import * as React from "react"
import {
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
  useForm,
  Controller,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"

// ◆ design-lead
// Form system — thin wrappers around React Hook Form that wire validation
// errors directly into our Input, Select, Textarea, etc. components.
// Taste profile: error states use destructive token, labels medium weight,
// helper text muted, no layout shift on error appearance.

// ─── Context ─────────────────────────────────────────────────────────────────

const Form = FormProvider

// ─── Field context ────────────────────────────────────────────────────────────

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = { name: TName }

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: React.ComponentProps<typeof Controller<TFieldValues, TName>>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

function useFormField() {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext.name) {
    throw new Error("useFormField must be used within a FormField")
  }

  return {
    name: fieldContext.name,
    id: itemContext.id,
    ...fieldState,
  }
}

// ─── Item context ─────────────────────────────────────────────────────────────

type FormItemContextValue = { id: string }
const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

// ─── FormItem ─────────────────────────────────────────────────────────────────

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId()
  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn("flex flex-col gap-[var(--alias-spacing-inline-xs)]", className)} {...props} />
    </FormItemContext.Provider>
  )
}

// ─── FormLabel ────────────────────────────────────────────────────────────────

function FormLabel({
  className,
  required,
  children,
  ...props
}: React.ComponentProps<"label"> & { required?: boolean }) {
  const { error, id } = useFormField()
  return (
    <label
      htmlFor={id}
      className={cn(
        "text-[length:var(--alias-typography-body-text2-font-size)] font-[number:var(--base-font-weight-medium)] text-[var(--component-form-label-color)]",
        error && "text-[var(--component-form-error-text-color)]",
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-[var(--component-form-error-text-color)] ml-1">*</span>}
    </label>
  )
}

// ─── FormControl ──────────────────────────────────────────────────────────────

function FormControl({ ...props }: React.ComponentProps<"div">) {
  const { error, id } = useFormField()
  return (
    <div
      id={id}
      aria-invalid={!!error}
      {...props}
    />
  )
}

// ─── FormDescription ──────────────────────────────────────────────────────────

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-[length:var(--alias-typography-caption1-font-size)] text-[var(--component-form-helper-text-color)]", className)}
      {...props}
    />
  )
}

// ─── FormMessage ──────────────────────────────────────────────────────────────

function FormMessage({ className, children, ...props }: React.ComponentProps<"p">) {
  const { error } = useFormField()
  const body = error ? String(error?.message ?? error) : children
  if (!body) return null
  return (
    <p
      className={cn("text-[length:var(--alias-typography-caption1-font-size)] text-[var(--component-form-error-text-color)]", className)}
      {...props}
    >
      {body}
    </p>
  )
}

// ─── FormSection ─────────────────────────────────────────────────────────────

function FormSection({
  title,
  description,
  className,
  children,
}: {
  title?: string
  description?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("flex flex-col gap-[var(--alias-spacing-stack-md)]", className)}>
      {(title || description) && (
        <div className="flex flex-col gap-0.5 pb-3 border-b border-[var(--alias-color-border-default)]">
          {title && <h3 className="text-[length:var(--alias-typography-body-text2-font-size)] font-[number:var(--base-font-weight-semibold)] text-[var(--component-form-section-title-color)]">{title}</h3>}
          {description && <p className="text-[length:var(--alias-typography-caption1-font-size)] text-[var(--component-form-helper-text-color)]">{description}</p>}
        </div>
      )}
      {children}
    </div>
  )
}

// ─── FormRow ─────────────────────────────────────────────────────────────────

function FormRow({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("grid gap-[var(--alias-spacing-stack-md)] sm:grid-cols-2", className)}>
      {children}
    </div>
  )
}

// ─── FormActions ─────────────────────────────────────────────────────────────

function FormActions({
  className,
  align = "right",
  children,
}: {
  className?: string
  align?: "left" | "right" | "between"
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-[var(--alias-spacing-inline-sm)] pt-4 border-t border-[var(--alias-color-border-default)]",
        align === "right" && "justify-end",
        align === "left" && "justify-start",
        align === "between" && "justify-between",
        className
      )}
    >
      {children}
    </div>
  )
}

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormSection,
  FormRow,
  FormActions,
  useForm,
  zodResolver,
  useFormField,
}
