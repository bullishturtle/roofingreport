import { neon } from "@neondatabase/serverless"

// Create a SQL client with the database URL from environment variables
const sql = neon(process.env.DATABASE_URL || "")

export default sql
