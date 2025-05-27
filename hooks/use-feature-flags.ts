"use client"

import { useEffect, useState } from "react"

interface FeatureFlags {
  enableAdvancedDemo?: boolean
  showProUpgrade?: boolean
  enableRoofusChat?: boolean
}

export function useFeatureFlags(userId?: string) {
  const [flags, setFlags] = useState<FeatureFlags>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFlags() {
      try {
        const params = userId ? `?userId=${userId}` : ""
        const response = await fetch(`/api/feature-flags${params}`)

        if (response.ok) {
          const data = await response.json()
          setFlags(data)
        }
      } catch (error) {
        console.error("Failed to fetch feature flags:", error)
        // Set default flags on error
        setFlags({
          enableAdvancedDemo: true,
          showProUpgrade: true,
          enableRoofusChat: true,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchFlags()
  }, [userId])

  return { flags, loading }
}
