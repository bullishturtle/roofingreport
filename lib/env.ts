/**
 * Environment Configuration
 * Handles environment variables and provides utility functions
 */

// Environment variable access
export const env = {
  // Server-side only
  NODE_ENV: process.env.NODE_ENV || "development",
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  DATABASE_URL: process.env.DATABASE_URL,

  // Client-side safe
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
}

// Utility functions that other components expect
export function getAppVersion(): string {
  return process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0"
}

export function getAppUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return "https://therooffax.com"
}

export function validateEnv() {
  // Simple validation - just warn if important vars are missing
  if (!process.env.NEXTAUTH_SECRET && process.env.NODE_ENV === "production") {
    console.warn("⚠️ NEXTAUTH_SECRET is missing in production")
  }

  if (!process.env.OPENAI_API_KEY) {
    console.warn("⚠️ OPENAI_API_KEY is missing - AI features may not work")
  }

  return env
}
