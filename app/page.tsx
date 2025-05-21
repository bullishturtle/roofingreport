"use client"

import { useState } from "react"
import PageClientWrapper from "@/components/client-wrappers/page-client-wrapper"
import { HeroSearchWrapper } from "@/components/client-wrappers/hero-search-wrapper"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

export default function Page() {
  const [showAbout, setShowAbout] = useState(false)

  const scrollToAbout = () => {
    setShowAbout(true)
    setTimeout(() => {
      document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  return (
    <PageClientWrapper>
      <main className="flex min-h-screen flex-col items-center justify-between">
        {/* Hero Section */}
        <section className="w-full min-h-screen flex flex-col items-center justify-center p-6 md:p-24 relative">
          <HeroSearchWrapper />

          <div className="mt-12 flex flex-col md:flex-row gap-4 w-full max-w-4xl mx-auto">
            <Button
              onClick={scrollToAbout}
              className="bg-neon-gold hover:bg-neon-gold/80 text-black font-medium flex-1"
            >
              Do you just want a 1-time report?
            </Button>
            <Button
              onClick={scrollToAbout}
              className="bg-neon-gold hover:bg-neon-gold/80 text-black font-medium flex-1"
            >
              Are our tools of continuous use to you?
            </Button>
          </div>

          <div className="mt-8 flex flex-col md:flex-row gap-4 w-full max-w-4xl mx-auto">
            <Link href="/signup" className="flex-1">
              <Button variant="outline" className="w-full border-neon-gold text-neon-gold hover:bg-neon-gold/10">
                Sign Up
              </Button>
            </Link>
            <Link href="/dashboard" className="flex-1">
              <Button variant="outline" className="w-full border-neon-gold text-neon-gold hover:bg-neon-gold/10">
                Access Dashboard
              </Button>
            </Link>
          </div>
        </section>

        {/* About Section */}
        {showAbout && (
          <section id="about-section" className="w-full py-16 px-6 md:px-24 bg-black/50">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-neon-gold to-amber-300">
                Choose Your RoofFax Experience
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* One-time Report Option */}
                <div className="bg-black/50 backdrop-blur-md border border-neon-gold/30 rounded-lg p-6">
                  <h3 className="text-2xl font-bold mb-4 text-neon-gold">One-Time Roof Report</h3>
                  <p className="text-gray-300 mb-6">
                    Get a comprehensive one-time report about any roof. Perfect for homebuyers, sellers, or anyone
                    needing detailed roof information.
                  </p>
                  <ul className="space-y-2 mb-8">
                    <li className="flex items-start">
                      <span className="text-neon-gold mr-2">✓</span>
                      <span className="text-gray-300">Detailed roof history</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-neon-gold mr-2">✓</span>
                      <span className="text-gray-300">Material analysis</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-neon-gold mr-2">✓</span>
                      <span className="text-gray-300">Damage assessment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-neon-gold mr-2">✓</span>
                      <span className="text-gray-300">Estimated lifespan</span>
                    </li>
                  </ul>
                  <Link href="https://trustthefox.com" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-neon-gold hover:bg-neon-gold/80 text-black font-medium">
                      Get One-Time Report <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                {/* Continuous Tools Option */}
                <div className="bg-black/50 backdrop-blur-md border border-neon-gold/30 rounded-lg p-6">
                  <h3 className="text-2xl font-bold mb-4 text-neon-gold">Professional Roof Tools</h3>
                  <p className="text-gray-300 mb-6">
                    Access our complete suite of professional roofing tools. Ideal for contractors, inspectors, and
                    property managers.
                  </p>
                  <ul className="space-y-2 mb-8">
                    <li className="flex items-start">
                      <span className="text-neon-gold mr-2">✓</span>
                      <span className="text-gray-300">All features of one-time reports</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-neon-gold mr-2">✓</span>
                      <span className="text-gray-300">Client management dashboard</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-neon-gold mr-2">✓</span>
                      <span className="text-gray-300">Lead generation tools</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-neon-gold mr-2">✓</span>
                      <span className="text-gray-300">Advanced analytics</span>
                    </li>
                  </ul>
                  <Link href="https://rooffaxpro.com" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-neon-gold hover:bg-neon-gold/80 text-black font-medium">
                      Access Pro Tools <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="mt-12 text-center">
                <p className="text-gray-400 mb-4">Not sure which option is right for you?</p>
                <Button
                  variant="outline"
                  className="border-neon-gold text-neon-gold hover:bg-neon-gold/10"
                  onClick={() => {
                    document.getElementById("hero-search")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Contact Us For Help
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="w-full py-8 border-t border-gray-800 px-6 md:px-24">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
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
