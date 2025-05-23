import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { logAudit } from "@/lib/audit-logger"

// Paths that should be audited
const AUDITED_PATHS = [
  { path: "/api/auth/login", action: "user.login", entityType: "user" },
  { path: "/api/auth/logout", action: "user.logout", entityType: "user" },
  { path: "/api/auth/register", action: "user.register", entityType: "user" },
  { path: "/api/report", action: "report.generate", entityType: "report" },
  // Add more paths as needed
]

export async function auditMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if this path should be audited
  const auditConfig = AUDITED_PATHS.find((config) => pathname.startsWith(config.path))

  if (auditConfig) {
    // Log the audit event
    await logAudit({
      action: auditConfig.action as any,
      entityType: auditConfig.entityType as any,
      details: { path: pathname, method: request.method },
    })
  }

  return NextResponse.next()
}
