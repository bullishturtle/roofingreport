import { Search, Check } from "lucide-react"
import AddressInput from "@/components/address-input"
import StatsSection from "@/components/stats-section"
import HowItWorks from "@/components/how-it-works"
import Footer from "@/components/footer"
import ChatBot from "@/components/chat-bot"
import AnimatedFox from "@/components/animated-fox"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000a1f] to-[#001a45] text-white relative overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-30"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animation: `twinkle ${Math.random() * 5 + 3}s infinite ${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-yellow-500 rounded-full w-12 h-12 flex items-center justify-center text-black font-bold text-2xl">
            R
          </div>
          <div className="ml-2 text-2xl font-bold">
            Roof<span className="text-yellow-500">Fax</span>
          </div>
        </div>
        <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold px-6 py-3 rounded-full hover:from-yellow-400 hover:to-yellow-500 transition-all transform hover:scale-105 active:scale-95">
          Get Started Free
        </button>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-20">
        {/* Hero Section */}
        <section className="py-12 text-center max-w-4xl mx-auto">
          <div className="inline-block bg-yellow-500 text-black font-semibold px-6 py-2 rounded-full mb-6">
            The World&apos;s Smartest Roof & Property Report
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Trusted by Homeowners.
            <br />
            Built for Pros.
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Tired of juggling a dozen apps? RoofFax brings roof measurement, storm tracking, skip tracing, code lookups,
            proposals, and instant outreach together—guided by Roofus, built for closers.
          </p>

          {/* Address Input */}
          <AddressInput />

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold px-8 py-4 rounded-full hover:from-yellow-400 hover:to-yellow-500 transition-all transform hover:scale-105 active:scale-95">
              Start Free Trial
            </button>
            <button className="border-2 border-yellow-500 text-yellow-500 font-semibold px-8 py-4 rounded-full hover:bg-yellow-500/10 transition-all transform hover:scale-105 active:scale-95">
              See How It Works
            </button>
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-8 mt-8 text-lg">
            <div className="flex items-center">
              <Check className="text-yellow-500 mr-2" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center">
              <Check className="text-yellow-500 mr-2" />
              <span>Instant Reports</span>
            </div>
            <div className="flex items-center">
              <Check className="text-yellow-500 mr-2" />
              <span>Cancel Anytime</span>
            </div>
          </div>

          {/* 3D Viewer Placeholder */}
          <div className="mt-12 border-2 border-yellow-500 rounded-xl p-8 bg-black/30 max-w-3xl mx-auto">
            <div className="flex justify-center gap-6">
              <button className="bg-yellow-500/20 text-yellow-500 font-semibold px-6 py-3 rounded-full border border-yellow-500">
                Interactive 3D
              </button>
              <button className="text-yellow-500 font-semibold px-6 py-3 rounded-full border border-yellow-500/30">
                View Full Report
              </button>
            </div>
            <p className="mt-4 text-gray-400">Enable JavaScript to view</p>
          </div>
        </section>

        {/* Quick Links */}
        <section className="flex flex-col sm:flex-row gap-4 justify-center mt-8 mb-16">
          <button className="flex items-center justify-center gap-2 border-2 border-yellow-500 text-yellow-500 font-semibold px-8 py-4 rounded-full hover:bg-yellow-500/10 transition-all">
            <Search />
            <span>Roof Reports</span>
          </button>
          <button className="flex items-center justify-center gap-2 border-2 border-yellow-500/50 text-yellow-500/90 font-semibold px-8 py-4 rounded-full hover:bg-yellow-500/10 transition-all">
            <span>More Tools</span>
          </button>
        </section>

        {/* Stats Section */}
        <StatsSection />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Call to Action */}
        <section className="py-16 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Enter an address. Get the facts. <span className="text-yellow-500">Outsmart the storm™</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Stop wasting time on clunky apps. RoofFax does it all, so you can close more jobs, faster.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold px-8 py-4 rounded-full hover:from-yellow-400 hover:to-yellow-500 transition-all transform hover:scale-105 active:scale-95">
              Start Your Free Trial
            </button>
            <button className="border-2 border-yellow-500 text-yellow-500 font-semibold px-8 py-4 rounded-full hover:bg-yellow-500/10 transition-all transform hover:scale-105 active:scale-95">
              Schedule a Demo
            </button>
          </div>

          <p className="mt-4 text-gray-400">No credit card required. Cancel anytime.</p>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Animated Fox (Rufus) */}
      <AnimatedFox />

      {/* Chat Bot */}
      <ChatBot />
    </div>
  )
}
