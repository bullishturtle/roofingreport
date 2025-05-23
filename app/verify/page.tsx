import { DoorKnockerVerification } from "@/components/door-knocker-verification"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, AlertTriangle } from "lucide-react"

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black to-blue-950">
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
          <Button variant="outline" size="sm" className="border-neon-gold/30 text-neon-gold hover:bg-neon-gold/10">
            <Link href="/" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 container py-12">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center justify-center p-1 px-3 mb-4 rounded-full bg-red-500/20 border border-red-500/30">
            <AlertTriangle className="h-4 w-4 text-red-400 mr-1" />
            <span className="text-sm text-red-400">Storm Season Alert</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Verify Who's At Your Door</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Storm chasers and scammers often target homeowners after severe weather. Use our verification tool to check
            if the contractor at your door is legitimate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-neon-gold" />
              <h2 className="text-xl font-bold text-white">Contractor Verification</h2>
            </div>
            <p className="text-white/70">
              Enter the name, company, or license number of the contractor at your door to instantly verify their
              credentials and see if they have any complaints or warnings.
            </p>
            <div className="bg-black/30 backdrop-blur-sm border border-neon-gold/20 rounded-lg p-6">
              <DoorKnockerVerification />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-6 w-6 text-neon-gold" />
              <h2 className="text-xl font-bold text-white">Warning Signs</h2>
            </div>

            <div className="bg-black/30 backdrop-blur-sm border border-neon-gold/20 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-4">Red Flags to Watch For:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-500 mt-2"></span>
                  <p className="text-white/70">
                    <span className="text-white font-medium">Pressure tactics:</span> Contractors who push you to sign
                    immediately or claim "today only" deals
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-500 mt-2"></span>
                  <p className="text-white/70">
                    <span className="text-white font-medium">No local presence:</span> Out-of-state license plates or no
                    verifiable local business address
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-500 mt-2"></span>
                  <p className="text-white/70">
                    <span className="text-white font-medium">Upfront payment:</span> Demanding large deposits or full
                    payment before work begins
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-500 mt-2"></span>
                  <p className="text-white/70">
                    <span className="text-white font-medium">No written contract:</span> Unwilling to provide detailed
                    written estimates or contracts
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-500 mt-2"></span>
                  <p className="text-white/70">
                    <span className="text-white font-medium">Insurance claims handling:</span> Offering to pay your
                    deductible or "handle" the insurance claim for you
                  </p>
                </li>
              </ul>
            </div>

            <div className="bg-black/30 backdrop-blur-sm border border-neon-gold/20 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-4">What to Do:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500 mt-2"></span>
                  <p className="text-white/70">
                    <span className="text-white font-medium">Verify identity:</span> Ask for business cards and photo ID
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500 mt-2"></span>
                  <p className="text-white/70">
                    <span className="text-white font-medium">Check credentials:</span> Use our verification tool to
                    confirm their legitimacy
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500 mt-2"></span>
                  <p className="text-white/70">
                    <span className="text-white font-medium">Get multiple quotes:</span> Never sign with the first
                    contractor who approaches you
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500 mt-2"></span>
                  <p className="text-white/70">
                    <span className="text-white font-medium">Report suspicious activity:</span> Contact local
                    authorities if you feel pressured or threatened
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-black/50 backdrop-blur-md border-2 border-neon-gold/30 rounded-xl p-6 md:p-8 shadow-neon-glow max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-4 text-center">Need More Protection?</h3>
          <p className="text-white/70 mb-6 text-center">
            Sign up for TrustTheFox to get comprehensive contractor verification, storm damage assessments, and
            personalized property protection plans.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black shadow-neon-glow">
              <Link href="https://trustthefox.com">Visit TrustTheFox.com</Link>
            </Button>
            <Button variant="outline" className="border-neon-gold/30 text-neon-gold hover:bg-neon-gold/10">
              <Link href="/signup">Create Free Account</Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="w-full border-t border-neon-gold/20 py-6 bg-black/50 backdrop-blur-md">
        <div className="container text-center">
          <p className="text-white/50 text-sm">Powered by RoofFax™ | All rights reserved 2025</p>
          <div className="mt-1">
            <Link href="/terms" className="text-neon-gold/70 hover:text-neon-gold text-xs mx-2">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-neon-gold/70 hover:text-neon-gold text-xs mx-2">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
