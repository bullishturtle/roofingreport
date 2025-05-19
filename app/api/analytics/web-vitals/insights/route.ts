import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    // Get the latest aggregated metrics
    const latestMetrics = await sql`
      WITH daily_metrics AS (
        SELECT 
          DATE_TRUNC('day', timestamp) as day,
          AVG(CASE WHEN metric_name = 'LCP' THEN metric_value END) as "LCP",
          AVG(CASE WHEN metric_name = 'CLS' THEN metric_value END) as "CLS",
          AVG(CASE WHEN metric_name = 'FID' THEN metric_value END) as "FID",
          AVG(CASE WHEN metric_name = 'TTFB' THEN metric_value END) as "TTFB",
          AVG(CASE WHEN metric_name = 'INP' THEN metric_value END) as "INP"
        FROM web_vitals
        WHERE timestamp > NOW() - INTERVAL '7 days'
        GROUP BY DATE_TRUNC('day', timestamp)
      )
      SELECT * FROM daily_metrics
      ORDER BY day DESC
      LIMIT 1
    `

    if (!latestMetrics || latestMetrics.length === 0) {
      return NextResponse.json({ insights: [] })
    }

    const metrics = latestMetrics[0]
    const insights = []

    // Generate insights based on metrics
    if (metrics.LCP > 2500) {
      insights.push({
        id: "lcp-issue",
        metric: "LCP",
        issue: `Largest Contentful Paint is slow at ${(metrics.LCP / 1000).toFixed(2)}s (should be under 2.5s)`,
        impact: metrics.LCP > 4000 ? "high" : "medium",
        recommendation:
          "Optimize your largest content elements (images, videos, or block-level elements). Consider lazy loading off-screen images and implementing proper image sizing.",
        resources: [
          { title: "Optimize LCP", url: "https://web.dev/optimize-lcp/" },
          {
            title: "Image Optimization",
            url: "https://nextjs.org/docs/pages/building-your-application/optimizing/images",
          },
        ],
      })
    }

    if (metrics.CLS > 0.1) {
      insights.push({
        id: "cls-issue",
        metric: "CLS",
        issue: `Cumulative Layout Shift is high at ${metrics.CLS.toFixed(3)} (should be under 0.1)`,
        impact: metrics.CLS > 0.25 ? "high" : "medium",
        recommendation:
          "Ensure elements have proper dimensions, especially images and ads. Avoid inserting content above existing content unless in response to user interaction.",
        resources: [
          { title: "Optimize CLS", url: "https://web.dev/optimize-cls/" },
          { title: "Debug Layout Shifts", url: "https://web.dev/debug-layout-shifts/" },
        ],
      })
    }

    if (metrics.FID > 100) {
      insights.push({
        id: "fid-issue",
        metric: "FID",
        issue: `First Input Delay is slow at ${metrics.FID.toFixed(0)}ms (should be under 100ms)`,
        impact: metrics.FID > 300 ? "high" : "medium",
        recommendation:
          "Break up long tasks, optimize JavaScript execution, and reduce JavaScript bundle size. Consider code splitting and deferring non-critical JavaScript.",
        resources: [
          { title: "Optimize FID", url: "https://web.dev/optimize-fid/" },
          { title: "Reduce JavaScript Execution Time", url: "https://web.dev/optimize-long-tasks/" },
        ],
      })
    }

    if (metrics.TTFB > 800) {
      insights.push({
        id: "ttfb-issue",
        metric: "TTFB",
        issue: `Time to First Byte is slow at ${(metrics.TTFB / 1000).toFixed(2)}s (should be under 0.8s)`,
        impact: metrics.TTFB > 1800 ? "high" : "medium",
        recommendation:
          "Optimize server response times, consider using CDN, implement caching, and optimize database queries.",
        resources: [
          { title: "Optimize TTFB", url: "https://web.dev/optimize-ttfb/" },
          { title: "Server Timing API", url: "https://web.dev/custom-metrics/#server-timing-api" },
        ],
      })
    }

    if (metrics.INP > 200) {
      insights.push({
        id: "inp-issue",
        metric: "INP",
        issue: `Interaction to Next Paint is slow at ${metrics.INP.toFixed(0)}ms (should be under 200ms)`,
        impact: metrics.INP > 500 ? "high" : "medium",
        recommendation:
          "Optimize event handlers, avoid heavy JavaScript execution during interactions, and ensure the main thread is not blocked.",
        resources: [
          { title: "Optimize INP", url: "https://web.dev/optimize-inp/" },
          { title: "Debug INP Issues", url: "https://web.dev/debug-inp-in-the-field/" },
        ],
      })
    }

    // Get problematic URLs
    const problematicUrls = await sql`
      WITH url_metrics AS (
        SELECT 
          url,
          metric_name,
          AVG(metric_value) as avg_value,
          COUNT(*) as sample_count
        FROM web_vitals
        WHERE 
          timestamp > NOW() - INTERVAL '7 days'
          AND metric_rating = 'poor'
        GROUP BY url, metric_name
        HAVING COUNT(*) > 5
      )
      SELECT * FROM url_metrics
      ORDER BY avg_value DESC
      LIMIT 10
    `

    if (problematicUrls && problematicUrls.length > 0) {
      insights.push({
        id: "problematic-urls",
        metric: "Multiple",
        issue: "Some pages are consistently showing poor performance metrics",
        impact: "high",
        recommendation:
          "Focus optimization efforts on these specific pages that are showing poor performance metrics consistently.",
        resources: problematicUrls.map((row) => ({
          title: `${row.url} (${row.metric_name}: ${row.metric_name === "CLS" ? row.avg_value.toFixed(3) : Math.round(row.avg_value)}${row.metric_name === "CLS" ? "" : "ms"})`,
          url: row.url,
        })),
      })
    }

    return NextResponse.json({ insights })
  } catch (error) {
    console.error("Error generating Web Vitals insights:", error)
    return NextResponse.json({ error: "Failed to generate insights" }, { status: 500 })
  }
}
