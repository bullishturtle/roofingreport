import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./client"

export const metadata: Metadata = {
  title: "RoofFax - The World's Smartest Roof & Property Report",
  description:
    "Get instant, AI-powered roof reports with accurate measurements, condition assessments, and recommendations for homeowners and roofing professionals.",
  keywords:
    "roof report, roof inspection, roof damage, roof assessment, roof measurement, roofing contractors, AI roof analysis",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rooffax.com",
    title: "RoofFax - The World's Smartest Roof & Property Report",
    description:
      "Get instant, AI-powered roof reports with accurate measurements, condition assessments, and recommendations.",
    siteName: "RoofFax",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RoofFax - AI-Powered Roof Reports",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RoofFax - The World's Smartest Roof & Property Report",
    description:
      "Get instant, AI-powered roof reports with accurate measurements, condition assessments, and recommendations.",
    images: ["/twitter-image.jpg"],
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  robots: "index, follow",
  applicationName: "RoofFax",
  generator: "Next.js",
  authors: [{ name: "RoofFax Team" }],
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout children={children} />
}


import './globals.css'