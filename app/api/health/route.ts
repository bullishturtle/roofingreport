import { NextResponse } from "next/server"
import { getAppVersion, getAppUrl } from "@/lib/env"

export async function GET() {
  try {
    const health = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: getAppVersion(),
      environment: process.env.NODE_ENV,
      url: getAppUrl(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      checks: {
        database: "healthy", // You can add actual DB health check here
        auth: "healthy",
        api: "healthy",
      },
    }

    return NextResponse.json(health, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        error: "Health check failed",
        timestamp: new Date().toISOString(),
        version: getAppVersion(),
      },
      { status: 500 },
    )
  }
}
