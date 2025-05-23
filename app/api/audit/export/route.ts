import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"
import { stringify } from "csv-stringify/sync"

export async function GET(req: Request) {
  try {
    // Get user from session
    const session = await getServerSession(authOptions)

    // Only allow admins to access audit logs
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const url = new URL(req.url)

    // Parse query parameters
    const userId = url.searchParams.get("userId") || undefined
    const action = url.searchParams.get("action") || undefined
    const entityType = url.searchParams.get("entityType") || undefined
    const entityId = url.searchParams.get("entityId") || undefined
    const status = url.searchParams.get("status") || undefined
    const startDate = url.searchParams.get("startDate") ? new Date(url.searchParams.get("startDate")!) : undefined
    const endDate = url.searchParams.get("endDate") ? new Date(url.searchParams.get("endDate")!) : undefined
    const searchTerm = url.searchParams.get("search") || undefined

    // Build filter
    const filter: any = {}

    if (userId) filter.userId = userId
    if (action) filter.action = action
    if (entityType) filter.entityType = entityType
    if (entityId) filter.entityId = entityId
    if (status) filter.status = status

    // Date range filter
    if (startDate || endDate) {
      filter.timestamp = {}
      if (startDate) filter.timestamp.gte = startDate
      if (endDate) filter.timestamp.lte = endDate
    }

    // Search in details (JSON field)
    let searchFilter = {}
    if (searchTerm) {
      searchFilter = {
        OR: [
          { userId: { contains: searchTerm } },
          { action: { contains: searchTerm } },
          { entityType: { contains: searchTerm } },
          { entityId: { contains: searchTerm } },
          { ipAddress: { contains: searchTerm } },
          { userAgent: { contains: searchTerm } },
        ],
      }
    }

    // Get all logs matching the filter (no pagination for export)
    const logs = await prisma.auditLog.findMany({
      where: {
        ...filter,
        ...searchFilter,
      },
      orderBy: {
        timestamp: "desc",
      },
      take: 10000, // Limit to prevent memory issues
    })

    // Transform logs for CSV export
    const csvData = logs.map((log) => ({
      timestamp: log.timestamp.toISOString(),
      userId: log.userId || "System",
      action: log.action,
      entityType: log.entityType,
      entityId: log.entityId || "N/A",
      status: log.status,
      ipAddress: log.ipAddress || "N/A",
      userAgent: log.userAgent || "N/A",
      details: JSON.stringify(log.details),
    }))

    // Generate CSV
    const csv = stringify(csvData, {
      header: true,
      columns: [
        "timestamp",
        "userId",
        "action",
        "entityType",
        "entityId",
        "status",
        "ipAddress",
        "userAgent",
        "details",
      ],
    })

    // Return CSV as download
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="audit-logs-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    })
  } catch (error) {
    console.error("Failed to export audit logs:", error)
    return NextResponse.json({ error: "Failed to export audit logs" }, { status: 500 })
  }
}
