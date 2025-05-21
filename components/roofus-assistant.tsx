"use client"

import { useState, useEffect } from "react"
import { AnimatedRoofus2D } from "./animated-roofus-2d"
import { useMediaQuery } from "@/hooks/use-media-query"

export function RoofusAssistant() {
  const [mounted, setMounted] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [showRoofus, setShowRoofus] = useState(true)

  useEffect(() => {
    setMounted(true)

    // Don't show Roofus as often on mobile to save resources
    if (isMobile) {
      setShowRoofus(Math.random() > 0.5)
    }

    console.log("Roofus Assistant mounted, using 2D implementation")
  }, [isMobile])

  if (!mounted || !showRoofus) return null

  return <AnimatedRoofus2D />
}
