"use server"

import { createBackup, getBackups, cleanupOldBackups, initializeBackupSystem } from "@/lib/backup-service"
import { logError } from "@/lib/utils"

/**
 * Initialize the backup system
 */
export async function setupBackupSystem() {
  try {
    await initializeBackupSystem()
    return { success: true, message: "Backup system initialized successfully" }
  } catch (error) {
    logError(error as Error, "setupBackupSystem")
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error initializing backup system",
    }
  }
}

/**
 * Trigger a manual backup
 */
export async function triggerManualBackup(notes?: string) {
  try {
    const backup = await createBackup({
      type: "manual",
      notes: notes || "Manual backup triggered from admin interface",
    })

    if (!backup) {
      return { success: false, error: "Failed to create backup" }
    }

    return {
      success: true,
      message: "Backup created successfully",
      backup,
    }
  } catch (error) {
    logError(error as Error, "triggerManualBackup")
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error creating backup",
    }
  }
}

/**
 * Get recent backups
 */
export async function getRecentBackups(limit = 10) {
  try {
    const backups = await getBackups(limit)
    return { success: true, backups }
  } catch (error) {
    logError(error as Error, "getRecentBackups")
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error fetching backups",
      backups: [],
    }
  }
}

/**
 * Clean up old backups
 */
export async function cleanupBackups(retentionDays = 30) {
  try {
    const deletedCount = await cleanupOldBackups(retentionDays)
    return {
      success: true,
      message: `Cleaned up ${deletedCount} old backups`,
      deletedCount,
    }
  } catch (error) {
    logError(error as Error, "cleanupBackups")
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error cleaning up backups",
    }
  }
}
