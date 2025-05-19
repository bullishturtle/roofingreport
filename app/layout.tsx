import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { UserProvider } from "@/contexts/user-context"
import { ErrorBoundary } from "@/components/error-boundary"
import { WebVitalsScript } from "@/components/analytics/web-vitals-script"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RoofFax.Report - Comprehensive Roof Reports & Property Analysis",
  description:
    "Get detailed roof reports, property analysis, and AI-powered insights for homeowners, realtors, and insurance professionals.",
  keywords: "roof reports, property analysis, roof inspection, roof condition, real estate, insurance",
  authors: [{ name: "RoofFax.Report" }],
  creator: "RoofFax.Report",
  publisher: "RoofFax.Report",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "RoofFax.Report - Comprehensive Roof Reports & Property Analysis",
    description:
      "Get detailed roof reports, property analysis, and AI-powered insights for homeowners, realtors, and insurance professionals.",
    url: "https://rooffax.report",
    siteName: "RoofFax.Report",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RoofFax.Report - Comprehensive Roof Reports & Property Analysis",
    description:
      "Get detailed roof reports, property analysis, and AI-powered insights for homeowners, realtors, and insurance professionals.",
    creator: "@RoofFaxReport",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
          <ErrorBoundary>
            <UserProvider>
              {children}
              <WebVitalsScript />
            </UserProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
