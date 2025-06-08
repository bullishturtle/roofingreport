import { PrismaClient } from "@prisma/client"

let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set in production.")
  }
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is not set in development.")
    }
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma
