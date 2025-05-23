import { NextResponse } from "next/server"

export async function GET() {
  const startTime = Date.now()

  try {
    // Basic health checks
    const checks = {
      environment: checkEnvironment(),
      memory: checkMemory(),
      uptime: process.uptime(),
    }

    // Calculate response time
    const responseTime = Date.now() - startTime

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      checks,
      responseTime: `${responseTime}ms`,
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

function checkEnvironment() {
  return {
    nodeEnv: process.env.NODE_ENV,
    nodeVersion: process.version,
    platform: process.platform,
    hasDatabase: !!process.env.DATABASE_URL,
    hasSupabase: !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    hasAuth: !!process.env.NEXTAUTH_SECRET,
  }
}

function checkMemory() {
  const memoryUsage = process.memoryUsage()
  return {
    rss: formatBytes(memoryUsage.rss),
    heapTotal: formatBytes(memoryUsage.heapTotal),
    heapUsed: formatBytes(memoryUsage.heapUsed),
    external: formatBytes(memoryUsage.external),
  }
}

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}
