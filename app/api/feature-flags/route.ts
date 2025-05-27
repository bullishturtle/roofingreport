import { type NextRequest, NextResponse } from "next/server"
import { getFeatureFlags } from "@/lib/analytics-server"

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId")

    // Get feature flags from server side
    const flags = await getFeatureFlags(userId || undefined)

    return NextResponse.json(flags)
  } catch (error) {
    console.error("Feature flags error:", error)
    return NextResponse.json({ error: "Failed to get feature flags" }, { status: 500 })
  }
}
