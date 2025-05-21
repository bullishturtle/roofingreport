"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export function TwoDRoofusFallback() {
  const [showChatBubble, setShowChatBubble] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [position, setPosition] = useState({ bottom: -100, right: 20 })

  useEffect(() => {
    setMounted(true)
    console.log("2D Roofus fallback mounted")

    // Simulate the falling and landing animation
    setTimeout(() => {
      setPosition({ bottom: 20, right: 20 })
    }, 500)
  }, [])

  if (!mounted) return null

  return (
    <div
      className="fixed z-50 transition-all duration-1000 ease-in-out cursor-pointer"
      style={{ bottom: `${position.bottom}px`, right: `${position.right}px` }}
      onClick={() => setShowChatBubble(!showChatBubble)}
    >
      <div className="relative h-24 w-24">
        <Image src="/images/roofus.png" alt="Roofus" width={96} height={96} className="drop-shadow-lg" />
        {showChatBubble && (
          <div className="absolute bottom-full right-0 mb-2 bg-white p-3 rounded-lg shadow-lg text-black text-sm w-48 border-2 border-neon-gold/30">
            <div className="absolute -bottom-2 right-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
            <p className="font-medium">Hi, I'm Roofus. Need help with your roof?</p>
          </div>
        )}
      </div>
    </div>
  )
}
