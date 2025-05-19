import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check } from "lucide-react"

export function ProSection() {
  const proFeatures = [
    "Unlimited property reports",
    "Advanced measurement tools",
    "Lead generation system",
    "Customer relationship management",
    "Quote generation and approval",
    "Document management",
    "Team collaboration tools",
    "Mobile app access",
  ]

  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              RoofFax Pro for Professionals
            </h2>
            <p className="md:text-xl">
              Powerful tools for contractors, realtors, insurance agents, and property managers. Streamline your
              workflow and grow your business.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-4">
              {proFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="h-5 w-5 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <Button asChild size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-blue-50">
                <Link href="https://rooffaxpro.com">Learn More About RoofFax Pro</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-blue-500 p-6">
              <div className="text-2xl font-bold">Basic</div>
              <div className="mt-2 text-3xl font-bold">
                $49<span className="text-lg font-normal">/mo</span>
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 flex-shrink-0" />
                  <span>25 reports/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 flex-shrink-0" />
                  <span>Basic measurements</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 flex-shrink-0" />
                  <span>Simple quotes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 flex-shrink-0" />
                  <span>Email support</span>
                </li>
              </ul>
              <Button className="mt-6 w-full bg-white text-blue-600 hover:bg-blue-50">Start Trial</Button>
            </div>
            <div className="rounded-lg bg-blue-700 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-yellow-400 text-blue-900 text-xs font-bold px-2 py-1">
                POPULAR
              </div>
              <div className="text-2xl font-bold">Pro</div>
              <div className="mt-2 text-3xl font-bold">
                $99<span className="text-lg font-normal">/mo</span>
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 flex-shrink-0" />
                  <span>Unlimited reports</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 flex-shrink-0" />
                  <span>Advanced measurements</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 flex-shrink-0" />
                  <span>Full CRM access</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Button className="mt-6 w-full bg-white text-blue-600 hover:bg-blue-50">Start Trial</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
