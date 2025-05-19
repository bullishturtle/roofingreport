import { hash, compare } from "bcryptjs"
import { randomBytes } from "crypto"
import sql from "./lib/db"
import { sendEmail } from "./lib/email"
import { getWelcomeEmailTemplate } from "./lib/email-templates"
import type { User, UserType } from "@/contexts/user-context"

export interface UserCreateInput {
  name: string
  email: string
  password: string
  userType: UserType
}

export interface UserLoginInput {
  email: string
  password: string
}

// Generate a random token
function generateToken(): string {
  return randomBytes(32).toString("hex")
}

export async function createUser(input: UserCreateInput): Promise<Omit<User, "password">> {
  const { name, email, password, userType } = input

  try {
    // Check if user already exists
    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email}
    `

    if (existingUser.length > 0) {
      throw new Error("User with this email already exists")
    }

    // Hash the password
    const hashedPassword = await hash(password, 10)

    // Generate verification token
    const verificationToken = generateToken()
    const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now

    // Insert the new user
    const result = await sql`
      INSERT INTO users (
        name, 
        email, 
        password, 
        user_type, 
        created_at, 
        last_login, 
        email_verified, 
        verification_token, 
        verification_token_expires
      )
      VALUES (
        ${name}, 
        ${email}, 
        ${hashedPassword}, 
        ${userType}, 
        NOW(), 
        NOW(), 
        FALSE, 
        ${verificationToken}, 
        ${tokenExpires}
      )
      RETURNING id, name, email, user_type, created_at, last_login, email_verified
    `

    const user = result[0]

    // Send welcome email
    try {
      await sendEmail({
        to: email,
        subject: "Welcome to RoofFax!",
        html: getWelcomeEmailTemplate(name),
      })
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError)
      // Continue with user creation even if email fails
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      userType: user.user_type as UserType,
      createdAt: new Date(user.created_at),
      lastLogin: new Date(user.last_login),
      emailVerified: user.email_verified,
      verificationToken,
    }
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

export async function loginUser(input: UserLoginInput): Promise<Omit<User, "password">> {
  const { email, password } = input

  try {
    // Find the user
    const users = await sql`
      SELECT * FROM users WHERE email = ${email}
    `

    if (users.length === 0) {
      throw new Error("User not found")
    }

    const user = users[0]

    // Verify password
    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new Error("Invalid password")
    }

    // Update last login time
    await sql`
      UPDATE users SET last_login = NOW()
      WHERE id = ${user.id}
    `

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      userType: user.user_type as UserType,
      createdAt: new Date(user.created_at),
      lastLogin: new Date(),
      emailVerified: user.email_verified,
    }
  } catch (error) {
    console.error("Error logging in user:", error)
    throw error
  }
}

export async function updateUserType(userId: string, userType: UserType): Promise<void> {
  try {
    await sql`
      UPDATE users SET user_type = ${userType}
      WHERE id = ${userId}
    `
    console.log(`User type updated for user ${userId} to ${userType}`)
  } catch (error) {
    console.error("Error updating user type:", error)
    throw error
  }
}

export async function getUserById(userId: string): Promise<Omit<User, "password"> | null> {
  try {
    const users = await sql`
      SELECT id, name, email, user_type, created_at, last_login, email_verified
      FROM users WHERE id = ${userId}
    `

    if (users.length === 0) {
      return null
    }

    const user = users[0]

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      userType: user.user_type as UserType,
      createdAt: new Date(user.created_at),
      lastLogin: new Date(user.last_login),
      emailVerified: user.email_verified,
    }
  } catch (error) {
    console.error("Error getting user by ID:", error)
    throw error
  }
}

export async function verifyEmail(token: string): Promise<boolean> {
  try {
    // Find user with this verification token
    const users = await sql`
      SELECT * FROM users 
      WHERE verification_token = ${token}
      AND verification_token_expires > NOW()
    `

    if (users.length === 0) {
      return false
    }

    // Update user as verified
    await sql`
      UPDATE users 
      SET 
        email_verified = TRUE, 
        verification_token = NULL, 
        verification_token_expires = NULL
      WHERE id = ${users[0].id}
    `

    console.log(`Email verified for user ${users[0].id}`)
    return true
  } catch (error) {
    console.error("Error verifying email:", error)
    throw error
  }
}

export async function generateNewVerificationToken(email: string): Promise<string | null> {
  try {
    // Find user with this email
    const users = await sql`
      SELECT * FROM users WHERE email = ${email}
    `

    if (users.length === 0) {
      return null
    }

    const user = users[0]

    // If already verified, no need for a new token
    if (user.email_verified) {
      return null
    }

    // Generate new token
    const verificationToken = generateToken()
    const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now

    // Update user with new token
    await sql`
      UPDATE users 
      SET 
        verification_token = ${verificationToken}, 
        verification_token_expires = ${tokenExpires}
      WHERE id = ${user.id}
    `

    console.log(`New verification token generated for user ${user.id}`)
    return verificationToken
  } catch (error) {
    console.error("Error generating new verification token:", error)
    throw error
  }
}

// Password reset functions
export async function createPasswordResetToken(email: string): Promise<{ token: string; name: string } | null> {
  try {
    // Find user with this email
    const users = await sql`
      SELECT * FROM users WHERE email = ${email}
    `

    if (users.length === 0) {
      return null
    }

    const user = users[0]

    // Generate reset token
    const resetToken = generateToken()
    const tokenExpires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now

    // Update user with reset token
    await sql`
      UPDATE users 
      SET 
        reset_password_token = ${resetToken}, 
        reset_password_expires = ${tokenExpires}
      WHERE id = ${user.id}
    `

    console.log(`Password reset token generated for user ${user.id}`)
    return { token: resetToken, name: user.name }
  } catch (error) {
    console.error("Error creating password reset token:", error)
    throw error
  }
}

export async function resetPassword(token: string, newPassword: string): Promise<boolean> {
  try {
    // Find user with this reset token
    const users = await sql`
      SELECT * FROM users 
      WHERE reset_password_token = ${token}
      AND reset_password_expires > NOW()
    `

    if (users.length === 0) {
      return false
    }

    // Hash the new password
    const hashedPassword = await hash(newPassword, 10)

    // Update user password and clear reset token
    await sql`
      UPDATE users 
      SET 
        password = ${hashedPassword},
        reset_password_token = NULL, 
        reset_password_expires = NULL
      WHERE id = ${users[0].id}
    `

    console.log(`Password reset for user ${users[0].id}`)
    return true
  } catch (error) {
    console.error("Error resetting password:", error)
    throw error
  }
}

export async function validateResetToken(token: string): Promise<boolean> {
  try {
    // Check if token exists and is not expired
    const users = await sql`
      SELECT * FROM users 
      WHERE reset_password_token = ${token}
      AND reset_password_expires > NOW()
    `

    return users.length > 0
  } catch (error) {
    console.error("Error validating reset token:", error)
    throw error
  }
}
