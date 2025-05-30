/**
 * Environment Configuration
 * Secure environment variable handling without sensitive client exposure
 */

import { z } from "zod"

// Server-side environment variables only
const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXTAUTH_SECRET: z.string().min(1).optional(),
  NEXTAUTH_URL: z.string().url().optional(),
  GOOGLE_CLIENT_ID: z.string().min(1).optional(),
  GOOGLE_CLIENT_SECRET: z.string().min(1).optional(),
  OPENAI_API_KEY: z.string().min(1).optional(),
  DATABASE_URL: z.string().url().optional(),
})

// Client-side environment variables (safe to expose)
const clientSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  NEXT_PUBLIC_APP_VERSION: z.string().optional(),
})

// Validate environment variables
const serverEnv = serverSchema.safeParse(process.env)
const clientEnv = clientSchema.safeParse(process.env)

if (!serverEnv.success) {
  console.warn("⚠️ Invalid server environment variables:", serverEnv.error.format())
}

if (!clientEnv.success) {
  console.warn("⚠️ Invalid client environment variables:", clientEnv.error.format())
}

// Export validated environment variables
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

// Type-safe environment access
export type Env = typeof env
