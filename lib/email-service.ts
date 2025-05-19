import nodemailer from "nodemailer"
import { logError } from "@/lib/utils"

// Email provider types
type EmailProvider = "smtp" | "sendgrid" | "mailgun" | "ses"

// Email configuration interface
interface EmailConfig {
  provider: EmailProvider
  host?: string
  port?: number
  secure?: boolean
  auth: {
    user: string
    pass: string
    apiKey?: string
  }
  region?: string // For AWS SES
}

// Email content interface
export interface EmailContent {
  to: string | string[]
  cc?: string | string[]
  bcc?: string | string[]
  subject: string
  html: string
  text?: string
  attachments?: Array<{
    filename: string
    content: Buffer | string
    contentType?: string
    path?: string
  }>
  replyTo?: string
}

// Get email configuration from environment variables
function getEmailConfig(): EmailConfig {
  // Determine provider from environment variables
  const provider = (process.env.EMAIL_PROVIDER || "smtp") as EmailProvider

  // Base configuration
  const config: EmailConfig = {
    provider,
    auth: {
      user: process.env.EMAIL_USER || "",
      pass: process.env.EMAIL_PASSWORD || "",
    },
  }

  // Add provider-specific configuration
  switch (provider) {
    case "sendgrid":
      config.host = "smtp.sendgrid.net"
      config.port = 587
      config.secure = false
      config.auth.apiKey = process.env.SENDGRID_API_KEY
      break

    case "mailgun":
      config.host = "smtp.mailgun.org"
      config.port = 587
      config.secure = false
      break

    case "ses":
      config.host = `email-smtp.${process.env.AWS_REGION || "us-east-1"}.amazonaws.com`
      config.port = 587
      config.secure = false
      config.region = process.env.AWS_REGION || "us-east-1"
      break

    case "smtp":
    default:
      config.host = process.env.EMAIL_SERVER || ""
      config.port = Number(process.env.EMAIL_PORT) || 587
      config.secure = process.env.EMAIL_SECURE === "true"
      break
  }

  return config
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

// Create a production transporter based on the provider
function createProdTransport(config: EmailConfig) {
  console.log(`📧 Creating production email transport for ${config.provider}`)

  switch (config.provider) {
    case "sendgrid":
      return nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: {
          user: "apikey", // SendGrid requires 'apikey' as the username
          pass: config.auth.apiKey || config.auth.pass,
        },
      })

    case "mailgun":
      return nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: {
          user: config.auth.user,
          pass: config.auth.pass,
        },
      })

    case "ses":
      // For AWS SES, we could use the AWS SDK directly for better integration
      return nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: {
          user: config.auth.user,
          pass: config.auth.pass,
        },
      })

    case "smtp":
    default:
      return nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: {
          user: config.auth.user,
          pass: config.auth.pass,
        },
      })
  }
}

// Send an email
export async function sendEmail(content: EmailContent): Promise<void> {
  try {
    const isProduction = process.env.NODE_ENV === "production"
    const config = getEmailConfig()

    // Validate configuration in production
    if (isProduction) {
      if (!config.host || !config.auth.user || (!config.auth.pass && !config.auth.apiKey)) {
        throw new Error("Email configuration is incomplete. Check environment variables.")
      }
    }

    // Create appropriate transport
    const transport = isProduction ? createProdTransport(config) : createDevTransport()

    // Log email details in development
    if (!isProduction) {
      console.log("📧 Sending email:")
      console.log(`To: ${Array.isArray(content.to) ? content.to.join(", ") : content.to}`)
      console.log(`Subject: ${content.subject}`)
      console.log(`Attachments: ${content.attachments?.length || 0}`)
    }

    // Send the email
    const info = await transport.sendMail({
      from: process.env.EMAIL_FROM || "RoofFax <noreply@rooffax.report>",
      to: content.to,
      cc: content.cc,
      bcc: content.bcc,
      subject: content.subject,
      html: content.html,
      text: content.text,
      attachments: content.attachments,
      replyTo: content.replyTo || process.env.EMAIL_REPLY_TO,
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

// Export a default function for backward compatibility
export default sendEmail
