"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useIsMobile } from "@/hooks/use-mobile"

export function AddressSearchForm() {
  const [address, setAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const isMobile = useIsMobile()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!address.trim()) return

    setIsLoading(true)

    // Simulate API call
    console.log(`Searching for address: ${address}`)

    // Show success message or redirect
    setTimeout(() => {
      setIsLoading(false)
      alert(`Report requested for: ${address}`)
      setAddress("")
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full gap-2 sm:gap-0">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Enter your property address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="pl-10 pr-4 py-2 h-12 rounded-lg sm:rounded-r-none border-gray-300 focus:border-blue-500 focus:ring-blue-500 w-full"
          required
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading || !address.trim()}
        className="h-12 px-6 font-medium rounded-lg sm:rounded-l-none bg-blue-600 hover:bg-blue-700 transition-colors"
      >
        {isLoading ? "Searching..." : "Get Report"}
      </Button>
    </form>
  )
}
