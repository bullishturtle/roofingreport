"use client"

// Browser-compatible email service that logs instead of sending
export const sendEmailFromBrowser = async (to: string, subject: string, html: string) => {
  console.log(`[Email Service] Would send email to ${to}`)
  console.log(`[Email Service] Subject: ${subject}`)
  console.log(`[Email Service] Content: ${html.substring(0, 100)}...`)

  // In a real implementation, this would call an API endpoint
  try {
    const response = await fetch("/api/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to, subject, html }),
    })

    return response.ok
  } catch (error) {
    console.error("Failed to send email:", error)
    return false
  }
}

export default sendEmailFromBrowser
