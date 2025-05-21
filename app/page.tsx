import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Home, Building2 } from "lucide-react"
import { HomeownerFeatures } from "@/components/homeowner-features"
import { ProFeatures } from "@/components/pro-features"
import { Toaster } from "@/components/ui/toaster"
import PageClientWrapper from "@/components/client-wrappers/page-client-wrapper"
import HeroSearchClientWrapper from "@/components/client-wrappers/hero-search-client-wrapper"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-black to-blue-950 relative overflow-hidden">
      {/* Static placeholder for stars - will be replaced by client component */}
      <div className="fixed inset-0 pointer-events-none z-0">{/* Client-side stars will be rendered here */}</div>

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
            <Link
              href="#homeowner-features"
              className="text-sm font-medium text-white/80 hover:text-neon-gold transition-colors"
            >
              For Homeowners
            </Link>
            <Link
              href="#pro-features"
              className="text-sm font-medium text-white/80 hover:text-neon-gold transition-colors"
            >
              For Professionals
            </Link>
            <Link href="#demo" className="text-sm font-medium text-white/80 hover:text-neon-gold transition-colors">
              Demo
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
              <Link href="#user-type">Get Started</Link>
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
                    Like CarFax, But For Your Roof
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-gold to-neon-orange">
                      Know Your Roof.
                    </span>{" "}
                    <br />
                    Make Smart Decisions.
                  </h1>
                  <p className="max-w-[600px] text-white/70 md:text-xl">
                    Whether you're a homeowner looking for roof information or a professional needing powerful tools,
                    RoofFax gives you the facts you need.
                  </p>
                </div>
                <div className="w-full max-w-md">
                  <HeroSearchClientWrapper />
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black border-none shadow-neon-glow"
                  >
                    <Link href="#user-type">Get Started</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-neon-gold/30 text-neon-gold hover:bg-neon-gold/10"
                  >
                    <Link href="#demo">See Demo</Link>
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
                    <span>Trusted by Professionals</span>
                  </div>
                </div>
              </div>
              <div className="relative mx-auto aspect-video overflow-hidden rounded-xl border-2 border-neon-gold/30 bg-black/30 p-2 shadow-neon-glow lg:order-last">
                <Image
                  src="/images/landon-roofus-roof.png"
                  width={550}
                  height={550}
                  alt="RoofFax Report Preview"
                  className="w-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex items-end">
                  <div className="w-full">
                    <div className="mb-2 flex items-center justify-between">
                      <Badge variant="outline" className="bg-black/80 backdrop-blur border-neon-gold/30 text-neon-gold">
                        Sample Report
                      </Badge>
                      <Button
                        size="sm"
                        className="gap-1 bg-neon-gold/10 hover:bg-neon-gold/20 backdrop-blur-sm border border-neon-gold/30 text-neon-gold"
                        asChild
                      >
                        <Link href="/report?address=123%20Main%20St%2C%20Anytown%2C%20USA">
                          See Sample Report <ArrowRight className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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

        {/* Homeowner Features Section */}
        <HomeownerFeatures />

        {/* Pro Features Section */}
        <ProFeatures />

        {/* User Type Router Section */}
        <section
          id="user-type"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-black to-blue-950/80 border-y border-neon-gold/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 grid-bg opacity-10"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-gold/10 blur-[100px] animate-float"></div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Get Started with <span className="text-neon-gold">RoofFax</span>
                </h2>
                <p className="max-w-[900px] text-white/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the experience that's right for you
                </p>
              </div>
            </div>

            <div className="w-full max-w-4xl mx-auto py-12">
              <h2 className="text-2xl font-bold text-white text-center mb-8">I am a...</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Homeowner Card */}
                <div className="cursor-pointer border-2 border-white/10 bg-white/5 hover:border-neon-gold/50 hover:bg-neon-gold/5 backdrop-blur-sm transition-all duration-300 rounded-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Home className="h-5 w-5 text-neon-gold" />
                      <h3 className="text-xl font-bold text-white">Homeowner</h3>
                    </div>
                    <p className="text-white/70 mb-4">
                      Get your free roof report and connect with trusted professionals
                    </p>
                    <ul className="space-y-2 text-sm text-white/70 mb-6">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-neon-gold flex-shrink-0" />
                        <span>Free basic roof assessment</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-neon-gold flex-shrink-0" />
                        <span>Proactive storm damage alerts</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-neon-gold flex-shrink-0" />
                        <span>Connect with verified contractors</span>
                      </li>
                    </ul>
                    <div className="flex gap-2">
                      <Button
                        className="flex-1 bg-neon-gold/10 hover:bg-neon-gold/20 backdrop-blur-sm border border-neon-gold/30 text-neon-gold"
                        asChild
                      >
                        <Link href="/report?address=123%20Main%20St%2C%20Anytown%2C%20USA">View Sample Report</Link>
                      </Button>
                      <Button
                        className="flex-1 bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black border-none shadow-neon-glow"
                        asChild
                      >
                        <Link href="https://trustthefox.com">
                          Find Out More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Professional Card */}
                <div className="cursor-pointer border-2 border-white/10 bg-white/5 hover:border-blue-500/50 hover:bg-blue-500/5 backdrop-blur-sm transition-all duration-300 rounded-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="h-5 w-5 text-blue-400" />
                      <h3 className="text-xl font-bold text-white">Roofing Professional</h3>
                    </div>
                    <p className="text-white/70 mb-4">All your essential roofing tools in one powerful platform</p>
                    <ul className="space-y-2 text-sm text-white/70 mb-6">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0" />
                        <span>Visual proposals with integrated measurements</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0" />
                        <span>Real-time storm tracking and lead generation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0" />
                        <span>Complete CRM with finance integrations</span>
                      </li>
                    </ul>
                    <div className="flex gap-2">
                      <Button
                        className="flex-1 bg-blue-500/10 hover:bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-400"
                        asChild
                      >
                        <Link href="/demo">See Demo</Link>
                      </Button>
                      <Button
                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-none shadow-neon-blue"
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
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="absolute inset-0 grid-bg opacity-20"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <Badge
                  variant="outline"
                  className="border-neon-gold/50 text-neon-gold bg-neon-gold/10 px-3 py-1 shadow-neon-glow"
                >
                  Try It Out
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Experience RoofFax
                </h2>
                <p className="max-w-[900px] text-white/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See how RoofFax can work for you with our interactive demos
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-2 border-neon-gold/20 bg-black/50 backdrop-blur-sm shadow-neon-glow rounded-xl overflow-hidden">
                <div className="p-6 border-b border-neon-gold/20">
                  <h3 className="text-2xl font-bold text-white">Homeowner Demo</h3>
                  <p className="text-white/70 mt-2">
                    See what information is available in our comprehensive roof reports
                  </p>
                </div>
                <div className="p-6">
                  <div className="aspect-video bg-black/30 rounded-lg border border-neon-gold/20 mb-6 overflow-hidden relative">
                    <Image
                      src="/images/landon-roofus-roof.png"
                      alt="Homeowner Demo"
                      width={600}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Button
                        className="bg-neon-gold/10 hover:bg-neon-gold/20 backdrop-blur-sm border border-neon-gold/30 text-neon-gold"
                        asChild
                      >
                        <Link href="/report?address=123%20Main%20St%2C%20Anytown%2C%20USA">
                          View Sample Report <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black border-none shadow-neon-glow"
                    asChild
                  >
                    <Link href="https://trustthefox.com">Learn More About Homeowner Features</Link>
                  </Button>
                </div>
              </div>

              <div className="border-2 border-blue-500/20 bg-black/50 backdrop-blur-sm shadow-neon-blue rounded-xl overflow-hidden">
                <div className="p-6 border-b border-blue-500/20">
                  <h3 className="text-2xl font-bold text-white">Professional Demo</h3>
                  <p className="text-white/70 mt-2">Explore our all-in-one platform for roofing professionals</p>
                </div>
                <div className="p-6">
                  <div className="aspect-video bg-black/30 rounded-lg border border-blue-500/20 mb-6 overflow-hidden relative">
                    <Image
                      src="/images/thomas-roofus-roof.png"
                      alt="Professional Demo"
                      width={600}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
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
                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-none shadow-neon-blue"
                    asChild
                  >
                    <Link href="https://rooffaxpro.com">Learn More About Professional Features</Link>
                  </Button>
                </div>
              </div>
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
          <p className="text-sm text-white/50">&copy; 2023 RoofFax. All rights reserved.</p>
        </div>
      </footer>

      {/* Client-side components */}
      <PageClientWrapper />

      {/* Add Toaster for notifications */}
      <Toaster />
    </div>
  )
}
