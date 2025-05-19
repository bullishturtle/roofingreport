"use client"

import Image from "next/image"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

export function HowItWorksSection() {
  const isMobile = useIsMobile()

  const steps = [
    {
      number: 1,
      title: "Enter Your Address",
      description: "Simply enter your property address to begin the roof analysis process.",
    },
    {
      number: 2,
      title: "AI Analysis",
      description: "Our advanced AI analyzes satellite imagery, weather data, and property records.",
    },
    {
      number: 3,
      title: "Get Your Report",
      description: "Receive a comprehensive report with condition assessment, damage detection, and repair estimates.",
    },
  ]

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How RoofFax Works</h2>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
            Get detailed insights about your roof in just a few simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "bg-white rounded-xl shadow-md p-6 relative",
                "transform transition-transform duration-300 hover:-translate-y-2",
              )}
            >
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 text-center">{step.title}</h3>
              <p className="text-gray-700 text-center">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="relative max-w-3xl mx-auto">
            <Image
              src="/roof-inspection-process.png"
              alt="Roof inspection process visualization"
              width={800}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
