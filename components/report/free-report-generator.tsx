"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, FileText, Lock, ArrowRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { updateUserType, addUserInterest } from "@/lib/user-type-detection"
import Link from "next/link"

export function FreeReportGenerator() {
  const [address, setAddress] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [reportGenerated, setReportGenerated] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!address.trim()) {
      toast({
        title: "Address Required",
        description: "Please enter a property address to generate a report",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Track user interest
    addUserInterest("property_report")

    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
      setReportGenerated(true)

      toast({
        title: "Report Generated!",
        description: "Your free property report is ready to view",
      })
    }, 3000)
  }

  const handleGetFullReport = () => {
    // Update user type preference to homeowner
    updateUserType("homeowner")

    // Redirect to TrustTheFox for full reports
    window.location.href = "https://trustthefox.com"
  }

  const handleGetProTools = () => {
    // Update user type preference to professional
    updateUserType("professional")

    // Redirect to RoofFaxPro for professional tools
    window.location.href = "https://rooffaxpro.com"
  }

  return (
    <Card className="w-full max-w-3xl mx-auto bg-black/70 backdrop-blur-md border-2 border-neon-gold/30 shadow-neon-glow">
      <CardHeader>
        <CardTitle className="text-xl text-white flex items-center gap-2">
          <FileText className="h-5 w-5 text-neon-gold" />
          Free Roof Report Generator
        </CardTitle>
        <CardDescription className="text-white/70">
          Get a basic roof report for any property - one free report per user
        </CardDescription>
      </CardHeader>

      <CardContent>
        {!reportGenerated ? (
          <form onSubmit={handleGenerateReport} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address" className="text-white">
                Property Address
              </Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main St, Anytown, USA"
                className="bg-black/30 border-neon-gold/30 text-white placeholder:text-white/50 focus:border-neon-gold"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black shadow-neon-glow"
              disabled={isGenerating || !address.trim()}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Report...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Free Report
                </>
              )}
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">Report for: {address}</h3>
              <Badge className="bg-neon-gold/20 text-neon-gold border-neon-gold/30">Basic Report</Badge>
            </div>

            {/* Basic Report Section - Fully Visible */}
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-neon-gold/30 bg-black/50">
                <h4 className="text-white font-medium mb-2">Basic Roof Information</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-white/50">Estimated Size:</span>
                    <span className="ml-1 text-white">2,100 sq ft</span>
                  </div>
                  <div>
                    <span className="text-white/50">Roof Type:</span>
                    <span className="ml-1 text-white">Gable</span>
                  </div>
                  <div>
                    <span className="text-white/50">Material:</span>
                    <span className="ml-1 text-white">Asphalt Shingles</span>
                  </div>
                  <div>
                    <span className="text-white/50">Estimated Age:</span>
                    <span className="ml-1 text-white">12-15 years</span>
                  </div>
                </div>
              </div>

              {/* Teaser Section - Partially Blurred */}
              <div className="p-4 rounded-lg border border-neon-gold/30 bg-black/50 relative overflow-hidden">
                <h4 className="text-white font-medium mb-2">Storm History</h4>

                {/* Visible content */}
                <div className="mb-4">
                  <p className="text-white/70 text-sm">
                    This property has experienced approximately 3 major storm events in the past 5 years that may have
                    impacted the roof.
                  </p>
                </div>

                {/* Blurred content with overlay */}
                <div className="relative h-32">
                  <div className="absolute inset-0 blur-sm opacity-30">
                    <div className="p-2 border border-white/20 rounded mb-2">
                      <div className="flex justify-between">
                        <span>June 15, 2022</span>
                        <span>Hail: 1.25"</span>
                      </div>
                    </div>
                    <div className="p-2 border border-white/20 rounded mb-2">
                      <div className="flex justify-between">
                        <span>August 3, 2021</span>
                        <span>Wind: 65mph</span>
                      </div>
                    </div>
                    <div className="p-2 border border-white/20 rounded">
                      <div className="flex justify-between">
                        <span>May 22, 2020</span>
                        <span>Hail: 0.75"</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black flex flex-col items-center justify-end p-4">
                    <Lock className="h-6 w-6 text-neon-gold mb-2" />
                    <p className="text-white text-center text-sm mb-2">
                      Detailed storm data available in the full report
                    </p>
                    <Button
                      size="sm"
                      onClick={handleGetFullReport}
                      className="bg-neon-gold text-black hover:bg-neon-orange"
                    >
                      Get Full Report
                    </Button>
                  </div>
                </div>
              </div>

              {/* Another Teaser Section */}
              <div className="p-4 rounded-lg border border-neon-gold/30 bg-black/50 relative overflow-hidden">
                <h4 className="text-white font-medium mb-2">Roof Condition Assessment</h4>

                {/* Visible content */}
                <div className="mb-4">
                  <p className="text-white/70 text-sm">
                    Based on satellite imagery and property data, we've estimated the current roof condition.
                  </p>
                </div>

                {/* Blurred content with overlay */}
                <div className="relative h-32">
                  <div className="absolute inset-0 blur-sm opacity-30">
                    <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden mb-2">
                      <div className="h-full bg-yellow-500 w-3/5"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <div className="p-2 border border-white/20 rounded text-center">
                        <div>Granule Loss</div>
                        <div>Moderate</div>
                      </div>
                      <div className="p-2 border border-white/20 rounded text-center">
                        <div>Curling</div>
                        <div>Minimal</div>
                      </div>
                      <div className="p-2 border border-white/20 rounded text-center">
                        <div>Flashing</div>
                        <div>Fair</div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black flex flex-col items-center justify-end p-4">
                    <Lock className="h-6 w-6 text-neon-gold mb-2" />
                    <p className="text-white text-center text-sm mb-2">
                      Detailed condition assessment in the full report
                    </p>
                    <Button
                      size="sm"
                      onClick={handleGetFullReport}
                      className="bg-neon-gold text-black hover:bg-neon-orange"
                    >
                      Get Full Report
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-lg border border-neon-gold/30 bg-black/50 text-center">
                <h4 className="text-white font-medium mb-2">Need More Detailed Reports?</h4>
                <p className="text-white/70 text-sm mb-4">
                  Get comprehensive roof reports with detailed measurements, condition assessments, and repair
                  recommendations.
                </p>
                <Button
                  onClick={handleGetFullReport}
                  className="bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black shadow-neon-glow"
                >
                  Visit TrustTheFox.com <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="p-4 rounded-lg border border-neon-gold/30 bg-black/50 text-center">
                <h4 className="text-white font-medium mb-2">Are You a Roofing Professional?</h4>
                <p className="text-white/70 text-sm mb-4">
                  Access our full suite of professional tools, including measurements, proposals, and customer
                  management.
                </p>
                <Button
                  onClick={handleGetProTools}
                  className="bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-purple text-white shadow-neon-glow"
                >
                  Visit RoofFaxPro.com <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-center border-t border-neon-gold/20 pt-4">
        <p className="text-xs text-white/50 text-center">
          This free report provides basic information. For comprehensive analysis and professional tools,{" "}
          <Link href="/signup" className="text-neon-gold hover:text-neon-orange">
            create an account
          </Link>
          .
        </p>
      </CardFooter>
    </Card>
  )
}
