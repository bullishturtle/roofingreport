"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useUser } from "@/contexts/user-context"
import { UserTypeSelection } from "@/components/user-type-selection"

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginClick?: () => void
}

export function RegisterModal({ isOpen, onClose, onLoginClick }: RegisterModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [userType, setUserType] = useState<"homeowner" | "contractor">("homeowner")
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    password?: string
    confirmPassword?: string
  }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register } = useUser()

  if (!isOpen) return null

  const validateForm = () => {
    const newErrors: {
      name?: string
      email?: string
      password?: string
      confirmPassword?: string
    } = {}

    if (!name) {
      newErrors.name = "Name is required"
    }

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setIsSubmitting(true)
      const success = await register(name, email, password, userType)

      if (success) {
        onClose()
        console.log("Registration successful")
      } else {
        setErrors({ email: "Registration failed. Please try again." })
      }
    } catch (error) {
      console.error("Registration error:", error)
      setErrors({ email: "An error occurred. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Create an Account</h2>
          <p className="mt-2 text-gray-600">Sign up to get your roof report</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isSubmitting}
              className={errors.confirmPassword ? "border-red-500" : ""}
            />
            {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
          </div>

          <div className="space-y-2">
            <Label>I am a:</Label>
            <UserTypeSelection selectedType={userType} onSelect={setUserType} disabled={isSubmitting} />
          </div>

          <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <LoadingSpinner className="mr-2" />
                Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        {onLoginClick && (
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button onClick={onLoginClick} className="text-orange-600 hover:text-orange-800">
                Log in
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
