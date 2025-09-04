import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"
import { sendEmail, generateWelcomeEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone, address } = await request.json()

    // Validate required fields
    if (!firstName || !lastName || !email || !address) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Generate report ID
    const reportId = `RF-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Save to database
    const { data, error } = await supabaseAdmin
      .from("signups")
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone || null,
          address: address,
          report_id: reportId,
          status: "pending_verification",
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to save signup" }, { status: 500 })
    }

    // Send welcome email
    try {
      await sendEmail({
        to: email,
        subject: "Welcome to RoofFax - Account Verification Required",
        html: generateWelcomeEmail(firstName, reportId),
      })
    } catch (emailError) {
      console.error("Email error:", emailError)
      // Don't fail the request if email fails
    }

    // Send notification to team
    try {
      await sendEmail({
        to: "landongill@gmail.com",
        subject: `New RoofFax Signup - ${firstName} ${lastName}`,
        html: `
          <h2>New RoofFax Account Created</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>Account ID:</strong> ${reportId}</p>
          <p><strong>Status:</strong> Pending Verification</p>
          <p><strong>Action Required:</strong> Call customer within 24 hours to verify and activate account.</p>
        `,
      })
    } catch (emailError) {
      console.error("Team notification email error:", emailError)
    }

    return NextResponse.json({
      success: true,
      reportId: reportId,
      message: "Account created successfully! We'll contact you within 24 hours.",
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
