"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2 } from "lucide-react"
import { useUser, type UserType } from "@/contexts/user-context"
import { useToast } from "@/components/ui/toast"

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginClick: () => void
  initialUserType?: UserType
}

export function RegisterModal({ isOpen, onClose, onLoginClick, initialUserType }: RegisterModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [userType, setUserType] = useState<UserType>(initialUserType || null)
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    password?: string
    confirmPassword?: string
    userType?: string
  }>({})

  const { register, isLoading } = useUser()
  const { showToast } = useToast()

  const validateForm = () => {
    const newErrors: {
      name?: string
      email?: string
      password?: string
      confirmPassword?: string
      userType?: string
    } = {}

    if (!name) {
      newErrors.name = "Name is required"
    }

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email"
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

    if (!userType) {
      newErrors.userType = "Please select an account type"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm() || !userType) return

    try {
      await register(name, email, password, userType)
      showToast("Account created successfully!", "success")
      onClose()
    } catch (error) {
      showToast("Registration failed. Please try again.", "error")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 border border-yellow-500/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">Create your account</DialogTitle>
          <DialogDescription className="text-gray-400">
            Join RoofFax to access smart roof reports and tools
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              Full Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (errors.name) setErrors({ ...errors, name: undefined })
              }}
              placeholder="John Smith"
              className={`bg-gray-800 border-gray-700 text-white ${
                errors.name ? "border-red-500" : "focus:border-yellow-500"
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors({ ...errors, email: undefined })
              }}
              placeholder="you@example.com"
              className={`bg-gray-800 border-gray-700 text-white ${
                errors.email ? "border-red-500" : "focus:border-yellow-500"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (errors.password) setErrors({ ...errors, password: undefined })
              }}
              placeholder="••••••••"
              className={`bg-gray-800 border-gray-700 text-white ${
                errors.password ? "border-red-500" : "focus:border-yellow-500"
              }`}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-white">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined })
              }}
              placeholder="••••••••"
              className={`bg-gray-800 border-gray-700 text-white ${
                errors.confirmPassword ? "border-red-500" : "focus:border-yellow-500"
              }`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-white">I am a:</Label>
            <RadioGroup
              value={userType || ""}
              onValueChange={(value) => {
                setUserType(value as UserType)
                if (errors.userType) setErrors({ ...errors, userType: undefined })
              }}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Homeowner" id="homeowner" className="border-yellow-500 text-yellow-500" />
                <Label htmlFor="homeowner" className="text-white">
                  Homeowner
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Pro" id="pro" className="border-yellow-500 text-yellow-500" />
                <Label htmlFor="pro" className="text-white">
                  Roofing Pro
                </Label>
              </div>
            </RadioGroup>
            {errors.userType && <p className="text-red-500 text-sm">{errors.userType}</p>}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>

          <div className="text-center text-gray-400">
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={onLoginClick}
                className="text-yellow-500 hover:text-yellow-400 hover:underline"
              >
                Log in
              </button>
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
