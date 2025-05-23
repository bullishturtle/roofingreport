import type { AuditAction, AuditEntityType, AuditStatus, AuditLogParams } from "@/lib/audit-logger"

// Re-export types from the main audit-logger
export type { AuditAction, AuditEntityType, AuditStatus, AuditLogParams }

// Client-side audit logging function
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

// Safe version that works in both client and server contexts
export function createSafeAuditLogger() {
  return {
    log: logClientAudit,
  }
}
