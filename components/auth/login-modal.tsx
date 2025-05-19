"use client"

import { X } from "lucide-react"
import { LoginForm } from "@/components/auth/login-form"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onRegisterClick?: () => void
}

export default function LoginModal({ isOpen, onClose, onRegisterClick }: LoginModalProps) {
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
          <h2 className="text-2xl font-bold text-gray-900">Log in to RoofFax</h2>
          <p className="text-gray-600 mt-1">Welcome back! Please enter your details.</p>
        </div>

        <LoginForm onSuccess={onClose} />

        {onRegisterClick && (
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button onClick={onRegisterClick} className="text-blue-600 hover:text-blue-800 font-medium">
                Sign up
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
