"use client"

import type React from "react"

import { useState, useEffect } from "react"

// This component provides a client-safe wrapper for components that might use next/headers
export function HeadersSafeWrapper({
  children,
  fallback = <div className="p-4">Loading...</div>,
}: {
  children: React.ReactNode
  fallback?: React.ReactNode
}) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
