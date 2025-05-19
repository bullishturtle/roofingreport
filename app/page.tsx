import type { Metadata } from "next"
import { ErrorBoundary } from "@/components/error-boundary"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TrustStats } from "@/components/trust-stats"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PricingSection } from "@/components/pricing-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "RoofFax.Report - Comprehensive Roof Reports",
  description: "Get detailed roof reports for your property. Trusted by homeowners and contractors nationwide.",
}

export default function Home() {
  return (
    <ErrorBoundary>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <HeroSection />
          <TrustStats />
          <FeaturesSection />
          <HowItWorksSection />
          <TestimonialsSection />
          <PricingSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  )
}
