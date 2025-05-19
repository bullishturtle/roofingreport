import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ToastProvider } from "@/components/ui/toast"
import { UserProvider } from "@/contexts/user-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TheRoofFax.com - The World's Smartest Roof & Property Report",
  description: "Get instant insights about your roof's condition, storm history, and repair needs.",
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
        <UserProvider>
          <ToastProvider>
            <div className="flex flex-col min-h-screen bg-black">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </ToastProvider>
        </UserProvider>
      </body>
    </html>
  )
}
