"use client"

import type React from "react"

import { useState, useActionState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { validationRules, validateForm } from "@/lib/form-validation"
import { subscribeToNewsletter } from "@/app/actions/newsletter"
import { useAnalytics } from "@/components/analytics/analytics-provider" // Import useAnalytics

interface NewsletterSignupFormProps {
  className?: string
}

export function NewsletterSignupForm({ className }: NewsletterSignupFormProps) {
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, null)
  const { trackEvent } = useAnalytics() // Use the analytics hook

  const validation = {
    email: [
      validationRules.required("Email is required."),
      validationRules.email("Please enter a valid email address."),
    ],
  }

  useEffect(() => {
    if (state?.success) {
      setEmail("") // Clear form on success
      setErrors({})
      trackEvent("newsletter_signup_success", { email: state.email }) // Track success
    } else if (state?.message && !state.success) {
      trackEvent("newsletter_signup_failure", { email, error: state.message }) // Track failure
    }
  }, [state, email, trackEvent])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formValues = { email }
    const newErrors = validateForm(formValues, validation)

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      trackEvent("newsletter_signup_validation_error", { email, client_validation_errors: newErrors })
      return
    }

    setErrors({}) // Clear previous errors
    const formData = new FormData(event.currentTarget)
    formAction(formData) // Call the server action
  }

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Email Address"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@example.com"
          required
          error={errors.email || state?.message}
          disabled={isPending}
        />
        <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white" disabled={isPending}>
          {isPending ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
      {state && state.message && (
        <p className={`mt-4 text-center ${state.success ? "text-green-500" : "text-red-500"}`}>{state.message}</p>
      )}
    </div>
  )
}
