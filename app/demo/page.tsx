"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Camera,
  FileText,
} from "lucide-react"
import Link from "next/link"

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const demoSteps = [
    "Satellite Image Analysis",
    "Storm History Cross-Reference",
    "Damage Pattern Recognition",
    "Insurance Claim Correlation",
    "Contractor Database Check",
    "Final Report Generation",
  ]

  const startDemo = () => {
    setIsAnalyzing(true)
    setCurrentStep(0)

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= demoSteps.length - 1) {
          clearInterval(interval)
          setIsAnalyzing(false)
          return prev
        }
        return prev + 1
      })
    }, 1500)
  }

  const resetDemo = () => {
    setCurrentStep(0)
    setIsAnalyzing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold text-white">
                <span className="text-yellow-400">Roof</span>Fax
              </span>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="text-white hover:text-yellow-400">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Demo Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">See RoofFax in Action</h1>
            <p className="text-xl text-slate-300 mb-8">
              Watch how our AI analyzes satellite imagery to detect roof damage in real-time
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={startDemo}
                disabled={isAnalyzing}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3"
              >
                {isAnalyzing ? "Analyzing..." : "Start Demo Analysis"}
              </Button>
              <Button
                onClick={resetDemo}
                variant="outline"
                className="border-slate-600 text-white hover:bg-slate-800 bg-transparent"
              >
                Reset Demo
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Analysis Progress */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Camera className="w-5 h-5 mr-2 text-yellow-400" />
                  Analysis Progress
                </CardTitle>
                <CardDescription className="text-slate-400">Real-time satellite imagery processing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {demoSteps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          index < currentStep
                            ? "bg-green-500"
                            : index === currentStep && isAnalyzing
                              ? "bg-yellow-400"
                              : "bg-slate-600"
                        }`}
                      >
                        {index < currentStep ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : index === currentStep && isAnalyzing ? (
                          <div className="w-3 h-3 bg-black rounded-full animate-pulse" />
                        ) : (
                          <span className="text-xs text-white">{index + 1}</span>
                        )}
                      </div>
                      <span className={`${index <= currentStep ? "text-white" : "text-slate-500"}`}>{step}</span>
                    </div>
                  ))}
                </div>

                {isAnalyzing && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Processing...</span>
                      <span className="text-white">{Math.round((currentStep / demoSteps.length) * 100)}%</span>
                    </div>
                    <Progress value={(currentStep / demoSteps.length) * 100} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sample Results */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-yellow-400" />
                  Sample Report Results
                </CardTitle>
                <CardDescription className="text-slate-400">Example findings from our AI analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Property Info */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Property Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-slate-300">
                      <MapPin className="w-4 h-4 mr-2 text-yellow-400" />
                      123 Main Street, Pensacola, FL 32501
                    </div>
                    <div className="flex items-center text-slate-300">
                      <Calendar className="w-4 h-4 mr-2 text-yellow-400" />
                      Last Storm: Hurricane Sally (Sept 2020)
                    </div>
                  </div>
                </div>

                {/* Damage Assessment */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Damage Assessment</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Missing Shingles</span>
                      <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/30">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        High Risk
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Gutter Damage</span>
                      <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Medium Risk
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Structural Integrity</span>
                      <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Good
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Recommendations</h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Contact insurance company for claim assessment</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Schedule professional inspection within 30 days</span>
                    </div>
                    <div className="flex items-start">
                      <XCircle className="w-4 h-4 mr-2 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>Avoid door-to-door contractors without verification</span>
                    </div>
                  </div>
                </div>

                {!isAnalyzing && currentStep >= demoSteps.length - 1 && (
                  <div className="pt-4 border-t border-slate-700">
                    <Link href="/get-started">
                      <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                        Get Your Real Report Now
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="mt-12 text-center">
            <Card className="bg-slate-800/30 border-slate-700 max-w-2xl mx-auto">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold text-white mb-4">Ready to protect your home?</h3>
                <p className="text-slate-300 mb-6">Get your real roof analysis report in minutes, not days.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <div className="flex items-center text-slate-300">
                    <Phone className="w-4 h-4 mr-2 text-yellow-400" />
                    <span>(850) 879-9172</span>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <Mail className="w-4 h-4 mr-2 text-yellow-400" />
                    <span>Landon@rooffax.com</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-slate-400">
            <p className="mb-2">Powered by RoofFax™ | All rights reserved © 2025</p>
            <div className="flex justify-center space-x-6 text-sm">
              <Link href="/terms" className="hover:text-yellow-400">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-yellow-400">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
