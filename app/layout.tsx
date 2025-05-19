import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { UserProvider } from "@/contexts/user-context"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { RoofusProvider } from "@/contexts/roofus-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RoofFax Report - The World's Smartest Roof & Property Report",
  description: "Get detailed reports on roof conditions, damage assessments, and repair recommendations.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <UserProvider>
            <RoofusProvider>
              {children}
              <Toaster />
            </RoofusProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
