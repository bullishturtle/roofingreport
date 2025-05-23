import { z } from "zod"

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),

  // Auth
  NEXTAUTH_SECRET: z.string().min(1),
  NEXTAUTH_URL: z.string().url(),

  // OAuth (optional)
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),

  // Email (optional)
  EMAIL_SERVER: z.string().optional(),
  EMAIL_FROM: z.string().email().optional(),

  // API Keys (optional)
  OPENAI_API_KEY: z.string().optional(),
  GROQ_API_KEY: z.string().optional(),
  FAL_KEY: z.string().optional(),

  // App (with defaults)
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  NEXT_PUBLIC_APP_VERSION: z.string().optional(),

  // Node
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
})

// Set default values for optional environment variables
const defaultEnvValues = {
  NEXT_PUBLIC_APP_VERSION: "1.0.0",
  NEXT_PUBLIC_APP_URL: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000",
}

export function validateEnv() {
  try {
    // Merge defaults with actual environment variables
    const envWithDefaults = {
      ...defaultEnvValues,
      ...process.env,
    }

    return envSchema.parse(envWithDefaults)
  } catch (error) {
    console.error("❌ Invalid environment variables:", error)

    // In development, just warn and continue with defaults
    if (process.env.NODE_ENV === "development") {
      console.warn("⚠️ Using default values for missing environment variables")
      return {
        ...defaultEnvValues,
        ...process.env,
      }
    }

    throw new Error("Invalid environment variables")
  }
}

// Get app version with fallback
export function getAppVersion(): string {
  return process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0"
}

// Get app URL with fallback
export function getAppUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return "http://localhost:3000"
}

// Validate on import in production
if (process.env.NODE_ENV === "production") {
  validateEnv()
}

export const env = process.env as z.infer<typeof envSchema>
