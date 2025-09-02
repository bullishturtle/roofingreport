"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, Shield, CheckCircle, Phone, Mail, Home, User, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function GetStartedPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    agreeToTerms: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.firstName.trim()) errors.firstName = "First name is required"
    if (!formData.lastName.trim()) errors.lastName = "Last name is required"

    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required"
    } else if (formData.phone.replace(/\D/g, "").length < 10) {
      errors.phone = "Please enter a valid phone number"
    }

    if (!formData.address.trim()) errors.address = "Property address is required"
    if (!formData.agreeToTerms) errors.terms = "You must agree to the terms to continue"

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) {
      setError("Please fix the errors below")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong")
      }

      // Redirect to success page with report ID
      router.push(`/success?reportId=${result.data.reportId}&email=${encodeURIComponent(formData.email)}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, "")
    const phoneNumberLength = phoneNumber.length
    if (phoneNumberLength < 4) return phoneNumber
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050714] to-[#0a1128] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <Button variant="ghost" size="sm" className="text-white">
                <ArrowLeft size={16} className="mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center">
              <div className="bg-yellow-500 rounded-full w-10 h-10 flex items-center justify-center mr-2">
                <span className="text-black font-bold text-xl">R</span>
              </div>
              <span className="text-xl font-bold">
                Roof<span className="text-yellow-500">Fax</span>
              </span>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Get Your Free RoofFax Report</h1>
            <p className="text-gray-300 mb-6">
              Start your protection today. We'll handle everything from here—no upfront costs, just your deductible if
              approved.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-400" size={16} />
                <span>Free Satellite Report</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-400" size={16} />
                <span>AI Damage Detection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-400" size={16} />
                <span>Insurance Claim Prep</span>
              </div>
            </div>
          </motion.div>

          {error && (
            <Alert className="mb-6 border-red-500/30 bg-red-500/10">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-400">{error}</AlertDescription>
            </Alert>
          )}

          <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="text-yellow-500" size={24} />
                Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        type="text"
                        placeholder="John"
                        className={`pl-10 bg-gray-900 border-gray-700 text-white ${
                          fieldErrors.firstName ? "border-red-500" : ""
                        }`}
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    {fieldErrors.firstName && <p className="text-red-400 text-sm mt-1">{fieldErrors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        type="text"
                        placeholder="Doe"
                        className={`pl-10 bg-gray-900 border-gray-700 text-white ${
                          fieldErrors.lastName ? "border-red-500" : ""
                        }`}
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    {fieldErrors.lastName && <p className="text-red-400 text-sm mt-1">{fieldErrors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      className={`pl-10 bg-gray-900 border-gray-700 text-white ${
                        fieldErrors.email ? "border-red-500" : ""
                      }`}
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  {fieldErrors.email && <p className="text-red-400 text-sm mt-1">{fieldErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      type="tel"
                      placeholder="(555) 123-4567"
                      className={`pl-10 bg-gray-900 border-gray-700 text-white ${
                        fieldErrors.phone ? "border-red-500" : ""
                      }`}
                      value={formData.phone}
                      onChange={(e) => {
                        const formatted = formatPhoneNumber(e.target.value)
                        handleInputChange("phone", formatted)
                      }}
                      disabled={isSubmitting}
                      maxLength={14}
                    />
                  </div>
                  {fieldErrors.phone && <p className="text-red-400 text-sm mt-1">{fieldErrors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Property Address *</label>
                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      type="text"
                      placeholder="123 Main Street, City, State, ZIP"
                      className={`pl-10 bg-gray-900 border-gray-700 text-white ${
                        fieldErrors.address ? "border-red-500" : ""
                      }`}
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  {fieldErrors.address && <p className="text-red-400 text-sm mt-1">{fieldErrors.address}</p>}
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                    className="mt-1"
                    disabled={isSubmitting}
                  />
                  <label htmlFor="terms" className="text-sm text-gray-300 leading-relaxed">
                    I agree to the{" "}
                    <Button variant="link" className="text-yellow-500 p-0 h-auto underline">
                      terms of service
                    </Button>{" "}
                    and{" "}
                    <Button variant="link" className="text-yellow-500 p-0 h-auto underline">
                      privacy policy
                    </Button>
                    . I authorize RoofFax to coordinate my roofing project and handle insurance communications on my
                    behalf. *
                  </label>
                </div>
                {fieldErrors.terms && <p className="text-red-400 text-sm">{fieldErrors.terms}</p>}

                <Button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-3 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Get My Free RoofFax Report"}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-green-900/20 border border-green-800 rounded-md">
                <h4 className="font-semibold text-green-400 mb-2">What Happens Next?</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• We'll generate your satellite roof report within 24 hours</li>
                  <li>• Our team will review for potential storm damage</li>
                  <li>• If damage is found, we'll coordinate with you about how to handle next steps</li>
                  <li>• We'll match you with the perfect licensed contractor</li>
                  <li>• You relax while we handle everything</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-400 mb-4">
              Questions? Call us directly at{" "}
              <Button variant="link" className="text-yellow-500 p-0 h-auto">
                (850) 879-9172
              </Button>
            </p>
            <p className="text-xs text-gray-500">
              RoofFax is a consulting service. We coordinate with licensed contractors and assist with insurance claims.
              No upfront costs—you're only responsible for your deductible if your claim is approved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
