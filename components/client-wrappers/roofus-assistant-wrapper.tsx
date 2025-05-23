"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

const RoofusAssistant = dynamic(() => import("../roofus-assistant").then((mod) => mod.RoofusAssistant), {
  loading: () => (
    <div className="fixed bottom-6 right-6 z-50">
      <Skeleton className="h-16 w-16 rounded-full" />
    </div>
  ),
  ssr: false,
})

export default function RoofusAssistantWrapper() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <RoofusAssistant />
}
