"use client"

import { useState, useEffect } from "react"
import { Roofus3DSupabaseWrapper } from "./client-wrappers/roofus-3d-supabase-wrapper"

export function HeroRoofusSupabase() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute bottom-0 right-0 w-72 h-72 md:w-96 md:h-96 z-10 pointer-events-none">
      <Roofus3DSupabaseWrapper
        animation="idle"
        position={[0, -1, 0]}
        rotation={[0, Math.PI * 0.25, 0]} // Rotate to face toward the center-left
        scale={0.6}
        showEnvironment={false}
        className="w-full h-full"
      />
    </div>
  )
}
