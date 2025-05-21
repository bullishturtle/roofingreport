import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Preload from "./preload"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RoofFax - Comprehensive Roof Information Service",
  description: "Get detailed information about any roof, similar to how Carfax provides vehicle history reports.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Preload />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
