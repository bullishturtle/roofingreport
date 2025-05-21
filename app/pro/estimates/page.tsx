import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, CheckCircle, FileText } from "lucide-react"

export default function EstimatesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-black to-blue-950 relative overflow-hidden">
      {/* Static placeholder for stars */}
      <div className="fixed inset-0 pointer-events-none z-0 grid-bg opacity-20"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-blue-500/20 bg-black/50 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-neon-gold to-neon-orange flex items-center justify-center shadow-neon-glow">
                <span className="text-xl font-bold text-black">R</span>
              </div>
              <span className="text-xl font-bold text-white">
                Roof<span className="text-neon-gold">Fax</span>
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
              asChild
            >
              <Link href="/#pro-features">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Features
              </Link>
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-none shadow-neon-blue"
              asChild
            >
              <Link href="https://rooffaxpro.com">
                Find Out More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <Badge
                variant="outline"
                className="border-blue-500/50 text-blue-400 bg-blue-500/10 px-3 py-1 shadow-neon-blue"
              >
                Pro Feature
              </Badge>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-blue-400" />
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                    Estimates & Visual Proposals
                  </h1>
                </div>
                <p className="max-w-[900px] text-white/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Create professional, interactive proposals that win more jobs
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div>
                <div className="relative aspect-video overflow-hidden rounded-xl border-2 border-blue-500/30 bg-black/30 p-2 shadow-neon-blue mb-6">
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <Button
                      className="bg-blue-500/10 hover:bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-400"
                      asChild
                    >
                      <Link href="/demo">
                        Try Interactive Demo <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Win More Jobs with Visual Proposals</h2>
                <p className="text-white/70 mb-6">
                  RoofFax's estimate and proposal system combines accurate measurements, customizable pricing, and
                  beautiful visuals to help you create professional proposals that stand out from the competition.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-white">Custom Branded Templates</span>
                      <p className="text-sm text-white/70">
                        Personalize proposals with your company logo, colors, and contact information
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-white">Interactive Pricing Tables</span>
                      <p className="text-sm text-white/70">
                        Let customers select options and see price changes in real-time
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-white">Integrated Measurements</span>
                      <p className="text-sm text-white/70">
                        Automatically pull in accurate roof measurements from our aerial imaging system
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-white">Material Calculators</span>
                      <p className="text-sm text-white/70">
                        Automatically calculate material quantities based on roof measurements
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="space-y-8">
                <div className="border-2 border-blue-500/20 bg-black/50 backdrop-blur-sm rounded-xl overflow-hidden">
                  <div className="p-6 border-b border-blue-500/20">
                    <h3 className="text-xl font-bold text-white">Key Features</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                          <FileText className="h-4 w-4 text-blue-400" />
                        </div>
                        <div>
                          <span className="font-bold text-white">Digital Delivery</span>
                          <p className="text-sm text-white/70">
                            Send proposals via email or text message with a secure link for clients to view and approve
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                          <FileText className="h-4 w-4 text-blue-400" />
                        </div>
                        <div>
                          <span className="font-bold text-white">E-Signature Integration</span>
                          <p className="text-sm text-white/70">
                            Allow clients to sign and approve proposals directly from their device
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                          <FileText className="h-4 w-4 text-blue-400" />
                        </div>
                        <div>
                          <span className="font-bold text-white">Automated Follow-ups</span>
                          <p className="text-sm text-white/70">
                            Schedule automatic reminders for clients who haven't viewed or signed proposals
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                          <FileText className="h-4 w-4 text-blue-400" />
                        </div>
                        <div>
                          <span className="font-bold text-white">Analytics & Tracking</span>
                          <p className="text-sm text-white/70">
                            See when clients view proposals and which sections they spend the most time on
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="border-2 border-blue-500/20 bg-black/50 backdrop-blur-sm rounded-xl overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Ready to create winning proposals?</h3>
                    <p className="text-white/70 mb-6">
                      Explore the full capabilities of our Estimates & Visual Proposals system on the RoofFax Pro
                      platform.
                    </p>
                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-none shadow-neon-blue"
                      asChild
                    >
                      <Link href="https://rooffaxpro.com">
                        Find Out More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                size="lg"
                variant="outline"
                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                asChild
              >
                <Link href="/#pro-features">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Features
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-blue-500/20 py-6 md:py-0 bg-black/50 backdrop-blur-md">
        <div className="container flex flex-col gap-6 md:gap-0 md:h-24 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-neon-gold to-neon-orange flex items-center justify-center shadow-neon-glow">
              <span className="text-xl font-bold text-black">R</span>
            </div>
            <span className="text-lg font-bold text-white">
              Roof<span className="text-neon-gold">Fax</span>
            </span>
          </div>
          <p className="text-sm text-white/50">&copy; 2023 RoofFax. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
