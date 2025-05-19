"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { verifyEmail } from "@/actions/auth-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"

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
        const result = await verifyEmail(token)

        if (result.success) {
          setStatus("success")
          setMessage(result.message || "Email verified successfully!")
        } else {
          setStatus("error")
          setMessage(result.error || "Failed to verify email.")
        }
      } catch (error) {
        setStatus("error")
        setMessage("An unexpected error occurred.")
      }
    }

    verifyUserEmail()
  }, [searchParams])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Email Verification</CardTitle>
          <CardDescription>{status === "loading" ? "Verifying your email address..." : ""}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4 pt-6">
          {status === "loading" && (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
            </div>
          )}

          {status === "success" && (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
          )}

          {status === "error" && (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-10 w-10 text-red-500" />
            </div>
          )}

          <p className="text-center text-gray-700">{message}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => router.push(status === "success" ? "/login" : "/")} className="mt-4">
            {status === "success" ? "Go to Login" : "Return to Home"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
