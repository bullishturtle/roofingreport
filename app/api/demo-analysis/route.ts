import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function POST(request: NextRequest) {
  try {
    const { address, userEmail } = await request.json()

    // Log the demo analysis request
    await supabaseAdmin.from("demo_analyses").insert([
      {
        address: address || "Demo Property",
        user_email: userEmail || null,
        analyzed_at: new Date().toISOString(),
      },
    ])

    // Generate realistic demo results based on address if provided
    const generateDemoResults = (propertyAddress?: string) => {
      const damageTypes = [
        { type: "Missing Shingles", severity: "High", description: "Multiple shingles missing on south-facing slope" },
        {
          type: "Gutter Damage",
          severity: "Medium",
          description: "Separation at corner joints, potential water damage",
        },
        { type: "Flashing Issues", severity: "Medium", description: "Chimney flashing shows signs of weathering" },
        { type: "Granule Loss", severity: "Low", description: "Normal aging pattern detected on asphalt shingles" },
        { type: "Debris Accumulation", severity: "Low", description: "Leaves and debris in gutters and valleys" },
      ]

      // Select 2-4 random damage types
      const selectedDamage = damageTypes.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 2)

      const stormEvents = [
        "Hurricane Sally (September 2020)",
        "Severe Thunderstorm (June 2023)",
        "Hail Storm (March 2024)",
        "High Wind Event (August 2023)",
      ]

      const recentStorm = stormEvents[Math.floor(Math.random() * stormEvents.length)]

      return {
        propertyAddress: propertyAddress || "123 Demo Street, Pensacola, FL 32501",
        analysisDate: new Date().toLocaleDateString(),
        roofAge: Math.floor(Math.random() * 20) + 5,
        roofMaterial: "Asphalt Shingles",
        lastStormEvent: recentStorm,
        damageFindings: selectedDamage,
        overallCondition: Math.random() > 0.6 ? "Needs Attention" : "Fair",
        insuranceRecommendation: Math.random() > 0.5 ? "Claim Recommended" : "Monitor Condition",
        estimatedRepairCost: `$${(Math.floor(Math.random() * 8000) + 2000).toLocaleString()}`,
        urgencyLevel: Math.random() > 0.7 ? "High" : "Medium",
      }
    }

    const analysisResults = generateDemoResults(address)

    return NextResponse.json({
      success: true,
      analysis: analysisResults,
      message: "Demo analysis complete. Sign up for your actual property report with full contractor protection.",
    })
  } catch (error) {
    console.error("Demo analysis error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
