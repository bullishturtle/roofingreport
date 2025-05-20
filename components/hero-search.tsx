"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Loader2, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/toast"
import { validationRules, validateField } from "@/lib/form-validation"

export function HeroSearch() {
  const [address, setAddress] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { showToast } = useToast()

  const validateAddress = () => {
    const addressError = validateField(address, [
      validationRules.required("Please enter an address"),
      validationRules.address("Please enter a valid property address"),
    ])

    setError(addressError)
    return !addressError
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateAddress()) {
      return
    }

    try {
      setIsSearching(true)
      setError(null)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real implementation, this would call an API endpoint
      console.log("Searching for address:", address)

      // Show success toast
      showToast(`Report generated for ${address}`, "success")

      // Redirect to the report page
      window.location.href = `/report?address=${encodeURIComponent(address)}`
    } catch (err) {
      console.error("Search failed:", err)
      setError("Search failed. Please try again.")
      showToast("Failed to generate report. Please try again.", "error")
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neon-gold/70" />
        <Input
          type="text"
          placeholder="Enter any property address..."
          className={`pl-10 bg-black/30 border-2 ${
            error ? "border-red-500/50 focus:border-red-500" : "border-neon-gold/30 focus:border-neon-gold"
          } text-white placeholder:text-white/50 focus:ring-neon-gold/20`}
          value={address}
          onChange={(e) => {
            setAddress(e.target.value)
            if (error) validateAddress()
          }}
          onBlur={validateAddress}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "address-error" : undefined}
          disabled={isSearching}
        />
        {address.length > 0 && !isSearching && (
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
              onClick={() => {
                setAddress("")
                setError(null)
              }}
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
        {error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <AlertCircle className="h-4 w-4 text-red-500" />
          </div>
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
          "Get Instant Report"
        )}
      </Button>
      {error && (
        <div id="address-error" className="text-xs text-red-400 mt-1 sm:absolute sm:top-full">
          {error}
        </div>
      )}
    </form>
  )
}
