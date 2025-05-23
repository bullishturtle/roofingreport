"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { useMediaQuery } from "@/hooks/use-media-query"

export function AnimatedCharactersFallback() {
  const [roofusPosition, setRoofusPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [showSpeechBubble, setShowSpeechBubble] = useState(false)
  const [speechText, setSpeechText] = useState("")
  const [animation, setAnimation] = useState<"idle" | "running" | "jumping" | "pointing">("idle")
  const [direction, setDirection] = useState<"left" | "right">("right")
  const appearTimer = useRef<NodeJS.Timeout | null>(null)
  const animationTimer = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Get random position within viewport bounds
  const getRandomPosition = () => {
    if (typeof window === "undefined") return { x: 0, y: 0 }

    const maxX = window.innerWidth - 150
    const maxY = window.innerHeight - 150
    return {
      x: Math.random() * maxX,
      y: Math.max(100, Math.random() * (maxY - 300)), // Keep characters in upper part of screen
    }
  }

  // Initialize character appearance
  useEffect(() => {
    // Don't show immediately
    appearTimer.current = setTimeout(() => {
      const newPos = getRandomPosition()
      setRoofusPosition(newPos)
      setIsVisible(true)
      setAnimation("running")
      setDirection(Math.random() > 0.5 ? "right" : "left")

      // Show speech bubble after appearing
      setTimeout(() => {
        setSpeechText("Hello! I'm Roofus, your roofing assistant!")
        setShowSpeechBubble(true)

        // Hide speech bubble after a few seconds
        setTimeout(() => {
          setShowSpeechBubble(false)
          setAnimation("idle")
        }, 3000)
      }, 1000)
    }, 5000)

    return () => {
      if (appearTimer.current) clearTimeout(appearTimer.current)
      if (animationTimer.current) clearTimeout(animationTimer.current)
    }
  }, [])

  // Random animations
  useEffect(() => {
    if (isVisible) {
      const animationInterval = setInterval(() => {
        // Only animate if not already showing speech bubble
        if (!showSpeechBubble) {
          const animations = ["idle", "pointing", "jumping"] as const
          const randomAnimation = animations[Math.floor(Math.random() * animations.length)]
          setAnimation(randomAnimation)

          // Move to a new position occasionally
          if (Math.random() > 0.7) {
            const newPos = getRandomPosition()
            setRoofusPosition(newPos)
            setDirection(Math.random() > 0.5 ? "right" : "left")
            setAnimation("running")
          }

          // Reset to idle after animation
          setTimeout(() => {
            setAnimation("idle")
          }, 2000)
        }
      }, 5000)

      return () => clearInterval(animationInterval)
    }
  }, [isVisible, showSpeechBubble])

  // Don't show on certain pages
  if (pathname === "/login" || pathname === "/signup") {
    return null
  }

  // Adjust size for mobile
  const characterSize = isMobile ? 80 : 120
  const speechBubbleClass = isMobile ? "max-w-[150px] text-xs p-1.5" : "max-w-[250px] text-sm p-2"

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed z-50 pointer-events-none"
          style={{
            left: roofusPosition.x,
            top: roofusPosition.y,
            width: characterSize,
            height: characterSize,
            transform: direction === "left" ? "scaleX(-1)" : "none",
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/roofus.png"
              alt="Roofus"
              width={characterSize}
              height={characterSize}
              className={`object-contain ${
                animation === "idle"
                  ? ""
                  : animation === "running"
                    ? "animate-bounce"
                    : animation === "jumping"
                      ? "animate-pulse"
                      : "animate-pulse"
              }`}
            />
            {animation === "pointing" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-1/4 right-0"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-neon-gold"
                >
                  <path
                    d="M7 11L12 6L17 11M12 6V18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            )}
          </div>
          {showSpeechBubble && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`absolute top-0 ${
                direction === "left" ? "right-full mr-2" : "left-full ml-2"
              } bg-white text-black rounded-lg border-2 border-neon-gold shadow-neon-glow whitespace-normal ${speechBubbleClass}`}
            >
              <div
                className={`absolute ${
                  direction === "left" ? "right-0 translate-x-2" : "left-0 -translate-x-2"
                } top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 ${
                  direction === "left" ? "border-l-8 border-l-white border-r-0" : "border-r-8 border-r-white border-l-0"
                } border-transparent`}
              ></div>
              <p className="font-medium">{speechText}</p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
