"use server"

import { z } from "zod"
import { sendEmail } from "@/lib/email" // Assuming this is correctly configured
import { trackFormSubmission } from "@/lib/analytics-server" // Assuming this exists and works

// Define the schema for newsletter subscription
const NewsletterSubscriptionSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
})

interface NewsletterActionState {
  success: boolean
  message: string
  email?: string
  errors?: {
    email?: string[]
    _form?: string[]
  }
}

export async function subscribeToNewsletter(
  prevState: NewsletterActionState | null,
  formData: FormData,
): Promise<NewsletterActionState> {
  const rawEmail = formData.get("email")

  const validationResult = NewsletterSubscriptionSchema.safeParse({ email: rawEmail })

  if (!validationResult.success) {
    const fieldErrors = validationResult.error.flatten().fieldErrors
    await trackFormSubmission("newsletter_signup", {
      email: typeof rawEmail === "string" ? rawEmail : "",
      success: false,
      error: "Validation failed",
      validationErrors: fieldErrors,
    })
    return {
      success: false,
      message: "Validation failed. Please check your input.",
      errors: fieldErrors,
      email: typeof rawEmail === "string" ? rawEmail : "",
    }
  }

  const email = validationResult.data.email

  try {
    // Here you would typically save the email to your database or mailing list service
    // For example: await db.newsletterSubscribers.create({ data: { email } });
    console.log(`Subscribing ${email} to newsletter... (Simulated)`)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay

    // Send a confirmation email
    await sendEmail({
      to: email,
      subject: "Welcome to the RoofFax Newsletter!",
      html: `<p>Thank you for subscribing to the RoofFax newsletter! Stay tuned for the latest updates and insights from RoofFax.com.</p><p>Powered by RoofFax™ | All rights reserved 2025</p>`,
    })

    await trackFormSubmission("newsletter_signup", { email, success: true })
    return {
      success: true,
      message: "Thank you for subscribing! Please check your email for a confirmation.",
      email: email,
    }
  } catch (error) {
    console.error("Failed to subscribe to newsletter:", error)
    let errorMessage = "An unexpected error occurred. Please try again later."
    if (error instanceof Error) {
      errorMessage = error.message
    }
    await trackFormSubmission("newsletter_signup", { email, success: false, error: errorMessage })
    return {
      success: false,
      message: "Subscription failed. Please try again.",
      email: email,
      errors: { _form: [errorMessage] },
    }
  }
}
