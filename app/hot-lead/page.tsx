"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Zap, Phone, Clock, Shield, AlertTriangle, CheckCircle, MapPin, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function HotLeadPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    urgency: "",
    issue: "",
    services: [] as string[],
    timeframe: "",
    budget: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true)
      setIsSubmitting(false)
    }, 2000)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-600 mx-auto mb-4" />
            <CardTitle className="text-2xl sm:text-3xl text-green-800">Request Received!</CardTitle>
            <CardDescription className="text-base sm:text-lg">
              We're connecting you with verified pros in your area
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4 sm:space-y-6">
            <Alert>
              <Zap className="h-4 w-4" />
              <AlertDescription className="font-medium text-sm sm:text-base">
                <strong>Priority Status:</strong> Your request has been marked as high-priority. Expect contact from 2-3
                verified pros within the next 2 hours.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">What Happens Next:</h3>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>Pro verification in progress</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>Matching with local experts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-600 flex-shrink-0" />
                    <span>Pros will contact you directly</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-600 flex-shrink-0" />
                    <span>Receive quotes and schedules</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Your Information:</h3>
                <div className="text-xs sm:text-sm space-y-1">
                  <p>
                    <strong>Name:</strong> {formData.name}
                  </p>
                  <p>
                    <strong>Phone:</strong> {formData.phone}
                  </p>
                  <p>
                    <strong>Address:</strong>{" "}
                    {formData.address.length > 30 ? `${formData.address.substring(0, 30)}...` : formData.address}
                  </p>
                  <p>
                    <strong>Urgency:</strong> {formData.urgency}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button className="flex-1">Track My Request</Button>
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setSubmitted(false)}>
                Submit Another Request
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Mobile-friendly header */}
      <header className="border-b border-red-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
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
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Emergency Pro Dispatch</h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Need immediate roofing help? Get connected with verified emergency pros in your area within 2 hours.
          </p>
          <Badge variant="destructive" className="mt-4 text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Priority Response Service
          </Badge>
        </div>

        {/* Mobile-optimized urgency alert */}
        <Alert className="max-w-2xl mx-auto mb-6 sm:mb-8 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="font-medium text-sm sm:text-base">
            <strong>Emergency Service:</strong> For active leaks, storm damage, or safety hazards. Non-emergency
            requests should use our standard matching service.
          </AlertDescription>
        </Alert>

        {/* Mobile-optimized main form */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Phone className="h-5 w-5" />
              Emergency Pro Request Form
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Complete this form to get immediate assistance from verified roofing professionals
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            {/* Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <Input
                  placeholder="Enter your name..."
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number *</label>
                <Input
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="text-base"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Property Address *</label>
              <Input
                placeholder="Enter complete address..."
                value={formData.address}
                onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                className="text-base"
              />
            </div>

            {/* Emergency Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Urgency Level *</label>
                <Select
                  value={formData.urgency}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, urgency: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">🚨 Critical - Active leak/safety hazard</SelectItem>
                    <SelectItem value="urgent">⚡ Urgent - Needs attention today</SelectItem>
                    <SelectItem value="priority">🔥 Priority - Within 24-48 hours</SelectItem>
                    <SelectItem value="standard">📅 Standard - Within a week</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Preferred Contact Time</label>
                <Select
                  value={formData.timeframe}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, timeframe: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="When can pros call?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediately">Immediately</SelectItem>
                    <SelectItem value="morning">Morning (8AM-12PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12PM-5PM)</SelectItem>
                    <SelectItem value="evening">Evening (5PM-8PM)</SelectItem>
                    <SelectItem value="anytime">Anytime</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Issue Description */}
            <div>
              <label className="block text-sm font-medium mb-2">Describe the Issue *</label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md resize-none text-base"
                rows={4}
                placeholder="Please describe the roofing issue, damage, or emergency situation..."
                value={formData.issue}
                onChange={(e) => setFormData((prev) => ({ ...prev, issue: e.target.value }))}
              />
            </div>

            {/* Mobile-optimized services needed */}
            <div>
              <label className="block text-sm font-medium mb-3">Services Needed (Select all that apply)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Emergency Leak Repair",
                  "Storm Damage Assessment",
                  "Temporary Tarping",
                  "Emergency Roof Replacement",
                  "Structural Damage Repair",
                  "Pro Verification",
                  "Insurance Claim Support",
                  "Safety Inspection",
                  "Water Damage Mitigation",
                  "Emergency Consultation",
                ].map((service) => (
                  <div key={service} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50">
                    <Checkbox
                      id={service}
                      checked={formData.services.includes(service)}
                      onCheckedChange={() => handleServiceToggle(service)}
                    />
                    <label htmlFor={service} className="text-sm cursor-pointer flex-1">
                      {service}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-sm font-medium mb-2">Budget Range (Optional)</label>
              <Select
                value={formData.budget}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, budget: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-1k">Under $1,000</SelectItem>
                  <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                  <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                  <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                  <SelectItem value="25k-plus">$25,000+</SelectItem>
                  <SelectItem value="insurance">Insurance claim</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Email (Optional) */}
            <div>
              <label className="block text-sm font-medium mb-2">Email (Optional)</label>
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="text-base"
              />
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={
                isSubmitting ||
                !formData.name ||
                !formData.phone ||
                !formData.address ||
                !formData.urgency ||
                !formData.issue
              }
              className="w-full"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Connecting with Pros...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Get Emergency Pro Help Now
                </>
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              By submitting, you agree to be contacted by verified roofing professionals. Standard message and data
              rates may apply.
            </p>
          </CardContent>
        </Card>

        {/* Mobile-optimized service features */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <Clock className="h-8 w-8 text-red-600 mb-2 mx-auto" />
              <CardTitle className="text-lg sm:text-xl">2-Hour Response</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 text-sm sm:text-base">
                Emergency requests get priority routing to available pros in your area for rapid response.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Shield className="h-8 w-8 text-blue-600 mb-2 mx-auto" />
              <CardTitle className="text-lg sm:text-xl">Verified Pros Only</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 text-sm sm:text-base">
                All emergency responders are pre-verified, licensed, insured, and background-checked.
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
                Connected with pros who know your area's weather patterns, codes, and emergency procedures.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Emergency contact card */}
        <Card className="max-w-md mx-auto mt-8 border-red-200 bg-red-50">
          <CardContent className="pt-6 text-center">
            <Phone className="h-8 w-8 text-red-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">Need Immediate Help?</h3>
            <p className="text-red-700 mb-4 text-sm">Call our emergency hotline for instant pro dispatch</p>
            <a href="tel:8508799172">
              <Button className="bg-red-600 hover:bg-red-700 w-full">
                <Phone className="mr-2 h-4 w-4" />
                Call Now: (850) 879-9172
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
