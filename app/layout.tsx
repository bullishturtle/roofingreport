import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script" // Import Script
import { Toaster } from "@/components/ui/toaster"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Enhanced3DCharactersClient } from "@/components/client-wrappers/enhanced-3d-characters-client"
import { Providers } from "@/components/providers/providers"
import { SkipLink } from "@/components/ui/skip-link" // Import SkipLink

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RoofFax - The Trusted Source for Roof Information",
  description: "Get comprehensive roof reports, history, and condition assessments for any property.",
  icons: {
    icon: "/favicon.ico",
  },
  generator: "v0.dev",
  // Add more metadata for SEO: openGraph, twitter, etc.
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://therooffax.com",
    siteName: "RoofFax",
    title: "RoofFax - The Trusted Source for Roof Information",
    description: "Comprehensive roof reports, storm history, and contractor verification.",
    // images: [ { url: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.png` } ] // Add an OG image
  },
  twitter: {
    card: "summary_large_image",
    // site: "@rooffax", // Add your Twitter handle
    title: "RoofFax - The Trusted Source for Roof Information",
    description: "Comprehensive roof reports, storm history, and contractor verification.",
    // images: [`${process.env.NEXT_PUBLIC_APP_URL}/twitter-image.png`], // Add a Twitter image
  },
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SkipLink /> {/* Add SkipLink at the top */}
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main id="main-content" className="flex-1" tabIndex={-1}>
              {" "}
              {/* Add id and tabIndex for SkipLink target */}
              {children}
            </main>
            <Footer />
          </div>
          <Enhanced3DCharactersClient />
          <Toaster />
        </Providers>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  )
}
