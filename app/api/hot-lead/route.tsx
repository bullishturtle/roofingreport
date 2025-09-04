import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"
import { sendEmail, generateHotLeadEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const {
      fullName,
      phone,
      email,
      address,
      urgency,
      interestedIn,
      damageDescription,
      insuranceClaim,
      contractorContact,
    } = await request.json()

    // Validate required fields
    if (!fullName || !phone || !email || !address || !urgency) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 })
    }

    // Determine priority based on urgency and other factors
    let priority = "LOW"
    let action = "Free Roof Report"

    if (urgency === "high") {
      priority = "HIGH"
      action = "Emergency Response"
    } else if (urgency === "medium" || insuranceClaim || contractorContact) {
      priority = "MEDIUM"
      action = "Priority Inspection"
    }

    // Generate lead ID
    const leadId = `HL-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Save to database
    const { data, error } = await supabaseAdmin
      .from("hot_leads")
      .insert([
        {
          full_name: fullName,
          phone: phone,
          email: email,
          address: address,
          urgency: urgency,
          priority: priority,
          interested_in: interestedIn,
          damage_description: damageDescription,
          insurance_claim: insuranceClaim,
          contractor_contact: contractorContact,
          lead_id: leadId,
          status: "new",
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to save lead" }, { status: 500 })
    }

    // Send confirmation email to customer
    try {
      await sendEmail({
        to: email,
        subject: `RoofFax - ${action} Confirmed`,
        html: generateHotLeadEmail(fullName, priority, action, leadId),
      })
    } catch (emailError) {
      console.error("Email error:", emailError)
      // Don't fail the request if email fails
    }

    // Send notification email to team (in production, replace with your team email)
    try {
      await sendEmail({
        to: "Landon@rooffax.com",
        subject: `🔥 New ${priority} Priority Lead - ${fullName}`,
        html: `
          <h2>New Hot Lead Alert</h2>
          <p><strong>Priority:</strong> ${priority}</p>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>Urgency:</strong> ${urgency}</p>
          <p><strong>Services:</strong> ${interestedIn.join(", ")}</p>
          <p><strong>Description:</strong> ${damageDescription}</p>
          <p><strong>Insurance Claim:</strong> ${insuranceClaim ? "Yes" : "No"}</p>
          <p><strong>Contractor Contact:</strong> ${contractorContact ? "Yes" : "No"}</p>
          <p><strong>Lead ID:</strong> ${leadId}</p>
        `,
      })
    } catch (emailError) {
      console.error("Team notification email error:", emailError)
    }

    return NextResponse.json({
      success: true,
      leadId: leadId,
      priority: priority,
      action: action,
      message: "Lead submitted successfully!",
    })
  } catch (error) {
    console.error("Hot lead error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
