"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Phone,
  FileText,
  Clock,
  Star,
  Eye,
  UserCheck,
  Home,
  Search,
  ArrowRight,
  Play,
  Award,
  Newspaper,
  TrendingUp,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function RoofFaxHomePage() {
  const [contractorName, setContractorName] = useState("")
  const [address, setAddress] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [showVerificationResult, setShowVerificationResult] = useState(false)
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number; opacity: number }>>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const newStars = Array.from({ length: 100 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.8 + 0.2,
    }))
    setStars(newStars)
  }, [])

  const handleVerifyContractor = (e: React.FormEvent) => {
    e.preventDefault()
    if (!contractorName) return
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      setShowVerificationResult(true)
    }, 2000)
  }

  const handleGetReport = (e: React.FormEvent) => {
    e.preventDefault()
    if (!address) return
    localStorage.setItem("roofFaxAddress", address)
    window.location.href = "/get-started"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050714] to-[#0a1128] text-white relative overflow-hidden">
      {/* Stars background */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
          }}
        />
      ))}

      {/* Earth in background */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] rounded-full bg-gradient-radial from-blue-500/20 to-transparent opacity-30 z-0"></div>

      <div className="container mx-auto px-4 py-4 md:py-8 relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 md:mb-12">
          <div className="flex items-center">
            <div className="bg-yellow-500 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center mr-2">
              <span className="text-black font-bold text-lg md:text-xl">R</span>
            </div>
            <span className="text-lg md:text-xl font-bold">
              Roof<span className="text-yellow-500">Fax</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            <Link href="/demo">
              <Button variant="link" className="text-white hover:text-yellow-500">
                <Play size={16} className="mr-1" />
                See Demo
              </Button>
            </Link>
            <Link href="/verify">
              <Button variant="link" className="text-white hover:text-yellow-500">
                Who's At My Door?
              </Button>
            </Link>
            <Link href="/hot-lead">
              <Button variant="link" className="text-white hover:text-yellow-500">
                🔥 Quick Assessment
              </Button>
            </Link>
            <Link href="/get-started">
              <Button variant="link" className="text-white hover:text-yellow-500">
                Free Roof Report
              </Button>
            </Link>
            <Button variant="link" className="text-white hover:text-yellow-500">
              (850) 879-9172
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-black/90 backdrop-blur-sm rounded-lg p-4 mb-8"
            >
              <nav className="flex flex-col space-y-4">
                <Link href="/demo" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="link" className="text-white hover:text-yellow-500 justify-start p-0">
                    <Play size={16} className="mr-2" />
                    See Demo
                  </Button>
                </Link>
                <Link href="/verify" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="link" className="text-white hover:text-yellow-500 justify-start p-0">
                    Who's At My Door?
                  </Button>
                </Link>
                <Link href="/hot-lead" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="link" className="text-white hover:text-yellow-500 justify-start p-0">
                    🔥 Quick Assessment
                  </Button>
                </Link>
                <Link href="/get-started" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="link" className="text-white hover:text-yellow-500 justify-start p-0">
                    Free Roof Report
                  </Button>
                </Link>
                <a href="tel:8508799172">
                  <Button variant="link" className="text-white hover:text-yellow-500 justify-start p-0">
                    <Phone size={16} className="mr-2" />
                    (850) 879-9172
                  </Button>
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto mb-12 md:mb-16"
        >
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30 mb-4 md:mb-6 text-xs md:text-sm px-3 md:px-4 py-1 md:py-2">
            🚨 Storm Season Alert: Door-Knockers Are Coming
          </Badge>

          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight px-2">
            Discover Your Roof's History
            <br />
            and <span className="text-yellow-500">Future</span> with RoofFax
          </h1>

          <p className="text-base md:text-lg text-yellow-500 font-semibold mb-4 md:mb-6">
            Built for pros, trusted by homeowners
          </p>

          <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed px-4">
            <span className="text-yellow-500 font-semibold">RoofFax delivers the FAX</span>, and unlike many pros, we
            never come empty-handed. Whether you need contractor verification, satellite roof reports, or complete storm
            season protection—we've got you covered.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-6 md:mb-8 px-4">
            <Link href="/hot-lead">
              <Button className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full sm:w-auto">
                🔥 Quick Assessment - 2 Minutes
              </Button>
            </Link>
            <Link href="/get-started">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full sm:w-auto">
                <Shield size={18} md:size={20} className="mr-2" />
                Get My Free Roof Report
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                variant="outline"
                className="border-blue-500 text-blue-500 hover:bg-blue-500/10 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg bg-transparent w-full sm:w-auto"
              >
                <Play size={18} md:size={20} className="mr-2" />
                See AI Demo
              </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 text-xs md:text-sm text-gray-400 px-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-400" size={14} md:size={16} />
              <span>No Upfront Costs</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-400" size={14} md:size={16} />
              <span>AI-Powered Protection</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-400" size={14} md:size={16} />
              <span>Licensed Contractors Only</span>
            </div>
          </div>
        </motion.div>

        {/* Trust Signals */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-12 md:mb-16 text-xs md:text-sm text-gray-400 px-4">
          <div className="flex items-center gap-2">
            <Award className="text-yellow-500" size={16} md:size={20} />
            <span>2024 Innovation Award Winner</span>
          </div>
          <div className="flex items-center gap-2">
            <Newspaper className="text-yellow-500" size={16} md:size={20} />
            <span>Featured in Roofing Today</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="text-yellow-500" size={16} md:size={20} />
            <span>15,000+ Homeowners Protected</span>
          </div>
        </div>

        {/* Demo Teaser */}
        <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm mb-12 md:mb-16 max-w-3xl mx-auto">
          <CardContent className="p-4 md:p-6 text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-4">
              <div className="bg-blue-500/20 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                <Play className="text-blue-400" size={20} md:size={24} />
              </div>
              <h3 className="text-lg md:text-xl font-bold">See Our AI Verification in Action</h3>
            </div>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              Watch how our AI instantly analyzes any contractor and reveals red flags in under 30 seconds.
            </p>
            <Link href="/demo">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white font-medium w-full md:w-auto">
                Try Interactive Demo
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Key Features Highlight */}
        <div className="mb-12 md:mb-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">What You'll Receive</h2>
            <p className="text-gray-300">Comprehensive protection and insights for your property</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="bg-blue-500/20 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4">
                  <Eye className="text-blue-400" size={24} md:size={32} />
                </div>
                <h3 className="text-base md:text-lg font-bold mb-2">Storm Tracking</h3>
                <p className="text-gray-400 text-xs md:text-sm">
                  Historical storm data affecting your roof with damage assessment
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="bg-green-500/20 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-green-400" size={24} md:size={32} />
                </div>
                <h3 className="text-base md:text-lg font-bold mb-2">Roof Age Estimates</h3>
                <p className="text-gray-400 text-xs md:text-sm">
                  AI-powered analysis to determine your roof's age and condition
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="bg-yellow-500/20 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="text-yellow-400" size={24} md:size={32} />
                </div>
                <h3 className="text-base md:text-lg font-bold mb-2">Contractor Suggestions</h3>
                <p className="text-gray-400 text-xs md:text-sm">
                  Vetted professionals near you with verified track records
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="bg-purple-500/20 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-purple-400" size={24} md:size={32} />
                </div>
                <h3 className="text-base md:text-lg font-bold mb-2">AI-Generated Insights</h3>
                <p className="text-gray-400 text-xs md:text-sm">
                  Personalized recommendations and maintenance schedules
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Dual Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16 max-w-6xl mx-auto">
          {/* Who's At Your Door */}
          <Card className="bg-black/40 border border-red-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400 text-lg md:text-xl">
                <AlertTriangle size={20} md:size={24} />
                Someone Knocking?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <p className="text-gray-300 mb-4 md:mb-6 text-sm md:text-base">
                Don't let door-to-door pros pressure you. Get an instant AI-powered background check in 30 seconds.
              </p>

              <form onSubmit={handleVerifyContractor} className="space-y-4">
                <div className="relative">
                  <UserCheck
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                    md:size={18}
                  />
                  <Input
                    type="text"
                    placeholder="Enter contractor/company name..."
                    className="pl-8 md:pl-10 bg-gray-900 border-gray-700 text-white text-sm md:text-base"
                    value={contractorName}
                    onChange={(e) => setContractorName(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-medium text-sm md:text-base"
                  disabled={isVerifying}
                >
                  {isVerifying ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="mr-2"
                      >
                        <Clock size={14} md:size={16} />
                      </motion.div>
                      Verifying...
                    </>
                  ) : (
                    "Verify This Contractor"
                  )}
                </Button>
              </form>

              <div className="mt-4 text-center">
                <Link href="/demo">
                  <Button variant="link" className="text-blue-400 p-0 h-auto text-xs md:text-sm">
                    <Play size={12} md:size={14} className="mr-1" />
                    Try the full demo instead
                  </Button>
                </Link>
              </div>

              <AnimatePresence>
                {showVerificationResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 p-4 bg-red-900/30 border border-red-800 rounded-md"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="text-red-400" size={14} md:size={16} />
                      <span className="font-semibold text-red-400 text-sm md:text-base">⚠️ VERIFICATION NEEDED</span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-300 mb-3">
                      We found some concerns about "{contractorName}". Get the full verification report and our vetted
                      contractor recommendations.
                    </p>
                    <Link href="/get-started">
                      <Button className="bg-yellow-500 hover:bg-yellow-600 text-black text-xs md:text-sm w-full">
                        Get Full Verification Report
                      </Button>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Free Roof Report */}
          <Card className="bg-black/40 border border-blue-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400 text-lg md:text-xl">
                <Eye size={20} md:size={24} />
                Get Your RoofFax Report
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <p className="text-gray-300 mb-4 md:mb-6 text-sm md:text-base">
                Like CarFax for your roof. Satellite-driven data shows exactly what's wrong and what it'll cost.
              </p>

              <form onSubmit={handleGetReport} className="space-y-4">
                <div className="relative">
                  <Home
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                    md:size={18}
                  />
                  <Input
                    type="text"
                    placeholder="Enter your property address..."
                    className="pl-8 md:pl-10 bg-gray-900 border-gray-700 text-white text-sm md:text-base"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm md:text-base"
                >
                  Get My Free RoofFax Report
                </Button>
              </form>

              <div className="grid grid-cols-2 gap-3 mt-4 md:mt-6">
                <div className="text-center p-2">
                  <Shield className="mx-auto text-yellow-500 mb-1" size={16} md:size={20} />
                  <p className="text-xs text-gray-400">Storm damage detection</p>
                </div>
                <div className="text-center p-2">
                  <FileText className="mx-auto text-yellow-500 mb-1" size={16} md:size={20} />
                  <p className="text-xs text-gray-400">Insurance claim prep</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* The Problem Section */}
        <Card className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 backdrop-blur-sm mb-12 md:mb-16">
          <CardContent className="p-6 md:p-8">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Let's Be Honest About Door-to-Door Pros</h2>
              <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
                If they have to knock on every door, they're probably not that good. The best pros are busy with
                referrals and repeat customers.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-red-400 mt-1 flex-shrink-0" size={14} md:size={16} />
                  <p className="text-gray-300 text-sm md:text-base">High-pressure tactics and "today only" pricing</p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-red-400 mt-1 flex-shrink-0" size={14} md:size={16} />
                  <p className="text-gray-300 text-sm md:text-base">Often unlicensed or from out of state</p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-red-400 mt-1 flex-shrink-0" size={14} md:size={16} />
                  <p className="text-gray-300 text-sm md:text-base">
                    Overcharge by thousands compared to fair market rates
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-red-400 mt-1 flex-shrink-0" size={14} md:size={16} />
                  <p className="text-gray-300 text-sm md:text-base">Disappear after taking your money</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-yellow-500/20 rounded-lg p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold mb-2">You Deserve Better</h3>
                  <p className="text-gray-300 mb-4 text-sm md:text-base">
                    RoofFax connects you with vetted, licensed professionals who earn your business through quality
                    work, not door knocking.
                  </p>
                  <Link href="/get-started">
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium w-full md:w-auto">
                      Get Protected Today
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How RoofFax Works */}
        <div className="mb-12 md:mb-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">The RoofFax Way</h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
              We've been on every side of the roofing business. Now we're finally on{" "}
              <span className="text-yellow-500 font-semibold">your side</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="bg-red-500/20 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4">
                  <Search className="text-red-400" size={24} md:size={32} />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3">AI Verification</h3>
                <p className="text-gray-400 mb-4 text-sm md:text-base">
                  Check any roofing company at your door in 30 seconds. Instant background report shows you the good,
                  the bad, and helps you decide safely.
                </p>
                <Link href="/demo">
                  <Button
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent w-full md:w-auto"
                  >
                    Try Demo
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="bg-blue-500/20 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4">
                  <Eye className="text-blue-400" size={24} md:size={32} />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3">Free RoofFax Report</h3>
                <p className="text-gray-400 mb-4 text-sm md:text-base">
                  Satellite-driven roof inspection: condition, age, and damage overview. Like CarFax for your
                  roof—clear, easy, actionable.
                </p>
                <Link href="/get-started">
                  <Button
                    variant="outline"
                    className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 bg-transparent w-full md:w-auto"
                  >
                    Get Report
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="bg-green-500/20 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-green-400" size={24} md:size={32} />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3">We Handle Everything</h3>
                <p className="text-gray-400 mb-4 text-sm md:text-base">
                  We connect you with licensed, vetted pros and manage insurance, scheduling, and work quality. You just
                  approve your deductible if the claim is approved.
                </p>
                <Button
                  variant="outline"
                  className="border-green-500/30 text-green-400 hover:bg-green-500/10 bg-transparent w-full md:w-auto"
                >
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 mr-2 text-xs">
                    Coming Soon
                  </Badge>
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 3 Simple Steps */}
        <div className="mb-12 md:mb-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Get RoofFax Protection in 3 Easy Steps</h2>
            <p className="text-gray-300 text-sm md:text-base">Hassle-free, transparent, and built for homeowners</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-yellow-500 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4 text-black font-bold text-lg md:text-xl">
                1
              </div>
              <h3 className="font-bold mb-2 text-base md:text-lg">Sign Up</h3>
              <p className="text-gray-400 text-sm md:text-base">
                Provide basic info and roof location. Takes 2 minutes.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4 text-black font-bold text-lg md:text-xl">
                2
              </div>
              <h3 className="font-bold mb-2 text-base md:text-lg">Verify & Inspect</h3>
              <p className="text-gray-400 text-sm md:text-base">
                Use AI tools and get a satellite roof report instantly.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4 text-black font-bold text-lg md:text-xl">
                3
              </div>
              <h3 className="font-bold mb-2 text-base md:text-lg">Let Us Handle It</h3>
              <p className="text-gray-400 text-sm md:text-base">
                We coordinate insurance, contractors, and ensure a stress-free process.
              </p>
            </div>
          </div>

          <div className="text-center mt-6 md:mt-8">
            <Link href="/get-started">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 md:px-8 py-3 text-base md:text-lg w-full sm:w-auto">
                Start Your Free RoofFax Report
                <ArrowRight size={18} md:size={20} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mb-12 md:mb-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Homeowners Love RoofFax</h2>
            <p className="text-gray-300 text-sm md:text-base">Real stories from real people we've protected</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-500 fill-current" size={14} md:size={16} />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 text-sm md:text-base">
                  "Finally, someone on my side. No more pushy pros! RoofFax handled everything and I only paid my
                  deductible."
                </p>
                <p className="text-xs md:text-sm text-gray-400">- Jane D., Tampa FL</p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-500 fill-current" size={14} md:size={16} />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 text-sm md:text-base">
                  "The roof report gave me confidence to approve my insurance claim without stress. The process was
                  completely hassle-free."
                </p>
                <p className="text-xs md:text-sm text-gray-400">- Mark T., Orlando FL</p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-500 fill-current" size={14} md:size={16} />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 text-sm md:text-base">
                  "RoofFax saved me from a scammer who quoted $35K. Their contractor did the same job for $18K through
                  insurance."
                </p>
                <p className="text-xs md:text-sm text-gray-400">- Sarah M., Jacksonville FL</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Final CTA */}
        <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 backdrop-blur-sm">
          <CardContent className="p-6 md:p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Don't Get Taken Advantage Of This Storm Season</h2>
            <p className="text-gray-300 mb-6 md:mb-8 max-w-3xl mx-auto text-sm md:text-base">
              Let RoofFax be your advocate. We'll verify any contractor, get you a free roof report, and handle your
              entire insurance claim process with zero upfront costs. You deserve someone finally on your side.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4 md:mb-6">
              <a href="tel:8508799172">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full sm:w-auto">
                  <Phone size={18} md:size={20} className="mr-2" />
                  Call Now: (850) 879-9172
                </Button>
              </a>
              <Link href="/get-started">
                <Button
                  variant="outline"
                  className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg bg-transparent w-full sm:w-auto"
                >
                  Get My Free RoofFax Report
                </Button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-400" size={14} md:size={16} />
                <span>Available 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-400" size={14} md:size={16} />
                <span>No Upfront Costs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-400" size={14} md:size={16} />
                <span>Licensed & Insured</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-yellow-500 rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center mr-2">
                  <span className="text-black font-bold text-xs md:text-sm">R</span>
                </div>
                <span className="text-base md:text-lg font-bold">
                  Roof<span className="text-yellow-500">Fax</span>
                </span>
              </div>
              <p className="text-xs md:text-sm text-gray-400 mb-4">
                Your personal property roof report. Built for pros. Trusted by homeowners.
              </p>
              <p className="text-xs md:text-sm text-gray-400">
                Email: Landon@rooffax.com
                <br />
                Phone: (850) 879-9172
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm md:text-base">Services</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/demo">
                    <Button variant="link" className="text-gray-400 p-0 h-auto text-xs md:text-sm justify-start">
                      AI Verification Demo
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href="/verify">
                    <Button variant="link" className="text-gray-400 p-0 h-auto text-xs md:text-sm justify-start">
                      Who's At My Door?
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href="/get-started">
                    <Button variant="link" className="text-gray-400 p-0 h-auto text-xs md:text-sm justify-start">
                      Free Roof Report
                    </Button>
                  </Link>
                </li>
                <li>
                  <Button variant="link" className="text-gray-400 p-0 h-auto text-xs md:text-sm justify-start">
                    Insurance Claims
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 ml-2 text-xs">
                      Coming Soon
                    </Badge>
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="text-gray-400 p-0 h-auto text-xs md:text-sm justify-start">
                    Contractor Network
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 ml-2 text-xs">
                      Coming Soon
                    </Badge>
                  </Button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm md:text-base">Protection</h4>
              <ul className="space-y-2">
                <li>
                  <Button variant="link" className="text-gray-400 p-0 h-auto text-xs md:text-sm justify-start">
                    Storm Season Guide
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 ml-2 text-xs">
                      Coming Soon
                    </Badge>
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="text-gray-400 p-0 h-auto text-xs md:text-sm justify-start">
                    Scam Prevention
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 ml-2 text-xs">
                      Coming Soon
                    </Badge>
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="text-gray-400 p-0 h-auto text-xs md:text-sm justify-start">
                    How It Works
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="text-gray-400 p-0 h-auto text-xs md:text-sm justify-start">
                    Contact Us
                  </Button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm md:text-base">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Button variant="link" className="text-gray-400 p-0 h-auto text-xs md:text-sm justify-start">
                    Terms of Service
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="text-gray-400 p-0 h-auto text-xs md:text-sm justify-start">
                    Privacy Policy
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="text-gray-400 p-0 h-auto text-xs md:text-sm justify-start">
                    Work Agreement
                  </Button>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-800 text-center text-xs md:text-sm text-gray-500">
            <p>Powered by RoofFax™ | All rights reserved © 2025</p>
            <p className="mt-2">
              RoofFax is a consulting service. We connect homeowners with licensed pros and assist with insurance
              claims. Homeowners are responsible for deductibles on approved claims. Our goal is to simplify and protect
              the process—no extra costs or hidden fees.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
