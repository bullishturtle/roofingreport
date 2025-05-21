"use client"

import type React from "react"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"

// Dynamically import components
const StarsBackground = dynamic(() => import("./stars-background"), {
  ssr: false,
})

const RoofusAssistantClient = dynamic(() => import("../roofus-assistant").then((mod) => mod.RoofusAssistant), {
  ssr: false,
})

export default function PageClientWrapper({ children }: { children?: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  // Don't show Roofus on login/signup pages
  const hideRoofus = pathname === "/login" || pathname === "/signup"

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <StarsBackground />
      {!hideRoofus && <RoofusAssistantClient />}
      {children}
    </>
  )
}
