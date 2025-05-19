"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoadingSpinner } from "@/components/loading-spinner"

interface AddressSearchFormProps {
  onSubmit: (address: string) => void
  isSubmitting?: boolean
  buttonText?: string
  className?: string
}

export function AddressSearchForm({
  onSubmit,
  isSubmitting = false,
  buttonText = "Search",
  className = "",
}: AddressSearchFormProps) {
  const [address, setAddress] = useState("")
  const [error, setError] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate address
    if (!address.trim()) {
      setError("Please enter an address")
      return
    }

    setError("")
    onSubmit(address)
  }

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`} aria-label="Property address search form">
      <div className="relative">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                isFocused ? "text-blue-500" : "text-gray-400"
              }`}
              size={20}
            />
            <Input
              type="text"
              placeholder="Enter your property address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="pl-10 py-3 w-full border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              disabled={isSubmitting}
              aria-label="Property address"
              aria-required="true"
              aria-invalid={!!error}
              aria-describedby={error ? "address-error" : undefined}
            />
          </div>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 transition-colors duration-200 text-base font-medium"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <LoadingSpinner className="mr-2" />
                <span className="sm:inline">Processing...</span>
              </span>
            ) : (
              buttonText
            )}
          </Button>
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-1" id="address-error" role="alert">
            {error}
          </p>
        )}
      </div>
    </form>
  )
}

export default AddressSearchForm
