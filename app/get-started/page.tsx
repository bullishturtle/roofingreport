"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, MapPin, Shield, Star, ArrowRight, Home, Zap, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function GetStartedPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    address: "",
    roofType: "",
    roofAge: "",
    urgency: "",
    services: [] as string[],
    contactInfo: {
      name: "",
      email: "",
      phone: "",
    },
  })

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Mobile-friendly header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">R</span>
              </div>
              <span className="text-lg font-bold text-gray-900">
                <span className="text-yellow-500">Roof</span>Fax
              </span>
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm" className="bg-transparent">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Back</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Mobile-optimized header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            Get Started with Pro Matching
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Tell us about your roofing needs and we'll connect you with verified, licensed pros in your area.
          </p>
        </div>

        {/* Mobile-optimized progress indicator */}
        <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="flex items-center justify-between px-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= stepNum ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step > stepNum ? <CheckCircle className="h-5 w-5" /> : stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-8 sm:w-16 h-1 mx-1 sm:mx-2 ${step > stepNum ? "bg-blue-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs sm:text-sm text-gray-600 px-2">
            <span>Property</span>
            <span>Services</span>
            <span>Contact</span>
          </div>
        </div>

        {/* Step 1: Property Information */}
        {step === 1 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Home className="h-5 w-5" />
                Property Information
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Help us understand your property to match you with the right pros
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Property Address</label>
                <Input
                  placeholder="Enter your full address..."
                  value={formData.address}
                  onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                  className="text-base" // Prevent zoom on iOS
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Roof Type</label>
                  <Select
                    value={formData.roofType}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, roofType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select roof type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asphalt-shingle">Asphalt Shingle</SelectItem>
                      <SelectItem value="metal">Metal</SelectItem>
                      <SelectItem value="tile">Tile</SelectItem>
                      <SelectItem value="slate">Slate</SelectItem>
                      <SelectItem value="flat">Flat/Low Slope</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Roof Age</label>
                  <Select
                    value={formData.roofAge}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, roofAge: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select age range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-5">0-5 years</SelectItem>
                      <SelectItem value="6-10">6-10 years</SelectItem>
                      <SelectItem value="11-15">11-15 years</SelectItem>
                      <SelectItem value="16-20">16-20 years</SelectItem>
                      <SelectItem value="20+">20+ years</SelectItem>
                      <SelectItem value="unknown">Not sure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Project Urgency</label>
                <Select
                  value={formData.urgency}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, urgency: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="How urgent is your project?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emergency">Emergency (Active leak/damage)</SelectItem>
                    <SelectItem value="urgent">Urgent (Within 1-2 weeks)</SelectItem>
                    <SelectItem value="soon">Soon (Within 1 month)</SelectItem>
                    <SelectItem value="planning">Planning (2-3 months)</SelectItem>
                    <SelectItem value="research">Just researching</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={nextStep} className="w-full" disabled={!formData.address}>
                Continue to Service Selection
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Service Selection */}
        {step === 2 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Zap className="h-5 w-5" />
                What Services Do You Need?
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Select all services you're interested in (you can change this later)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  "Roof Inspection",
                  "Roof Repair",
                  "Roof Replacement",
                  "Storm Damage Assessment",
                  "Gutter Installation/Repair",
                  "Skylight Installation",
                  "Ventilation Improvement",
                  "Insulation Upgrade",
                  "Emergency Tarping",
                  "Maintenance Program",
                ].map((service) => (
                  <div key={service} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <Checkbox
                      id={service}
                      checked={formData.services.includes(service)}
                      onCheckedChange={() => handleServiceToggle(service)}
                    />
                    <label htmlFor={service} className="text-sm font-medium cursor-pointer flex-1">
                      {service}
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <Button variant="outline" onClick={prevStep} className="flex-1 bg-transparent">
                  Back
                </Button>
                <Button onClick={nextStep} className="flex-1" disabled={formData.services.length === 0}>
                  Continue to Contact Info
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Contact Information */}
        {step === 3 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Clock className="h-5 w-5" />
                Contact Information
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">How should verified pros contact you?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <Input
                    placeholder="Enter your name..."
                    value={formData.contactInfo.name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        contactInfo: { ...prev.contactInfo, name: e.target.value },
                      }))
                    }
                    className="text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <Input
                    placeholder="(555) 123-4567"
                    value={formData.contactInfo.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        contactInfo: { ...prev.contactInfo, phone: e.target.value },
                      }))
                    }
                    className="text-base"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.contactInfo.email}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contactInfo: { ...prev.contactInfo, email: e.target.value },
                    }))
                  }
                  className="text-base"
                />
              </div>

              {/* Mobile-optimized summary */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Your Request Summary:</h3>
                <div className="text-xs sm:text-sm space-y-1">
                  <p>
                    <strong>Address:</strong> {formData.address}
                  </p>
                  <p>
                    <strong>Roof:</strong> {formData.roofType} ({formData.roofAge})
                  </p>
                  <p>
                    <strong>Urgency:</strong> {formData.urgency}
                  </p>
                  <p>
                    <strong>Services:</strong> {formData.services.slice(0, 3).join(", ")}
                    {formData.services.length > 3 && ` +${formData.services.length - 3} more`}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button variant="outline" onClick={prevStep} className="flex-1 bg-transparent">
                  Back
                </Button>
                <Button
                  className="flex-1"
                  disabled={!formData.contactInfo.name || !formData.contactInfo.email || !formData.contactInfo.phone}
                >
                  Get My Vetted Pro List
                  <CheckCircle className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Mobile-optimized benefits section */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <Shield className="h-8 w-8 text-blue-600 mb-2 mx-auto" />
              <CardTitle className="text-lg sm:text-xl">Verified Pros Only</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 text-sm sm:text-base">
                Every pro in our network is licensed, insured, and background-checked for your peace of mind.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Star className="h-8 w-8 text-yellow-500 mb-2 mx-auto" />
              <CardTitle className="text-lg sm:text-xl">Quality Guaranteed</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 text-sm sm:text-base">
                All pros maintain high ratings and are backed by our satisfaction guarantee and dispute resolution.
              </p>
            </CardContent>
          </Card>

          <Card className="sm:col-span-2 lg:col-span-1">
            <CardHeader className="text-center">
              <MapPin className="h-8 w-8 text-green-600 mb-2 mx-auto" />
              <CardTitle className="text-lg sm:text-xl">Local Experts</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 text-sm sm:text-base">
                We connect you with pros who know your area's building codes, weather patterns, and permit requirements.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
