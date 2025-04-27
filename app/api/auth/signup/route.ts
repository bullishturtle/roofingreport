import { type NextRequest, NextResponse } from "next/server"
import { sendEmail, generateWelcomeEmail } from "@/lib/email-service"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, password } = body

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    // In a real implementation, you would:
    // 1. Check if user already exists
    // 2. Hash the password
    // 3. Store user in database
    // 4. Create a session or token

    // For now, we'll just simulate a successful signup
    const user = {
      id: Math.random().toString(36).substring(2, 11),
      name,
      email,
      createdAt: new Date(),
    }

    // Send welcome email
    const emailContent = generateWelcomeEmail(name)
    const emailResult = await sendEmail({
      to: email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    })

    if (!emailResult.success) {
      console.error("Failed to send welcome email:", emailResult.error)
      // Continue with signup even if email fails
    }

    return NextResponse.json({
      success: true,
      message: "Account created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
