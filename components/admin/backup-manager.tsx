"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { triggerManualBackup, getRecentBackups, cleanupBackups, setupBackupSystem } from "@/actions/backup-actions"
import type { BackupMetadata } from "@/lib/backup-service"
import { formatDate } from "@/lib/utils"

export function BackupManager() {
  const [backups, setBackups] = useState<BackupMetadata[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Load backups on component mount
  useEffect(() => {
    loadBackups()
  }, [])

  // Function to load backups
  const loadBackups = async () => {
    setLoading(true)
    try {
      const result = await getRecentBackups(10)
      if (result.success) {
        setBackups(result.backups)
      } else {
        setMessage({ type: "error", text: result.error || "Failed to load backups" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred while loading backups" })
    } finally {
      setLoading(false)
    }
  }

  // Function to initialize backup system
  const handleSetupBackupSystem = async () => {
    setLoading(true)
    try {
      const result = await setupBackupSystem()
      if (result.success) {
        setMessage({ type: "success", text: result.message })
        loadBackups()
      } else {
        setMessage({ type: "error", text: result.error || "Failed to initialize backup system" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred while initializing backup system" })
    } finally {
      setLoading(false)
    }
  }

  // Function to trigger a manual backup
  const handleManualBackup = async () => {
    setLoading(true)
    try {
      const result = await triggerManualBackup("Manual backup from admin interface")
      if (result.success) {
        setMessage({ type: "success", text: result.message })
        loadBackups()
      } else {
        setMessage({ type: "error", text: result.error || "Failed to create backup" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred while creating backup" })
    } finally {
      setLoading(false)
    }
  }

  // Function to clean up old backups
  const handleCleanupBackups = async () => {
    setLoading(true)
    try {
      const result = await cleanupBackups(30)
      if (result.success) {
        setMessage({ type: "success", text: result.message })
        loadBackups()
      } else {
        setMessage({ type: "error", text: result.error || "Failed to clean up backups" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred while cleaning up backups" })
    } finally {
      setLoading(false)
    }
  }

  // Format file size for display
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Database Backup Management</CardTitle>
        <CardDescription>Manage database backups for RoofFax</CardDescription>
      </CardHeader>
      <CardContent>
        {message && (
          <div
            className={`mb-4 p-3 rounded ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {message.text}
          </div>
        )}

        <div className="flex flex-wrap gap-3 mb-6">
          <Button onClick={handleSetupBackupSystem} disabled={loading}>
            Initialize Backup System
          </Button>
          <Button onClick={handleManualBackup} disabled={loading}>
            Create Manual Backup
          </Button>
          <Button onClick={handleCleanupBackups} disabled={loading} variant="outline">
            Clean Up Old Backups
          </Button>
          <Button onClick={loadBackups} disabled={loading} variant="outline">
            Refresh
          </Button>
        </div>

        <div className="border rounded-md">
          <div className="grid grid-cols-5 gap-2 p-3 font-medium bg-gray-50 border-b">
            <div>Filename</div>
            <div>Type</div>
            <div>Size</div>
            <div>Date</div>
            <div>Status</div>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading backups...</div>
          ) : backups.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No backups found</div>
          ) : (
            backups.map((backup) => (
              <div key={backup.id} className="grid grid-cols-5 gap-2 p-3 border-b last:border-0">
                <div className="truncate" title={backup.filename}>
                  {backup.filename}
                </div>
                <div className="capitalize">{backup.type}</div>
                <div>{formatFileSize(backup.size)}</div>
                <div>{formatDate(new Date(backup.createdAt))}</div>
                <div>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded ${
                      backup.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : backup.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {backup.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        <p>
          Automated backups run daily at midnight and weekly on Sundays. Daily backups are retained for 30 days, weekly
          backups for 90 days.
        </p>
      </CardFooter>
    </Card>
  )
}
