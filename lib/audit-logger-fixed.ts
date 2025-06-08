import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { headers } from "next/headers"

export type AuditAction =
  | "user.login"
  | "user.logout"
  | "user.register"
  | "user.update"
  | "user.delete"
  | "data.create"
  | "data.read"
  | "data.update"
  | "data.delete"
  | "system.config.change"
  | "system.error"
  | "system.startup"
  | "system.shutdown"
  | "system.audit"
  | "system.test"
  | "report.generate"
  | "report.view"
  | "report.download"
  | "payment.create"
  | "payment.update"
  | "payment.refund"

export type AuditEntityType =
  | "user"
  | "report"
  | "property"
  | "payment"
  | "system"
  | "config"
  | "contractor"
  | "verification"

export type AuditStatus = "success" | "failure" | "warning"

export interface AuditLogParams {
  action: AuditAction
  entityType: AuditEntityType
  entityId?: string
  details?: Record<string, any>
  userId?: string
  status?: AuditStatus
}

// Fallback logging when database is not available
function logToConsole(params: AuditLogParams & { timestamp: Date; ipAddress: string; userAgent: string }) {
  console.log("AUDIT LOG:", {
    timestamp: params.timestamp.toISOString(),
    userId: params.userId || "system",
    action: params.action,
    entityType: params.entityType,
    entityId: params.entityId,
    status: params.status,
    ipAddress: params.ipAddress,
    userAgent: params.userAgent,
    details: params.details,
  })
}

export async function logAudit({
  action,
  entityType,
  entityId,
  details,
  userId: explicitUserId,
  status = "success",
}: AuditLogParams): Promise<boolean> {
  try {
    // Get user from session if not explicitly provided
    let userId = explicitUserId

    if (!userId) {
      try {
        const session = await getServerSession(authOptions)
        userId = session?.user?.id
      } catch (sessionError) {
        // Session might not be available during build or in certain contexts
        console.warn("Could not get session for audit log:", sessionError)
      }
    }

    // Get IP and user agent safely
    let ipAddress = "unknown"
    let userAgent = "unknown"

    try {
      const headersList = headers()
      ipAddress = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown"
      userAgent = headersList.get("user-agent") || "unknown"
    } catch (headerError) {
      // Headers might not be available in all contexts
      console.warn("Could not get headers for audit log:", headerError)
    }

    const timestamp = new Date()

    // Try to log to database first
    try {
      // Dynamic import to avoid build-time issues
      const { PrismaClient } = await import("@prisma/client")
      const prisma = new PrismaClient()

      await prisma.auditLog.create({
        data: {
          userId,
          action,
          entityType,
          entityId,
          details: details || {},
          ipAddress,
          userAgent,
          status,
          timestamp,
        },
      })

      await prisma.$disconnect()
      return true
    } catch (dbError) {
      // If database logging fails, fall back to console logging
      console.warn("Database audit logging failed, falling back to console:", dbError)
      logToConsole({
        action,
        entityType,
        entityId,
        details,
        userId,
        status,
        timestamp,
        ipAddress,
        userAgent,
      })
      return false
    }
  } catch (error) {
    console.error("Audit logging completely failed:", error)
    // Even if everything fails, don't throw - audit logging should not break main functionality
    return false
  }
}

// Client-side audit logging (less detailed but useful for UI actions)
export async function logClientAudit(params: AuditLogParams): Promise<boolean> {
  try {
    const response = await fetch("/api/audit/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return true
  } catch (error) {
    console.error("Failed to log client audit:", error)
    return false
  }
}
