import nodemailer from "nodemailer"
import { logError } from "@/lib/utils"

// Email service configuration types
interface EmailConfig {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
  from: string
}

// Email content interface
interface EmailOptions {
  to: string
  subject: string
  html: string
  attachments?: Array<{
    filename: string
    content: Buffer | string
    contentType?: string
  }>
}

// Get email configuration from environment variables
function getEmailConfig(): EmailConfig {
  return {
    host: process.env.EMAIL_SERVER || "",
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER || "",
      pass: process.env.EMAIL_PASSWORD || "",
    },
    from: process.env.EMAIL_FROM || "RoofFax <noreply@rooffax.report>",
  }
}

// Create a development transporter for testing
function createDevTransport() {
  console.log("📧 Creating development email transport")
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "ethereal.user@ethereal.email",
      pass: "ethereal_pass",
    },
  })
}

// Create a production transporter
function createProdTransport(config: EmailConfig) {
  console.log("📧 Creating production email transport")
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
  })
}

// Send an email
export async function sendEmail({ to, subject, html, attachments = [] }: EmailOptions): Promise<void> {
  try {
    const isProduction = process.env.NODE_ENV === "production"
    const config = getEmailConfig()

    // Validate configuration in production
    if (isProduction) {
      if (!config.host || !config.auth.user || !config.auth.pass) {
        throw new Error("Email configuration is incomplete. Check environment variables.")
      }
    }

    // Create appropriate transport
    const transport = isProduction ? createProdTransport(config) : createDevTransport()

    // Log email details in development
    if (!isProduction) {
      console.log("📧 Sending email:")
      console.log(`To: ${to}`)
      console.log(`Subject: ${subject}`)
      console.log(`Attachments: ${attachments.length}`)
    }

    // Send the email
    const info = await transport.sendMail({
      from: config.from,
      to,
      subject,
      html,
      attachments,
    })

    // Log success
    if (!isProduction) {
      console.log("📧 Email sent successfully!")
      if (typeof nodemailer.getTestMessageUrl === "function" && info) {
        console.log("Preview URL:", nodemailer.getTestMessageUrl(info))
      }
    }
  } catch (error) {
    const err = error as Error
    logError(err, "Email sending failed")

    // Re-throw the error for the caller to handle
    throw new Error(`Failed to send email: ${err.message}`)
  }
}

export default sendEmail

// Re-export from email-service for backward compatibility
export { type, EmailContent } from "./email-service"
