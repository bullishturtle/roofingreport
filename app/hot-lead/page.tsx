"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, AlertTriangle, Phone, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function HotLeadPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    urgency: "medium",
    interestedIn: [] as string[],
    damageDescription: "",
    insuranceClaim: false,
    contractorContact: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const services = [
    "Emergency Roof Repair",
    "Insurance Claim Assistance",
    "Full Roof Replacement",
    "Storm Damage Assessment",
    "Leak Repair",
    "Gutter Repair/Replacement",
    "Contractor Verification",
    "Free Roof Inspection",
  ]

  const handleServiceChange = (service: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      interestedIn: checked ? [...prev.interestedIn, service] : prev.interestedIn.filter((s) => s !== service),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/hot-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        throw new Error("Failed to submit")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error submitting your information. Please try again or call us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="bg-slate-800/50 border-slate-700 max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">We've Got You!</h2>
            <p className="text-slate-300 mb-6">
              {formData.urgency === "high"
                ? "Our emergency team will call you within 15 minutes. Keep your phone nearby!"
                : formData.urgency === "medium"
                  ? "We'll contact you within 24 hours to schedule your inspection."
                  : "Check your email for your free roof report within 2 hours."}
            </p>
            <div className="space-y-2 text-sm text-slate-400">
              <p>Reference ID: HL-{Date.now().toString().slice(-6)}</p>
              <p>Questions? Call (850) 879-9172</p>
            </div>
            <Link href="/" className="mt-6 inline-block">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">Return Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold text-white">
                <span className="text-yellow-400">Roof</span>Fax
              </span>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="text-white hover:text-yellow-400">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Emergency Roof Help</h1>
            <p className="text-lg text-slate-300">
              Get immediate assistance for storm damage, leaks, or roofing emergencies
            </p>
          </div>

          {/* Urgency Alert */}
          <Alert className="mb-8 border-red-500 bg-red-500/10">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-red-300">
              <strong>Emergency?</strong> If you have active leaks or dangerous conditions, call us immediately at{" "}
              <a href="tel:8508799172" className="text-yellow-400 font-semibold">
                (850) 879-9172
              </a>
            </AlertDescription>
          </Alert>

          {/* Form */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Tell Us About Your Situation</CardTitle>
              <CardDescription className="text-slate-400">
                The more details you provide, the faster we can help you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-white">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="(850) 555-0123"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-white">
                      Property Address *
                    </Label>
                    <Input
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="123 Main St, City, FL 32501"
                    />
                  </div>
                </div>

                {/* Urgency Level */}
                <div className="space-y-3">
                  <Label className="text-white">How urgent is your situation? *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      {
                        value: "high",
                        label: "🚨 EMERGENCY",
                        desc: "Active leaks, dangerous conditions",
                        color: "border-red-500 bg-red-500/10",
                      },
                      {
                        value: "medium",
                        label: "⚡ URGENT",
                        desc: "Recent storm damage, needs inspection",
                        color: "border-yellow-500 bg-yellow-500/10",
                      },
                      {
                        value: "low",
                        label: "📊 STANDARD",
                        desc: "General assessment, no immediate danger",
                        color: "border-green-500 bg-green-500/10",
                      },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`cursor-pointer border-2 rounded-lg p-4 transition-all ${
                          formData.urgency === option.value ? option.color : "border-slate-600 bg-slate-700/30"
                        }`}
                      >
                        <input
                          type="radio"
                          name="urgency"
                          value={option.value}
                          checked={formData.urgency === option.value}
                          onChange={(e) => setFormData((prev) => ({ ...prev, urgency: e.target.value }))}
                          className="sr-only"
                        />
                        <div className="text-center">
                          <div className="font-semibold text-white mb-1">{option.label}</div>
                          <div className="text-xs text-slate-300">{option.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Services Interested In */}
                <div className="space-y-3">
                  <Label className="text-white">What services do you need? (Select all that apply)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {services.map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={service}
                          checked={formData.interestedIn.includes(service)}
                          onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
                          className="border-slate-600 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                        />
                        <Label htmlFor={service} className="text-slate-300 text-sm cursor-pointer">
                          {service}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Damage Description */}
                <div className="space-y-2">
                  <Label htmlFor="damageDescription" className="text-white">
                    Describe the damage or issue (Optional)
                  </Label>
                  <Textarea
                    id="damageDescription"
                    value={formData.damageDescription}
                    onChange={(e) => setFormData((prev) => ({ ...prev, damageDescription: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
                    placeholder="Tell us about any visible damage, leaks, missing shingles, etc."
                  />
                </div>

                {/* Additional Questions */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="insuranceClaim"
                      checked={formData.insuranceClaim}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, insuranceClaim: checked as boolean }))
                      }
                      className="border-slate-600 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                    />
                    <Label htmlFor="insuranceClaim" className="text-slate-300">
                      I need help filing an insurance claim
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="contractorContact"
                      checked={formData.contractorContact}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, contractorContact: checked as boolean }))
                      }
                      className="border-slate-600 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                    />
                    <Label htmlFor="contractorContact" className="text-slate-300">
                      A contractor has already contacted me about this damage
                    </Label>
                  </div>
                </div>

                {/* Response Time Indicator */}
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-5 h-5 text-yellow-400" />
                    <span className="font-semibold text-white">Expected Response Time:</span>
                  </div>
                  <div className="text-slate-300 text-sm">
                    {formData.urgency === "high" && "🚨 Emergency: We'll call within 15 minutes"}
                    {formData.urgency === "medium" && "⚡ Urgent: We'll contact you within 24 hours"}
                    {formData.urgency === "low" && "📊 Standard: Free report within 2 hours, call within 48 hours"}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 text-lg"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : formData.urgency === "high"
                      ? "🚨 Get Emergency Help Now"
                      : formData.urgency === "medium"
                        ? "⚡ Request Urgent Assistance"
                        : "📊 Get Free Assessment"}
                </Button>

                <p className="text-xs text-slate-400 text-center">
                  By submitting this form, you agree to be contacted by RoofFax regarding your roofing needs. We respect
                  your privacy and will never share your information.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <div className="mt-8 text-center">
            <Card className="bg-red-500/10 border-red-500/30">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold text-white mb-2">Can't wait? Call us now!</h3>
                <div className="flex items-center justify-center space-x-2 text-yellow-400 text-xl font-bold">
                  <Phone className="w-5 h-5" />
                  <a href="tel:8508799172">(850) 879-9172</a>
                </div>
                <p className="text-slate-300 text-sm mt-2">Available 24/7 for emergencies</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-slate-400">
            <p className="mb-2">Powered by RoofFax™ | All rights reserved © 2025</p>
            <div className="flex justify-center space-x-6 text-sm">
              <Link href="/terms" className="hover:text-yellow-400">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-yellow-400">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
