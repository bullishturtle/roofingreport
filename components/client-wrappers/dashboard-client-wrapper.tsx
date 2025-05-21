"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Import client components with dynamic imports and improved error handling
const StatsCards = dynamic(() => import("../dashboard/stats-cards"), {
  loading: () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-24 border border-white/10 bg-white/5 rounded-md animate-pulse" />
      ))}
    </div>
  ),
  ssr: false,
})

export default function DashboardClientWrapper() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 border border-white/10 bg-white/5 rounded-md animate-pulse" />
        ))}
      </div>
    )
  }

  return <StatsCards />
}
