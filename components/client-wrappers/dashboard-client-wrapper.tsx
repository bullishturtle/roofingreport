"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Import client components with dynamic imports
const RoofusAssistantDashboardWrapper = dynamic(() => import("./roofus-assistant-dashboard-wrapper"), {
  ssr: false,
  loading: () => null,
})

const StatsCardsWrapper = dynamic(() => import("./stats-cards-wrapper"), {
  ssr: false,
  loading: () => null,
})

export default function DashboardClientWrapper() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <RoofusAssistantDashboardWrapper />
      <StatsCardsWrapper />
    </>
  )
}
