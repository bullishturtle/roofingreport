import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const webVital = await request.json()

    // Store the web vital in the database
    await sql`
      INSERT INTO web_vitals (
        name, 
        value, 
        rating, 
        url, 
        user_agent, 
        timestamp
      ) VALUES (
        ${webVital.name}, 
        ${webVital.value}, 
        ${webVital.rating}, 
        ${webVital.url}, 
        ${webVital.userAgent}, 
        ${new Date(webVital.timestamp).toISOString()}
      )
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to store web vital:", error)
    return NextResponse.json({ error: "Failed to store web vital" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const webVitals = await sql`
      SELECT 
        name, 
        AVG(value) as avg_value, 
        COUNT(*) as count,
        MIN(timestamp) as period_start,
        MAX(timestamp) as period_end
      FROM web_vitals
      WHERE timestamp > NOW() - INTERVAL '7 days'
      GROUP BY name
      ORDER BY name
    `

    return NextResponse.json({ webVitals })
  } catch (error) {
    console.error("Failed to retrieve web vitals:", error)
    return NextResponse.json({ error: "Failed to retrieve web vitals" }, { status: 500 })
  }
}
