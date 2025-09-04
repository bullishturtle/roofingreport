import type { ReactElement } from "react"

// Email service - Replace with your preferred service (Resend, SendGrid, etc.)
interface EmailData {
  to: string
  subject: string
  html: string
  from?: string
}

export async function sendEmail({ to, subject, html, from = "RoofFax <noreply@rooffax.com>" }: EmailData) {
  try {
    // For now, we'll log the email content
    // Replace this with your actual email service (Resend, SendGrid, etc.)
    console.log("📧 EMAIL WOULD BE SENT:", {
      to,
      from,
      subject,
      html: html.substring(0, 200) + "...",
    })

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return { success: true }
  } catch (error) {
    console.error("Email sending failed:", error)
    return { success: false, error }
  }
}

export function generateWelcomeEmail(firstName: string, reportId: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Welcome to RoofFax</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #050714, #0a1128); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .logo { background: #FFD700; color: black; width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-bottom: 10px; }
        .content { background: white; padding: 30px; border: 1px solid #ddd; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px; color: #666; }
        .button { background: #FFD700; color: black; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin: 20px 0; }
        .report-id { background: #f8f9fa; padding: 15px; border-left: 4px solid #FFD700; margin: 20px 0; font-family: monospace; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">R</div>
          <h1>Welcome to RoofFax, ${firstName}!</h1>
          <p>Your account has been created successfully</p>
        </div>
        
        <div class="content">
          <h2>🎉 Account Created - Verification Required</h2>
          
          <p>Thank you for choosing RoofFax to protect your home. Your account has been created and our team will contact you within 24 hours to verify your information and activate your full protection.</p>
          
          <div class="report-id">
            <strong>Your Account ID:</strong> ${reportId}
          </div>
          
          <h3>What happens next:</h3>
          <ul>
            <li><strong>Within 24 hours:</strong> A RoofFax representative will call to verify your information</li>
            <li><strong>After verification:</strong> Your full RoofFax protection will be activated</li>
            <li><strong>Complete access:</strong> Contractor verification tools and roof reports will be available</li>
            <li><strong>Ongoing protection:</strong> We'll monitor your property and alert you to any concerns</li>
          </ul>
          
          <h3>🛡️ You're Already Protected</h3>
          <p>While we prepare your account, you can use our basic contractor verification tool if anyone comes to your door.</p>
          
          <a href="https://rooffax.com/verify" class="button">Verify Any Contractor →</a>
          
          <h3>Questions?</h3>
          <p>Call us anytime at <strong>(850) 879-9172</strong> or reply to this email at landongill@gmail.com</p>
          
          <p>We're here to protect your home and your wallet.</p>
          
          <p>Best regards,<br>
          <strong>The RoofFax Team</strong></p>
        </div>
        
        <div class="footer">
          <p>Powered by RoofFax™ | All rights reserved © 2025</p>
          <p>Email: landongill@gmail.com | Phone: (850) 879-9172</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export function generateHotLeadEmail(fullName: string, priority: string, action: string, leadId: string) {
  const firstName = fullName.split(" ")[0]

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Thank You - RoofFax</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #050714, #0a1128); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .logo { background: #FFD700; color: black; width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-bottom: 10px; }
        .content { background: white; padding: 30px; border: 1px solid #ddd; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px; color: #666; }
        .priority-high { background: #fee2e2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0; }
        .priority-medium { background: #fef3c7; border-left: 4px solid #d97706; padding: 15px; margin: 20px 0; }
        .priority-low { background: #dcfce7; border-left: 4px solid #16a34a; padding: 15px; margin: 20px 0; }
        .lead-id { background: #f8f9fa; padding: 15px; border-left: 4px solid #FFD700; margin: 20px 0; font-family: monospace; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">R</div>
          <h1>Thank You, ${firstName}!</h1>
          <p>We've received your information</p>
        </div>
        
        <div class="content">
          <div class="priority-${priority.toLowerCase()}">
            <h3>${priority === "HIGH" ? "🚨 URGENT" : priority === "MEDIUM" ? "⚡ PRIORITY" : "📊 STANDARD"} - ${action}</h3>
            <p>${
              priority === "HIGH"
                ? "We'll call you within 15 minutes! Keep your phone nearby."
                : priority === "MEDIUM"
                  ? "We'll contact you within 24 hours to schedule your inspection."
                  : "We'll contact you within 24 hours to verify your information and activate your account."
            }</p>
          </div>
          
          <div class="lead-id">
            <strong>Reference ID:</strong> ${leadId}
          </div>
          
          <h3>What to expect:</h3>
          <ul>
            ${
              priority === "HIGH"
                ? `
              <li>Emergency response team will call within 15 minutes</li>
              <li>Take photos of damage if safe to do so</li>
              <li>Don't let any contractors start work until we speak</li>
              <li>We'll coordinate with your insurance if needed</li>
            `
                : priority === "MEDIUM"
                  ? `
              <li>Professional inspection scheduled within 24 hours</li>
              <li>Insurance coordination if damage is confirmed</li>
              <li>Account verification and activation</li>
              <li>Avoid door-to-door contractors until we inspect</li>
            `
                  : `
              <li>Account verification call within 24 hours</li>
              <li>Full RoofFax protection activation</li>
              <li>Access to contractor verification tools</li>
              <li>Ongoing property monitoring and alerts</li>
            `
            }
          </ul>
          
          <h3>Need immediate help?</h3>
          <p>Call us anytime at <strong>(850) 879-9172</strong></p>
          
          <p>We're here to protect your home.</p>
          
          <p>Best regards,<br>
          <strong>The RoofFax Team</strong></p>
        </div>
        
        <div class="footer">
          <p>Powered by RoofFax™ | All rights reserved © 2025</p>
          <p>Email: landongill@gmail.com | Phone: (850) 879-9172</p>
        </div>
      </div>
    </body>
    </html>
  `
}

interface EmailTemplateProps {
  firstName: string
  lastName: string
  reportId: string
  address: string
}

export function WelcomeEmailTemplate({ firstName, lastName, reportId, address }: EmailTemplateProps): ReactElement {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ backgroundColor: "#050714", color: "white", padding: "20px", textAlign: "center" }}>
        <h1 style={{ margin: "0", fontSize: "24px" }}>
          <span style={{ color: "#EAB308" }}>Roof</span>Fax Account Confirmation
        </h1>
      </div>

      <div style={{ padding: "30px", backgroundColor: "#f9f9f9" }}>
        <h2 style={{ color: "#333", marginBottom: "20px" }}>
          Hello {firstName} {lastName},
        </h2>

        <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "20px" }}>
          Thank you for creating your RoofFax account! We're preparing your protection for the property at:
        </p>

        <div
          style={{
            backgroundColor: "#e3f2fd",
            padding: "15px",
            borderRadius: "5px",
            marginBottom: "20px",
            borderLeft: "4px solid #2196f3",
          }}
        >
          <strong style={{ color: "#1976d2" }}>{address}</strong>
        </div>

        <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "20px" }}>
          Your account ID is: <strong style={{ color: "#333" }}>{reportId}</strong>
        </p>

        <div
          style={{
            backgroundColor: "#fff3cd",
            padding: "15px",
            borderRadius: "5px",
            marginBottom: "20px",
            borderLeft: "4px solid #ffc107",
          }}
        >
          <h3 style={{ color: "#856404", margin: "0 0 10px 0" }}>What happens next?</h3>
          <ul style={{ color: "#856404", margin: "0", paddingLeft: "20px" }}>
            <li>A RoofFax representative will call you within 24 hours</li>
            <li>We'll verify your information and activate your account</li>
            <li>You'll gain access to full contractor verification tools</li>
            <li>We'll begin monitoring your property for any concerns</li>
          </ul>
        </div>

        <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "30px" }}>
          Questions? Reply to this email or call us at <strong>(850) 879-9172</strong>
        </p>

        <div style={{ textAlign: "center" }}>
          <a
            href="https://therooffax.com"
            style={{
              backgroundColor: "#EAB308",
              color: "black",
              padding: "12px 24px",
              textDecoration: "none",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          >
            Visit RoofFax
          </a>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#333",
          color: "#ccc",
          padding: "20px",
          textAlign: "center",
          fontSize: "12px",
        }}
      >
        <p style={{ margin: "0" }}>Powered by RoofFax™ | All rights reserved © 2025</p>
        <p style={{ margin: "5px 0 0 0" }}>Email: landongill@gmail.com | Phone: (850) 879-9172</p>
      </div>
    </div>
  )
}

interface HotLeadEmailProps {
  fullName: string
  phone: string
  email: string
  address: string
  urgency: string
  priority: string
  interestedIn: string[]
}

export function HotLeadNotificationTemplate({
  fullName,
  phone,
  email,
  address,
  urgency,
  priority,
  interestedIn,
}: HotLeadEmailProps): ReactElement {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ backgroundColor: "#dc2626", color: "white", padding: "20px", textAlign: "center" }}>
        <h1 style={{ margin: "0", fontSize: "24px" }}>🔥 New Hot Lead Alert</h1>
      </div>

      <div style={{ padding: "30px", backgroundColor: "#f9f9f9" }}>
        <div
          style={{
            backgroundColor: priority === "HIGH" ? "#fee2e2" : priority === "MEDIUM" ? "#fef3c7" : "#d1fae5",
            padding: "15px",
            borderRadius: "5px",
            marginBottom: "20px",
            borderLeft: `4px solid ${priority === "HIGH" ? "#dc2626" : priority === "MEDIUM" ? "#f59e0b" : "#10b981"}`,
          }}
        >
          <h2
            style={{
              color: priority === "HIGH" ? "#991b1b" : priority === "MEDIUM" ? "#92400e" : "#065f46",
              margin: "0 0 10px 0",
            }}
          >
            {priority} Priority Lead - {urgency} urgency
          </h2>
        </div>

        <h3 style={{ color: "#333", marginBottom: "15px" }}>Contact Information:</h3>
        <ul style={{ color: "#666", lineHeight: "1.6", marginBottom: "20px" }}>
          <li>
            <strong>Name:</strong> {fullName}
          </li>
          <li>
            <strong>Phone:</strong> {phone}
          </li>
          <li>
            <strong>Email:</strong> {email}
          </li>
          <li>
            <strong>Address:</strong> {address}
          </li>
        </ul>

        <h3 style={{ color: "#333", marginBottom: "15px" }}>Services Interested In:</h3>
        <ul style={{ color: "#666", lineHeight: "1.6", marginBottom: "20px" }}>
          {interestedIn.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>

        <div
          style={{
            backgroundColor: "#e3f2fd",
            padding: "15px",
            borderRadius: "5px",
            marginBottom: "20px",
            borderLeft: "4px solid #2196f3",
          }}
        >
          <p style={{ color: "#1976d2", margin: "0" }}>
            <strong>Action Required:</strong> Contact this lead immediately based on their {urgency} urgency level.
          </p>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#333",
          color: "#ccc",
          padding: "20px",
          textAlign: "center",
          fontSize: "12px",
        }}
      >
        <p style={{ margin: "0" }}>RoofFax Lead Management System</p>
      </div>
    </div>
  )
}
