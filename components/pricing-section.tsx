"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/user-context"
import RegisterModal from "@/components/auth/register-modal"

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true)
  const [registerModalOpen, setRegisterModalOpen] = useState(false)
  const router = useRouter()
  const { user } = useUser()

  const plans = [
    {
      name: "Basic",
      description: "Essential roof reports for homeowners",
      monthlyPrice: 9.99,
      annualPrice: 99.99,
      features: [
        "Single property report",
        "Basic roof condition assessment",
        "Material identification",
        "PDF report download",
        "Email support",
      ],
    },
    {
      name: "Pro",
      description: "Comprehensive reports with advanced features",
      monthlyPrice: 19.99,
      annualPrice: 199.99,
      popular: true,
      features: [
        "Everything in Basic",
        "Multiple property reports",
        "Detailed damage assessment",
        "Historical data analysis",
        "Maintenance recommendations",
        "Priority email support",
      ],
    },
    {
      name: "Business",
      description: "For contractors and real estate professionals",
      monthlyPrice: 49.99,
      annualPrice: 499.99,
      features: [
        "Everything in Pro",
        "Unlimited property reports",
        "White-label reports",
        "Client management dashboard",
        "API access",
        "Dedicated account manager",
        "Phone support",
      ],
    },
  ]

  const handlePlanSelect = () => {
    if (!user) {
      setRegisterModalOpen(true)
      return
    }

    router.push("/dashboard")
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Choose the plan that works best for your needs</p>

          <div className="flex items-center justify-center mt-8">
            <div className="bg-gray-100 p-1 rounded-full inline-flex">
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isAnnual ? "bg-white shadow-sm text-blue-600" : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Annual (Save 16%)
              </button>
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !isAnnual ? "bg-white shadow-sm text-blue-600" : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Monthly
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-lg overflow-hidden border ${
                plan.popular ? "border-blue-500 shadow-lg" : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="bg-blue-500 text-white text-center py-2 text-sm font-medium">Most Popular</div>
              )}

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-gray-600 mt-2">{plan.description}</p>

                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">
                    ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-gray-600">{isAnnual ? "/year" : "/month"}</span>
                </div>

                <Button
                  onClick={handlePlanSelect}
                  className={`w-full mt-6 ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  Get Started
                </Button>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <RegisterModal isOpen={registerModalOpen} onClose={() => setRegisterModalOpen(false)} />
    </section>
  )
}
