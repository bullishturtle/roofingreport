import { neon } from "@neondatabase/serverless"

// Create a SQL client with the database URL
const sql = neon(process.env.DATABASE_URL!)

export default sql
