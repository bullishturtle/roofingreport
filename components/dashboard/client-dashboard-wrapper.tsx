"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Dynamically import client components
const RoofusAssistant = dynamic(() => import("@/components/roofus-assistant").then((mod) => mod.RoofusAssistant), {
  loading: () => null,
})

const StatsCards = dynamic(() => import("@/components/dashboard/stats-cards").then((mod) => mod.StatsCards), {
  loading: () => null,
})

export function ClientDashboardWrapper() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <RoofusAssistant />
      <div id="stats-cards-container"></div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              // Replace static stats cards with dynamic ones after client-side hydration
              const container = document.getElementById('stats-cards-container');
              if (container) {
                const statsCardsElement = document.querySelector('.grid.gap-4.md\\\\:grid-cols-2.lg\\\\:grid-cols-4');
                if (statsCardsElement) {
                  // Mark the element for replacement
                  statsCardsElement.setAttribute('data-replace-with-dynamic', 'true');
                }
              }
            });
          `,
        }}
      />
    </>
  )
}
