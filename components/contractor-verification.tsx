"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Search, Shield, AlertTriangle, CheckCircle, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

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
}

export function ContractorVerification() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchType, setSearchType] = useState<"name" | "company">("name")
  const [result, setResult] = useState<ContractorResult | null>(null)
  const [showFullResult, setShowFullResult] = useState(false)
  const { toast } = useToast()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchTerm.trim()) {
      toast({
        title: "Search Required",
        description: "Please enter a contractor name or company to verify",
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
        licenseNumber: "ROC-" + Math.floor(100000 + Math.random() * 900000),
        licenseStatus: Math.random() > 0.3 ? "active" : "expired",
        verificationStatus: Math.random() > 0.7 ? "verified" : Math.random() > 0.4 ? "unverified" : "suspicious",
        complaints: Math.floor(Math.random() * 5),
        rating: 2 + Math.random() * 3,
        yearsInBusiness: Math.floor(1 + Math.random() * 20),
        address: "123 Main St, Anytown, USA",
        phone: "(555) 123-4567",
        website: "www.reliableroofing.com",
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
          Contractor Verification
        </CardTitle>
        <CardDescription className="text-white/70">Verify who's at your door during storm season</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white">Search by:</Label>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant={searchType === "name" ? "default" : "outline"}
                size="sm"
                onClick={() => setSearchType("name")}
                className={searchType === "name" ? "bg-neon-gold text-black" : "border-neon-gold/30 text-white"}
              >
                Person Name
              </Button>
              <Button
                type="button"
                variant={searchType === "company" ? "default" : "outline"}
                size="sm"
                onClick={() => setSearchType("company")}
                className={searchType === "company" ? "bg-neon-gold text-black" : "border-neon-gold/30 text-white"}
              >
                Company Name
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="searchTerm" className="text-white">
              {searchType === "name" ? "Contractor Name" : "Company Name"}
            </Label>
            <div className="relative">
              <Input
                id="searchTerm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={searchType === "name" ? "John Smith" : "ABC Roofing"}
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
            <div className="p-4 rounded-lg border border-neon-gold/30 bg-black/50">
              <div className="flex justify-between items-start mb-3">
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

              {/* Blurred section that requires sign-up */}
              <div className={`relative ${showFullResult ? "" : "overflow-hidden h-16"}`}>
                {!showFullResult && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 flex items-end justify-center pb-2">
                    <Button
                      variant="link"
                      className="text-neon-gold hover:text-neon-orange"
                      onClick={() => (window.location.href = "https://trustthefox.com")}
                    >
                      Sign up for full verification details
                    </Button>
                  </div>
                )}

                <div className="space-y-2">
                  <div>
                    <span className="text-white/50">Address:</span>
                    <span className="ml-1 text-white">{result.address}</span>
                  </div>
                  <div>
                    <span className="text-white/50">Phone:</span>
                    <span className="ml-1 text-white">{result.phone}</span>
                  </div>
                  <div>
                    <span className="text-white/50">Website:</span>
                    <span className="ml-1 text-white">{result.website}</span>
                  </div>
                  <div>
                    <span className="text-white/50">Rating:</span>
                    <span className="ml-1 text-white">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <span key={i} className={i < Math.floor(result.rating) ? "text-neon-gold" : "text-white/30"}>
                            ★
                          </span>
                        ))}{" "}
                      ({result.rating.toFixed(1)})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-white/70">
              <p>
                For complete verification and background checks,{" "}
                <Link href="https://trustthefox.com" className="text-neon-gold hover:text-neon-orange">
                  visit TrustTheFox.com
                </Link>
              </p>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-center border-t border-neon-gold/20 pt-4">
        <p className="text-xs text-white/50 text-center">
          Protect yourself from storm chasers and unqualified contractors. Always verify before you hire.
        </p>
      </CardFooter>
    </Card>
  )
}

function Link({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}
