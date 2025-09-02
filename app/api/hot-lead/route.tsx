import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { sendEmail, generateHotLeadEmail } from "@/lib/email"
import type { HotLead } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      fullName,
      phone,
      email,
      address,
      hasDamage,
      damageType,
      urgency,
      hasInsurance,
      hadInspection,
      suggestedWork,
      contactMethod,
      bestTime,
      interestedIn,
      additionalConcerns,
      priority,
      action,
    } = body

    // Validate required fields
    if (!fullName || !phone || !email || !address) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 })
    }

    const leadId = `LEAD-${Date.now()}`
    const cleanPhone = phone.replace(/\D/g, "")

    // Save to Supabase
    const leadData: HotLead = {
      full_name: fullName,
      phone: cleanPhone,
      email,
      address,
      has_damage: hasDamage === "yes",
      damage_type: damageType || [],
      urgency: urgency || undefined,
      has_insurance: hasInsurance || undefined,
      had_inspection: hadInspection === "yes",
      suggested_work: suggestedWork || undefined,
      contact_method: contactMethod,
      best_time: bestTime,
      interested_in: interestedIn,
      additional_concerns: additionalConcerns || undefined,
      priority,
      action,
      status: "new",
    }

    const { data, error } = await supabase.from("hot_leads").insert([leadData]).select().single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to save lead" }, { status: 500 })
    }

    // Send confirmation email
    const emailResult = await sendEmail({
      to: email,
      subject: `Thank you ${fullName.split(" ")[0]} - RoofFax Team Response: ${priority} Priority`,
      html: generateHotLeadEmail(fullName, priority, action, leadId),
    })

    // Send internal notification for high priority leads
    if (priority === "HIGH") {
      console.log("🚨 URGENT LEAD ALERT - Immediate action required!")
      console.log(`Contact ${fullName} at ${phone} ASAP - ${urgency} damage reported`)

      // Send urgent notification email to team
      await sendEmail({
        to: "Landon@rooffax.com",
        subject: `🚨 URGENT LEAD: ${fullName} - ${urgency} damage`,
        html: `
          <h2>🚨 URGENT LEAD REQUIRES IMMEDIATE ATTENTION</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>Damage:</strong> ${damageType?.join(", ")}</p>
          <p><strong>Urgency:</strong> ${urgency}</p>
          <p><strong>Contact Method:</strong> ${contactMethod}</p>
          <p><strong>Best Time:</strong> ${bestTime}</p>
          <p><strong>Lead ID:</strong> ${leadId}</p>
          <p><strong>Database ID:</strong> ${data.id}</p>
          
          <h3>ACTION REQUIRED: Call within 15 minutes!</h3>
        `,
      })
    }

    console.log(`🔥 ${priority} PRIORITY LEAD SAVED:`, {
      id: data.id,
      leadId,
      fullName,
      priority,
      action,
      emailSent: emailResult.success,
    })

    return NextResponse.json({
      success: true,
      leadId,
      priority,
      action,
      message: "Lead submitted successfully",
    })
  } catch (error) {
    console.error("Hot lead submission error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
