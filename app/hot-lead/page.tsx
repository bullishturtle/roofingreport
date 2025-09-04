"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, Shield, Phone, CheckCircle, Star } from "lucide-react"

export default function HotLeadPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    urgency: "",
    services: [] as string[],
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const services = [
    "Emergency Leak Repair",
    "Storm Damage Assessment",
    "Pro Verification",
    "Insurance Claim Support",
    "Roof Inspection",
    "Immediate Consultation",
  ]

  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, services: [...formData.services, service] })
    } else {
      setFormData({ ...formData, services: formData.services.filter((s) => s !== service) })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-green-800 mb-4">Priority Request Submitted!</h1>
              <div className="space-y-4 text-green-700">
                <p className="text-lg">Your urgent request has been prioritized in our system.</p>
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <h3 className="font-semibold mb-2">What happens next:</h3>
                  <div className="space-y-2 text-sm text-left">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Verified pros will contact you within 2 hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>All pros are pre-screened and licensed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>Emergency support available 24/7</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm">
                  Reference ID: <span className="font-mono font-semibold">HL-{Date.now().toString().slice(-6)}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <Badge variant="destructive" className="text-lg px-4 py-1">
                URGENT
              </Badge>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Emergency Roofing Support</h1>
            <p className="text-xl text-gray-600">Get immediate help from verified roofing professionals</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Priority Form */}
            <Card className="border-red-200">
              <CardHeader className="bg-red-50">
                <CardTitle className="flex items-center gap-2 text-red-800">
                  <Clock className="h-5 w-5" />
                  Priority Request Form
                </CardTitle>
                <CardDescription className="text-red-600">
                  Fast-track your request for immediate professional response
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name *</label>
                      <Input
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone *</label>
                      <Input
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Property Address *</label>
                    <Input
                      placeholder="123 Main St, City, State"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Urgency Level *</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={formData.urgency}
                      onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                      required
                    >
                      <option value="">Select urgency</option>
                      <option value="emergency">Emergency - Active leak/damage</option>
                      <option value="urgent">Urgent - Storm damage assessment</option>
                      <option value="priority">Priority - Insurance deadline</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Services Needed</label>
                    <div className="grid grid-cols-2 gap-2">
                      {services.map((service) => (
                        <div key={service} className="flex items-center space-x-2">
                          <Checkbox
                            id={service}
                            checked={formData.services.includes(service)}
                            onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
                          />
                          <label htmlFor={service} className="text-sm">
                            {service}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-lg py-3">
                    Submit Priority Request
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Emergency Info */}
            <div className="space-y-6">
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-800">
                    <AlertTriangle className="h-5 w-5" />
                    Emergency Response
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-orange-700">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="font-semibold">2-Hour Response Time</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>Licensed & Insured Pros Only</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>24/7 Emergency Support</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-blue-600" />
                    Why Choose RoofFax Emergency
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-1">Verified Professionals</h4>
                      <p className="text-sm text-gray-600">
                        All emergency responders are pre-verified with current licenses and insurance
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Rapid Response Network</h4>
                      <p className="text-sm text-gray-600">Our network of pros is standing by for emergency calls</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Quality Guarantee</h4>
                      <p className="text-sm text-gray-600">All emergency work comes with our satisfaction guarantee</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Need Immediate Help?</h3>
                    <p className="text-blue-700 text-sm mb-4">For life-threatening emergencies, call 911 first</p>
                    <Button variant="outline" className="border-blue-300 text-blue-700 bg-transparent">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Emergency Line
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
