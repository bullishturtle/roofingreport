/**
 * CLIENT-SAFE DATABASE INTERFACE
 * This module provides database operations that work in both server and client
 */

// Type definitions (safe for client-side)
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

export type Property = {
  id: string
  address: string
  city: string
  state: string
  zipCode: string
  latitude?: number | null
  longitude?: number | null
  createdAt: Date
  updatedAt: Date
}

export type Report = {
  id: string
  propertyId: string
  reportType: string
  status: string
  data: any
  createdAt: Date
  updatedAt: Date
}

// Helper to detect environment
const isServer = typeof window === "undefined"

// Client-safe database operations
export async function getUser(id: string): Promise<User | null> {
  if (isServer) {
    // Server-side: use direct database access
    const { prisma } = await import("./database")
    return prisma.user.findUnique({ where: { id } })
  } else {
    // Client-side: use API route
    try {
      const response = await fetch(`/api/users/${id}`)
      if (!response.ok) return null
      return response.json()
    } catch (error) {
      console.error("Failed to fetch user:", error)
      return null
    }
  }
}

export async function getUsers(): Promise<User[]> {
  if (isServer) {
    const { prisma } = await import("./database")
    return prisma.user.findMany()
  } else {
    try {
      const response = await fetch("/api/users")
      if (!response.ok) return []
      return response.json()
    } catch (error) {
      console.error("Failed to fetch users:", error)
      return []
    }
  }
}

export async function getAuditLogs(params?: {
  limit?: number
  offset?: number
  userId?: string
}): Promise<AuditLog[]> {
  if (isServer) {
    const { prisma } = await import("./database")
    return prisma.auditLog.findMany({
      take: params?.limit,
      skip: params?.offset,
      where: params?.userId ? { userId: params.userId } : undefined,
      orderBy: { timestamp: "desc" },
    })
  } else {
    try {
      const queryParams = new URLSearchParams()
      if (params?.limit) queryParams.set("limit", params.limit.toString())
      if (params?.offset) queryParams.set("offset", params.offset.toString())
      if (params?.userId) queryParams.set("userId", params.userId)

      const response = await fetch(`/api/audit/log?${queryParams}`)
      if (!response.ok) return []
      return response.json()
    } catch (error) {
      console.error("Failed to fetch audit logs:", error)
      return []
    }
  }
}

export async function getProperties(): Promise<Property[]> {
  if (isServer) {
    const { prisma } = await import("./database")
    return prisma.property.findMany()
  } else {
    try {
      const response = await fetch("/api/properties")
      if (!response.ok) return []
      return response.json()
    } catch (error) {
      console.error("Failed to fetch properties:", error)
      return []
    }
  }
}

export async function getReports(propertyId?: string): Promise<Report[]> {
  if (isServer) {
    const { prisma } = await import("./database")
    return prisma.report.findMany({
      where: propertyId ? { propertyId } : undefined,
      orderBy: { createdAt: "desc" },
    })
  } else {
    try {
      const url = propertyId ? `/api/reports?propertyId=${propertyId}` : "/api/reports"
      const response = await fetch(url)
      if (!response.ok) return []
      return response.json()
    } catch (error) {
      console.error("Failed to fetch reports:", error)
      return []
    }
  }
}
