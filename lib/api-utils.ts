export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = "ApiError"
    this.status = status
  }
}

export async function fetchWithErrorHandling<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      let errorMessage = `API Error: ${response.status} ${response.statusText}`

      try {
        // Try to parse error message from response
        const errorData = await response.json()
        if (errorData.message) {
          errorMessage = errorData.message
        }
      } catch (e) {
        // If parsing fails, use default error message
      }

      throw new ApiError(errorMessage, response.status)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }

    // Handle network errors
    if (error instanceof Error) {
      if (error.message.includes("Failed to fetch") || error.message.includes("Network request failed")) {
        throw new ApiError("Network error. Please check your connection and try again.", 0)
      }

      throw new ApiError(error.message, 500)
    }

    throw new ApiError("An unknown error occurred", 500)
  }
}

export function handleApiError(error: unknown): { message: string; status?: number } {
  if (error instanceof ApiError) {
    return { message: error.message, status: error.status }
  }

  if (error instanceof Error) {
    return { message: error.message }
  }

  return { message: "An unknown error occurred" }
}
