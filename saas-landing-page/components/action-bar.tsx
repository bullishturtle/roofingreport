"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Search, CloudLightning, Users, FileText, Mail, Code, Zap, Ruler, Phone } from "lucide-react"
import Link from "next/link"
import { useMediaQuery } from "@/hooks/use-media-query"

export function ActionBar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const actions = [
    {
      icon: <Search className="h-4 w-4" />,
      label: "Roof Reports",
      description: "Instant measurements & analysis",
      href: "/dashboard/new-report",
    },
    {
      icon: <CloudLightning className="h-4 w-4" />,
      label: "Storm Tracker",
      description: "Find damaged properties",
      href: "/dashboard/storm-tracker",
    },
    {
      icon: <Users className="h-4 w-4" />,
      label: "Skip Trace",
      description: "Find property owners",
      href: "/dashboard/skip-trace",
    },
    {
      icon: <FileText className="h-4 w-4" />,
      label: "Proposals",
      description: "Create & send instantly",
      href: "/dashboard/proposals",
    },
    {
      icon: <Mail className="h-4 w-4" />,
      label: "Postcards",
      description: "Direct mail campaigns",
      href: "/dashboard/postcards",
    },
    {
      icon: <Code className="h-4 w-4" />,
      label: "Code Lookup",
      description: "Florida building codes",
      href: "/dashboard/code-lookup",
    },
    {
      icon: <Ruler className="h-4 w-4" />,
      label: "DIY Measure",
      description: "Measure your own roof",
      href: "/dashboard/diy-measure",
    },
    {
      icon: <Phone className="h-4 w-4" />,
      label: "Call Owner",
      description: "One-click calling",
      href: "/dashboard/call-owner",
    },
    {
      icon: <Zap className="h-4 w-4" />,
      label: "Ask Roofus",
      description: "AI assistance",
      href: "/dashboard/ask-roofus",
    },
  ]

  // For mobile, show fewer actions
  const displayedActions = isMobile ? actions.slice(0, 5) : actions

  return (
    <div className="w-full overflow-x-auto py-2 px-4 bg-black/30 backdrop-blur-md border-y border-neon-gold/20 shadow-neon-glow">
      <div className="flex items-center gap-2 min-w-max mx-auto max-w-7xl">
        {displayedActions.map((action, index) => (
          <motion.div
            key={index}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            whileHover={{ y: -2 }}
            className="relative"
          >
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-neon-gold/30 text-neon-gold hover:bg-neon-gold/10 shadow-neon-glow"
            >
              <Link href={action.href} className="flex items-center gap-2">
                {action.icon}
                <span className={isMobile && index > 1 ? "sr-only" : ""}>{action.label}</span>
              </Link>
            </Button>

            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute top-full left-0 mt-1 z-50 bg-black/80 backdrop-blur-md border border-neon-gold/30 rounded-md p-2 text-xs text-white whitespace-nowrap"
              >
                {action.description}
              </motion.div>
            )}
          </motion.div>
        ))}

        {isMobile && (
          <Button
            variant="outline"
            size="sm"
            className="border-neon-gold/30 text-neon-gold hover:bg-neon-gold/10 shadow-neon-glow"
            asChild
          >
            <Link href="/dashboard/tools">
              <span>More</span>
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
