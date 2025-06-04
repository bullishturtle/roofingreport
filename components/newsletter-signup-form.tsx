"use client"

import type React from "react"
import { useState, useActionState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input" // Assuming you have an Input component
import { useToast } from "@/hooks/use-toast"
import { subscribeToNewsletter } from "@/app/actions/newsletter"
import { useAnalytics } from "@/components/analytics/analytics-provider"
import { Label } from "@/components/ui/label" // Assuming you have a Label component

interface NewsletterSignupFormProps {
  className?: string
}

export function NewsletterSignupForm({ className }: NewsletterSignupFormProps) {
  const [email, setEmail] = useState("")
  // useActionState for handling form submission and server responses
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, null)
  const { toast } = useToast()
  const { trackEvent } = useAnalytics()
  const formRef = useRef<HTMLFormElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null) // Ref for focusing

  useEffect(() => {
    if (state) {
      // Check if state is not null
      if (state.success) {
        toast({
          title: "Subscribed!",
          description: state.message,
          variant: "success", // Assuming you have a success variant
        })
        setEmail("") // Clear email field on success
        formRef.current?.reset() // Reset the form
        trackEvent("newsletter_signup_success", { email: state.email })
      } else {
        // Prioritize field-specific errors if available
        let description = state.message
        if (state.errors?.email) {
          description = state.errors.email.join(", ")
          // Focus the email input on error
          emailInputRef.current?.focus()
        } else if (state.errors?._form) {
          description = state.errors._form.join(", ")
        }
        toast({
          title: "Subscription Failed",
          description: description,
          variant: "destructive",
        })
        trackEvent("newsletter_signup_failure", { email: state.email || email, error: description })
      }
    }
  }, [state, toast, trackEvent, email]) // Added email to dependency array for tracking

  // Client-side validation (basic)
  const handleClientValidationAndSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      trackEvent("newsletter_signup_validation_error", { email, client_error: "Invalid email format" })
      emailInputRef.current?.focus() // Focus on client-side error
      return
    }
    const formData = new FormData(event.currentTarget)
    formAction(formData)
  }

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <form ref={formRef} onSubmit={handleClientValidationAndSubmit} className="space-y-4">
        <div>
          <Label htmlFor="newsletter-email" className="block text-sm font-medium text-gray-200 mb-1">
            Email Address
          </Label>
          <Input
            ref={emailInputRef} // Assign ref
            id="newsletter-email"
            name="email" // Name attribute is important for FormData
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@example.com"
            required
            aria-required="true"
            aria-invalid={!!state?.errors?.email} // Set aria-invalid based on error
            aria-describedby={state?.errors?.email ? "newsletter-email-error" : undefined}
            className="h-12 text-lg"
            disabled={isPending}
          />
          {state?.errors?.email && (
            <p id="newsletter-email-error" className="mt-1 text-sm text-red-400">
              {state.errors.email.join(", ")}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-semibold focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
          disabled={isPending}
        >
          {isPending ? "Subscribing..." : "Subscribe Now"}
        </Button>
      </form>
    </div>
  )
}
