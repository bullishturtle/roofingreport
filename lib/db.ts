/**
 * This is a compatibility layer to support existing imports
 * while avoiding Prisma browser bundling issues.
 */

// Import the simple database implementation
import { simpleDb } from "./simple-db"

// Create a prisma-like object that uses the simple database
export const prisma = simpleDb

// Also export as default for modules that use default import
export default prisma
