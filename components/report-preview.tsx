"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Mail, AlertTriangle, Calendar, CloudLightning, Wind } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"

interface ReportPreviewProps {
  address: string
  onClose: () => void
}

export function ReportPreview({ address, onClose }: ReportPreviewProps) {
  const { toast } = useToast()
  const [isDownloading, setIsDownloading] = useState(false)
  const [isEmailing, setIsEmailing] = useState(false)

  // Simulate PDF download
  const handleDownload = () => {
    setIsDownloading(true)
    setTimeout(() => {
      setIsDownloading(false)
      toast({
        title: "Report Downloaded",
        description: "Your RoofFax report has been downloaded successfully.",
        variant: "default",
      })
    }, 2000)
  }

  // Simulate email sending
  const handleEmailReport = () => {
    setIsEmailing(true)
    setTimeout(() => {
      setIsEmailing(false)
      toast({
        title: "Report Emailed",
        description: "Your RoofFax report has been sent to your email.",
        variant: "default",
      })
    }, 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="border-2 border-neon-gold/30 bg-black/50 backdrop-blur-md shadow-neon-glow overflow-hidden">
        <CardHeader className="border-b border-neon-gold/20 bg-gradient-to-r from-black/80 to-blue-950/80">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-white">RoofFax Report Preview</CardTitle>
              <CardDescription className="text-white/70">{address}</CardDescription>
            </div>
            <Badge className="bg-neon-gold/20 text-neon-gold border border-neon-gold/30">Preview</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          {/* Report Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Roof Age:</span>
                <span className="font-semibold text-white">11 Years</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Condition Score:</span>
                <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">B</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Last Inspection:</span>
                <span className="font-semibold text-white">Unknown</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Material Type:</span>
                <span className="font-semibold text-white">Asphalt Shingle</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CloudLightning className="h-4 w-4 text-amber-400" />
                <span className="text-white/70">Hailstorm on 03/21/2022</span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-blue-400" />
                <span className="text-white/70">Wind Event on 07/12/2023</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-neon-gold" />
                <span className="text-white/70">Est. Replacement: 2028-2030</span>
              </div>
            </div>
          </div>

          {/* Warning and Recommendation */}
          <div className="space-y-4 mt-4">
            <div className="flex items-start gap-2 p-3 rounded-md border border-amber-500/30 bg-amber-500/10">
              <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-amber-400">Contractor Warning</p>
                <p className="text-sm text-white/70">Unverified roofer activity in your ZIP this week</p>
              </div>
            </div>

            <div className="p-3 rounded-md border border-neon-gold/30 bg-neon-gold/10">
              <p className="font-medium text-neon-gold">AI Recommendation</p>
              <p className="text-sm text-white/70">Inspection suggested within 2 weeks</p>
            </div>

            {/* Blurred Premium Content */}
            <div className="relative">
              <div className="p-3 rounded-md border border-blue-500/30 bg-blue-500/10 blur-sm">
                <p className="font-medium text-blue-400">Insurance Claim Potential</p>
                <p className="text-sm text-white/70">Based on storm history and damage patterns...</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30">Premium Feature</Badge>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 border-t border-neon-gold/20 bg-black/50 pt-4">
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full sm:w-auto bg-neon-gold/10 hover:bg-neon-gold/20 backdrop-blur-sm border border-neon-gold/30 text-neon-gold"
          >
            {isDownloading ? "Downloading..." : "Download PDF"}
            <Download className="ml-2 h-4 w-4" />
          </Button>
          <Button
            onClick={handleEmailReport}
            disabled={isEmailing}
            className="w-full sm:w-auto bg-blue-500/10 hover:bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-400"
          >
            {isEmailing ? "Sending..." : "Email This Report"}
            <Mail className="ml-2 h-4 w-4" />
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full sm:w-auto border-white/20 text-white/70 hover:bg-white/10"
          >
            Back to Search
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
