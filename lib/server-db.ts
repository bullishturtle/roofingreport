/**
 * SERVER-ONLY DATABASE MODULE
 * This file must NEVER be imported in client-side code
 */

// Runtime check to ensure this only runs on server
if (typeof window !== "undefined") {
  throw new Error("server-db.ts can only be used on the server side")
}

import { PrismaClient } from "@prisma/client"

declare global {
  var __prisma: PrismaClient | undefined
}

export const db = globalThis.__prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma = db
}

// Export types for use in API routes and server components
export type { User, AuditLog, Property, Report } from "@prisma/client"
