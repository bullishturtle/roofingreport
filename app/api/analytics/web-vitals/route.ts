import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const webVitalData = await request.json()

    // Validate the data
    if (!webVitalData || !webVitalData.name || typeof webVitalData.value !== "number") {
      return NextResponse.json({ error: "Invalid web vital data" }, { status: 400 })
    }

    // Store the web vital in the database
    await sql`
      INSERT INTO web_vitals (
        metric_id,
        metric_name,
        metric_value,
        metric_rating,
        metric_delta,
        navigation_type,
        url,
        user_agent,
        timestamp
      ) VALUES (
        ${webVitalData.id},
        ${webVitalData.name},
        ${webVitalData.value},
        ${webVitalData.rating},
        ${webVitalData.delta},
        ${webVitalData.navigationType},
        ${webVitalData.url},
        ${webVitalData.userAgent},
        to_timestamp(${webVitalData.timestamp} / 1000.0)
      )
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error storing web vital:", error)
    return NextResponse.json({ error: "Failed to store web vital" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const timeRange = searchParams.get("timeRange") || "7d"

    let timeFilter
    switch (timeRange) {
      case "24h":
        timeFilter = "timestamp > NOW() - INTERVAL '24 hours'"
        break
      case "30d":
        timeFilter = "timestamp > NOW() - INTERVAL '30 days'"
        break
      case "7d":
      default:
        timeFilter = "timestamp > NOW() - INTERVAL '7 days'"
        break
    }

    // Get raw metrics
    const rawMetrics = await sql`
      SELECT 
        metric_name as name,
        metric_value as value,
        metric_rating as rating,
        timestamp,
        url
      FROM web_vitals
      WHERE ${sql.raw(timeFilter)}
      ORDER BY timestamp DESC
      LIMIT 1000
    `

    // Get aggregated metrics by day
    const aggregatedMetrics = await sql`
      SELECT 
        TO_CHAR(DATE_TRUNC('day', timestamp), 'YYYY-MM-DD') as date,
        AVG(CASE WHEN metric_name = 'LCP' THEN metric_value END) as "LCP",
        AVG(CASE WHEN metric_name = 'CLS' THEN metric_value END) as "CLS",
        AVG(CASE WHEN metric_name = 'FID' THEN metric_value END) as "FID",
        AVG(CASE WHEN metric_name = 'TTFB' THEN metric_value END) as "TTFB",
        AVG(CASE WHEN metric_name = 'INP' THEN metric_value END) as "INP",
        100.0 * COUNT(CASE WHEN metric_rating = 'good' THEN 1 END) / NULLIF(COUNT(*), 0) as "goodPercent"
      FROM web_vitals
      WHERE ${sql.raw(timeFilter)}
      GROUP BY DATE_TRUNC('day', timestamp)
      ORDER BY DATE_TRUNC('day', timestamp)
    `

    // Get distribution of ratings by metric
    const distribution = await sql`
      SELECT 
        metric_name as name,
        COUNT(CASE WHEN metric_rating = 'good' THEN 1 END) as good,
        COUNT(CASE WHEN metric_rating = 'needs-improvement' THEN 1 END) as "needsImprovement",
        COUNT(CASE WHEN metric_rating = 'poor' THEN 1 END) as poor
      FROM web_vitals
      WHERE ${sql.raw(timeFilter)}
      GROUP BY metric_name
    `

    return NextResponse.json({
      metrics: rawMetrics,
      aggregated: aggregatedMetrics,
      distribution: distribution,
    })
  } catch (error) {
    console.error("Error retrieving web vitals:", error)
    return NextResponse.json({ error: "Failed to retrieve web vitals" }, { status: 500 })
  }
}
