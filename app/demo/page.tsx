"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, Search, AlertTriangle, CheckCircle, XCircle, Shield, Clock, FileText, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

interface ContractorData {
  name: string
  riskLevel: "LOW" | "MEDIUM" | "HIGH"
  riskScore: number
  licenseStatus: string
  businessAge: string
  bbbRating: string
  complaints: number
  address: string
  phone: string
  redFlags: string[]
  greenFlags: string[]
  recommendation: string
  description: string
}

const contractorDatabase: Record<string, ContractorData> = {
  "storm chasers": {
    name: "Storm Chasers Roofing LLC",
    riskLevel: "HIGH",
    riskScore: 85,
    licenseStatus: "No Local License Found",
    businessAge: "2 months",
    bbbRating: "F",
    complaints: 5,
    address: "Out of State Address",
    phone: "(555) 123-SCAM",
    redFlags: [
      "No local contractor license",
      "Company incorporated only 2 months ago",
      "5 unresolved BBB complaints",
      "No local business address",
      "High-pressure sales tactics reported",
      "Demands payment upfront",
    ],
    greenFlags: [],
    recommendation: "AVOID - High Risk",
    description: "Classic storm chaser operation with multiple red flags",
  },
  "quality roofing": {
    name: "Quality Roofing Solutions Inc",
    riskLevel: "LOW",
    riskScore: 15,
    licenseStatus: "Licensed & Insured",
    businessAge: "12 years",
    bbbRating: "A+",
    complaints: 0,
    address: "Local Business Address",
    phone: "(850) 555-ROOF",
    redFlags: [],
    greenFlags: [
      "Fully licensed and insured",
      "12+ years in business",
      "A+ BBB rating",
      "Zero unresolved complaints",
      "Local business with physical address",
      "Excellent customer reviews",
    ],
    recommendation: "RECOMMENDED - Low Risk",
    description: "Established local contractor with excellent track record",
  },
  "abc roofing": {
    name: "ABC Roofing & Construction",
    riskLevel: "MEDIUM",
    riskScore: 45,
    licenseStatus: "Licensed (Expires Soon)",
    businessAge: "3 years",
    bbbRating: "B-",
    complaints: 2,
    address: "Local Address",
    phone: "(850) 555-0123",
    redFlags: ["License expires in 30 days", "2 recent complaints about delays", "Mixed customer reviews"],
    greenFlags: ["Currently licensed", "Local business", "3 years experience", "Responds to complaints"],
    recommendation: "PROCEED WITH CAUTION",
    description: "Legitimate contractor but with some concerns to address",
  },
}

export default function AIVerificationDemo() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [contractorData, setContractorData] = useState<ContractorData | null>(null)
  const [searchProgress, setSearchProgress] = useState(0)

  const searchSteps = [
    "Searching business databases...",
    "Checking license status...",
    "Analyzing BBB records...",
    "Reviewing complaint history...",
    "Cross-referencing public records...",
    "Generating risk assessment...",
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) return

    setIsSearching(true)
    setShowResults(false)
    setCurrentStep(0)
    setSearchProgress(0)

    // Find matching contractor data
    const searchKey = searchTerm.toLowerCase()
    let foundData = null

    for (const [key, data] of Object.entries(contractorDatabase)) {
      if (searchKey.includes(key) || key.includes(searchKey)) {
        foundData = data
        break
      }
    }

    // Default to storm chasers if no match found
    if (!foundData) {
      foundData = contractorDatabase["storm chasers"]
    }

    // Simulate AI processing steps
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        const next = prev + 1
        setSearchProgress((next / searchSteps.length) * 100)

        if (next >= searchSteps.length) {
          clearInterval(stepInterval)
          setTimeout(() => {
            setIsSearching(false)
            setContractorData(foundData)
            setShowResults(true)
          }, 500)
        }
        return next
      })
    }, 800)
  }

  const resetDemo = () => {
    setSearchTerm("")
    setIsSearching(false)
    setShowResults(false)
    setContractorData(null)
    setCurrentStep(0)
    setSearchProgress(0)
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "LOW":
        return "text-green-400 border-green-500/30 bg-green-500/10"
      case "MEDIUM":
        return "text-yellow-400 border-yellow-500/30 bg-yellow-500/10"
      case "HIGH":
        return "text-red-400 border-red-500/30 bg-red-500/10"
      default:
        return "text-gray-400 border-gray-500/30 bg-gray-500/10"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050714] to-[#0a1128] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <Button variant="ghost" size="sm" className="text-white">
                <ArrowLeft size={16} className="mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center">
              <div className="bg-yellow-500 rounded-full w-10 h-10 flex items-center justify-center mr-2">
                <span className="text-black font-bold text-xl">R</span>
              </div>
              <span className="text-xl font-bold">
                Roof<span className="text-yellow-500">Fax</span>
              </span>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto">
          {/* Demo Header */}
          <div className="text-center mb-8">
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 mb-4">🤖 AI Verification Demo</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">See AI Verification in Action</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Try our AI-powered contractor verification system. Enter any contractor name to see how we protect
              homeowners in real-time.
            </p>
          </div>

          {/* Quick Try Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Button
              variant="outline"
              size="sm"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
              onClick={() => setSearchTerm("Storm Chasers Roofing")}
            >
              Try: "Storm Chasers Roofing"
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-green-500/30 text-green-400 hover:bg-green-500/10 bg-transparent"
              onClick={() => setSearchTerm("Quality Roofing Solutions")}
            >
              Try: "Quality Roofing Solutions"
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent"
              onClick={() => setSearchTerm("ABC Roofing")}
            >
              Try: "ABC Roofing"
            </Button>
          </div>

          {/* Search Interface */}
          <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm mb-8">
            <CardContent className="p-6">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type="text"
                    placeholder="Enter contractor or company name..."
                    className="pl-10 bg-gray-900 border-gray-700 text-white text-lg py-3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    disabled={isSearching}
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3"
                    disabled={isSearching || !searchTerm.trim()}
                  >
                    {isSearching ? "Analyzing..." : "Run AI Verification"}
                  </Button>
                  {showResults && (
                    <Button
                      type="button"
                      variant="outline"
                      className="border-gray-600 text-white bg-transparent"
                      onClick={resetDemo}
                    >
                      Try Another
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* AI Processing Animation */}
          <AnimatePresence>
            {isSearching && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-8"
              >
                <Card className="bg-black/40 border border-blue-500/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                      <h3 className="text-xl font-bold mb-2">AI Analysis in Progress</h3>
                      <Progress value={searchProgress} className="mb-4" />
                    </div>

                    <div className="space-y-3">
                      {searchSteps.map((step, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                            index < currentStep
                              ? "bg-green-500/20 border border-green-500/30"
                              : index === currentStep
                                ? "bg-blue-500/20 border border-blue-500/30"
                                : "bg-gray-800/50 border border-gray-700/30"
                          }`}
                        >
                          {index < currentStep ? (
                            <CheckCircle className="text-green-400" size={20} />
                          ) : index === currentStep ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            >
                              <Clock className="text-blue-400" size={20} />
                            </motion.div>
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-600"></div>
                          )}
                          <span className={index <= currentStep ? "text-white font-medium" : "text-gray-400"}>
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {showResults && contractorData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Results Header */}
                <Card className={`border backdrop-blur-sm ${getRiskColor(contractorData.riskLevel)}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">{contractorData.name}</h2>
                        <p className="text-gray-300">{contractorData.description}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={`text-lg px-4 py-2 ${getRiskColor(contractorData.riskLevel)}`}>
                          {contractorData.riskLevel} RISK
                        </Badge>
                        <div className="text-2xl font-bold mt-2">{contractorData.riskScore}/100</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">License Status:</span>
                          <span
                            className={contractorData.licenseStatus.includes("No") ? "text-red-400" : "text-green-400"}
                          >
                            {contractorData.licenseStatus}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Business Age:</span>
                          <span>{contractorData.businessAge}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">BBB Rating:</span>
                          <span className={contractorData.bbbRating.includes("F") ? "text-red-400" : "text-green-400"}>
                            {contractorData.bbbRating}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Complaints:</span>
                          <span className={contractorData.complaints > 0 ? "text-red-400" : "text-green-400"}>
                            {contractorData.complaints} unresolved
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Address:</span>
                          <span>{contractorData.address}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Phone:</span>
                          <span>{contractorData.phone}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Analysis */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Red Flags */}
                  {contractorData.redFlags.length > 0 && (
                    <Card className="bg-black/40 border border-red-500/30 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-400">
                          <AlertTriangle size={20} />
                          Red Flags Found ({contractorData.redFlags.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {contractorData.redFlags.map((flag, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <XCircle className="text-red-400 mt-1 flex-shrink-0" size={16} />
                              <span className="text-sm text-gray-300">{flag}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Green Flags */}
                  {contractorData.greenFlags.length > 0 && (
                    <Card className="bg-black/40 border border-green-500/30 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-400">
                          <CheckCircle size={20} />
                          Positive Indicators ({contractorData.greenFlags.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {contractorData.greenFlags.map((flag, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={16} />
                              <span className="text-sm text-gray-300">{flag}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Recommendation */}
                <Card className={`border backdrop-blur-sm ${getRiskColor(contractorData.riskLevel)}`}>
                  <CardContent className="p-6 text-center">
                    <Shield className="mx-auto mb-4" size={48} />
                    <h3 className="text-2xl font-bold mb-2">Our Recommendation</h3>
                    <p className="text-xl font-semibold mb-4">{contractorData.recommendation}</p>

                    {contractorData.riskLevel === "HIGH" && (
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          This contractor shows multiple red flags. Don't risk your home and money.
                        </p>
                        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-8">
                          Get Our Vetted Contractors Instead
                        </Button>
                      </div>
                    )}

                    {contractorData.riskLevel === "LOW" && (
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          This contractor appears to be legitimate with a good track record.
                        </p>
                        <Button className="bg-green-500 hover:bg-green-600 text-white font-medium px-8">
                          Still Want Our Protection? Get RoofFax
                        </Button>
                      </div>
                    )}

                    {contractorData.riskLevel === "MEDIUM" && (
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          This contractor has some concerns. Consider getting a second opinion.
                        </p>
                        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-8">
                          Let RoofFax Handle This For You
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Call to Action */}
                <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-2xl font-bold mb-4">Ready to Protect Your Home?</h3>
                    <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                      This is just a demo. Get real-time verification for any contractor at your door, plus our complete
                      protection service.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-8">
                        Get Full RoofFax Protection
                      </Button>
                      <Button
                        variant="outline"
                        className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 bg-transparent"
                      >
                        <Phone size={16} className="mr-2" />
                        Call: (850) 879-9172
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* How It Works */}
          {!isSearching && !showResults && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-center mb-8">How Our AI Verification Works</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="bg-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Search className="text-blue-400" size={32} />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Data Collection</h3>
                    <p className="text-gray-400 text-sm">
                      Our AI searches multiple databases including business registrations, licensing boards, BBB
                      records, and complaint databases.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="bg-purple-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Shield className="text-purple-400" size={32} />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Risk Analysis</h3>
                    <p className="text-gray-400 text-sm">
                      Advanced algorithms analyze patterns, cross-reference data, and calculate risk scores based on
                      hundreds of factors.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="bg-green-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <FileText className="text-green-400" size={32} />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Instant Report</h3>
                    <p className="text-gray-400 text-sm">
                      Get a comprehensive report with risk assessment, red flags, and clear recommendations in under 30
                      seconds.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
