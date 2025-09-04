"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Shield, CheckCircle, Phone, FileText, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import Link from "next/link"

export default function GetStartedPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [reportId, setReportId] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const result = await response.json()
        setReportId(result.reportId)
        setSubmitted(true)
      }
    } catch (error) {
      console.error("Submission error:", error)
    }

    setIsSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#050714] to-[#0a1128] text-white">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="bg-green-500/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-400" size={40} />
            </div>
            <h1 className="text-4xl font-bold mb-4">Welcome to RoofFax Protection!</h1>
            <p className="text-xl text-gray-300 mb-6">
              Your account has been created and our AI is analyzing your property. A RoofFax representative will contact
              you within 24 hours to verify your information and activate your full protection.
            </p>

            <Card className="bg-black/40 border border-green-500/30 backdrop-blur-sm mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <FileText className="text-green-400" size={24} />
                  <span className="font-bold">Account ID: {reportId}</span>
                </div>
                <div className="space-y-3 text-left">
                  <h3 className="font-bold text-center mb-4">What Happens Next:</h3>
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-500 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-black font-bold text-sm">
                      1
                    </div>
                    <p className="text-gray-300">Our team will call you within 24 hours to verify your information</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-500 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-black font-bold text-sm">
                      2
                    </div>
                    <p className="text-gray-300">
                      We'll activate your full RoofFax protection and contractor verification tools
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-500 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-black font-bold text-sm">
                      3
                    </div>
                    <p className="text-gray-300">
                      You'll receive your comprehensive roof report and ongoing protection
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
                <Phone size={20} className="mr-2" />
                Call Us: (850) 879-9172
              </Button>
              <Link href="/">
                <Button variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-500/10 bg-transparent">
                  Return Home
                </Button>
              </Link>
            </div>

            <div className="text-sm text-gray-400">
              <p>Questions? Email us at landongill@gmail.com</p>
              <p className="mt-2">Keep your phone nearby - we'll be calling soon!</p>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050714] to-[#0a1128] text-white">
      {/* Header */}
      <header className="px-4 py-6 border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center text-blue-400 hover:text-blue-300">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center">
            <div className="bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center mr-2">
              <span className="text-black font-bold">R</span>
            </div>
            <span className="text-lg font-bold">
              Roof<span className="text-yellow-500">Fax</span> Report
            </span>
          </div>
          <Link href="tel:8508799172">
            <Button
              variant="outline"
              size="sm"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 bg-transparent"
            >
              <Phone size={16} className="mr-2" />
              (850) 879-9172
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 mb-4">🏠 Free Roof Report</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get Your Free
            <br />
            <span className="text-blue-400">RoofFax Report</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Like CarFax for your roof. Our AI analyzes satellite imagery, storm data, and property records to give you a
            comprehensive roof condition report in 24 hours.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Shield className="text-blue-400 mx-auto mb-4" size={32} />
              <h3 className="font-bold mb-2">Storm Damage Detection</h3>
              <p className="text-gray-400 text-sm">AI identifies hidden damage from recent storms and weather events</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <FileText className="text-green-400 mx-auto mb-4" size={32} />
              <h3 className="font-bold mb-2">Insurance Claim Prep</h3>
              <p className="text-gray-400 text-sm">Documentation and evidence to support your insurance claims</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <CheckCircle className="text-yellow-400 mx-auto mb-4" size={32} />
              <h3 className="font-bold mb-2">Contractor Matching</h3>
              <p className="text-gray-400 text-sm">Connect with vetted, licensed contractors in your area</p>
            </CardContent>
          </Card>
        </div>

        {/* Sign Up Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-black/40 border border-blue-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <FileText size={24} />
                Get Your Free RoofFax Report
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name *</label>
                    <Input
                      type="text"
                      required
                      className="bg-gray-900 border-gray-700 text-white"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name *</label>
                    <Input
                      type="text"
                      required
                      className="bg-gray-900 border-gray-700 text-white"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <Input
                      type="email"
                      required
                      className="bg-gray-900 border-gray-700 text-white"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <Input
                      type="tel"
                      required
                      className="bg-gray-900 border-gray-700 text-white"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Property Address *</label>
                  <Input
                    type="text"
                    required
                    placeholder="123 Main St, City, State, ZIP"
                    className="bg-gray-900 border-gray-700 text-white"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="mr-2"
                      >
                        <Clock size={20} />
                      </motion.div>
                      Creating Your Account...
                    </>
                  ) : (
                    <>
                      <FileText size={20} className="mr-2" />
                      Get My Free RoofFax Report
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-400">
                <p>✓ No upfront costs • ✓ 24-hour delivery • ✓ AI-powered analysis</p>
              </div>
            </CardContent>
          </Card>

          {/* What You'll Receive */}
          <Card className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 backdrop-blur-sm mt-8">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-center mb-6">What You'll Receive</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-bold">Roof Condition Assessment</h4>
                      <p className="text-gray-400 text-sm">Current condition, age estimates, and material analysis</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-bold">Storm Damage Analysis</h4>
                      <p className="text-gray-400 text-sm">Historical weather impact and potential damage areas</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-bold">Insurance Claim Support</h4>
                      <p className="text-gray-400 text-sm">Documentation and evidence for potential claims</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-bold">Maintenance Recommendations</h4>
                      <p className="text-gray-400 text-sm">Preventive care schedule and priority repairs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-bold">Vetted Contractor List</h4>
                      <p className="text-gray-400 text-sm">
                        Licensed professionals in your area with verified track records
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-bold">Cost Estimates</h4>
                      <p className="text-gray-400 text-sm">Fair market pricing for any recommended work</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>Powered by RoofFax™ | All rights reserved © 2025</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link href="/terms" className="hover:text-yellow-500 transition-colors">
              Terms of Service
            </Link>
            <span>|</span>
            <Link href="/privacy" className="hover:text-yellow-500 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
