"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { ErrorBoundary } from "@/components/error-boundary"
import { LoadingSpinner } from "@/components/loading-spinner"
import dynamic from "next/dynamic"
import { trackPageView } from "@/lib/analytics"

// Dynamically import components that use window with no SSR
const RoofusAssistant = dynamic(() => import("@/components/roofus-assistant").then((mod) => mod.RoofusAssistant), {
  ssr: false,
  loading: () => <LoadingSpinner className="fixed bottom-6 right-6 z-50" />,
})

const Animated3DCharacters = dynamic(
  () => import("@/components/3d-characters/animated-3d-characters").then((mod) => mod.Animated3DCharacters),
  {
    ssr: false,
    loading: () => null, // No loading state needed for background animation
  },
)

export function DashboardClientWrapper({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Track page view
    trackPageView(window.location.pathname)

    // Mark as loaded after a short delay to ensure smooth transitions
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Main content with error boundary */}
      <ErrorBoundary>{children}</ErrorBoundary>

      {/* Client-side only components with their own error boundaries */}
      {isLoaded && (
        <>
          <ErrorBoundary fallback={null}>
            <Suspense fallback={null}>
              <Animated3DCharacters />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary fallback={null}>
            <Suspense fallback={<LoadingSpinner className="fixed bottom-6 right-6 z-50" />}>
              <RoofusAssistant />
            </Suspense>
          </ErrorBoundary>
        </>
      )}
    </>
  )
}
