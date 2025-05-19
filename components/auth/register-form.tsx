"use client"

import type React from "react"

import { useState } from "react"
import { useUser } from "@/contexts/user-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import LoadingSpinner from "@/components/ui/loading-spinner"
import Link from "next/link"

interface RegisterFormProps {
  onSuccess?: () => void
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState<"Homeowner" | "Pro">("Homeowner")
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const { register } = useUser()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    console.log(`📝 Registration attempt for ${email} as ${userType}`)

    try {
      const result = await register(name, email, password, userType)

      if (result.success) {
        console.log(`✅ Registration successful for ${email}`)
        setRegistrationSuccess(true)
        setUserEmail(email)

        toast({
          title: "Success",
          description: "Your account has been created successfully",
        })

        if (onSuccess) {
          onSuccess()
        }
      } else {
        console.error(`❌ Registration failed for ${email}: ${result.error}`)
        toast({
          title: "Error",
          description: result.error || "Registration failed",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("❌ Unexpected registration error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (registrationSuccess) {
    return (
      <div className="space-y-6">
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
          <p>
            Registration successful! We've sent a verification email to <strong>{userEmail}</strong>. Please check your
            inbox and click the verification link to complete your registration.
          </p>
        </div>

        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600">
            Didn't receive the email?{" "}
            <Link
              href={`/resend-verification?email=${encodeURIComponent(userEmail)}`}
              className="text-blue-600 hover:text-blue-800"
            >
              Resend verification email
            </Link>
          </p>

          <Button asChild variant="outline">
            <Link href="/login">Go to Login</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>I am a</Label>
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant={userType === "Homeowner" ? "default" : "outline"}
            onClick={() => setUserType("Homeowner")}
            className={userType === "Homeowner" ? "border-2 border-blue-500" : ""}
          >
            Homeowner
          </Button>
          <Button
            type="button"
            variant={userType === "Pro" ? "default" : "outline"}
            onClick={() => setUserType("Pro")}
            className={userType === "Pro" ? "border-2 border-blue-500" : ""}
          >
            Roofing Pro
          </Button>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <LoadingSpinner size="sm" className="mr-2" />
            Creating account...
          </>
        ) : (
          "Create account"
        )}
      </Button>
    </form>
  )
}
