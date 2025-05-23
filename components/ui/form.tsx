"use client"

import * as React from "react"
import { useFormStatus } from "react-dom"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(({ className, ...props }, ref) => {
  return <form ref={ref} className={cn("space-y-6", className)} {...props} />
})
Form.displayName = "Form"

interface FormFieldProps {
  name: string
  label?: string
  hint?: string
  error?: string
  className?: string
  children: React.ReactNode
  required?: boolean
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ name, label, hint, error, className, children, required, ...props }, ref) => {
    const id = `form-field-${name}`
    const errorId = `${id}-error`
    const hintId = `${id}-hint`

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {label && (
          <Label htmlFor={id} className={error ? "text-red-500" : ""}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
        )}
        {React.isValidElement(children)
          ? React.cloneElement(children as React.ReactElement<any>, {
              id,
              name,
              "aria-describedby": hint ? hintId : error ? errorId : undefined,
              "aria-invalid": error ? "true" : undefined,
              "aria-required": required ? "true" : undefined,
            })
          : children}
        {hint && !error && (
          <p id={hintId} className="text-sm text-gray-500">
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} className="text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  },
)
FormField.displayName = "FormField"

interface FormSubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loadingText?: string
}

const FormSubmit = React.forwardRef<HTMLButtonElement, FormSubmitProps>(({ children, loadingText, ...props }, ref) => {
  const { pending } = useFormStatus()

  return (
    <button
      ref={ref}
      type="submit"
      disabled={pending || props.disabled}
      aria-disabled={pending || props.disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        props.className,
      )}
      {...props}
    >
      {pending ? (
        <>
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {loadingText || children}
        </>
      ) : (
        children
      )}
    </button>
  )
})
FormSubmit.displayName = "FormSubmit"

export { Form, FormField, FormSubmit }
