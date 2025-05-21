"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

const RoofusAssistant = dynamic(() => import("../roofus-assistant").then((mod) => mod.RoofusAssistant), {
  loading: () => null,
  ssr: false,
})

export default function RoofusAssistantWrapper() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <RoofusAssistant />
}
