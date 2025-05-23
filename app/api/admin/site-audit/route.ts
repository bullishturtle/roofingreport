import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { performSiteAudit } from "@/lib/site-audit"

export async function GET(req: Request) {
  try {
    // Get user from session
    const session = await getServerSession(authOptions)

    // Only allow admins to run site audits
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized - Admin access required" }, { status: 401 })
    }

    // Run the site audit
    const auditReport = await performSiteAudit()

    return NextResponse.json(auditReport)
  } catch (error) {
    console.error("Site audit failed:", error)
    return NextResponse.json(
      {
        error: "Site audit failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function POST(req: Request) {
  // Allow POST for triggering audits with parameters
  return GET(req)
}
