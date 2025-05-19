"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/user-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ReportPreview from "@/components/report-preview"
import LoadingSpinner from "@/components/ui/loading-spinner"
import { Button } from "@/components/ui/button"
import { Download, Share2, Printer } from "lucide-react"
import RoofusAssistant from "@/components/roofus-assistant"

export default function ReportPage() {
  const { user, status } = useUser()
  const router = useRouter()
  const [address, setAddress] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    if (status === "unauthenticated") {
      router.push("/login")
      return
    }

    // Get address from sessionStorage
    const storedAddress = sessionStorage.getItem("rooffax_search_address")
    if (storedAddress) {
      setAddress(storedAddress)
    } else {
      // If no address is found, redirect to home
      router.push("/")
      return
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [status, router])

  if (status === "loading" || isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mx-auto mb-4" />
            <p className="text-gray-600">Generating your roof report...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!address) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Your Roof Report</h1>
              <p className="text-gray-600">Comprehensive analysis for {address}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Download size={16} />
                <span>Download</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Share2 size={16} />
                <span>Share</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Printer size={16} />
                <span>Print</span>
              </Button>
            </div>
          </div>

          <ReportPreview address={address} />
        </div>
      </main>
      <Footer />
      <RoofusAssistant />
    </div>
  )
}
