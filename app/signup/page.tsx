import { Suspense } from "react"
import Link from "next/link"
import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <p className="text-gray-600 mt-2">Join RoofFax to get started</p>
        </div>

        <Suspense fallback={<div className="text-center">Loading signup form...</div>}>
          <SignupForm />
        </Suspense>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-8 border-t pt-6">
          <p className="text-xs text-gray-500 text-center">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

// Add a dynamic flag to prevent static optimization during build
// This helps avoid issues with environment variables during build time
export const dynamic = "force-dynamic"
