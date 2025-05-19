"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Search, BarChart, AlertTriangle, Calendar, DollarSign, Shield } from "lucide-react"

export function FeaturesSection() {
  const isMobile = useIsMobile()

  const features = [
    {
      icon: Search,
      title: "Comprehensive Analysis",
      description: "Detailed assessment of your roof's condition using satellite imagery and AI technology.",
    },
    {
      icon: BarChart,
      title: "Age & Lifespan Estimation",
      description: "Accurate estimation of your roof's age and remaining lifespan based on material and conditions.",
    },
    {
      icon: AlertTriangle,
      title: "Damage Detection",
      description: "Identification of potential damage areas including missing shingles, leaks, and structural issues.",
    },
    {
      icon: Calendar,
      title: "Maintenance Schedule",
      description: "Customized maintenance recommendations to extend your roof's life and prevent costly repairs.",
    },
    {
      icon: DollarSign,
      title: "Cost Estimates",
      description: "Detailed repair and replacement cost estimates based on your specific roof and local market rates.",
    },
    {
      icon: Shield,
      title: "Insurance Assistance",
      description: "Documentation that helps with insurance claims and negotiations for covered damage.",
    },
  ]

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Comprehensive Roof Analysis</h2>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
            Our detailed reports provide everything you need to know about your roof
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "bg-white rounded-xl border border-gray-100 p-6",
                "transform transition-all duration-300 hover:shadow-md hover:border-blue-100",
              )}
            >
              <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
