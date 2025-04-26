import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Search, Shield, Zap } from "lucide-react"
import { HeroSearch } from "@/components/hero-search"
import { RoofusAssistant } from "@/components/roofus-assistant"
import { Animated3DCharacters } from "@/components/3d-characters/animated-3d-characters"
import { ActionBar } from "@/components/action-bar"
import { MobileActionDrawer } from "@/components/mobile-action-drawer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-black to-blue-950 relative overflow-hidden">
      {/* Animated stars background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
            }}
          />
        ))}
      </div>

      {/* 3D Animated Characters */}
      <Animated3DCharacters />

      {/* Roofus Assistant */}
      <RoofusAssistant />

      {/* Mobile Action Drawer */}
      <MobileActionDrawer />

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
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-white/80 hover:text-neon-gold transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-white/80 hover:text-neon-gold transition-colors">
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-white/80 hover:text-neon-gold transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-white/80 hover:text-neon-gold transition-colors"
            >
              Dashboard
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-white/80 hover:text-neon-gold transition-colors hidden sm:inline-block"
            >
              Sign In
            </Link>
            <Button className="bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black border-none shadow-neon-glow">
              <Link href="/signup">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          {/* Background grid effect */}
          <div className="absolute inset-0 grid-bg opacity-20"></div>

          {/* Animated gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-gold/10 blur-[100px] animate-float"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-orange/10 blur-[100px] animate-float"
            style={{ animationDelay: "1s" }}
          ></div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="inline-flex bg-gradient-to-r from-neon-gold to-neon-orange text-black border-none px-3 py-1 shadow-neon-glow">
                    The World's Smartest Roof & Property Report
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-gold to-neon-orange">
                      Trusted by Homeowners.
                    </span>{" "}
                    <br />
                    Built for Pros.
                  </h1>
                  <p className="max-w-[600px] text-white/70 md:text-xl">
                    Tired of juggling a dozen apps? RoofFax brings roof measurement, storm tracking, skip tracing, code
                    lookups, proposals, and instant outreach together—guided by Roofus, built for closers.
                  </p>
                </div>
                <HeroSearch />
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black border-none shadow-neon-glow"
                  >
                    <Link href="/signup">Start Free Trial</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-neon-gold/30 text-neon-gold hover:bg-neon-gold/10"
                  >
                    <Link href="#how-it-works">See How It Works</Link>
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-neon-gold" />
                    <span>No Credit Card Required</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-neon-gold" />
                    <span>Instant Reports</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-neon-gold" />
                    <span>Cancel Anytime</span>
                  </div>
                </div>
              </div>
              <div className="relative mx-auto aspect-video overflow-hidden rounded-xl border-2 border-neon-gold/30 bg-black/30 p-2 shadow-neon-glow lg:order-last">
                <Image
                  src="/images/landon-roofus-roof.png"
                  width={550}
                  height={550}
                  alt="RoofFax Dashboard Preview"
                  className="w-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex items-end">
                  <div className="w-full">
                    <div className="mb-2 flex items-center justify-between">
                      <Badge variant="outline" className="bg-black/80 backdrop-blur border-neon-gold/30 text-neon-gold">
                        Live Demo
                      </Badge>
                      <Button
                        size="sm"
                        className="gap-1 bg-neon-gold/10 hover:bg-neon-gold/20 backdrop-blur-sm border border-neon-gold/30 text-neon-gold"
                      >
                        Try Now <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Action Bar */}
        <ActionBar />

        {/* Stats Section */}
        <section className="w-full py-12 md:py-16 lg:py-20 border-y border-neon-gold/20 bg-black/30">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
              <div className="flex flex-col items-center justify-center space-y-2 text-center p-4 rounded-lg border-2 border-neon-gold/20 bg-black/50 backdrop-blur-sm shadow-neon-glow">
                <div className="text-3xl font-bold md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-neon-gold to-neon-orange">
                  3.5M+
                </div>
                <div className="text-sm font-medium text-white/70">Roofs Analyzed</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 text-center p-4 rounded-lg border-2 border-neon-gold/20 bg-black/50 backdrop-blur-sm shadow-neon-glow">
                <div className="text-3xl font-bold md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-neon-gold to-neon-orange">
                  15K+
                </div>
                <div className="text-sm font-medium text-white/70">Active Contractors</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 text-center p-4 rounded-lg border-2 border-neon-gold/20 bg-black/50 backdrop-blur-sm shadow-neon-glow">
                <div className="text-3xl font-bold md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-neon-gold to-neon-orange">
                  98%
                </div>
                <div className="text-sm font-medium text-white/70">Accuracy Rate</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 text-center p-4 rounded-lg border-2 border-neon-gold/20 bg-black/50 backdrop-blur-sm shadow-neon-glow">
                <div className="text-3xl font-bold md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-neon-gold to-neon-orange">
                  2.5X
                </div>
                <div className="text-sm font-medium text-white/70">Close Rate Increase</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="absolute inset-0 grid-bg opacity-20"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge
                  variant="outline"
                  className="border-neon-gold/50 text-neon-gold bg-neon-gold/10 px-3 py-1 shadow-neon-glow"
                >
                  Simple Process
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  How RoofFax Works
                </h2>
                <p className="max-w-[900px] text-white/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get comprehensive roof reports in seconds, not hours or days like our competitors.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 text-center p-6 rounded-xl border-2 border-neon-gold/20 bg-black/50 backdrop-blur-sm shadow-neon-glow">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neon-gold/20 text-neon-gold mb-2">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-white">1. Enter Address</h3>
                <p className="text-white/70">
                  Simply enter any property address to get started. Our system will locate the property instantly.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center p-6 rounded-xl border-2 border-neon-gold/20 bg-black/50 backdrop-blur-sm shadow-neon-glow">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neon-gold/20 text-neon-gold mb-2">
                  <Zap className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-white">2. Instant Analysis</h3>
                <p className="text-white/70">
                  Our AI analyzes satellite imagery, property data, and historical records in seconds.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center p-6 rounded-xl border-2 border-neon-gold/20 bg-black/50 backdrop-blur-sm shadow-neon-glow">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neon-gold/20 text-neon-gold mb-2">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-white">3. Get Your Report</h3>
                <p className="text-white/70">
                  Receive a comprehensive roof report with measurements, condition assessment, and actionable insights.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-black to-blue-950/80 border-y border-neon-gold/20 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-10"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-gold/10 blur-[100px] animate-float"></div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Enter an address. Get the facts. <span className="text-neon-gold">Outsmart the storm™</span>
                </h2>
                <p className="max-w-[900px] text-white/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Stop wasting time on clunky apps. RoofFax does it all, so you can close more jobs, faster.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black border-none shadow-neon-glow"
                >
                  <Link href="/signup">Start Your Free Trial</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-neon-gold/30 text-neon-gold hover:bg-neon-gold/10"
                >
                  <Link href="/demo">Schedule a Demo</Link>
                </Button>
              </div>
              <p className="text-sm text-white/50">No credit card required. Cancel anytime.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-neon-gold/20 py-6 md:py-0 bg-black/50 backdrop-blur-md">
        <div className="container flex flex-col gap-6 md:gap-0 md:h-24 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-neon-gold to-neon-orange flex items-center justify-center shadow-neon-glow">
              <span className="text-xl font-bold text-black">R</span>
            </div>
            <span className="text-lg font-bold text-white">
              Roof<span className="text-neon-gold">Fax</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-4 md:gap-6">
            <Link href="/about" className="text-sm text-white/50 hover:text-neon-gold transition-colors">
              About
            </Link>
            <Link href="/features" className="text-sm text-white/50 hover:text-neon-gold transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-sm text-white/50 hover:text-neon-gold transition-colors">
              Pricing
            </Link>
            <Link href="/blog" className="text-sm text-white/50 hover:text-neon-gold transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-sm text-white/50 hover:text-neon-gold transition-colors">
              Contact
            </Link>
            <Link href="/privacy" className="text-sm text-white/50 hover:text-neon-gold transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-white/50 hover:text-neon-gold transition-colors">
              Terms
            </Link>
          </div>
          <p className="text-sm text-white/50">&copy; {new Date().getFullYear()} RoofFax. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
