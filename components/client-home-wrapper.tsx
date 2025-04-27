"use client"

import { useEffect, useState } from "react"
import { ActionBar } from "@/components/action-bar"
import { MobileActionDrawer } from "@/components/mobile-action-drawer"
import { RoofusAIAssistant } from "@/components/roofus-ai-assistant"

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
      {/* Replace static action bar with dynamic one */}
      <ActionBar />

      {/* Mobile action drawer */}
      <MobileActionDrawer />

      {/* Roofus AI Assistant */}
      <RoofusAIAssistant />
    </>
  )
}
