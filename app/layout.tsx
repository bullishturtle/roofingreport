import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { UserProvider } from "@/contexts/user-context"
import { ErrorBoundary } from "@/components/error-boundary"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RoofFax.Report - The World's Smartest Roof & Property Report",
  description:
    "Get comprehensive roof and property reports with RoofFax. Trusted by homeowners, built for roofing professionals.",
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
        <UserProvider>
          <ErrorBoundary
            fallback={
              <div className="flex min-h-screen items-center justify-center">
                Something went wrong. Please refresh the page.
              </div>
            }
          >
            {children}
            <Toaster />
          </ErrorBoundary>
        </UserProvider>
      </body>
    </html>
  )
}
