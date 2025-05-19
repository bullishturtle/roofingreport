import Header from "@/components/header"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import TrustStatsBar from "@/components/trust-stats-bar"
import HowItWorksExplainer from "@/components/how-it-works-explainer"
import FeaturesSection from "@/components/features-section"
import TestimonialsSection from "@/components/testimonials-section"
import PricingSection from "@/components/pricing-section"
import CtaSection from "@/components/cta-section"
import RoofusAssistant from "@/components/roofus-assistant"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <TrustStatsBar />
        <HowItWorksExplainer />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <CtaSection />
        <RoofusAssistant />
      </main>
      <Footer />
    </div>
  )
}
