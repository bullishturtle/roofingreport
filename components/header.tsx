"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/rooffax-logo.png"
            alt="RoofFax.Report Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <span className="text-xl font-bold text-blue-600">RoofFax.Report</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Features
          </Link>
          <Link href="#about" className="text-sm font-medium hover:text-blue-600 transition-colors">
            About
          </Link>
          <Link href="#demo" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Demo
          </Link>
          <Link href="https://rooffaxpro.com" className="text-sm font-medium hover:text-blue-600 transition-colors">
            For Professionals
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Contact
          </Link>
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col gap-4 p-4">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#demo"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Demo
            </Link>
            <Link
              href="https://rooffaxpro.com"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              For Professionals
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="outline" asChild className="w-full">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
