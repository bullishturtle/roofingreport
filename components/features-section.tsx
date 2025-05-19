import type React from "react"
import { Zap, Shield, BarChart3, Clock } from "lucide-react"

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-black py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Everything You Need in <span className="text-yellow-500">One Platform</span>
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            RoofFax combines all the tools roofing professionals need into one seamless platform, eliminating the need
            for multiple subscriptions and complicated workflows.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<Zap className="h-8 w-8" />}
            title="Instant Reports"
            description="Generate comprehensive roof and property reports in seconds, not days."
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8" />}
            title="Trusted Accuracy"
            description="98% accuracy rate with AI-powered measurements and damage detection."
          />
          <FeatureCard
            icon={<BarChart3 className="h-8 w-8" />}
            title="Sales Tools"
            description="Built-in proposal generation, CRM integration, and follow-up automation."
          />
          <FeatureCard
            icon={<Clock className="h-8 w-8" />}
            title="Time Savings"
            description="Save up to 5 hours per property with automated workflows and integrations."
          />
        </div>
      </div>
    </section>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 transition-all hover:border-yellow-500">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-500">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}
