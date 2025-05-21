import type { Metadata } from "next"
import Link from "next/link"
import { SignUpForm } from "@/components/auth/signup-form"

export const metadata: Metadata = {
  title: "Sign Up | RoofFax",
  description: "Create a new RoofFax account",
}

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black to-blue-950">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Create an account</h1>
          <p className="text-sm text-white/70">Enter your information below to create your account</p>
        </div>
        <SignUpForm />
        <p className="px-8 text-center text-sm text-white/70">
          <Link href="/login" className="hover:text-neon-gold underline underline-offset-4">
            Already have an account? Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
