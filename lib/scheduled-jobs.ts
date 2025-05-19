import { createBackup, cleanupOldBackups } from "./backup-service"
import { logSystemEvent, logError } from "./utils"

/**
 * Run the daily backup job
 */
export async function runDailyBackupJob() {
  try {
    logSystemEvent("Starting daily backup job")

    // Create a new backup
    const backup = await createBackup({
      type: "scheduled",
      notes: "Automated daily backup",
    })

    if (!backup) {
      throw new Error("Failed to create daily backup")
    }

    logSystemEvent(`Daily backup completed: ${backup.filename}`)

    // Clean up old backups (keep for 30 days)
    const deletedCount = await cleanupOldBackups(30)
    logSystemEvent(`Cleaned up ${deletedCount} old backups`)

    return { success: true, backup }
  } catch (error) {
    logError(error as Error, "runDailyBackupJob")
    return { success: false, error: error instanceof Error ? error.message : "Unknown error in daily backup job" }
  }
}

/**
 * Run the weekly backup job (with longer retention)
 */
export async function runWeeklyBackupJob() {
  try {
    logSystemEvent("Starting weekly backup job")

    // Create a new backup with longer retention
    const backup = await createBackup({
      type: "scheduled",
      notes: "Automated weekly backup (90-day retention)",
    })

    if (!backup) {
      throw new Error("Failed to create weekly backup")
    }

    logSystemEvent(`Weekly backup completed: ${backup.filename}`)

    return { success: true, backup }
  } catch (error) {
    logError(error as Error, "runWeeklyBackupJob")
    return { success: false, error: error instanceof Error ? error.message : "Unknown error in weekly backup job" }
  }
}
