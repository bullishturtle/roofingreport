import { type NextRequest, NextResponse } from "next/server"
import { runDailyBackupJob, runWeeklyBackupJob } from "@/lib/scheduled-jobs"
import { logError } from "@/lib/utils"

// Secret key to authenticate cron job requests
const CRON_SECRET = process.env.CRON_SECRET

export async function POST(request: NextRequest) {
  try {
    // Verify the request is authorized
    const authHeader = request.headers.get("authorization")
    if (!CRON_SECRET || authHeader !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get the job type from the request
    const { jobType } = await request.json()

    // Run the appropriate job
    if (jobType === "daily") {
      const result = await runDailyBackupJob()
      return NextResponse.json(result)
    } else if (jobType === "weekly") {
      const result = await runWeeklyBackupJob()
      return NextResponse.json(result)
    } else {
      return NextResponse.json({ error: "Invalid job type" }, { status: 400 })
    }
  } catch (error) {
    logError(error as Error, "backup-cron-api")
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
