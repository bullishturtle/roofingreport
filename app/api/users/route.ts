import { type NextRequest, NextResponse } from "next/server"
import { simpleDb } from "@/lib/simple-db"

export async function GET(request: NextRequest) {
  try {
    const users = await simpleDb.user.findMany()
    return NextResponse.json(users)
  } catch (error) {
    console.error("Failed to fetch users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
