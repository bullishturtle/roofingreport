"use client"

import React from "react"

import { useState, useEffect } from "react"
import { validateForm, type FieldValidation } from "@/lib/form-validation"
import { useToast } from "@/components/ui/toast"

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit: (values: Record<string, string>) => Promise<void> | void
  validation?: FieldValidation
  initialValues?: Record<string, string>
  children: React.ReactNode
}

export function Form({ onSubmit, validation = {}, initialValues = {}, children, ...props }: FormProps) {
  const [values, setValues] = useState<Record<string, string>>(initialValues)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showToast } = useToast()

  useEffect(() => {
    setValues(initialValues)
  }, [initialValues])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))

    // Validate field on change if it's been touched
    if (touched[name] && validation[name]) {
      const fieldErrors = validateForm({ [name]: value }, { [name]: validation[name] })
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] || "" }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))

    // Validate field on blur
    if (validation[name]) {
      const fieldErrors = validateForm({ [name]: values[name] || "" }, { [name]: validation[name] })
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] || "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate all fields
    const formErrors = validateForm(values, validation)
    setErrors(formErrors)

    // Mark all fields as touched
    const allTouched = Object.keys(validation).reduce(
      (acc, key) => {
        acc[key] = true
        return acc
      },
      {} as Record<string, boolean>,
    )
    setTouched(allTouched)

    // If there are errors, don't submit
    if (Object.keys(formErrors).length > 0) {
      showToast("Please fix the errors in the form", "error")
      return
    }

    try {
      setIsSubmitting(true)
      await onSubmit(values)
    } catch (error) {
      console.error("Form submission error:", error)
      showToast(error instanceof Error ? error.message : "Form submission failed", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Clone children and inject form props
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<any>, {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
      })
    }
    return child
  })

  return (
    <form {...props} onSubmit={handleSubmit}>
      {childrenWithProps}
    </form>
  )
}
