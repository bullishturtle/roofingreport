"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { validationRules, validateForm, hasErrors } from "@/lib/form-validation"
import { useToast } from "@/components/ui/toast"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [errors, setErrors] = useState<Record<string, string | null>>({
    name: null,
    email: null,
    phone: null,
    message: null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showToast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const formErrors = validateForm(formData, {
      name: [validationRules.required("Name is required")],
      email: [
        validationRules.required("Email is required"),
        validationRules.email("Please enter a valid email address"),
      ],
      phone: [validationRules.phoneNumber("Please enter a valid phone number")],
      message: [validationRules.required("Message is required")],
    })

    setErrors(formErrors)

    if (hasErrors(formErrors)) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      console.log("Submitting form data:", formData)

      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message
      showToast("Your message has been sent successfully!", "success")

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      showToast("Error sending message. Please try again.", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-gray-700">
          Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? "border-red-500" : ""}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          disabled={isSubmitting}
        />
        {errors.name && (
          <p id="name-error" className="text-red-500 text-sm">
            {errors.name}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-700">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? "border-red-500" : ""}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p id="email-error" className="text-red-500 text-sm">
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-gray-700">
          Phone (optional)
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? "border-red-500" : ""}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          disabled={isSubmitting}
        />
        {errors.phone && (
          <p id="phone-error" className="text-red-500 text-sm">
            {errors.phone}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-gray-700">
          Message <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={errors.message ? "border-red-500" : ""}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          disabled={isSubmitting}
        />
        {errors.message && (
          <p id="message-error" className="text-red-500 text-sm">
            {errors.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  )
}
