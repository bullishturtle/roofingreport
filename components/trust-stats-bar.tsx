"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Home, CheckCircle, Shield, Award } from "lucide-react"

export function TrustStatsBar() {
  const isMobile = useIsMobile()

  const stats = [
    {
      icon: Home,
      value: "50,000+",
      label: "Roofs Analyzed",
    },
    {
      icon: CheckCircle,
      value: "99.8%",
      label: "Accuracy Rate",
    },
    {
      icon: Shield,
      value: "100%",
      label: "Secure & Private",
    },
    {
      icon: Award,
      value: "#1",
      label: "Trusted Roof Report",
    },
  ]

  return (
    <section className="bg-white py-8 md:py-12 border-y border-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">Trusted by Homeowners & Professionals</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col items-center text-center p-4",
                index < stats.length - 1 && "border-r border-gray-100 last:border-r-0",
              )}
            >
              <stat.icon className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</span>
              <span className="text-sm md:text-base text-gray-600">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
