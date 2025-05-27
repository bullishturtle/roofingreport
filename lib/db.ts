// Simple in-memory database for demo purposes
// No external dependencies required

export interface User {
  id: string
  email: string
  name: string
  role: string
  createdAt: Date
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
}

export interface Report {
  id: string
  propertyId: string
  type: string
  status: string
  findings: string
  createdAt: Date
}

// In-memory storage
const users: User[] = [
  {
    id: "1",
    email: "demo@rooffax.com",
    name: "Demo User",
    role: "user",
    createdAt: new Date(),
  },
]

const auditLogs: AuditLog[] = []
const properties: Property[] = []
const reports: Report[] = []

// Simple database interface
export const db = {
  user: {
    findUnique: async ({ where }: { where: { email?: string; id?: string } }) => {
      return users.find((u) => u.email === where.email || u.id === where.id) || null
    },
    create: async ({ data }: { data: Omit<User, "id" | "createdAt"> }) => {
      const user: User = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date(),
      }
      users.push(user)
      return user
    },
    findMany: async () => users,
  },
  auditLog: {
    create: async ({ data }: { data: Omit<AuditLog, "id" | "timestamp"> }) => {
      const log: AuditLog = {
        ...data,
        id: Date.now().toString(),
        timestamp: new Date(),
      }
      auditLogs.push(log)
      return log
    },
    findMany: async () => auditLogs,
  },
  property: {
    findMany: async () => properties,
    create: async ({ data }: { data: Omit<Property, "id"> }) => {
      const property: Property = {
        ...data,
        id: Date.now().toString(),
      }
      properties.push(property)
      return property
    },
  },
  report: {
    findMany: async () => reports,
    create: async ({ data }: { data: Omit<Report, "id" | "createdAt"> }) => {
      const report: Report = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date(),
      }
      reports.push(report)
      return report
    },
  },
}

export default db
