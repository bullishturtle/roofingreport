import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function GET(request: NextRequest) {
  try {
    const { data: signups, error } = await supabaseAdmin
      .from("rooffax_signups")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch signups" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      signups: signups || [],
    })
  } catch (error) {
    console.error("Admin signups error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
