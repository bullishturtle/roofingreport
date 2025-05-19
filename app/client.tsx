"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { UserProvider } from "@/contexts/user-context"
import { ErrorBoundary } from "@/components/error-boundary"
import { Toaster } from "@/components/ui/toaster"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PreviewReportButton } from "@/components/preview-report-button"
import { AskRoofusButton } from "@/components/ask-roofus-button"

const inter = Inter({ subsets: ["latin"], display: "swap" })

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
                <div className="text-center p-8">
                  <h2 className="text-2xl font-bold text-red-500 mb-4">Oops! Something went wrong</h2>
                  <p className="mb-4">We're sorry for the inconvenience. Please try refreshing the page.</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium px-6 py-2 rounded transition-colors"
                  >
                    Refresh Page
                  </button>
                </div>
              </div>
            }
          >
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
            <PreviewReportButton />
            <AskRoofusButton />
            <Toaster />
          </ErrorBoundary>
        </UserProvider>
      </body>
    </html>
  )
}
