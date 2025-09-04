"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle, Search, Shield, Star } from "lucide-react"

export default function DemoPage() {
  const [contractorName, setContractorName] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleAnalysis = async () => {
    if (!contractorName.trim()) return

    setIsAnalyzing(true)

    // Simulate API call
    setTimeout(() => {
      const mockResults = {
        name: contractorName,
        license: {
          status: "Active",
          number: "RC29027364",
          expires: "2025-12-31",
          verified: true,
        },
        insurance: {
          status: "Current",
          carrier: "State Farm Commercial",
          coverage: "$2,000,000",
          verified: true,
        },
        bbb: {
          rating: "A+",
          accredited: true,
          complaints: 0,
        },
        reviews: {
          google: 4.8,
          totalReviews: 127,
          recent: [
            "Excellent work, professional team",
            "Fair pricing, quality materials",
            "Completed on time, clean job site",
          ],
        },
        riskScore: "Low",
        recommendation: "Recommended",
      }

      setResults(mockResults)
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Check Any Pro Instantly</h1>
            <p className="text-xl text-gray-600 mb-8">
              Get comprehensive verification in seconds - license, insurance, reviews, and more
            </p>
          </div>

          {/* Demo Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Pro Verification Demo
              </CardTitle>
              <CardDescription>
                Enter any roofing professional's name to see our instant verification system in action
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="Enter pro/contractor name..."
                  value={contractorName}
                  onChange={(e) => setContractorName(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handleAnalysis}
                  disabled={!contractorName.trim() || isAnalyzing}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isAnalyzing ? "Analyzing..." : "Verify Pro"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Loading State */}
          {isAnalyzing && (
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold mb-2">Analyzing Pro...</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>✓ Checking license status...</p>
                    <p>✓ Verifying insurance coverage...</p>
                    <p>✓ Scanning review platforms...</p>
                    <p>✓ Cross-referencing databases...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results */}
          {results && (
            <div className="space-y-6">
              {/* Overall Status */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      {results.name} - Verification Results
                    </CardTitle>
                    <Badge
                      variant={results.recommendation === "Recommended" ? "default" : "destructive"}
                      className="text-sm"
                    >
                      {results.recommendation}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* License Status */}
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        {results.license.verified ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                        License Status
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="font-medium">Status:</span> {results.license.status}
                        </p>
                        <p>
                          <span className="font-medium">License #:</span> {results.license.number}
                        </p>
                        <p>
                          <span className="font-medium">Expires:</span> {results.license.expires}
                        </p>
                      </div>
                    </div>

                    {/* Insurance */}
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        {results.insurance.verified ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                        Insurance Coverage
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="font-medium">Status:</span> {results.insurance.status}
                        </p>
                        <p>
                          <span className="font-medium">Carrier:</span> {results.insurance.carrier}
                        </p>
                        <p>
                          <span className="font-medium">Coverage:</span> {results.insurance.coverage}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews & Ratings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Reviews & Reputation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(results.reviews.google) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="font-semibold">{results.reviews.google}/5.0</span>
                        <span className="text-sm text-gray-600">({results.reviews.totalReviews} reviews)</span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">BBB Rating: {results.bbb.rating}</p>
                        <p className="text-sm">Complaints: {results.bbb.complaints}</p>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Recent Reviews:</h5>
                      <div className="space-y-1">
                        {results.reviews.recent.map((review: string, index: number) => (
                          <p key={index} className="text-sm text-gray-600 italic">
                            "{review}"
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Assessment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Risk Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-lg">Risk Level: {results.riskScore}</p>
                      <p className="text-sm text-gray-600">
                        Based on license, insurance, reviews, and complaint history
                      </p>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Verified Pro
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Call to Action */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">Ready to Get Started?</h3>
                    <p className="text-gray-600 mb-4">
                      Get instant verification for any roofing professional in your area
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Button className="bg-blue-600 hover:bg-blue-700">Start Free Analysis</Button>
                      <Button variant="outline">Learn More</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Features Preview */}
          {!results && !isAnalyzing && (
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle className="text-lg">License Verification</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Real-time license status, expiration dates, and disciplinary actions
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Star className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle className="text-lg">Review Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Aggregated ratings from Google, BBB, and industry platforms</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <AlertTriangle className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle className="text-lg">Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Comprehensive risk scoring based on multiple data points</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
