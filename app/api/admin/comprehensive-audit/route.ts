import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { performComprehensiveSiteAudit } from "@/lib/comprehensive-site-audit"

export async function GET() {
  try {
    // Check if user is authenticated and has admin role
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // For now, allow all authenticated users to run audits
    // In production, you'd check for admin role

    const auditReport = await performComprehensiveSiteAudit()

    return NextResponse.json(auditReport)
  } catch (error) {
    console.error("Comprehensive audit failed:", error)
    return NextResponse.json({ error: "Failed to perform comprehensive audit" }, { status: 500 })
  }
}
