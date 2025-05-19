import { HeroSection } from "@/components/hero-section"
import { TrustStatsBar } from "@/components/trust-stats-bar"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { FeaturesSection } from "@/components/features-section"
import { CTASection } from "@/components/cta-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "RoofFax.Report - Comprehensive Roof Analysis & Reports",
  description:
    "Get detailed roof condition reports, damage assessments, and repair estimates for your property in minutes.",
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustStatsBar />
      <HowItWorksSection />
      <FeaturesSection />
      <CTASection />
    </>
  )
}
