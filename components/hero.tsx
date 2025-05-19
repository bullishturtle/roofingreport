"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Check } from "lucide-react"
import Link from "next/link"

export function Hero() {
  const [address, setAddress] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Address submitted:", address)
    // In a real implementation, this would redirect to the report page or show a modal
    alert(`Getting report for: ${address}`)
  }

  return (
    <section className="relative py-12 md:py-24 lg:py-32 overflow-hidden">
      {/* Background with subtle particle effect */}
      <div className="absolute inset-0 bg-[#0a0d17]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25px 25px, rgba(255, 215, 0, 0.15) 2px, transparent 0), radial-gradient(circle at 75px 75px, rgba(255, 215, 0, 0.1) 2px, transparent 0)",
            backgroundSize: "100px 100px",
          }}
        ></div>
      </div>

      <div className="container relative px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <div className="inline-block rounded-full bg-yellow-500/10 px-3 py-1 text-sm text-yellow-500 mb-4 border border-yellow-500/20">
            The World&apos;s Smartest Roof & Property Report
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-4">
            Trusted by Homeowners.
            <br />
            <span className="text-white">Built for Pros.</span>
          </h1>

          <p className="max-w-[700px] text-gray-400 md:text-xl">
            Tired of juggling a dozen apps? RoofFax brings roof measurement, storm tracking, skip tracing, code lookups,
            proposals, and instant outreach together—guided by Roofus, built for closers.
          </p>
        </div>

        <div className="mx-auto max-w-md space-y-4 mb-8">
          <form onSubmit={handleSubmit} className="flex w-full max-w-md items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                type="text"
                placeholder="Enter property address..."
                className="pl-10 bg-gray-900/50 border-gray-800 focus-visible:ring-yellow-500"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black hover:from-yellow-600 hover:to-amber-600"
            >
              Get Report
            </Button>
          </form>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              variant="outline"
              className="border-yellow-500/20 hover:bg-yellow-500/10 hover:text-yellow-500"
            >
              <Link href="/free-trial">Start Free Trial</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-yellow-500/20 hover:bg-yellow-500/10 hover:text-yellow-500"
            >
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-yellow-500" />
            <span>No Credit Card Required</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-yellow-500" />
            <span>Instant Reports</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-yellow-500" />
            <span>Cancel Anytime</span>
          </div>
        </div>

        <div className="mt-12 mx-auto max-w-3xl rounded-lg border border-yellow-500/20 bg-black/20 p-4 text-center">
          <div className="mb-2 text-yellow-500">Interactive 3D</div>
          <div className="text-gray-400 text-sm">Enable JavaScript to view</div>
        </div>
      </div>
    </section>
  )
}
