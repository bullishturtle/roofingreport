import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

interface ContractorData {
  name: string
  riskLevel: "LOW" | "MEDIUM" | "HIGH"
  riskScore: number
  licenseStatus: string
  businessAge: string
  bbbRating: string
  complaints: number
  address: string
  phone: string
  redFlags: string[]
  greenFlags: string[]
  recommendation: string
  description: string
}

const contractorDatabase: Record<string, ContractorData> = {
  "storm chasers": {
    name: "Storm Chasers Roofing LLC",
    riskLevel: "HIGH",
    riskScore: 85,
    licenseStatus: "No Local License Found",
    businessAge: "2 months",
    bbbRating: "F",
    complaints: 5,
    address: "Out of State Address",
    phone: "(555) 123-SCAM",
    redFlags: [
      "No local contractor license",
      "Company incorporated only 2 months ago",
      "5 unresolved BBB complaints",
      "No local business address",
      "High-pressure sales tactics reported",
      "Demands payment upfront",
    ],
    greenFlags: [],
    recommendation: "AVOID - High Risk",
    description: "Classic storm chaser operation with multiple red flags",
  },
  "quality roofing": {
    name: "Quality Roofing Solutions Inc",
    riskLevel: "LOW",
    riskScore: 15,
    licenseStatus: "Licensed & Insured",
    businessAge: "12 years",
    bbbRating: "A+",
    complaints: 0,
    address: "Local Business Address",
    phone: "(850) 555-ROOF",
    redFlags: [],
    greenFlags: [
      "Fully licensed and insured",
      "12+ years in business",
      "A+ BBB rating",
      "Zero unresolved complaints",
      "Local business with physical address",
      "Excellent customer reviews",
    ],
    recommendation: "RECOMMENDED - Low Risk",
    description: "Established local contractor with excellent track record",
  },
  "abc roofing": {
    name: "ABC Roofing & Construction",
    riskLevel: "MEDIUM",
    riskScore: 45,
    licenseStatus: "Licensed (Expires Soon)",
    businessAge: "3 years",
    bbbRating: "B-",
    complaints: 2,
    address: "Local Address",
    phone: "(850) 555-0123",
    redFlags: ["License expires in 30 days", "2 recent complaints about delays", "Mixed customer reviews"],
    greenFlags: ["Currently licensed", "Local business", "3 years experience", "Responds to complaints"],
    recommendation: "PROCEED WITH CAUTION",
    description: "Legitimate contractor but with some concerns to address",
  },
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { contractorName } = body

    if (!contractorName || contractorName.trim().length < 2) {
      return NextResponse.json({ error: "Contractor name is required" }, { status: 400 })
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Find matching contractor data
    const searchKey = contractorName.toLowerCase()
    let foundData = null

    for (const [key, data] of Object.entries(contractorDatabase)) {
      if (searchKey.includes(key) || key.includes(searchKey)) {
        foundData = data
        break
      }
    }

    // Default to storm chasers if no match found
    if (!foundData) {
      foundData = contractorDatabase["storm chasers"]
    }

    // Get user IP for tracking
    const userIP = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

    // Save verification to Supabase
    const { data, error } = await supabase
      .from("contractor_verifications")
      .insert([
        {
          contractor_name: contractorName.trim(),
          user_ip: userIP,
          result_data: foundData,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      // Don't fail the request if database save fails
    }

    console.log("✅ Contractor verification saved:", {
      id: data?.id,
      contractorName,
      riskLevel: foundData.riskLevel,
      userIP,
    })

    return NextResponse.json({
      success: true,
      data: foundData,
    })
  } catch (error) {
    console.error("Contractor verification error:", error)
    return NextResponse.json({ error: "Verification service temporarily unavailable" }, { status: 500 })
  }
}
