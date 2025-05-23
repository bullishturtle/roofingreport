import prisma from "@/lib/db"

// Default retention period in days
const DEFAULT_RETENTION_DAYS = 90

export async function cleanupAuditLogs(retentionDays = DEFAULT_RETENTION_DAYS) {
  try {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - retentionDays)

    // Delete logs older than the retention period
    const result = await prisma.auditLog.deleteMany({
      where: {
        timestamp: {
          lt: cutoffDate,
        },
      },
    })

    console.log(`Deleted ${result.count} audit logs older than ${retentionDays} days`)
    return result.count
  } catch (error) {
    console.error("Failed to clean up audit logs:", error)
    throw error
  }
}
