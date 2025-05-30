/**
 * Database Backup System
 * Stores deleted code for restoration if needed
 */

// BACKUP: Original Prisma Schema (DELETED)
export const PRISMA_SCHEMA_BACKUP = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      String   @default("user")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  auditLogs AuditLog[]
  
  @@map("users")
}

model AuditLog {
  id        String   @id @default(cuid())
  action    String
  userId    String?
  details   String
  timestamp DateTime @default(now())
  
  user User? @relation(fields: [userId], references: [id])
  
  @@map("audit_logs")
}

model Property {
  id             String    @id @default(cuid())
  address        String
  city           String
  state          String
  zipCode        String
  roofAge        Int?
  roofMaterial   String?
  lastInspection DateTime?
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
  
  reports Report[]
  
  @@map("properties")
}

model Report {
  id         String   @id @default(cuid())
  propertyId String
  type       String
  status     String
  findings   String
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  
  property Property @relation(fields: [propertyId], references: [id])
  
  @@map("reports")
}
`

// BACKUP: Original Prisma Client (DELETED)
export const PRISMA_CLIENT_BACKUP = `
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
`

// BACKUP: Original Auth Configuration (MODIFIED)
export const AUTH_PRISMA_BACKUP = `
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

// This was removed and replaced with JWT strategy
adapter: PrismaAdapter(prisma),
`

/**
 * Restoration Functions
 * Use these if you need to restore Prisma functionality
 */
export const restorePrismaSchema = () => PRISMA_SCHEMA_BACKUP
export const restorePrismaClient = () => PRISMA_CLIENT_BACKUP
export const restoreAuthPrisma = () => AUTH_PRISMA_BACKUP
