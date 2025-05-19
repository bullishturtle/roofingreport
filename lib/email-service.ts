// PLACEHOLDER EMAIL SERVICE
// This is a simplified implementation for deployment
// Replace with actual email service integration when ready

export interface EmailContent {
  to: string | string[]
  cc?: string | string[]
  bcc?: string | string[]
  subject: string
  html: string
  text?: string
  attachments?: any[]
  replyTo?: string
}

/**
 * Placeholder email sending function that logs emails instead of sending them
 * This allows the site to deploy without requiring actual email configuration
 */
export async function sendEmail(content: EmailContent): Promise<void> {
  // Log the email details for debugging
  console.log("📧 [PLACEHOLDER] Email would be sent with the following details:")
  console.log(`To: ${Array.isArray(content.to) ? content.to.join(", ") : content.to}`)
  if (content.cc) console.log(`CC: ${Array.isArray(content.cc) ? content.cc.join(", ") : content.cc}`)
  console.log(`Subject: ${content.subject}`)
  console.log(`Reply-To: ${content.replyTo || "Not specified"}`)
  console.log(`Attachments: ${content.attachments?.length || 0}`)

  // In a production environment, this would connect to an actual email service

  // Simulate a successful email send
  return Promise.resolve()
}

// Export a default function for backward compatibility
export default sendEmail
