import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PreviewReportButton } from "@/components/preview-report-button"
import { AskRoofusButton } from "@/components/ask-roofus-button"
import { UserProvider } from "@/contexts/user-context"
import { ErrorBoundary } from "@/components/error-boundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RoofFax.Report - Comprehensive Roof Analysis & Reports",
  description:
    "Get detailed roof condition reports, damage assessments, and repair estimates for your property in minutes.",
  keywords: "roof report, roof inspection, roof damage, roof assessment, roof analysis, roof condition",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ErrorBoundary>
          <UserProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <PreviewReportButton />
            <AskRoofusButton />
          </UserProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
