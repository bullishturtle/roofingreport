"use client"
import { useEffect, useState } from "react"
import { ArrowLeft, CheckCircle, Clock, Mail, Phone, FileText, Calendar, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import Link from "next/link"

export default function SuccessPage() {
  const [reportId, setReportId] = useState("")
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    // Get data from URL params or localStorage
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get("reportId") || `RFX-${Date.now()}`
    const email = urlParams.get("email") || "your email"

    setReportId(id)
    setUserEmail(email)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050714] to-[#0a1128] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <Button variant="ghost" size="sm" className="text-white">
                <ArrowLeft size={16} className="mr-2" />
                Back to Home
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

        <div className="max-w-3xl mx-auto">
          {/* Success Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="bg-green-500/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-400" size={48} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to RoofFax Protection!</h1>
            <p className="text-gray-300 text-lg">
              Your free roof report is being generated. We'll have it ready within 24 hours.
            </p>
          </motion.div>

          {/* Report Details */}
          <Card className="bg-black/40 border border-green-500/30 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <FileText size={24} />
                Your Report Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">Report ID</label>
                    <p className="font-mono text-lg text-yellow-400">{reportId}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Status</label>
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 ml-2">
                      <Clock size={14} className="mr-1" />
                      Processing
                    </Badge>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">Estimated Completion</label>
                    <p className="text-lg">Within 24 hours</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Delivery Method</label>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-blue-400" />
                      <span>Email + SMS</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What Happens Next */}
          <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar size={24} className="text-blue-400" />
                What Happens Next
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Satellite Analysis (Next 2 hours)</h3>
                    <p className="text-gray-400 text-sm">
                      Our AI analyzes high-resolution satellite imagery of your property to assess roof condition, age,
                      and potential storm damage.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Storm History Review (Next 6 hours)</h3>
                    <p className="text-gray-400 text-sm">
                      We cross-reference your property with historical weather data to identify potential storm damage
                      and insurance claim opportunities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Expert Review (Next 12 hours)</h3>
                    <p className="text-gray-400 text-sm">
                      Our roofing experts review the AI analysis and add professional insights and recommendations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Report Delivery (Within 24 hours)</h3>
                    <p className="text-gray-400 text-sm">
                      You'll receive your comprehensive RoofFax report via email and SMS with next steps if action is
                      needed.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Immediate Protection */}
          <Card className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 backdrop-blur-sm mb-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 text-center">🛡️ You're Already Protected</h3>
              <p className="text-gray-300 text-center mb-6">
                While we prepare your report, you can use our contractor verification tool if anyone comes to your door.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/verify">
                  <Button className="bg-red-500 hover:bg-red-600 text-white font-medium">
                    Verify a Contractor Now
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-blue-500/10 bg-transparent"
                  >
                    Try Our AI Demo
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-bold mb-4">Questions? We're Here to Help</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-2">
                  <Phone className="text-yellow-500" size={20} />
                  <span>(850) 879-9172</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="text-yellow-500" size={20} />
                  <span>Landon@rooffax.com</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-4">Available 24/7 for urgent contractor verification needs</p>
            </CardContent>
          </Card>

          {/* Social Proof */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-bold mb-6">Join Thousands of Protected Homeowners</h3>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-yellow-500 fill-current" size={20} />
              ))}
              <span className="ml-2 text-gray-300">4.9/5 from 2,847 homeowners</span>
            </div>
            <p className="text-gray-400 text-sm">
              "RoofFax saved me $18,000 and protected me from a storm chaser scam." - Sarah M., Jacksonville FL
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
