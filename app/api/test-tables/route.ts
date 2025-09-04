import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    // Create Supabase client
    const supabase = createClient()

    const requiredTables = ["rooffax_signups", "hot_leads", "contractor_verifications"]
    const existingTables = []

    // Test each table
    for (const table of requiredTables) {
      try {
        const { error } = await supabase.from(table).select("*").limit(1)
        if (!error) {
          existingTables.push(table)
        }
      } catch (tableError) {
        console.error(`Table ${table} test failed:`, tableError)
      }
    }

    if (existingTables.length === requiredTables.length) {
      return NextResponse.json({
        success: true,
        message: "All required tables exist",
        tables: existingTables,
      })
    } else {
      const missingTables = requiredTables.filter((table) => !existingTables.includes(table))
      return NextResponse.json({
        success: false,
        error: `Missing tables: ${missingTables.join(", ")}`,
        existingTables,
        missingTables,
      })
    }
  } catch (error) {
    console.error("Table check error:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
