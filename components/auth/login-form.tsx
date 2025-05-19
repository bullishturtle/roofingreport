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
import { useRouter } from "next/navigation"

interface LoginFormProps {
  onSuccess?: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [verificationNeeded, setVerificationNeeded] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const { login } = useUser()
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setVerificationNeeded(false)

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      console.log(`🔑 Login attempt for ${email}`)
      const result = await login(email, password)

      if (result.success) {
        console.log(`✅ Login successful for ${email}`)
        toast({
          title: "Success",
          description: "You have been logged in successfully",
        })

        if (onSuccess) {
          onSuccess()
        }

        router.push("/dashboard")
      } else if (result.needsVerification) {
        console.log(`⚠️ Email verification needed for ${email}`)
        setVerificationNeeded(true)
        setUserEmail(email)
      } else {
        console.error(`❌ Login failed for ${email}: ${result.error}`)
        toast({
          title: "Error",
          description: result.error || "Invalid email or password",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("❌ Unexpected login error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {verificationNeeded && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md">
          <p className="text-sm">
            Please verify your email address before logging in.{" "}
            <Link
              href={`/resend-verification?email=${encodeURIComponent(userEmail)}`}
              className="font-medium underline"
            >
              Resend verification email
            </Link>
          </p>
        </div>
      )}

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
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
            Forgot password?
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <LoadingSpinner size="sm" className="mr-2" />
            Logging in...
          </>
        ) : (
          "Log in"
        )}
      </Button>
    </form>
  )
}
