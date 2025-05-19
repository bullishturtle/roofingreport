import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { AboutSection } from "@/components/about-section"
import { CtaSection } from "@/components/cta-section"
import { ProSection } from "@/components/pro-section"
import { DemoSection } from "@/components/demo-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
        <DemoSection />
        <ProSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
