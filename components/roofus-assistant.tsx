"use client"

import { useState, useEffect } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"

export function RoofusAssistant() {
  const [mounted, setMounted] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    setMounted(true)
    console.log("Roofus Assistant mounted, but 2D implementation is disabled")
  }, [isMobile])

  // Return null since the 2D implementation is removed
  return null
}
