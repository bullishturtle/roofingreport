import type React from "react"
import { useId } from "react"
import { cn } from "@/lib/utils"

interface FormFieldProps {
  label: string
  htmlFor?: string
  error?: string
  className?: string
  required?: boolean
  children: React.ReactNode
  helpText?: string
}

export function FormField({ label, htmlFor, error, className, required = false, children, helpText }: FormFieldProps) {
  const fallbackId = useId()
  const id = htmlFor || fallbackId
  const errorId = error ? `${id}-error` : undefined
  const helpTextId = helpText ? `${id}-description` : undefined

  return (
    <div className={cn("mb-4", className)}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <div
        className={cn("mt-1", error && "has-error")}
        aria-invalid={!!error}
        aria-describedby={cn(errorId, helpTextId)}
      >
        {children}
      </div>

      {helpText && (
        <p id={helpTextId} className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {helpText}
        </p>
      )}

      {error && (
        <p id={errorId} className="mt-1 text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField
