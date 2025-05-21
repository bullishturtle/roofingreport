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
  rotation = [0, Math.PI, 0], // Default to facing forward
  scale = 0.5,
  animation = "idle",
  showEnvironment = true,
  className = "",
  onClick,
  onAnimationLoad,
  onAnimationError,
  debug = false,
}: {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  animation?: AnimationState
  showEnvironment?: boolean
  className?: string
  onClick?: () => void
  onAnimationLoad?: (animation: string) => void
  onAnimationError?: (animation: string, error: any) => void
  debug?: boolean
}) {
  const [mounted, setMounted] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const maxRetries = 2

  useEffect(() => {
    setMounted(true)

    // Error handling
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes("Roofus") || event.message.includes("GLB") || event.message.includes("3D")) {
        console.error("Error in Roofus3DSupabaseWrapper:", event.error)

        // Retry loading a few times before giving up
        if (retryCount < maxRetries) {
          console.log(`Retrying (${retryCount + 1}/${maxRetries})...`)
          setRetryCount((prev) => prev + 1)
        } else {
          setHasError(true)
        }
      }
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [retryCount])

  // Handle animation load success
  const handleAnimationLoad = (anim: string) => {
    console.log(`Animation loaded in wrapper: ${anim}`)
    onAnimationLoad?.(anim)
  }

  // Handle animation load error
  const handleAnimationError = (anim: string, error: any) => {
    console.error(`Animation error in wrapper: ${anim}`, error)
    onAnimationError?.(anim, error)
  }

  if (!mounted) {
    return null
  }

  if (hasError) {
    console.log("Rendering fallback due to error")
    return (
      <div className={`${className} flex items-center justify-center bg-black/20 rounded-lg`}>
        <div className="text-neon-gold text-sm">Roofus will be back soon!</div>
      </div>
    )
  }

  return (
    <Roofus3DSupabaseDynamic
      position={position}
      rotation={rotation}
      scale={scale}
      animation={animation}
      showEnvironment={showEnvironment}
      className={className}
      onClick={onClick}
      onAnimationLoad={handleAnimationLoad}
      onAnimationError={handleAnimationError}
      debug={debug}
    />
  )
}
