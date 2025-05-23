"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import { useAnalytics } from "@/components/analytics/analytics-provider"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    // Log the error to analytics
    trackEvent("error_page_viewed", {
      error_message: error.message,
      error_digest: error.digest,
      error_stack: error.stack,
    })
  }, [error, trackEvent])

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mx-auto mb-6">
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">Something went wrong</h1>
        <p className="text-gray-600 text-center mb-6">
          We've encountered an unexpected error. Our team has been notified.
        </p>

        {error.digest && (
          <div className="bg-gray-100 p-4 rounded-md mb-6">
            <p className="text-sm font-mono text-gray-800">Error ID: {error.digest}</p>
          </div>
        )}

        <div className="flex flex-col space-y-3">
          <Button onClick={() => reset()} className="w-full flex items-center justify-center">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>

          <Button variant="outline" asChild className="w-full flex items-center justify-center">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
