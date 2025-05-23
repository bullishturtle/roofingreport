import { getSafeDbClient } from "./db-safe"

export interface DbCheckResult {
  status: "pass" | "fail" | "warning"
  message: string
  details?: any
}

export async function checkDatabase(): Promise<DbCheckResult> {
  try {
    const prisma = await getSafeDbClient()

    if (!prisma) {
      return {
        status: "fail",
        message: "Could not connect to database",
      }
    }

    // Check for audit_logs table
    try {
      // Try to query the audit_logs table
      await prisma.$queryRaw`SELECT COUNT(*) FROM "audit_logs" LIMIT 1`

      return {
        status: "pass",
        message: "Database connection successful and audit_logs table exists",
      }
    } catch (tableError) {
      // Table doesn't exist or other query error
      return {
        status: "warning",
        message: "Database connected but audit_logs table not found or inaccessible",
        details: {
          error: tableError instanceof Error ? tableError.message : "Unknown error",
          suggestion: "Run database migrations to create the audit_logs table",
        },
      }
    } finally {
      await prisma.$disconnect()
    }
  } catch (error) {
    return {
      status: "fail",
      message: "Database connection failed",
      details: {
        error: error instanceof Error ? error.message : "Unknown error",
      },
    }
  }
}

export async function checkAuditLogTable(): Promise<DbCheckResult> {
  try {
    const prisma = await getSafeDbClient()

    if (!prisma) {
      return {
        status: "warning",
        message: "Could not connect to database to check audit_logs table",
      }
    }

    // Check if we can create a test audit log
    try {
      const testLog = await prisma.auditLog.create({
        data: {
          action: "system.test",
          entityType: "system",
          details: { test: true },
        },
      })

      // Clean up test log
      await prisma.auditLog.delete({
        where: { id: testLog.id },
      })

      return {
        status: "pass",
        message: "Audit log table is working correctly",
      }
    } catch (createError) {
      return {
        status: "fail",
        message: "Failed to create test audit log",
        details: {
          error: createError instanceof Error ? createError.message : "Unknown error",
          suggestion: "Check that the audit_logs table has the correct schema",
        },
      }
    } finally {
      await prisma.$disconnect()
    }
  } catch (error) {
    return {
      status: "fail",
      message: "Failed to check audit log table",
      details: {
        error: error instanceof Error ? error.message : "Unknown error",
      },
    }
  }
}
