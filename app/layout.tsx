import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "@/components/providers/session-provider"
import { AnalyticsProvider } from "@/components/analytics/analytics-provider" // Import AnalyticsProvider
import Script from "next/script" // Import Script for Google Analytics
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RoofFax - The Trusted Source for Roof Information",
  description: "Comprehensive roof reports, storm history, and contractor verification for any property in Florida.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics Script */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-MEASUREMENT_ID" // Replace G-MEASUREMENT_ID with your actual ID
        ></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MEASUREMENT_ID'); // Replace G-MEASUREMENT_ID with your actual ID
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SessionProvider>
            <AnalyticsProvider>
              {" "}
              {/* Wrap the application with AnalyticsProvider */}
              <Suspense>{children}</Suspense>
              <Toaster />
            </AnalyticsProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
