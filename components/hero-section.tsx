"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { AddressSearchForm } from "@/components/address-search-form"
import { useUser } from "@/contexts/user-context"
import { LoginModal } from "@/components/auth/login-modal"

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
        router.push("/report?address=" + encodeURIComponent(address))
      }
    } catch (error) {
      console.error("Error submitting address:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative bg-gradient-to-b from-white to-gray-100 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-navy-800 leading-tight">
              Get Your Comprehensive Roof Report Today
            </h1>
            <p className="text-lg text-gray-600">
              RoofFax provides detailed reports on roof condition, estimated lifespan, and repair recommendations. Enter
              your address to get started.
            </p>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <AddressSearchForm onSubmit={handleAddressSubmit} isSubmitting={isSubmitting} buttonText="Get Report" />
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 text-gray-600">Trusted by 10,000+ homeowners</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-1 text-gray-600">100% satisfaction guarantee</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[400px] md:h-[500px] w-full">
              <Image
                src="/images/landon-roofus-roof.png"
                alt="Roof inspection with RoofFax"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </section>
  )
}
