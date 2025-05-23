// This file provides a browser-safe version of database operations
// It uses API routes instead of direct Prisma calls when in the browser

import { isBrowser } from "./utils"

// Type definitions for our database models
export type User = {
  id: string
  email: string
  name?: string | null
  role: string
  createdAt: Date
  updatedAt: Date
}

export type AuditLog = {
  id: string
  timestamp: Date
  userId?: string | null
  action: string
  entityType: string
  entityId?: string | null
  details: any
  ipAddress?: string | null
  userAgent?: string | null
  status: string
}

// Browser-safe database operations
export async function getUser(id: string): Promise<User | null> {
  if (isBrowser()) {
    // Use API route in browser
    const response = await fetch(`/api/users/${id}`)
    if (!response.ok) return null
    return response.json()
  } else {
    // Server-side, we can use Prisma directly
    const { prisma } = await import("./prisma")
    return prisma.user.findUnique({ where: { id } })
  }
}

export async function getAuditLogs(params: any): Promise<AuditLog[]> {
  if (isBrowser()) {
    // Use API route in browser
    const queryParams = new URLSearchParams(params)
    const response = await fetch(`/api/audit/log?${queryParams}`)
    if (!response.ok) return []
    return response.json()
  } else {
    // Server-side, we can use Prisma directly
    const { prisma } = await import("./prisma")
    return prisma.auditLog.findMany(params)
  }
}
