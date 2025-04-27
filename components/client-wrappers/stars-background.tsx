"use client"

import type React from "react"

import { useState, useEffect } from "react"

export default function StarsBackground() {
  const [stars, setStars] = useState<React.ReactNode[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

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
  }, [])

  if (!mounted) {
    return null
  }

  return <div className="fixed inset-0 pointer-events-none z-0">{stars}</div>
}
