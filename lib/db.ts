import { neon } from "@neondatabase/serverless"

// Create a SQL client with the database URL from environment variables
const sql = neon(process.env.DATABASE_URL!)

// Add logging in development mode
const executeQuery = async (query: string, params: any[] = []) => {
  try {
    if (process.env.NODE_ENV !== "production") {
      console.log("🔍 Executing SQL query:", query)
      if (params.length > 0) {
        console.log("With params:", params)
      }
    }

    const result = await sql(query, params)

    if (process.env.NODE_ENV !== "production") {
      console.log("✅ Query result:", result)
    }

    return result
  } catch (error) {
    console.error("❌ Database query error:", error)
    throw error
  }
}

export default sql
