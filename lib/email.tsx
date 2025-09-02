// Email service using Resend (you can replace with your preferred service)
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
    console.log("📧 EMAIL SENT:", {
      to,
      from,
      subject,
      html: html.substring(0, 200) + "...",
    })

    // Simulate email sending
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
          <p>Your roof protection journey starts now</p>
        </div>
        
        <div class="content">
          <h2>🎉 Your Free Roof Report is Being Generated</h2>
          
          <p>Thank you for choosing RoofFax to protect your home. We're already working on your comprehensive roof analysis.</p>
          
          <div class="report-id">
            <strong>Your Report ID:</strong> ${reportId}
          </div>
          
          <h3>What happens next:</h3>
          <ul>
            <li><strong>Next 2 hours:</strong> AI satellite analysis of your property</li>
            <li><strong>Next 6 hours:</strong> Storm history cross-reference</li>
            <li><strong>Next 12 hours:</strong> Expert review and insights</li>
            <li><strong>Within 24 hours:</strong> Complete report delivered to your inbox</li>
          </ul>
          
          <h3>🛡️ You're Already Protected</h3>
          <p>While we prepare your report, you can use our contractor verification tool if anyone comes to your door:</p>
          
          <a href="https://rooffax.com/verify" class="button">Verify Any Contractor →</a>
          
          <h3>Questions?</h3>
          <p>Call us anytime at <strong>(850) 879-9172</strong> or reply to this email.</p>
          
          <p>We're here to protect your home and your wallet.</p>
          
          <p>Best regards,<br>
          <strong>The RoofFax Team</strong></p>
        </div>
        
        <div class="footer">
          <p>Powered by RoofFax™ | All rights reserved © 2025</p>
          <p>Email: Landon@rooffax.com | Phone: (850) 879-9172</p>
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
                  : "Check your email for your free roof report within 2 hours."
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
              <li>Free roof report while you wait</li>
              <li>Avoid door-to-door contractors until we inspect</li>
            `
                  : `
              <li>Free AI roof report within 2 hours</li>
              <li>Review findings and recommendations</li>
              <li>Use our contractor verification for any visitors</li>
              <li>Call us with any questions</li>
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
          <p>Email: Landon@rooffax.com | Phone: (850) 879-9172</p>
        </div>
      </div>
    </body>
    </html>
  `
}
