"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

interface AnalyticsContextType {
  trackEvent: (eventName: string, properties?: Record<string, any>) => void
  trackPageView: (url: string, referrer?: string) => void
  setUserProperties: (properties: Record<string, any>) => void
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Initialize analytics
    if (typeof window !== "undefined" && !isInitialized) {
      // Initialize analytics services here
      console.log("Analytics initialized")
      setIsInitialized(true)
    }
  }, [isInitialized])

  // Track page views
  useEffect(() => {
    if (!isInitialized) return

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
    trackPageView(url)
  }, [pathname, searchParams, isInitialized])

  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    if (!isInitialized) return

    // Track event in analytics services
    console.log(`Analytics Event: ${eventName}`, properties)

    // Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", eventName, properties)
    }
  }

  const trackPageView = (url: string, referrer?: string) => {
    if (!isInitialized) return

    // Track page view in analytics services
    console.log(`Page View: ${url}`, { referrer })

    // Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", "G-MEASUREMENT_ID", {
        page_path: url,
        page_referrer: referrer,
      })
    }
  }

  const setUserProperties = (properties: Record<string, any>) => {
    if (!isInitialized) return

    // Set user properties in analytics services
    console.log("User Properties:", properties)

    // Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("set", "user_properties", properties)
    }
  }

  return (
    <AnalyticsContext.Provider
      value={{
        trackEvent,
        trackPageView,
        setUserProperties,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (context === undefined) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider")
  }
  return context
}
