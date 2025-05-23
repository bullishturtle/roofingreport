"use client"

import type React from "react"
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"
import type { Session } from "next-auth"

interface SessionProviderWrapperProps {
  children: React.ReactNode
  session?: Session | null
}

export function SessionProviderWrapper({ children, session }: SessionProviderWrapperProps) {
  return <NextAuthSessionProvider session={session}>{children}</NextAuthSessionProvider>
}

// Export SessionProvider for direct import - this fixes the import error
export { SessionProvider } from "next-auth/react"
export default SessionProviderWrapper
