"use client"

import { useState, type FormEvent } from "react"
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

  const handleSubmit = (e: FormEvent) => {
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
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <div className="relative">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Enter your property address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="pl-10 py-6 w-full"
              disabled={isSubmitting}
              aria-label="Property address"
            />
          </div>
          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white py-6 px-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <LoadingSpinner className="mr-2" />
                Processing...
              </span>
            ) : (
              buttonText
            )}
          </Button>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </form>
  )
}
