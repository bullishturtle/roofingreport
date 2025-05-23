/**
 * Simple in-memory database that mimics Prisma's API
 * This allows the application to function without Prisma
 */

// Define types that match Prisma models
export type User = {
  id: string
  name: string
  email: string
  role: string
  createdAt: Date
  updatedAt: Date
}

export type Property = {
  id: string
  address: string
  city: string
  state: string
  zipCode: string
  ownerId: string
  createdAt: Date
  updatedAt: Date
}

export type Report = {
  id: string
  propertyId: string
  inspectionDate: Date
  roofCondition: string
  estimatedAge: number
  recommendations: string
  createdAt: Date
  updatedAt: Date
}

export type AuditLog = {
  id: string
  action: string
  entityId?: string
  entityType?: string
  userId?: string
  metadata?: any
  createdAt: Date
}

// Sample data
const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@rooffax.com",
    role: "ADMIN",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "2",
    name: "John Homeowner",
    email: "john@example.com",
    role: "USER",
    createdAt: new Date("2023-01-02"),
    updatedAt: new Date("2023-01-02"),
  },
  {
    id: "3",
    name: "Sarah Contractor",
    email: "sarah@example.com",
    role: "PRO",
    createdAt: new Date("2023-01-03"),
    updatedAt: new Date("2023-01-03"),
  },
]

const properties: Property[] = [
  {
    id: "1",
    address: "123 Main St",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    ownerId: "2",
    createdAt: new Date("2023-02-01"),
    updatedAt: new Date("2023-02-01"),
  },
  {
    id: "2",
    address: "456 Oak Ave",
    city: "Somewhere",
    state: "NY",
    zipCode: "67890",
    ownerId: "2",
    createdAt: new Date("2023-02-15"),
    updatedAt: new Date("2023-02-15"),
  },
]

const reports: Report[] = [
  {
    id: "1",
    propertyId: "1",
    inspectionDate: new Date("2023-03-01"),
    roofCondition: "Good",
    estimatedAge: 5,
    recommendations: "No immediate action required",
    createdAt: new Date("2023-03-01"),
    updatedAt: new Date("2023-03-01"),
  },
  {
    id: "2",
    propertyId: "2",
    inspectionDate: new Date("2023-03-15"),
    roofCondition: "Fair",
    estimatedAge: 12,
    recommendations: "Consider inspection in 2 years",
    createdAt: new Date("2023-03-15"),
    updatedAt: new Date("2023-03-15"),
  },
]

const auditLogs: AuditLog[] = [
  {
    id: "1",
    action: "user.login",
    userId: "1",
    entityType: "user",
    entityId: "1",
    metadata: { ip: "192.168.1.1" },
    createdAt: new Date("2023-04-01"),
  },
  {
    id: "2",
    action: "report.view",
    userId: "2",
    entityType: "report",
    entityId: "1",
    metadata: { source: "dashboard" },
    createdAt: new Date("2023-04-02"),
  },
]

// Helper function to generate IDs
const generateId = () => Math.random().toString(36).substring(2, 15)

// Create a Prisma-like API
export const simpleDb = {
  user: {
    findMany: async (options?: any) => {
      // Simple implementation of findMany
      let result = [...users]

      // Handle where clause (very simplified)
      if (options?.where) {
        const where = options.where
        if (where.id) result = result.filter((u) => u.id === where.id)
        if (where.email) result = result.filter((u) => u.email === where.email)
        if (where.role) result = result.filter((u) => u.role === where.role)
      }

      // Handle select (very simplified)
      if (options?.select) {
        result = result.map((item) => {
          const selected: any = {}
          Object.keys(options.select).forEach((key) => {
            if (options.select[key] && (item as any)[key] !== undefined) {
              selected[key] = (item as any)[key]
            }
          })
          return selected
        })
      }

      return result
    },
    findUnique: async (options: any) => {
      if (!options?.where) return null

      // Find by id or email
      let user = null
      if (options.where.id) {
        user = users.find((u) => u.id === options.where.id)
      } else if (options.where.email) {
        user = users.find((u) => u.email === options.where.email)
      }

      if (!user) return null

      // Handle select
      if (options?.select) {
        const selected: any = {}
        Object.keys(options.select).forEach((key) => {
          if (options.select[key] && (user as any)[key] !== undefined) {
            selected[key] = (user as any)[key]
          }
        })
        return selected
      }

      return user
    },
    create: async (options: any) => {
      if (!options?.data) throw new Error("Data is required")

      const newUser: User = {
        id: options.data.id || generateId(),
        name: options.data.name || "",
        email: options.data.email || "",
        role: options.data.role || "USER",
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      users.push(newUser)
      return newUser
    },
    update: async (options: any) => {
      if (!options?.where || !options?.data) throw new Error("Where and data are required")

      const index = users.findIndex((u) => u.id === options.where.id)
      if (index === -1) throw new Error("User not found")

      const updatedUser = {
        ...users[index],
        ...options.data,
        updatedAt: new Date(),
      }

      users[index] = updatedUser
      return updatedUser
    },
    delete: async (options: any) => {
      if (!options?.where) throw new Error("Where is required")

      const index = users.findIndex((u) => u.id === options.where.id)
      if (index === -1) throw new Error("User not found")

      const deletedUser = users[index]
      users.splice(index, 1)
      return deletedUser
    },
  },
  property: {
    findMany: async (options?: any) => {
      // Simple implementation of findMany
      let result = [...properties]

      // Handle where clause (very simplified)
      if (options?.where) {
        const where = options.where
        if (where.id) result = result.filter((p) => p.id === where.id)
        if (where.ownerId) result = result.filter((p) => p.ownerId === where.ownerId)
      }

      // Handle select (very simplified)
      if (options?.select) {
        result = result.map((item) => {
          const selected: any = {}
          Object.keys(options.select).forEach((key) => {
            if (options.select[key] && (item as any)[key] !== undefined) {
              selected[key] = (item as any)[key]
            }
          })
          return selected
        })
      }

      return result
    },
    findUnique: async (options: any) => {
      if (!options?.where) return null

      const property = properties.find((p) => p.id === options.where.id)
      if (!property) return null

      // Handle select
      if (options?.select) {
        const selected: any = {}
        Object.keys(options.select).forEach((key) => {
          if (options.select[key] && (property as any)[key] !== undefined) {
            selected[key] = (property as any)[key]
          }
        })
        return selected
      }

      return property
    },
    create: async (options: any) => {
      if (!options?.data) throw new Error("Data is required")

      const newProperty: Property = {
        id: options.data.id || generateId(),
        address: options.data.address || "",
        city: options.data.city || "",
        state: options.data.state || "",
        zipCode: options.data.zipCode || "",
        ownerId: options.data.ownerId || "",
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      properties.push(newProperty)
      return newProperty
    },
    update: async (options: any) => {
      if (!options?.where || !options?.data) throw new Error("Where and data are required")

      const index = properties.findIndex((p) => p.id === options.where.id)
      if (index === -1) throw new Error("Property not found")

      const updatedProperty = {
        ...properties[index],
        ...options.data,
        updatedAt: new Date(),
      }

      properties[index] = updatedProperty
      return updatedProperty
    },
    delete: async (options: any) => {
      if (!options?.where) throw new Error("Where is required")

      const index = properties.findIndex((p) => p.id === options.where.id)
      if (index === -1) throw new Error("Property not found")

      const deletedProperty = properties[index]
      properties.splice(index, 1)
      return deletedProperty
    },
  },
  report: {
    findMany: async (options?: any) => {
      // Simple implementation of findMany
      let result = [...reports]

      // Handle where clause (very simplified)
      if (options?.where) {
        const where = options.where
        if (where.id) result = result.filter((r) => r.id === where.id)
        if (where.propertyId) result = result.filter((r) => r.propertyId === where.propertyId)
      }

      // Handle select (very simplified)
      if (options?.select) {
        result = result.map((item) => {
          const selected: any = {}
          Object.keys(options.select).forEach((key) => {
            if (options.select[key] && (item as any)[key] !== undefined) {
              selected[key] = (item as any)[key]
            }
          })
          return selected
        })
      }

      return result
    },
    findUnique: async (options: any) => {
      if (!options?.where) return null

      const report = reports.find((r) => r.id === options.where.id)
      if (!report) return null

      // Handle select
      if (options?.select) {
        const selected: any = {}
        Object.keys(options.select).forEach((key) => {
          if (options.select[key] && (report as any)[key] !== undefined) {
            selected[key] = (report as any)[key]
          }
        })
        return selected
      }

      return report
    },
    create: async (options: any) => {
      if (!options?.data) throw new Error("Data is required")

      const newReport: Report = {
        id: options.data.id || generateId(),
        propertyId: options.data.propertyId || "",
        inspectionDate: options.data.inspectionDate || new Date(),
        roofCondition: options.data.roofCondition || "",
        estimatedAge: options.data.estimatedAge || 0,
        recommendations: options.data.recommendations || "",
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      reports.push(newReport)
      return newReport
    },
    update: async (options: any) => {
      if (!options?.where || !options?.data) throw new Error("Where and data are required")

      const index = reports.findIndex((r) => r.id === options.where.id)
      if (index === -1) throw new Error("Report not found")

      const updatedReport = {
        ...reports[index],
        ...options.data,
        updatedAt: new Date(),
      }

      reports[index] = updatedReport
      return updatedReport
    },
    delete: async (options: any) => {
      if (!options?.where) throw new Error("Where is required")

      const index = reports.findIndex((r) => r.id === options.where.id)
      if (index === -1) throw new Error("Report not found")

      const deletedReport = reports[index]
      reports.splice(index, 1)
      return deletedReport
    },
  },
  auditLog: {
    findMany: async (options?: any) => {
      // Simple implementation of findMany
      let result = [...auditLogs]

      // Handle where clause (very simplified)
      if (options?.where) {
        const where = options.where
        if (where.id) result = result.filter((a) => a.id === where.id)
        if (where.userId) result = result.filter((a) => a.userId === where.userId)
        if (where.action) result = result.filter((a) => a.action === where.action)
        if (where.entityType) result = result.filter((a) => a.entityType === where.entityType)
        if (where.entityId) result = result.filter((a) => a.entityId === where.entityId)
      }

      // Handle select (very simplified)
      if (options?.select) {
        result = result.map((item) => {
          const selected: any = {}
          Object.keys(options.select).forEach((key) => {
            if (options.select[key] && (item as any)[key] !== undefined) {
              selected[key] = (item as any)[key]
            }
          })
          return selected
        })
      }

      return result
    },
    findUnique: async (options: any) => {
      if (!options?.where) return null

      const auditLog = auditLogs.find((a) => a.id === options.where.id)
      if (!auditLog) return null

      // Handle select
      if (options?.select) {
        const selected: any = {}
        Object.keys(options.select).forEach((key) => {
          if (options.select[key] && (auditLog as any)[key] !== undefined) {
            selected[key] = (auditLog as any)[key]
          }
        })
        return selected
      }

      return auditLog
    },
    create: async (options: any) => {
      if (!options?.data) throw new Error("Data is required")

      const newAuditLog: AuditLog = {
        id: options.data.id || generateId(),
        action: options.data.action || "",
        userId: options.data.userId,
        entityType: options.data.entityType,
        entityId: options.data.entityId,
        metadata: options.data.metadata,
        createdAt: new Date(),
      }

      auditLogs.push(newAuditLog)
      return newAuditLog
    },
  },
}
