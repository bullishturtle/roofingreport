"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Phone, Mail, Home, User, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface FormData {
  // Step 1: Contact Info
  fullName: string
  phone: string
  email: string
  address: string

  // Step 2: Roof Status
  hasDamage: string
  damageType: string[]
  urgency: string

  // Step 3: Insurance/Work
  hasInsurance: string
  hadInspection: string
  suggestedWork: string

  // Step 4: Preferences
  contactMethod: string
  bestTime: string
  interestedIn: string[]

  // Step 5: Additional
  additionalConcerns: string
}

const initialFormData: FormData = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  hasDamage: "",
  damageType: [],
  urgency: "",
  hasInsurance: "",
  hadInspection: "",
  suggestedWork: "",
  contactMethod: "",
  bestTime: "",
  interestedIn: [],
  additionalConcerns: "",
}

export default function HotLeadForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [routingResult, setRoutingResult] = useState<{
    priority: "HIGH" | "MEDIUM" | "LOW"
    action: string
    message: string
    nextSteps: string[]
  } | null>(null)

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = "Name is required"
        if (!formData.phone.trim()) newErrors.phone = "Phone is required"
        else if (formData.phone.replace(/\D/g, "").length < 10) newErrors.phone = "Valid phone required"
        if (!formData.email.trim()) newErrors.email = "Email is required"
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Valid email required"
        if (!formData.address.trim()) newErrors.address = "Address is required"
        break
      case 2:
        if (!formData.hasDamage) newErrors.hasDamage = "Please select an option"
        if (formData.hasDamage === "yes" && formData.damageType.length === 0)
          newErrors.damageType = "Please select damage type"
        if (formData.hasDamage === "yes" && !formData.urgency) newErrors.urgency = "Please select urgency level"
        break
      case 3:
        if (!formData.hasInsurance) newErrors.hasInsurance = "Please select an option"
        if (!formData.hadInspection) newErrors.hadInspection = "Please select an option"
        break
      case 4:
        if (!formData.contactMethod) newErrors.contactMethod = "Please select contact method"
        if (!formData.bestTime) newErrors.bestTime = "Please select best time"
        if (formData.interestedIn.length === 0) newErrors.interestedIn = "Please select at least one option"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const toggleArrayValue = (field: keyof FormData, value: string) => {
    const currentArray = formData[field] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    updateFormData(field, newArray)
  }

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, "")
    if (phoneNumber.length < 4) return phoneNumber
    if (phoneNumber.length < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
  }

  const determineRouting = () => {
    let priority: "HIGH" | "MEDIUM" | "LOW" = "LOW"
    let action = ""
    let message = ""
    let nextSteps: string[] = []

    // High priority routing
    if (formData.hasDamage === "yes" && formData.urgency === "immediate") {
      priority = "HIGH"
      action = "IMMEDIATE_CALL"
      message = "🚨 URGENT: We'll call you within 15 minutes!"
      nextSteps = [
        "Keep your phone nearby - we're calling within 15 minutes",
        "Take photos of any visible damage if safe to do so",
        "Don't let any contractors start work until we speak",
        "Check your email for emergency contact info",
      ]
    }
    // Medium priority routing
    else if (formData.hasDamage === "yes" && formData.urgency === "week") {
      priority = "MEDIUM"
      action = "SCHEDULE_INSPECTION"
      message = "We'll schedule your professional inspection within 24 hours"
      nextSteps = [
        "Expect a call within 24 hours to schedule inspection",
        "We'll coordinate with your insurance if needed",
        "Download your free roof report while you wait",
        "Avoid any door-to-door contractors until we inspect",
      ]
    }
    // Low priority - report focused
    else {
      priority = "LOW"
      action = "FREE_REPORT"
      message = "Your free AI roof report is being generated"
      nextSteps = [
        "Check your email for the report within 2 hours",
        "Review the findings and recommendations",
        "Call us if you have questions: (850) 879-9172",
        "Use our contractor verification tool if anyone visits",
      ]
    }

    return { priority, action, message, nextSteps }
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    setIsSubmitting(true)

    try {
      const routing = determineRouting()

      // Submit to API
      const response = await fetch("/api/hot-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          priority: routing.priority,
          action: routing.action,
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) throw new Error("Submission failed")

      setRoutingResult(routing)
      setIsComplete(true)
    } catch (error) {
      setErrors({ submit: "Something went wrong. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isComplete && routingResult) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#050714] to-[#0a1128] text-white">
        <div className="container mx-auto px-4 py-8">
          <header className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <Link href="/" className="mr-4">
                <Button variant="ghost" size="sm" className="text-white">
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Home
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

          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div
                className={`rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 ${
                  routingResult.priority === "HIGH"
                    ? "bg-red-500/20"
                    : routingResult.priority === "MEDIUM"
                      ? "bg-yellow-500/20"
                      : "bg-green-500/20"
                }`}
              >
                {routingResult.priority === "HIGH" ? (
                  <AlertTriangle className="text-red-400" size={48} />
                ) : routingResult.priority === "MEDIUM" ? (
                  <Clock className="text-yellow-400" size={48} />
                ) : (
                  <CheckCircle className="text-green-400" size={48} />
                )}
              </div>

              <h1 className="text-3xl font-bold mb-4">Thank You, {formData.fullName.split(" ")[0]}!</h1>
              <p className="text-xl text-gray-300 mb-8">{routingResult.message}</p>

              <Card
                className={`border backdrop-blur-sm mb-8 ${
                  routingResult.priority === "HIGH"
                    ? "bg-red-500/10 border-red-500/30"
                    : routingResult.priority === "MEDIUM"
                      ? "bg-yellow-500/10 border-yellow-500/30"
                      : "bg-green-500/10 border-green-500/30"
                }`}
              >
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">What Happens Next:</h3>
                  <ul className="text-left space-y-2">
                    {routingResult.nextSteps.map((step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={16} />
                        <span className="text-gray-300">{step}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
                  <Phone size={16} className="mr-2" />
                  Call Us: (850) 879-9172
                </Button>
                <Link href="/demo">
                  <Button
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-blue-500/10 bg-transparent"
                  >
                    Try Contractor Verification
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050714] to-[#0a1128] text-white">
      <div className="container mx-auto px-4 py-8">
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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Get Your Roof Protection Plan</h1>
            <p className="text-gray-300">
              Quick assessment to protect your home and connect you with the right solution
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>
                Step {currentStep} of {totalSteps}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {errors.submit && (
            <Alert className="mb-6 border-red-500/30 bg-red-500/10">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-400">{errors.submit}</AlertDescription>
            </Alert>
          )}

          <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
            <CardContent className="p-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Contact Info */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-bold mb-4">Contact Information</h2>

                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                          type="text"
                          placeholder="John Doe"
                          className={`pl-10 bg-gray-900 border-gray-700 text-white ${errors.fullName ? "border-red-500" : ""}`}
                          value={formData.fullName}
                          onChange={(e) => updateFormData("fullName", e.target.value)}
                        />
                      </div>
                      {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                          type="tel"
                          placeholder="(555) 123-4567"
                          className={`pl-10 bg-gray-900 border-gray-700 text-white ${errors.phone ? "border-red-500" : ""}`}
                          value={formData.phone}
                          onChange={(e) => updateFormData("phone", formatPhoneNumber(e.target.value))}
                          maxLength={14}
                        />
                      </div>
                      {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          className={`pl-10 bg-gray-900 border-gray-700 text-white ${errors.email ? "border-red-500" : ""}`}
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                        />
                      </div>
                      {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Property Address *</label>
                      <div className="relative">
                        <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                          type="text"
                          placeholder="123 Main Street, City, State, ZIP"
                          className={`pl-10 bg-gray-900 border-gray-700 text-white ${errors.address ? "border-red-500" : ""}`}
                          value={formData.address}
                          onChange={(e) => updateFormData("address", e.target.value)}
                        />
                      </div>
                      {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Roof Status */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-bold mb-4">Roof Status & Urgency</h2>

                    <div>
                      <label className="block text-sm font-medium mb-3">Is there current damage to your roof? *</label>
                      <div className="grid grid-cols-2 gap-3">
                        {["yes", "no"].map((option) => (
                          <Button
                            key={option}
                            type="button"
                            variant={formData.hasDamage === option ? "default" : "outline"}
                            className={`${formData.hasDamage === option ? "bg-yellow-500 text-black" : "border-gray-600 text-white bg-transparent"}`}
                            onClick={() => updateFormData("hasDamage", option)}
                          >
                            {option === "yes" ? "Yes, there's damage" : "No visible damage"}
                          </Button>
                        ))}
                      </div>
                      {errors.hasDamage && <p className="text-red-400 text-sm mt-1">{errors.hasDamage}</p>}
                    </div>

                    {formData.hasDamage === "yes" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-3">
                            What type of damage? (Select all that apply) *
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {["Leak", "Missing Shingles", "Storm Damage", "Other"].map((type) => (
                              <Button
                                key={type}
                                type="button"
                                variant={formData.damageType.includes(type) ? "default" : "outline"}
                                className={`${formData.damageType.includes(type) ? "bg-yellow-500 text-black" : "border-gray-600 text-white bg-transparent"}`}
                                onClick={() => toggleArrayValue("damageType", type)}
                              >
                                {type}
                              </Button>
                            ))}
                          </div>
                          {errors.damageType && <p className="text-red-400 text-sm mt-1">{errors.damageType}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-3">How urgent is this issue? *</label>
                          <div className="space-y-2">
                            {[
                              { value: "immediate", label: "🚨 Immediate - Need help now", color: "bg-red-500" },
                              { value: "week", label: "⚡ Within 1 Week", color: "bg-yellow-500" },
                              { value: "month", label: "📅 Within 1 Month", color: "bg-green-500" },
                            ].map((option) => (
                              <Button
                                key={option.value}
                                type="button"
                                variant={formData.urgency === option.value ? "default" : "outline"}
                                className={`w-full justify-start ${formData.urgency === option.value ? `${option.color} text-black` : "border-gray-600 text-white bg-transparent"}`}
                                onClick={() => updateFormData("urgency", option.value)}
                              >
                                {option.label}
                              </Button>
                            ))}
                          </div>
                          {errors.urgency && <p className="text-red-400 text-sm mt-1">{errors.urgency}</p>}
                        </div>
                      </>
                    )}
                  </motion.div>
                )}

                {/* Step 3: Insurance/Work */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-bold mb-4">Insurance & Previous Work</h2>

                    <div>
                      <label className="block text-sm font-medium mb-3">Is your roof covered by insurance? *</label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: "yes", label: "Yes" },
                          { value: "no", label: "No" },
                          { value: "unsure", label: "Not Sure" },
                        ].map((option) => (
                          <Button
                            key={option.value}
                            type="button"
                            variant={formData.hasInsurance === option.value ? "default" : "outline"}
                            className={`${formData.hasInsurance === option.value ? "bg-yellow-500 text-black" : "border-gray-600 text-white bg-transparent"}`}
                            onClick={() => updateFormData("hasInsurance", option.value)}
                          >
                            {option.label}
                          </Button>
                        ))}
                      </div>
                      {errors.hasInsurance && <p className="text-red-400 text-sm mt-1">{errors.hasInsurance}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Have you had a roofer inspect it already? *
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {["yes", "no"].map((option) => (
                          <Button
                            key={option}
                            type="button"
                            variant={formData.hadInspection === option ? "default" : "outline"}
                            className={`${formData.hadInspection === option ? "bg-yellow-500 text-black" : "border-gray-600 text-white bg-transparent"}`}
                            onClick={() => updateFormData("hadInspection", option)}
                          >
                            {option === "yes" ? "Yes" : "No"}
                          </Button>
                        ))}
                      </div>
                      {errors.hadInspection && <p className="text-red-400 text-sm mt-1">{errors.hadInspection}</p>}
                    </div>

                    {formData.hadInspection === "yes" && (
                      <div>
                        <label className="block text-sm font-medium mb-2">What type of work was suggested?</label>
                        <textarea
                          placeholder="Describe what the roofer recommended..."
                          className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md text-white resize-none"
                          rows={3}
                          value={formData.suggestedWork}
                          onChange={(e) => updateFormData("suggestedWork", e.target.value)}
                        />
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 4: Preferences */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-bold mb-4">Contact Preferences</h2>

                    <div>
                      <label className="block text-sm font-medium mb-3">Preferred method of contact? *</label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: "phone", label: "📞 Phone" },
                          { value: "email", label: "📧 Email" },
                          { value: "text", label: "💬 Text" },
                        ].map((option) => (
                          <Button
                            key={option.value}
                            type="button"
                            variant={formData.contactMethod === option.value ? "default" : "outline"}
                            className={`${formData.contactMethod === option.value ? "bg-yellow-500 text-black" : "border-gray-600 text-white bg-transparent"}`}
                            onClick={() => updateFormData("contactMethod", option.value)}
                          >
                            {option.label}
                          </Button>
                        ))}
                      </div>
                      {errors.contactMethod && <p className="text-red-400 text-sm mt-1">{errors.contactMethod}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3">Best time to contact you? *</label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: "morning", label: "🌅 Morning" },
                          { value: "afternoon", label: "☀️ Afternoon" },
                          { value: "evening", label: "🌙 Evening" },
                        ].map((option) => (
                          <Button
                            key={option.value}
                            type="button"
                            variant={formData.bestTime === option.value ? "default" : "outline"}
                            className={`${formData.bestTime === option.value ? "bg-yellow-500 text-black" : "border-gray-600 text-white bg-transparent"}`}
                            onClick={() => updateFormData("bestTime", option.value)}
                          >
                            {option.label}
                          </Button>
                        ))}
                      </div>
                      {errors.bestTime && <p className="text-red-400 text-sm mt-1">{errors.bestTime}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3">
                        What are you most interested in? (Select all that apply) *
                      </label>
                      <div className="space-y-2">
                        {[
                          { value: "immediate_call", label: "🚨 Immediate call from RoofFax team" },
                          { value: "inspection", label: "🔍 Schedule a professional roof inspection" },
                          { value: "ai_report", label: "📊 Download a free AI roof report" },
                          { value: "contractor_verification", label: "✅ Verify contractors at my door" },
                        ].map((option) => (
                          <Button
                            key={option.value}
                            type="button"
                            variant={formData.interestedIn.includes(option.value) ? "default" : "outline"}
                            className={`w-full justify-start ${formData.interestedIn.includes(option.value) ? "bg-yellow-500 text-black" : "border-gray-600 text-white bg-transparent"}`}
                            onClick={() => toggleArrayValue("interestedIn", option.value)}
                          >
                            {option.label}
                          </Button>
                        ))}
                      </div>
                      {errors.interestedIn && <p className="text-red-400 text-sm mt-1">{errors.interestedIn}</p>}
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Additional Details */}
                {currentStep === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-bold mb-4">Additional Information</h2>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Any other concerns or info we should know? (Optional)
                      </label>
                      <textarea
                        placeholder="Tell us about any specific concerns, previous experiences with contractors, or anything else that would help us serve you better..."
                        className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md text-white resize-none"
                        rows={4}
                        value={formData.additionalConcerns}
                        onChange={(e) => updateFormData("additionalConcerns", e.target.value)}
                      />
                    </div>

                    <div className="bg-blue-900/20 border border-blue-800 rounded-md p-4">
                      <h4 className="font-semibold text-blue-400 mb-2">📋 Review Your Information</h4>
                      <div className="text-sm text-gray-300 space-y-1">
                        <p>
                          <strong>Name:</strong> {formData.fullName}
                        </p>
                        <p>
                          <strong>Contact:</strong> {formData.phone} • {formData.email}
                        </p>
                        <p>
                          <strong>Address:</strong> {formData.address}
                        </p>
                        <p>
                          <strong>Damage:</strong>{" "}
                          {formData.hasDamage === "yes"
                            ? `Yes (${formData.damageType.join(", ")})`
                            : "No visible damage"}
                        </p>
                        {formData.hasDamage === "yes" && (
                          <p>
                            <strong>Urgency:</strong> {formData.urgency}
                          </p>
                        )}
                        <p>
                          <strong>Interested in:</strong> {formData.interestedIn.join(", ")}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-600 text-white bg-transparent"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Back
                </Button>

                <Button
                  type="button"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
                  onClick={handleNext}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : currentStep === totalSteps ? "Submit Application" : "Next"}
                  {!isSubmitting && currentStep < totalSteps && <ArrowRight size={16} className="ml-2" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
