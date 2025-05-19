"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useMediaQuery } from "@/hooks/use-media-query"

export function AnimatedCharacters() {
  const pathname = usePathname()
  const isMobile = useMediaQuery("(max-width: 768px)")

  const [roofusPosition, setRoofusPosition] = useState({ x: 0, y: 0 })
  const [landonPosition, setLandonPosition] = useState({ x: -100, y: 0 })
  const [isRoofusVisible, setIsRoofusVisible] = useState(false)
  const [isLandonVisible, setIsLandonVisible] = useState(false)
  const [isChasing, setIsChasing] = useState(false)
  const [isWhistling, setIsWhistling] = useState(false)
  const [showSpeechBubble, setShowSpeechBubble] = useState(false)
  const [speechText, setSpeechText] = useState("")
  const [userInactive, setUserInactive] = useState(false)
  const [showTrustTheFox, setShowTrustTheFox] = useState(false)
  const [roofusAnimation, setRoofusAnimation] = useState<"idle" | "running" | "jumping" | "pointing">("idle")
  const [roofusDirection, setRoofusDirection] = useState<"left" | "right">("right")
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null)

  // Return null during server-side rendering or on specific pages
  if (typeof window === "undefined" || pathname === "/login" || pathname === "/signup") {
    return null
  }

  // Random positions within viewport bounds
  const getRandomPosition = () => {
    const maxX = window.innerWidth - 150
    const maxY = window.innerHeight - 150
    return {
      x: Math.random() * maxX,
      y: Math.max(100, Math.random() * (maxY - 300)), // Keep characters in upper part of screen
    }
  }

  // Reset inactivity timer whenever user moves mouse or types
  const resetInactivityTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current)
    }

    setUserInactive(false)

    inactivityTimer.current = setTimeout(() => {
      setUserInactive(true)
    }, 60000) // 1 minute of inactivity
  }

  // Initialize event listeners and timers
  useEffect(() => {
    // Set up event listeners for user activity
    window.addEventListener("mousemove", resetInactivityTimer)
    window.addEventListener("keydown", resetInactivityTimer)
    window.addEventListener("click", resetInactivityTimer)
    window.addEventListener("scroll", resetInactivityTimer)
    window.addEventListener("touchstart", resetInactivityTimer)
    window.addEventListener("touchmove", resetInactivityTimer)

    resetInactivityTimer()

    // Random appearances
    const appearanceInterval = setInterval(
      () => {
        const shouldAppear = Math.random() > 0.7
        if (shouldAppear && !isRoofusVisible && !userInactive) {
          const newPos = getRandomPosition()
          setRoofusPosition(newPos)
          setIsRoofusVisible(true)
          setRoofusAnimation("running")
          setRoofusDirection(Math.random() > 0.5 ? "right" : "left")

          // 30% chance Landon will chase Roofus
          if (Math.random() > 0.7) {
            setTimeout(() => {
              setLandonPosition({ x: newPos.x - 150, y: newPos.y })
              setIsLandonVisible(true)
              setIsChasing(true)

              setSpeechText("Roofus! We have reports to finish!")
              setShowSpeechBubble(true)
              setTimeout(() => setShowSpeechBubble(false), 3000)
            }, 1000)
          }
        }
      },
      isMobile ? 45000 : 30000,
    ) // Less frequent on mobile

    return () => {
      window.removeEventListener("mousemove", resetInactivityTimer)
      window.removeEventListener("keydown", resetInactivityTimer)
      window.removeEventListener("click", resetInactivityTimer)
      window.removeEventListener("scroll", resetInactivityTimer)
      window.removeEventListener("touchstart", resetInactivityTimer)
      window.removeEventListener("touchmove", resetInactivityTimer)

      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current)
      }

      clearInterval(appearanceInterval)
    }
  }, [isRoofusVisible, userInactive, isMobile])

  // Handle user inactivity - Landon whistles for Roofus
  useEffect(() => {
    if (userInactive && !isWhistling) {
      setIsWhistling(true)
      setLandonPosition({ x: window.innerWidth - 150, y: 100 })
      setIsLandonVisible(true)

      setTimeout(() => {
        setSpeechText("*Whistles* Roofus! Time to go home!")
        setShowSpeechBubble(true)

        setTimeout(() => {
          setIsRoofusVisible(true)
          setRoofusPosition({ x: window.innerWidth - 250, y: 100 })
          setRoofusAnimation("running")
          setRoofusDirection("right")

          setTimeout(() => {
            setRoofusAnimation("idle")
            setSpeechText("Coming! Let's check on those reports tomorrow!")
            setShowSpeechBubble(true)

            setTimeout(() => {
              setShowSpeechBubble(false)
              setIsRoofusVisible(false)
              setIsLandonVisible(false)
              setIsWhistling(false)
            }, 3000)
          }, 2000)
        }, 2000)
      }, 1000)
    }
  }, [userInactive, isWhistling])

  // Handle chase animation
  useEffect(() => {
    if (isChasing && isRoofusVisible && isLandonVisible) {
      const chaseInterval = setInterval(() => {
        // Move Roofus randomly
        const newRoofusPos = getRandomPosition()
        setRoofusPosition(newRoofusPos)
        setRoofusAnimation("running")
        setRoofusDirection(newRoofusPos.x > landonPosition.x ? "right" : "left")

        // Landon follows with a delay
        setTimeout(() => {
          setLandonPosition({
            x: newRoofusPos.x - 150,
            y: newRoofusPos.y,
          })
        }, 500)
      }, 3000)

      // End chase after some time
      setTimeout(() => {
        clearInterval(chaseInterval)
        setIsChasing(false)

        // Roofus gets "caught"
        setTimeout(() => {
          setRoofusAnimation("idle")
          setSpeechText("You got me! Let's help this customer!")
          setShowSpeechBubble(true)

          setTimeout(() => {
            setShowSpeechBubble(false)
            setIsRoofusVisible(false)
            setIsLandonVisible(false)
          }, 3000)
        }, 1000)
      }, 12000)

      return () => clearInterval(chaseInterval)
    }
  }, [isChasing, isRoofusVisible, isLandonVisible, landonPosition.x])

  // Random Trust The Fox logo appearance
  useEffect(() => {
    const logoInterval = setInterval(() => {
      if (Math.random() > 0.8 && !showTrustTheFox) {
        setShowTrustTheFox(true)
        setTimeout(() => setShowTrustTheFox(false), 5000)
      }
    }, 45000)

    return () => clearInterval(logoInterval)
  }, [showTrustTheFox])

  // Random Roofus animations
  useEffect(() => {
    if (isRoofusVisible && !isChasing) {
      const animationInterval = setInterval(() => {
        const animations = ["idle", "pointing", "jumping"] as const
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)]
        setRoofusAnimation(randomAnimation)

        setTimeout(() => {
          setRoofusAnimation("idle")
        }, 2000)
      }, 5000)

      return () => clearInterval(animationInterval)
    }
  }, [isRoofusVisible, isChasing])

  // Adjust size for mobile
  const characterSize = isMobile ? 80 : 120
  const speechBubbleClass = isMobile ? "max-w-[150px] text-xs p-1.5" : "max-w-[250px] text-sm p-2"

  return (
    <>
      {/* Roofus Character */}
      <AnimatePresence>
        {isRoofusVisible && (
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
              transform: roofusDirection === "left" ? "scaleX(-1)" : "none",
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/roofus.png"
                alt="Roofus"
                width={characterSize}
                height={characterSize}
                className={`object-contain ${
                  roofusAnimation === "idle"
                    ? ""
                    : roofusAnimation === "running"
                      ? "animate-bounce"
                      : roofusAnimation === "jumping"
                        ? "animate-pulse"
                        : "animate-pulse"
                }`}
              />
              {roofusAnimation === "pointing" && (
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
            {showSpeechBubble && isRoofusVisible && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`absolute top-0 ${
                  roofusDirection === "left" ? "right-full mr-2" : "left-full ml-2"
                } bg-white text-black rounded-lg border-2 border-neon-gold shadow-neon-glow whitespace-normal ${speechBubbleClass}`}
              >
                <div
                  className={`absolute ${
                    roofusDirection === "left" ? "right-0 translate-x-2" : "left-0 -translate-x-2"
                  } top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 ${
                    roofusDirection === "left"
                      ? "border-l-8 border-l-white border-r-0"
                      : "border-r-8 border-r-white border-l-0"
                  } border-transparent`}
                ></div>
                <p className="font-medium">{speechText}</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Landon Character */}
      <AnimatePresence>
        {isLandonVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed z-50 pointer-events-none"
            style={{
              left: landonPosition.x,
              top: landonPosition.y,
              width: characterSize,
              height: characterSize,
            }}
          >
            <Image
              src="/images/landon-roofus-portrait.png"
              alt="Landon"
              width={characterSize}
              height={characterSize}
              className={`object-contain ${isChasing ? "animate-bounce" : ""}`}
            />
            {showSpeechBubble && !isRoofusVisible && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`absolute top-0 right-full mr-2 bg-white text-black rounded-lg border-2 border-neon-gold shadow-neon-glow whitespace-normal ${speechBubbleClass}`}
              >
                <div className="absolute right-0 top-1/2 translate-x-2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-white"></div>
                <p className="font-medium">{speechText}</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trust The Fox Logo */}
      <AnimatePresence>
        {showTrustTheFox && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-6 left-6 z-50 cursor-pointer"
            onClick={() => window.open("https://trustthefox.com", "_blank")}
          >
            <Link href="https://trustthefox.com" target="_blank">
              <div className="relative group">
                <Image
                  src="/images/trust-the-fox-logo.png"
                  alt="Trust The Fox"
                  width={isMobile ? 80 : 120}
                  height={isMobile ? 80 : 120}
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-neon-gold px-3 py-1 rounded-full text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  Visit Trust The Fox
                </motion.div>
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
