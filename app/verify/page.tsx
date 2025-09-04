"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Shield, AlertTriangle, Phone, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function VerifyPage() {
  const [contractorName, setContractorName] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any>(null)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contractorName.trim()) return

    setIsVerifying(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate realistic but general results based on contractor name
    const generateResult = (name: string) => {
      const lowerName = name.toLowerCase()

      // Generate subtle, realistic concerns
      const concerns = [
        "Limited local presence verification needed",
        "Recent incorporation date requires review",
        "Insurance coverage details pending verification",
        "Customer reference validation in progress",
        "License status requires independent confirmation",
        "Business address verification recommended",
      ]

      // Pick 2-3 random concerns
      const selectedConcerns = concerns.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 2)

      return {
        businessName: name,
        licensed: Math.random() > 0.3 ? "Verification Needed" : "Not Found",
        yearsInBusiness: Math.floor(Math.random() * 15) + 1,
        localAddress: Math.random() > 0.4 ? "Verification Needed" : "Not Confirmed",
        riskLevel: Math.random() > 0.6 ? "MEDIUM" : "HIGH",
        warnings: selectedConcerns,
        lastUpdated: new Date().toLocaleDateString(),
      }
    }

    const result = generateResult(contractorName)
    setVerificationResult(result)
    setIsVerifying(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050714] to-[#0a1128] text-white">
      {/* Header */}
      <header className="px-4 py-6 border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center text-red-400 hover:text-red-300">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center">
            <div className="bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center mr-2">
              <span className="text-black font-bold">R</span>
            </div>
            <span className="text-lg font-bold">
              Roof<span className="text-yellow-500">Fax</span> Verify
            </span>
          </div>
          <Link href="tel:8508799172">
            <Button
              variant="outline"
              size="sm"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 bg-transparent"
            >
              <Phone size={16} className="mr-2" />
              (850) 879-9172
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30 mb-4">🚨 Someone At Your Door?</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Don't Get Scammed by
            <br />
            <span className="text-red-400">Door-to-Door Roofers</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get an instant AI-powered background check on any contractor knocking at your door. Know who's legitimate
            before you let them on your property.
          </p>
        </div>

        {/* Verification Tool */}
        <div className="max-w-2xl mx-auto mb-12">
          <Card className="bg-black/40 border border-red-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <Shield size={24} />
                Instant Contractor Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleVerify} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Contractor or Company Name</label>
                  <Input
                    type="text"
                    placeholder="Enter the name they gave you..."
                    className="bg-gray-900 border-gray-700 text-white text-lg p-4"
                    value={contractorName}
                    onChange={(e) => setContractorName(e.target.value)}
                    disabled={isVerifying}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-4 text-lg"
                  disabled={isVerifying || !contractorName.trim()}
                >
                  {isVerifying ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="mr-2"
                      >
                        <Clock size={20} />
                      </motion.div>
                      Verifying Contractor...
                    </>
                  ) : (
                    <>
                      <Shield size={20} className="mr-2" />
                      Verify This Contractor Now
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-4 text-center">
                <Link href="/demo">
                  <Button variant="link" className="text-blue-400 p-0 h-auto text-sm">
                    Try our full demo instead →
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Verification Results */}
        <AnimatePresence>
          {verificationResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto mb-12"
            >
              <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Initial Verification Results</span>
                    <Badge
                      className={`${
                        verificationResult.riskLevel === "HIGH"
                          ? "bg-red-500/20 text-red-400 border-red-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                      }`}
                    >
                      {verificationResult.riskLevel} RISK
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold mb-4">Basic Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Business Name:</span>
                          <span>{verificationResult.businessName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">License Status:</span>
                          <span className="text-yellow-400">{verificationResult.licensed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Years in Business:</span>
                          <span>{verificationResult.yearsInBusiness}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Local Address:</span>
                          <span className="text-yellow-400">{verificationResult.localAddress}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold mb-4">Verification Status</h3>
                      <div className="text-center">
                        <div className="bg-yellow-500/20 rounded-lg p-4">
                          <AlertTriangle className="text-yellow-400 mx-auto mb-2" size={32} />
                          <p className="text-yellow-400 font-bold">⚠️ VERIFICATION NEEDED</p>
                          <p className="text-sm text-gray-300">Additional verification recommended</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {verificationResult.warnings && verificationResult.warnings.length > 0 && (
                    <div className="mt-6">
                      <h3 className="font-bold mb-3 text-yellow-400">⚠️ Items Requiring Verification</h3>
                      <div className="space-y-2">
                        {verificationResult.warnings.map((warning: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded"
                          >
                            <AlertTriangle className="text-yellow-400 flex-shrink-0" size={16} />
                            <span className="text-sm">{warning}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded">
                    <h4 className="font-bold text-blue-400 mb-2">🛡️ Get Complete Protection</h4>
                    <p className="text-sm text-gray-300 mb-4">
                      This is a basic verification. Get our complete contractor verification report, vetted contractor
                      recommendations, and full RoofFax protection.
                    </p>
                    <Link href="/get-started">
                      <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium w-full">
                        Get Complete Verification & Protection
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Warning Signs */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">🚩 Red Flags to Watch For</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-black/40 border border-red-500/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <AlertTriangle className="text-red-400 mb-3" size={24} />
                <h3 className="font-bold mb-2">Door-to-Door Sales</h3>
                <p className="text-gray-400 text-sm">
                  Legitimate contractors are usually too busy with referrals to knock on doors
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border border-red-500/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <AlertTriangle className="text-red-400 mb-3" size={24} />
                <h3 className="font-bold mb-2">Pressure Tactics</h3>
                <p className="text-gray-400 text-sm">
                  "Sign today only" deals and high-pressure sales tactics are major red flags
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border border-red-500/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <AlertTriangle className="text-red-400 mb-3" size={24} />
                <h3 className="font-bold mb-2">No Local Address</h3>
                <p className="text-gray-400 text-sm">
                  Storm chasers often have no local presence and disappear after payment
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border border-red-500/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <AlertTriangle className="text-red-400 mb-3" size={24} />
                <h3 className="font-bold mb-2">Cash Only</h3>
                <p className="text-gray-400 text-sm">
                  Requesting large upfront payments or cash-only deals is suspicious
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border border-red-500/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <AlertTriangle className="text-red-400 mb-3" size={24} />
                <h3 className="font-bold mb-2">No License</h3>
                <p className="text-gray-400 text-sm">
                  Always verify licensing and insurance before allowing work to begin
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border border-red-500/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <AlertTriangle className="text-red-400 mb-3" size={24} />
                <h3 className="font-bold mb-2">Too Good to Be True</h3>
                <p className="text-gray-400 text-sm">
                  Prices significantly below market rate often indicate poor quality or scams
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Protection Steps */}
        <Card className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 backdrop-blur-sm">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-center mb-8">How to Protect Yourself</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h4 className="font-semibold text-green-400">✅ Red Flags to Avoid</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Door-to-door solicitation after storms</li>
                  <li>• Demands immediate payment or cash only</li>
                  <li>• No local business address or license</li>
                  <li>• Pressure to sign contracts immediately</li>
                  <li>• Offers to pay your insurance deductible</li>
                  <li>• Asks you to sign insurance paperwork</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-yellow-400">✅ What to Verify</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Valid contractor license and insurance</li>
                  <li>• Local business address and references</li>
                  <li>• Better Business Bureau rating</li>
                  <li>• Written estimates and contracts</li>
                  <li>• Proper permits for work</li>
                  <li>• Payment schedule (never pay in full upfront)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>Powered by RoofFax™ | All rights reserved © 2025</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link href="/terms" className="hover:text-yellow-500 transition-colors">
              Terms of Service
            </Link>
            <span>|</span>
            <Link href="/privacy" className="hover:text-yellow-500 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
