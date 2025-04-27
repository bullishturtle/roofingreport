"use client"

import dynamic from "next/dynamic"

const StatsCards = dynamic(() => import("@/components/dashboard/stats-cards"), { ssr: false })

export default function StatsCardsWrapper() {
  return <StatsCards />
}
