"use client"

import type React from "react"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"

// Dynamically import components
const StarsBackground = dynamic(() => import("./stars-background"), {
  ssr: false,
})

const RoofusAssistant = dynamic(() => import("../roofus-assistant").then((mod) => mod.RoofusAssistant), {
  ssr: false,
  loading: () => null,
})

export default function PageClientWrapper({ children }: { children?: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [hasError, setHasError] = useState(false)
  const pathname = usePathname()

  // Don't show Roofus on login/signup pages
  const hideRoofus = pathname === "/login" || pathname === "/signup"

  useEffect(() => {
    setMounted(true)

    // Error handling
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes("Roofus")) {
        console.error("Error in PageClientWrapper:", event.error)
        setHasError(true)
      }
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <StarsBackground />
      {!hideRoofus && !hasError && <RoofusAssistant />}
      {children}
    </>
  )
}
