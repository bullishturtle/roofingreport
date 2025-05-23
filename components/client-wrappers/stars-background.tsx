"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useClientWrapper } from "./client-wrapper-provider"

export default function StarsBackground() {
  const { isMounted } = useClientWrapper()
  const [stars, setStars] = useState<React.ReactNode[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isMounted || !containerRef.current) return

    try {
      // Get container dimensions
      const containerWidth = window.innerWidth
      const containerHeight = window.innerHeight

      // Generate stars only on the client side
      const generatedStars = Array.from({ length: 100 }).map((_, i) => {
        const top = `${Math.random() * 100}%`
        const left = `${Math.random() * 100}%`
        const opacity = (Math.random() * 0.7 + 0.3).toFixed(2)
        const duration = `${(Math.random() * 3 + 2).toFixed(1)}s`
        const delay = `${(Math.random() * 2).toFixed(1)}s`
        const size = `${(Math.random() * 2 + 1).toFixed(1)}px`

        return (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top,
              left,
              opacity: Number(opacity),
              animationDuration: duration,
              animationDelay: delay,
              width: size,
              height: size,
            }}
          />
        )
      })

      setStars(generatedStars)
    } catch (error) {
      console.error("Error generating stars:", error)
      // Fallback to empty stars array
      setStars([])
    }
  }, [isMounted])

  if (!isMounted) {
    return null
  }

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      {stars}
    </div>
  )
}
