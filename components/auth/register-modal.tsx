"use client"

import { X } from "lucide-react"
import { RegisterForm } from "@/components/auth/register-form"

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginClick?: () => void
}

export default function RegisterModal({ isOpen, onClose, onLoginClick }: RegisterModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Create an account</h2>
          <p className="text-gray-600 mt-1">Sign up to get your roof report</p>
        </div>

        <RegisterForm onSuccess={onClose} />

        {onLoginClick && (
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button onClick={onLoginClick} className="text-blue-600 hover:text-blue-800 font-medium">
                Log in
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
