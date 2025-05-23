"use client"

import type React from "react"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { logAudit } from "@/lib/audit-logger"

export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/login?callbackUrl=/admin")
      return
    }

    if (session.user.role !== "admin") {
      // Log unauthorized access attempt
      logAudit({
        action: "system.unauthorized_access",
        entityType: "system",
        userId: session.user.id,
        details: {
          path: window.location.pathname,
          requiredRole: "admin",
          userRole: session.user.role,
        },
        status: "failure",
      })

      router.push("/dashboard")
    }
  }, [session, status, router])

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!session || session.user.role !== "admin") {
    return null
  }

  return <>{children}</>
}
