"use client"

import type React from "react"

import { useState, useEffect } from "react"

// This is a client-side wrapper for any server components that use next/headers
export default function AuditClientWrapper({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    // Return a placeholder while on server
    return <div className="p-4 animate-pulse">Loading audit functionality...</div>
  }

  return <>{children}</>
}
