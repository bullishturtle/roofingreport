"use client"

import type React from "react"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { RoofusAssistant } from "../roofus-assistant"

// Dynamically import the StarsBackground component
const StarsBackground = dynamic(() => import("./stars-background"), {
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
      <RoofusAssistant />
      {children}
    </>
  )
}
