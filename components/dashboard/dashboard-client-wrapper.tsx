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

export function DashboardClientWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Client-side only components */}
      <RoofusAssistant />
      <Animated3DCharacters />

      {/* Main content */}
      {children}
    </>
  )
}
