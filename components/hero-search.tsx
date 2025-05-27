"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Building } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function HeroSearch() {
  const [address, setAddress] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("address")
  const router = useRouter()
  const { toast } = useToast()

  const handleAddressSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!address.trim()) {
      toast({
        title: "Address Required",
        description: "Please enter a property address",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Property Found!",
        description: "Generating your roof report...",
      })

      router.push(`/report?address=${encodeURIComponent(address)}`)
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Unable to find property. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleContractorSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!companyName.trim()) {
      toast({
        title: "Company Name Required",
        description: "Please enter a contractor or company name",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Contractor Found!",
        description: "Verifying credentials...",
      })

      router.push(`/contractor-check?company=${encodeURIComponent(companyName)}`)
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Unable to verify contractor. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-gray-800/50 backdrop-blur-md border-orange-500/30 shadow-2xl">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Get Your Free Report</h2>
          <p className="text-gray-300">Enter a property address or verify a contractor</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-700/50">
            <TabsTrigger value="address" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              <MapPin className="w-4 h-4 mr-2" />
              Property Lookup
            </TabsTrigger>
            <TabsTrigger
              value="contractor"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              <Building className="w-4 h-4 mr-2" />
              Who Knocked?
            </TabsTrigger>
          </TabsList>

          <TabsContent value="address" className="mt-6">
            <form onSubmit={handleAddressSearch} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium text-gray-300">
                  Property Address
                </label>
                <Input
                  id="address"
                  placeholder="123 Main St, Miami, FL 33101"
                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500/20"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold py-3"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Searching...
                  </div>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Get Property Report
                  </>
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="contractor" className="mt-6">
            <form onSubmit={handleContractorSearch} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium text-gray-300">
                  Contractor or Company Name
                </label>
                <Input
                  id="company"
                  placeholder="ABC Roofing Company"
                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500/20"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold py-3"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Verifying...
                  </div>
                ) : (
                  <>
                    <Building className="mr-2 h-4 w-4" />
                    Verify Contractor
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            Free preview • Full reports available with{" "}
            <a href="https://pro.therooffax.com" className="text-orange-400 hover:text-orange-300">
              RoofFax Pro
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
