import type { Metadata } from "next"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "Register | RoofFax",
  description: "Create a new RoofFax account.",
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Create an Account</h1>
        <p className="text-gray-400 text-center mb-8">Join RoofFax to access the world's smartest roof reports.</p>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
