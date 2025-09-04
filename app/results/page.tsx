"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Phone, Globe, Shield, CheckCircle, Calendar, Award, Users } from "lucide-react"

export default function ResultsPage() {
  const [selectedPro, setSelectedPro] = useState<number | null>(null)

  const verifiedPros = [
    {
      id: 1,
      name: "Elite Roofing Solutions",
      owner: "Mike Johnson",
      rating: 4.9,
      reviews: 127,
      location: "Pensacola, FL",
      distance: "2.3 miles",
      phone: "(850) 555-0123",
      website: "www.eliteroofingsolutions.com",
      license: "FL-RC29027365",
      yearsInBusiness: 15,
      specialties: ["Storm Damage", "Metal Roofing", "Insurance Claims"],
      certifications: ["GAF Master Elite", "CertainTeed SELECT"],
      recentJobs: 23,
      responseTime: "< 2 hours",
      pricing: "$$",
      availability: "Available this week",
    },
    {
      id: 2,
      name: "Gulf Coast Roofing Pro",
      owner: "Sarah Martinez",
      rating: 4.8,
      reviews: 89,
      location: "Gulf Breeze, FL",
      distance: "5.1 miles",
      phone: "(850) 555-0456",
      website: "www.gulfcoastroofingpro.com",
      license: "FL-RC29028741",
      yearsInBusiness: 12,
      specialties: ["Residential Roofing", "Tile Repair", "Maintenance"],
      certifications: ["OSHA Certified", "Better Business Bureau A+"],
      recentJobs: 18,
      responseTime: "< 4 hours",
      pricing: "$",
      availability: "Available next week",
    },
    {
      id: 3,
      name: "Precision Roof Systems",
      owner: "David Chen",
      rating: 4.7,
      reviews: 156,
      location: "Navarre, FL",
      distance: "8.7 miles",
      phone: "(850) 555-0789",
      website: "www.precisionroofsystems.com",
      license: "FL-RC29029852",
      yearsInBusiness: 18,
      specialties: ["Commercial Roofing", "Flat Roofs", "Energy Efficient"],
      certifications: ["GAF Master Elite", "NRCA Member", "Energy Star Partner"],
      recentJobs: 31,
      responseTime: "< 6 hours",
      pricing: "$$$",
      availability: "Available in 2 weeks",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Verified Pros in Your Area</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We found {verifiedPros.length} highly-rated, verified roofing professionals near you. All pros are licensed,
            insured, and background-checked.
          </p>
        </div>

        {/* Filter/Sort Bar */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <Badge variant="outline" className="px-4 py-2">
            <MapPin className="h-4 w-4 mr-2" />
            Within 10 miles
          </Badge>
          <Badge variant="outline" className="px-4 py-2">
            <Shield className="h-4 w-4 mr-2" />
            Licensed & Insured
          </Badge>
          <Badge variant="outline" className="px-4 py-2">
            <Star className="h-4 w-4 mr-2" />
            4.5+ Rating
          </Badge>
          <Badge variant="outline" className="px-4 py-2">
            <CheckCircle className="h-4 w-4 mr-2" />
            Background Checked
          </Badge>
        </div>

        {/* Pro Results */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {verifiedPros.map((pro) => (
            <Card
              key={pro.id}
              className={`transition-all duration-200 ${selectedPro === pro.id ? "ring-2 ring-blue-500" : ""}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{pro.name}</CardTitle>
                    <CardDescription className="text-lg">
                      Owner: {pro.owner} • {pro.yearsInBusiness} years in business
                    </CardDescription>

                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        <span className="font-semibold">{pro.rating}</span>
                        <span className="text-gray-500">({pro.reviews} reviews)</span>
                      </div>

                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {pro.location} • {pro.distance}
                        </span>
                      </div>

                      <Badge variant="outline">License: {pro.license}</Badge>
                    </div>
                  </div>

                  <div className="text-right">
                    <Badge className="mb-2">{pro.availability}</Badge>
                    <div className="text-sm text-gray-600">Response time: {pro.responseTime}</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-600" />
                    <span>{pro.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-600" />
                    <span className="text-blue-600">{pro.website}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-600" />
                    <span>{pro.recentJobs} recent jobs</span>
                  </div>
                </div>

                {/* Specialties */}
                <div>
                  <span className="font-semibold text-sm">Specialties: </span>
                  <div className="inline-flex gap-2 mt-1">
                    {pro.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <span className="font-semibold text-sm">Certifications: </span>
                  <div className="inline-flex gap-2 mt-1">
                    {pro.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Award className="h-3 w-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">Pricing: </span>
                    <span className="text-lg">{pro.pricing}</span>
                    <span className="text-xs text-gray-500">
                      {pro.pricing === "$" ? "Budget-friendly" : pro.pricing === "$$" ? "Competitive" : "Premium"}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setSelectedPro(selectedPro === pro.id ? null : pro.id)}>
                      {selectedPro === pro.id ? "Hide Details" : "View Details"}
                    </Button>
                    <Button>Request Quote</Button>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedPro === pro.id && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-3">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Recent Work History</h4>
                        <div className="text-sm space-y-1">
                          <p>• Completed {pro.recentJobs} projects in last 6 months</p>
                          <p>• Average project completion: 5-7 days</p>
                          <p>• 100% customer satisfaction rate</p>
                          <p>• Zero insurance claims or complaints</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Verification Status</h4>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>License verified & current</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Insurance verified & current</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Background check passed</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Bonded for $500K+</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Connect with These Verified Pros?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            All pros shown have been verified, background-checked, and maintain high customer satisfaction ratings.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="px-8">
              Request Quotes from All
            </Button>
            <Button size="lg" variant="outline" className="px-8 bg-transparent">
              Save These Pros
            </Button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
          <div>
            <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold">Licensed & Insured</h3>
            <p className="text-sm text-gray-600">All pros verified</p>
          </div>
          <div>
            <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <h3 className="font-semibold">Top Rated</h3>
            <p className="text-sm text-gray-600">4.5+ star average</p>
          </div>
          <div>
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold">Background Checked</h3>
            <p className="text-sm text-gray-600">Safety guaranteed</p>
          </div>
          <div>
            <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold">Fast Response</h3>
            <p className="text-sm text-gray-600">Quick turnaround</p>
          </div>
        </div>
      </div>
    </div>
  )
}
