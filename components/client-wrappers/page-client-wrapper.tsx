"use client"

import type React from "react"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Dynamically import the StarsBackground component
const StarsBackground = dynamic(() => import("./stars-background"), {
  ssr: false,
})

// Dynamically import the RoofusAssistant with no SSR
const RoofusAssistantClient = dynamic(() => import("../roofus-assistant").then((mod) => mod.RoofusAssistant), {
  ssr: false,
})

export default function PageClientWrapper({ children }: { children?: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <StarsBackground />
      <RoofusAssistantClient />
      {children}
    </>
  )
}
