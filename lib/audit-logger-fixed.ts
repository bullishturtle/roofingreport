// Remove any imports from next/headers
// import { cookies, headers } from "next/headers" - REMOVE THIS

import { v4 as uuidv4 } from "uuid"

export interface AuditLogEntry {
  id?: string
  timestamp?: string
  userId?: string | null
  action: string
  entityType: string
  entityId?: string
  details?: any
  status?: "success" | "failure" | "pending"
  ipAddress?: string
  userAgent?: string
}

export async function logAudit(entry: AuditLogEntry): Promise<boolean> {
  try {
    const timestamp = new Date().toISOString()
    const id = entry.id || uuidv4()

    // Create the complete log entry
    const logEntry: AuditLogEntry = {
      ...entry,
      id,
      timestamp,
      status: entry.status || "success",
    }

    // Try to log to the database
    try {
      await logToDatabase(logEntry)
    } catch (dbError) {
      // If database logging fails, log to console as fallback
      console.warn("Failed to log audit to database, using console fallback:", dbError)
      logToConsole(logEntry)
    }

    return true
  } catch (error) {
    console.error("Audit logging failed:", error)
    return false
  }
}

async function logToDatabase(entry: AuditLogEntry): Promise<void> {
  try {
    // Try to import and use Prisma
    const { PrismaClient } = await import("@prisma/client")
    const prisma = new PrismaClient()

    // Log to database
    await prisma.auditLog.create({
      data: {
        id: entry.id!,
        timestamp: new Date(entry.timestamp!),
        userId: entry.userId || null,
        action: entry.action,
        entityType: entry.entityType,
        entityId: entry.entityId || null,
        details: entry.details ? JSON.stringify(entry.details) : null,
        status: entry.status || "success",
        ipAddress: entry.ipAddress || null,
        userAgent: entry.userAgent || null,
      },
    })

    await prisma.$disconnect()
  } catch (error) {
    throw error
  }
}

function logToConsole(entry: AuditLogEntry): void {
  console.log(
    `[AUDIT] ${entry.timestamp} | ${entry.action} | ${entry.status} | ${entry.entityType}${entry.entityId ? ` | ${entry.entityId}` : ""} | ${entry.userId || "anonymous"} | ${JSON.stringify(entry.details || {})}`,
  )
}
