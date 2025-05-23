"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { useClientWrapper } from "./client-wrapper-provider"

// Import the fallback component
const AnimatedCharactersFallback = dynamic(
  () => import("../animated-characters-fallback").then((mod) => mod.AnimatedCharactersFallback),
  {
    loading: () => null,
  },
)

export default function Animated3DCharactersWrapper() {
  const { isMounted, setRenderingError } = useClientWrapper()
  const [error, setError] = useState(false)

  useEffect(() => {
    // Set up error handler
    const handleError = (e: ErrorEvent) => {
      // Check if error is related to 3D/WebGL
      if (
        e.message?.includes("WebGL") ||
        e.message?.includes("three") ||
        e.message?.includes("GLSL") ||
        e.message?.includes("model")
      ) {
        setError(true)
        // Prevent the error from affecting other parts of the application
        e.preventDefault()
      }
    }

    window.addEventListener("error", handleError)

    return () => {
      window.removeEventListener("error", handleError)
    }
  }, [setRenderingError])

  if (!isMounted || error) {
    return <AnimatedCharactersFallback />
  }

  // Always use the fallback component instead of trying to load 3D characters
  return <AnimatedCharactersFallback />
}
