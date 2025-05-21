"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export function HeroSearch() {
  const [address, setAddress] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!address.trim()) return

    setIsSearching(true)

    // Simulate search
    setTimeout(() => {
      setIsSearching(false)
      // In a real app, you would navigate to results or show results here
      console.log("Searching for:", address)
    }, 1500)
  }

  return (
    <div id="hero-search" className="w-full max-w-4xl mx-auto text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neon-gold to-amber-300">
        Get Your Roof's History Report
      </h1>

      <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
        Just like CarFax for vehicles, RoofFax provides comprehensive history and information about any roof.
      </p>

      <Card className="bg-black/50 backdrop-blur-md border-neon-gold/30 shadow-lg shadow-neon-gold/20">
        <CardContent className="p-4">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <Input
              type="text"
              placeholder="Enter property address"
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Button
              type="submit"
              className="bg-neon-gold hover:bg-neon-gold/80 text-black font-medium"
              disabled={isSearching}
            >
              {isSearching ? "Searching..." : "Get Roof Report"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <p className="mt-4 text-sm text-gray-400">Trusted by thousands of homeowners and professionals nationwide</p>
    </div>
  )
}
