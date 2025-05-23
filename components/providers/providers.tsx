"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "@/components/providers/session-provider"
import { AccessibilityProvider } from "@/components/ui/accessibility-provider"
import { SkipLink } from "@/components/ui/skip-link"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>
        <AccessibilityProvider>
          <SkipLink />
          {children}
        </AccessibilityProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}
