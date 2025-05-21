"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Animation states
type AnimationState = "idle" | "walk" | "run" | "jump" | "climb" | "death" | "somersault"

// Dynamically import the 3D Roofus component with no SSR
const Roofus3DSupabaseDynamic = dynamic(() => import("../roofus-3d-supabase").then((mod) => mod.Roofus3DSupabase), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full w-full">
      <div className="w-12 h-12 border-4 border-t-neon-gold border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
    </div>
  ),
})

export function Roofus3DSupabaseWrapper({
  position = [0, -1, 0],
  rotation = [0, 0, 0],
  scale = 0.5,
  animation = "idle",
  showEnvironment = true,
  className = "",
  onClick,
}: {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  animation?: AnimationState
  showEnvironment?: boolean
  className?: string
  onClick?: () => void
}) {
  const [mounted, setMounted] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Error handling
    const handleError = () => {
      console.error("Error in Roofus3DSupabaseWrapper")
      setHasError(true)
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  if (!mounted || hasError) return null

  return (
    <Roofus3DSupabaseDynamic
      position={position}
      rotation={rotation}
      scale={scale}
      animation={animation}
      showEnvironment={showEnvironment}
      className={className}
      onClick={onClick}
    />
  )
}
