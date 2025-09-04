import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { address, analysisType } = await request.json()

    if (!address) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 })
    }

    // Create Supabase client
    const supabase = createClient()

    // Generate realistic demo analysis based on address
    const generateDemoAnalysis = (propertyAddress: string) => {
      const analysisId = `DEMO-${Date.now()}`

      // Generate property-specific findings
      const findings = [
        {
          category: "Roof Structure",
          status: Math.random() > 0.7 ? "warning" : "good",
          score: Math.floor(Math.random() * 30) + 70,
          description: "Overall structural integrity assessment",
          details: "Satellite imagery analysis shows roof framework condition",
        },
        {
          category: "Shingle Condition",
          status: Math.random() > 0.5 ? "warning" : "good",
          score: Math.floor(Math.random() * 40) + 60,
          description: "Surface material condition evaluation",
          details: "AI detection of potential shingle displacement or damage",
        },
        {
          category: "Storm Impact",
          status: Math.random() > 0.6 ? "alert" : "warning",
          score: Math.floor(Math.random() * 50) + 40,
          description: "Historical weather event analysis",
          details: "Cross-reference with recent storm patterns in your area",
        },
        {
          category: "Gutter System",
          status: Math.random() > 0.4 ? "warning" : "alert",
          score: Math.floor(Math.random() * 35) + 45,
          description: "Drainage system evaluation",
          details: "Potential debris accumulation and water flow concerns",
        },
      ]

      return {
        analysisId,
        propertyAddress,
        analysisDate: new Date().toISOString().split("T")[0],
        overallScore: Math.floor(findings.reduce((sum, f) => sum + f.score, 0) / findings.length),
        findings,
        recommendations: [
          "Professional inspection recommended within 30 days",
          "Document any visible damage with photographs",
          "Contact insurance company for potential claim assessment",
          "Monitor for interior signs of water damage",
          "Schedule gutter cleaning and maintenance",
        ],
        nextSteps: [
          "Complete RoofFax signup for detailed report",
          "Schedule professional contractor inspection",
          "Review insurance policy coverage options",
          "Get multiple quotes from verified contractors",
        ],
      }
    }

    const analysis = generateDemoAnalysis(address)

    // Log demo usage to database
    try {
      await supabase.from("demo_analyses").insert({
        analysis_id: analysis.analysisId,
        property_address: address,
        analysis_type: analysisType || "demo",
        overall_score: analysis.overallScore,
        findings: analysis.findings,
        created_at: new Date().toISOString(),
      })
    } catch (dbError) {
      console.error("Database logging error:", dbError)
      // Continue even if logging fails
    }

    return NextResponse.json({
      success: true,
      analysis,
    })
  } catch (error) {
    console.error("Demo analysis error:", error)
    return NextResponse.json({ error: "Failed to generate analysis" }, { status: 500 })
  }
}
