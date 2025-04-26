"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Search, CloudLightning, Users, FileText, Mail, Code, Zap, Ruler, Phone, Menu } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function MobileActionDrawer() {
  const [open, setOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const actions = [
    {
      icon: <Search className="h-5 w-5" />,
      label: "Roof Reports",
      description: "Instant measurements & analysis",
      href: "/dashboard/new-report",
    },
    {
      icon: <CloudLightning className="h-5 w-5" />,
      label: "Storm Tracker",
      description: "Find damaged properties",
      href: "/dashboard/storm-tracker",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Skip Trace",
      description: "Find property owners",
      href: "/dashboard/skip-trace",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Proposals",
      description: "Create & send instantly",
      href: "/dashboard/proposals",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Postcards",
      description: "Direct mail campaigns",
      href: "/dashboard/postcards",
    },
    {
      icon: <Code className="h-5 w-5" />,
      label: "Code Lookup",
      description: "Florida building codes",
      href: "/dashboard/code-lookup",
    },
    {
      icon: <Ruler className="h-5 w-5" />,
      label: "DIY Measure",
      description: "Measure your own roof",
      href: "/dashboard/diy-measure",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Call Owner",
      description: "One-click calling",
      href: "/dashboard/call-owner",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      label: "Ask Roofus",
      description: "AI assistance",
      href: "/dashboard/ask-roofus",
    },
  ]

  // Don't render during SSR
  if (!isMounted) {
    return null
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden fixed bottom-6 left-6 z-40 h-14 w-14 rounded-full border-neon-gold/30 bg-black/50 backdrop-blur-md text-neon-gold hover:bg-neon-gold/10 shadow-neon-glow"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-black/90 backdrop-blur-md border-t border-neon-gold/30">
        <DrawerHeader>
          <DrawerTitle className="text-neon-gold">RoofFax Tools</DrawerTitle>
          <DrawerDescription className="text-white/70">All your roofing tools in one place</DrawerDescription>
        </DrawerHeader>
        <div className="grid grid-cols-3 gap-3 p-4">
          {actions.map((action, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={action.href}
                className="flex flex-col items-center gap-1 p-3 rounded-lg border border-neon-gold/20 bg-black/50 text-center"
                onClick={() => setOpen(false)}
              >
                <div className="h-10 w-10 rounded-full bg-neon-gold/10 flex items-center justify-center text-neon-gold">
                  {action.icon}
                </div>
                <span className="text-sm font-medium text-white">{action.label}</span>
                <span className="text-xs text-white/50 line-clamp-1">{action.description}</span>
              </Link>
            </motion.div>
          ))}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" className="border-neon-gold/30 text-neon-gold hover:bg-neon-gold/10">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default MobileActionDrawer
