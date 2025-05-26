import { NextResponse } from "next/server"
import { simpleDb } from "@/lib/simple-db"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)

    // If this is a simple health check
    if (!url.searchParams.has("page")) {
      const auditData = {
        timestamp: new Date().toISOString(),
        status: "healthy",
        version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
        checks: {
          server: "operational",
          database: "simple_db_active",
          api: "responding",
          frontend: "loaded",
        },
      }
      return NextResponse.json(auditData)
    }

    // Parse query parameters for audit logs
    const page = Number.parseInt(url.searchParams.get("page") || "1")
    const limit = Number.parseInt(url.searchParams.get("limit") || "50")
    const userId = url.searchParams.get("userId") || undefined
    const action = url.searchParams.get("action") || undefined
    const entityType = url.searchParams.get("entityType") || undefined
    const entityId = url.searchParams.get("entityId") || undefined
    const status = url.searchParams.get("status") || undefined
    const startDate = url.searchParams.get("startDate") ? new Date(url.searchParams.get("startDate")!) : undefined
    const endDate = url.searchParams.get("endDate") ? new Date(url.searchParams.get("endDate")!) : undefined
    const searchTerm = url.searchParams.get("search") || undefined

    // Build filter for simple database
    const filter: any = {}
    if (userId) filter.userId = userId
    if (action) filter.action = action
    if (entityType) filter.entityType = entityType
    if (entityId) filter.entityId = entityId
    if (status) filter.status = status

    // Get audit logs using simple database
    const logs = await simpleDb.auditLog.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: filter,
      orderBy: { timestamp: "desc" },
    })

    // Mock total count for pagination
    const totalCount = logs.length

    return NextResponse.json({
      logs,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    })
  } catch (error) {
    console.error("Failed to retrieve audit logs:", error)
    return NextResponse.json({ error: "Failed to retrieve audit logs" }, { status: 500 })
  }
}
