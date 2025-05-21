"use client"

import type React from "react"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"

// Dynamically import components
const StarsBackground = dynamic(() => import("./stars-background"), {
  ssr: false,
})

// We don't need to import RoofusAssistant here since it's conditionally rendered in its own component

export default function PageClientWrapper({ children }: { children?: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [hasError, setHasError] = useState(false)
  const pathname = usePathname()

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
      {children}
    </>
  )
}
