"use client"

import { useState, useEffect } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Roofus3DWrapper } from "./client-wrappers/roofus-3d-wrapper"

export function RoofusAssistant() {
  const [mounted, setMounted] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [showRoofus, setShowRoofus] = useState(true)
  const [animation, setAnimation] = useState<"idle" | "running" | "jumping" | "pointing" | "waving" | "climbing">(
    "idle",
  )

  useEffect(() => {
    setMounted(true)

    // Don't show Roofus as often on mobile to save resources
    if (isMobile) {
      setShowRoofus(Math.random() > 0.5)
    }

    // Randomly change animation every 10 seconds
    const animationInterval = setInterval(() => {
      const animations: ("idle" | "running" | "jumping" | "pointing" | "waving" | "climbing")[] = [
        "idle",
        "running",
        "jumping",
        "pointing",
        "waving",
        "climbing",
      ]
      const randomAnimation = animations[Math.floor(Math.random() * animations.length)]
      setAnimation(randomAnimation)
    }, 10000)

    return () => clearInterval(animationInterval)
  }, [isMobile])

  if (!mounted || !showRoofus) return null

  return (
    <div className="fixed bottom-0 right-0 w-64 h-64 z-50 pointer-events-auto">
      <Roofus3DWrapper
        animation={animation}
        position={[0, -1, 0]}
        scale={0.5}
        showEnvironment={false}
        className="w-full h-full"
      />
    </div>
  )
}
