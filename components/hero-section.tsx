import { AddressSearchForm } from "./address-search-form"
import Image from "next/image"
import { AskRoofusButton } from "./ask-roofus-button"
import { TrustStats } from "./trust-stats"
import { HowItWorks } from "./how-it-works"
import { Testimonials } from "./testimonials"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">The Smart Roof & Property Report</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Get instant insights about your roof's condition, storm history, and repair needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get Your Free Roof Report</h2>
            <AddressSearchForm />
          </div>

          {/* Right Column - Image/Preview */}
          <div className="relative">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/roofus.png"
                  alt="Roofus the RoofFax mascot"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
              <div className="p-6 bg-gray-50 border-t">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Meet Roofus</h3>
                <p className="text-gray-700">
                  Your AI-powered roof assistant. Roofus analyzes satellite imagery, public records, and weather data to
                  give you the most accurate roof assessment.
                </p>
              </div>
            </div>
          </div>
        </div>

        <TrustStats />
        <HowItWorks />
        <Testimonials />
      </div>

      <AskRoofusButton />
    </section>
  )
}
