import { NextResponse } from "next/server"

export async function GET() {
  try {
    const health = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
      environment: process.env.NODE_ENV || "development",
    }

    return NextResponse.json(health)
  } catch (error) {
    return NextResponse.json({ status: "unhealthy", error: "Health check failed" }, { status: 500 })
  }
}
