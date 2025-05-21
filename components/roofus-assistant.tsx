"use client"

import { useState, useEffect } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Roofus3DSupabaseWrapper } from "./client-wrappers/roofus-3d-supabase-wrapper"

export function RoofusAssistant() {
  const [mounted, setMounted] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [showRoofus, setShowRoofus] = useState(true)
  const [animation, setAnimation] = useState<"idle" | "walk" | "run" | "jump" | "climb" | "death" | "somersault">(
    "idle",
  )
  const [animationError, setAnimationError] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setMounted(true)

    // Don't show Roofus as often on mobile to save resources
    if (isMobile) {
      setShowRoofus(Math.random() > 0.5)
    }

    // Randomly change animation every 10 seconds, but only use animations that haven't failed
    const animationInterval = setInterval(() => {
      // Filter out animations that have failed
      const availableAnimations: ("idle" | "walk")[] = ["idle"]
      if (!animationError["walk"]) availableAnimations.push("walk")

      // Always include idle as a fallback
      const randomAnimation = availableAnimations[Math.floor(Math.random() * availableAnimations.length)]
      setAnimation(randomAnimation)
    }, 10000)

    return () => clearInterval(animationInterval)
  }, [isMobile, animationError])

  // Handle animation errors
  const handleAnimationError = (anim: string) => {
    setAnimationError((prev) => ({ ...prev, [anim]: true }))
    // Fall back to idle animation
    setAnimation("idle")
  }

  if (!mounted || !showRoofus) return null

  return (
    <div className="fixed bottom-0 right-0 w-64 h-64 z-50 pointer-events-auto">
      <Roofus3DSupabaseWrapper
        animation={animation}
        position={[0, -1, 0]}
        scale={0.5}
        showEnvironment={false}
        className="w-full h-full"
        onAnimationError={() => handleAnimationError(animation)}
      />
    </div>
  )
}
