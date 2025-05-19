"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export function HeroSection() {
  const [address, setAddress] = useState("")
  const [showDialog, setShowDialog] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (address.trim()) {
      console.log("Address submitted:", address)
      setShowDialog(true)
    }
  }

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-blue-600">
                Your Roof's Complete History Report
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl">
                Just like CarFax for your vehicle, RoofFax gives you the complete history and current condition of your
                roof. Get insights, damage reports, and more.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex w-full max-w-md items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Enter your property address"
                  className="pl-9 pr-4 py-6 text-base rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700 text-white py-6">
                Get Report
              </Button>
            </form>
            <p className="text-sm text-gray-500">Free for homeowners. Instant results. No credit card required.</p>
          </div>
          <div className="relative lg:ml-auto">
            <div className="relative h-[350px] w-full sm:h-[450px] lg:h-[550px]">
              <Image src="/images/roofus.png" alt="Roofus the RoofFax mascot" fill className="object-contain" />
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Property Report</DialogTitle>
            <DialogDescription>Here's what we found for: {address}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="font-medium">Property Details</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">Last Sold:</div>
                <div>June 2022</div>
                <div className="font-medium">Roof Age:</div>
                <div>Approximately 8 years</div>
                <div className="font-medium">Last Inspection:</div>
                <div>March 2023</div>
                <div className="font-medium">Material:</div>
                <div>Asphalt Shingles</div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Recent Weather Events</h3>
              <p className="text-sm">This property has experienced 2 significant hail events in the past 5 years.</p>
            </div>
            <Button className="w-full" onClick={() => setShowDialog(false)}>
              Get Full Report
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
