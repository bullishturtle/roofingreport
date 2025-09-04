"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle, Search, Shield, MapPin } from "lucide-react"

export default function VerifyPage() {
  const [formData, setFormData] = useState({
    contractorName: "",
    licenseNumber: "",
    location: "",
  })
  const [isVerifying, setIsVerifying] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleVerification = async () => {
    if (!formData.contractorName.trim()) return

    setIsVerifying(true)

    // Simulate API call
    setTimeout(() => {
      const mockResults = {
        name: formData.contractorName,
        verified: true,
        license: {
          status: "Active",
          number: formData.licenseNumber || "RC29027364",
          expires: "2025-12-31",
          verified: true,
        },
        insurance: {
          status: "Current",
          verified: true,
        },
        location: formData.location || "Florida",
        riskLevel: "Low",
        recommendation: "Verified Pro",
      }

      setResults(mockResults)
      setIsVerifying(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Verify Any Pro Instantly</h1>
            <p className="text-xl text-gray-600">Get comprehensive verification for roofing professionals in seconds</p>
          </div>

          {/* Verification Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Pro Verification
              </CardTitle>
              <CardDescription>Enter the professional's information to verify their credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Pro/Contractor Name *</label>
                <Input
                  placeholder="Enter professional's name"
                  value={formData.contractorName}
                  onChange={(e) => setFormData({ ...formData, contractorName: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">License Number (Optional)</label>
                <Input
                  placeholder="Enter license number if known"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location (Optional)</label>
                <Input
                  placeholder="City, State"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <Button
                onClick={handleVerification}
                disabled={!formData.contractorName.trim() || isVerifying}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isVerifying ? "Verifying Pro..." : "Verify Professional"}
              </Button>
            </CardContent>
          </Card>

          {/* Loading State */}
          {isVerifying && (
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold mb-2">Verifying Professional...</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>✓ Checking license databases...</p>
                    <p>✓ Verifying insurance status...</p>
                    <p>✓ Scanning complaint records...</p>
                    <p>✓ Cross-referencing credentials...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results */}
          {results && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Verification Results
                  </CardTitle>
                  <Badge variant={results.verified ? "default" : "destructive"} className="text-sm">
                    {results.recommendation}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Pro Info */}
                <div>
                  <h3 className="text-xl font-semibold mb-2">{results.name}</h3>
                  {results.location && (
                    <p className="text-gray-600 flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {results.location}
                    </p>
                  )}
                </div>

                {/* Verification Status */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      {results.license.verified ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      License Status
                    </h4>
                    <div className="text-sm space-y-1">
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

                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      {results.insurance.verified ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      Insurance Status
                    </h4>
                    <div className="text-sm">
                      <p>
                        <span className="font-medium">Status:</span> {results.insurance.status}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Risk Assessment */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold text-green-800">Risk Assessment</h4>
                  </div>
                  <p className="text-green-700">
                    <span className="font-medium">Risk Level:</span> {results.riskLevel}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    This professional has verified credentials and low risk indicators.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Get Full Report</Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Verify Another Pro
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info Cards */}
          {!results && !isVerifying && (
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle className="text-lg">What We Verify</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• License status & expiration</li>
                    <li>• Insurance coverage</li>
                    <li>• Complaint history</li>
                    <li>• Business registration</li>
                    <li>• Review ratings</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
                  <CardTitle className="text-lg">Instant Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Get comprehensive verification results in seconds, not days. Our system checks multiple databases
                    instantly.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
