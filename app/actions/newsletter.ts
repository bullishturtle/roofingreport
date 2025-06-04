"use server"

import { sendEmail } from "@/lib/email"
import { trackFormSubmission } from "@/lib/analytics-server"

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    trackFormSubmission("newsletter_signup", { email, success: false, error: "Invalid email format" })
    return { success: false, message: "Please enter a valid email address." }
  }

  try {
    // Simulate saving the email to a database or mailing list service
    console.log(`Attempting to subscribe email: ${email} to newsletter.`)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay

    // Send a confirmation email using the configured nodemailer transporter
    await sendEmail({
      to: email,
      subject: "Welcome to the RoofFax Newsletter!",
      html: `<p>Thank you for subscribing to the RoofFax newsletter! Stay tuned for the latest updates and insights from RoofFax.com.</p>
             <p>Powered by RoofFax™ | All rights reserved 2025</p>`,
    })

    trackFormSubmission("newsletter_signup", { email, success: true })
    return { success: true, message: "Thank you for subscribing! Check your email for a confirmation." }
  } catch (error) {
    console.error("Failed to subscribe to newsletter:", error)
    trackFormSubmission("newsletter_signup", { email, success: false, error: (error as Error).message })
    return { success: false, message: "Failed to subscribe. Please try again later." }
  }
}
