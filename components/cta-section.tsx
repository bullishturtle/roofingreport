"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useUser } from "@/contexts/user-context"
import RegisterModal from "@/components/auth/register-modal"
import Image from "next/image"

export default function CtaSection() {
  const [registerModalOpen, setRegisterModalOpen] = useState(false)
  const { user } = useUser()

  const handleGetStarted = () => {
    if (!user) {
      setRegisterModalOpen(true)
      return
    }

    // Scroll to top where the address search form is
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Get Your Comprehensive Roof Report?</h2>
            <p className="text-lg text-blue-100">
              Join thousands of homeowners who trust TheRoofFax for accurate roof assessments and make informed
              decisions about your property.
            </p>
            <Button onClick={handleGetStarted} size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Get Started Now
            </Button>
          </div>

          <div className="relative h-64 md:h-80 lg:h-96">
            <Image src="/images/roofus.png" alt="Roofus the RoofFax mascot" fill style={{ objectFit: "contain" }} />
          </div>
        </div>
      </div>

      <RegisterModal isOpen={registerModalOpen} onClose={() => setRegisterModalOpen(false)} />
    </section>
  )
}
