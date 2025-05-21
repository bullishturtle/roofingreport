"use client"

import { useState, useEffect } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Roofus3DSupabaseWrapper } from "./client-wrappers/roofus-3d-supabase-wrapper"
import { usePathname } from "next/navigation"

export function RoofusAssistant() {
  const [mounted, setMounted] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [showRoofus, setShowRoofus] = useState(true)
  const pathname = usePathname()

  // Don't show Roofus on the home page (to avoid duplication with HeroRoofusSupabase)
  // or on login/signup pages
  const hideRoofus = pathname === "/" || pathname === "/login" || pathname === "/signup"

  useEffect(() => {
    setMounted(true)

    // Don't show Roofus as often on mobile to save resources
    if (isMobile) {
      setShowRoofus(Math.random() > 0.5)
    }
  }, [isMobile])

  if (!mounted || !showRoofus || hideRoofus) return null

  return (
    <div className="fixed bottom-0 right-0 w-64 h-64 z-50 pointer-events-auto">
      <Roofus3DSupabaseWrapper
        animation="idle"
        position={[0, -1, 0]}
        rotation={[0, Math.PI * 0.25, 0]} // Rotate to face toward the center-left
        scale={0.5}
        showEnvironment={false}
        className="w-full h-full"
      />
    </div>
  )
}
