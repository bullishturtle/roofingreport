"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Dynamically import client components
const AnimatedCharacters = dynamic(
  () => import("@/components/animated-characters").then((mod) => mod.AnimatedCharacters),
  {
    loading: () => null,
  },
)

const RoofusAssistant = dynamic(() => import("@/components/roofus-assistant").then((mod) => mod.RoofusAssistant), {
  loading: () => null,
})

const MobileActionDrawer = dynamic(() => import("@/components/mobile-action-drawer").then((mod) => mod.default), {
  loading: () => null,
})

const ActionBar = dynamic(() => import("@/components/action-bar").then((mod) => mod.default), {
  loading: () => null,
})

export function ClientHomeWrapper() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <AnimatedCharacters />
      <RoofusAssistant />
      <MobileActionDrawer />
      <div id="action-bar-container">
        <ActionBar />
      </div>
    </>
  )
}
