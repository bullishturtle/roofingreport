import { Check } from "lucide-react"

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-gray-900 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Simple, <span className="text-yellow-500">Transparent</span> Pricing
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            Choose the plan that works best for your business. No hidden fees, no long-term contracts.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <PricingCard
            title="Starter"
            price={49}
            period="per month"
            description="Perfect for small contractors just getting started."
            features={["10 reports per month", "Basic measurements", "PDF exports", "Email support"]}
            buttonText="Get Started"
            buttonVariant="outline"
          />

          <PricingCard
            title="Professional"
            price={99}
            period="per month"
            description="Ideal for growing roofing companies."
            features={[
              "50 reports per month",
              "Advanced measurements",
              "Damage detection",
              "CRM integration",
              "Priority support",
            ]}
            buttonText="Get Started"
            buttonVariant="primary"
            popular
          />

          <PricingCard
            title="Enterprise"
            price={249}
            period="per month"
            description="For established companies with multiple teams."
            features={[
              "Unlimited reports",
              "Full feature access",
              "API access",
              "Custom branding",
              "Dedicated account manager",
              "24/7 phone support",
            ]}
            buttonText="Contact Sales"
            buttonVariant="outline"
          />
        </div>
      </div>
    </section>
  )
}

interface PricingCardProps {
  title: string
  price: number
  period: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant: "primary" | "outline"
  popular?: boolean
}

function PricingCard({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonVariant,
  popular,
}: PricingCardProps) {
  return (
    <div className={`relative rounded-lg border ${popular ? "border-yellow-500" : "border-gray-800"} bg-gray-900 p-6`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-yellow-500 px-3 py-1 text-xs font-medium text-black">
          Most Popular
        </div>
      )}

      <div className="mb-4 text-xl font-bold text-white">{title}</div>

      <div className="mb-4">
        <span className="text-4xl font-bold text-white">${price}</span>
        <span className="text-gray-400"> {period}</span>
      </div>

      <p className="mb-6 text-gray-400">{description}</p>

      <ul className="mb-6 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="mr-2 h-5 w-5 text-yellow-500" />
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full rounded-md ${
          buttonVariant === "primary"
            ? "bg-yellow-500 text-black hover:bg-yellow-400"
            : "border border-gray-700 text-white hover:bg-gray-800"
        } py-2 font-medium`}
      >
        {buttonText}
      </button>
    </div>
  )
}
