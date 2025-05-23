import type { NextRequest } from "next/server"
import { logAudit } from "@/lib/audit-logger"
import { getRequestInfo } from "@/lib/request-utils"

export async function auditMiddleware(request: NextRequest) {
  try {
    // Extract information from the request
    const { pathname, search } = request.nextUrl
    const method = request.method
    const { ip, userAgent } = getRequestInfo(request as unknown as Request)

    // Skip logging for static assets and API health checks
    if (
      pathname.startsWith("/_next/") ||
      pathname.startsWith("/favicon.ico") ||
      pathname.startsWith("/images/") ||
      pathname.startsWith("/api/health")
    ) {
      return
    }

    // Log the request asynchronously (don't await)
    logAudit({
      action: `http.${method.toLowerCase()}` as any,
      entityType: "system",
      details: {
        path: pathname,
        query: search,
        method,
      },
      ipAddress: ip,
      userAgent,
    }).catch((error) => {
      console.error("Failed to log request audit:", error)
    })
  } catch (error) {
    // Never block the request, just log the error
    console.error("Error in audit middleware:", error)
  }
}
