"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, CloudLightning, Ruler, Camera, Users, PenTool, Clock, Database, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function ProFeatures() {
  return (
    <section id="pro-features" className="w-full py-12 md:py-24 lg:py-32 relative">
      <div className="absolute inset-0 grid-bg opacity-20"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <Badge
              variant="outline"
              className="border-blue-500/50 text-blue-400 bg-blue-500/10 px-3 py-1 shadow-neon-blue"
            >
              For Professionals
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              All Your Tools in One Place
            </h2>
            <p className="max-w-[900px] text-white/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              RoofFax combines essential roofing tools into one powerful platform
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1: Estimates and Visual Proposals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-2 border-blue-500/20 bg-black/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Estimates & Visual Proposals</h3>
                <p className="text-white/70 mb-4">
                  Generate professional quotes with integrated images and customizable pricing tables that win more
                  jobs.
                </p>
                <Button
                  className="w-full bg-blue-500/10 hover:bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-400"
                  asChild
                >
                  <Link href="/pro/estimates">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Feature 2: Storm Report and Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-2 border-blue-500/20 bg-black/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <CloudLightning className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Storm Report & Tracker</h3>
                <p className="text-white/70 mb-4">
                  Access real-time hail and wind maps with auto-targeted storm leads to find damaged properties before
                  your competition.
                </p>
                <Button
                  className="w-full bg-blue-500/10 hover:bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-400"
                  asChild
                >
                  <Link href="/pro/storm-tracker">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Feature 3: 3D Property & Aerial Measurements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-2 border-blue-500/20 bg-black/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <Ruler className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">3D Property Measurements</h3>
                <p className="text-white/70 mb-4">
                  Get accurate aerial measurements using public data and satellite imaging without climbing the roof.
                </p>
                <Button
                  className="w-full bg-blue-500/10 hover:bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-400"
                  asChild
                >
                  <Link href="/pro/measurements">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Feature 4: Job Site Photo Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-2 border-blue-500/20 bg-black/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <Camera className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Job Site Photo Management</h3>
                <p className="text-white/70 mb-4">
                  Centralize storage and team photo tracking to keep all project documentation organized and accessible.
                </p>
                <Button
                  className="w-full bg-blue-500/10 hover:bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-400"
                  asChild
                >
                  <Link href="/pro/photo-management">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Feature 5: Smart CRM Pipeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-2 border-blue-500/20 bg-black/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Smart CRM Pipeline</h3>
                <p className="text-white/70 mb-4">
                  Track leads from first contact to final invoice with a fully customizable pipeline that works for your
                  business.
                </p>
                <Button
                  className="w-full bg-blue-500/10 hover:bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-400"
                  asChild
                >
                  <Link href="/pro/crm">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Feature 6: Digital Contracts & E-Signatures */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-2 border-blue-500/20 bg-black/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <PenTool className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Digital Contracts & E-Signatures</h3>
                <p className="text-white/70 mb-4">
                  Customize and prebuild legal templates with timestamps to share and get signed instantly.
                </p>
                <Button
                  className="w-full bg-blue-500/10 hover:bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-400"
                  asChild
                >
                  <Link href="/pro/contracts">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Feature 7: Customer Portal Access */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-2 border-blue-500/20 bg-black/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Customer Portal Access</h3>
                <p className="text-white/70 mb-4">
                  Give clients a dedicated portal to view timelines, reports, documents, and request updates, improving
                  communication.
                </p>
                <Button
                  className="w-full bg-blue-500/10 hover:bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-400"
                  asChild
                >
                  <Link href="/pro/customer-portal">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Feature 8: CRM + Finance Integrations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-2 border-blue-500/20 bg-black/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">CRM + Finance Integrations</h3>
                <p className="text-white/70 mb-4">
                  Seamlessly connect with tools like JobNimbus, QuickBooks, Stripe, and Zapier to keep your entire
                  business in sync.
                </p>
                <Button
                  className="w-full bg-blue-500/10 hover:bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-400"
                  asChild
                >
                  <Link href="/pro/integrations">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">Ready to streamline your roofing workflow?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-none shadow-neon-blue"
              asChild
            >
              <Link href="/demo">Schedule Live Demo</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
              asChild
            >
              <Link href="https://rooffaxpro.com">
                Explore Pro Platform <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
