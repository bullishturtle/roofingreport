// Simple in-memory database for demo purposes
// In production, this would be replaced with a real database

interface User {
  id: string
  email: string
  name: string
  role: string
  createdAt: Date
}

interface AuditLog {
  id: string
  action: string
  userId?: string
  details: string
  timestamp: Date
  ip?: string
}

interface Property {
  id: string
  address: string
  owner: string
  roofCondition: string
  lastInspection: Date
}

// In-memory storage (resets on server restart)
const users: User[] = []
const auditLogs: AuditLog[] = []
const properties: Property[] = [
  {
    id: "1",
    address: "123 Main St, Tampa, FL 33601",
    owner: "John Smith",
    roofCondition: "Good",
    lastInspection: new Date("2024-01-15"),
  },
  {
    id: "2",
    address: "456 Oak Ave, Tampa, FL 33602",
    owner: "Jane Doe",
    roofCondition: "Needs Repair",
    lastInspection: new Date("2024-02-20"),
  },
]

export const db = {
  // User operations
  user: {
    findUnique: async ({ where }: { where: { email?: string; id?: string } }) => {
      return users.find((u) => u.email === where.email || u.id === where.id) || null
    },
    create: async ({ data }: { data: Omit<User, "id" | "createdAt"> }) => {
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        ...data,
      }
      users.push(user)
      return user
    },
    findMany: async () => users,
  },

  // Audit log operations
  auditLog: {
    create: async ({ data }: { data: Omit<AuditLog, "id" | "timestamp"> }) => {
      const log: AuditLog = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
        ...data,
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

  // Property operations
  property: {
    findMany: async () => properties,
    findUnique: async ({ where }: { where: { id: string } }) => {
      return properties.find((p) => p.id === where.id) || null
    },
  },
}

export default db
