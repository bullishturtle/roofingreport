import { NextResponse } from "next/server"
import { handleError } from "@/lib/error-handler"

export interface ApiError {
  status: number
  code: string
  message: string
  details?: any
}

export class ApiErrorResponse extends Error {
  status: number
  code: string
  details?: any

  constructor(error: ApiError) {
    super(error.message)
    this.status = error.status
    this.code = error.code
    this.details = error.details
    this.name = "ApiErrorResponse"
  }
}

export function handleApiError(error: unknown, requestInfo?: any) {
  // Log the error
  handleError(error, { context: { api: true, request: requestInfo } })

  // Determine the appropriate response
  if (error instanceof ApiErrorResponse) {
    return NextResponse.json(
      {
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
        },
      },
      { status: error.status },
    )
  }

  // Handle validation errors
  if (error instanceof Error && error.name === "ValidationError") {
    return NextResponse.json(
      {
        error: {
          code: "validation_error",
          message: "Validation failed",
          details: error.message,
        },
      },
      { status: 400 },
    )
  }

  // Handle database errors
  if (error instanceof Error && error.message.includes("database")) {
    return NextResponse.json(
      {
        error: {
          code: "database_error",
          message: "Database operation failed",
        },
      },
      { status: 500 },
    )
  }

  // Default to generic server error
  console.error("Unhandled API error:", error)

  return NextResponse.json(
    {
      error: {
        code: "internal_server_error",
        message: "An unexpected error occurred",
      },
    },
    { status: 500 },
  )
}
