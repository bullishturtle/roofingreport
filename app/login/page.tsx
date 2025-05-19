import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Login | RoofFax",
  description: "Log in to your RoofFax account.",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Welcome Back</h1>
        <p className="text-gray-400 text-center mb-8">Log in to access your RoofFax account.</p>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
