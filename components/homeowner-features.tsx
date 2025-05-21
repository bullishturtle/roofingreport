"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, CloudLightning, Ruler, Camera, Shield, Bell, ArrowRight, Info } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export function HomeownerFeatures() {
  return (
    <section id="homeowner-features" className="w-full py-12 md:py-24 lg:py-32 relative">
      <div className="absolute inset-0 grid-bg opacity-20"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <Badge
              variant="outline"
              className="border-neon-gold/50 text-neon-gold bg-neon-gold/10 px-3 py-1 shadow-neon-glow"
            >
              For Homeowners
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Understand Your Roof
            </h2>
            <p className="max-w-[900px] text-white/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Get the information you need to make informed decisions about your roof
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="relative aspect-video overflow-hidden rounded-xl border-2 border-neon-gold/30 bg-black/30 p-2 shadow-neon-glow mb-6">
              <Image
                src="/images/landon-roofus-roof.png"
                width={550}
                height={350}
                alt="RoofFax Report Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Comprehensive Roof Reports</h3>
            <p className="text-white/70 mb-6">
              RoofFax provides detailed reports about your roof's condition, history, and potential issues. Our reports
              include:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-neon-gold mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-white">Roof Age & Condition Assessment</span>
                  <p className="text-sm text-white/70">
                    Estimated age of your roof and its current condition based on visual data and property records
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Ruler className="h-5 w-5 text-neon-gold mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-white">Roof Measurements & Specifications</span>
                  <p className="text-sm text-white/70">
                    Accurate measurements including square footage, pitch, and material type
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CloudLightning className="h-5 w-5 text-neon-gold mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-white">Storm History & Damage Potential</span>
                  <p className="text-sm text-white/70">
                    Record of past severe weather events that may have affected your roof
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <FileText className="h-5 w-5 text-neon-gold mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-white">Maintenance Recommendations</span>
                  <p className="text-sm text-white/70">
                    Personalized suggestions for maintaining your roof's integrity and extending its lifespan
                  </p>
                </div>
              </li>
            </ul>
            <div className="mt-auto">
              <Button
                className="w-full bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black border-none shadow-neon-glow"
                asChild
              >
                <Link href="https://trustthefox.com">
                  Get Your Free Roof Report <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-neon-gold/20 bg-black/50 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-neon-gold/20 flex items-center justify-center flex-shrink-0">
                      <Bell className="h-6 w-6 text-neon-gold" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Storm Damage Alerts</h3>
                      <p className="text-white/70 mb-4">
                        Receive proactive notifications when severe weather events like hail, high winds, or heavy snow
                        may have damaged your roof.
                      </p>
                      <Button
                        className="w-full bg-neon-gold/10 hover:bg-neon-gold/20 backdrop-blur-sm border border-neon-gold/30 text-neon-gold"
                        asChild
                      >
                        <Link href="/homeowner/storm-alerts">
                          Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-neon-gold/20 bg-black/50 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-neon-gold/20 flex items-center justify-center flex-shrink-0">
                      <Camera className="h-6 w-6 text-neon-gold" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Visual Documentation</h3>
                      <p className="text-white/70 mb-4">
                        Access high-resolution aerial imagery of your roof, allowing you to see its condition without
                        climbing a ladder.
                      </p>
                      <Button
                        className="w-full bg-neon-gold/10 hover:bg-neon-gold/20 backdrop-blur-sm border border-neon-gold/30 text-neon-gold"
                        asChild
                      >
                        <Link href="/homeowner/visual-documentation">
                          Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-neon-gold/20 bg-black/50 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-neon-gold/20 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-6 w-6 text-neon-gold" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Verified Contractor Network</h3>
                      <p className="text-white/70 mb-4">
                        Connect with pre-screened, qualified roofing professionals in your area when repairs or
                        replacements are needed.
                      </p>
                      <Button
                        className="w-full bg-neon-gold/10 hover:bg-neon-gold/20 backdrop-blur-sm border border-neon-gold/30 text-neon-gold"
                        asChild
                      >
                        <Link href="/homeowner/contractor-network">
                          Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-black/80 to-blue-950/80 border-2 border-neon-gold/20 rounded-xl p-6 md:p-8 shadow-neon-glow">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="h-16 w-16 rounded-full bg-neon-gold/20 flex items-center justify-center flex-shrink-0">
              <Info className="h-8 w-8 text-neon-gold" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">Want to know more about your roof?</h3>
              <p className="text-white/70 mb-0 md:mb-0">
                Enter your address to get a free comprehensive roof report with detailed measurements, condition
                assessment, and maintenance recommendations.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <Button
                size="lg"
                className="w-full md:w-auto bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black border-none shadow-neon-glow"
                asChild
              >
                <Link href="https://trustthefox.com">
                  Get Your Free Report <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
