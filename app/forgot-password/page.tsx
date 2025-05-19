import type { Metadata } from "next"
import Link from "next/link"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export const metadata: Metadata = {
  title: "Forgot Password | RoofFax",
  description: "Reset your RoofFax password",
}

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Forgot Password</h1>
          <p className="text-sm text-slate-400">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>
        <ForgotPasswordForm />
        <p className="px-8 text-center text-sm text-slate-400">
          <Link href="/login" className="hover:text-amber-500 underline underline-offset-4">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  )
}
