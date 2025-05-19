"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { verifyEmail } from "@/actions/auth-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const verifyUserEmail = async () => {
      const token = searchParams.get("token")

      if (!token) {
        setStatus("error")
        setMessage("Verification token is missing.")
        return
      }

      try {
        console.log(`📧 Verifying email with token: ${token.substring(0, 10)}...`)
        const result = await verifyEmail(token)

        if (result.success) {
          console.log(`✅ Email verification successful`)
          setStatus("success")
          setMessage(result.message || "Email verified successfully!")
        } else {
          console.error(`❌ Email verification failed: ${result.error}`)
          setStatus("error")
          setMessage(result.error || "Failed to verify email.")
        }
      } catch (error) {
        console.error("❌ Unexpected email verification error:", error)
        setStatus("error")
        setMessage("An unexpected error occurred.")
      }
    }

    verifyUserEmail()
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">Email Verification</CardTitle>
          <CardDescription className="text-gray-400">
            {status === "loading" ? "Verifying your email address..." : ""}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4 pt-6">
          {status === "loading" && (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/10">
              <LoadingSpinner size="lg" />
            </div>
          )}

          {status === "success" && (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
          )}

          {status === "error" && (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
              <XCircle className="h-10 w-10 text-red-500" />
            </div>
          )}

          <p className="text-center text-white">{message}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={() => router.push(status === "success" ? "/login" : "/")}
            className="bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            {status === "success" ? "Go to Login" : "Return to Home"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
