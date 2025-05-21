"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, Building2 } from "lucide-react"
import Link from "next/link"
import { ReportPreview } from "@/components/report-preview"
import { Toaster } from "@/components/ui/toaster"

export default function ReportPage() {
  const searchParams = useSearchParams()
  const address = searchParams.get("address") || "123 Main St, Anytown, USA"
  const [isLoading, setIsLoading] = useState(true)
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleRedirect = (type: "homeowner" | "pro") => {
    setIsRedirecting(true)

    // Simulate redirect delay
    setTimeout(() => {
      // INTEGRATION_POINT: Redirect to appropriate portal
      if (type === "homeowner") {
        // Will redirect to trustthefox.com
        console.log("Redirecting to trustthefox.com")
        window.location.href = "https://trustthefox.com"
      } else {
        // Will redirect to rooffaxpro.com
        console.log("Redirecting to rooffaxpro.com")
        window.location.href = "https://rooffaxpro.com"
      }
    }, 500)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-black to-blue-950 relative overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 grid-bg opacity-20"></div>

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-gold/10 blur-[100px] animate-float"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-orange/10 blur-[100px] animate-float"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-neon-gold/20 bg-black/50 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-neon-gold to-neon-orange flex items-center justify-center shadow-neon-glow">
              <span className="text-xl font-bold text-black">R</span>
            </div>
            <span className="text-xl font-bold text-white">
              Roof<span className="text-neon-gold">Fax</span>
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="border-neon-gold/30 text-neon-gold hover:bg-neon-gold/10"
          >
            <Link href="/" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 container py-12">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-16 h-16 border-4 border-neon-gold/30 border-t-neon-gold rounded-full animate-spin mb-4"></div>
            <p className="text-white/70">Generating your RoofFax report...</p>
          </div>
        ) : (
          <div className="space-y-12">
            <ReportPreview address={address} onClose={() => {}} />

            <div className="border-t border-neon-gold/20 pt-12">
              <h2 className="text-2xl font-bold text-white text-center mb-8">Want More Detailed Insights?</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="border-2 border-neon-gold/30 bg-black/50 backdrop-blur-md rounded-xl p-6 text-center">
                  <div className="h-16 w-16 rounded-full bg-neon-gold/20 flex items-center justify-center mx-auto mb-4">
                    <Home className="h-8 w-8 text-neon-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">I'm a Homeowner</h3>
                  <p className="text-white/70 mb-6">
                    Get a complete roof assessment, receive proactive storm alerts, and protect your home before damage
                    occurs.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-neon-gold/10 hover:bg-neon-gold/20 backdrop-blur-sm border border-neon-gold/30 text-neon-gold"
                      asChild
                    >
                      <Link href="/signup">Sign Up Free</Link>
                    </Button>
                    <Button
                      className="flex-1 bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black border-none shadow-neon-glow"
                      onClick={() => handleRedirect("homeowner")}
                      disabled={isRedirecting}
                    >
                      {isRedirecting ? "Redirecting..." : "Go to TrustTheFox"}
                    </Button>
                  </div>
                </div>

                <div className="border-2 border-blue-500/30 bg-black/50 backdrop-blur-md rounded-xl p-6 text-center">
                  <div className="h-16 w-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">I'm a Roofing Pro</h3>
                  <p className="text-white/70 mb-6">
                    Access detailed measurements, get early access to storm-affected areas, and be the first to offer
                    services.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-blue-500/10 hover:bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-400"
                      asChild
                    >
                      <Link href="/demo">See Demo</Link>
                    </Button>
                    <Button
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-none shadow-neon-blue"
                      onClick={() => handleRedirect("pro")}
                      disabled={isRedirecting}
                    >
                      {isRedirecting ? "Redirecting..." : "Go to RoofFaxPro"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-neon-gold/20 py-6 bg-black/50 backdrop-blur-md">
        <div className="container flex flex-col gap-6 md:gap-0 md:h-16 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-neon-gold to-neon-orange flex items-center justify-center shadow-neon-glow">
              <span className="text-sm font-bold text-black">R</span>
            </div>
            <span className="text-sm font-bold text-white">
              Roof<span className="text-neon-gold">Fax</span>
            </span>
          </div>
          <p className="text-sm text-white/50">&copy; 2023 RoofFax. All rights reserved.</p>
        </div>
      </footer>

      <Toaster />
    </div>
  )
}
