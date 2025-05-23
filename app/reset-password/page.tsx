import type { Metadata } from "next"
import Link from "next/link"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"

export const metadata: Metadata = {
  title: "Reset Password | RoofFax",
  description: "Reset your RoofFax password",
}

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token?: string }
}) {
  const token = searchParams.token

  if (!token) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black to-blue-950">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-white">Invalid Token</h1>
            <p className="text-sm text-white/70">The password reset link is invalid or has expired.</p>
            <div className="mt-4">
              <Link href="/forgot-password" className="text-neon-gold hover:underline">
                Request a new password reset link
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black to-blue-950">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Reset Password</h1>
          <p className="text-sm text-white/70">Enter your new password below</p>
        </div>
        <ResetPasswordForm token={token} />
        <p className="px-8 text-center text-sm text-white/70">
          <Link href="/login" className="hover:text-neon-gold underline underline-offset-4">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  )
}
