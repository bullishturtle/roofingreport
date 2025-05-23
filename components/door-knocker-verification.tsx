"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Search, Shield, AlertTriangle, CheckCircle, X, Phone, MapPin, Globe, Star } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import Link from "next/link"

interface ContractorResult {
  name: string
  company: string
  licenseNumber: string
  licenseStatus: "active" | "expired" | "suspended" | "not found"
  verificationStatus: "verified" | "unverified" | "suspicious"
  complaints: number
  rating: number
  yearsInBusiness: number
  address?: string
  phone?: string
  website?: string
  photoUrl?: string
  stormChaser: boolean
  recentComplaints: {
    date: string
    issue: string
    resolved: boolean
  }[]
}

export function DoorKnockerVerification() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchType, setSearchType] = useState<"name" | "company" | "license">("name")
  const [result, setResult] = useState<ContractorResult | null>(null)
  const [showFullResult, setShowFullResult] = useState(false)
  const { toast } = useToast()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchTerm.trim()) {
      toast({
        title: "Search Required",
        description: "Please enter a contractor name, company, or license to verify",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)
    setResult(null)

    // Simulate API call to contractor database
    setTimeout(() => {
      // Mock data - in a real app, this would come from an API
      const mockResult: ContractorResult = {
        name: searchType === "name" ? searchTerm : "John Smith",
        company: searchType === "company" ? searchTerm : "Reliable Roofing LLC",
        licenseNumber: searchType === "license" ? searchTerm : "ROC-" + Math.floor(100000 + Math.random() * 900000),
        licenseStatus: Math.random() > 0.3 ? "active" : "expired",
        verificationStatus: Math.random() > 0.7 ? "verified" : Math.random() > 0.4 ? "unverified" : "suspicious",
        complaints: Math.floor(Math.random() * 5),
        rating: 2 + Math.random() * 3,
        yearsInBusiness: Math.floor(1 + Math.random() * 20),
        address: "123 Main St, Anytown, USA",
        phone: "(850) 879-9172",
        website: "www.reliableroofing.com",
        photoUrl: "/placeholder.svg?height=100&width=100&text=Contractor Photo",
        stormChaser: Math.random() > 0.7,
        recentComplaints: [
          {
            date: "2023-05-15",
            issue: "Failed to complete work after payment",
            resolved: false,
          },
          {
            date: "2022-11-03",
            issue: "Misrepresented insurance coverage",
            resolved: true,
          },
        ],
      }

      setResult(mockResult)
      setIsSearching(false)

      // Show limited info initially
      setShowFullResult(false)
    }, 2000)
  }

  const handleClear = () => {
    setSearchTerm("")
    setResult(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "verified":
        return "bg-green-500/20 text-green-500 border-green-500/30"
      case "expired":
      case "unverified":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
      case "suspended":
      case "suspicious":
        return "bg-red-500/20 text-red-500 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-500 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
      case "verified":
        return <CheckCircle className="h-4 w-4 mr-1" />
      case "expired":
      case "unverified":
        return <AlertTriangle className="h-4 w-4 mr-1" />
      case "suspended":
      case "suspicious":
        return <X className="h-4 w-4 mr-1" />
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-black/70 backdrop-blur-md border-2 border-neon-gold/30 shadow-neon-glow">
      <CardHeader>
        <CardTitle className="text-xl text-white flex items-center gap-2">
          <Shield className="h-5 w-5 text-neon-gold" />
          Door Knocker Verification
        </CardTitle>
        <CardDescription className="text-white/70">
          Verify who's at your door during storm season - protect yourself from scammers
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white">Search by:</Label>
            <TabsList className="grid w-full grid-cols-3 bg-black/50 border border-neon-gold/30">
              <TabsTrigger
                value="name"
                onClick={() => setSearchType("name")}
                className={searchType === "name" ? "data-[state=active]:bg-neon-gold/20" : ""}
              >
                Person
              </TabsTrigger>
              <TabsTrigger
                value="company"
                onClick={() => setSearchType("company")}
                className={searchType === "company" ? "data-[state=active]:bg-neon-gold/20" : ""}
              >
                Company
              </TabsTrigger>
              <TabsTrigger
                value="license"
                onClick={() => setSearchType("license")}
                className={searchType === "license" ? "data-[state=active]:bg-neon-gold/20" : ""}
              >
                License #
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="space-y-2">
            <Label htmlFor="searchTerm" className="text-white">
              {searchType === "name" ? "Contractor Name" : searchType === "company" ? "Company Name" : "License Number"}
            </Label>
            <div className="relative">
              <Input
                id="searchTerm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  searchType === "name" ? "John Smith" : searchType === "company" ? "ABC Roofing" : "ROC-123456"
                }
                className="bg-black/30 border-neon-gold/30 text-white placeholder:text-white/50 focus:border-neon-gold pr-10"
              />
              {searchTerm && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 text-white/50 hover:text-white"
                  onClick={handleClear}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black shadow-neon-glow"
            disabled={isSearching || !searchTerm.trim()}
          >
            {isSearching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Verify Contractor
              </>
            )}
          </Button>
        </form>

        {result && (
          <div className="mt-6 space-y-4">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-black/50 border border-neon-gold/30">
                <TabsTrigger value="overview" className="data-[state=active]:bg-neon-gold/20">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="details" className="data-[state=active]:bg-neon-gold/20">
                  Details
                </TabsTrigger>
                <TabsTrigger value="complaints" className="data-[state=active]:bg-neon-gold/20">
                  Complaints
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-4">
                <div className="p-4 rounded-lg border border-neon-gold/30 bg-black/50">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="h-16 w-16 rounded-full overflow-hidden bg-black/50 flex-shrink-0">
                      <Image
                        src={result.photoUrl || "/placeholder.svg?height=64&width=64&text=Photo"}
                        alt={result.name}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-white">{result.name}</h3>
                          <p className="text-white/70">{result.company}</p>
                        </div>
                        <Badge className={`${getStatusColor(result.verificationStatus)} flex items-center`}>
                          {getStatusIcon(result.verificationStatus)}
                          {result.verificationStatus === "verified"
                            ? "Verified"
                            : result.verificationStatus === "unverified"
                              ? "Unverified"
                              : "Suspicious"}
                        </Badge>
                      </div>
                      {result.stormChaser && (
                        <Badge variant="outline" className="mt-2 bg-red-500/10 text-red-400 border-red-500/30">
                          <AlertTriangle className="h-3 w-3 mr-1" /> Potential Storm Chaser
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <span className="text-white/50">License:</span>
                      <span className="ml-1 text-white">{result.licenseNumber}</span>
                    </div>
                    <div>
                      <span className="text-white/50">Status:</span>
                      <Badge className={`ml-1 ${getStatusColor(result.licenseStatus)}`}>{result.licenseStatus}</Badge>
                    </div>
                    <div>
                      <span className="text-white/50">Years Active:</span>
                      <span className="ml-1 text-white">{result.yearsInBusiness}</span>
                    </div>
                    <div>
                      <span className="text-white/50">Complaints:</span>
                      <span className="ml-1 text-white">{result.complaints}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <h4 className="text-sm font-medium text-white mb-2">Safety Recommendation:</h4>
                    {result.verificationStatus === "verified" ? (
                      <p className="text-sm text-green-400">
                        This contractor appears legitimate. Always ask for ID and written estimates.
                      </p>
                    ) : result.verificationStatus === "unverified" ? (
                      <p className="text-sm text-yellow-400">
                        Exercise caution. Request additional verification and check references before proceeding.
                      </p>
                    ) : (
                      <p className="text-sm text-red-400">
                        Warning: This contractor has suspicious activity. We recommend not engaging and reporting to
                        authorities if pressured.
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="details" className="mt-4">
                <div className="p-4 rounded-lg border border-neon-gold/30 bg-black/50">
                  <h4 className="text-sm font-medium text-white mb-3">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-neon-gold mt-0.5" />
                      <span className="text-white">{result.phone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-neon-gold mt-0.5" />
                      <span className="text-white">{result.address}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Globe className="h-4 w-4 text-neon-gold mt-0.5" />
                      <span className="text-white">{result.website}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <h4 className="text-sm font-medium text-white mb-2">Rating:</h4>
                    <div className="flex items-center">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(result.rating) ? "text-neon-gold fill-neon-gold" : "text-white/30"
                            }`}
                          />
                        ))}
                      <span className="ml-2 text-white">{result.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <h4 className="text-sm font-medium text-white mb-2">License Verification:</h4>
                    <p className="text-sm text-white/70">
                      License {result.licenseNumber} was last verified on{" "}
                      {new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toLocaleDateString()}.
                    </p>
                    <Button
                      variant="link"
                      className="text-neon-gold p-0 h-auto text-sm"
                      onClick={() => window.open("https://trustthefox.com", "_blank")}
                    >
                      Verify with state licensing board
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="complaints" className="mt-4">
                <div className="p-4 rounded-lg border border-neon-gold/30 bg-black/50">
                  <h4 className="text-sm font-medium text-white mb-3">Recent Complaints</h4>
                  {result.recentComplaints.length > 0 ? (
                    <div className="space-y-3">
                      {result.recentComplaints.map((complaint, index) => (
                        <div key={index} className="p-3 border border-white/10 rounded-md">
                          <div className="flex justify-between items-start">
                            <span className="text-sm text-white/70">{complaint.date}</span>
                            <Badge
                              variant="outline"
                              className={
                                complaint.resolved
                                  ? "bg-green-500/10 text-green-400 border-green-500/30"
                                  : "bg-red-500/10 text-red-400 border-red-500/30"
                              }
                            >
                              {complaint.resolved ? "Resolved" : "Unresolved"}
                            </Badge>
                          </div>
                          <p className="text-sm text-white mt-1">{complaint.issue}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-white/70">No complaints found for this contractor.</p>
                  )}

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <h4 className="text-sm font-medium text-white mb-2">Report a Complaint:</h4>
                    <p className="text-sm text-white/70 mb-2">
                      Had a negative experience with this contractor? Help protect others by reporting it.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-neon-gold/30 text-neon-gold hover:bg-neon-gold/10"
                      onClick={() => window.open("https://trustthefox.com/report", "_blank")}
                    >
                      File a Complaint
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="text-center text-sm text-white/70">
              <p>
                For complete verification and background checks,{" "}
                <a
                  href="https://trustthefox.com"
                  className="text-neon-gold hover:text-neon-orange"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  visit TrustTheFox.com
                </a>
              </p>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-center border-t border-neon-gold/20 pt-4">
        <div className="text-xs text-white/50 text-center">
          <p className="mb-1">
            Protect yourself from storm chasers and unqualified contractors. Always verify before you hire.
          </p>
          <p>Powered by RoofFax™ | All rights reserved 2025</p>
          <div className="mt-1 text-[10px]">
            <Link href="/terms" className="text-neon-gold/70 hover:text-neon-gold">
              Terms of Service
            </Link>{" "}
            |{" "}
            <Link href="/privacy" className="text-neon-gold/70 hover:text-neon-gold">
              Privacy Policy
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
