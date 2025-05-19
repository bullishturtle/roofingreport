"use client"

import { onCLS, onFID, onLCP, onTTFB, onINP } from "web-vitals"

type MetricName = "CLS" | "FID" | "LCP" | "TTFB" | "INP"

type MetricData = {
  id: string
  name: MetricName
  value: number
  rating: "good" | "needs-improvement" | "poor"
  delta: number
  navigationType: string | undefined
}

type SendMetricFn = (metric: MetricData) => void

// Determine the rating based on the metric value
function getRating(name: MetricName, value: number): "good" | "needs-improvement" | "poor" {
  switch (name) {
    case "CLS":
      return value <= 0.1 ? "good" : value <= 0.25 ? "needs-improvement" : "poor"
    case "FID":
      return value <= 100 ? "good" : value <= 300 ? "needs-improvement" : "poor"
    case "LCP":
      return value <= 2500 ? "good" : value <= 4000 ? "needs-improvement" : "poor"
    case "TTFB":
      return value <= 800 ? "good" : value <= 1800 ? "needs-improvement" : "poor"
    case "INP":
      return value <= 200 ? "good" : value <= 500 ? "needs-improvement" : "poor"
    default:
      return "needs-improvement"
  }
}

// Report the metric to our analytics endpoint
async function reportWebVital(metric: MetricData) {
  // Use sendBeacon if available, falling back to fetch
  const url = "/api/analytics/web-vitals"
  const body = JSON.stringify({
    ...metric,
    // Add additional context
    url: window.location.href,
    userAgent: navigator.userAgent,
    timestamp: Date.now(),
  })

  // Use sendBeacon for better reliability when page is unloading
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body)
  } else {
    // Fall back to fetch
    try {
      await fetch(url, {
        body,
        method: "POST",
        keepalive: true,
        headers: { "Content-Type": "application/json" },
      })
    } catch (error) {
      console.error("Failed to report Web Vital:", error)
    }
  }
}

// Function to report all web vitals
export function reportWebVitals() {
  try {
    const sendMetric: SendMetricFn = (metric) => {
      // Add the rating
      const ratedMetric = {
        ...metric,
        rating: getRating(metric.name, metric.value),
      }

      // Report the metric
      reportWebVital(ratedMetric)

      // Also log to console in development
      if (process.env.NODE_ENV === "development") {
        console.log(`Web Vital: ${metric.name}`, {
          value: metric.value,
          rating: ratedMetric.rating,
          delta: metric.delta,
        })
      }
    }

    // Monitor all the Core Web Vitals plus TTFB
    onCLS(sendMetric)
    onFID(sendMetric)
    onLCP(sendMetric)
    onTTFB(sendMetric)
    onINP(sendMetric) // Interaction to Next Paint (experimental)
  } catch (error) {
    console.error("Failed to initialize Web Vitals reporting:", error)
  }
}
