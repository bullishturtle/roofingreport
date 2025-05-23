import { type NextRequest, NextResponse } from "next/server"
import { simpleDb } from "@/lib/simple-db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const propertyId = searchParams.get("propertyId")

    const reports = await simpleDb.report.findMany({
      where: propertyId ? { propertyId } : undefined,
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(reports)
  } catch (error) {
    console.error("Failed to fetch reports:", error)
    return NextResponse.json({ error: "Failed to fetch reports" }, { status: 500 })
  }
}
