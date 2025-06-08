import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"

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

    // Get total count for pagination
    const totalCount = await prisma.auditLog.count({
      where: {
        ...filter,
        ...searchFilter,
      },
    })

    // Get paginated results
    const logs = await prisma.auditLog.findMany({
      where: {
        ...filter,
        ...searchFilter,
      },
      orderBy: {
        timestamp: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    })

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
