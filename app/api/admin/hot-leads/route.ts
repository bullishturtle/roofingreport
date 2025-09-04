import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function GET(request: NextRequest) {
  try {
    const { data: hotLeads, error } = await supabaseAdmin
      .from("hot_leads")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch hot leads" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      hotLeads: hotLeads || [],
    })
  } catch (error) {
    console.error("Admin hot leads error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
