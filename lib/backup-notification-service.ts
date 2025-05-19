import { sendEmail } from "@/lib/email-service"
import { logError, logSystemEvent } from "@/lib/utils"
import type { BackupMetadata } from "@/lib/backup-service"

// Types for notification configuration
export interface BackupNotificationConfig {
  enabled: boolean
  recipients: string[]
  notifyOnSuccess: boolean
  notifyOnFailure: boolean
  notifyOnWarning: boolean
  dailySummary: boolean
}

// Default notification configuration
const defaultConfig: BackupNotificationConfig = {
  enabled: true,
  recipients: [],
  notifyOnSuccess: false, // Don't spam with success messages by default
  notifyOnFailure: true, // Always notify on failures
  notifyOnWarning: true, // Notify on warnings (like space issues)
  dailySummary: true, // Send a daily summary
}

// Get notification configuration
export function getNotificationConfig(): BackupNotificationConfig {
  // In a real implementation, this would be stored in the database or config file
  // For now, we'll use environment variables

  const config = { ...defaultConfig }

  // Check if notifications are enabled
  config.enabled = process.env.BACKUP_NOTIFICATIONS_ENABLED !== "false"

  // Get recipients from environment variable (comma-separated list)
  const recipientsEnv = process.env.BACKUP_NOTIFICATION_RECIPIENTS
  if (recipientsEnv) {
    config.recipients = recipientsEnv.split(",").map((email) => email.trim())
  }

  // Override other settings from environment variables if provided
  if (process.env.BACKUP_NOTIFY_ON_SUCCESS) {
    config.notifyOnSuccess = process.env.BACKUP_NOTIFY_ON_SUCCESS === "true"
  }

  if (process.env.BACKUP_NOTIFY_ON_FAILURE) {
    config.notifyOnFailure = process.env.BACKUP_NOTIFY_ON_FAILURE === "true"
  }

  if (process.env.BACKUP_NOTIFY_ON_WARNING) {
    config.notifyOnWarning = process.env.BACKUP_NOTIFY_ON_WARNING === "true"
  }

  if (process.env.BACKUP_DAILY_SUMMARY) {
    config.dailySummary = process.env.BACKUP_DAILY_SUMMARY === "true"
  }

  return config
}

// Send a backup success notification
export async function sendBackupSuccessNotification(backup: BackupMetadata): Promise<boolean> {
  const config = getNotificationConfig()

  // Check if notifications are enabled and we should notify on success
  if (!config.enabled || !config.notifyOnSuccess || config.recipients.length === 0) {
    return false
  }

  try {
    // Format the backup size
    const sizeInMB = (backup.size / (1024 * 1024)).toFixed(2)

    // Send the email
    await sendEmail({
      to: config.recipients,
      subject: `[RoofFax] Backup Completed Successfully: ${backup.filename}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4CAF50;">Backup Completed Successfully</h2>
          <p>A database backup has been completed successfully.</p>
          
          <h3>Backup Details:</h3>
          <ul>
            <li><strong>Filename:</strong> ${backup.filename}</li>
            <li><strong>Size:</strong> ${sizeInMB} MB</li>
            <li><strong>Created:</strong> ${new Date(backup.createdAt).toLocaleString()}</li>
            <li><strong>Type:</strong> ${backup.type}</li>
            <li><strong>Status:</strong> ${backup.status}</li>
          </ul>
          
          <p>You can view all backups in the <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin">admin dashboard</a>.</p>
          
          <p style="font-size: 12px; color: #666; margin-top: 30px;">
            This is an automated message from the RoofFax Backup System. Please do not reply to this email.
          </p>
        </div>
      `,
      text: `
        Backup Completed Successfully
        
        A database backup has been completed successfully.
        
        Backup Details:
        - Filename: ${backup.filename}
        - Size: ${sizeInMB} MB
        - Created: ${new Date(backup.createdAt).toLocaleString()}
        - Type: ${backup.type}
        - Status: ${backup.status}
        
        You can view all backups in the admin dashboard: ${process.env.NEXT_PUBLIC_APP_URL}/admin
        
        This is an automated message from the RoofFax Backup System. Please do not reply to this email.
      `,
    })

    logSystemEvent("Sent backup success notification")
    return true
  } catch (error) {
    logError(error as Error, "sendBackupSuccessNotification")
    return false
  }
}

// Send a backup failure notification
export async function sendBackupFailureNotification(backup: BackupMetadata, error?: string): Promise<boolean> {
  const config = getNotificationConfig()

  // Check if notifications are enabled and we should notify on failure
  if (!config.enabled || !config.notifyOnFailure || config.recipients.length === 0) {
    return false
  }

  try {
    // Send the email
    await sendEmail({
      to: config.recipients,
      subject: `[RoofFax] ALERT: Backup Failed: ${backup.filename}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #F44336;">Backup Failed</h2>
          <p>A database backup has failed and requires your attention.</p>
          
          <h3>Backup Details:</h3>
          <ul>
            <li><strong>Filename:</strong> ${backup.filename}</li>
            <li><strong>Created:</strong> ${new Date(backup.createdAt).toLocaleString()}</li>
            <li><strong>Type:</strong> ${backup.type}</li>
            <li><strong>Status:</strong> ${backup.status}</li>
          </ul>
          
          ${error ? `<h3>Error Details:</h3><p style="color: #F44336;">${error}</p>` : ""}
          
          <p><strong>Action Required:</strong> Please check the backup system and resolve the issue.</p>
          
          <p>You can view all backups in the <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin">admin dashboard</a>.</p>
          
          <p style="font-size: 12px; color: #666; margin-top: 30px;">
            This is an automated message from the RoofFax Backup System. Please do not reply to this email.
          </p>
        </div>
      `,
      text: `
        ALERT: Backup Failed
        
        A database backup has failed and requires your attention.
        
        Backup Details:
        - Filename: ${backup.filename}
        - Created: ${new Date(backup.createdAt).toLocaleString()}
        - Type: ${backup.type}
        - Status: ${backup.status}
        
        ${error ? `Error Details: ${error}` : ""}
        
        Action Required: Please check the backup system and resolve the issue.
        
        You can view all backups in the admin dashboard: ${process.env.NEXT_PUBLIC_APP_URL}/admin
        
        This is an automated message from the RoofFax Backup System. Please do not reply to this email.
      `,
    })

    logSystemEvent("Sent backup failure notification")
    return true
  } catch (error) {
    logError(error as Error, "sendBackupFailureNotification")
    return false
  }
}

// Send a backup warning notification
export async function sendBackupWarningNotification(message: string, details?: string): Promise<boolean> {
  const config = getNotificationConfig()

  // Check if notifications are enabled and we should notify on warnings
  if (!config.enabled || !config.notifyOnWarning || config.recipients.length === 0) {
    return false
  }

  try {
    // Send the email
    await sendEmail({
      to: config.recipients,
      subject: `[RoofFax] Warning: Backup System Issue`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FF9800;">Backup System Warning</h2>
          <p>${message}</p>
          
          ${details ? `<h3>Details:</h3><p>${details}</p>` : ""}
          
          <p>You can view all backups in the <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin">admin dashboard</a>.</p>
          
          <p style="font-size: 12px; color: #666; margin-top: 30px;">
            This is an automated message from the RoofFax Backup System. Please do not reply to this email.
          </p>
        </div>
      `,
      text: `
        Warning: Backup System Issue
        
        ${message}
        
        ${details ? `Details: ${details}` : ""}
        
        You can view all backups in the admin dashboard: ${process.env.NEXT_PUBLIC_APP_URL}/admin
        
        This is an automated message from the RoofFax Backup System. Please do not reply to this email.
      `,
    })

    logSystemEvent("Sent backup warning notification")
    return true
  } catch (error) {
    logError(error as Error, "sendBackupWarningNotification")
    return false
  }
}

// Send a daily backup summary
export async function sendBackupSummary(backups: BackupMetadata[]): Promise<boolean> {
  const config = getNotificationConfig()

  // Check if notifications are enabled and we should send daily summaries
  if (!config.enabled || !config.dailySummary || config.recipients.length === 0) {
    return false
  }

  try {
    // Count successful and failed backups
    const successful = backups.filter((b) => b.status === "completed").length
    const failed = backups.filter((b) => b.status === "failed").length
    const pending = backups.filter((b) => b.status === "pending").length

    // Calculate total size
    const totalSizeBytes = backups.filter((b) => b.status === "completed").reduce((sum, b) => sum + b.size, 0)

    const totalSizeMB = (totalSizeBytes / (1024 * 1024)).toFixed(2)

    // Generate backup list HTML
    const backupListHtml = backups
      .map((b) => {
        const sizeInMB = (b.size / (1024 * 1024)).toFixed(2)
        const statusColor = b.status === "completed" ? "#4CAF50" : b.status === "failed" ? "#F44336" : "#FF9800"

        return `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${b.filename}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${new Date(b.createdAt).toLocaleString()}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${b.type}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${sizeInMB} MB</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; color: ${statusColor};">${b.status}</td>
        </tr>
      `
      })
      .join("")

    // Generate backup list text
    const backupListText = backups
      .map((b) => {
        const sizeInMB = (b.size / (1024 * 1024)).toFixed(2)
        return `- ${b.filename} (${b.type}, ${sizeInMB} MB, ${b.status}, ${new Date(b.createdAt).toLocaleString()})`
      })
      .join("\n")

    // Send the email
    await sendEmail({
      to: config.recipients,
      subject: `[RoofFax] Backup System Daily Summary`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Backup System Daily Summary</h2>
          <p>Here is a summary of backup activity for the past 24 hours:</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Summary:</h3>
            <ul>
              <li><strong>Total Backups:</strong> ${backups.length}</li>
              <li><strong>Successful:</strong> <span style="color: #4CAF50;">${successful}</span></li>
              <li><strong>Failed:</strong> <span style="color: #F44336;">${failed}</span></li>
              <li><strong>Pending:</strong> <span style="color: #FF9800;">${pending}</span></li>
              <li><strong>Total Size:</strong> ${totalSizeMB} MB</li>
            </ul>
          </div>
          
          <h3>Recent Backups:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f2f2f2;">
                <th style="padding: 8px; text-align: left; border-bottom: 2px solid #ddd;">Filename</th>
                <th style="padding: 8px; text-align: left; border-bottom: 2px solid #ddd;">Date</th>
                <th style="padding: 8px; text-align: left; border-bottom: 2px solid #ddd;">Type</th>
                <th style="padding: 8px; text-align: left; border-bottom: 2px solid #ddd;">Size</th>
                <th style="padding: 8px; text-align: left; border-bottom: 2px solid #ddd;">Status</th>
              </tr>
            </thead>
            <tbody>
              ${backupListHtml}
            </tbody>
          </table>
          
          <p>You can view all backups in the <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin">admin dashboard</a>.</p>
          
          <p style="font-size: 12px; color: #666; margin-top: 30px;">
            This is an automated message from the RoofFax Backup System. Please do not reply to this email.
          </p>
        </div>
      `,
      text: `
        Backup System Daily Summary
        
        Here is a summary of backup activity for the past 24 hours:
        
        Summary:
        - Total Backups: ${backups.length}
        - Successful: ${successful}
        - Failed: ${failed}
        - Pending: ${pending}
        - Total Size: ${totalSizeMB} MB
        
        Recent Backups:
        ${backupListText}
        
        You can view all backups in the admin dashboard: ${process.env.NEXT_PUBLIC_APP_URL}/admin
        
        This is an automated message from the RoofFax Backup System. Please do not reply to this email.
      `,
    })

    logSystemEvent("Sent backup summary notification")
    return true
  } catch (error) {
    logError(error as Error, "sendBackupSummary")
    return false
  }
}
