"use client"

import { useState, useEffect } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Roofus3DSupabaseWrapper } from "./client-wrappers/roofus-3d-supabase-wrapper"

// Global state to track which animations have been successfully loaded
// This is declared in roofus-3d-supabase.tsx but we need to access it here
const loadedAnimations = new Set<string>(["idle"])

export function RoofusAssistant() {
  const [mounted, setMounted] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [showRoofus, setShowRoofus] = useState(true)
  const [animation, setAnimation] = useState<"idle" | "walk" | "run" | "jump" | "climb">("idle")
  const [availableAnimations, setAvailableAnimations] = useState<string[]>(["idle"])

  useEffect(() => {
    setMounted(true)

    // Don't show Roofus as often on mobile to save resources
    if (isMobile) {
      setShowRoofus(Math.random() > 0.5)
    }

    // Update available animations
    const updateAvailableAnimations = () => {
      // Get the current loaded animations from the global state
      const currentAnimations = Array.from(loadedAnimations)
      setAvailableAnimations(currentAnimations)
    }

    // Check for new animations every second
    const animationsInterval = setInterval(updateAvailableAnimations, 1000)

    // Randomly change animation every 10 seconds, but only use animations that are available
    const animationInterval = setInterval(() => {
      // Get the current loaded animations
      const currentAnimations = Array.from(loadedAnimations)

      if (currentAnimations.length > 1) {
        // If we have more than just idle, randomly select from available animations
        const randomAnimation = currentAnimations[Math.floor(Math.random() * currentAnimations.length)] as
          | "idle"
          | "walk"
          | "run"
          | "jump"
          | "climb"
        setAnimation(randomAnimation)
      }
    }, 10000)

    return () => {
      clearInterval(animationsInterval)
      clearInterval(animationInterval)
    }
  }, [isMobile])

  // Handle animation load success
  const handleAnimationLoad = (anim: string) => {
    console.log(`Animation loaded in RoofusAssistant: ${anim}`)
    // Update our local state of available animations
    setAvailableAnimations((prev) => (prev.includes(anim) ? prev : [...prev, anim]))
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
        onAnimationLoad={handleAnimationLoad}
      />
    </div>
  )
}
