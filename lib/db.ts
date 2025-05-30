/**
 * Simple Database Implementation
 * Replaces Prisma for demo purposes while maintaining API compatibility
 */

export interface User {
  id: string
  email: string
  name: string
  role: string
  createdAt: Date
  updatedAt?: Date
}

export interface AuditLog {
  id: string
  action: string
  userId?: string
  details: string
  timestamp: Date
}

export interface Property {
  id: string
  address: string
  city: string
  state: string
  zipCode: string
  roofAge?: number
  roofMaterial?: string
  lastInspection?: Date
  createdAt: Date
  updatedAt?: Date
}

export interface Report {
  id: string
  propertyId: string
  type: string
  status: string
  findings: string
  createdAt: Date
  updatedAt?: Date
}

// In-memory storage with sample data
const users: User[] = [
  {
    id: "1",
    email: "demo@rooffax.com",
    name: "Demo User",
    role: "user",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    email: "admin@rooffax.com",
    name: "Admin User",
    role: "admin",
    createdAt: new Date("2024-01-01"),
  },
]

const auditLogs: AuditLog[] = [
  {
    id: "1",
    action: "user_login",
    userId: "1",
    details: "User logged in successfully",
    timestamp: new Date(),
  },
]

const properties: Property[] = [
  {
    id: "1",
    address: "123 Main St",
    city: "Tampa",
    state: "FL",
    zipCode: "33601",
    roofAge: 15,
    roofMaterial: "Asphalt Shingles",
    lastInspection: new Date("2024-01-15"),
    createdAt: new Date("2024-01-01"),
  },
]

const reports: Report[] = [
  {
    id: "1",
    propertyId: "1",
    type: "inspection",
    status: "completed",
    findings: "Minor wear on south-facing shingles",
    createdAt: new Date("2024-01-15"),
  },
]

// Database interface that matches Prisma API
export const db = {
  user: {
    findUnique: async ({ where }: { where: { email?: string; id?: string } }) => {
      return users.find((u) => u.email === where.email || u.id === where.id) || null
    },
    findMany: async () => users,
    create: async ({ data }: { data: Omit<User, "id" | "createdAt"> }) => {
      const user: User = {
        ...data,
        id: (users.length + 1).toString(),
        createdAt: new Date(),
      }
      users.push(user)
      return user
    },
    update: async ({ where, data }: { where: { id: string }; data: Partial<User> }) => {
      const index = users.findIndex((u) => u.id === where.id)
      if (index !== -1) {
        users[index] = { ...users[index], ...data, updatedAt: new Date() }
        return users[index]
      }
      throw new Error("User not found")
    },
    delete: async ({ where }: { where: { id: string } }) => {
      const index = users.findIndex((u) => u.id === where.id)
      if (index !== -1) {
        return users.splice(index, 1)[0]
      }
      throw new Error("User not found")
    },
  },
  auditLog: {
    create: async ({ data }: { data: Omit<AuditLog, "id" | "timestamp"> }) => {
      const log: AuditLog = {
        ...data,
        id: (auditLogs.length + 1).toString(),
        timestamp: new Date(),
      }
      auditLogs.push(log)
      return log
    },
    findMany: async ({ take, orderBy }: { take?: number; orderBy?: any } = {}) => {
      let result = [...auditLogs]
      if (orderBy?.timestamp === "desc") {
        result.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      }
      if (take) {
        result = result.slice(0, take)
      }
      return result
    },
  },
  property: {
    findMany: async () => properties,
    findUnique: async ({ where }: { where: { id: string } }) => {
      return properties.find((p) => p.id === where.id) || null
    },
    create: async ({ data }: { data: Omit<Property, "id" | "createdAt"> }) => {
      const property: Property = {
        ...data,
        id: (properties.length + 1).toString(),
        createdAt: new Date(),
      }
      properties.push(property)
      return property
    },
  },
  report: {
    findMany: async ({ where }: { where?: { propertyId?: string } } = {}) => {
      if (where?.propertyId) {
        return reports.filter((r) => r.propertyId === where.propertyId)
      }
      return reports
    },
    create: async ({ data }: { data: Omit<Report, "id" | "createdAt"> }) => {
      const report: Report = {
        ...data,
        id: (reports.length + 1).toString(),
        createdAt: new Date(),
      }
      reports.push(report)
      return report
    },
  },
}

export default db

// Export for compatibility
export const prisma = db
