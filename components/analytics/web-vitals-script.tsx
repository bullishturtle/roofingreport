"use client"

import { useEffect } from "react"
import { reportWebVitals } from "@/lib/web-vitals"

export function WebVitalsScript() {
  useEffect(() => {
    // Initialize web vitals reporting
    reportWebVitals()
  }, [])

  // This component doesn't render anything
  return null
}
