import type { Metadata } from "next"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"
import { checkResetToken } from "@/actions/auth-actions"
import { AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Reset Password | RoofFax",
  description: "Create a new password for your RoofFax account.",
}

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token?: string }
}) {
  const token = searchParams.token

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-slate-800/50 p-6 rounded-lg border border-slate-700 text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Invalid Request</h1>
          <p className="text-gray-400 mb-0">
            The password reset link is invalid. Please request a new password reset link.
          </p>
        </div>
      </div>
    )
  }

  // Validate token
  const { success, error } = await checkResetToken(token)

  if (!success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-slate-800/50 p-6 rounded-lg border border-slate-700 text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Invalid or Expired Link</h1>
          <p className="text-gray-400 mb-0">
            {error || "The password reset link is invalid or has expired. Please request a new password reset link."}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Reset Password</h1>
        <p className="text-gray-400 text-center mb-8">Create a new password for your account.</p>
        <ResetPasswordForm token={token} />
      </div>
    </div>
  )
}
