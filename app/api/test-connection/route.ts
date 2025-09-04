import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    // Create Supabase client
    const supabase = createClient()

    // Test basic connection
    const { data, error } = await supabase.from("rooffax_signups").select("count").limit(1)

    if (error) {
      console.error("Connection test failed:", error)
      return NextResponse.json({
        success: false,
        error: error.message,
        database: "Connection failed",
      })
    }

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      database: "Supabase connected",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Test connection error:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      database: "Connection failed",
    })
  }
}
