import nodemailer from "nodemailer"

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  // Ensure environment variables are set
  const emailUser = process.env.EMAIL_USER
  const emailPassword = process.env.EMAIL_PASSWORD
  const emailServer = process.env.EMAIL_SERVER
  const emailPort = process.env.EMAIL_PORT
  const emailSecure = process.env.EMAIL_SECURE === "true" // Convert string to boolean
  const emailFrom = process.env.EMAIL_FROM

  if (!emailUser || !emailPassword || !emailServer || !emailPort || !emailFrom) {
    console.error("Missing email environment variables. Cannot send email.")
    throw new Error("Email service not configured properly.")
  }

  const transporter = nodemailer.createTransport({
    host: emailServer,
    port: Number.parseInt(emailPort, 10),
    secure: emailSecure, // true for 465, false for other ports
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  })

  try {
    await transporter.sendMail({
      from: emailFrom,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>?/gm, ""), // Fallback to plain text from HTML
    })
    console.log(`Email sent successfully to ${to}`)
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error)
    throw new Error("Failed to send email.")
  }
}
