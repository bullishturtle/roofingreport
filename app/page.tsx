import { HeroSearch } from "@/components/hero-search"
import { HeroVisualization } from "@/components/hero-visualization"
import { DemoTools } from "@/components/demo-tools"
import { FeatureShowcase } from "@/components/feature-showcase"
import { HowItWorks } from "@/components/how-it-works"
import { TrustTheFoxSection } from "@/components/trust-the-fox-section"
import { ProUpgradeSection } from "@/components/pro-upgrade-section"
import { NewsletterSignupForm } from "@/components/newsletter-signup-form"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PartnersSection } from "@/components/partners-section"
import { StructuredData } from "@/components/seo/structured-data"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <StructuredData />
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
        {/* Hero Section with Centered Search */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-gray-900/50"></div>
          <div className="absolute inset-0 bg-[url('/images/roof-pattern.svg')] opacity-5"></div>
          <HeroVisualization />

          <div className="container relative px-4 md:px-6 mx-auto text-center">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
                  The <span className="text-orange-500">Trusted Source</span> for Roof Information
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Just like CarFax for cars, RoofFax provides comprehensive roof reports, storm history, and contractor
                  verification for any property in Florida.
                </p>
              </div>

              {/* Centered Property Search */}
              <div className="max-w-2xl mx-auto">
                <HeroSearch />
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-8 pt-8 text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Real-time data</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>AI-powered reports</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Storm tracking</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <PartnersSection />

        {/* Demo Tools Section */}
        <DemoTools />

        {/* Feature Showcase */}
        <FeatureShowcase />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* How It Works */}
        <HowItWorks />

        {/* Trust the Fox Section */}
        <TrustTheFoxSection />

        {/* Pro Upgrade Section */}
        <ProUpgradeSection />

        {/* Newsletter Signup Section */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Stay Updated with RoofFax</h2>
              <p className="text-lg text-gray-300">
                Subscribe to our newsletter for the latest news, features, and insights on roof technology and property
                trends.
              </p>
              <NewsletterSignupForm className="mt-8" />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-500">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-white">Ready to Get Started?</h2>
              <p className="text-xl text-orange-100">
                Join thousands of professionals who trust RoofFax for reliable roof information.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/signup">
                  <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="https://pro.therooffax.com">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Go to RoofFax Pro
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
