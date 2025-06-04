"use client"

import { Label } from "@/components/ui/label"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, Shield, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation" // Import useRouter

export function HeroSearch() {
  const [activeTab, setActiveTab] = useState("property")
  const [isLoading, setIsLoading] = useState(false)
  const [propertyAddress, setPropertyAddress] = useState("")
  const [contractorName, setContractorName] = useState("")
  const { toast } = useToast()
  const router = useRouter() // Initialize useRouter

  const handlePropertySearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!propertyAddress.trim()) {
      toast({ title: "Input Required", description: "Please enter a property address.", variant: "destructive" })
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Property Analysis Complete!",
      description: `Generating report for ${propertyAddress}. Redirecting...`,
      variant: "success",
    })

    // Navigate to demo report using Next.js router
    router.push("/demo/ai-report")
    // setIsLoading(false); // Might not be needed if redirecting immediately
  }

  const handleContractorSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contractorName.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a contractor or company name.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Contractor Verification Complete!",
      description: `Displaying details for ${contractorName}. Redirecting...`,
      variant: "success",
    })

    // Navigate to contractor verification demo using Next.js router
    router.push("/demo/contractor-check")
    // setIsLoading(false); // Might not be needed if redirecting immediately
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
      <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0 shadow-2xl">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger
                value="property"
                className="flex items-center gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800"
                aria-controls="property-tab-content"
              >
                <MapPin className="h-4 w-4" />
                Property Lookup
              </TabsTrigger>
              <TabsTrigger
                value="contractor"
                className="flex items-center gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800"
                aria-controls="contractor-tab-content"
              >
                <Shield className="h-4 w-4" />
                Who Knocked?
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="property" id="property-tab-content" role="tabpanel" className="mt-0">
                <motion.div
                  key="property"
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handlePropertySearch} className="space-y-4">
                    <div className="space-y-1">
                      <Label
                        htmlFor="property-address"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Enter Property Address
                      </Label>
                      <div className="relative">
                        <Input
                          id="property-address"
                          type="text"
                          placeholder="123 Main St, Tampa, FL 33601"
                          value={propertyAddress}
                          onChange={(e) => setPropertyAddress(e.target.value)}
                          className="pl-10 h-12 text-lg"
                          disabled={isLoading}
                          aria-label="Property Address"
                          aria-required="true"
                        />
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800"
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

              <TabsContent value="contractor" id="contractor-tab-content" role="tabpanel" className="mt-0">
                <motion.div
                  key="contractor"
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handleContractorSearch} className="space-y-4">
                    <div className="space-y-1">
                      <Label htmlFor="contractor-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Contractor or Company Name
                      </Label>
                      <div className="relative">
                        <Input
                          id="contractor-name"
                          type="text"
                          placeholder="ABC Roofing Company"
                          value={contractorName}
                          onChange={(e) => setContractorName(e.target.value)}
                          className="pl-10 h-12 text-lg"
                          disabled={isLoading}
                          aria-label="Contractor or Company Name"
                          aria-required="true"
                        />
                        <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800"
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
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Try our demo with sample data or enter your own property information
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
