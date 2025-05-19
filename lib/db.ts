import { neon, neonConfig } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

// Configure Neon to use WebSocket for better performance
neonConfig.fetchConnectionCache = true

// Create a database client using the Neon serverless driver
const sql = neon(process.env.DATABASE_URL!)

// Create a Drizzle ORM instance
export const db = drizzle(sql)

// Export the SQL client for raw queries
export { sql }

// Helper function to execute a raw SQL query
export async function executeQuery(query: string, params: any[] = []) {
  try {
    return await sql(query, params)
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

// Helper function to check database connection
export async function checkDatabaseConnection() {
  try {
    const result = await sql`SELECT 1 as connection_test`
    return result[0].connection_test === 1
  } catch (error) {
    console.error("Database connection error:", error)
    return false
  }
}
