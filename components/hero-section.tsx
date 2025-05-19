"use client"

import { useState } from "react"
import Image from "next/image"
import { AddressSearchForm } from "@/components/address-search-form"
import { useUser } from "@/contexts/user-context"
import RegisterModal from "@/components/auth/register-modal"
import { AnimatedCharacters } from "@/components/animated-characters"

export default function HeroSection() {
  const { user } = useUser()
  const [registerModalOpen, setRegisterModalOpen] = useState(false)

  const handleAddressSubmitWithoutAuth = () => {
    setRegisterModalOpen(true)
  }

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">Know Your Roof's Story</h1>
            <p className="text-lg text-gray-700">
              Get comprehensive roof reports with damage assessment, repair recommendations, and more.
            </p>

            <AddressSearchForm onSubmitWithoutAuth={handleAddressSubmitWithoutAuth} />

            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-600">Instant Reports</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-600">Damage Assessment</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-600">Repair Estimates</span>
              </div>
            </div>
          </div>

          <div className="relative h-[400px] lg:h-[500px]">
            <div className="relative w-full h-full">
              <Image
                src="/roof-aerial-view.png"
                alt="Roof Aerial View"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-10 -right-10">
                <AnimatedCharacters variant="clipboard" size="lg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <RegisterModal isOpen={registerModalOpen} onClose={() => setRegisterModalOpen(false)} />
    </section>
  )
}
