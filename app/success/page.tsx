"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowLeft, Phone, Mail, FileText, Shield } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
  const [reportId] = useState(`RF-${Date.now().toString().slice(-6)}`)

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
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Success! 🎉</h1>
            <p className="text-xl text-slate-300 mb-2">Your roof report request has been submitted</p>
            <p className="text-slate-400">
              Report ID: <span className="font-mono text-yellow-400">{reportId}</span>
            </p>
          </div>

          {/* What Happens Next */}
          <Card className="bg-slate-800/50 border-slate-700 mb-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold text-white mb-6 text-center">What happens next?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-black font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">AI Analysis (Next 2 hours)</h3>
                    <p className="text-slate-300 text-sm">
                      Our AI analyzes satellite imagery of your property to detect potential roof damage
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-black font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Storm History Review (Next 6 hours)</h3>
                    <p className="text-slate-300 text-sm">
                      We cross-reference your property with historical storm data and damage patterns
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-black font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Expert Review (Next 12 hours)</h3>
                    <p className="text-slate-300 text-sm">
                      Our roofing experts review the AI findings and provide professional insights
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Report Delivery (Within 24 hours)</h3>
                    <p className="text-slate-300 text-sm">
                      Your comprehensive roof report will be delivered to your email inbox
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* While You Wait */}
          <Card className="bg-slate-800/50 border-slate-700 mb-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold text-white mb-6 text-center">🛡️ You're Already Protected</h2>
              <p className="text-slate-300 text-center mb-6">
                While we prepare your report, you can use our tools to protect yourself from roofing scams
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/verify">
                  <Card className="bg-slate-700/50 border-slate-600 hover:border-yellow-400 transition-colors cursor-pointer">
                    <CardContent className="pt-4 text-center">
                      <Shield className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <h3 className="font-semibold text-white mb-2">Verify Contractors</h3>
                      <p className="text-slate-300 text-sm">
                        Check any contractor's credentials before they start work
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/demo">
                  <Card className="bg-slate-700/50 border-slate-600 hover:border-yellow-400 transition-colors cursor-pointer">
                    <CardContent className="pt-4 text-center">
                      <FileText className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <h3 className="font-semibold text-white mb-2">See Demo Report</h3>
                      <p className="text-slate-300 text-sm">Preview what your roof analysis report will look like</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-slate-800/30 border-slate-700">
            <CardContent className="pt-6 text-center">
              <h3 className="text-xl font-semibold text-white mb-4">Questions? We're Here to Help</h3>
              <p className="text-slate-300 mb-6">
                Our roofing experts are available to answer any questions about your report or roofing needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <div className="flex items-center text-slate-300">
                  <Phone className="w-4 h-4 mr-2 text-yellow-400" />
                  <a href="tel:8508799172" className="hover:text-yellow-400 font-semibold">
                    (850) 879-9172
                  </a>
                </div>
                <div className="flex items-center text-slate-300">
                  <Mail className="w-4 h-4 mr-2 text-yellow-400" />
                  <a href="mailto:Landon@rooffax.com" className="hover:text-yellow-400 font-semibold">
                    Landon@rooffax.com
                  </a>
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                Available 24/7 for emergencies • Normal business hours: Mon-Fri 8AM-6PM EST
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="mt-8 text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8">
                  Return to Home
                </Button>
              </Link>
              <Link href="/hot-lead">
                <Button
                  variant="outline"
                  className="border-slate-600 text-white hover:bg-slate-800 px-8 bg-transparent"
                >
                  Need Emergency Help?
                </Button>
              </Link>
            </div>
            <p className="text-slate-400 text-sm">
              Check your email for confirmation and updates on your report progress
            </p>
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
