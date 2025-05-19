import { sql } from "./db"
import { sendEmail } from "./email"

type AlertThresholds = {
  LCP: number
  CLS: number
  FID: number
  TTFB: number
  INP: number
  goodPercent: number
}

const DEFAULT_THRESHOLDS: AlertThresholds = {
  LCP: 4000, // 4 seconds
  CLS: 0.25, // 0.25 score
  FID: 300, // 300ms
  TTFB: 1800, // 1.8 seconds
  INP: 500, // 500ms
  goodPercent: 75, // 75% good metrics
}

export async function checkWebVitalsAlerts(customThresholds?: Partial<AlertThresholds>) {
  try {
    const thresholds = { ...DEFAULT_THRESHOLDS, ...customThresholds }

    // Get the latest aggregated metrics
    const latestMetrics = await sql`
      WITH daily_metrics AS (
        SELECT 
          DATE_TRUNC('day', timestamp) as day,
          AVG(CASE WHEN metric_name = 'LCP' THEN metric_value END) as "LCP",
          AVG(CASE WHEN metric_name = 'CLS' THEN metric_value END) as "CLS",
          AVG(CASE WHEN metric_name = 'FID' THEN metric_value END) as "FID",
          AVG(CASE WHEN metric_name = 'TTFB' THEN metric_value END) as "TTFB",
          AVG(CASE WHEN metric_name = 'INP' THEN metric_value END) as "INP",
          100.0 * COUNT(CASE WHEN metric_rating = 'good' THEN 1 END) / NULLIF(COUNT(*), 0) as "goodPercent"
        FROM web_vitals
        WHERE timestamp > NOW() - INTERVAL '7 days'
        GROUP BY DATE_TRUNC('day', timestamp)
      )
      SELECT * FROM daily_metrics
      ORDER BY day DESC
      LIMIT 1
    `

    if (!latestMetrics || latestMetrics.length === 0) {
      console.log("No metrics available for alerts")
      return
    }

    const metrics = latestMetrics[0]
    const alerts = []

    // Check each metric against thresholds
    if (metrics.LCP > thresholds.LCP) {
      alerts.push(`LCP is ${(metrics.LCP / 1000).toFixed(2)}s (threshold: ${(thresholds.LCP / 1000).toFixed(2)}s)`)
    }

    if (metrics.CLS > thresholds.CLS) {
      alerts.push(`CLS is ${metrics.CLS.toFixed(3)} (threshold: ${thresholds.CLS.toFixed(3)})`)
    }

    if (metrics.FID > thresholds.FID) {
      alerts.push(`FID is ${metrics.FID.toFixed(0)}ms (threshold: ${thresholds.FID}ms)`)
    }

    if (metrics.TTFB > thresholds.TTFB) {
      alerts.push(`TTFB is ${(metrics.TTFB / 1000).toFixed(2)}s (threshold: ${(thresholds.TTFB / 1000).toFixed(2)}s)`)
    }

    if (metrics.INP > thresholds.INP) {
      alerts.push(`INP is ${metrics.INP.toFixed(0)}ms (threshold: ${thresholds.INP}ms)`)
    }

    if (metrics.goodPercent < thresholds.goodPercent) {
      alerts.push(
        `Only ${metrics.goodPercent.toFixed(1)}% of metrics are rated "good" (threshold: ${thresholds.goodPercent}%)`,
      )
    }

    // If we have alerts, send an email
    if (alerts.length > 0) {
      const alertMessage = `
        <h1>Web Vitals Performance Alert</h1>
        <p>The following Core Web Vitals metrics have exceeded their thresholds:</p>
        <ul>
          ${alerts.map((alert) => `<li>${alert}</li>`).join("")}
        </ul>
        <p>Please check the Web Vitals dashboard for more details.</p>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/web-vitals">View Dashboard</a></p>
      `

      await sendEmail({
        to: process.env.EMAIL_FROM || "admin@rooffax.report",
        subject: "RoofFax Web Vitals Alert",
        html: alertMessage,
      })

      console.log("Web Vitals alert sent:", alerts)
    } else {
      console.log("All Web Vitals metrics are within acceptable thresholds")
    }

    return alerts
  } catch (error) {
    console.error("Error checking Web Vitals alerts:", error)
    throw error
  }
}
