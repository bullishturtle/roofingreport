"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"

export function HeroSearch() {
  const { toast } = useToast()
  const [address, setAddress] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!address.trim()) return

    setIsSearching(true)

    // Simulate search delay
    setTimeout(() => {
      // Redirect to the report page with the address as a query parameter
      window.location.href = `/report?address=${encodeURIComponent(address)}`
    }, 1500)
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSearch} className="flex w-full flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neon-gold/70" />
          <Input
            type="text"
            placeholder="Enter any property address..."
            className="pl-10 bg-black/30 border-2 border-neon-gold/30 text-white placeholder:text-white/50 focus:border-neon-gold focus:ring-neon-gold/20"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {address.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-5 w-5 text-white/50 hover:text-white"
                onClick={() => setAddress("")}
              >
                <span className="sr-only">Clear</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </Button>
            </motion.div>
          )}
        </div>
        <Button
          type="submit"
          disabled={isSearching || !address.trim()}
          className="bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black border-none shadow-neon-glow"
        >
          {isSearching ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            "Get Roof Report"
          )}
        </Button>
      </form>
    </div>
  )
}
