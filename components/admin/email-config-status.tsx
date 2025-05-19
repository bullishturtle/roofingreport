"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Copy, ExternalLink } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function EmailConfigStatus() {
  const [status, setStatus] = useState<"loading" | "configured" | "not-configured">("loading")
  const { toast } = useToast()

  useEffect(() => {
    // Check if email is configured by sending a test request
    const checkEmailConfig = async () => {
      try {
        const response = await fetch("/api/admin/check-email-config")
        const data = await response.json()
        setStatus(data.configured ? "configured" : "not-configured")
      } catch (error) {
        setStatus("not-configured")
      }
    }

    checkEmailConfig()
  }, [])

  const copyInstructions = () => {
    const instructions = `
1. Sign up for a Resend account at https://resend.com
2. Create an API key in the Resend dashboard
3. Add the API key to your environment variables as EMAIL_API_KEY
4. Verify your domain in the Resend dashboard
5. Update EMAIL_FROM to use your verified domain
    `.trim()

    navigator.clipboard.writeText(instructions)
    toast({
      title: "Copied to clipboard",
      description: "Email configuration instructions copied to clipboard",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Email Configuration
          {status === "configured" ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <CheckCircle className="w-4 h-4 mr-1" /> Configured
            </Badge>
          ) : status === "not-configured" ? (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              <AlertCircle className="w-4 h-4 mr-1" /> Not Configured
            </Badge>
          ) : (
            <Badge variant="outline">Checking...</Badge>
          )}
        </CardTitle>
        <CardDescription>Email service configuration status and setup instructions</CardDescription>
      </CardHeader>
      <CardContent>
        {status === "configured" ? (
          <div className="text-sm">
            <p className="mb-2">✅ Email service is properly configured and ready to send emails.</p>
            <p>Using Resend as the email service provider.</p>
          </div>
        ) : status === "not-configured" ? (
          <div className="space-y-4">
            <div className="rounded-md bg-amber-50 p-4 text-sm text-amber-700 border border-amber-200">
              <p className="font-medium">Email service is not configured</p>
              <p className="mt-1">
                The application is using placeholder email functionality. Emails will be logged to the console but not
                actually sent.
              </p>
            </div>

            <div className="text-sm space-y-2">
              <p className="font-medium">To configure email sending:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>
                  Sign up for a{" "}
                  <a
                    href="https://resend.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Resend account
                  </a>
                </li>
                <li>Create an API key in the Resend dashboard</li>
                <li>
                  Add the API key to your environment variables as{" "}
                  <code className="bg-gray-100 px-1 py-0.5 rounded">EMAIL_API_KEY</code>
                </li>
                <li>Verify your domain in the Resend dashboard</li>
                <li>
                  Update <code className="bg-gray-100 px-1 py-0.5 rounded">EMAIL_FROM</code> to use your verified domain
                </li>
              </ol>
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-4">
            <div className="animate-pulse flex space-x-4">
              <div className="h-3 bg-gray-200 rounded w-24"></div>
              <div className="h-3 bg-gray-200 rounded w-32"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={copyInstructions}>
          <Copy className="w-4 h-4 mr-2" /> Copy Instructions
        </Button>
        <Button variant="outline" size="sm" asChild>
          <a href="https://resend.com/signup" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 mr-2" /> Sign up for Resend
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
