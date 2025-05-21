"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

const RoofusAssistant = dynamic(() => import("../roofus-assistant").then((mod) => mod.RoofusAssistant), {
  loading: () => null,
  ssr: false,
})

export default function RoofusAssistantWrapper() {
  const [mounted, setMounted] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Error handling
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes("Roofus")) {
        console.error("Error in RoofusAssistantWrapper:", event.error)
        setHasError(true)
      }
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  if (!mounted || hasError) {
    return null
  }

  return <RoofusAssistant />
}
