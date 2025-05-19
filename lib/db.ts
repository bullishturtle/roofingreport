import { neon, neonConfig } from "@neondatabase/serverless"
import { Pool } from "@neondatabase/serverless"

// Configure neon to use WebSockets in edge environments
neonConfig.fetchConnectionCache = true

// Get database URL from environment variables
const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

// Create a SQL query executor using neon
export const sql = neon(DATABASE_URL)

// Create a connection pool for more complex operations
let pool: Pool

export function getPool() {
  if (!pool) {
    pool = new Pool({ connectionString: DATABASE_URL })
  }
  return pool
}

// Helper function to execute queries with better error handling and logging
export async function executeQuery(queryText: string, params: any[] = []) {
  try {
    console.log(`Executing query: ${queryText.slice(0, 100)}${queryText.length > 100 ? "..." : ""}`)
    const start = Date.now()
    const result = await sql(queryText, params)
    const duration = Date.now() - start
    console.log(`Query executed in ${duration}ms`)
    return result
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

// Export sql as default for compatibility with existing code
export default sql
