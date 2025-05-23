import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"
import type { AuditLogParams } from "@/lib/audit-logger"

export async function POST(req: Request) {
  try {
    // Get user from session
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const body = (await req.json()) as AuditLogParams

    // Get IP and user agent
    const ipAddress = req.headers.get("x-forwarded-for") || "unknown"
    const userAgent = req.headers.get("user-agent") || "unknown"

    // Create audit log entry
    await prisma.auditLog.create({
      data: {
        userId,
        action: body.action,
        entityType: body.entityType,
        entityId: body.entityId,
        details: body.details || {},
        ipAddress,
        userAgent,
        status: body.status || "success",
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to create audit log:", error)
    return NextResponse.json({ error: "Failed to create audit log" }, { status: 500 })
  }
}
