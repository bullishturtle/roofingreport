"use client"

import dynamic from "next/dynamic"
import { Suspense, useState, useEffect } from "react"

// Dynamically import the 3D Roofus component with no SSR
const ThreeDRoofusDynamic = dynamic(() => import("../3d-roofus").then((mod) => mod.ThreeDRoofus), {
  ssr: false,
  loading: () => (
    <div className="fixed bottom-0 right-0 w-64 h-64 z-50 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-t-neon-gold border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
    </div>
  ),
})

export function ThreeDRoofusWrapper() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    console.log("ThreeDRoofusWrapper mounted")
  }, [])

  if (!mounted) return null

  return (
    <Suspense
      fallback={
        <div className="fixed bottom-0 right-0 w-64 h-64 z-50 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-t-neon-gold border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <ThreeDRoofusDynamic />
    </Suspense>
  )
}
