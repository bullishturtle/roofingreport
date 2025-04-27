"use client"

import dynamic from "next/dynamic"

const RoofusAssistant = dynamic(() => import("@/components/roofus-assistant"), { ssr: false })

export default function RoofusAssistantDashboardWrapper() {
  return <RoofusAssistant />
}
