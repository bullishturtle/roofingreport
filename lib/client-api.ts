/**
 * CLIENT-ONLY API MODULE
 * This module provides data fetching for client components
 */

// Type definitions
export interface User {
  id: string
  email: string
  name?: string | null
  role: string
  createdAt: string
  updatedAt: string
}

export interface AuditLog {
  id: string
  timestamp: string
  userId?: string | null
  action: string
  entityType: string
  entityId?: string | null
  details: any
  ipAddress?: string | null
  userAgent?: string | null
  status: string
}

export interface Property {
  id: string
  address: string
  city: string
  state: string
  zipCode: string
  latitude?: number | null
  longitude?: number | null
  createdAt: string
  updatedAt: string
}

export interface Report {
  id: string
  propertyId: string
  reportType: string
  status: string
  data: any
  createdAt: string
  updatedAt: string
}

// API client functions
export async function fetchUser(id: string): Promise<User | null> {
  try {
    const response = await fetch(`/api/users/${id}`)
    if (!response.ok) return null
    return response.json()
  } catch (error) {
    console.error("Failed to fetch user:", error)
    return null
  }
}

export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch("/api/users")
    if (!response.ok) return []
    return response.json()
  } catch (error) {
    console.error("Failed to fetch users:", error)
    return []
  }
}

export async function fetchAuditLogs(params?: {
  limit?: number
  offset?: number
  userId?: string
}): Promise<AuditLog[]> {
  try {
    const queryParams = new URLSearchParams()
    if (params?.limit) queryParams.set("limit", params.limit.toString())
    if (params?.offset) queryParams.set("offset", params.offset.toString())
    if (params?.userId) queryParams.set("userId", params.userId)

    const response = await fetch(`/api/audit/logs?${queryParams}`)
    if (!response.ok) return []
    return response.json()
  } catch (error) {
    console.error("Failed to fetch audit logs:", error)
    return []
  }
}

export async function fetchProperties(): Promise<Property[]> {
  try {
    const response = await fetch("/api/properties")
    if (!response.ok) return []
    return response.json()
  } catch (error) {
    console.error("Failed to fetch properties:", error)
    return []
  }
}

export async function fetchReports(propertyId?: string): Promise<Report[]> {
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
