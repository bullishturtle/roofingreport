"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "@/components/providers/session-provider"
import { AccessibilityProvider } from "@/components/ui/accessibility-provider"
import { OfflineProvider } from "@/components/offline/offline-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SessionProvider>
        <AccessibilityProvider>
          <OfflineProvider>{children}</OfflineProvider>
        </AccessibilityProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}
