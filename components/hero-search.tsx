"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/toast"
import { validationRules, validateField } from "@/lib/form-validation"

export function HeroSearch() {
  const [address, setAddress] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { showToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate address
    const addressError = validateField(address, [
      validationRules.required("Please enter a property address"),
      validationRules.address("Please enter a valid property address"),
    ])

    if (addressError) {
      setError(addressError)
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message
      showToast(`Report requested for: ${address}`, "success")

      // In a real app, we would redirect to the report page or show a modal
      console.log("Address submitted:", address)

      // Reset form
      setAddress("")
    } catch (error) {
      showToast("Error processing your request. Please try again.", "error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto w-full">
      <div className="relative flex flex-col sm:flex-row gap-2">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Enter any property address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={`h-12 pl-10 bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/70 focus:border-amber-400 focus:ring-amber-400/20 ${
              error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
            }`}
            disabled={isLoading}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
        </div>
        <Button
          type="submit"
          className="h-12 px-8 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-black font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Get Report"}
        </Button>
      </div>
      {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
    </form>
  )
}
