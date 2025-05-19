"use server"

import { sendEmail, type EmailContent } from "@/lib/email-service"
import { getRoofReportEmailTemplate } from "@/lib/email-templates"

interface SendReportEmailParams {
  recipientEmail: string
  recipientName: string
  address: string
  reportData: any
  reportId?: string
  ccEmails?: string[]
  senderName?: string
  additionalMessage?: string
}

export async function sendReportEmail({
  recipientEmail,
  recipientName,
  address,
  reportData,
  reportId = "demo",
  ccEmails = [],
  senderName = "",
  additionalMessage = "",
}: SendReportEmailParams) {
  try {
    // Validate inputs
    if (!recipientEmail) {
      return { success: false, message: "Recipient email is required" }
    }

    // Generate a view report URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://rooffax.report"
    const viewReportUrl = `${baseUrl}/report?address=${encodeURIComponent(address)}&id=${reportId}`

    // Generate email HTML
    const emailHtml = getRoofReportEmailTemplate(recipientName, address, reportData, viewReportUrl, additionalMessage)

    // Prepare email content
    const emailContent: EmailContent = {
      to: recipientEmail,
      subject: `Your RoofFax Report for ${address}`,
      html: emailHtml,
      replyTo: senderName ? `${senderName} <${process.env.EMAIL_REPLY_TO || process.env.EMAIL_USER}>` : undefined,
    }

    // Add CC recipients if provided
    if (ccEmails && ccEmails.length > 0) {
      emailContent.cc = ccEmails
    }

    // Send the email
    await sendEmail(emailContent)

    return {
      success: true,
      message: "Report email sent successfully",
    }
  } catch (error) {
    console.error("Error sending report email:", error)
    return {
      success: false,
      message: "Failed to send report email. Please try again later.",
    }
  }
}
