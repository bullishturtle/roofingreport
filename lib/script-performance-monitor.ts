/**
 * Script Performance Monitor
 *
 * Monitors the performance impact of third-party scripts and reports issues.
 */

type ScriptPerformanceEntry = {
  name: string
  duration: number
  size: number
  startTime: number
  category?: string
}

type ScriptPerformanceReport = {
  url: string
  timestamp: number
  scripts: ScriptPerformanceEntry[]
  totalScriptTime: number
  totalScriptSize: number
  longestScript: ScriptPerformanceEntry
  largestScript: ScriptPerformanceEntry
}

// Performance thresholds
const SCRIPT_TIME_THRESHOLD = 300 // ms
const SCRIPT_SIZE_THRESHOLD = 100 * 1024 // 100KB
const TOTAL_SCRIPT_TIME_THRESHOLD = 1000 // 1s
const TOTAL_SCRIPT_SIZE_THRESHOLD = 500 * 1024 // 500KB

/**
 * Monitors script performance and reports issues
 */
export function monitorScriptPerformance(): void {
  if (typeof window === "undefined" || !window.performance || !window.performance.getEntriesByType) {
    return
  }

  // Wait for page to be fully loaded
  window.addEventListener("load", () => {
    // Give some time for scripts to complete
    setTimeout(() => {
      const report = generateScriptPerformanceReport()

      // Log performance issues
      logScriptPerformanceIssues(report)

      // Send report to analytics endpoint
      sendScriptPerformanceReport(report)
    }, 3000)
  })
}

/**
 * Generates a performance report for scripts
 */
function generateScriptPerformanceReport(): ScriptPerformanceReport {
  const resourceEntries = window.performance.getEntriesByType("resource") as PerformanceResourceTiming[]

  // Filter for script resources
  const scriptEntries = resourceEntries.filter((entry) => {
    return entry.initiatorType === "script" || entry.name.endsWith(".js")
  })

  // Process script entries
  const scripts: ScriptPerformanceEntry[] = scriptEntries.map((entry) => {
    // Try to get script element to check for data attributes
    const scriptElements = document.querySelectorAll("script")
    let category: string | undefined

    for (const element of scriptElements) {
      if (element.src === entry.name) {
        category = element.getAttribute("data-category") || undefined
        break
      }
    }

    return {
      name: entry.name,
      duration: entry.duration,
      size: entry.transferSize || 0,
      startTime: entry.startTime,
      category,
    }
  })

  // Calculate totals
  const totalScriptTime = scripts.reduce((total, script) => total + script.duration, 0)
  const totalScriptSize = scripts.reduce((total, script) => total + script.size, 0)

  // Find longest and largest scripts
  const longestScript = scripts.reduce(
    (longest, script) => (script.duration > longest.duration ? script : longest),
    scripts[0] || { name: "", duration: 0, size: 0, startTime: 0 },
  )

  const largestScript = scripts.reduce(
    (largest, script) => (script.size > largest.size ? script : largest),
    scripts[0] || { name: "", duration: 0, size: 0, startTime: 0 },
  )

  return {
    url: window.location.href,
    timestamp: Date.now(),
    scripts,
    totalScriptTime,
    totalScriptSize,
    longestScript,
    largestScript,
  }
}

/**
 * Logs script performance issues to console
 */
function logScriptPerformanceIssues(report: ScriptPerformanceReport): void {
  const issues: string[] = []

  // Check for overall issues
  if (report.totalScriptTime > TOTAL_SCRIPT_TIME_THRESHOLD) {
    issues.push(
      `Total script execution time (${Math.round(report.totalScriptTime)}ms) exceeds threshold (${TOTAL_SCRIPT_TIME_THRESHOLD}ms)`,
    )
  }

  if (report.totalScriptSize > TOTAL_SCRIPT_SIZE_THRESHOLD) {
    issues.push(
      `Total script size (${Math.round(report.totalScriptSize / 1024)}KB) exceeds threshold (${TOTAL_SCRIPT_SIZE_THRESHOLD / 1024}KB)`,
    )
  }

  // Check for individual script issues
  report.scripts.forEach((script) => {
    if (script.duration > SCRIPT_TIME_THRESHOLD) {
      issues.push(
        `Script ${new URL(script.name).hostname} took ${Math.round(script.duration)}ms to execute (threshold: ${SCRIPT_TIME_THRESHOLD}ms)`,
      )
    }

    if (script.size > SCRIPT_SIZE_THRESHOLD) {
      issues.push(
        `Script ${new URL(script.name).hostname} size is ${Math.round(script.size / 1024)}KB (threshold: ${SCRIPT_SIZE_THRESHOLD / 1024}KB)`,
      )
    }
  })

  // Log issues if any
  if (issues.length > 0) {
    console.warn("Script Performance Issues Detected:")
    issues.forEach((issue) => console.warn(`- ${issue}`))
    console.warn("Longest script:", report.longestScript.name, `(${Math.round(report.longestScript.duration)}ms)`)
    console.warn("Largest script:", report.largestScript.name, `(${Math.round(report.largestScript.size / 1024)}KB)`)
  }
}

/**
 * Sends script performance report to analytics endpoint
 */
function sendScriptPerformanceReport(report: ScriptPerformanceReport): void {
  // Only send if there are performance issues
  if (report.totalScriptTime > TOTAL_SCRIPT_TIME_THRESHOLD || report.totalScriptSize > TOTAL_SCRIPT_SIZE_THRESHOLD) {
    // Use sendBeacon if available for reliable delivery
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/analytics/script-performance", JSON.stringify(report))
    } else {
      // Fallback to fetch
      fetch("/api/analytics/script-performance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(report),
        // Use keepalive to ensure delivery even if page is unloading
        keepalive: true,
      }).catch((err) => console.error("Failed to send script performance report:", err))
    }
  }
}
