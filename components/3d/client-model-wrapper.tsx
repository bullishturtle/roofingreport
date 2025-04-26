"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamically import the 3D scene component
const CanineAppraiserScene = dynamic(
  () => import("@/components/3d/canine-appraiser-scene").then((mod) => mod.CanineAppraiserScene),
  {
    loading: () => (
      <div className="w-full h-[500px] rounded-lg overflow-hidden border-2 border-neon-gold/30 bg-black/30 flex items-center justify-center">
        <div className="text-neon-gold text-lg">Loading 3D Scene...</div>
      </div>
    ),
    ssr: false, // Disable server-side rendering for Three.js components
  },
)

export function ClientModelWrapper() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="w-full h-[500px] rounded-lg overflow-hidden border-2 border-neon-gold/30 bg-black/30 flex items-center justify-center">
        <div className="text-neon-gold text-lg">Loading 3D Scene...</div>
      </div>
    )
  }

  return <CanineAppraiserScene />
}
