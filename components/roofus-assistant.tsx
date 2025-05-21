"use client"

import { useState, useEffect } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Roofus3DSupabaseWrapper } from "./client-wrappers/roofus-3d-supabase-wrapper"

export function RoofusAssistant() {
  const [mounted, setMounted] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [showRoofus, setShowRoofus] = useState(true)

  // We're only using idle animation now
  const animation = "idle"

  useEffect(() => {
    setMounted(true)

    // Don't show Roofus as often on mobile to save resources
    if (isMobile) {
      setShowRoofus(Math.random() > 0.5)
    }
  }, [isMobile])

  if (!mounted || !showRoofus) return null

  return (
    <div className="fixed bottom-0 right-0 w-64 h-64 z-50 pointer-events-auto">
      <Roofus3DSupabaseWrapper
        animation={animation}
        position={[0, -1, 0]}
        scale={0.5}
        showEnvironment={false}
        className="w-full h-full"
      />
    </div>
  )
}
