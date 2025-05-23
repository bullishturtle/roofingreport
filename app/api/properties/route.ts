import { type NextRequest, NextResponse } from "next/server"
import { simpleDb } from "@/lib/simple-db"

export async function GET(request: NextRequest) {
  try {
    const properties = await simpleDb.property.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(properties)
  } catch (error) {
    console.error("Failed to fetch properties:", error)
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 })
  }
}
