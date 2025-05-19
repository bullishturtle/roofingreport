import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const webVital = await request.json()

    // In a production environment, this would store the web vital in a database
    console.log("Web Vital received:", webVital.name, webVital.value)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in web vitals API route:", error)
    return NextResponse.json({ error: "Failed to store web vital" }, { status: 500 })
  }
}

export async function GET() {
  // In a production environment, this would retrieve web vitals from a database
  // For now, return mock data
  return NextResponse.json({
    webVitals: [
      { name: "LCP", avg_value: 2400, count: 100 },
      { name: "FCP", avg_value: 1200, count: 100 },
      { name: "CLS", avg_value: 0.05, count: 100 },
      { name: "TTFB", avg_value: 300, count: 100 },
      { name: "INP", avg_value: 150, count: 100 },
    ],
  })
}
