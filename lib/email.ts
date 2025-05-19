import nodemailer from "nodemailer"

interface EmailOptions {
  to: string
  subject: string
  html: string
}

// Create a development transporter for testing
// In production, you would use your actual SMTP credentials
const createDevTransport = () => {
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER || "ethereal.user@ethereal.email",
      pass: process.env.EMAIL_PASSWORD || "ethereal_pass",
    },
  })
}

// Create a production transporter
const createProdTransport = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_SERVER || "",
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER || "",
      pass: process.env.EMAIL_PASSWORD || "",
    },
  })
}

export async function sendEmail({ to, subject, html }: EmailOptions): Promise<void> {
  try {
    // Use development transport in development, production transport in production
    const transport = process.env.NODE_ENV === "production" ? createProdTransport() : createDevTransport()

    // Log email details in development
    if (process.env.NODE_ENV !== "production") {
      console.log("📧 Sending email:")
      console.log(`To: ${to}`)
      console.log(`Subject: ${subject}`)
      console.log("HTML content available but not logged for brevity")
    }

    // Send the email
    const info = await transport.sendMail({
      from: process.env.EMAIL_FROM || "RoofFax <noreply@rooffax.com>",
      to,
      subject,
      html,
    })

    // Log success in development
    if (process.env.NODE_ENV !== "production") {
      console.log("📧 Email sent successfully!")
      console.log("Preview URL:", nodemailer.getTestMessageUrl(info))
    }
  } catch (error) {
    console.error("Failed to send email:", error)
    // In production, you might want to log this to a monitoring service
    if (process.env.NODE_ENV === "production") {
      // TODO: Log to monitoring service
    }
    throw new Error("Failed to send email")
  }
}
