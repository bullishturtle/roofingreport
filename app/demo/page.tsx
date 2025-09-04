"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Search, Shield, Star, MapPin, Phone, Globe, Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DemoPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any>(null)

  const handleSearch = async () => {
    if (!searchTerm.trim()) return

    setIsSearching(true)

    // Simulate API call
    setTimeout(() => {
      setSearchResults({
        name: searchTerm,
        status: "verified",
        license: "FL-RC29027365",
        rating: 4.8,
        reviews: 127,
        yearsInBusiness: 12,
        location: "Pensacola, FL",
        phone: "(850) 555-0123",
        website: "www.example-roofing.com",
        lastInspection: "2024-01-15",
        certifications: ["GAF Master Elite", "CertainTeed SELECT ShingleMaster", "OSHA 30-Hour"],
        insuranceVerified: true,
        bondedAmount: "$500,000",
        workmanshipWarranty: "10 years",
      })
      setIsSearching(false)
    }, 2000)
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
            Check Any Pro Instantly
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Enter a pro's name or company to see their verification status, licenses, and reputation instantly.
          </p>
        </div>

        {/* Mobile-optimized search section */}
        <Card className="max-w-2xl mx-auto mb-6 sm:mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Search className="h-5 w-5" />
              Pro Verification Demo
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Try searching for any roofing professional or company name
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-0 sm:flex sm:gap-2">
              <Input
                placeholder="Enter pro/contractor name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 text-base" // Prevent zoom on iOS
              />
              <Button onClick={handleSearch} disabled={isSearching || !searchTerm.trim()} className="w-full sm:w-auto">
                {isSearching ? "Searching..." : "Verify Pro"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Mobile-optimized results section */}
        {searchResults && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-xl sm:text-2xl break-words">{searchResults.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-2 text-sm sm:text-base">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span>{searchResults.location}</span>
                  </CardDescription>
                </div>
                <Badge
                  variant={searchResults.status === "verified" ? "default" : "destructive"}
                  className="text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2 self-start sm:self-center"
                >
                  {searchResults.status === "verified" ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Verified Pro
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 mr-2" />
                      Not Verified
                    </>
                  )}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Mobile-stacked license & basic info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="font-semibold">License:</span>
                    <span className="break-all">{searchResults.license}</span>
                    <Badge variant="outline" className="text-green-600 text-xs">
                      Active
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                    <span className="font-semibold">Rating:</span>
                    <span>{searchResults.rating}/5.0</span>
                    <span className="text-gray-500 text-sm">({searchResults.reviews} reviews)</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="font-semibold">Experience:</span>
                    <span>{searchResults.yearsInBusiness} years in business</span>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Phone className="h-5 w-5 text-gray-600 flex-shrink-0" />
                    <span className="font-semibold">Phone:</span>
                    <a href={`tel:${searchResults.phone}`} className="text-blue-600 hover:underline">
                      {searchResults.phone}
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Globe className="h-5 w-5 text-gray-600 flex-shrink-0" />
                    <span className="font-semibold">Website:</span>
                    <span className="text-blue-600 break-all text-sm">{searchResults.website}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="font-semibold">Insurance:</span>
                    <span>Verified & Current</span>
                  </div>
                </div>
              </div>

              {/* Mobile-optimized certifications */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <Badge className="h-5 w-5" />
                  Professional Certifications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {searchResults.certifications.map((cert: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs sm:text-sm">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Mobile-optimized financial info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-4 bg-green-50 rounded-lg">
                <div className="text-center sm:text-left">
                  <span className="font-semibold text-green-800 text-sm sm:text-base">Bonded Amount:</span>
                  <span className="ml-2 text-green-700">{searchResults.bondedAmount}</span>
                </div>
                <div className="text-center sm:text-left">
                  <span className="font-semibold text-green-800 text-sm sm:text-base">Workmanship Warranty:</span>
                  <span className="ml-2 text-green-700">{searchResults.workmanshipWarranty}</span>
                </div>
              </div>

              {/* Mobile-stacked action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <Button className="flex-1 text-sm sm:text-base">Get Quote from This Pro</Button>
                <Button variant="outline" className="flex-1 bg-transparent text-sm sm:text-base">
                  View Full Report
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Mobile-optimized features section */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <Shield className="h-8 w-8 text-blue-600 mb-2 mx-auto" />
              <CardTitle className="text-lg sm:text-xl">Instant Verification</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 text-sm sm:text-base">
                Verify any pro's license, insurance, and credentials in seconds with our comprehensive database.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Star className="h-8 w-8 text-yellow-500 mb-2 mx-auto" />
              <CardTitle className="text-lg sm:text-xl">Reputation Tracking</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 text-sm sm:text-base">
                See real ratings, reviews, and work history from verified homeowners and industry sources.
              </p>
            </CardContent>
          </Card>

          <Card className="sm:col-span-2 lg:col-span-1">
            <CardHeader className="text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mb-2 mx-auto" />
              <CardTitle className="text-lg sm:text-xl">Trusted Network</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 text-sm sm:text-base">
                Connect with pre-vetted, licensed pros who meet our strict quality and reliability standards.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Mobile-optimized CTA section */}
        <div className="text-center mt-12 sm:mt-16 px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Ready to Find Verified Pros?</h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join thousands of homeowners who trust RoofFax to connect them with reliable, verified roofing
            professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Link href="/get-started">
              <Button size="lg" className="px-6 sm:px-8 w-full sm:w-auto">
                Get Started Now
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline" className="px-6 sm:px-8 bg-transparent w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
