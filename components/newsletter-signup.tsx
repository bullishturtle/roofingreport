"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, CheckCircle } from "lucide-react"
import { useToast } from "@/components/ui/toast"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { showToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate email
    if (!email) {
      setError("Email is required")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email")
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSuccess(true)
      showToast("Successfully subscribed to newsletter!", "success")

      // Reset form after 3 seconds
      setTimeout(() => {
        setEmail("")
        setIsSuccess(false)
      }, 3000)
    } catch (error) {
      showToast("Failed to subscribe. Please try again.", "error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <h3 className="text-lg font-bold text-white mb-2">Stay Updated</h3>
      <p className="text-gray-400 text-sm mb-4">Get the latest news and updates from RoofFax</p>

      <div className="flex space-x-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (error) setError(null)
          }}
          disabled={isLoading || isSuccess}
          className={`bg-gray-800 border-gray-700 text-white ${error ? "border-red-500" : "focus:border-yellow-500"}`}
        />
        <Button
          type="submit"
          disabled={isLoading || isSuccess}
          className={`${
            isSuccess ? "bg-green-600 hover:bg-green-700" : "bg-yellow-500 hover:bg-yellow-600"
          } text-black`}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isSuccess ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            "Subscribe"
          )}
        </Button>
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </form>
  )
}
