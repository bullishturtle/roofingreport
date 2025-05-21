import { DemoSignupForm } from "@/components/demo-signup-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function DemoPage() {
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
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Experience the Full Power of <span className="text-neon-gold">RoofFax Pro</span>
            </h1>
            <p className="text-white/70 text-lg">
              Schedule a personalized demo to see how RoofFax can transform your roofing business with AI-powered
              insights, storm tracking, and automated lead generation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="flex flex-col items-start p-4 rounded-lg border border-neon-gold/20 bg-black/30">
                <h3 className="text-lg font-medium text-white mb-2">Roof Measurements</h3>
                <p className="text-sm text-white/70 mb-4">Precise measurements without climbing the roof</p>
                <Image
                  src="/images/landon-roofus-roof.png"
                  alt="Roof Measurements"
                  width={200}
                  height={150}
                  className="w-full h-auto rounded-md border border-neon-gold/20"
                />
              </div>

              <div className="flex flex-col items-start p-4 rounded-lg border border-neon-gold/20 bg-black/30">
                <h3 className="text-lg font-medium text-white mb-2">Storm Tracking</h3>
                <p className="text-sm text-white/70 mb-4">Real-time alerts for hail and wind events</p>
                <div className="w-full h-32 rounded-md border border-neon-gold/20 bg-black/50 flex items-center justify-center">
                  <span className="text-white/50">Demo Preview</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70 mt-6">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-neon-gold" />
                <span>Live Product Walkthrough</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-neon-gold" />
                <span>Custom Pricing Options</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-neon-gold" />
                <span>Q&A with Experts</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <DemoSignupForm />
          </div>
        </div>
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
    </div>
  )
}
