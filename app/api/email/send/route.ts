import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html } = await request.json()

    // Log the email details
    console.log(`[Server] Email request received:`)
    console.log(`To: ${to}`)
    console.log(`Subject: ${subject}`)

    // In production, this would use a real email service
    // For now, we'll just return success

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in email API route:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
