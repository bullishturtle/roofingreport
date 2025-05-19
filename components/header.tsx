"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#0a0d17]/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 text-black font-bold text-xl">
              R
            </div>
            <span className="text-xl font-bold">
              Roof<span className="text-yellow-500">Fax</span>
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="#how-it-works" className="text-sm font-medium text-gray-200 hover:text-white">
            How It Works
          </Link>
          <Link href="#features" className="text-sm font-medium text-gray-200 hover:text-white">
            Features
          </Link>
          <Link href="#testimonials" className="text-sm font-medium text-gray-200 hover:text-white">
            Testimonials
          </Link>
          <Link href="https://rooffaxpro.com" className="text-sm font-medium text-gray-200 hover:text-white">
            For Pros
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            asChild
            className="hidden md:flex bg-gradient-to-r from-yellow-500 to-amber-500 text-black hover:from-yellow-600 hover:to-amber-600"
          >
            <Link href="/get-started">Get Started Free</Link>
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#0a0d17] border-b border-gray-800 p-4">
          <nav className="flex flex-col space-y-4">
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-gray-200 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium text-gray-200 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-gray-200 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="https://rooffaxpro.com"
              className="text-sm font-medium text-gray-200 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              For Pros
            </Link>
            <Button
              asChild
              className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-black hover:from-yellow-600 hover:to-amber-600"
            >
              <Link href="/get-started">Get Started Free</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
