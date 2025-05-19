import { NextResponse } from "next/server"
import prisma from "@/lib/db"
import * as z from "zod"
import { randomBytes } from "crypto"
import { sendEmail } from "@/lib/email"

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { email } = forgotPasswordSchema.parse(body)

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    // Don't reveal if user exists or not for security
    if (!user) {
      return NextResponse.json(
        { message: "If your email is registered, you will receive a password reset link" },
        { status: 200 },
      )
    }

    // Generate token
    const token = randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 3600000) // 1 hour

    // Save token to database
    await prisma.verificationToken.create({
      data: {
        identifier: user.email!,
        token,
        expires,
      },
    })

    // Send email
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`

    await sendEmail({
      to: user.email!,
      subject: "Reset your RoofFax password",
      html: `
        <div>
          <h1>Reset your password</h1>
          <p>Click the link below to reset your password:</p>
          <a href="${resetUrl}">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `,
    })

    return NextResponse.json(
      { message: "If your email is registered, you will receive a password reset link" },
      { status: 200 },
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid request data", errors: error.errors }, { status: 400 })
    }

    console.error("Forgot password error:", error)
    return NextResponse.json({ message: "Something went wrong. Please try again." }, { status: 500 })
  }
}
