"use client"

import { Badge } from "@/components/ui/badge"
import { Search, CloudLightning, FileText, Zap, Users, PenTool, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 relative">
      <div className="absolute inset-0 grid-bg opacity-20"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge
              variant="outline"
              className="border-neon-gold/50 text-neon-gold bg-neon-gold/10 px-3 py-1 shadow-neon-glow"
            >
              Streamlined Workflow
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              How RoofFax Works for Pros
            </h2>
            <p className="max-w-[900px] text-white/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A complete end-to-end solution for your roofing business
            </p>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 text-center p-6 rounded-xl border-2 border-neon-gold/20 bg-black/50 backdrop-blur-sm shadow-neon-glow">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neon-gold/20 text-neon-gold mb-2">
              <Search className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white">1. Find Opportunities</h3>
            <p className="text-white/70">
              Use storm tracking to identify damaged properties and skip tracing to find owner contact information
              instantly.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2 text-center p-6 rounded-xl border-2 border-neon-gold/20 bg-black/50 backdrop-blur-sm shadow-neon-glow">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neon-gold/20 text-neon-gold mb-2">
              <FileText className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white">2. Win More Jobs</h3>
            <p className="text-white/70">
              Create professional proposals with accurate measurements, custom pricing, and beautiful visuals that
              impress clients.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2 text-center p-6 rounded-xl border-2 border-neon-gold/20 bg-black/50 backdrop-blur-sm shadow-neon-glow">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neon-gold/20 text-neon-gold mb-2">
              <Zap className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white">3. Streamline Projects</h3>
            <p className="text-white/70">
              Manage everything from contracts to completion with integrated CRM, photo management, and client
              communication.
            </p>
          </div>
        </div>

        {/* Workflow Diagram */}
        <div className="mt-12 border-2 border-neon-gold/20 bg-black/50 backdrop-blur-sm shadow-neon-glow rounded-xl overflow-hidden">
          <div className="p-6 border-b border-neon-gold/20 bg-gradient-to-r from-black/80 to-blue-950/80">
            <h3 className="text-2xl font-bold text-white text-center">Complete Roofing Workflow</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="flex flex-col items-center text-center p-4 space-y-2">
                <div className="h-12 w-12 rounded-full bg-neon-gold/20 flex items-center justify-center">
                  <CloudLightning className="h-6 w-6 text-neon-gold" />
                </div>
                <h4 className="font-bold text-white">Storm Tracking</h4>
                <p className="text-xs text-white/70">Find damaged properties</p>
              </div>

              <div className="hidden md:flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-neon-gold" />
              </div>

              <div className="flex flex-col items-center text-center p-4 space-y-2">
                <div className="h-12 w-12 rounded-full bg-neon-gold/20 flex items-center justify-center">
                  <Users className="h-6 w-6 text-neon-gold" />
                </div>
                <h4 className="font-bold text-white">Lead Generation</h4>
                <p className="text-xs text-white/70">Convert prospects to leads</p>
              </div>

              <div className="hidden md:flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-neon-gold" />
              </div>

              <div className="flex flex-col items-center text-center p-4 space-y-2">
                <div className="h-12 w-12 rounded-full bg-neon-gold/20 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-neon-gold" />
                </div>
                <h4 className="font-bold text-white">Proposals</h4>
                <p className="text-xs text-white/70">Create winning estimates</p>
              </div>

              <div className="hidden md:flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-neon-gold" />
              </div>

              <div className="flex flex-col items-center text-center p-4 space-y-2">
                <div className="h-12 w-12 rounded-full bg-neon-gold/20 flex items-center justify-center">
                  <PenTool className="h-6 w-6 text-neon-gold" />
                </div>
                <h4 className="font-bold text-white">Contracts</h4>
                <p className="text-xs text-white/70">Digital signatures & approvals</p>
              </div>

              <div className="hidden md:flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-neon-gold" />
              </div>

              <div className="flex flex-col items-center text-center p-4 space-y-2">
                <div className="h-12 w-12 rounded-full bg-neon-gold/20 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-neon-gold" />
                </div>
                <h4 className="font-bold text-white">Project Management</h4>
                <p className="text-xs text-white/70">Execute jobs efficiently</p>
              </div>

              <div className="hidden md:flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-neon-gold" />
              </div>

              <div className="flex flex-col items-center text-center p-4 space-y-2">
                <div className="h-12 w-12 rounded-full bg-neon-gold/20 flex items-center justify-center">
                  <Users className="h-6 w-6 text-neon-gold" />
                </div>
                <h4 className="font-bold text-white">Client Portal</h4>
                <p className="text-xs text-white/70">Enhance customer experience</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black border-none shadow-neon-glow"
            asChild
          >
            <Link href="#pro-features">Explore Pro Features</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
