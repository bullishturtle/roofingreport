import {
  getReportEmailTemplate,
  getVerificationEmailTemplate,
  getPasswordResetEmailTemplate,
  getWelcomeEmailTemplate,
} from "./email-templates"
import { sendEmail } from "./email"

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

// Get all email templates with sample data
export function getAllTemplates() {
  return {
    report: getReportEmailTemplate(sampleData.report),
    verification: getVerificationEmailTemplate(
      sampleData.verification.userName,
      sampleData.verification.verificationLink,
    ),
    passwordReset: getPasswordResetEmailTemplate(sampleData.passwordReset.userName, sampleData.passwordReset.resetLink),
    welcome: getWelcomeEmailTemplate(sampleData.welcome.userName, sampleData.welcome.verificationLink),
  }
}

// Send test emails to verify rendering in actual email clients
export async function sendTestEmails(testEmail: string) {
  const templates = getAllTemplates()
  const results = {
    report: { success: false, error: "" },
    verification: { success: false, error: "" },
    passwordReset: { success: false, error: "" },
    welcome: { success: false, error: "" },
  }

  try {
    // Send report email
    await sendEmail({
      to: testEmail,
      subject: "TEST: RoofFax Report for 123 Main St",
      html: templates.report,
    })
    results.report.success = true
  } catch (error) {
    results.report.error = error instanceof Error ? error.message : "Unknown error"
  }

  try {
    // Send verification email
    await sendEmail({
      to: testEmail,
      subject: "TEST: Verify Your RoofFax Email",
      html: templates.verification,
    })
    results.verification.success = true
  } catch (error) {
    results.verification.error = error instanceof Error ? error.message : "Unknown error"
  }

  try {
    // Send password reset email
    await sendEmail({
      to: testEmail,
      subject: "TEST: Reset Your RoofFax Password",
      html: templates.passwordReset,
    })
    results.passwordReset.success = true
  } catch (error) {
    results.passwordReset.error = error instanceof Error ? error.message : "Unknown error"
  }

  try {
    // Send welcome email
    await sendEmail({
      to: testEmail,
      subject: "TEST: Welcome to RoofFax",
      html: templates.welcome,
    })
    results.welcome.success = true
  } catch (error) {
    results.welcome.error = error instanceof Error ? error.message : "Unknown error"
  }

  return results
}

// Validate email templates for common issues
export function validateTemplates() {
  const templates = getAllTemplates()
  const results = {
    report: { valid: true, issues: [] as string[] },
    verification: { valid: true, issues: [] as string[] },
    passwordReset: { valid: true, issues: [] as string[] },
    welcome: { valid: true, issues: [] as string[] },
  }

  // Check each template for common issues
  for (const [name, html] of Object.entries(templates)) {
    const issues = []
    const result = results[name as keyof typeof results]

    // Check for missing closing tags
    const openTags = (html.match(/<[a-z][^>]*>/gi) || []).filter((tag) => !tag.includes("/>"))
    const closeTags = html.match(/<\/[a-z][^>]*>/gi) || []
    if (openTags.length !== closeTags.length) {
      issues.push("Mismatched HTML tags")
    }

    // Check for broken links
    if (html.includes('href="#"') || html.includes('href=""')) {
      issues.push("Empty or placeholder links found")
    }

    // Check for missing alt text on images
    const imgTags = html.match(/<img[^>]*>/gi) || []
    for (const img of imgTags) {
      if (!img.includes('alt="')) {
        issues.push("Image missing alt text")
        break
      }
    }

    // Check for inline styles (good for email but should be consistent)
    if (!html.includes("style=")) {
      issues.push("No inline styles found (required for email clients)")
    }

    // Check for mobile responsiveness indicators
    if (!html.includes('media="screen') && !html.includes("@media")) {
      issues.push("No media queries found for responsive design")
    }

    // Update results
    result.issues = issues
    result.valid = issues.length === 0
  }

  return results
}
