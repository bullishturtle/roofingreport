"use client"

import { useState, useEffect } from "react"
import { Roofus3DSupabaseWrapper } from "./client-wrappers/roofus-3d-supabase-wrapper"

export function HeroRoofusSupabase() {
  const [mounted, setMounted] = useState(false)
  const [animation, setAnimation] = useState<"idle" | "walk">("walk")

  useEffect(() => {
    setMounted(true)

    // Switch between idle and walking
    const interval = setInterval(() => {
      setAnimation((prev) => (prev === "idle" ? "walk" : "idle"))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute bottom-0 right-0 w-72 h-72 md:w-96 md:h-96 z-10">
      <Roofus3DSupabaseWrapper
        animation={animation}
        position={[0, -1, 0]}
        rotation={[0, -0.5, 0]}
        scale={0.6}
        showEnvironment={false}
        className="w-full h-full"
      />
    </div>
  )
}
