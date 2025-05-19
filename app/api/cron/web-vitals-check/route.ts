import { NextResponse } from "next/server"
import { checkWebVitalsAlerts } from "@/lib/web-vitals-alerts"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    // Verify the request is authorized with the CRON_SECRET
    const authHeader = request.headers.get("authorization")
    const expectedAuth = `Bearer ${process.env.CRON_SECRET}`

    if (authHeader !== expectedAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Run the Web Vitals check
    const alerts = await checkWebVitalsAlerts()

    return NextResponse.json({
      success: true,
      message: "Web Vitals check completed",
      alertsTriggered: alerts?.length || 0,
    })
  } catch (error) {
    console.error("Error in Web Vitals check cron job:", error)
    return NextResponse.json({ error: "Failed to run Web Vitals check" }, { status: 500 })
  }
}
