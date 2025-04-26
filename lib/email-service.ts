import nodemailer from "nodemailer"
import { Resend } from "resend"

// Initialize Resend if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Fallback to nodemailer if Resend is not available
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST || "smtp.gmail.com",
  port: Number.parseInt(process.env.EMAIL_SERVER_PORT || "587"),
  secure: process.env.EMAIL_SERVER_SECURE === "true",
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

export type EmailData = {
  to: string
  subject: string
  text?: string
  html: string
  from?: string
}

export async function sendEmail(data: EmailData): Promise<{ success: boolean; error?: string }> {
  try {
    const from = data.from || process.env.EMAIL_FROM || "RoofFax <noreply@rooffax.com>"

    // Try to use Resend first
    if (resend) {
      const response = await resend.emails.send({
        from,
        to: data.to,
        subject: data.subject,
        text: data.text || "",
        html: data.html,
      })

      return { success: true }
    }

    // Fall back to nodemailer
    else {
      await transporter.sendMail({
        from,
        to: data.to,
        subject: data.subject,
        text: data.text || "",
        html: data.html,
      })

      return { success: true }
    }
  } catch (error) {
    console.error("Failed to send email:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

export function generateWelcomeEmail(name: string): { subject: string; html: string; text: string } {
  const subject = `Welcome to RoofFax, ${name}!`

  const text = `
    Welcome to RoofFax, ${name}!
    
    We're excited to have you on board. RoofFax is the world's smartest roof and property report platform, designed to help you work smarter, not harder.
    
    Here's what you can do with RoofFax:
    
    • Get instant roof measurements and analysis
    • Track storms and identify damaged properties
    • Find property owner information
    • Create professional proposals in seconds
    • Access Florida building codes and requirements
    
    Your account is now active and ready to use. To get started, simply log in at https://rooffax.com/login with the email address you used to sign up.
    
    If you have any questions or need assistance, our AI assistant Roofus is available 24/7 to help you. You can also reach our support team at support@rooffax.com.
    
    Happy roofing!
    
    The RoofFax Team
  `

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to RoofFax</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f9f9f9;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
        }
        .header {
          text-align: center;
          padding: 20px 0;
          background: linear-gradient(to right, #FFD700, #FF8C00);
        }
        .header img {
          max-width: 150px;
        }
        .content {
          padding: 20px;
        }
        .footer {
          text-align: center;
          padding: 20px;
          font-size: 12px;
          color: #666;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background: linear-gradient(to right, #FFD700, #FF8C00);
          color: #000;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          margin: 20px 0;
        }
        h1 {
          color: #333;
        }
        ul {
          padding-left: 20px;
        }
        .feature {
          margin-bottom: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://rooffax.com/images/logo.png" alt="RoofFax Logo">
        </div>
        <div class="content">
          <h1>Welcome to RoofFax, ${name}!</h1>
          <p>We're excited to have you on board. RoofFax is the world's smartest roof and property report platform, designed to help you work smarter, not harder.</p>
          
          <h2>Here's what you can do with RoofFax:</h2>
          <ul>
            <li class="feature">Get instant roof measurements and analysis</li>
            <li class="feature">Track storms and identify damaged properties</li>
            <li class="feature">Find property owner information</li>
            <li class="feature">Create professional proposals in seconds</li>
            <li class="feature">Access Florida building codes and requirements</li>
          </ul>
          
          <p>Your account is now active and ready to use.</p>
          
          <div style="text-align: center;">
            <a href="https://rooffax.com/dashboard" class="button">Go to Dashboard</a>
          </div>
          
          <p>If you have any questions or need assistance, our AI assistant Roofus is available 24/7 to help you. You can also reach our support team at <a href="mailto:support@rooffax.com">support@rooffax.com</a>.</p>
          
          <p>Happy roofing!</p>
          <p>The RoofFax Team</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} RoofFax. All rights reserved.</p>
          <p>123 Main St, Suite 100, Orlando, FL 32801</p>
        </div>
      </div>
    </body>
    </html>
  `

  return { subject, html, text }
}
