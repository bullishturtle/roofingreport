"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamically import the interactive Roofus component
const InteractiveRoofus = dynamic(
  () => import("@/components/3d/interactive-roofus").then((mod) => mod.InteractiveRoofus),
  {
    loading: () => (
      <div className="w-full h-[400px] flex items-center justify-center">
        <div className="text-neon-gold">Loading Roofus...</div>
      </div>
    ),
    ssr: false, // Disable server-side rendering for Three.js components
  },
)

export function InteractiveRoofusWrapper({ onInteract }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <div className="text-neon-gold">Loading Roofus...</div>
      </div>
    )
  }

  return <InteractiveRoofus onInteract={onInteract} />
}
