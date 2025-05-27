import { type NextRequest, NextResponse } from "next/server"
import { trackServerEvent } from "@/lib/analytics-server"

export async function POST(request: NextRequest) {
  try {
    const { eventName, properties } = await request.json()

    // Track event on server side only
    await trackServerEvent(eventName, properties)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 })
  }
}
