"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"

export function CTASection() {
  const isMobile = useIsMobile()

  return (
    <section className="py-12 md:py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Your Comprehensive Roof Report?</h2>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            Join thousands of homeowners who trust RoofFax for accurate roof assessments and maintenance
            recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#search">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-medium text-base px-8">
                Get Your Report
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-blue-700 font-medium text-base px-8"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
