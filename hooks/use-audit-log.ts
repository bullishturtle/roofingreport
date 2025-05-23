"use client"

import { useCallback } from "react"
import { logClientAudit, type AuditLogParams } from "@/lib/audit-logger"

export function useAuditLog() {
  const logAction = useCallback(async (params: AuditLogParams) => {
    return await logClientAudit(params)
  }, [])

  return { logAction }
}
