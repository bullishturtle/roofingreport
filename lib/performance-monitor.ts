"use client"

interface PerformanceMetrics {
  pageLoadTime: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
  firstInputDelay: number
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {}

  constructor() {
    if (typeof window !== "undefined") {
      this.initializeMonitoring()
    }
  }

  private initializeMonitoring() {
    // Monitor Core Web Vitals
    this.observeWebVitals()

    // Monitor page load time
    window.addEventListener("load", () => {
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
      this.metrics.pageLoadTime = navigation.loadEventEnd - navigation.loadEventStart
      this.reportMetrics()
    })
  }

  private observeWebVitals() {
    // First Contentful Paint
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === "first-contentful-paint") {
          this.metrics.firstContentfulPaint = entry.startTime
        }
      }
    }).observe({ entryTypes: ["paint"] })

    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      this.metrics.largestContentfulPaint = lastEntry.startTime
    }).observe({ entryTypes: ["largest-contentful-paint"] })

    // Cumulative Layout Shift
    new PerformanceObserver((list) => {
      let clsValue = 0
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value
        }
      }
      this.metrics.cumulativeLayoutShift = clsValue
    }).observe({ entryTypes: ["layout-shift"] })

    // First Input Delay
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.metrics.firstInputDelay = (entry as any).processingStart - entry.startTime
      }
    }).observe({ entryTypes: ["first-input"] })
  }

  private reportMetrics() {
    // Send metrics to analytics service
    console.log("Performance Metrics:", this.metrics)

    // You can send this to your analytics service
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "performance_metrics", {
        custom_map: this.metrics,
      })
    }
  }

  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics }
  }
}

export const performanceMonitor = new PerformanceMonitor()

export function usePerformanceMonitoring() {
  return {
    getMetrics: () => performanceMonitor.getMetrics(),
    reportCustomMetric: (name: string, value: number) => {
      console.log(`Custom Metric - ${name}:`, value)
    },
  }
}
