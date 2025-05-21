"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, Building2, ArrowRight, Check } from "lucide-react"
import Link from "next/link"

export function UserTypeRouter() {
  const [selectedType, setSelectedType] = useState<"homeowner" | "pro" | null>(null)
  const [isRedirecting, setIsRedirecting] = useState(false)

  const handleSelection = (type: "homeowner" | "pro") => {
    setSelectedType(type)
  }

  const handleRedirect = (type: "homeowner" | "pro") => {
    setIsRedirecting(true)

    // Simulate redirect delay
    setTimeout(() => {
      // Redirect to appropriate portal
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
    <div className="w-full max-w-4xl mx-auto py-12">
      <h2 className="text-2xl font-bold text-white text-center mb-8">I am a...</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className={`cursor-pointer border-2 ${
            selectedType === "homeowner"
              ? "border-neon-gold bg-neon-gold/10"
              : "border-white/10 bg-white/5 hover:border-neon-gold/50 hover:bg-neon-gold/5"
          } backdrop-blur-sm transition-all duration-300 rounded-lg overflow-hidden`}
          onClick={() => handleSelection("homeowner")}
        >
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Home className="h-5 w-5 text-neon-gold" />
              <h3 className="text-xl font-bold text-white">Homeowner</h3>
            </div>
            <p className="text-white/70 mb-4">Get your free roof report and connect with trusted professionals</p>
            <ul className="space-y-2 text-sm text-white/70 mb-6">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-neon-gold flex-shrink-0" />
                <span>Free basic roof assessment</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-neon-gold flex-shrink-0" />
                <span>Proactive storm damage alerts</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-neon-gold flex-shrink-0" />
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
                onClick={() => handleRedirect("homeowner")}
                disabled={isRedirecting}
              >
                {isRedirecting && selectedType === "homeowner" ? "Redirecting..." : "Go to Portal"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div
          className={`cursor-pointer border-2 ${
            selectedType === "pro"
              ? "border-blue-500 bg-blue-500/10"
              : "border-white/10 bg-white/5 hover:border-blue-500/50 hover:bg-blue-500/5"
          } backdrop-blur-sm transition-all duration-300 rounded-lg overflow-hidden`}
          onClick={() => handleSelection("pro")}
        >
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="h-5 w-5 text-blue-400" />
              <h3 className="text-xl font-bold text-white">Roofing Professional</h3>
            </div>
            <p className="text-white/70 mb-4">All your essential roofing tools in one powerful platform</p>
            <ul className="space-y-2 text-sm text-white/70 mb-6">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span>Visual proposals with integrated measurements</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span>Real-time storm tracking and lead generation</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-400 flex-shrink-0" />
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
                onClick={() => handleRedirect("pro")}
                disabled={isRedirecting}
              >
                {isRedirecting && selectedType === "pro" ? "Redirecting..." : "Try Pro Features"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
