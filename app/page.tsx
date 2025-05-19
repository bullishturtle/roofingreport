import type { Metadata } from "next"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TrustStats } from "@/components/trust-stats"
import { TrustStatsBar } from "@/components/trust-stats-bar"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksExplainer } from "@/components/how-it-works-explainer"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PricingSection } from "@/components/pricing-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { PreviewReportButton } from "@/components/preview-report-button"
import { AskRoofusTooltip } from "@/components/ask-roofus-tooltip"

export const metadata: Metadata = {
  title: "RoofFax - The World's Smartest Roof & Property Report",
  description:
    "RoofFax delivers truth, transparency, and technology with instant, AI-powered roof and property insights for homeowners and roofing professionals.",
  keywords: "roof report, property report, roof inspection, roofing, AI roof analysis, roof measurement",
  openGraph: {
    title: "RoofFax - The World's Smartest Roof & Property Report",
    description: "Get instant, AI-powered insights about your roof and property",
    url: "https://rooffax.com",
    siteName: "RoofFax",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RoofFax - The World's Smartest Roof & Property Report",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-black">
        <Header />
        <main className="flex-1">
          <HeroSection />
          <TrustStatsBar />
          <FeaturesSection />
          <HowItWorksExplainer />
          <TrustStats />
          <TestimonialsSection />
          <PricingSection />
          <CTASection />
        </main>
        <Footer />
      </div>
      <PreviewReportButton />
      <AskRoofusTooltip />
    </>
  )
}
