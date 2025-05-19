"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { triggerManualBackup, getRecentBackups } from "@/actions/backup-actions"
import type { BackupMetadata } from "@/lib/backup-service"
import { formatDate } from "@/lib/utils"

export function BackupTester() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [latestBackup, setLatestBackup] = useState<BackupMetadata | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState(1)

  // Function to trigger a manual backup
  const handleTriggerBackup = async () => {
    setLoading(true)
    setError(null)
    try {
      const backupResult = await triggerManualBackup("Test backup triggered manually")
      setResult(backupResult)

      if (backupResult.success) {
        setLatestBackup(backupResult.backup)
        setStep(2)
      } else {
        setError(backupResult.error || "Unknown error occurred")
      }
    } catch (err) {
      setError("An unexpected error occurred while triggering the backup")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Function to verify the backup by fetching recent backups
  const handleVerifyBackup = async () => {
    setLoading(true)
    setError(null)
    try {
      const backupsResult = await getRecentBackups(5)

      if (backupsResult.success) {
        const backups = backupsResult.backups
        setResult({ ...result, verificationResult: backupsResult })

        // Check if our backup is in the list
        const foundBackup = backups.find((b) => latestBackup && b.id === latestBackup.id)
        if (foundBackup) {
          setLatestBackup(foundBackup)
          setStep(3)
        } else {
          setError("Backup was created but could not be verified in the recent backups list")
        }
      } else {
        setError(backupsResult.error || "Failed to verify backup")
      }
    } catch (err) {
      setError("An unexpected error occurred while verifying the backup")
      console.error(err)
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
        <CardTitle>Backup System Test</CardTitle>
        <CardDescription>Verify that the backup system is working correctly</CardDescription>
      </CardHeader>
      <CardContent>
        {error && <div className="mb-4 p-3 rounded bg-red-100 text-red-800">{error}</div>}

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Test Steps</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li className={step >= 1 ? "font-medium" : ""}>
              Trigger a manual backup
              {step > 1 && <span className="ml-2 text-green-600">✓ Completed</span>}
            </li>
            <li className={step >= 2 ? "font-medium" : ""}>
              Verify the backup was created
              {step > 2 && <span className="ml-2 text-green-600">✓ Completed</span>}
            </li>
            <li className={step >= 3 ? "font-medium" : ""}>
              Check backup details
              {step > 3 && <span className="ml-2 text-green-600">✓ Completed</span>}
            </li>
          </ol>
        </div>

        {step === 1 && (
          <div>
            <p className="mb-4">Click the button below to trigger a manual backup:</p>
            <Button onClick={handleTriggerBackup} disabled={loading}>
              {loading ? "Creating Backup..." : "Trigger Manual Backup"}
            </Button>
          </div>
        )}

        {step === 2 && latestBackup && (
          <div>
            <p className="mb-4">Backup created successfully! Now let's verify it exists in the database:</p>
            <div className="p-4 bg-gray-50 rounded mb-4">
              <h4 className="font-medium mb-2">Backup Details:</h4>
              <p>
                <strong>ID:</strong> {latestBackup.id}
              </p>
              <p>
                <strong>Filename:</strong> {latestBackup.filename}
              </p>
              <p>
                <strong>Status:</strong> {latestBackup.status}
              </p>
              <p>
                <strong>Created:</strong> {formatDate(new Date(latestBackup.createdAt))}
              </p>
            </div>
            <Button onClick={handleVerifyBackup} disabled={loading}>
              {loading ? "Verifying..." : "Verify Backup"}
            </Button>
          </div>
        )}

        {step === 3 && latestBackup && (
          <div>
            <div className="p-4 bg-green-50 text-green-800 rounded mb-4">
              <h4 className="font-medium mb-2">✓ Backup System Verified!</h4>
              <p>The backup system is working correctly. Your backup was successfully created and verified.</p>
            </div>

            <div className="p-4 bg-gray-50 rounded mb-4">
              <h4 className="font-medium mb-2">Final Backup Details:</h4>
              <p>
                <strong>ID:</strong> {latestBackup.id}
              </p>
              <p>
                <strong>Filename:</strong> {latestBackup.filename}
              </p>
              <p>
                <strong>Size:</strong> {formatFileSize(latestBackup.size)}
              </p>
              <p>
                <strong>Status:</strong> {latestBackup.status}
              </p>
              <p>
                <strong>Type:</strong> {latestBackup.type}
              </p>
              <p>
                <strong>Created:</strong> {formatDate(new Date(latestBackup.createdAt))}
              </p>
              {latestBackup.notes && (
                <p>
                  <strong>Notes:</strong> {latestBackup.notes}
                </p>
              )}
            </div>

            <p className="mb-4">
              You can now view all backups in the Backup Manager. The automated backup system is ready to use!
            </p>

            <Button onClick={() => setStep(1)} variant="outline">
              Start Over
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        <p>
          This test verifies that the backup system can create backups and store them in the database. For a complete
          test, also verify that scheduled backups work correctly.
        </p>
      </CardFooter>
    </Card>
  )
}
