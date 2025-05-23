import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Log error to database
    await prisma.auditLog.create({
      data: {
        action: "CLIENT_ERROR",
        details: JSON.stringify({
          error: body.error,
          stack: body.stack,
          url: body.url,
          userAgent: body.userAgent,
          timestamp: body.timestamp,
        }),
        ipAddress: request.ip || "unknown",
        userAgent: request.headers.get("user-agent") || "unknown",
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to log error:", error)
    return NextResponse.json({ error: "Failed to log error" }, { status: 500 })
  }
}
