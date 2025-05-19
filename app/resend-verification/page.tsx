import type { Metadata } from "next"
import { ResendVerification } from "@/components/auth/resend-verification"

export const metadata: Metadata = {
  title: "Resend Verification Email | RoofFax",
  description: "Resend your email verification link for your RoofFax account.",
}

export default function ResendVerificationPage({
  searchParams,
}: {
  searchParams: { email?: string }
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Resend Verification Email</h1>
        <p className="text-gray-400 text-center mb-8">Enter your email address to receive a new verification link.</p>
        <ResendVerification defaultEmail={searchParams.email} />
      </div>
    </div>
  )
}
