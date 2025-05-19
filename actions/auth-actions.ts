"use server"

import { cookies } from "next/headers"
import {
  createUser,
  loginUser,
  updateUserType,
  getUserById,
  verifyEmail as verifyEmailService,
  generateNewVerificationToken,
  createPasswordResetToken,
  resetPassword as resetPasswordService,
  validateResetToken,
} from "@/lib/user-service"
import type { UserType } from "@/contexts/user-context"
import { sign, verify } from "jsonwebtoken"
import { sendEmail } from "@/lib/email"
import { getVerificationEmailTemplate, getPasswordResetEmailTemplate } from "@/lib/email-templates"
import { sql } from "@vercel/postgres"

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "your-fallback-secret"
const TOKEN_EXPIRY = "7d"
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

export async function register(name: string, email: string, password: string, userType: UserType) {
  try {
    const user = await createUser({ name, email, password, userType })

    // Send verification email
    const verificationUrl = `${BASE_URL}/verify-email?token=${user.verificationToken}`
    await sendEmail({
      to: email,
      subject: "Verify your email address",
      html: getVerificationEmailTemplate(name, verificationUrl),
    })

    // Don't create JWT token yet - wait for email verification
    return {
      success: true,
      message: "Registration successful. Please check your email to verify your account.",
    }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function login(email: string, password: string) {
  try {
    const user = await loginUser({ email, password })

    // Check if email is verified
    if (!user.emailVerified) {
      return {
        success: false,
        error: "Please verify your email address before logging in.",
        needsVerification: true,
      }
    }

    // Create JWT token
    const token = sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY })

    // Set cookie
    cookies().set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return { success: true, user }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function logout() {
  cookies().delete("auth_token")
  return { success: true }
}

export async function setUserType(userType: UserType) {
  try {
    const token = cookies().get("auth_token")?.value

    if (!token) {
      return { success: false, error: "Not authenticated" }
    }

    const decoded = verify(token, JWT_SECRET) as { id: string }
    await updateUserType(decoded.id, userType)

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function getCurrentUser() {
  try {
    const token = cookies().get("auth_token")?.value

    if (!token) {
      return { success: false, user: null }
    }

    const decoded = verify(token, JWT_SECRET) as { id: string }
    const user = await getUserById(decoded.id)

    return { success: true, user }
  } catch (error) {
    cookies().delete("auth_token")
    return { success: false, user: null }
  }
}

export async function verifyEmail(token: string) {
  try {
    const success = await verifyEmailService(token)

    if (!success) {
      return {
        success: false,
        error: "Invalid or expired verification token.",
      }
    }

    return {
      success: true,
      message: "Email verified successfully. You can now log in.",
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to verify email.",
    }
  }
}

export async function resendVerificationEmail(email: string) {
  try {
    const token = await generateNewVerificationToken(email)

    if (!token) {
      return {
        success: false,
        error: "User not found or already verified.",
      }
    }

    // Find user to get their name
    const users = await sql`
      SELECT name FROM users WHERE email = ${email}
    `

    if (users.length === 0) {
      return { success: false, error: "User not found." }
    }

    const name = users[0].name

    // Send verification email
    const verificationUrl = `${BASE_URL}/verify-email?token=${token}`
    await sendEmail({
      to: email,
      subject: "Verify your email address",
      html: getVerificationEmailTemplate(name, verificationUrl),
    })

    return {
      success: true,
      message: "Verification email sent. Please check your inbox.",
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to resend verification email.",
    }
  }
}

export async function forgotPassword(email: string) {
  try {
    const result = await createPasswordResetToken(email)

    if (!result) {
      // Don't reveal if user exists or not for security
      return {
        success: true,
        message: "If your email is registered, you will receive a password reset link.",
      }
    }

    const { token, name } = result

    // Send password reset email
    const resetUrl = `${BASE_URL}/reset-password?token=${token}`
    await sendEmail({
      to: email,
      subject: "Reset your RoofFax password",
      html: getPasswordResetEmailTemplate(name, resetUrl),
    })

    return {
      success: true,
      message: "If your email is registered, you will receive a password reset link.",
    }
  } catch (error: any) {
    console.error("Forgot password error:", error)
    return {
      success: true, // Still return success for security
      message: "If your email is registered, you will receive a password reset link.",
    }
  }
}

export async function resetPassword(token: string, password: string) {
  try {
    const success = await resetPasswordService(token, password)

    if (!success) {
      return {
        success: false,
        error: "Invalid or expired reset token.",
      }
    }

    return {
      success: true,
      message: "Password reset successfully. You can now log in with your new password.",
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to reset password.",
    }
  }
}

export async function checkResetToken(token: string) {
  try {
    const isValid = await validateResetToken(token)

    return {
      success: isValid,
      error: isValid ? null : "Invalid or expired reset token.",
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to validate reset token.",
    }
  }
}
