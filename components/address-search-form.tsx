"use client"

import { useState, useEffect, type FormEvent } from "react"
import { Search } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface AddressSearchFormProps {
  onSubmit: (address: string) => void
  isSubmitting?: boolean
  buttonText?: string
  className?: string
}

export function AddressSearchForm({
  onSubmit,
  isSubmitting = false,
  buttonText = "Get Report",
  className = "",
}: AddressSearchFormProps) {
  const [address, setAddress] = useState("")
  const [error, setError] = useState("")
  const [isLocalSubmitting, setIsLocalSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  // Reset success message when address changes
  useEffect(() => {
    if (successMessage) {
      setSuccessMessage("")
    }
  }, [address])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Validate address
    if (!address.trim()) {
      setError("Please enter an address")
      return
    }

    setError("")
    setIsLocalSubmitting(true)

    try {
      // Simulate API call with delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Call the parent's onSubmit handler
      onSubmit(address)

      // Show success message
      setSuccessMessage("Address submitted successfully!")

      // Optional: Reset form after successful submission
      // setAddress("")
    } catch (error) {
      console.error("Error submitting address:", error)
      setError("Failed to submit address. Please try again.")
    } finally {
      setIsLocalSubmitting(false)
    }
  }

  const submitting = isSubmitting || isLocalSubmitting

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSubmit} aria-label="Address search form">
        <div className="relative">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="Enter your property address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="pl-10 py-3 w-full bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                disabled={submitting}
                aria-label="Property address"
                aria-required="true"
                aria-invalid={!!error}
                aria-describedby={error ? "address-error" : undefined}
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium py-3 px-6 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 min-w-[120px] flex items-center justify-center"
              disabled={submitting || !address.trim()}
              aria-busy={submitting}
            >
              {submitting ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" aria-hidden="true" />
                  <span>Processing...</span>
                </>
              ) : (
                buttonText
              )}
            </button>
          </div>
          {error && (
            <p id="address-error" className="text-red-500 text-sm mt-1" role="alert">
              {error}
            </p>
          )}
          {successMessage && (
            <p className="text-green-500 text-sm mt-1" role="status">
              {successMessage}
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

export default AddressSearchForm
