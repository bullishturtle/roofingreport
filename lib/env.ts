import { z } from "zod"

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url().optional(),
  POSTGRES_URL: z.string().url().optional(),

  // Authentication
  NEXTAUTH_SECRET: z.string().min(1).optional(),
  NEXTAUTH_URL: z.string().url().optional(),

  // Google OAuth
  GOOGLE_CLIENT_ID: z.string().min(1).optional(),
  GOOGLE_CLIENT_SECRET: z.string().min(1).optional(),

  // AI Services (Server-side only - OpenAI focused)
  OPENAI_API_KEY: z.string().min(1).optional(),
  GROQ_API_KEY: z.string().min(1).optional(),
  DEEPINFRA_API_KEY: z.string().min(1).optional(),
  FAL_KEY: z.string().min(1).optional(),

  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),

  // Storage
  BLOB_READ_WRITE_TOKEN: z.string().min(1).optional(),

  // Redis/KV
  KV_URL: z.string().url().optional(),
  KV_REST_API_TOKEN: z.string().min(1).optional(),
  KV_REST_API_URL: z.string().url().optional(),

  // Cron
  CRON_SECRET: z.string().min(1).optional(),

  // Email
  EMAIL_SERVER: z.string().min(1).optional(),
  EMAIL_PORT: z.string().min(1).optional(),
  EMAIL_USER: z.string().min(1).optional(),
  EMAIL_PASSWORD: z.string().min(1).optional(),
  EMAIL_FROM: z.string().email().optional(),

  // Analytics
  STATSIG_SERVER_API_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_STATSIG_CLIENT_KEY: z.string().min(1).optional(),

  // App configuration
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  NEXT_PUBLIC_APP_VERSION: z.string().optional(),

  // Node environment
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
})

// Set default values for optional environment variables
const defaultEnvValues = {
  NEXT_PUBLIC_APP_VERSION: "1.0.0",
  NEXT_PUBLIC_APP_URL: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://therooffax.com",
  NEXTAUTH_URL: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://therooffax.com",
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

  return "https://therooffax.com"
}

// Validate on import in production
if (process.env.NODE_ENV === "production") {
  validateEnv()
}

export const env = process.env as z.infer<typeof envSchema>
