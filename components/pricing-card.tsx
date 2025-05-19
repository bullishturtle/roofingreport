"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/toast"

interface PricingCardProps {
  title: string
  price: string
  features: string[]
  cta: string
  popular?: boolean
}

export function PricingCard({ title, price, features, cta, popular = false }: PricingCardProps) {
  const { showToast } = useToast()

  const handleClick = () => {
    showToast(`Selected ${title} plan. Please enter an address to continue.`, "info")

    // Scroll to the top search bar
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden border ${
        popular ? "border-amber-400 transform scale-105" : "border-gray-200"
      }`}
    >
      {popular && <div className="bg-amber-400 text-center py-2 text-black font-medium">Most Popular</div>}

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="mb-4">
          <span className="text-4xl font-bold">${price}</span>
          <span className="text-gray-600"> per report</span>
        </div>

        <ul className="mb-6 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          onClick={handleClick}
          className={`w-full ${
            popular
              ? "bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-black"
              : "bg-gray-800 hover:bg-gray-700 text-white"
          }`}
        >
          {cta}
        </Button>
      </div>
    </div>
  )
}
