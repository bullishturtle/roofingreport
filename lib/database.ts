/**
 * SERVER-ONLY DATABASE MODULE
 * This file should NEVER be imported in client-side code
 */

import { PrismaClient } from "@prisma/client"

// Ensure this only runs on server
if (typeof window !== "undefined") {
  throw new Error("This module can only be used on the server side")
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma

// Export types only (these are safe for client-side)
export type { User, AuditLog, Property, Report } from "@prisma/client"
