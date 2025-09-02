"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, AlertTriangle, Shield, Phone, XCircle, Search, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
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

export default function VerifyContractorPage() {
  const [contractorName, setContractorName] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [contractorData, setContractorData] = useState<ContractorData | null>(null)
  const [error, setError] = useState("")

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contractorName.trim()) return

    setIsVerifying(true)
    setError("")
    setShowResults(false)

    try {
      const response = await fetch("/api/verify-contractor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contractorName: contractorName.trim() }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Verification failed")
      }

      setContractorData(result.data)
      setShowResults(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsVerifying(false)
    }
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

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Contractor Verification</h1>
            <p className="text-gray-300">Don't let door-to-door roofers pressure you. Verify them first.</p>
          </div>

          {error && (
            <Alert className="mb-6 border-red-500/30 bg-red-500/10">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-400">{error}</AlertDescription>
            </Alert>
          )}

          {!showResults ? (
            <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm max-w-2xl mx-auto">
              <CardContent className="p-8">
                <form onSubmit={handleVerify} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Contractor or Company Name</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        type="text"
                        placeholder="Enter the name they gave you..."
                        className="pl-10 bg-gray-900 border-gray-700 text-white"
                        value={contractorName}
                        onChange={(e) => setContractorName(e.target.value)}
                        disabled={isVerifying}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3"
                    disabled={isVerifying || !contractorName.trim()}
                  >
                    {isVerifying ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="mr-2"
                        >
                          <Clock size={16} />
                        </motion.div>
                        Verifying...
                      </>
                    ) : (
                      "Run Background Check"
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-400 mb-4">Try these examples:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
                      onClick={() => setContractorName("Storm Chasers Roofing")}
                      disabled={isVerifying}
                    >
                      "Storm Chasers"
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-500/30 text-green-400 hover:bg-green-500/10 bg-transparent"
                      onClick={() => setContractorName("Quality Roofing Solutions")}
                      disabled={isVerifying}
                    >
                      "Quality Roofing"
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent"
                      onClick={() => setContractorName("ABC Roofing")}
                      disabled={isVerifying}
                    >
                      "ABC Roofing"
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <AnimatePresence>
              {contractorData && (
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
                              className={
                                contractorData.licenseStatus.includes("No") ? "text-red-400" : "text-green-400"
                              }
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
                            <span
                              className={contractorData.bbbRating.includes("F") ? "text-red-400" : "text-green-400"}
                            >
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
                            <Shield size={20} />
                            Positive Indicators ({contractorData.greenFlags.length})
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {contractorData.greenFlags.map((flag, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <Shield className="text-green-400 mt-1 flex-shrink-0" size={16} />
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
                          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-8">
                              Get Our Vetted Contractors Instead
                            </Button>
                            <Button
                              variant="outline"
                              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 bg-transparent"
                            >
                              <Phone size={16} className="mr-2" />
                              Call: (850) 879-9172
                            </Button>
                          </div>
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

                  {/* Try Another */}
                  <div className="text-center">
                    <Button
                      onClick={() => {
                        setShowResults(false)
                        setContractorData(null)
                        setContractorName("")
                      }}
                      variant="outline"
                      className="border-gray-600 text-white bg-transparent"
                    >
                      Verify Another Contractor
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  )
}
