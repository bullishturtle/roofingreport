"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Dashboard error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-blue-950 p-4">
      <div className="w-full max-w-md">
        <Alert variant="destructive" className="bg-black/50 backdrop-blur-md border-neon-gold/50 text-white">
          <AlertTriangle className="h-5 w-5 text-neon-gold" />
          <AlertTitle className="text-neon-gold">Dashboard Error</AlertTitle>
          <AlertDescription className="text-white/70 mt-2">
            We've encountered an issue loading the dashboard. This could be due to a network problem or a temporary
            server issue.
          </AlertDescription>
          <div className="mt-4">
            <Button
              onClick={() => reset()}
              className="bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black"
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Retry Dashboard
            </Button>
          </div>
        </Alert>
      </div>
    </div>
  )
}
