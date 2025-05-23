"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { usePathname } from "next/navigation"

interface PerformanceMetrics {
  pageLoadTime?: number
  firstContentfulPaint?: number
  largestContentfulPaint?: number
  cumulativeLayoutShift?: number
  firstInputDelay?: number
  timeToInteractive?: number
}

interface PerformanceContextType {
  metrics: PerformanceMetrics
  reportCustomMetric: (name: string, value: number) => void
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined)

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({})
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === "undefined") return

    // Reset metrics on route change
    setMetrics({})

    // Monitor Core Web Vitals
    observeWebVitals()

    // Monitor page load time
    window.addEventListener("load", () => {
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
      setMetrics((prev) => ({
        ...prev,
        pageLoadTime: navigation.loadEventEnd - navigation.loadEventStart,
      }))
    })

    return () => {
      // Clean up observers if needed
    }
  }, [pathname])

  const observeWebVitals = () => {
    if (typeof window === "undefined") return

    try {
      // First Contentful Paint
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === "first-contentful-paint") {
            setMetrics((prev) => ({
              ...prev,
              firstContentfulPaint: entry.startTime,
            }))
          }
        }
      }).observe({ type: "paint", buffered: true })

      // Largest Contentful Paint
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        setMetrics((prev) => ({
          ...prev,
          largestContentfulPaint: lastEntry.startTime,
        }))
      }).observe({ type: "largest-contentful-paint", buffered: true })

      // Cumulative Layout Shift
      new PerformanceObserver((list) => {
        let clsValue = 0
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
          }
        }
        setMetrics((prev) => ({
          ...prev,
          cumulativeLayoutShift: clsValue,
        }))
      }).observe({ type: "layout-shift", buffered: true })

      // First Input Delay
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          setMetrics((prev) => ({
            ...prev,
            firstInputDelay: (entry as any).processingStart - entry.startTime,
          }))
        }
      }).observe({ type: "first-input", buffered: true })
    } catch (error) {
      console.error("Error setting up performance observers:", error)
    }
  }

  const reportCustomMetric = (name: string, value: number) => {
    console.log(`Custom Performance Metric - ${name}:`, value)

    // Report to analytics if available
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "performance_metric", {
        metric_name: name,
        metric_value: value,
      })
    }
  }

  return (
    <PerformanceContext.Provider
      value={{
        metrics,
        reportCustomMetric,
      }}
    >
      {children}
    </PerformanceContext.Provider>
  )
}

export function usePerformance() {
  const context = useContext(PerformanceContext)
  if (context === undefined) {
    throw new Error("usePerformance must be used within a PerformanceProvider")
  }
  return context
}
