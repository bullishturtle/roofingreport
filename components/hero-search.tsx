"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { EnhancedLoadingSpinner } from "@/components/ui/enhanced-loading"

export function HeroSearch() {
  const [address, setAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!address.trim()) {
      toast({
        title: "Invalid Address",
        description: "Please enter a valid address",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call with realistic timing
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Search Complete",
        description: "Redirecting to your roof report...",
      })

      router.push(`/report?address=${encodeURIComponent(address)}`)
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Unable to process your request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-black/40 backdrop-blur-md border border-neon-gold/30 rounded-xl p-6 shadow-neon-glow">
        <h2 className="text-xl font-bold text-white mb-4">Get Your Roof Report</h2>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium text-white">
              Enter Property Address
            </label>
            <Input
              id="address"
              placeholder="123 Main St, City, State"
              className="bg-black/50 border-white/20 text-white placeholder:text-white/50"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black border-none shadow-neon-glow"
            disabled={isLoading}
          >
            {isLoading ? (
              <EnhancedLoadingSpinner size="sm" text="Searching" className="text-black" />
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search Property
              </>
            )}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-xs text-white/50">Instant access to roof measurements, condition, and storm history</p>
        </div>
      </div>
    </div>
  )
}
