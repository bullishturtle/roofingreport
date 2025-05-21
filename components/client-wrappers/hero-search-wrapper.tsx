"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { HeroSearch } from "../hero-search"

// Dynamically import the HeroRoofus component
const HeroRoofus = dynamic(() => import("../hero-roofus").then((mod) => mod.HeroRoofus), {
  ssr: false,
})

export function HeroSearchWrapper() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative">
      <HeroSearch />
      <HeroRoofus />
    </div>
  )
}
