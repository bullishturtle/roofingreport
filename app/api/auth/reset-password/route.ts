import { NextResponse } from "next/server"
import prisma from "@/lib/db"
import * as z from "zod"
import { hash } from "bcrypt"

const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { token, password } = resetPasswordSchema.parse(body)

    // Find token in database
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        token,
      },
    })

    if (!verificationToken) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 })
    }

    // Check if token is expired
    if (verificationToken.expires < new Date()) {
      return NextResponse.json({ message: "Token has expired" }, { status: 400 })
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: verificationToken.identifier,
      },
    })

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Hash new password
    const hashedPassword = await hash(password, 10)

    // Update user password
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    })

    // Delete token
    await prisma.verificationToken.delete({
      where: {
        token,
      },
    })

    return NextResponse.json({ message: "Password reset successfully" }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid request data", errors: error.errors }, { status: 400 })
    }

    console.error("Reset password error:", error)
    return NextResponse.json({ message: "Something went wrong. Please try again." }, { status: 500 })
  }
}
