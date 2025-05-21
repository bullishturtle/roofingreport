"use client"

import dynamic from "next/dynamic"
import { Suspense, useState, useEffect } from "react"

// Dynamically import the 3D characters component with no SSR
const EnhancedAnimated3DCharacters = dynamic(
  () =>
    import("@/components/3d-characters/enhanced-animated-3d-characters").then(
      (mod) => mod.EnhancedAnimated3DCharacters,
    ),
  {
    ssr: false,
    loading: () => null,
  },
)

// Dynamically import the model preloader with no SSR
const ModelPreloader = dynamic(
  () => import("@/components/3d-characters/model-preloader").then((mod) => mod.ModelPreloader),
  {
    ssr: false,
    loading: () => null,
  },
)

export default function Enhanced3DCharactersWrapper() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Suspense fallback={null}>
      <ModelPreloader />
      <EnhancedAnimated3DCharacters />
    </Suspense>
  )
}
