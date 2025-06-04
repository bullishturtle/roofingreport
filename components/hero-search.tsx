"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, Shield, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function HeroSearch() {
  const [activeTab, setActiveTab] = useState("property")
  const [isLoading, setIsLoading] = useState(false)
  const [propertyAddress, setPropertyAddress] = useState("")
  const [contractorName, setContractorName] = useState("")
  const { toast } = useToast()

  const handlePropertySearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!propertyAddress.trim()) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Property Found!",
      description: `Generating comprehensive report for ${propertyAddress}`,
    })

    setIsLoading(false)

    // Navigate to demo report
    window.location.href = "/demo/ai-report"
  }

  const handleContractorSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contractorName.trim()) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Contractor Verified!",
      description: `Found verification details for ${contractorName}`,
    })

    setIsLoading(false)

    // Navigate to contractor verification demo
    window.location.href = "/demo/contractor-check"
  }

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="property" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Property Lookup
              </TabsTrigger>
              <TabsTrigger value="contractor" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Who Knocked?
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="property" className="mt-0">
                <motion.div
                  key="property"
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handlePropertySearch} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Enter Property Address</label>
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="123 Main St, Tampa, FL 33601"
                          value={propertyAddress}
                          onChange={(e) => setPropertyAddress(e.target.value)}
                          className="pl-10 h-12 text-lg"
                          disabled={isLoading}
                        />
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                        disabled={isLoading || !propertyAddress.trim()}
                      >
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          >
                            <Loader2 className="h-5 w-5 mr-2" />
                          </motion.div>
                        ) : (
                          <Search className="h-5 w-5 mr-2" />
                        )}
                        {isLoading ? "Analyzing Property..." : "Get Roof Report"}
                      </Button>
                    </motion.div>
                  </form>
                </motion.div>
              </TabsContent>

              <TabsContent value="contractor" className="mt-0">
                <motion.div
                  key="contractor"
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handleContractorSearch} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Contractor or Company Name</label>
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="ABC Roofing Company"
                          value={contractorName}
                          onChange={(e) => setContractorName(e.target.value)}
                          className="pl-10 h-12 text-lg"
                          disabled={isLoading}
                        />
                        <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                        disabled={isLoading || !contractorName.trim()}
                      >
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          >
                            <Loader2 className="h-5 w-5 mr-2" />
                          </motion.div>
                        ) : (
                          <Shield className="h-5 w-5 mr-2" />
                        )}
                        {isLoading ? "Verifying Contractor..." : "Verify Contractor"}
                      </Button>
                    </motion.div>
                  </form>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-gray-600">
              Try our demo with sample data or enter your own property information
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
