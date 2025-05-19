"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AddressSearchForm } from "@/components/address-search-form"
import { useUser } from "@/contexts/user-context"
import { LoginModal } from "@/components/auth/login-modal"
import { Check } from "lucide-react"

export function HeroSection() {
  const router = useRouter()
  const { user } = useUser()
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddressSubmit = async (address: string) => {
    try {
      setIsSubmitting(true)
      console.log("Address submitted:", address)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (!user) {
        setLoginModalOpen(true)
      } else {
        // This will be replaced with actual API integration
        console.log("Routing to report page with address:", address)
        router.push("/report?address=" + encodeURIComponent(address))
      }
    } catch (error) {
      console.error("Error submitting address:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative bg-black py-16 md:py-24" id="hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <span className="inline-block bg-yellow-500/20 text-yellow-500 px-4 py-1 rounded-full text-sm font-medium">
            The World's Smartest Roof & Property Report
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              <span className="text-yellow-500">Trusted by Homeowners.</span>
              <br />
              Built for Pros.
            </h1>
            <p className="text-lg text-gray-300">
              At RoofFax, we're redefining how homeowners and roofing professionals assess, verify, and act on roof and
              property data. Our mission is simple: deliver truth, transparency, and technology in an industry often
              clouded by confusion and outdated methods.
            </p>

            <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-lg">
              <AddressSearchForm onSubmit={handleAddressSubmit} isSubmitting={isSubmitting} buttonText="Get Report" />
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <button
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium px-6 py-3 rounded-md transition-all duration-200"
                onClick={() => (window.location.href = "/trial")}
                aria-label="Start a free trial"
              >
                Start Free Trial
              </button>
              <button
                className="border border-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-md transition-all duration-200"
                onClick={() => (window.location.href = "/how-it-works")}
                aria-label="Learn how RoofFax works"
              >
                See How It Works
              </button>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-yellow-500 mr-2" aria-hidden="true" />
                <span className="text-gray-300">No Credit Card Required</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-yellow-500 mr-2" aria-hidden="true" />
                <span className="text-gray-300">Instant Reports</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-yellow-500 mr-2" aria-hidden="true" />
                <span className="text-gray-300">Cancel Anytime</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[400px] md:h-[500px] w-full border border-gray-800 rounded-lg overflow-hidden bg-gray-900/50">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-yellow-500 mb-2">Interactive 3D Model</div>
                  <div className="text-gray-400 text-sm">Enable JavaScript to view</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </section>
  )
}

export default HeroSection
