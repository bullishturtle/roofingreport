/**
 * Simple Database Solution
 * In-memory database for demo purposes
 */

// Type definitions
export interface User {
  id: string
  email: string
  name?: string | null
  role: string
  createdAt: Date
  updatedAt: Date
}

export interface AuditLog {
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

export interface Property {
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

export interface Report {
  id: string
  propertyId: string
  reportType: string
  status: string
  data: any
  createdAt: Date
  updatedAt: Date
}

// Sample data
const users: User[] = [
  {
    id: "1",
    email: "admin@rooffax.com",
    name: "Admin User",
    role: "admin",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    email: "user@example.com",
    name: "Regular User",
    role: "user",
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02"),
  },
]

const auditLogs: AuditLog[] = [
  {
    id: "1",
    timestamp: new Date(),
    userId: "1",
    action: "user.login",
    entityType: "user",
    entityId: "1",
    details: { method: "credentials" },
    ipAddress: "127.0.0.1",
    userAgent: "Mozilla/5.0",
    status: "success",
  },
]

const properties: Property[] = [
  {
    id: "1",
    address: "123 Main St",
    city: "Tampa",
    state: "FL",
    zipCode: "33601",
    latitude: 27.7663,
    longitude: -82.6404,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
]

const reports: Report[] = [
  {
    id: "1",
    propertyId: "1",
    reportType: "inspection",
    status: "completed",
    data: {
      roofCondition: "good",
      estimatedAge: 5,
      recommendations: ["Clean gutters", "Trim overhanging branches"],
    },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
]

// Helper function to generate IDs
const generateId = () => Math.random().toString(36).substring(2, 15)

// Database operations - this is the export that other files expect
export const simpleDb = {
  // User operations
  user: {
    findUnique: async ({ where }: { where: { id?: string; email?: string } }) => {
      if (where.id) {
        return users.find((user) => user.id === where.id) || null
      }
      if (where.email) {
        return users.find((user) => user.email === where.email) || null
      }
      return null
    },
    findMany: async () => {
      return [...users]
    },
    create: async ({ data }: { data: Partial<User> }) => {
      const newUser: User = {
        id: generateId(),
        email: data.email || "",
        name: data.name || null,
        role: data.role || "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      users.push(newUser)
      return newUser
    },
    update: async ({ where, data }: { where: { id: string }; data: Partial<User> }) => {
      const index = users.findIndex((user) => user.id === where.id)
      if (index === -1) return null

      users[index] = {
        ...users[index],
        ...data,
        updatedAt: new Date(),
      }
      return users[index]
    },
  },

  // AuditLog operations
  auditLog: {
    findMany: async ({
      take,
      skip,
      where,
      orderBy,
    }: {
      take?: number
      skip?: number
      where?: { userId?: string; action?: string; entityType?: string }
      orderBy?: { timestamp?: string }
    } = {}) => {
      let result = [...auditLogs]

      // Apply filters
      if (where?.userId) {
        result = result.filter((log) => log.userId === where.userId)
      }
      if (where?.action) {
        result = result.filter((log) => log.action === where.action)
      }
      if (where?.entityType) {
        result = result.filter((log) => log.entityType === where.entityType)
      }

      // Apply sorting
      if (orderBy?.timestamp) {
        result.sort((a, b) => {
          return orderBy.timestamp === "desc"
            ? b.timestamp.getTime() - a.timestamp.getTime()
            : a.timestamp.getTime() - b.timestamp.getTime()
        })
      }

      // Apply pagination
      if (skip) {
        result = result.slice(skip)
      }
      if (take) {
        result = result.slice(0, take)
      }

      return result
    },
    create: async ({ data }: { data: Partial<AuditLog> }) => {
      const newLog: AuditLog = {
        id: generateId(),
        timestamp: new Date(),
        userId: data.userId || null,
        action: data.action || "",
        entityType: data.entityType || "",
        entityId: data.entityId || null,
        details: data.details || {},
        ipAddress: data.ipAddress || null,
        userAgent: data.userAgent || null,
        status: data.status || "success",
      }
      auditLogs.push(newLog)
      return newLog
    },
    count: async ({ where }: { where?: any } = {}) => {
      let result = [...auditLogs]

      if (where?.userId) {
        result = result.filter((log) => log.userId === where.userId)
      }
      if (where?.action) {
        result = result.filter((log) => log.action === where.action)
      }
      if (where?.entityType) {
        result = result.filter((log) => log.entityType === where.entityType)
      }

      return result.length
    },
  },

  // Property operations
  property: {
    findMany: async ({ orderBy }: { orderBy?: { createdAt?: string } } = {}) => {
      const result = [...properties]

      if (orderBy?.createdAt) {
        result.sort((a, b) => {
          return orderBy.createdAt === "desc"
            ? b.createdAt.getTime() - a.createdAt.getTime()
            : a.createdAt.getTime() - b.createdAt.getTime()
        })
      }

      return result
    },
    findUnique: async ({ where }: { where: { id: string } }) => {
      return properties.find((property) => property.id === where.id) || null
    },
  },

  // Report operations
  report: {
    findMany: async ({
      where,
      orderBy,
    }: {
      where?: { propertyId?: string }
      orderBy?: { createdAt?: string }
    } = {}) => {
      let result = [...reports]

      if (where?.propertyId) {
        result = result.filter((report) => report.propertyId === where.propertyId)
      }

      if (orderBy?.createdAt) {
        result.sort((a, b) => {
          return orderBy.createdAt === "desc"
            ? b.createdAt.getTime() - a.createdAt.getTime()
            : a.createdAt.getTime() - b.createdAt.getTime()
        })
      }

      return result
    },
  },
}

// Export as db for compatibility with other files that import { db } from "@/lib/simple-db"
export const db = simpleDb

// Also export as named export for direct access

// Default export for compatibility
export default simpleDb
