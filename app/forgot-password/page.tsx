import type { Metadata } from "next"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export const metadata: Metadata = {
  title: "Forgot Password | RoofFax",
  description: "Reset your RoofFax account password.",
}

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Forgot Password</h1>
        <p className="text-gray-400 text-center mb-8">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        <ForgotPasswordForm />
      </div>
    </div>
  )
}
