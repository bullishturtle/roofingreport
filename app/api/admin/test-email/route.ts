import { type NextRequest, NextResponse } from "next/server"
import { sendEmail } from "@/lib/email"
import {
  getReportEmailTemplate,
  getVerificationEmailTemplate,
  getPasswordResetEmailTemplate,
  getWelcomeEmailTemplate,
} from "@/lib/email-templates"

// Sample data for testing email templates
const sampleData = {
  report: {
    recipientName: "John Smith",
    address: "123 Main St, Anytown, CA 12345",
    roofAge: 12,
    roofType: "Asphalt Shingle",
    roofCondition: "Good",
    estimatedLife: 8,
    issues: [
      { severity: "low", description: "Minor granule loss on south-facing slope" },
      { severity: "medium", description: "Some flashing deterioration around chimney" },
      { severity: "low", description: "Small area of moss growth on north side" },
    ],
    recommendations: [
      "Schedule inspection in 2 years",
      "Monitor chimney flashing for further deterioration",
      "Consider cleaning moss with appropriate roof cleaner",
    ],
    message: "Here's your roof report as requested. Please let me know if you have any questions!",
    reportUrl: "https://rooffax.report/report/sample-id",
  },
  verification: {
    userName: "Jane Doe",
    verificationLink: "https://rooffax.report/verify-email?token=sample-token",
  },
  passwordReset: {
    userName: "Robert Johnson",
    resetLink: "https://rooffax.report/reset-password?token=sample-token",
  },
  welcome: {
    userName: "Sarah Williams",
    verificationLink: "https://rooffax.report/verify-email?token=sample-token",
  },
}

export async function POST(request: NextRequest) {
  try {
    const { email, templateType } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email address is required" }, { status: 400 })
    }

    let subject = "Test Email"
    let html = ""

    // Get the appropriate template
    switch (templateType) {
      case "report":
        subject = "TEST: RoofFax Report for 123 Main St"
        html = getReportEmailTemplate(sampleData.report)
        break
      case "verification":
        subject = "TEST: Verify Your RoofFax Email"
        html = getVerificationEmailTemplate(sampleData.verification.userName, sampleData.verification.verificationLink)
        break
      case "passwordReset":
        subject = "TEST: Reset Your RoofFax Password"
        html = getPasswordResetEmailTemplate(sampleData.passwordReset.userName, sampleData.passwordReset.resetLink)
        break
      case "welcome":
        subject = "TEST: Welcome to RoofFax"
        html = getWelcomeEmailTemplate(sampleData.welcome.userName, sampleData.welcome.verificationLink)
        break
      default:
        return NextResponse.json({ error: "Invalid template type" }, { status: 400 })
    }

    // Send the test email
    await sendEmail({
      to: email,
      subject,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending test email:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to send test email",
      },
      { status: 500 },
    )
  }
}
