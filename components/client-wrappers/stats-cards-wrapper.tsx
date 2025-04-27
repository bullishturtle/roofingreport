"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

const StatsCards = dynamic(() => import("../dashboard/stats-cards"), {
  loading: () => null,
})

export default function StatsCardsWrapper() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <StatsCards />
}
