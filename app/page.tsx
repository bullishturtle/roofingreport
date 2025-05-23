import { UserTypeRouter } from "@/components/user-type-router"
import { HowItWorks } from "@/components/how-it-works"
import { HomeownerFeatures } from "@/components/homeowner-features"
import { ProFeatures } from "@/components/pro-features"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                The Trusted Source for Roof Information
              </h1>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                RoofFax provides comprehensive roof reports, history, and condition assessments for any property. Just
                like CarFax, but for your roof.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="w-full min-[400px]:w-auto">
                    Get Started
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                    Request Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/images/roofus.png"
                alt="RoofFax Mascot"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>

      {/* User Type Router */}
      <UserTypeRouter />

      {/* How It Works */}
      <HowItWorks />

      {/* Homeowner Features */}
      <HomeownerFeatures />

      {/* Pro Features */}
      <ProFeatures />

      {/* CTA Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container px-4 md:px-6 text-center">
          <div className="mx-auto max-w-3xl space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Ready to Get Started with RoofFax?
            </h2>
            <p className="text-white/80 md:text-xl/relaxed">
              Join thousands of homeowners and professionals who trust RoofFax for reliable roof information.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center pt-4">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="w-full min-[400px]:w-auto">
                  Sign Up Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full min-[400px]:w-auto bg-transparent text-white border-white hover:bg-white/10"
                >
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
