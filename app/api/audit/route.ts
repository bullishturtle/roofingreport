import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/simple-db"

export async function POST(request: NextRequest) {
  try {
    const { action, details, userId } = await request.json()

    const auditLog = await db.auditLog.create({
      data: {
        action,
        details,
        userId,
        ip: request.ip || "unknown",
      },
    })

    return NextResponse.json(auditLog)
  } catch (error) {
    console.error("Audit log error:", error)
    return NextResponse.json({ error: "Failed to create audit log" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const logs = await db.auditLog.findMany({
      take: 100,
      orderBy: { timestamp: "desc" },
    })

    return NextResponse.json(logs)
  } catch (error) {
    console.error("Fetch audit logs error:", error)
    return NextResponse.json({ error: "Failed to fetch audit logs" }, { status: 500 })
  }
}
