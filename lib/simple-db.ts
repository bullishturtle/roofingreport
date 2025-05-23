/**
 * SIMPLE DATABASE SOLUTION
 * This replaces Prisma with a simple in-memory database
 * for demonstration purposes
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

// Sample data
const users: User[] = [
  {
    id: "1",
    email: "admin@rooffax.com",
    name: "Admin User",
    role: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    email: "user@example.com",
    name: "Regular User",
    role: "user",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const auditLogs: AuditLog[] = [
  {
    id: "1",
    timestamp: new Date().toISOString(),
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
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    latitude: 37.7749,
    longitude: -122.4194,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Simple database operations
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
      const newUser = {
        id: String(users.length + 1),
        email: data.email || "",
        name: data.name || null,
        role: data.role || "user",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
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
        updatedAt: new Date().toISOString(),
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
      where?: { userId?: string }
      orderBy?: { timestamp?: string }
    } = {}) => {
      let result = [...auditLogs]

      if (where?.userId) {
        result = result.filter((log) => log.userId === where.userId)
      }

      if (orderBy?.timestamp) {
        result.sort((a, b) => {
          return orderBy.timestamp === "desc"
            ? new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            : new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        })
      }

      if (skip) {
        result = result.slice(skip)
      }

      if (take) {
        result = result.slice(0, take)
      }

      return result
    },
    create: async ({ data }: { data: Partial<AuditLog> }) => {
      const newLog = {
        id: String(auditLogs.length + 1),
        timestamp: new Date().toISOString(),
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
  },

  // Property operations
  property: {
    findMany: async ({ orderBy }: { orderBy?: { createdAt?: string } } = {}) => {
      const result = [...properties]

      if (orderBy?.createdAt) {
        result.sort((a, b) => {
          return orderBy.createdAt === "desc"
            ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
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
            ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        })
      }

      return result
    },
  },
}
