import { NextResponse } from "next/server"
import { cleanupAuditLogs } from "@/lib/audit-retention"

// This endpoint should be called by a cron job (e.g., Vercel Cron)
export async function POST(req: Request) {
  try {
    // Verify the request is authorized (e.g., using a secret token)
    const authHeader = req.headers.get("authorization")
    const token = authHeader?.split(" ")[1]

    if (token !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get retention days from query params or use default
    const url = new URL(req.url)
    const retentionDays = Number.parseInt(url.searchParams.get("days") || "90")

    // Run the cleanup
    const deletedCount = await cleanupAuditLogs(retentionDays)

    return NextResponse.json({
      success: true,
      message: `Successfully cleaned up ${deletedCount} audit logs older than ${retentionDays} days`,
    })
  } catch (error) {
    console.error("Audit log cleanup failed:", error)
    return NextResponse.json({ error: "Audit log cleanup failed" }, { status: 500 })
  }
}
