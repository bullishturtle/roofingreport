"use client"

import type { ReactNode } from "react"
import dynamic from "next/dynamic"

// Dynamically import components that use window with no SSR
const RoofusAssistant = dynamic(() => import("@/components/roofus-assistant").then((mod) => mod.RoofusAssistant), {
  ssr: false,
})
const Animated3DCharacters = dynamic(
  () => import("@/components/3d-characters/animated-3d-characters").then((mod) => mod.Animated3DCharacters),
  { ssr: false },
)
const MobileActionDrawer = dynamic(
  () => import("@/components/mobile-action-drawer").then((mod) => mod.MobileActionDrawer),
  { ssr: false },
)
const ActionBar = dynamic(() => import("@/components/action-bar").then((mod) => mod.ActionBar), {
  ssr: false,
})

export function HomeClientWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Client-side only components */}
      <Animated3DCharacters />
      <RoofusAssistant />
      <MobileActionDrawer />
      <ActionBar />

      {/* Main content */}
      {children}
    </>
  )
}
