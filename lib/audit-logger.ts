import prisma from "@/lib/db"
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

export async function logAudit({
  action,
  entityType,
  entityId,
  details,
  userId: explicitUserId,
  status = "success",
}: AuditLogParams) {
  try {
    // Get user from session if not explicitly provided
    let userId = explicitUserId

    if (!userId) {
      const session = await getServerSession(authOptions)
      userId = session?.user?.id
    }

    // Get IP and user agent
    const headersList = headers()
    const ipAddress = headersList.get("x-forwarded-for") || "unknown"
    const userAgent = headersList.get("user-agent") || "unknown"

    // Create audit log entry
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
      },
    })

    return true
  } catch (error) {
    console.error("Failed to create audit log:", error)
    // Don't throw - audit logging should not break main functionality
    return false
  }
}

// Client-side audit logging (less detailed but useful for UI actions)
export async function logClientAudit(params: AuditLogParams) {
  try {
    const response = await fetch("/api/audit/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      throw new Error("Failed to log audit event")
    }

    return true
  } catch (error) {
    console.error("Failed to log client audit:", error)
    return false
  }
}
