"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export function AnimatedRoofus2D() {
  const [position, setPosition] = useState({ bottom: 20, right: 20 })
  const [isVisible, setIsVisible] = useState(false)
  const [showSpeechBubble, setShowSpeechBubble] = useState(false)
  const [speechText, setSpeechText] = useState("Hi, I'm Roofus! Need help with your roof?")
  const [animation, setAnimation] = useState<"idle" | "jumping" | "looking">("idle")
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const appearTimer = useRef<NodeJS.Timeout | null>(null)
  const animationTimer = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()
  const [shouldRender, setShouldRender] = useState(true)

  // Check if we should render based on the current path
  useEffect(() => {
    if (pathname === "/login" || pathname === "/signup") {
      setShouldRender(false)
    } else {
      setShouldRender(true)
    }
  }, [pathname])

  if (!shouldRender) {
    return null
  }

  // Random position within viewport bounds
  const getRandomPosition = () => {
    if (typeof window === "undefined") return { bottom: 20, right: 20 }

    const maxRight = window.innerWidth - 120
    return {
      bottom: Math.max(20, Math.random() * 60),
      right: Math.max(20, Math.random() * maxRight),
    }
  }

  // Initialize character appearance with animation
  useEffect(() => {
    // Appear after a short delay
    appearTimer.current = setTimeout(() => {
      const newPos = getRandomPosition()
      setPosition(newPos)
      setIsVisible(true)

      // Start jumping animation when appearing
      setAnimation("jumping")

      // Show speech bubble after jumping animation finishes
      setTimeout(() => {
        setSpeechText("Hi, I'm Roofus! Need help with your roof?")
        setShowSpeechBubble(true)
        setAnimation("idle")

        // Hide speech bubble after a few seconds
        setTimeout(() => {
          setShowSpeechBubble(false)
        }, 5000)
      }, 1500)
    }, 3000)

    return () => {
      if (appearTimer.current) clearTimeout(appearTimer.current)
      if (animationTimer.current) clearTimeout(animationTimer.current)
    }
  }, [])

  // Set up periodic animations
  useEffect(() => {
    if (isVisible && imageLoaded) {
      const animationInterval = setInterval(() => {
        // Only animate if not showing speech bubble
        if (!showSpeechBubble) {
          // Random animations
          const randomAnim = Math.random()

          if (randomAnim > 0.7) {
            // Sometimes change position
            setAnimation("jumping")
            const newPos = getRandomPosition()
            setPosition(newPos)

            setTimeout(() => {
              setAnimation("idle")
            }, 1000)
          } else if (randomAnim > 0.4) {
            // Look around
            setAnimation("looking")
            setTimeout(() => {
              setAnimation("idle")
            }, 1500)
          }
        }
      }, 10000)

      return () => clearInterval(animationInterval)
    }
  }, [isVisible, showSpeechBubble, imageLoaded])

  // Handle click on Roofus
  const handleClick = () => {
    if (!showSpeechBubble) {
      // Cycle through different messages
      const messages = [
        "Hi, I'm Roofus! Need help with your roof?",
        "Have questions about your roof? I'm here to help!",
        "Want to get started with RoofFax? Just ask me!",
        "Try entering your address to get a roof report!",
      ]
      const randomMessage = messages[Math.floor(Math.random() * messages.length)]

      setSpeechText(randomMessage)
      setShowSpeechBubble(true)
      setAnimation("looking")

      setTimeout(() => {
        setAnimation("idle")
      }, 1000)

      setTimeout(() => {
        setShowSpeechBubble(false)
      }, 5000)
    } else {
      // Hide speech bubble if showing
      setShowSpeechBubble(false)
    }
  }

  // If there was an error loading the image, don't render anything
  if (imageError) {
    console.error("Fai
