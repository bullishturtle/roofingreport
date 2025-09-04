import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RoofFax - Protect Your Home from Storm Damage",
  description:
    "Get instant roof damage reports using AI satellite analysis. Protect your home and avoid contractor scams with RoofFax.",
  keywords: "roof damage, storm damage, satellite analysis, contractor verification, home protection",
  openGraph: {
    title: "RoofFax - Protect Your Home from Storm Damage",
    description:
      "Get instant roof damage reports using AI satellite analysis. Protect your home and avoid contractor scams with RoofFax.",
    url: "https://therooffax.com",
    siteName: "RoofFax",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RoofFax - Roof Damage Analysis",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RoofFax - Protect Your Home from Storm Damage",
    description:
      "Get instant roof damage reports using AI satellite analysis. Protect your home and avoid contractor scams with RoofFax.",
    images: ["/og-image.png"],
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
