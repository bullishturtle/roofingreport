"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Download, FileText, MessageSquare, Phone, Printer, Share2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function ReportActions() {
  return (
    <Card className="bg-black/70 backdrop-blur-md border-2 border-neon-gold shadow-neon-glow rounded-xl overflow-hidden">
      <CardHeader className="pb-2 border-b border-neon-gold/30 flex items-center gap-3">
        <CardTitle className="text-xl font-bold tracking-wider text-neon-gold flex items-center gap-2 drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]">
          <FileText className="h-5 w-5 text-neon-gold animate-pulse" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 mt-2">
          <FancyAction
            href="/dashboard/proposals/new"
            icon={<FileText className="mr-2 h-4 w-4" />}
            label="Create Proposal"
            color="gold"
          />
          <FancyAction
            href="/dashboard/reports/REP-1234/pdf"
            icon={<Download className="mr-2 h-4 w-4" />}
            label="Download PDF"
            color="gold"
          />
          <FancyAction
            href="/dashboard/reports/REP-1234/print"
            icon={<Printer className="mr-2 h-4 w-4" />}
            label="Print Report"
            color="gold"
          />
          <FancyAction
            href="/dashboard/reports/REP-1234/share"
            icon={<Share2 className="mr-2 h-4 w-4" />}
            label="Share Report"
            color="gold"
          />
          <FancyAction
            href="/dashboard/calendar/new"
            icon={<Calendar className="mr-2 h-4 w-4" />}
            label="Schedule Visit"
            color="gold"
          />
          <FancyAction
            href="tel:+1234567890"
            icon={<Phone className="mr-2 h-4 w-4" />}
            label="Call Owner"
            color="gold"
          />
          <FancyAction
            href="/dashboard/chat/REP-1234"
            icon={<MessageSquare className="mr-2 h-4 w-4" />}
            label="Chat with Roofus"
            color="gold"
            className="col-span-2"
          />
        </div>
      </CardContent>
    </Card>
  )
}

interface FancyActionProps {
  href: string
  icon: React.ReactNode
  label: string
  color: "gold" | "purple" | "blue" | "cyan" | "green" | "red"
  className?: string
}

function FancyAction({ href, icon, label, color, className = "" }: FancyActionProps) {
  const colorClasses = {
    gold: "border-neon-gold/50 text-neon-gold hover:bg-neon-gold/10 hover:shadow-[0_0_15px_rgba(255,215,0,0.3)]",
    purple: "border-purple-500/50 text-purple-400 hover:bg-purple-500/10 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]",
    blue: "border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]",
    cyan: "border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]",
    green: "border-green-500/50 text-green-400 hover:bg-green-500/10 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]",
    red: "border-red-500/50 text-red-400 hover:bg-red-500/10 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]",
  }

  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className={className}>
      <Button
        asChild
        variant="outline"
        className={`justify-start w-full px-3 py-2 h-auto rounded-lg bg-black/60 border ${colorClasses[color]} transition-all duration-300 ease-out overflow-hidden group`}
      >
        <Link href={href} className="flex items-center gap-2 w-full">
          <motion.span
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5 }}
          >
            {icon}
          </motion.span>
          <span>{label}</span>
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
        </Link>
      </Button>
    </motion.div>
  )
}
