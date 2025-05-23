// Safe database utility that handles missing Prisma gracefully
export async function getSafeDbClient() {
  try {
    // Check if DATABASE_URL is available
    if (!process.env.DATABASE_URL) {
      console.warn("DATABASE_URL not found, database operations will be mocked")
      return null
    }

    // Dynamic import to avoid build-time issues
    const { PrismaClient } = await import("@prisma/client")
    const prisma = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    })

    // Test the connection
    await prisma.$connect()
    return prisma
  } catch (error) {
    console.error("Failed to connect to database:", error)
    return null
  }
}

// Mock database operations for when real DB is not available
export const mockDbOperations = {
  auditLog: {
    create: async (data: any) => {
      console.log("MOCK DB: Creating audit log:", data)
      return { id: "mock-id", ...data.data }
    },
    findMany: async (query: any) => {
      console.log("MOCK DB: Finding audit logs:", query)
      return []
    },
    count: async (query: any) => {
      console.log("MOCK DB: Counting audit logs:", query)
      return 0
    },
    deleteMany: async (query: any) => {
      console.log("MOCK DB: Deleting audit logs:", query)
      return { count: 0 }
    },
  },
}
