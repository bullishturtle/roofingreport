"use client"

import dynamic from "next/dynamic"
import { useState, useEffect } from "react"

// Dynamically import the AnimatedRoofus component with no SSR
const AnimatedRoofusClient = dynamic(() => import("./animated-roofus").then((mod) => mod.AnimatedRoofus), {
  ssr: false,
})

export function RoofusWrapper() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return <AnimatedRoofusClient />
}
