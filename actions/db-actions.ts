"use server"

import { initializeDatabase, seedDatabase } from "@/lib/db-schema"

export async function setupDatabase() {
  try {
    await initializeDatabase()
    await seedDatabase()
    return { success: true, message: "Database setup completed successfully" }
  } catch (error) {
    console.error("Database setup error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown database setup error",
    }
  }
}
