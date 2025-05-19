"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AddressSearchForm } from "@/components/address-search-form"
import { useUser } from "@/contexts/user-context"
import { LoginModal } from "@/components/auth/login-modal"
import { useToast } from "@/components/ui/toast"
import { TrustStatsBar } from "@/components/trust-stats-bar"

export function HeroSection() {
  const router = useRouter()
  const { user } = useUser()
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showToast } = useToast()

  const handleAddressSubmit = async (address: string) => {
    try {
      setIsSubmitting(true)
      console.log("Address submitted:", address)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Log for future CRM integration
      console.log("[CRM INTEGRATION] Lead captured:", {
        address,
        timestamp: new Date().toISOString(),
        source: "hero_form",
        user: user ? { id: user.id, email: user.email } : "anonymous",
      })

      if (!user) {
        setLoginModalOpen(true)
      } else {
        // In production, this would make an API call to get the report
        // or redirect to a report generation page

        // For now, we'll show a success message and simulate routing
        showToast("Report request received", "We're generating your report now.", "success")

        // Delayed redirect to simulate processing
        setTimeout(() => {
          router.push("/report?address=" + encodeURIComponent(address))
        }, 1000)
      }
    } catch (error) {
      console.error("Error submitting address:", error)
      showToast("Error", "We couldn't process your request. Please try again.", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSeeHowItWorks = () => {
    const howItWorksSection = document.getElementById("how-it-works")
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <section className="relative bg-black py-16 md:py-24" aria-labelledby="hero-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4">
            <span className="inline-block bg-yellow-500/20 text-yellow-500 px-4 py-1 rounded-full text-sm font-medium">
              The World's Smartest Roof & Property Report
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 id="hero-heading" className="text-4xl md:text-5xl font-bold text-white leading-tight">
                <span className="text-yellow-500">Trusted by Homeowners.</span>
                <br />
                Built for Pros.
              </h1>
              <p className="text-lg text-gray-300">
                At RoofFax, we're redefining how homeowners and roofing professionals assess, verify, and act on roof
                and property data. Our mission is simple: deliver truth, transparency, and technology in an industry
                often clouded by confusion and outdated methods.
              </p>

              <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-lg">
                <AddressSearchForm onSubmit={handleAddressSubmit} isSubmitting={isSubmitting} buttonText="Get Report" />
              </div>

              <div className="flex flex-wrap gap-6 items-center">
                <button
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium px-6 py-3 rounded-md transition-colors duration-200"
                  onClick={() => window.open("/signup", "_self")}
                  aria-label="Start your free trial"
                >
                  Start Free Trial
                </button>
                <button
                  className="border border-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-md transition-colors duration-200"
                  onClick={handleSeeHowItWorks}
                  aria-label="Learn how RoofFax works"
                >
                  See How It Works
                </button>
              </div>

              <div className="flex flex-wrap gap-8 pt-4">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-yellow-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  <span className="ml-1 text-gray-300">No Credit Card Required</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-yellow-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  <span className="ml-1 text-gray-300">Instant Reports</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-yellow-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  <span className="ml-1 text-gray-300">Cancel Anytime</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[400px] md:h-[500px] w-full border border-gray-800 rounded-lg overflow-hidden bg-gray-900/50">
                {/* In production, this would be a real 3D viewer or image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-yellow-500 mb-2">Interactive 3D Model</div>
                    <div className="text-gray-400 text-sm">Enable JavaScript to view</div>
                  </div>
                </div>

                {/* This is a placeholder for the actual 3D component */}
                {/* TODO: Replace with actual 3D viewer component */}

                {/* Add accessibility description for screen readers */}
                <div className="sr-only">
                  An interactive 3D model of a roof showing measurements, slopes, and potential damage areas
                </div>
              </div>
            </div>
          </div>
        </div>

        <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
      </section>

      {/* Trust stats bar below hero */}
      <TrustStatsBar />
    </>
  )
}

export default HeroSection
