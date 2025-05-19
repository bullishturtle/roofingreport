import { NextResponse } from "next/server"

export async function GET() {
  const emailApiKey = process.env.EMAIL_API_KEY
  const isConfigured = !!emailApiKey && emailApiKey.length > 0

  return NextResponse.json({
    configured: isConfigured,
    provider: "resend",
    fromEmail: process.env.EMAIL_FROM || "noreply@rooffax.report",
  })
}
