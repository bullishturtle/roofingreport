"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  const handleReset = () => {
    try {
      if (typeof reset === "function") {
        reset()
      } else {
        // Fallback if reset is not a function
        window.location.reload()
      }
    } catch (e) {
      console.error("Error during reset:", e)
      // Fallback to page reload
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-blue-950 p-4">
      <div className="w-full max-w-md">
        <Alert variant="destructive" className="bg-red-950/50 border-red-500/50 text-white">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          <AlertTitle className="text-red-400">Something went wrong</AlertTitle>
          <AlertDescription className="text-white/70 mt-2">
            We've encountered an unexpected error. Our team has been notified.
          </AlertDescription>
          <div className="mt-4">
            <Button onClick={handleReset} className="bg-red-500 hover:bg-red-600 text-white">
              Try again
            </Button>
          </div>
        </Alert>
      </div>
    </div>
  )
}
