"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AddressSearchForm } from "@/components/address-search-form"
import { useUser } from "@/contexts/user-context"
import { LoginModal } from "@/components/auth/login-modal"
import { useToast } from "@/components/ui/toast"
import { TrustStatsBar } from "@/components/trust-stats-bar"
import { useResponsive } from "@/hooks/use-mobile"
import Image from "next/image"
import { useIsMobile } from "@/hooks/use-mobile"

export function HeroSection() {
  const router = useRouter()
  const { user } = useUser()
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showToast } = useToast()
  const { isMobile } = useIsMobile()
  const { isMobile: wasMobile } = useResponsive()

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
      <section className="relative bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Get Your Comprehensive Roof Report in Minutes
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-xl mx-auto lg:mx-0">
                RoofFax provides detailed roof condition reports, damage assessments, and repair estimates for
                homeowners, buyers, and real estate professionals.
              </p>
              <div className="mt-8 max-w-md mx-auto lg:mx-0">
                <AddressSearchForm onSubmit={handleAddressSubmit} isSubmitting={isSubmitting} buttonText="Get Report" />
              </div>
            </div>
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-full">
                <Image
                  src="/images/roofus.png"
                  alt="Roofus the RoofFax mascot"
                  width={500}
                  height={500}
                  className="object-contain"
                  priority
                />
                <div className="absolute -bottom-4 left-0 right-0 text-center lg:text-right">
                  <p className="inline-block bg-white text-blue-600 font-medium px-4 py-2 rounded-full shadow-md">
                    Meet Roofus, your roof inspection guide!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-10">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-200 rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-200 rounded-full filter blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>
      </section>

      {/* Trust stats bar below hero */}
      <TrustStatsBar />
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </>
  )
}

export default HeroSection
