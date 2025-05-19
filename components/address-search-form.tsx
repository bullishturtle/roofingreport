"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Loader2, Download, Mail } from "lucide-react"
import { validationRules, validateField } from "@/lib/form-validation"
import { useToast } from "@/components/ui/toast"
import { ReportPreview } from "./report-preview"

export function AddressSearchForm() {
  const [address, setAddress] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState<Record<string, string | null>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const [showDemoReport, setShowDemoReport] = useState(false)
  const { showToast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Update the corresponding state based on input name
    if (name === "address") setAddress(value)
    else if (name === "zipCode") setZipCode(value)
    else if (name === "email") setEmail(value)
    else if (name === "phone") setPhone(value)
    else if (name === "name") setName(value)

    // Clear error for this field when user types
    if (error[name]) {
      setError((prev) => ({ ...prev, [name]: null }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string | null> = {
      address: validateField(address, [
        validationRules.required("Please enter an address"),
        validationRules.address("Please enter a complete property address"),
      ]),
      zipCode: validateField(zipCode, [
        validationRules.required("Please enter a ZIP code"),
        validationRules.zipCode("Please enter a valid ZIP code"),
      ]),
      email: validateField(email, [
        validationRules.required("Please enter your email"),
        validationRules.email("Please enter a valid email address"),
      ]),
      name: validateField(name, [validationRules.required("Please enter your name")]),
    }

    // Phone is optional
    if (phone) {
      newErrors.phone = validateField(phone, [validationRules.phoneNumber("Please enter a valid phone number")])
    }

    setError(newErrors)

    // Return true if no errors
    return !Object.values(newErrors).some((err) => err !== null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      console.log("Submitting form data:", { address, zipCode, email, phone, name })
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Show success message
      showToast("Your roof report has been generated!", "success")

      // Show report preview
      setShowReport(true)
    } catch (error) {
      console.error("Error submitting form:", error)
      showToast("Error generating report. Please try again.", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDemoReport = () => {
    setShowDemoReport(true)
    showToast("Showing a sample report", "info")
  }

  const handleDownloadPDF = () => {
    // Simulate PDF download
    showToast("Downloading PDF report...", "info")
    console.log("Downloading PDF for address:", address)

    // In a real implementation, this would trigger a PDF download
    setTimeout(() => {
      showToast("PDF downloaded successfully!", "success")
    }, 1500)
  }

  const handleEmailReport = () => {
    // Simulate sending email
    showToast("Sending report to your email...", "info")
    console.log("Sending report to email:", email)

    // In a real implementation, this would trigger an email send
    setTimeout(() => {
      showToast("Report sent to your email!", "success")
    }, 1500)
  }

  // Check if we should show any report (either after submission or demo)
  const shouldShowReport = showReport || showDemoReport

  return (
    <div className="w-full max-w-xl mx-auto">
      {!shouldShowReport ? (
        <>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Property Address
              </label>
              <div className="relative">
                <Input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Enter property address"
                  value={address}
                  onChange={handleChange}
                  className={`pl-10 ${error.address ? "border-red-500" : "border-gray-300"}`}
                  aria-invalid={!!error.address}
                  aria-describedby={error.address ? "address-error" : undefined}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              {error.address && (
                <p id="address-error" className="text-sm text-red-600">
                  {error.address}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                ZIP Code
              </label>
              <Input
                id="zipCode"
                name="zipCode"
                type="text"
                placeholder="Enter ZIP code"
                value={zipCode}
                onChange={handleChange}
                className={error.zipCode ? "border-red-500" : "border-gray-300"}
                aria-invalid={!!error.zipCode}
                aria-describedby={error.zipCode ? "zipCode-error" : undefined}
              />
              {error.zipCode && (
                <p id="zipCode-error" className="text-sm text-red-600">
                  {error.zipCode}
                </p>
              )}
              {zipCode && zipCode.length === 5 && (
                <p className="text-sm text-amber-600 flex items-center mt-1">
                  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    ></path>
                  </svg>
                  No recent hailstorms near you... but wind risk is elevated this week.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={handleChange}
                className={error.name ? "border-red-500" : "border-gray-300"}
                aria-invalid={!!error.name}
                aria-describedby={error.name ? "name-error" : undefined}
              />
              {error.name && (
                <p id="name-error" className="text-sm text-red-600">
                  {error.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleChange}
                className={error.email ? "border-red-500" : "border-gray-300"}
                aria-invalid={!!error.email}
                aria-describedby={error.email ? "email-error" : undefined}
              />
              {error.email && (
                <p id="email-error" className="text-sm text-red-600">
                  {error.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number (Optional)
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={handleChange}
                className={error.phone ? "border-red-500" : "border-gray-300"}
                aria-invalid={!!error.phone}
                aria-describedby={error.phone ? "phone-error" : undefined}
              />
              {error.phone && (
                <p id="phone-error" className="text-sm text-red-600">
                  {error.phone}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium
                       transition-all duration-200 transform hover:scale-105 active:scale-95"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Report...
                </>
              ) : (
                "Get Your Roof Report"
              )}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={handleDemoReport}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
            >
              See Sample Report
            </button>
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Your Roof Report</h2>
            <div className="flex space-x-2">
              <Button onClick={handleDownloadPDF} variant="outline" size="sm" className="flex items-center">
                <Download className="mr-1 h-4 w-4" />
                Download PDF
              </Button>
              <Button onClick={handleEmailReport} variant="outline" size="sm" className="flex items-center">
                <Mail className="mr-1 h-4 w-4" />
                Email Report
              </Button>
            </div>
          </div>

          <ReportPreview address={address || "123 Main St, Anytown, USA"} />

          <div className="flex justify-between">
            <Button
              onClick={() => {
                setShowReport(false)
                setShowDemoReport(false)
              }}
              variant="outline"
            >
              Back to Form
            </Button>

            <div className="flex space-x-2">
              <a href="https://trustthefox.com/report" target="_blank" rel="noopener noreferrer">
                <Button>I'm a Homeowner</Button>
              </a>
              <a href="https://rooffaxpro.com/login" target="_blank" rel="noopener noreferrer">
                <Button variant="outline">I'm a Roofing Pro</Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
