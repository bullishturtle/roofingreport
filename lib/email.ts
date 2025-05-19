"use server"

import { Resend } from "resend"
import {
  getVerificationEmailTemplate,
  getResetPasswordEmailTemplate,
  getWelcomeEmailTemplate,
  getReportEmailTemplate,
} from "./email-templates"

// Initialize Resend with API key or placeholder
const RESEND_API_KEY = process.env.EMAIL_API_KEY || ""
const resend = new Resend(RESEND_API_KEY)

// Email content interface
export interface EmailContent {
  subject: string
  html: string
  text?: string
}

// Email service interface
export interface EmailService {
  sendVerificationEmail: (to: string, verificationToken: string) => Promise<boolean>
  sendResetPasswordEmail: (to: string, resetToken: string) => Promise<boolean>
  sendWelcomeEmail: (to: string, name: string) => Promise<boolean>
  sendReportEmail: (to: string, reportData: any) => Promise<boolean>
}

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV !== "production"

// Create a placeholder email service for development
const createPlaceholderEmailService = (): EmailService => {
  return {
    sendVerificationEmail: async (to: string, verificationToken: string) => {
      console.log("📧 [PLACEHOLDER] Verification email would be sent to:", to)
      console.log("📧 [PLACEHOLDER] Verification token:", verificationToken)
      console.log(
        "📧 [PLACEHOLDER] Email content:",
        getVerificationEmailTemplate(verificationToken).substring(0, 100) + "...",
      )
      return true
    },

    sendResetPasswordEmail: async (to: string, resetToken: string) => {
      console.log("📧 [PLACEHOLDER] Reset password email would be sent to:", to)
      console.log("📧 [PLACEHOLDER] Reset token:", resetToken)
      console.log(
        "📧 [PLACEHOLDER] Email content:",
        getResetPasswordEmailTemplate(resetToken).substring(0, 100) + "...",
      )
      return true
    },

    sendWelcomeEmail: async (to: string, name: string) => {
      console.log("📧 [PLACEHOLDER] Welcome email would be sent to:", to)
      console.log("📧 [PLACEHOLDER] User name:", name)
      console.log("📧 [PLACEHOLDER] Email content:", getWelcomeEmailTemplate(name).substring(0, 100) + "...")
      return true
    },

    sendReportEmail: async (to: string, reportData: any) => {
      console.log("📧 [PLACEHOLDER] Report email would be sent to:", to)
      console.log("📧 [PLACEHOLDER] Report data:", JSON.stringify(reportData).substring(0, 100) + "...")
      console.log("📧 [PLACEHOLDER] Email content:", getReportEmailTemplate(reportData).substring(0, 100) + "...")
      return true
    },
  }
}

// Create a production email service using Resend
const createProductionEmailService = (): EmailService => {
  return {
    sendVerificationEmail: async (to: string, verificationToken: string) => {
      try {
        const html = getVerificationEmailTemplate(verificationToken)

        await resend.emails.send({
          from: process.env.EMAIL_FROM || "verification@rooffax.report",
          to,
          subject: "Verify your RoofFax account",
          html,
        })

        return true
      } catch (error) {
        console.error("Failed to send verification email:", error)
        return false
      }
    },

    sendResetPasswordEmail: async (to: string, resetToken: string) => {
      try {
        const html = getResetPasswordEmailTemplate(resetToken)

        await resend.emails.send({
          from: process.env.EMAIL_FROM || "noreply@rooffax.report",
          to,
          subject: "Reset your RoofFax password",
          html,
        })

        return true
      } catch (error) {
        console.error("Failed to send reset password email:", error)
        return false
      }
    },

    sendWelcomeEmail: async (to: string, name: string) => {
      try {
        const html = getWelcomeEmailTemplate(name)

        await resend.emails.send({
          from: process.env.EMAIL_FROM || "welcome@rooffax.report",
          to,
          subject: "Welcome to RoofFax!",
          html,
        })

        return true
      } catch (error) {
        console.error("Failed to send welcome email:", error)
        return false
      }
    },

    sendReportEmail: async (to: string, reportData: any) => {
      try {
        const html = getReportEmailTemplate(reportData)

        await resend.emails.send({
          from: process.env.EMAIL_FROM || "reports@rooffax.report",
          to,
          subject: "Your RoofFax Report",
          html,
        })

        return true
      } catch (error) {
        console.error("Failed to send report email:", error)
        return false
      }
    },
  }
}

// Determine which email service to use based on environment and API key
export const emailService: EmailService =
  isDevelopment || !RESEND_API_KEY ? createPlaceholderEmailService() : createProductionEmailService()

// Default export for the email service
export default emailService
