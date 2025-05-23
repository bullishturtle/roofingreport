import { captureException } from "@sentry/nextjs"

interface ErrorDetails {
  message: string
  stack?: string
  context?: Record<string, any>
  userId?: string | null
  url?: string
}

export function handleError(error: Error | unknown, details?: Partial<ErrorDetails>) {
  const errorObj = error instanceof Error ? error : new Error(String(error))

  // Combine error info with additional details
  const errorDetails: ErrorDetails = {
    message: errorObj.message,
    stack: errorObj.stack,
    ...details,
    url: typeof window !== "undefined" ? window.location.href : undefined,
  }

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.error("Error caught by global handler:", errorObj)
    console.error("Error details:", errorDetails)
  }

  // Send to error monitoring service (e.g., Sentry)
  try {
    captureException(errorObj, {
      extra: errorDetails,
    })
  } catch (sentryError) {
    // Fallback if Sentry fails
    console.error("Failed to send error to Sentry:", sentryError)
  }

  // Send to custom error logging endpoint
  try {
    fetch("/api/error-log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(errorDetails),
      // Keep the request from failing silently
      keepalive: true,
    }).catch((fetchError) => {
      console.error("Failed to send error to logging endpoint:", fetchError)
    })
  } catch (fetchError) {
    console.error("Failed to send error to logging endpoint:", fetchError)
  }

  return errorObj
}
