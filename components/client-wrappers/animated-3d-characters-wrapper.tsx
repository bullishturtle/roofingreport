"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Import the fallback component
const AnimatedCharactersFallback = dynamic(
  () => import("../animated-characters-fallback").then((mod) => mod.AnimatedCharactersFallback),
  {
    loading: () => null,
  },
)

export default function Animated3DCharactersWrapper() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Always use the fallback component instead of trying to load 3D characters
  return <AnimatedCharactersFallback />
}
