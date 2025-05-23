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
  ipAddress?: string
  userAgent?: string
}

// Client-side audit logging
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

// Simple console logging for development
export function logToConsole(params: AuditLogParams): void {
  console.log("AUDIT LOG:", {
    timestamp: new Date().toISOString(),
    userId: params.userId || "system",
    action: params.action,
    entityType: params.entityType,
    entityId: params.entityId,
    status: params.status || "success",
    ipAddress: params.ipAddress || "unknown",
    userAgent: params.userAgent || "unknown",
    details: params.details,
  })
}
