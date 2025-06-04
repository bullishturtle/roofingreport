"use client"

import dynamic from "next/dynamic"

// Skeleton loader example (you can create more specific ones)
const SkeletonLoader = ({ height = "200px" }: { height?: string }) => (
  <div className="w-full bg-gray-700 animate-pulse rounded-md" style={{ height }} />
)

const DynamicPartnersSection = dynamic(
  () => import("@/components/partners-section").then((mod) => mod.PartnersSection),
  { loading: () => <SkeletonLoader height="100px" />, ssr: false },
)
const DynamicDemoTools = dynamic(() => import("@/components/demo-tools").then((mod) => mod.DemoTools), {
  loading: () => <SkeletonLoader />,
  ssr: false,
})
const DynamicFeatureShowcase = dynamic(
  () => import("@/components/feature-showcase").then((mod) => mod.FeatureShowcase),
  { loading: () => <SkeletonLoader height="400px" />, ssr: false },
)
const DynamicTestimonialsSection = dynamic(
  () => import("@/components/testimonials-section").then((mod) => mod.TestimonialsSection),
  { loading: () => <SkeletonLoader height="300px" />, ssr: false },
)
const DynamicHowItWorks = dynamic(() => import("@/components/how-it-works").then((mod) => mod.HowItWorks), {
  loading: () => <SkeletonLoader />,
  ssr: false,
})
const DynamicTrustTheFoxSection = dynamic(
  () => import("@/components/trust-the-fox-section").then((mod) => mod.TrustTheFoxSection),
  { loading: () => <SkeletonLoader />, ssr: false },
)
const DynamicProUpgradeSection = dynamic(
  () => import("@/components/pro-upgrade-section").then((mod) => mod.ProUpgradeSection),
  { loading: () => <SkeletonLoader />, ssr: false },
)
const DynamicNewsletterSignupForm = dynamic(
  () => import("@/components/newsletter-signup-form").then((mod) => mod.NewsletterSignupForm),
  { loading: () => <SkeletonLoader height="150px" />, ssr: false },
)

export function ClientHomeSections() {
  return (
    <>
      <DynamicPartnersSection />
      <DynamicDemoTools />
      <DynamicFeatureShowcase />
      <DynamicTestimonialsSection />
      <DynamicHowItWorks />
      <DynamicTrustTheFoxSection />
      <DynamicProUpgradeSection />

      {/* Newsletter Signup Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Stay Updated with RoofFax</h2>
            <p className="text-lg text-gray-300">
              Subscribe to our newsletter for the latest news, features, and insights on roof technology and property
              trends.
            </p>
            <DynamicNewsletterSignupForm className="mt-8" />
          </div>
        </div>
      </section>
    </>
  )
}
