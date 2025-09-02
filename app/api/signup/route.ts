import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { sendEmail, generateWelcomeEmail } from "@/lib/email"
import type { RoofFaxSignup } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, address } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !address) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Phone validation
    const cleanPhone = phone.replace(/\D/g, "")
    if (cleanPhone.length < 10) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 })
    }

    const reportId = `RFX-${Date.now()}`

    // Save to Supabase
    const signupData: RoofFaxSignup = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone: cleanPhone,
      address,
      report_id: reportId,
      status: "pending",
    }

    const { data, error } = await supabase.from("rooffax_signups").insert([signupData]).select().single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to save signup" }, { status: 500 })
    }

    // Send welcome email
    const emailResult = await sendEmail({
      to: email,
      subject: `Welcome to RoofFax, ${firstName}! Your Report ID: ${reportId}`,
      html: generateWelcomeEmail(firstName, reportId),
    })

    if (!emailResult.success) {
      console.error("Email sending failed:", emailResult.error)
      // Don't fail the request if email fails, but log it
    }

    console.log("✅ New RoofFax signup saved:", {
      id: data.id,
      reportId,
      email,
      emailSent: emailResult.success,
    })

    return NextResponse.json({
      success: true,
      message: "Successfully signed up! Check your email for next steps.",
      data: {
        firstName,
        lastName,
        email,
        reportId,
        estimatedCompletion: "24 hours",
      },
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
