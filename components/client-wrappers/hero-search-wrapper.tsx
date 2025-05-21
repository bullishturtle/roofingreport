"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { HeroSearch } from "../hero-search"

// Dynamically import the HeroRoofus component
const HeroRoofusSupabase = dynamic(() => import("../hero-roofus-supabase").then((mod) => mod.HeroRoofusSupabase), {
  ssr: false,
  loading: () => null,
})

export function HeroSearchWrapper() {
  const [mounted, setMounted] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Error handling
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes("Roofus")) {
        console.error("Error in HeroSearchWrapper:", event.error)
        setHasError(true)
      }
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative">
      <HeroSearch />
      {!hasError && <HeroRoofusSupabase />}
    </div>
  )
}
