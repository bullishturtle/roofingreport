import Image from "next/image"
import Link from "next/link"
import { AddressForm } from "@/components/address-form"
import { RoofusViewer } from "@/components/roofus-viewer"
import { SpaceAnimation } from "@/components/space-animation"
import { Features } from "@/components/features"
import { Footer } from "@/components/footer"
import { Shield, Rocket, FileText } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050A1F] text-white overflow-hidden">
      {/* Space background with stars */}
      <div className="absolute inset-0 z-0">
        <SpaceAnimation />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-4 md:p-6">
        <div className="flex items-center">
          <div className="bg-yellow-500 rounded-full h-12 w-12 flex items-center justify-center text-black font-bold text-2xl">
            R
          </div>
          <div className="ml-2 text-2xl font-bold">
            Roof<span className="text-yellow-500">Fax</span>
          </div>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link href="#" className="hover:text-yellow-500 transition-colors">
            About
          </Link>
          <Link href="#" className="hover:text-yellow-500 transition-colors">
            Features
          </Link>
          <Link href="#" className="hover:text-yellow-500 transition-colors">
            Pricing
          </Link>
          <Link href="#" className="hover:text-yellow-500 transition-colors">
            Blog
          </Link>
          <Link href="#" className="hover:text-yellow-500 transition-colors">
            Contact
          </Link>
        </nav>
        <div className="flex space-x-4">
          <Link
            href="https://trustthefox.com"
            className="px-4 py-2 bg-transparent border border-yellow-500 text-yellow-500 rounded-md hover:bg-yellow-500 hover:text-black transition-colors"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero Section with Space Narrative */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-12 md:py-24">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl">
          Lost in the <span className="text-yellow-500">Vast Universe</span> of Roof Data?
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
          Discover the coordinates to your perfect roof solution. Roofus found the way home, and now he's here to guide
          you.
        </p>
        <div className="w-full max-w-md mb-12">
          <AddressForm />
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <Link
            href="#"
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-md hover:from-yellow-600 hover:to-yellow-700 transition-colors"
          >
            Start Your Free Trial
          </Link>
          <Link
            href="#"
            className="px-6 py-3 bg-transparent border border-white text-white rounded-md hover:bg-white/10 transition-colors"
          >
            Schedule a Demo
          </Link>
        </div>
        <p className="mt-4 text-sm text-gray-400">No credit card required. Cancel anytime.</p>
      </section>

      {/* Space Journey Narrative */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                The <span className="text-yellow-500">Cosmic Discovery</span>
              </h2>
              <p className="text-gray-300">
                Lost in the endless void of space, searching for answers about their home, they discovered a mysterious
                package floating among the stars. Inside was RoofFax - the exact coordinates to their property and the
                key to finding their way back.
              </p>
              <p className="text-gray-300">
                Now, Roofus is on a mission to help everyone navigate the universe of roof data, providing precise
                measurements, condition assessments, and actionable insights.
              </p>
            </div>
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden border-2 border-yellow-500/50">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10"></div>
              <Image src="/vast-space-scene.png" alt="Space journey" fill className="object-cover" />
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <p className="text-lg font-semibold">Roofus discovered the coordinates home</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Roofus Section */}
      <section className="relative z-10 py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Meet <span className="text-yellow-500">Roofus</span> in 3D
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Interact with our canine appraiser in full 3D. Rotate, zoom, and see different animations!
            </p>
          </div>

          <RoofusViewer />

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-300">
              Roofus is equipped with the latest space-age technology to analyze your roof and provide accurate reports.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              How RoofFax <span className="text-yellow-500">Works</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Three simple steps to get comprehensive roof insights
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black/30 p-6 rounded-lg border border-gray-800 text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Enter Address</h3>
              <p className="text-gray-300">Simply enter your property address to begin the cosmic journey.</p>
            </div>

            <div className="bg-black/30 p-6 rounded-lg border border-gray-800 text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. AI Analysis</h3>
              <p className="text-gray-300">Our space-age AI technology analyzes satellite imagery of your roof.</p>
            </div>

            <div className="bg-black/30 p-6 rounded-lg border border-gray-800 text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Get Your Report</h3>
              <p className="text-gray-300">
                Receive a comprehensive roof report with measurements, condition assessment, and actionable insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16 px-4 bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Enter an address. Get the facts.
            <br />
            <span className="text-yellow-500">Outsmart the storm™</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Stop wasting time on clunky apps. RoofFax does it all, so you can close more jobs, faster.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              href="#"
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-md hover:from-yellow-600 hover:to-yellow-700 transition-colors text-lg"
            >
              Start Your Free Trial
            </Link>
            <Link
              href="#"
              className="px-8 py-4 bg-transparent border border-white text-white rounded-md hover:bg-white/10 transition-colors text-lg"
            >
              Schedule a Demo
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-400">No credit card required. Cancel anytime.</p>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Footer */}
      <Footer />
    </div>
  )
}
