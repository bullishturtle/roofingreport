import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"
import { sendEmail, generateWelcomeEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, address } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !address) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Create Supabase client
    const supabase = createClient()

    // Generate report ID
    const reportId = `RF-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Insert signup data
    const { data, error } = await supabase
      .from("rooffax_signups")
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          address,
          report_id: reportId,
          status: "pending",
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to save signup data" }, { status: 500 })
    }

    // Send welcome email to customer
    try {
      const welcomeEmailHtml = generateWelcomeEmail(firstName, reportId)
      await sendEmail({
        to: email,
        subject: "Welcome to RoofFax - Account Created Successfully",
        html: welcomeEmailHtml,
      })
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError)
      // Don't fail the signup if email fails
    }

    // Send notification to team
    try {
      await sendEmail({
        to: "Landon@rooffax.com",
        subject: "New RoofFax Signup",
        html: `
          <h2>New Signup Alert</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>Report ID:</strong> ${reportId}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        `,
      })
    } catch (emailError) {
      console.error("Failed to send team notification:", emailError)
    }

    return NextResponse.json({
      success: true,
      message: "Account created successfully! You will be contacted within 24 hours.",
      reportId: reportId,
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
