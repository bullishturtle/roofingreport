import { type NextRequest, NextResponse } from "next/server"
import { simpleDb } from "@/lib/simple-db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit")
    const offset = searchParams.get("offset")
    const userId = searchParams.get("userId")

    const auditLogs = await simpleDb.auditLog.findMany({
      take: limit ? Number.parseInt(limit) : undefined,
      skip: offset ? Number.parseInt(offset) : undefined,
      where: userId ? { userId } : undefined,
      orderBy: { timestamp: "desc" },
    })

    return NextResponse.json(auditLogs)
  } catch (error) {
    console.error("Failed to fetch audit logs:", error)
    return NextResponse.json({ error: "Failed to fetch audit logs" }, { status: 500 })
  }
}
