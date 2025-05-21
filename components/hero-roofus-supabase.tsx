"use client"

import { useState, useEffect } from "react"
import { Roofus3DSupabaseWrapper } from "./client-wrappers/roofus-3d-supabase-wrapper"

// Global state to track which animations have been successfully loaded
// This is declared in roofus-3d-supabase.tsx but we need to access it here
const loadedAnimations = new Set<string>(["idle"])

export function HeroRoofusSupabase() {
  const [mounted, setMounted] = useState(false)
  const [animation, setAnimation] = useState<"idle" | "walk" | "run">("idle")
  const [availableAnimations, setAvailableAnimations] = useState<string[]>(["idle"])

  useEffect(() => {
    setMounted(true)

    // Update available animations
    const updateAvailableAnimations = () => {
      // Get the current loaded animations from the global state
      const currentAnimations = Array.from(loadedAnimations)
      setAvailableAnimations(currentAnimations)
    }

    // Check for new animations every second
    const animationsInterval = setInterval(updateAvailableAnimations, 1000)

    // Switch between idle and walk (if available) every 5 seconds
    const animationInterval = setInterval(() => {
      if (availableAnimations.includes("walk")) {
        setAnimation((prev) => (prev === "idle" ? "walk" : "idle"))
      } else if (availableAnimations.includes("run")) {
        setAnimation((prev) => (prev === "idle" ? "run" : "idle"))
      }
    }, 5000)

    return () => {
      clearInterval(animationsInterval)
      clearInterval(animationInterval)
    }
  }, [availableAnimations])

  // Handle animation load success
  const handleAnimationLoad = (anim: string) => {
    console.log(`Animation loaded in HeroRoofusSupabase: ${anim}`)
    // Update our local state of available animations
    setAvailableAnimations((prev) => (prev.includes(anim) ? prev : [...prev, anim]))
  }

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
        onAnimationLoad={handleAnimationLoad}
      />
    </div>
  )
}
