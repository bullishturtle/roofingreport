"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Create a completely self-contained component
export function InteractiveRoofusWrapper() {
  const [isMounted, setIsMounted] = useState(false)

  // Dynamically import the 3D component only on the client side
  const InteractiveRoofus = dynamic(() => import("./interactive-roofus").then((mod) => mod.InteractiveRoofus), {
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-black/20">
        <div className="animate-pulse text-neon-gold">Loading 3D Model...</div>
      </div>
    ),
    ssr: false, // Disable server-side rendering for Three.js components
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle interaction internally
  const handleInteract = () => {
    // Open Roofus chat assistant when interacting with 3D model
    const roofusButton = document.querySelector(".fixed.bottom-6.right-6.z-50 button")
    if (roofusButton) {
      ;(roofusButton as HTMLButtonElement).click()
    }
  }

  if (!isMounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black/20">
        <div className="animate-pulse text-neon-gold">Loading 3D Model...</div>
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      <InteractiveRoofus onInteract={handleInteract} />
    </div>
  )
}
