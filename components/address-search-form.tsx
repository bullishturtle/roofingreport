"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/user-context"
import LoadingSpinner from "@/components/ui/loading-spinner"
import { useToast } from "@/components/ui/use-toast"

interface AddressSearchFormProps {
  variant?: "default" | "hero"
  onSubmitWithoutAuth?: () => void
}

export function AddressSearchForm({ variant = "default", onSubmitWithoutAuth }: AddressSearchFormProps) {
  const [address, setAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { user } = useUser()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!address.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid address",
        variant: "destructive",
      })
      return
    }

    // If user is not logged in and we have a callback for that case
    if (!user && onSubmitWithoutAuth) {
      onSubmitWithoutAuth()
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Store the address in sessionStorage for the report page
    sessionStorage.setItem("rooffax_search_address", address)

    setIsLoading(false)
    router.push("/report")
  }

  return (
    <form onSubmit={handleSubmit} className={`w-full ${variant === "hero" ? "max-w-2xl" : "max-w-md"}`}>
      <div className="relative flex items-center">
        <div className="absolute left-3 text-gray-400">
          <Search size={20} />
        </div>
        <Input
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={`pl-10 pr-24 py-6 ${variant === "hero" ? "text-lg h-14" : ""}`}
          disabled={isLoading}
        />
        <div className="absolute right-1">
          <Button type="submit" size={variant === "hero" ? "lg" : "default"} disabled={isLoading}>
            {isLoading ? <LoadingSpinner size="sm" /> : "Get Report"}
          </Button>
        </div>
      </div>
    </form>
  )
}
