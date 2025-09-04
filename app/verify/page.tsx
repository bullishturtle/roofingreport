"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Search, Shield, Phone, MapPin, Calendar, Globe, Star, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function VerifyPage() {
  const [formData, setFormData] = useState({
    proName: "",
    company: "",
    license: "",
    location: "",
  })
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any>(null)

  const handleVerify = async () => {
    if (!formData.proName && !formData.company) return

    setIsVerifying(true)

    // Simulate verification process
    setTimeout(() => {
      setVerificationResult({
        status: "verified",
        proName: formData.proName || "John Smith",
        company: formData.company || "Smith Roofing LLC",
        license: formData.license || "FL-RC29027365",
        licenseStatus: "Active",
        location: formData.location || "Pensacola, FL",
        phone: "(850) 555-0123",
        email: "info@smithroofing.com",
        website: "www.smithroofing.com",
        yearsInBusiness: 15,
        rating: 4.9,
        reviewCount: 89,
        insuranceVerified: true,
        bondedAmount: "$1,000,000",
        lastInspection: "2024-01-20",
        certifications: [
          "GAF Master Elite Contractor",
          "CertainTeed SELECT ShingleMaster",
          "OSHA 30-Hour Safety Certified",
          "Better Business Bureau A+ Rating",
        ],
        recentWork: [
          { date: "2024-01-15", type: "Roof Replacement", location: "Gulf Breeze, FL" },
          { date: "2024-01-10", type: "Storm Damage Repair", location: "Pensacola, FL" },
          { date: "2024-01-05", type: "Roof Inspection", location: "Navarre, FL" },
        ],
      })
      setIsVerifying(false)
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
            Verify Any Pro Instantly
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Get comprehensive verification of any roofing professional's credentials, licenses, insurance, and
            reputation in real-time.
          </p>
        </div>

        {/* Mobile-optimized verification form */}
        <Card className="max-w-2xl mx-auto mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Shield className="h-5 w-5" />
              Pro Verification Form
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Enter any available information about the pro you want to verify
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Pro/Contractor Name</label>
                <Input
                  placeholder="Enter pro's name..."
                  value={formData.proName}
                  onChange={(e) => handleInputChange("proName", e.target.value)}
                  className="text-base" // Prevent zoom on iOS
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Company Name</label>
                <Input
                  placeholder="Enter company name..."
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className="text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">License Number (Optional)</label>
                <Input
                  placeholder="Enter license number..."
                  value={formData.license}
                  onChange={(e) => handleInputChange("license", e.target.value)}
                  className="text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location (Optional)</label>
                <Input
                  placeholder="City, State..."
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="text-base"
                />
              </div>
            </div>

            <Button
              onClick={handleVerify}
              disabled={isVerifying || (!formData.proName && !formData.company)}
              className="w-full"
              size="lg"
            >
              {isVerifying ? (
                <>
                  <Search className="h-4 w-4 mr-2 animate-spin" />
                  Verifying Pro...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Verify This Pro
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Mobile-optimized verification results */}
        {verificationResult && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-xl sm:text-2xl break-words">{verificationResult.proName}</CardTitle>
                  <CardDescription className="text-base sm:text-lg mt-1 break-words">
                    {verificationResult.company}
                  </CardDescription>
                </div>
                <Badge
                  variant={verificationResult.status === "verified" ? "default" : "destructive"}
                  className="text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2 self-start sm:self-center"
                >
                  {verificationResult.status === "verified" ? (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Verified Pro
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 mr-2" />
                      Not Verified
                    </>
                  )}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Mobile-stacked license & contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="font-semibold">License:</span>
                    <span className="break-all">{verificationResult.license}</span>
                    <Badge variant="outline" className="text-green-600 text-xs">
                      {verificationResult.licenseStatus}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="font-semibold">Location:</span>
                    <span>{verificationResult.location}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Calendar className="h-5 w-5 text-purple-600 flex-shrink-0" />
                    <span className="font-semibold">Experience:</span>
                    <span>{verificationResult.yearsInBusiness} years</span>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Phone className="h-5 w-5 text-gray-600 flex-shrink-0" />
                    <span className="font-semibold">Phone:</span>
                    <a href={`tel:${verificationResult.phone}`} className="text-blue-600 hover:underline">
                      {verificationResult.phone}
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Globe className="h-5 w-5 text-gray-600 flex-shrink-0" />
                    <span className="font-semibold">Website:</span>
                    <span className="text-blue-600 break-all text-sm">{verificationResult.website}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                    <span className="font-semibold">Rating:</span>
                    <span>
                      {verificationResult.rating}/5.0 ({verificationResult.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Mobile-optimized insurance & bonding alert */}
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription className="font-medium text-sm sm:text-base">
                  ✅ Insurance Verified & Current | ✅ Bonded for {verificationResult.bondedAmount} | ✅ Last
                  Inspection: {verificationResult.lastInspection}
                </AlertDescription>
              </Alert>

              {/* Mobile-optimized certifications */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <Badge className="h-5 w-5" />
                  Professional Certifications & Credentials
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {verificationResult.certifications.map((cert: string, index: number) => (
                    <Badge key={index} variant="outline" className="justify-start text-xs sm:text-sm p-2">
                      <CheckCircle className="h-3 w-3 mr-2 text-green-600 flex-shrink-0" />
                      <span className="break-words">{cert}</span>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Mobile-optimized recent work history */}
              <div>
                <h3 className="font-semibold mb-3 text-sm sm:text-base">Recent Work History</h3>
                <div className="space-y-2">
                  {verificationResult.recentWork.map((work: any, index: number) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg gap-2"
                    >
                      <div>
                        <span className="font-medium text-sm sm:text-base">{work.type}</span>
                        <span className="text-gray-500 ml-0 sm:ml-2 block sm:inline text-sm">in {work.location}</span>
                      </div>
                      <span className="text-xs sm:text-sm text-gray-600">{work.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile-stacked action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <Button className="flex-1 text-sm sm:text-base">Request Quote from This Pro</Button>
                <Button variant="outline" className="flex-1 bg-transparent text-sm sm:text-base">
                  Download Full Report
                </Button>
                <Button variant="outline" className="text-sm sm:text-base bg-transparent">
                  Share Verification
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Mobile-optimized trust indicators */}
        <div className="mt-12 sm:mt-16 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 px-4">
            Why Trust Our Pro Verification?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Real-Time Database</h3>
              <p className="text-gray-600 text-sm sm:text-base px-2">
                Connected to state licensing boards and insurance providers for instant verification
              </p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Comprehensive Checks</h3>
              <p className="text-gray-600 text-sm sm:text-base px-2">
                License status, insurance, bonding, certifications, and work history all verified
              </p>
            </div>
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <Star className="h-10 w-10 sm:h-12 sm:w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Trusted by Thousands</h3>
              <p className="text-gray-600 text-sm sm:text-base px-2">
                Over 50,000 homeowners have used our verification system to find reliable pros
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
