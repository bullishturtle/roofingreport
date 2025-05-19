import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Store the performance report in the database
    await sql`
      INSERT INTO script_performance_reports (
        url,
        timestamp,
        total_script_time,
        total_script_size,
        longest_script,
        longest_script_time,
        largest_script,
        largest_script_size,
        report_data
      ) VALUES (
        ${data.url},
        to_timestamp(${data.timestamp / 1000}),
        ${data.totalScriptTime},
        ${data.totalScriptSize},
        ${data.longestScript.name},
        ${data.longestScript.duration},
        ${data.largestScript.name},
        ${data.largestScript.size},
        ${JSON.stringify(data)}
      )
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error storing script performance data:", error)
    return NextResponse.json({ error: "Failed to store performance data" }, { status: 500 })
  }
}
