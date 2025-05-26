/**
 * Database client - uses simple in-memory database
 * This replaces Prisma for a lightweight solution
 */

import { simpleDb } from "./simple-db"

// Export the simple database as the default database client
export default simpleDb

// Also export it as prisma for compatibility with existing code
export const prisma = simpleDb

// Export types for TypeScript
export type { User, AuditLog, Property, Report } from "./simple-db"
