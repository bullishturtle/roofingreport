"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, Star, Phone, Shield, Download, Share2 } from "lucide-react"

export default function ResultsPage() {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading results
    setTimeout(() => {
      setResults({
        propertyAddress: "123 Main Street, Orlando, FL 32801",
        analysisDate: new Date().toLocaleDateString(),
        overallScore: 85,
        riskLevel: "Low",
        recommendations: [
          {
            priority: "High",
            issue: "Minor granule loss on south-facing slope",
            action: "Monitor and schedule inspection in 6 months",
            cost: "$0 - $200",
          },
          {
            priority: "Medium",
            issue: "Gutter cleaning needed",
            action: "Clean gutters and downspouts",
            cost: "$150 - $300",
          },
        ],
        verifiedPros: [
          {
            name: "Elite Roofing Solutions",
            rating: 4.9,
            reviews: 156,
            license: "RC29027364",
            phone: "(407) 555-0123",
            specialties: ["Storm Damage", "Insurance Claims"],
            verified: true,
          },
          {
            name: "Sunshine Roof Experts",
            rating: 4.7,
            reviews: 89,
            license: "RC29028451",
            phone: "(407) 555-0456",
            specialties: ["Residential", "Maintenance"],
            verified: true,
          },
          {
            name: "Premier Roofing Co",
            rating: 4.8,
            reviews: 203,
            license: "RC29029876",
            phone: "(407) 555-0789",
            specialties: ["Commercial", "Emergency Repair"],
            verified: true,
          },
        ],
      })
      setLoading(false)
    }, 2000)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Analyzing Your Roof...</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>✓ Processing satellite imagery...</p>
              <p>✓ Analyzing roof condition...</p>
              <p>✓ Matching with verified pros...</p>
              <p>✓ Generating recommendations...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Roof Analysis Results</h1>
            <p className="text-xl text-gray-600">Comprehensive analysis for {results.propertyAddress}</p>
            <p className="text-sm text-gray-500">Analysis completed on {results.analysisDate}</p>
          </div>

          {/* Overall Score */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Overall Roof Health Score
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Results
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-4xl font-bold text-green-600 mb-2">{results.overallScore}/100</div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {results.riskLevel} Risk
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">Good Condition</p>
                  <p className="text-sm text-gray-600">Your roof is in good shape with minor maintenance needed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recommendations */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Recommendations
                  </CardTitle>
                  <CardDescription>Priority actions to maintain your roof's condition</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.recommendations.map((rec: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant={rec.priority === "High" ? "destructive" : "secondary"} className="text-xs">
                            {rec.priority} Priority
                          </Badge>
                          <span className="text-sm font-semibold text-green-600">{rec.cost}</span>
                        </div>
                        <h4 className="font-semibold mb-1">{rec.issue}</h4>
                        <p className="text-sm text-gray-600">{rec.action}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Ready to Take Action?</h3>
                    <p className="text-blue-700 text-sm mb-4">
                      Connect with vetted pros who can address these recommendations
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700">Get Quotes from Verified Pros</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Verified Pros */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Verified Pros in Your Area
                  </CardTitle>
                  <CardDescription>Pre-screened professionals ready to help</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.verifiedPros.map((pro: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold flex items-center gap-2">
                              {pro.name}
                              {pro.verified && (
                                <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                                  Verified
                                </Badge>
                              )}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${i < Math.floor(pro.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm">{pro.rating}</span>
                              <span className="text-xs text-gray-500">({pro.reviews} reviews)</span>
                            </div>
                          </div>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Phone className="h-3 w-3 mr-1" />
                            Call
                          </Button>
                        </div>

                        <div className="space-y-1 text-sm text-gray-600">
                          <p>
                            <span className="font-medium">License:</span> {pro.license}
                          </p>
                          <p>
                            <span className="font-medium">Phone:</span> {pro.phone}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {pro.specialties.map((specialty: string, i: number) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <Button variant="outline" className="w-full bg-transparent">
                      View All Verified Pros
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center text-sm text-gray-500">
            <p>Powered by RoofFax™ | All rights reserved © 2025</p>
            <div className="mt-2 space-x-4">
              <a href="#" className="hover:text-gray-700">
                Terms of Service
              </a>
              <span>|</span>
              <a href="#" className="hover:text-gray-700">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
