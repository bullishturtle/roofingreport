import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PricingSection() {
  const plans = [
    {
      name: "Basic",
      price: "$29",
      description: "Perfect for homeowners",
      features: [
        "Roof condition assessment",
        "Damage detection",
        "Basic repair recommendations",
        "PDF report",
        "30-day access",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Premium",
      price: "$49",
      description: "Ideal for real estate professionals",
      features: [
        "Everything in Basic",
        "Detailed measurements",
        "Historical data analysis",
        "Repair cost estimates",
        "90-day access",
        "Priority support",
      ],
      cta: "Get Premium",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For property managers & businesses",
      features: [
        "Everything in Premium",
        "Multiple property management",
        "API access",
        "Custom reporting",
        "Dedicated account manager",
        "1-year access",
      ],
      cta: "Contact Us",
      popular: false,
    },
  ]

  return (
    <section className="py-16 bg-gray-50" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Choose the plan that's right for you. No hidden fees or long-term commitments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg border ${
                plan.popular ? "border-blue-500" : "border-gray-200"
              } overflow-hidden transition-all hover:shadow-lg`}
            >
              {plan.popular && (
                <div className="bg-blue-500 text-white text-center py-2 text-sm font-medium">Most Popular</div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-gray-600 ml-1">/report</span>}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
