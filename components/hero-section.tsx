"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, CheckCircle } from "lucide-react"
import { useToast } from "@/components/ui/toast"
import { UserTypeSelection } from "@/components/user-type-selection"
import { useUser } from "@/contexts/user-context"

export function HeroSection() {
  const [address, setAddress] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showToast } = useToast()
  const { isAuthenticated } = useUser()

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!address.trim()) {
      showToast("Please enter a property address", "error")
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      showToast("Report request submitted!", "success")
      setAddress("")
    } catch (error) {
      showToast("Failed to generate report. Please try again.", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Animated stars background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
            }}
          />
        ))}
      </div>

      {/* Background grid effect */}
      <div className="absolute inset-0 grid-bg opacity-20"></div>

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-yellow-500/10 blur-[100px] animate-float"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-yellow-600/10 blur-[100px] animate-float"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <div className="inline-block bg-yellow-500/10 border border-yellow-500/30 rounded-full px-3 py-1 text-sm text-yellow-500 mb-4">
            The World's Smartest Roof & Property Report
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Trusted by Homeowners.
            </span>{" "}
            <br />
            Built for Pros.
          </h1>
          <p className="text-xl text-gray-400 max-w-[800px] mx-auto">
            Tired of juggling a dozen apps? RoofFax brings roof measurement, storm tracking, skip tracing, code lookups,
            proposals, and instant outreach together—guided by Roofus, built for closers.
          </p>
        </div>

        {isAuthenticated ? (
          <form onSubmit={handleAddressSubmit} className="max-w-xl mx-auto mb-12">
            <div className="flex">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Enter property address..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="pl-10 h-12 bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="ml-2 h-12 bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
              >
                {isSubmitting ? "Searching..." : "Get Report"}
              </Button>
            </div>
          </form>
        ) : null}

        <UserTypeSelection />

        {!isAuthenticated && (
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400 mt-8">
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-yellow-500" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-yellow-500" />
              <span>Instant Reports</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-yellow-500" />
              <span>Cancel Anytime</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
