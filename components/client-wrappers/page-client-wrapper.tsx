"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Import client components with dynamic imports
const RoofusAssistantWrapper = dynamic(() => import("./roofus-assistant-wrapper"), {
  ssr: false,
  loading: () => null,
})

const Animated3DCharactersWrapper = dynamic(() => import("./animated-3d-characters-wrapper"), {
  ssr: false,
  loading: () => null,
})

const ActionBarWrapper = dynamic(() => import("./action-bar-wrapper"), {
  ssr: false,
  loading: () => null,
})

const MobileActionDrawerWrapper = dynamic(() => import("./mobile-action-drawer-wrapper"), {
  ssr: false,
  loading: () => null,
})

const HeroSearchWrapper = dynamic(() => import("./hero-search-wrapper"), {
  ssr: false,
  loading: () => null,
})

const StarsBackground = dynamic(() => import("./stars-background"), {
  ssr: false,
  loading: () => null,
})

export default function PageClientWrapper() {
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
      <Animated3DCharactersWrapper />
      <RoofusAssistantWrapper />
      <MobileActionDrawerWrapper />
      <ActionBarWrapper />
    </>
  )
}
