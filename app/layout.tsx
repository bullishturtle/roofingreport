import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import RoofusPreloadWrapper from "@/components/client-wrappers/roofus-preload-wrapper"
import dynamic from "next/dynamic"

const inter = Inter({ subsets: ["latin"] })

// Dynamically import the model fix component
const RoofusModelFix = dynamic(() => import("@/components/client-wrappers/roofus-model-fix"), {
  ssr: false,
})

export const metadata: Metadata = {
  title: "RoofFax - Know Your Roof",
  description: "Get instant, interactive reports with roof measurements, storm history, and condition assessments.",
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
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <RoofusPreloadWrapper />
          <RoofusModelFix />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
