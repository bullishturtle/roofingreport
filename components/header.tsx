"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useIsMobile()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/trust-the-fox-logo.png"
              alt="RoofFax Logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <span className="text-xl font-bold text-gray-900">RoofFax.Report</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
              Contact
            </Link>
            <div className="flex items-center space-x-3">
              <Link href="/login">
                <Button variant="outline" className="font-medium">
                  Log in
                </Button>
              </Link>
              <Link href="/register">
                <Button className="font-medium">Sign up</Button>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "fixed inset-0 top-16 z-50 bg-white transition-transform duration-300 ease-in-out md:hidden",
            isMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <nav className="flex flex-col p-4 space-y-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 font-medium py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-blue-600 font-medium py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col space-y-3 pt-2">
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full font-medium">
                  Log in
                </Button>
              </Link>
              <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full font-medium">Sign up</Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
