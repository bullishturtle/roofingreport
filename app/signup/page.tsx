import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, X } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
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
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white text-center mb-12">
            Choose Your <span className="text-neon-gold">RoofFax</span> Plan
          </h1>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Free Plan */}
            <div className="border-2 border-white/10 bg-black/30 backdrop-blur-md rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white mb-2">Free</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">$0</span>
                  <span className="text-white/70">/month</span>
                </div>
                <p className="text-sm text-white/70 mt-2">Basic roof reports for homeowners</p>
              </div>

              <div className="p-6 space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    <span className="text-white">Basic roof assessment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    <span className="text-white">Storm history (last 12 months)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    <span className="text-white">Simple roof measurements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-5 w-5 text-white/30 mt-0.5" />
                    <span className="text-white/50">Contractor verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-5 w-5 text-white/30 mt-0.5" />
                    <span className="text-white/50">Insurance claim assistance</span>
                  </li>
                </ul>

                <Button className="w-full bg-white/10 hover:bg-white/20 text-white" asChild>
                  <Link href="/dashboard">Get Started</Link>
                </Button>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="border-2 border-neon-gold bg-black/40 backdrop-blur-md rounded-xl overflow-hidden shadow-neon-glow relative">
              <div className="absolute top-0 right-0 bg-neon-gold text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                POPULAR
              </div>

              <div className="p-6 border-b border-neon-gold/20">
                <h3 className="text-xl font-bold text-white mb-2">Premium</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-neon-gold">$29</span>
                  <span className="text-white/70">/month</span>
                </div>
                <p className="text-sm text-white/70 mt-2">Complete protection for homeowners</p>
              </div>

              <div className="p-6 space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-neon-gold mt-0.5" />
                    <span className="text-white">Everything in Free</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-neon-gold mt-0.5" />
                    <span className="text-white">Full storm history & alerts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-neon-gold mt-0.5" />
                    <span className="text-white">Detailed roof measurements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-neon-gold mt-0.5" />
                    <span className="text-white">Contractor verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-neon-gold mt-0.5" />
                    <span className="text-white">Insurance claim assistance</span>
                  </li>
                </ul>

                <Button
                  className="w-full bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black border-none shadow-neon-glow"
                  asChild
                >
                  <Link href="/dashboard">Sign Up Now</Link>
                </Button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="border-2 border-blue-500/50 bg-black/30 backdrop-blur-md rounded-xl overflow-hidden hover:border-blue-500 transition-all duration-300">
              <div className="p-6 border-b border-blue-500/20">
                <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-blue-400">$99</span>
                  <span className="text-white/70">/month</span>
                </div>
                <p className="text-sm text-white/70 mt-2">For roofing professionals & contractors</p>
              </div>

              <div className="p-6 space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                    <span className="text-white">Everything in Premium</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                    <span className="text-white">Unlimited property lookups</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                    <span className="text-white">Storm damage lead generation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                    <span className="text-white">Proposal generation tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                    <span className="text-white">CRM integration</span>
                  </li>
                </ul>

                <Button
                  className="w-full bg-blue-500/10 hover:bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-400"
                  asChild
                >
                  <Link href="/demo">Schedule Demo</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-white/70 mb-4">All plans include:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-neon-gold" />
                <span className="text-white">No credit card required for free plan</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-neon-gold" />
                <span className="text-white">Cancel anytime</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-neon-gold" />
                <span className="text-white">Email support</span>
              </div>
            </div>
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
