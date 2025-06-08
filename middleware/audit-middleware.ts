import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { logAudit } from "@/lib/audit-logger-fixed"

// Paths that should be audited
const AUDITED_PATHS = [
  { path: "/api/auth/signin", action: "user.login", entityType: "user" },
  { path: "/api/auth/signout", action: "user.logout", entityType: "user" },
  { path: "/api/auth/register", action: "user.register", entityType: "user" },
  { path: "/api/report", action: "report.generate", entityType: "report" },
  { path: "/api/admin", action: "system.admin_access", entityType: "system" },
  // Add more paths as needed
]

export async function auditMiddleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl

    // Check if this path should be audited
    const auditConfig = AUDITED_PATHS.find((config) => pathname.startsWith(config.path))

    if (auditConfig) {
      // Log the audit event (don't await to avoid blocking the request)
      logAudit({
        action: auditConfig.action as any,
        entityType: auditConfig.entityType as any,
        details: {
          path: pathname,
          method: request.method,
          timestamp: new Date().toISOString(),
        },
      }).catch((error) => {
        // Log error but don't throw to avoid breaking the request
        console.error("Audit middleware error:", error)
      })
    }
  } catch (error) {
    // Log error but don't throw to avoid breaking the request
    console.error("Audit middleware failed:", error)
  }

  return NextResponse.next()
}
