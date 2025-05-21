"use client"

import PageClientWrapper from "@/components/client-wrappers/page-client-wrapper"
import { HeroSearchWrapper } from "@/components/client-wrappers/hero-search-wrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function Page() {
  return (
    <PageClientWrapper>
      <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24">
        <div className="w-full max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="relative py-12 md:py-24">
            <HeroSearchWrapper />
          </section>

          {/* Features Section */}
          <section className="py-12 md:py-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-neon-gold to-amber-300">
              Comprehensive Roof Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-black/50 backdrop-blur-md border-neon-gold/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-neon-gold">Roof History</h3>
                  <p className="text-gray-300">
                    Get detailed information about previous repairs, installations, and maintenance records.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/50 backdrop-blur-md border-neon-gold/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-neon-gold">Material Analysis</h3>
                  <p className="text-gray-300">
                    Learn about the materials used, their quality, expected lifespan, and performance.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/50 backdrop-blur-md border-neon-gold/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-neon-gold">Damage Assessment</h3>
                  <p className="text-gray-300">
                    Identify potential issues, storm damage history, and vulnerability assessments.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* For Homeowners Section */}
          <section className="py-12 md:py-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neon-gold to-amber-300">
              For Homeowners
            </h2>
            <p className="text-lg text-center text-gray-300 mb-12 max-w-3xl mx-auto">
              Make informed decisions about your property with comprehensive roof information.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-black/50 backdrop-blur-md border-neon-gold/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-neon-gold">Before You Buy</h3>
                  <p className="text-gray-300 mb-4">
                    Know what you're getting into with a property's roof before making a purchase decision.
                  </p>
                  <Button className="bg-neon-gold hover:bg-neon-gold/80 text-black font-medium">
                    Get Pre-Purchase Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/50 backdrop-blur-md border-neon-gold/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-neon-gold">Maintenance Planning</h3>
                  <p className="text-gray-300 mb-4">
                    Plan for future maintenance and budget accordingly with detailed roof information.
                  </p>
                  <Button className="bg-neon-gold hover:bg-neon-gold/80 text-black font-medium">
                    Get Maintenance Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* For Professionals Section */}
          <section className="py-12 md:py-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neon-gold to-amber-300">
              For Professionals
            </h2>
            <p className="text-lg text-center text-gray-300 mb-12 max-w-3xl mx-auto">
              Enhance your roofing business with detailed property information and analytics.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-black/50 backdrop-blur-md border-neon-gold/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-neon-gold">Contractor Dashboard</h3>
                  <p className="text-gray-300 mb-4">
                    Access comprehensive roof data for all your clients in one centralized dashboard.
                  </p>
                  <Button className="bg-neon-gold hover:bg-neon-gold/80 text-black font-medium">Pro Sign Up</Button>
                </CardContent>
              </Card>

              <Card className="bg-black/50 backdrop-blur-md border-neon-gold/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-neon-gold">Lead Generation</h3>
                  <p className="text-gray-300 mb-4">
                    Connect with homeowners in need of roofing services based on property data.
                  </p>
                  <Button className="bg-neon-gold hover:bg-neon-gold/80 text-black font-medium">Learn More</Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 md:py-24">
            <Card className="bg-gradient-to-r from-black to-gray-900 border-neon-gold">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neon-gold">
                  Ready to Get Your Roof's History?
                </h2>
                <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join thousands of homeowners and professionals who trust RoofFax for comprehensive roof information.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-neon-gold hover:bg-neon-gold/80 text-black font-medium text-lg py-6 px-8">
                    Get Started
                  </Button>
                  <Button
                    variant="outline"
                    className="border-neon-gold text-neon-gold hover:bg-neon-gold/10 text-lg py-6 px-8"
                  >
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Footer */}
          <footer className="py-8 border-t border-gray-800 mt-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-400">Powered by RoofFax™ | All rights reserved</p>
              </div>
              <div className="flex gap-6">
                <Link href="#" className="text-gray-400 hover:text-neon-gold">
                  Terms of Service
                </Link>
                <Link href="#" className="text-gray-400 hover:text-neon-gold">
                  Privacy Policy
                </Link>
                <Link href="mailto:Landon@rooffax.com" className="text-gray-400 hover:text-neon-gold">
                  Contact
                </Link>
              </div>
            </div>
          </footer>
        </div>

        {/* Admin link - remove in production */}
        <div className="fixed bottom-4 left-4 z-50 opacity-50 hover:opacity-100 transition-opacity">
          <Link href="/animation-test" className="text-xs text-gray-400 hover:text-neon-gold">
            Animation Test
          </Link>
        </div>
      </main>
    </PageClientWrapper>
  )
}
