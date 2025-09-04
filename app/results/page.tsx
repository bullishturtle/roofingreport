"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Download, Share2, CheckCircle, AlertTriangle, Info, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

interface RoofReport {
  reportId: string
  propertyAddress: string
  analysisDate: string
  overallCondition: "Excellent" | "Good" | "Fair" | "Poor" | "Critical"
  riskScore: number
  damageFound: boolean
  stormHistory: {
    recentStorms: number
    lastStormDate: string
    severity: string
  }
  findings: {
    type: "positive" | "warning" | "critical"
    title: string
    description: string
  }[]
  recommendations: string[]
  nextSteps: string[]
}

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const reportId = searchParams.get("reportId")
  const email = searchParams.get("email")

  const [report, setReport] = useState<RoofReport | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get address from localStorage if available
    const storedAddress = localStorage.getItem("roofFaxAddress") || "123 Main Street, Pensacola, FL 32501"

    // Simulate loading and generate report data
    const timer = setTimeout(() => {
      const mockReport: RoofReport = {
        reportId: reportId || "RFX-" + Date.now(),
        propertyAddress: storedAddress,
        analysisDate: new Date().toLocaleDateString(),
        overallCondition: "Good",
        riskScore: 25,
        damageFound: true,
        stormHistory: {
          recentStorms: 3,
          lastStormDate: "September 2024",
          severity: "Category 2 Hurricane",
        },
        findings: [
          {
            type: "positive",
            title: "Structural Integrity Intact",
            description: "Main roof structure shows no signs of compromise or major damage.",
          },
          {
            type: "warning",
            title: "Minor Shingle Displacement",
            description: "Several shingles show signs of wind damage on the southwest section.",
          },
          {
            type: "warning",
            title: "Gutter System Issues",
            description: "Gutters show debris accumulation and potential drainage concerns.",
          },
          {
            type: "critical",
            title: "Potential Insurance Claim",
            description:
              "Storm damage detected that may qualify for insurance coverage. Professional inspection recommended.",
          },
        ],
        recommendations: [
          "Schedule professional inspection within 30 days",
          "Document all visible damage with photographs",
          "Contact insurance company to discuss potential claim",
          "Clear gutters and check drainage systems",
          "Monitor for any new leaks or interior damage",
        ],
        nextSteps: [
          "We'll contact you within 24 hours to discuss findings",
          "Professional inspection can be scheduled at your convenience",
          "We'll help coordinate with your insurance company if needed",
          "Vetted contractor recommendations available upon request",
        ],
      }
      setReport(mockReport)
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [reportId])

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Excellent":
        return "text-green-400 border-green-500/30 bg-green-500/10"
      case "Good":
        return "text-blue-400 border-blue-500/30 bg-blue-500/10"
      case "Fair":
        return "text-yellow-400 border-yellow-500/30 bg-yellow-500/10"
      case "Poor":
        return "text-orange-400 border-orange-500/30 bg-orange-500/10"
      case "Critical":
        return "text-red-400 border-red-500/30 bg-red-500/10"
      default:
        return "text-gray-400 border-gray-500/30 bg-gray-500/10"
    }
  }

  const getFindingIcon = (type: string) => {
    switch (type) {
      case "positive":
        return <CheckCircle className="text-green-400" size={20} />
      case "warning":
        return <AlertTriangle className="text-yellow-400" size={20} />
      case "critical":
        return <AlertTriangle className="text-red-400" size={20} />
      default:
        return <Info className="text-blue-400" size={20} />
    }
  }

  const getFindingColor = (type: string) => {
    switch (type) {
      case "positive":
        return "border-green-500/30 bg-green-500/10"
      case "warning":
        return "border-yellow-500/30 bg-yellow-500/10"
      case "critical":
        return "border-red-500/30 bg-red-500/10"
      default:
        return "border-blue-500/30 bg-blue-500/10"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#050714] to-[#0a1128] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-bold mb-2">Generating Your Roof Report</h2>
          <p className="text-gray-400">AI analysis in progress...</p>
        </div>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#050714] to-[#0a1128] text-white flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="mx-auto text-red-400 mb-4" size={48} />
          <h2 className="text-xl font-bold mb-2">Report Not Found</h2>
          <p className="text-gray-400 mb-4">We couldn't find the requested report.</p>
          <Link href="/get-started">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">Get New Report</Button>
          </Link>
        </div>
      </div>
    )
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
          <div className="flex gap-2">
            <Button variant="outline" className="border-gray-600 text-white bg-transparent">
              <Download size={16} className="mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" className="border-gray-600 text-white bg-transparent">
              <Share2 size={16} className="mr-2" />
              Share
            </Button>
          </div>
        </header>

        <div className="max-w-4xl mx-auto">
          {/* Report Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mb-4">Report Complete</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Your AI Roof Analysis</h1>
            <p className="text-gray-300">
              Report ID: <span className="font-mono text-yellow-500">{report.reportId}</span>
            </p>
          </motion.div>

          {/* Summary Card */}
          <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle>Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Property Address</p>
                    <p className="font-medium">{report.propertyAddress}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Analysis Date</p>
                    <p className="font-medium">{report.analysisDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Overall Condition</p>
                    <Badge className={getConditionColor(report.overallCondition)}>{report.overallCondition}</Badge>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Risk Score</p>
                    <div className="flex items-center gap-3">
                      <Progress value={report.riskScore} className="flex-1" />
                      <span className="font-bold">{report.riskScore}/100</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Storm History</p>
                    <p className="font-medium">
                      {report.stormHistory.recentStorms} storms since {report.stormHistory.lastStormDate}
                    </p>
                    <p className="text-sm text-gray-400">Last: {report.stormHistory.severity}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Findings */}
          <div className="grid gap-6 mb-8">
            <h2 className="text-2xl font-bold">Detailed Findings</h2>
            {report.findings.map((finding, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`border backdrop-blur-sm ${getFindingColor(finding.type)}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      {getFindingIcon(finding.type)}
                      <div className="flex-1">
                        <h3 className="font-bold mb-2">{finding.title}</h3>
                        <p className="text-gray-300">{finding.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="text-green-400" size={20} />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {report.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={16} />
                      <span className="text-sm text-gray-300">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="text-blue-400" size={20} />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {report.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <span className="text-sm text-gray-300">{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Need Professional Help?</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Based on your report findings, we recommend speaking with our team about next steps. We can help
                coordinate inspections, insurance claims, and connect you with vetted contractors.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-8">
                  <Phone size={16} className="mr-2" />
                  Call: (850) 879-9172
                </Button>
                <Button
                  variant="outline"
                  className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 bg-transparent"
                >
                  <Mail size={16} className="mr-2" />
                  Email: landongill@gmail.com
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-gray-400">
            <p>This report was generated using AI analysis of satellite imagery and storm data.</p>
            <p>For the most accurate assessment, we recommend a professional inspection.</p>
            <p className="mt-4">
              <strong>Powered by RoofFax™ | All rights reserved © 2025</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
